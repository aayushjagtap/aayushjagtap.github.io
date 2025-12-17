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
          if (sec.dataset.hideTimeout) {
            clearTimeout(sec.dataset.hideTimeout);
            delete sec.dataset.hideTimeout;
          }
          sec.style.visibility = 'visible';
          sec.style.transition = '';
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
          sec.style.transition = 'none';
          sec.style.visibility = 'hidden';
          if (sec.dataset.hideTimeout) {
            clearTimeout(sec.dataset.hideTimeout);
          }
          sec.dataset.hideTimeout = setTimeout(() => {
            sec.style.transition = '';
            delete sec.dataset.hideTimeout;
          }, 10); // restore transition after a tick
        }
      });
      if (target) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
      history.pushState({}, '', href);
    });
  });
});
