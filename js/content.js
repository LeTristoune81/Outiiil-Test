const OUTIIL_ROOT        = 'https://cdn.jsdelivr.net/gh/LeTristoune81/Outiiil@main/';

/*
 * main.js
 * Hraesvelg
 **********************************************************************/

/**
* CONSTANTE
*/
const VERSION            = "2.0.1.1";
const CONSTRUCTION       = ["Champignonnière", "Entrepôt de Nourriture", "Entrepôt de Matériaux", "Couveuse", "Solarium", "Laboratoire", "Salle d'analyse", "Salle de combat", "Caserne", "Dôme", "Loge Impériale", "Etable à pucerons", "Etable à cochenilles"];
const RECHERCHE          = ["Technique de ponte", "Bouclier Thoracique", "Armes", "Architecture", "Communication avec les animaux", "Vitesse de chasse", "Vitesse d'attaque", "Génétique", "Acide", "Poison"];
const COUT_CONSTUCTION   = [90, 600, 600, 600, 2000, 1400, 1400, 300, 800, 3500, 5000, 1500, 10000];
const COUT_RECHERCHE_POM = [120, 200, 300, 100, 200, 4000, 3000, 3000, 100000, 40000000];
const COUT_RECHERCHE_BOI = [120, 300, 200, 200, 500, 2500, 1000, 10000, 300000, 15000000];
const NOM_UNITE          = ["Ouvrière", "Jeune Soldate Naine", "Soldate Naine", "Naine d’Elite", "Jeune Soldate", "Soldate", "Concierge", "Concierge d’élite", "Artilleuse", "Artilleuse d’élite", "Soldate d’élite", "Tank", "Tank d’élite", "Tueuse", "Tueuse d’élite"];
const NOM_UNITES         = ["Ouvrières", "Jeunes Soldates Naines", "Soldates Naines", "Naines d’Elites", "Jeunes Soldates", "Soldates", "Concierges", "Concierges d’élites", "Artilleuses", "Artilleuses d’élites", "Soldates d’élites", "Tanks", "Tanks d’élites", "Tueuses", "Tueuses d’élites"];
const NOM_RAC_UNITE      = ["Ouvrière", "JSN", "SN", "NE", "JS", "S", "C", "CE", "A", "AE", "SE", "Tk", "TkE", "Tu", "TuE"];
const TEMPS_UNITE        = [60, 300, 450, 570, 740, 1000, 1410, 1410, 1440, 1520, 1450, 1860, 1860, 2740, 2740];
const COUT_UNITE         = [5, 16, 20, 26, 30, 36, 70, 100, 30, 34, 44, 100, 150, 80, 90];
const VIE_UNITE          = [-1, 8, 10, 13, 16, 20, 30, 40, 10, 12, 27, 35, 50, 50, 55];
const ATT_UNITE          = [-1, 3, 5, 7, 10, 15, 1, 1, 30, 35, 24, 55, 80, 50, 55];
const DEF_UNITE          = [-1, 2, 4, 6, 9, 14, 25, 35, 15, 18, 23, 1, 1, 50, 55];
const RATIO_CHASSE       = [1, 2, 3, 4, 5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10];
const PERTE_MIN_CHASSE   = [0.103971824, 0.066805442, 0.036854146, 0.014477073, 0.010067247, 0.008361713, 0.00751662, 0.007060666, 0.006692853, 0.006402339, 0.006090569, 0.0057788, 0.005080623];
const PERTE_MOY_CHASSE   = [0.14183641, 0.089382202, 0.065595625, 0.037509208, 0.024982573, 0.018532185, 0.014281932, 0.011725921, 0.010437083, 0.009834768, 0.009339662, 0.008844556, 0.008502895];
const PERTE_MAX_CHASSE   = [0.33333334, 0.176739357, 0.113191158, 0.08245817, 0.051342954, 0.036955988, 0.03395735, 0.032083615, 0.026461955, 0.024588162, 0.021774264, 0.018960366, 0.017190797];
const ORDRE_UNITE_CHASSE = [10, 3, 4, 1, 12, 7, 5, 13, 11, 9, 8, 6, 2];
const ORDRE_XP_CHASSE    = [10, 3, 4, 1, 12, 7, 5];
const REPLIQUE_CHASSE    = [0, 0, 0, 0.016, 0.093, 0.345, 0.577777778, 0.753, 0.837, 0.874, 0.937, 0.96, 0.989];
// Image chat, messagerie de fourmizzz

const LISTESMILEY5 = ``;
const LISTESMILEY6 = ``;

// Images diverses de fourmizzz via jsDelivr
const IMG_FLECHE      = `<img src="${OUTIIL_ROOT}images/icone/fleche-bas-claire.png" style="vertical-align:1px;" alt="changer" height="8">`;
const IMG_POMME       = `<img src="${OUTIIL_ROOT}images/icone/icone_pomme.gif" alt="Nourriture" class="o_vAlign" height="18" title="Consommation Journalière" />`;
const IMG_MAT         = `<img src="${OUTIIL_ROOT}images/icone/icone_bois.gif" alt="Matériaux" height="18"/>`;
const IMG_VIE         = `<img src="${OUTIIL_ROOT}images/icone/icone_coeur.gif" class="o_vAlign" height="18" width="18"/>`;
const IMG_ATT         = `<img src="${OUTIIL_ROOT}images/icone/icone_degat_attaque.gif" alt="Dégâts en attaque :" class="o_vAlign" height="18" title="Dégâts en attaque :" />`;
const IMG_DEF         = `<img src="${OUTIIL_ROOT}images/icone/icone_degat_defense.gif" alt="Dégâts en défense :" class="o_vAlign" height="18" title="Dégâts en défense :" />`;
const IMG_GAUCHE      = `<img src="${OUTIIL_ROOT}images/bouton/fleche-champs-gauche.gif" width="9" height="15" class="o_vAlign"/>`;
const IMG_DROITE      = `<img src="${OUTIIL_ROOT}images/bouton/fleche-champs-droite.gif" width="9" height="15" class="o_vAlign"/>`;
const IMG_COPY        = `<img src="${OUTIIL_ROOT}images/icone/feuille.gif" class="cliquable" title="Copier/Coller une armée" style="position:relative;top:3px" width="14" height="17"/>`;
// Images spécifiques Outiiil
const IMG_CHANGE      = OUTIIL_ROOT + 'images/change.png';
const IMG_ACTUALISER  = OUTIIL_ROOT + 'images/actualize_on_01.png';
const IMG_CRAYON      = OUTIIL_ROOT + 'images/crayon.gif';
const IMG_CROIX       = OUTIIL_ROOT + 'images/croix.png';
const IMG_COPIER      = OUTIIL_ROOT + 'images/copy.png';
const IMG_HISTORIQUE  = OUTIIL_ROOT + 'images/historique.png';
const IMG_LIVRAISON   = OUTIIL_ROOT + 'images/livraison.png';
const IMG_RADAR       = OUTIIL_ROOT + 'images/radar.png';
const IMG_SPRITE_MENU = OUTIIL_ROOT + 'images/sprite_menu.png';
const IMG_UTILITY     = OUTIIL_ROOT + 'images/utility.png';
const IMG_DOWN        = OUTIIL_ROOT + 'images/down.png';
const IMG_UP          = OUTIIL_ROOT + 'images/up.png';
const IMG_OUTIIIL     = OUTIIL_ROOT + 'images/outiiil.png';

const TOAST_ERROR        = {heading : "Erreur", hideAfter: 3500, showHideTransition : "slide", position: {top : 30, right : 100}, icon : "error"};
const TOAST_SUCCESS      = {heading : "Succès", hideAfter: 3500, showHideTransition : "slide", position: {top : 30, right : 100}, icon : "success"};
const TOAST_WARNING      = {heading : "Attention", hideAfter: 3500, showHideTransition : "slide", position: {top : 30, right : 100}, icon : "warning"};
const TOAST_INFO         = {heading : "Information", hideAfter: 3500, showHideTransition : "slide", position: {top : 30, right : 100}, icon : "info"};
const EVOLUTION          = [...CONSTRUCTION, ...RECHERCHE, "Nourriture", "Materiaux"];
const EFFET              = ["", "Blind", "Bounce", "Clip", "Drop", "Explode", "Fade", "Fold", "Highlight", "Puff", "Pulsate", "Scale", "Shake", "Size", "Slide"];
const METHODE_FLOOD      = ["Standard", "Optimisée", "Uniforme", "Dégressive"];
const LIEU               = {TERRAIN : 0, DOME : 1, LOGE : 2};
const LIBELLE_LIEU       = ["Terrain de Chasse", "fourmilière", "Loge Impériale"];
const ETAT_COMMANDE      = {"Nouvelle" : 0, "En attente" : 1, "En cours" : 2, "Annulée" : 3, "Terminée" : 4, "Supprimée" : 5};
const MOIS_FR            = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const MOIS_RAC_FR        = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
const JOUR_FR            = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const DATEPICKER_OPTION  = {
    closeText : 'Fermer',
    prevText : 'Précédent',
    nextText : 'Suivant',
    currentText : 'Aujourd\'hui',
    monthNames  : MOIS_FR,
    monthNamesShort : MOIS_RAC_FR,
    dayNames : JOUR_FR,
    dayNamesShort : ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    dayNamesMin : ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekHeader : 'Sem.',
    dateFormat : 'dd-mm-yy',
    firstDay : '1',
    changeYear : true,
    changeMonth : true
};

/**
* Classe principale du projet : appelle les classes en fonction de la route.
*
* @class Main
*/
!function()
{
	// si l'utilisateur est identifié
	if ($(".boite_connexion_titre:first").text() != "Connexion"){
        // Modification du theme jquery humanity
        $("head").append("<link rel='stylesheet' href='http://code.jquery.com/ui/1.12.1/themes/humanity/jquery-ui.min.css'/>");
		// Chargement du language francais
        numeral.locale("fr");
		moment.locale("fr");
		Highcharts.setOptions({lang : {months : MOIS_FR, shortMonths : MOIS_RAC_FR, weekdays : JOUR_FR, decimalPoint : ',', thousandsSep : ' '}});
        // Ajout du tri pour les nombres
        $.fn.dataTable.ext.type.order["quantite-grade-pre"] = (d) => {return parseInt(d.replace(/\s/g, ''));};
        $.fn.dataTable.ext.type.order["moment-D MMM YYYY-pre"] = (d) => {return moment(d.replace('.', ''), "D MMM YYYY", "fr", true).unix();};
        $.fn.dataTable.ext.type.order["time-unformat-pre"] = (d) => {return Utils.timeToInt(d);};

        // Initialisation du profil du joueur en cours
        monProfil = new Joueur({pseudo : $("#pseudo").text()});
        // chargement des parametre
        monProfil.getParametre();
        // des qu'on les inos constructions/recherches et profil on affiches les outils
        Promise.all([monProfil.getConstruction(), monProfil.getLaboratoire(), monProfil.getProfilCourant()]).then((values) => {
            // chargement des données du joueur
            if(values[0]) monProfil.chargerConstruction(values[0]);
            if(values[1]) monProfil.chargerRecherche(values[1]);
            if(values[2]) monProfil.chargerProfil(values[2]);

            // Ajout des outils
            let boite = new Dock();
            boite.afficher();
            // boite compte plus
            let boiteComptePlus = new BoiteComptePlus();
            boiteComptePlus.afficher();
            // Boite radar
            let boiteRadar = new BoiteRadar();
            boiteRadar.afficher();

            // Traceur
            if(monProfil.parametre["cleTraceur"].valeur){
                let traceur1 = new TraceurJoueur(monProfil.parametre["etatTraceurJoueur"].valeur, monProfil.parametre["intervalleTraceurJoueur"].valeur, monProfil.parametre["nbPageTraceurJoueur"].valeur);
                traceur1.tracer();
                let traceur2 = new TraceurAlliance(monProfil.parametre["etatTraceurAlliance"].valeur, monProfil.parametre["intervalleTraceurAlliance"].valeur);
                traceur2.tracer();
            }

            let uri = location.pathname, page = null;
            // Routing
            switch (true){
                case (uri == "/Reine.php") :
                    page = new PageReine(boiteComptePlus);
                    if(!Utils.comptePlus) page.plus();
                    break;
                case (uri == "/construction.php") :
                    page = new PageConstruction(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/laboratoire.php") :
                    page = new PageLaboratoire(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/Ressources.php") :
                    page = new PageRessource(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/Armee.php") :
                    page = new PageArmee(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/commerce.php") :
                    page = new PageCommerce(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/messagerie.php") :
                    page = new PageMessagerie();
                    page.executer();
                    break;
                case (uri == "/alliance.php" && location.search == "") :
                case (uri == "/chat.php") :
                    page = new PageChat();
                    page.executer();
                    break;
                case (location.href.indexOf("/alliance.php?forum_menu") > 0) :
                    page = new PageForum();
                    page.executer();
                    break;
                case (location.href.indexOf("/alliance.php?Membres") > 0) :
                    page = new PageAlliance();
                    page.executer();
                    break;
                case (location.href.indexOf("/Membre.php?Pseudo") > 0) :
                case (uri == "/Membre.php") :
                    page = new PageProfil(boiteRadar);
                    page.executer();
                    break;
                case (uri == "/classementAlliance.php" && Utils.extractUrlParams()["alliance"] != "" && Utils.extractUrlParams()["alliance"] != undefined) :
                    page = new PageDescription(boiteRadar);
                    page.executer();
                    break;
                case (location.href.indexOf("/ennemie.php?Attaquer") > 0) :
                case (location.href.indexOf("/ennemie.php?annuler") > 0) :
                    page = new PageAttaquer(boiteComptePlus);
                    page.executer();
                    break;
                case (uri == "/ennemie.php" && location.search == "") :
                    // Affichage des temps de trajet
                    $("#tabEnnemie tr:eq(0) th:eq(5)").after("<th class='centre'>Temps</th>");
                    $("#tabEnnemie tr:gt(0)").each((i, elt) => {
                        let distance = parseInt($(elt).find("td:eq(5)").text());
                        $(elt).find("td:eq(5)").after(`<td class='centre'>${Utils.intToTime(Math.ceil(Math.pow(0.9, monProfil.niveauRecherche[6]) * 637200 * (1 - Math.exp(-(distance / 350)))))}</td>`);
                    });
                    break;
                default:
                    break;
            }
        });
    }
}();
