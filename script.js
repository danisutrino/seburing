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
});
