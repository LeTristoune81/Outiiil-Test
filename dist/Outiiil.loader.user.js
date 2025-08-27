// ==UserScript==
// @name         Outiiil loader
// @namespace    https://github.com/LeTristoune81
// @version      0.6
// @description  Charge le bundle Outiiil
// @match        http://s1.fourmizzz.fr/*
// @match        http://s2.fourmizzz.fr/*
// @match        http://s3.fourmizzz.fr/*
// @match        http://s4.fourmizzz.fr/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // 🔥 Remplace <SHA> par le hash du commit où tu as poussé le bundle minimal
  const BUNDLE = 'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil-test@ad723565720ca6ad2b99439006634d55a8629f3b/dist/outiiil.bundle.js';

  const s = document.createElement('script');
  // Le querystring aide à contourner certains caches intermédiaires
  s.src = BUNDLE + '?v=' + Date.now();
  s.async = false;
  document.documentElement.appendChild(s);

  console.log('[Outiiil loader] injecté : ' + s.src);
})();
