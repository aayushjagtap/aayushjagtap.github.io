document.documentElement.classList.remove('no-js');
document.body.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shadow/blur once page is scrolled
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll-spy: highlight active nav link
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinks.find(function (a) { return a.getAttribute('href') === '#' + entry.target.id; });
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) { a.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  // Reveal-on-scroll animations
  var revealEls = document.querySelectorAll('.reveal, .reveal-section');
  if ('IntersectionObserver' in window && revealEls.length) {
    var reveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 6) * 0.06 + 's';
      reveal.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Populate company/university logos via Google's favicon service
  document.querySelectorAll('[data-logo-domain]').forEach(function (el) {
    var domain = el.getAttribute('data-logo-domain');
    el.style.backgroundImage = "url('https://www.google.com/s2/favicons?sz=64&domain=" + domain + "')";
  });

  // Populate skill icons via Simple Icons CDN, with graceful fallback to text-only pill
  document.querySelectorAll('.icon-tags li[data-icon]').forEach(function (li) {
    var slug = li.getAttribute('data-icon');
    var label = li.textContent.trim();
    var img = document.createElement('img');
    img.src = 'https://cdn.simpleicons.org/' + slug;
    img.alt = '';
    img.width = 14;
    img.height = 14;
    img.loading = 'lazy';
    img.addEventListener('error', function () { img.remove(); });
    li.textContent = '';
    li.appendChild(img);
    li.appendChild(document.createTextNode(label));
  });
});
