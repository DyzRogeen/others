var dico = {
    "NaClO" : "Hypochlorite de Sodium",
    "H₂SO₄": "Acide Sulfurique",
    "NaCl": "Sel de Table",
    "NaOH": "Soude Caustique",
    "HNO₃": "Acide Nitrique",
    "HCl": "Acide Chloridrique",
    "NH₃": "Ammoniaque",
    "CaCO₃": "Carbonate de Calcium",
    "CaC₂": "Carbure de Calcium",
    "CH₂O": "Méthanal/Formol",
    "C₂H₂": "Acétylène",
}

$(document.getElementById("header")).load("Utils/header.html");

var areLinksOn = false;

var routeur = document.getElementById("routeur");
let goTo = (pageName) => {
    $(routeur).load("pages/" + pageName + ".html");
    areLinksOn = false;
    window.location.href = "#" + pageName;
}
goTo(window.location.href.split("#")[1]);

// Fonction pour transformer une chaîne de caractères spécifique en lien
function transformTextToLink() {

    if (areLinksOn) return;

    areLinksOn = true;
    // Sélectionne tous les éléments textuels de la page où la transformation doit s'appliquer
    const elements = routeur.querySelectorAll("*:not(script):not(style):not(link)");
    // Parcours de tous les éléments pour trouver et remplacer le texte
    elements.forEach(element => {
        // Vérifie si l'élément contient un noeud textuel
        element.childNodes.forEach(child => {
            if (child.nodeType !== 3) return; // 3 signifie Node de type texte

            let content = child.textContent;
            let isModified = false;
            for (const [key, value] of Object.entries(dico))
                if (new RegExp(`[^<a.*><b>]${key}`, "gi").test(content)) {
                    content = content.replace(key, `<a style="color: blue;text-decoration: underline;cursor: pointer" title="${value}"><b>${key}</b></a>`);
                    isModified = true;
                }

            if (isModified) {
                const newNode = document.createElement("span");
                newNode.innerHTML = content;
                child.replaceWith(newNode);
            }
        });
    });
}