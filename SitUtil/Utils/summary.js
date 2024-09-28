// Init
var summ = document.getElementsByTagName("summ")[0];
var sections = document.getElementsByClassName("subjectSection");

// Construction du sommaire
var summElem = document.createElement("div");
summElem.setAttribute("class", "summary");

var title = document.createElement("b");
title.innerText = "Sommaire";
summElem.append(title);

var list = document.createElement("ul");
list.setAttribute("class", "summList");

for (let section of sections) {
    let secName = section.firstElementChild.innerText;
    let sec = document.createElement("li");
    let ref = document.createElement("a");
    sec.setAttribute("class", "summLink");

    ref.setAttribute("href", "#" + secName);
    ref.textContent = secName;

    let offset = document.createElement("span");
    offset.setAttribute("id", secName);
    offset.setAttribute("style", "position:absolute; top:-100px;");
    section.append(offset);

    sec.append(ref);
    list.append(sec);
}

summElem.append(list);
summ.replaceWith(summElem)