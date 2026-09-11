// Desa Seburing — shared script (multi-page version)

document.addEventListener('DOMContentLoaded', function () {
  // mobile menu toggle
  var toggleBtn = document.querySelector('.nav-toggle');
  var navlinks = document.getElementById('navlinks');
  if (toggleBtn && navlinks) {
    toggleBtn.addEventListener('click', function () {
      navlinks.classList.toggle('open');
    });
    navlinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navlinks.classList.remove('open'); });
    });
  }

  // subtle parallax on hero/page-hero blobs, respects reduced motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('.hero, .page-hero, .bg-dark').forEach(function (heroEl) {
      var blobs = heroEl.querySelectorAll('.blob');
      if (!blobs.length) return;
      heroEl.addEventListener('mousemove', function (e) {
        var rect = heroEl.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        var y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        blobs.forEach(function (b, i) {
          b.style.transform = 'translate(' + x * (i + 1) + 'px, ' + y * (i + 1) + 'px)';
        });
      });
    });
  }

  // reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    items.forEach(function (i) { io.observe(i); });
  }

  // === Form Kontak -> Google Sheets (lewat Google Apps Script) ===
  // Ganti URL di bawah ini dengan URL Web App hasil Deploy Apps Script kamu
  var SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";

  var formKontak = document.getElementById('formKontak');
  if (formKontak) {
    formKontak.addEventListener('submit', function (e) {
      e.preventDefault();

      var namaEl = document.getElementById('nama');
      var emailEl = document.getElementById('email');
      var pesanEl = document.getElementById('pesan');
      var status = document.getElementById('statusKirim');
      var submitBtn = formKontak.querySelector('button[type="submit"]');

      var data = {
        nama: namaEl ? namaEl.value : '',
        email: emailEl ? emailEl.value : '',
        pesan: pesanEl ? pesanEl.value : ''
      };

      if (status) status.textContent = 'Mengirim...';
      if (submitBtn) submitBtn.disabled = true;

      fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (res) {
          if (res.result === 'success') {
            if (status) status.textContent = 'Pesan terkirim, terima kasih!';
            formKontak.reset();
          } else {
            if (status) status.textContent = 'Gagal mengirim pesan. Coba lagi.';
          }
        })
        .catch(function () {
          if (status) status.textContent = 'Terjadi kesalahan jaringan.';
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
});
