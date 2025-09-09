// Init
var imgs = document.getElementsByTagName("img");
for (var img of imgs) {
    img.onclick = showPreview;
    img.setAttribute("class", "previewable");
}

/* PREVISUALISATION IMAGE */
var prevImg = document.createElement("img");
prevImg.setAttribute("class", "previmg");

/* PREVISUALISATION WINDOW */
var preview = document.createElement("div");
preview.setAttribute("class", "img_preview");
preview.appendChild(prevImg);

preview.onclick = closePreview;

function showPreview() {
    preview.style.display = "flex";
    prevImg.src = this.src;
    this.parentElement.appendChild(preview);
}

function closePreview() {
    preview.style.display = "none";
    preview.parentElement = undefined;
}