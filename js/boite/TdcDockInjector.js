/* Outiiil — TdcDockInjector (REMOVER ONLY)
   - Ne crée AUCUN bouton
   - Supprime nos anciens boutons et leurs styles associés
*/
(function () {
  'use strict';

  function removeButtons() {
    const toolbar = document.querySelector('#o_toolbarOutiiil, #o_toolbarOutiiilTop');
    if (!toolbar) return;

    // Supprime le bouton mentionné et toutes nos variantes possibles
    const selectors = [
      '#o_iconParserTDC2',     // <span> de la version ultra-légère
      '#o_btnParserTDC',       // wrapper de la version ultra-légère
      '#o_itemParserTDC',      // <span> des versions précédentes
      '#o_toolbarItemTDC',     // wrapper des versions précédentes
      '#o_itemTDC',            // tout premier essai
      '#o_toolbarItem5b'       // ancien wrapper
    ];

    selectors.forEach(sel => {
      toolbar.querySelectorAll(sel).forEach(node => {
        const item = node.closest('.o_toolbarItem') || node;
        item.remove();
      });
    });

    // Supprime nos styles injectés
    ['#o_tdcCssLite', '#o_tdcCssDock', '#o_tdcForceCss', '#o_tdcForceCss2']
      .forEach(id => { const el = document.querySelector(id); if (el) el.remove(); });

    console.info('[Outiiil] TdcDockInjector: boutons TDC supprimés (remover only).');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeButtons);
  } else {
    removeButtons();
  }
})();
