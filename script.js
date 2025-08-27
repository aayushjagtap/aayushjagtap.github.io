// Theme toggle + print + year
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const printBtn = document.getElementById('printBtn');
  const year = document.getElementById('year');

  // Persisted theme
  const stored = localStorage.getItem('theme');
  if (stored) root.dataset.theme = stored;

  function setTheme(next){
    if (!next){
      delete root.dataset.theme;
      localStorage.removeItem('theme');
      return;
    }
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  }

  btn.addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Print (save to PDF)
  printBtn.addEventListener('click', () => window.print());

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
