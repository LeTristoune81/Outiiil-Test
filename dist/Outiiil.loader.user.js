// ==UserScript==
// @name         Outiiil (loader)
// @namespace    https://github.com/LeTristoune81/Outiiil-test
// @version      0.2
// @description  Charge les dépendances + le bundle Outiiil
// @author       Trist
// @match        http://s1.fourmizzz.fr/*
// @match        http://s2.fourmizzz.fr/*
// @match        http://s3.fourmizzz.fr/*
// @match        http://s4.fourmizzz.fr/*
// @match        http://test.fourmizzz.fr/*
// @run-at       document-end
// @noframes
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const log = (...a)=>console.log('[Outiiil loader]', ...a);

  function loadCss(href) {
    return new Promise((res, rej) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      l.onload = () => res();
      l.onerror = (e) => rej(e);
      document.head.appendChild(l);
    });
  }

  function loadScript(src, checkFn) {
    return new Promise((res, rej) => {
      // si déjà présent, on skip
      try { if (checkFn && checkFn()) return res(); } catch(e){}

      const s = document.createElement('script');
      s.src = src;
      s.async = false; // garder l'ordre
      s.onload = () => {
        // double-check après chargement
        try {
          if (!checkFn || checkFn()) res();
          else rej(new Error('Check failed for '+src));
        } catch (e) { rej(e); }
      };
      s.onerror = () => rej(new Error('Failed to load '+src));
      document.head.appendChild(s);
    });
  }

  (async () => {
    log('init');

    // CSS utiles (en https pour éviter le mixed-content)
    const cssToLoad = [
      'https://code.jquery.com/ui/1.12.1/themes/humanity/jquery-ui.min.css',
      // DataTables basique (ton bundle ajoutera aussi ses propres CSS Outiiil)
      'https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css',
    ];
    for (const c of cssToLoad) {
      try { await loadCss(c); } catch { /* non bloquant */ }
    }

    // Libs externes nécessaires par ton bundle
    const libs = [
      {
        url: 'https://code.jquery.com/jquery-3.7.1.min.js',
        check: () => !!(window.jQuery && window.$),
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/moment@2.30.1/min/moment-with-locales.min.js',
        check: () => !!window.moment,
      },
      {
        url: 'https://cdn.jsdelivr.net/npm/numeral@2.0.6/min/numeral.min.js',
        check: () => !!window.numeral,
      },
      {
        // locales pour numeral (sinon numeral.locale('fr') ne fait rien)
        url: 'https://cdn.jsdelivr.net/npm/numeral@2.0.6/min/locales.min.js',
        check: () => !!window.numeral,
      },
      {
        url: 'https://code.highcharts.com/highcharts.js',
        check: () => !!window.Highcharts,
      },
      {
        // plugin DataTables (dépend de jQuery)
        url: 'https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js',
        check: () => !!(window.jQuery && window.jQuery.fn && window.jQuery.fn.dataTable),
      },
    ];

    for (const lib of libs) {
      log('load', lib.url);
      await loadScript(lib.url, lib.check);
    }

    // (Optionnel) régler tout de suite les locales si tu veux
    try { window.moment?.locale('fr'); } catch {}
    try { window.numeral?.locale('fr'); } catch {}

    // ⚠️ IMPORTANT :
    // Ton bundle fait référence à des globals comme Utils, Joueur, Dock, Page*...
    // Si ces classes ne sont PAS incluses dans le bundle, charge-les ici AVANT le bundle.
    // Exemple si tu as regroupé tes fichiers maison dans un "outiiil.core.js" :
    // await loadScript('https://raw.githubusercontent.com/LeTristoune81/Outiiil-test/main/dist/outiiil.core.js', () => !!window.Utils);

    // Enfin, charge le bundle app
    const BUNDLE_URL = 'https://raw.githubusercontent.com/LeTristoune81/Outiiil-test/main/dist/outiiil.bundle.js';
    log('load bundle', BUNDLE_URL);
    await loadScript(BUNDLE_URL, () => !!window.__OutiiilBootOk || true);

    log('done');
  })().catch(err => {
    console.error('[Outiiil loader] erreur:', err);
  });
})();
