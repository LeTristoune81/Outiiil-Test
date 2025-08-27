// --- à la toute fin de src/legacy/outiiil-legacy.js ---
try {
  Object.assign(window, {
    Joueur,
    Utils,
    Dock,
    BoiteComptePlus,
    BoiteRadar,
    TraceurJoueur,
    TraceurAlliance,
    PageReine,
    PageConstruction,
    PageLaboratoire,
    PageRessource,
    PageArmee,
    PageCommerce,
    PageMessagerie,
    PageChat,
    PageForum,
    PageAlliance,
    PageProfil,
    PageDescription,
    PageAttaquer
  });
} catch (e) {
  console.warn('[Outiiil] export globals partiel:', e);
}
