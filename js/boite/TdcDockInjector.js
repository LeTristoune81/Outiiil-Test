/* Outiiil — Injecteur bouton "Parser TDC" (sprite robuste, hover/active, tooltip)
   - N'altère pas Dock.js
   - Clone l'icône d'un bouton existant (image, taille, background-size)
   - Force une URL de secours si le clone échoue
   - Positions sprite: normal/hover/active pour la ligne -240px
*/
(function(){
  'use strict';

  // --- Config sprite ---
  var SPRITE_POS = {
    normal:  '0px -240px',
    hover:  '-40px -240px',
    active: '-80px -240px'
  };
  // Si tu veux forcer l'URL du sprite (au cas où le clone ne la trouve pas) :
  var SPRITE_URL_OVERRIDE = null; // ex: 'images/sprite_menu.png'

  // --- Helpers ---
  function findToolbar(){ return document.getElementById('o_toolbarOutiiil'); }

  function findRefIcon(){
    // Essaye quelques IDs connus
    var ids = ['#o_itemPonte', '#o_itemChasse', '#o_itemCombat', '#o_itemParametre'];
    for (var i=0;i<ids.length;i++){
      var el = document.querySelector(ids[i] + ' span, ' + ids[i]);
      if (el && getComputedStyle(el).backgroundImage !== 'none') return el;
    }
    // Sinon, n'importe quelle icône du dock qui a déjà un background
    var spans = document.querySelectorAll('#o_toolbarOutiiil .o_toolbarItem span, .o_toolbarItem span');
    for (var j=0;j<spans.length;j++){
      var cs = getComputedStyle(spans[j]);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return spans[j];
    }
    return null;
  }

  function readBackground(el){
    var cs = getComputedStyle(el);
    var bg  = cs.backgroundImage && cs.backgroundImage !== 'none' ? cs.backgroundImage : '';
    var w   = parseInt(cs.width, 10)  || 40;
    var h   = parseInt(cs.height, 10) || 40;
    var bgs = cs.backgroundSize; // ex: "auto auto" ou "400px 400px"
    return {bg:bg,w:w,h:h,bgs:bgs};
  }

  function injectCSSOnce(){
    if (document.getElementById('o_tdcDockCss')) return;
    var css = `
#o_itemTDC{ display:inline-block; background-repeat:no-repeat; background-position:${SPRITE_POS.normal} !important; }
#o_itemTDC:hover{ background-position:${SPRITE_POS.hover} !important; }
#o_itemTDC:active{ background-position:${SPRITE_POS.active} !important; }
`.trim();
    var st = document.createElement('style');
    st.id = 'o_tdcDockCss';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function makeButton(refEl){
    injectCSSOnce();

    // Utilise <a> comme les autres items du dock
    var btn = document.createElement('a');
    btn.className = 'o_toolbarItem';
    btn.title = 'Parser TDC';
    btn.href = '#';

    var span = document.createElement('span');
    span.id = 'o_itemTDC';
    btn.appendChild(span);

    var ref = refEl ? readBackground(refEl) : {bg:'',w:40,h:40,bgs:''};

    // 1) Image du sprite
    var bgUrl = null;
    if (SPRITE_URL_OVERRIDE){
      // Utiliser l’URL forcée
      bgUrl = 'url(' + SPRITE_URL_OVERRIDE + ')';
    } else if (ref.bg){
      // Cloner celle de la ref
      bgUrl = ref.bg;
    } else {
      // Dernier recours : chemin par défaut
      bgUrl = 'url(images/sprite_menu.png)';
    }
    span.style.backgroundImage = bgUrl;

    // 2) Taille
    span.style.width  = (ref.w || 40) + 'px';
    span.style.height = (ref.h || 40) + 'px';

    // 3) Répétition / position
    span.style.backgroundRepeat = 'no-repeat';
    span.style.backgroundPosition = SPRITE_POS.normal;

    // 4) Background-size (si utile)
    var bgs = ref.bgs;
    if (bgs && bgs !== 'auto' && bgs !== 'auto auto') {
      span.style.backgroundSize = bgs;
    }

    // 5) Click → toggle parseur
    btn.addEventListener('click', function(e){
      e.preventDefault();
      if (window.OutiiilTDC && typeof window.OutiiilTDC.toggle === 'function') {
        window.OutiiilTDC.toggle();
      } else {
        console.warn('[Outiiil] window.OutiiilTDC introuvable.');
        alert("Le parseur TDC n'est pas chargé (ParseurTDC.js).");
      }
    });

    // 6) Tooltip (même style que les autres)
    if (window.$ && $.fn.tooltip) {
      var $btn = $(btn);
      var dockBas = false;
      try { dockBas = (window.monProfil && monProfil.parametre["dockPosition"].valeur == "1"); } catch(e){}
      var opts = {
        tooltipClass : "o_tooltip",
        content : function(){ return $(this).prop("title"); },
        position : dockBas
          ? { my:"center top",  at:"center bottom+10" }
          : { my:"left+10 center", at:"right center" },
        hide : { effect:"fade", duration:50 }
      };
      $btn.tooltip(opts);
    }

    return btn;
  }

  function injectOnce(toolbar){
    if (!toolbar) return false;
    if (toolbar.querySelector('#o_itemTDC')) return true; // déjà présent

    var ref = findRefIcon();
    // Si aucune ref prête, on retentera (le sprite n'est peut-être pas encore calculé)
    if (!ref && !SPRITE_URL_OVERRIDE) return false;

    var btn = makeButton(ref);

    // Le placer avant "Préférence" si possible, sinon en fin
    var pref = toolbar.querySelector('#o_toolbarItem6, #o_itemParametre, [title*="Préférence"], [title*="Param"]');
    if (pref && pref.parentElement === toolbar) {
      toolbar.insertBefore(btn, pref);
    } else {
      toolbar.appendChild(btn);
    }
    return true;
  }

  function boot(){
    var tries = 0, maxTries = 200; // ~20s
    var iv = setInterval(function(){
      var bar = findToolbar();
      if (!bar){ if(++tries > maxTries) clearInterval(iv); return; }

      var ok = injectOnce(bar);
      if (ok){
        clearInterval(iv);
        // Réinjection si le dock change (SPA / re-render)
        var mo = new MutationObserver(function(){
          var b = findToolbar();
          if (b) injectOnce(b);
        });
        mo.observe(document.body, {childList:true, subtree:true});
      } else {
        if(++tries > maxTries) clearInterval(iv);
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
