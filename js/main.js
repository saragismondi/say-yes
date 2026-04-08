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

  /* ----------------------------------------------------------
     HERO PHRASE SLIDER
     ---------------------------------------------------------- */
  const phrases = Array.from(document.querySelectorAll('.hero-slider__phrase'));
  const dots    = Array.from(document.querySelectorAll('.hero-slider__dot'));

  if (phrases.length && dots.length) {
    let current = 0;
    let timer;

    const goTo = (index) => {
      phrases[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + phrases.length) % phrases.length;
      phrases[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    };

    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 4000);
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(Number(dot.dataset.index));
        startTimer();
      });
    });

    startTimer();
  }


  /* ----------------------------------------------------------
     PODCAST SEARCH
     ---------------------------------------------------------- */
  const episodesSearchInput = document.querySelector('.episodes-search__input');
  const episodeRows = Array.from(document.querySelectorAll('.episode-row'));

  if (episodesSearchInput && episodeRows.length) {
    const filterEpisodes = () => {
      const query = episodesSearchInput.value.trim().toLowerCase();

      episodeRows.forEach(row => {
        const haystack = (row.dataset.episodeSearch || row.textContent || '').toLowerCase();
        const matches = query === '' || haystack.includes(query);
        row.style.display = matches ? '' : 'none';
      });
    };

    episodesSearchInput.addEventListener('input', filterEpisodes);
    episodesSearchInput.addEventListener('search', filterEpisodes);
    episodesSearchInput.addEventListener('keyup', filterEpisodes);
    filterEpisodes();
  }

})();
