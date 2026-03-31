/* ============================================================
   SAID YES MAGAZINE — Main JS
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     MOBILE NAV TOGGLE
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when any link is clicked
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ----------------------------------------------------------
     ACTIVE NAV LINK
     — Sets .active on the link matching the current page
     ---------------------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-list a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });


  /* ----------------------------------------------------------
     FOOTER YEAR
     ---------------------------------------------------------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
