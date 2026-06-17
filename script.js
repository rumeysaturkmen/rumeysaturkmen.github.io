// ============ Reticle site script ============

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Active link highlighting
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Footer year
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // Reticle cursor — desktop only
  var reticle = document.getElementById('reticle');
  if (reticle && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', function (e) {
      reticle.style.opacity = 1;
      reticle.style.left = e.clientX + 'px';
      reticle.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', function () {
      reticle.style.opacity = 0;
    });
  }

  // Home page target field (decorative)
  var field = document.getElementById('target-field');
  if (field) {
    var pts = [
      { x: 28, y: 16, hit: false },
      { x: 64, y: 28, hit: false },
      { x: 48, y: 54, hit: true, label: 'selected' },
      { x: 18, y: 68, hit: false },
      { x: 78, y: 60, hit: false },
      { x: 38, y: 84, hit: false }
    ];
    pts.forEach(function (p) {
      var d = document.createElement('div');
      d.className = 'tf-dot' + (p.hit ? ' hit' : '');
      d.style.left = p.x + '%';
      d.style.top = p.y + '%';
      field.appendChild(d);
      if (p.hit && p.label) {
        var l = document.createElement('div');
        l.className = 'tf-label';
        l.textContent = p.label;
        l.style.left = (p.x + 3) + '%';
        l.style.top = (p.y - 4) + '%';
        field.appendChild(l);
      }
    });
  }

  // Publications filter (optional, only runs if filter buttons exist)
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('tag-active'); });
        btn.classList.add('tag-active');
        document.querySelectorAll('.pub-entry').forEach(function (entry) {
          var venues = entry.getAttribute('data-venue') || '';
          entry.style.display = (f === 'all' || venues.indexOf(f) !== -1) ? 'flex' : 'none';
        });
      });
    });
  }
});
