// Init
var table = document.getElementsByTagName("myTable")[0];
var headers = table.getAttribute("headers");
var rows = table.getAttribute("data");
headers = headers.split(';');
rows = rows.split(',');

// Construction de la table
var tab = document.createElement("table");
tab.setAttribute("style", table.getAttribute("style"));
tab.setAttribute("class", "dataTable");

// Headers
var head = document.createElement("thead");
var headRow = document.createElement("tr");
for (let header of headers) {
    let th = document.createElement("th");
    th.setAttribute("onclick", "sortBy('" + header + "')");
    th.innerHTML = header;
    headRow.append(th);
}
head.append(headRow);
tab.append(head);

// Data
var body = document.createElement("tbody");

for (let row of rows) {
    let tr = document.createElement("tr");
    let values = row.split(';');
    for (let value of values) {
        let td = document.createElement("td");
        td.innerHTML = value;
        tr.append(td);
    }
    body.append(tr);
}
tab.append(body);

table.replaceWith(tab);

sortBy = function(elem) {
    let tr = [...body.children];
    let index = headers.indexOf(elem);
    tr.sort((a, b) => compare(a.children[index], b.children[index], 1));
    let isSorted = -1;
    let i = 0;
    for (let r of [...body.children])
        if (r != tr[i++]) {
            isSorted = 1;
            break;
        }

    tr
        .sort((a, b) => compare(a.children[index], b.children[index], isSorted))
        .forEach(node => body.append(node));
}

compare = function(a, b, isSorted) {
    return a.innerHTML.replace(/[<>~]/g,'') > b.innerHTML.replace(/[<>~]/g,'') ? isSorted : -isSorted;
}