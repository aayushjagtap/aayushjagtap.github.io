// Theme toggle + print + year
document.addEventListener('DOMContentLoaded', function(){
  const root = document.documentElement;

  // Footer year
  year.textContent = new Date().getFullYear();

  // Initially hide all sections except summary
  const sections = document.querySelectorAll('main section.card');
  sections.forEach(sec => {
    if (sec.id !== 'summary') {
      sec.classList.add('hidden');
      sec.style.visibility = 'hidden';
    }
  });

  // Section toggle for nav
  document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const href = a.getAttribute('href');
      const id = href.substring(1);
      const sections = document.querySelectorAll('main section.card');
      sections.forEach(sec => {
        sec.classList.add('hidden');
        setTimeout(() => sec.style.visibility = 'hidden', 500);
      });
      const target = document.getElementById(id);
      if (target) {
        target.style.visibility = 'visible';
        target.classList.remove('hidden');
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
      history.pushState({}, '', href);
    });
  });
});
