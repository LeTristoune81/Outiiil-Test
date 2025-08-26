// ==UserScript==
// @name         Outiiil (loader)
// @namespace    https://github.com/LeTristoune81/Outiiil-test
// @version      3.2
// @description  Charge le bundle unique d\'Outiiil (zéro @require)
// @match        http://*.fourmizzz.fr/*
// @match        https://*.fourmizzz.fr/*
// @run-at       document-end
// @grant        none
// @updateURL    https://raw.githubusercontent.com/LeTristoune81/Outiiil-test/main/dist/Outiiil.loader.user.js
// @downloadURL  https://raw.githubusercontent.com/LeTristoune81/Outiiil-test/main/dist/Outiiil.loader.user.js
// ==/UserScript==

(function () {
  "use strict";
  const BUNDLE_URL = "https://raw.githubusercontent.com/LeTristoune81/Outiiil-test/main/dist/outiiil.bundle.js";
  const ver = (typeof GM_info !== "undefined" && GM_info.script && GM_info.script.version) ? GM_info.script.version : "0";
  const s = document.createElement("script");
  s.src = BUNDLE_URL + "?v=" + encodeURIComponent(ver);
  s.id = "outiiil-bundle";
  s.type = "text/javascript";
  document.head.appendChild(s);
})();
