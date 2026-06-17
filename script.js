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
      { x: 8, y: 12, hit: false },
      { x: 90, y: 10, hit: false },
      { x: 5, y: 50, hit: false },
      { x: 95, y: 42, hit: false },
      { x: 12, y: 88, hit: false },
      { x: 88, y: 90, hit: false },
      { x: 50, y: 8, hit: false },
      { x: 86, y: 22, hit: true, label: 'selected' }
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
