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
      const target = document.getElementById(id);
      const sections = document.querySelectorAll('main section.card');
      sections.forEach(sec => {
        if (sec === target) {
          sec.style.visibility = 'visible';
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
          setTimeout(() => sec.style.visibility = 'hidden', 500);
        }
      });
      if (target) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
      history.pushState({}, '', href);
    });
  });
});
