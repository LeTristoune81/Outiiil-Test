// src/index.js
(function () {
  'use strict';
  console.log('[Outiiil] bundle chargé');

  // --- Injecte les CSS distantes (facultatif) ---
  const CSS_URLS = [
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/outiiil.css',
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/toasts.css',
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/datatables.css',
  ];
  CSS_URLS.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    (document.head || document.documentElement).appendChild(link);
  });

  function neutraliseArmee() {
    // 1) Désactive le bouton / lien "Replacer l’armée"
    const TEXT = 'Replacer l’armée';
    const $ = window.jQuery;
    if (!$) {
      console.warn('[Outiiil] jQuery manquant, neutralisation fallback sans jQuery.');
      // Fallback sans jQuery : désactive par texte exact
      const candidates = Array.from(document.querySelectorAll('a,button,input[type=submit]'))
        .filter(el => (el.textContent || '').trim() === TEXT || (el.value || '').trim() === TEXT);
      for (const el of candidates) {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.5';
        el.style.filter = 'grayscale(1)';
        el.setAttribute('title', 'Désactivé par Outiiil');
        el.addEventListener('click', (e) => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
        if ('disabled' in el) el.disabled = true;
      }
    } else {
      const candidates = $('a, button, input[type=submit]').filter(function () {
        const t = ($(this).text() || '').trim();
        const v = (this.value || '').trim();
        return t === TEXT || v === TEXT;
      });
      candidates.each(function () {
        const $el = $(this);
        $el.css({ pointerEvents: 'none', opacity: 0.5, filter: 'grayscale(1)' });
        $el.attr('title', 'Désactivé par Outiiil');
        if ($el.is('input,button')) $el.prop('disabled', true);
        $el.on('click', (e) => { e.preventDefault(); e.stopImmediatePropagation(); });
      });
    }

    // 2) Masque le bloc récap "Statistiques" sous le tableau (détection large)
    const lower = (s) => (s || '').toLowerCase();
    const looksLikeStatsHeading = (el) => /^statistiques/.test(lower(el.textContent).trim());

    // Cherche un titre "Statistiques" puis masque le conteneur le plus pertinent
    let heading = Array.from(document.querySelectorAll('h1,h2,h3,legend,.titre,.header'))
      .find(looksLikeStatsHeading);

    if (heading) {
      const container = heading.closest('section,fieldset,div,table') || heading.parentElement;
      if (container) container.style.display = 'none';
    } else {
      // fallback : masque tout bloc dont le texte commence par "Statistiques"
      Array.from(document.querySelectorAll('section,fieldset,div,table')).forEach((el) => {
        if (looksLikeStatsHeading(el)) el.style.display = 'none';
      });
    }

    console.log('[Outiiil] Bouton "Replacer l’armée" neutralisé + bloc "Statistiques" masqué (si trouvé).');
  }

  // Boot quand le DOM est prêt
  const start = () => {
    try {
      if (location.pathname === '/Armee.php') {
        neutraliseArmee();
      }
    } catch (err) {
      console.error('[Outiiil] init error', err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
