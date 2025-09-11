// Theme toggle + print + year
(function(){
  const root = document.documentElement;

  // Footer year
  year.textContent = new Date().getFullYear();

  // Optional: smooth scroll for in-page nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState({}, '', id);
    });
  });
})();
