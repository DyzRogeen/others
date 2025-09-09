//Init
class Element {
    constructor(id, symb, name, family, atomMass, fuseT = NaN, ebulT = NaN) {
        this.id = id;
        this.symb = symb;
        this.name = name;
        this.family = family;
        this.atomMass = atomMass;
        this.fuseT = fuseT;
        this.ebulT = ebulT;
    }
}
const elemFamily = Object.freeze({
    alc : 'Métal alcalin',
    alcTerr : "Métal alcalino-Terreux",
    trans : 'Métal de transition',
    posTrans : 'Métal post-transition',
    metide : 'Métalloïde',
    nMetRe : 'Non Métaux Réactifs',
    nob : 'Gaz noble',
    lan : 'Lanthanide',
    act : 'Actinide',
})

var datas = [
    new Element(1, "H", "Hydrogène", elemFamily.nMetRe, 1.0078, -259.14, -252.87),
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    new Element(2, "He", "Hélium", elemFamily.nob, 4.0026, NaN, -268.93),
    new Element(3, "Li", "Lithium", elemFamily.alc),
    new Element(4, "Be", "Béryllium", elemFamily.alcTerr),
    0,0,0,0,0,0,0,0,0,0,0,
    new Element(5, "B", "Bore", elemFamily.metide),
    new Element(6, "C", "Carbone", elemFamily.nMetRe),
    new Element(7, "N", "Azote", elemFamily.nMetRe),
    new Element(8, "O", "Oxygène", elemFamily.nMetRe),
    new Element(9, "F", "Fluor", elemFamily.nMetRe),
    new Element(10, "Ne", "Néon", elemFamily.nob),

    new Element(11, "Na", "Sodium", elemFamily.alc),
    new Element(12, "Mg", "Magnésium", elemFamily.alcTerr),
    0,0,0,0,0,0,0,0,0,0,0,
    new Element(13, "Al", "Aluminium", elemFamily.posTrans),
    new Element(14, "Si", "Silicium", elemFamily.alcTerr),
    new Element(15, "P", "Phosphore", elemFamily.nMetRe),
    new Element(16, "S", "Soufre", elemFamily.nMetRe),
    new Element(17, "Cl", "Chlore", elemFamily.nMetRe),
    new Element(18, "Ar", "Argon", elemFamily.nob),

    new Element(19, "K", "Potassium", elemFamily.alc),
    new Element(20, "Ca", "Calcium", elemFamily.alcTerr),
    new Element(21, "Sc", "Scandium", elemFamily.trans),
    new Element(22, "Ti", "Titane", elemFamily.trans),
    new Element(23, "V", "Vanadium", elemFamily.trans),
    new Element(24, "Cr", "Chrome", elemFamily.trans),
    new Element(25, "Mn", "Manganèse", elemFamily.trans),
    new Element(26, "Fe", "Fer", elemFamily.trans),
    new Element(27, "Co", "Cobalt", elemFamily.trans),
    new Element(28, "Ni", "Nickel", elemFamily.trans),
    new Element(29, "Cu", "Cuivre", elemFamily.trans),
    new Element(30, "Zn", "Zinc", elemFamily.trans),
    new Element(31, "Ga", "Gallium", elemFamily.posTrans),
    new Element(32, "Ge", "Germanium", elemFamily.metide),
    new Element(33, "As", "Arsenic", elemFamily.metide),
    new Element(34, "Se", "Sélénium", elemFamily.nMetRe),
    new Element(35, "Br", "Brome", elemFamily.nMetRe),
    new Element(36, "Kr", "Krypton", elemFamily.nob),

    new Element(37, "Rb", "Rubidium", elemFamily.alc),
    new Element(38, "Sr", "Strontium", elemFamily.alcTerr),
    new Element(39, "Y", "Ytterbium", elemFamily.trans),
    new Element(40, "Zr", "Zirconium", elemFamily.trans),
    new Element(41, "Nb", "Niobium", elemFamily.trans),
    new Element(42, "Mo", "Molybdène", elemFamily.trans),
    new Element(43, "Tc", "Technetium", elemFamily.trans),
    new Element(44, "Ru", "Ruthénium", elemFamily.trans),
    new Element(45, "Rh", "Rhodium", elemFamily.trans),
    new Element(46, "Pd", "Paladium", elemFamily.trans),
    new Element(47, "Ag", "Argent", elemFamily.trans),
    new Element(48, "Cd", "Cadmium", elemFamily.trans),
    new Element(49, "In", "Indium", elemFamily.posTrans),
    new Element(50, "Sn", "Etain", elemFamily.posTrans),
    new Element(51, "Sb", "Antimoine", elemFamily.metide),
    new Element(52, "Te", "Tellure", elemFamily.metide),
    new Element(53, "I", "Iode", elemFamily.nMetRe),
    new Element(54, "Xe", "Xenon", elemFamily.nob),
]

var perioTable = document.getElementsByTagName("perioTable")[0];

var table = document.createElement("table");
table.setAttribute("class", "perioTable");

var line = document.createElement("tr");

var i = 0;
for (var elem of datas) {
    if (i == 19) {
        i = 0;
        table.appendChild(line);
        line = document.createElement("tr");
    }

    var td = document.createElement("td");
    td.setAttribute("class", "perioTd");

    if (elem != 0) {
        td.innerHTML = elem.symb;
    }
   
    line.appendChild(td);
    i++;
}

perioTable.appendChild(table);

