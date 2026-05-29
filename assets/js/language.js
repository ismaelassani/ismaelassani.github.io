(function () {
  function getRequestedLanguage() {
    var params = new URLSearchParams(window.location.search);
    var queryLang = params.get('lang');
    if (queryLang === 'fr' || queryLang === 'en') return queryLang;
    var savedLang = localStorage.getItem('site-language');
    if (savedLang === 'fr' || savedLang === 'en') return savedLang;
    return 'en';
  }

  window.setLanguage = function (lang) {
    if (lang !== 'fr' && lang !== 'en') lang = 'en';
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.toggle('lang-mode-fr', lang === 'fr');
    document.body.classList.toggle('lang-mode-en', lang === 'en');
    localStorage.setItem('site-language', lang);

    var enButton = document.getElementById('btn-en');
    var frButton = document.getElementById('btn-fr');
    if (enButton && frButton) {
      enButton.classList.toggle('active-language', lang === 'en');
      frButton.classList.toggle('active-language', lang === 'fr');
      enButton.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
      frButton.setAttribute('aria-pressed', lang === 'fr' ? 'true' : 'false');
    }

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('http') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('.html') === -1) return;
      var parts = href.split('#');
      var base = parts[0].split('?')[0];
      var hash = parts[1] ? '#' + parts[1] : '';
      link.setAttribute('href', base + '?lang=' + lang + hash);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.setLanguage(getRequestedLanguage());
  });
})();
