/**
 * Dock — Outiiil
 * Barre d’outils : Ponte, Chasse, Combat, (Update + Parser TDC injectés), Préférence
 * - Bouton "Parser TDC" (radar.png) => window.OutiiilTDC.toggle()
 * - Réinjection robuste via MutationObserver
 */

"use strict";

// ---------- Constantes images ----------
const SPRITE_MENU_FALLBACK = "images/sprite_menu.png";
const IMG_SPRITE = (typeof IMG_SPRITE_MENU !== "undefined" && IMG_SPRITE_MENU) ? IMG_SPRITE_MENU : SPRITE_MENU_FALLBACK;



// ---------- URL Update ----------
const OUTIIIL_UPDATE_URL = "https://raw.githubusercontent.com/LeTristoune81/Outiiil/main/Outiiil.user.js";

function o_openUpdate() {
  if (typeof GM_openInTab === "function") {
    GM_openInTab(OUTIIIL_UPDATE_URL, { active: true, insert: true });
  } else {
    window.open(OUTIIIL_UPDATE_URL, "_blank");
  }
}

// ---------- Helper tooltips ----------
function o_tooltipOptionsDroite() {
  return {
    tooltipClass : "warning-tooltip",
    content : function(){ return $(this).prop("title"); },
    position : { my : "left+10 center", at : "right center" },
    hide : { effect: "fade", duration: 10 }
  };
}
function o_tooltipOptionsBas() {
  return {
    tooltipClass : "warning-tooltip",
    content : function(){ return $(this).prop("title"); },
    position : { my : "center top", at : "center bottom+10" },
    hide : { effect: "fade", duration: 10 }
  };
}
function o_isDockBas() {
  try { return monProfil?.parametre?.["dockPosition"]?.valeur == "1"; }
  catch(e) { return false; }
}
function o_isDockVisible() {
  try { return monProfil?.parametre?.["dockVisible"]?.valeur == "1"; }
  catch(e) { return true; }
}


// ---------- Injection bouton Parser TDC ----------
function o_injectTdcButton($toolbar) {
  if (!$toolbar.length) return;
  if ($toolbar.find("#o_itemTDC").length) return;

  // Utilise le SPRITE (comme Ponte/Chasse/Combat/Préférence), pas le radar
  const $btn = $(`
    <div id="o_toolbarItem5b" class="o_toolbarItem" title="Parser TDC">
      <span id="o_itemTDC"
            style="display:inline-block;width:32px;height:32px;
                   background-image:url(${IMG_SPRITE});
                   background-repeat:no-repeat;background-position:0px -240px;"></span>
    </div>`);

  // Placer avant "Préférence" (#o_toolbarItem6) si présent, sinon à la fin
  const $pref = $toolbar.find("#o_toolbarItem6");
  if ($pref.length) $pref.before($btn);
  else $toolbar.append($btn);



  // Tooltip comme les autres
  const opts = o_isDockBas() ? o_tooltipOptionsBas() : o_tooltipOptionsDroite();
  $btn.tooltip(opts);
}


/**
 * Classe Dock
 * Construit la barre et gère les clics sur les items.
 */
class Dock {
  constructor() {
    const clsPos = o_isDockBas() ? "o_toolbarBas" : "o_toolbarDroite";
    const vis = o_isDockVisible() ? "" : "style='display:none'";

    // Items "noyau" (sprites menu)
    this._html = `
      <div id="o_toolbarOutiiil" class="${clsPos}" ${vis}>
        <div id="o_toolbarItem1" class="o_toolbarItem" title="Ponte">
          <span id="o_itemPonte" style="background-image:url(${IMG_SPRITE})"></span>
        </div>

        <div id="o_toolbarItem2" class="o_toolbarItem" title="Chasse">
          <span id="o_itemChasse" style="background-image:url(${IMG_SPRITE})"></span>
        </div>

        <div id="o_toolbarItem3" class="o_toolbarItem" title="Combat">
          <span id="o_itemCombat" style="background-image:url(${IMG_SPRITE})"></span>
        </div>

        <!-- Update + Parser TDC seront injectés ici -->

        <div id="o_toolbarItem6" class="o_toolbarItem" title="Préférence">
          <span id="o_itemParametre" style="background-image:url(${IMG_SPRITE})"></span>
        </div>
      </div>`;

    // Boîtes gérées par Outiiil (déjà existantes)
    this._boitePonte      = new BoitePonte();
    this._boiteChasse     = new BoiteChasse();
    this._boiteCombat     = new BoiteCombat();
    this._boiteParametre  = new BoiteParametre();
  }

  afficher() {
    $("body").append(this._html);
    const $toolbar = $("#o_toolbarOutiiil");

    // Nettoyage d’anciens items si présents
    $toolbar.find('.o_toolbarItem[title="Traceur"], .o_toolbarItem[title="Carte"], #o_itemTraceur, #o_itemMap')
            .closest(".o_toolbarItem").remove();

    // Injection des nouveaux items
    o_injectTdcButton($toolbar);

    // Tooltips de base pour les items existants (selon position)
    const optsDroite = o_tooltipOptionsDroite();
    const optsBas    = o_tooltipOptionsBas();

    $(".o_toolbarDroite .o_toolbarItem").tooltip(optsDroite);
    $(".o_toolbarBas .o_toolbarItem").tooltip(optsBas);

    // Affichage au survol si dock masqué
    if (!o_isDockVisible()) {
      $(document).mousemove((e) => {
        if (o_isDockBas()) {
          if ($(window).height() - e.pageY < 60) $toolbar.slideDown(500);
          else $toolbar.slideUp(500);
        } else {
          if ($(window).width() - e.pageX < 60) $toolbar.show("slide", {direction:"right"}, 500);
          else $toolbar.hide("slide", {direction:"right"}, 500);
        }
      });
    }

    // Clics délégués
    $toolbar.on("click", ".o_toolbarItem", (e) => {
      const id = $(e.currentTarget).find("span").attr("id");
      switch (id) {
        case "o_itemPonte":     this._boitePonte.afficher(); break;
        case "o_itemChasse":    this._boiteChasse.afficher(); break;
        case "o_itemCombat":    this._boiteCombat.afficher(); break;
        case "o_itemUpdate":    o_openUpdate(); break;
        case "o_itemTDC": if (window.OutiiilTDC && typeof window.OutiiilTDC.toggle === "function") {
            window.OutiiilTDC.toggle();
          } else {
            console.warn("[Outiiil] Parser TDC introuvable (window.OutiiilTDC).");
            alert("Le parseur TDC (ParseurTDC.js) n'est pas chargé.");
          }
          break;

        case "o_itemParametre": this._boiteParametre.afficher(); break;
        default: break;
      }
    });

    // Réinjection si la barre change (ex: re-render d’une boîte)
    const mo = new MutationObserver(() => {
      const $tb = $("#o_toolbarOutiiil");
      if (!$tb.length) return;
      $tb.find('.o_toolbarItem[title="Traceur"], .o_toolbarItem[title="Carte"], #o_itemTraceur, #o_itemMap')
         .closest(".o_toolbarItem").remove();
if (typeof o_injectUpdateButton === 'function') { o_injectUpdateButton($tb); }
if (typeof o_injectTdcButton === 'function')    { o_injectTdcButton($tb); }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
}
