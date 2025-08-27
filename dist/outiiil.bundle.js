// dist/outiiil.bundle.js
(function () {
  'use strict';
  const VERSION = 'minimal-anti-joueur-1';
  console.log('[Outiiil] bundle chargé :: ' + VERSION);

  // Injecter quelques CSS externes (facultatif)
  const CSS_URLS = [
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/outiiil.css',
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/toasts.css',
    'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/css/datatables.css',
  ];
  CSS_URLS.forEach((href) => {
    try {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = href;
      (document.head || document.documentElement).appendChild(link);
    } catch (e) { /* ignore */ }
  });

  // Utils internes
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const lower = (s) => norm(s).toLowerCase();

  // Désactive tout bouton/lien "Replacer l’armée" (avec ' ou ’)
  function neutraliseBoutonReplacer() {
    const already = new WeakSet();
    const matchesText = (txt) => {
      const x = lower(txt);
      return x === "replacer l’armée" || x === "replacer l'armée";
    };
    const testEl = (el) => {
      if (already.has(el)) return;
      const t = norm(el.textContent || '');
      const v = norm(el.value || '');
      if (matchesText(t) || matchesText(v)) {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.5';
        el.style.filter = 'grayscale(1)';
        el.title = 'Désactivé par Outiiil';
        if ('disabled' in el) el.disabled = true;
        el.addEventListener('click', (e) => { e.preventDefault(); e.stopImmediatePropagation(); }, true);
        el.setAttribute('data-outiiil-disabled', '1');
        already.add(el);
      }
    };
    document.querySelectorAll('a,button,input[type=submit],input[type=button]').forEach(testEl);
  }

  // Masque le bloc "Statistiques" (repère un titre puis cache le conteneur)
  function masqueBlocStatistiques() {
    const looksLikeHeading = (el) => lower(el.textContent).startsWith('statistiques');
    let heading = Array.from(document.querySelectorAll('h1,h2,h3,h4,legend,.titre,.title,.header'))
      .find(looksLikeHeading);

    if (heading) {
      const container = heading.closest('section,fieldset,div,table') || heading.parentElement;
      if (container && !container.hasAttribute('data-outiiil-hidden')) {
        container.style.display = 'none';
        container.setAttribute('data-outiiil-hidden', '1');
      }
    } else {
      // fallback : n'importe quel bloc dont le texte commence par "Statistiques"
      Array.from(document.querySelectorAll('section,fieldset,div,table')).forEach((el) => {
        if (!el.hasAttribute('data-outiiil-hidden') && looksLikeHeading(el)) {
          el.style.display = 'none';
          el.setAttribute('data-outiiil-hidden', '1');
        }
      });
    }
  }

  // Lance une passe immédiate
  function runOnce() {
    try {
      neutraliseBoutonReplacer();
      masqueBlocStatistiques();
    } catch (e) {
      console.error('[Outiiil] erreur runOnce', e);
    }
  }

  // Re-scan quand la page bouge (Ajax, onglets, etc.)
  const debounced = (fn, delay = 200) => {
    let t = 0;
    return () => { clearTimeout(t); t = setTimeout(fn, delay); };
  };
  const runDebounced = debounced(runOnce, 200);

  function boot() {
    runOnce();
    const obs = new MutationObserver(runDebounced);
    obs.observe(document.documentElement, { childList: true, subtree: true });
    window.__outiiil_obs = obs; // juste pour debug
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
