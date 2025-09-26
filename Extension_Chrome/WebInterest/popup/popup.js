let sites = [];
let activities = [];
let alerts
let current_site_id;
let alertFormElement;
let openAlertFormBtn;
let cancelAlertFormBtn;
let addAlertBtn;
let alertForm;

window.onload = init;

function init() {

    getUserSites();

    alertFormElement = document.getElementById("alertForm");
    openAlertFormBtn = document.getElementById("openAlertFormBtn");
    cancelAlertFormBtn = document.getElementById("cancelAlertFormBtn");
    addAlertBtn = document.getElementById("addAlertBtn");

    openAlertFormBtn.addEventListener("click", () => {
        openAlertFormBtn.hidden = true;
        alertFormElement.hidden = false;
    });

    cancelAlertFormBtn.addEventListener("click", () => {
        openAlertFormBtn.hidden = false;
        alertFormElement.hidden = true;
    });

    addAlertBtn.addEventListener("click", () => addAlert());

    alertForm = document.forms["alertForm"];

    document.getElementById("renew").addEventListener("click", () => {
        document.getElementById("time_input_fs").hidden = alertForm["renew"].value === "true" ? true : false;
    });

};

function getUserSites() {
    chrome.runtime.sendMessage({from: "popup", call: "getUserSites"}, (result) => {
        sites = result;
        
        const list_div = document.getElementById("list");

        let total_time = 0;
        for (let site of sites) total_time += site.time_spent;

        for (let site of sites) {

            let elem = document.createElement("div");
            let info_bar = document.createElement("div");
            let time_bar = document.createElement("div");

            let favicon = document.createElement("img");
            let domain_name = document.createElement("h3");
            let times_visited = document.createElement("h3");

            favicon.setAttribute("src", `https://www.google.com/s2/favicons?domain=${site.domain_name}&sz=64`)
            favicon.setAttribute("class", "favicon");
            domain_name.innerHTML = `${site.domain_name}`;
            times_visited.innerHTML = secondsToStr(site.time_spent, false);
            times_visited.setAttribute("class", "elem_end");
            
            info_bar.appendChild(favicon);
            info_bar.appendChild(domain_name);
            info_bar.appendChild(times_visited);
            info_bar.setAttribute("class", "info_bar");

            const relative_length = parseInt(100 * site.time_spent / total_time);
            time_bar.setAttribute("class", "time_bar");
            time_bar.setAttribute("style", `width: ${relative_length}%`);

            elem.appendChild(info_bar);
            elem.appendChild(time_bar);
            elem.setAttribute("id", site.site_id);
            elem.setAttribute("class", "site_elem");
            elem.addEventListener("click", () => showSiteDetails(site.site_id));
            list_div.appendChild(elem);
        }

        showSiteDetails(sites[0].site_id);
    });
}

function getActivities() {
    chrome.runtime.sendMessage({from: "popup", call: "getActivities", site_id: current_site_id}, (res) => {
        activities = res;
        showGraph();
    });
}

function showGraph() {
    const graph = document.getElementById("activities");
    const ctx = graph.getContext("2d");
    ctx.reset();

    let x = [];
    let y = [];

    if (activities.length === 1) {
        x.push(0);
        y.push(0);
    }

    for (let activity of activities) {
        x.push(activity.date.split("T")[0]);
        y.push(activity.time_spent);
    }
    
    const height_ratio = 150 / Math.max.apply(Math, y);
    const width_ratio = 300 / (x.length - 1);

    document.getElementById("Ymax").innerHTML = secondsToStr(Math.max.apply(Math, y), false);
    
    // Courbe
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "rgba(0, 39, 68, 1)";

    ctx.beginPath();
    ctx.moveTo(0, 150 - y[0] * height_ratio);
    for (let i = 1; i < x.length; i++) {
        ctx.lineTo(i * width_ratio, 150 - y[i] * height_ratio)
        ctx.arc(i * width_ratio, 150 - y[i] * height_ratio, 2, 0, 2 * Math.PI, true);
    }
    ctx.lineTo(310, 160);
    ctx.lineTo(0, 160);
    ctx.closePath();
    ctx.stroke();

    // Remplissage
    ctx.fillStyle = "rgba(0, 150, 255, 0.3)";
    ctx.fill();

    // Axes
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 150);
    ctx.lineTo(300, 150);
    ctx.stroke();
}

function showSiteDetails(site_id) {
    const site = sites.find((s) => s.site_id === site_id);

    const name = document.getElementById("name");
    const ip = document.getElementById("ip");
    const times_visited = document.getElementById("times_visited");
    const time_spent = document.getElementById("time_spent");
    const last_time_visited = document.getElementById("last_time_visited");
    
    name.innerHTML = `Name : ${site.domain_name}`;
    ip.innerHTML = `Ip : ${site.domain_ip}`;
    times_visited.innerHTML = `Visited ${site.times_visited} times.`;
    time_spent.innerHTML = secondsToStr(site.time_spent);
    last_time_visited.innerHTML = `Last time visited : ${site.last_time_visited.split('.')[0].replace("T", " ")}`;
    current_site_id = site_id;

    getActivities();

    if (site.alerte) {
        alerts = site.alerte[0];
        showAlertesDetails();
    }

}

function showAlertesDetails() {
    const listElem = document.getElementById("alert_list");

    listElem.childNodes.forEach((item) => item.remove());

    const credit = document.createElement("div");
    const time_spent = document.createElement("div");
    const time_left = document.createElement("div");
    const renew = document.createElement("div");
    const renew_freq = document.createElement("div");
    const block = document.createElement("div");

    credit.innerHTML = `Credit : ${secondsToStr(alerts.credit, false)}`;
    time_spent.innerHTML = `Time spent : ${secondsToStr(alerts.time_spent, false)}`;
    time_left.innerHTML = `Time left : ${secondsToStr(alerts.credit - alerts.time_spent, false)}`;
    renew.innerHTML = `Renew : ${alerts.renew ? "Yes" : "No"}`;
    if (alerts.renew) renew_freq.innerHTML = `Renew every ${secondsToStr(alerts.renew_frequency, false)}`
    block.innerHTML = `Block : ${alerts.block ? "Yes" : "No"}`;

    listElem.appendChild(credit);
    listElem.appendChild(time_spent);
    listElem.appendChild(time_left);
    listElem.appendChild(renew);
    listElem.appendChild(renew_freq);
    listElem.appendChild(block);

}

function secondsToStr(time, longFormat = true) {
    const days = parseInt(time / (3600 * 24));
    time = time % (3600 * 24);
    const hours = parseInt(time / 3600);
    time = time % 3600;
    const minutes = parseInt(time / 60);
    time = time % 60;
    const seconds = time;

    buffer = "";
    if (longFormat) {
        if (days > 0) buffer += `${days} Days `;
        if (hours > 0) buffer += `${hours} Hours `;
        if (minutes > 0) buffer += `${minutes} Minutes `;
        if (seconds > 0 || days == 0 && hours == 0 & minutes == 0) buffer += `${seconds} Seconds `;
        return buffer;
    }

    if (days > 0) buffer += `${days}d`;
    if (hours > 0) buffer += `${hours}h`;
    if (minutes > 0) buffer += `${minutes}m`;
    if (seconds > 0 || days == 0 && hours == 0 & minutes == 0) buffer += `${seconds}s`;
    return buffer;
    
}

function addAlert() {

    const alerte = {};

    alerte.site_id = current_site_id;

    alerte.credit = alertForm["creditD"].value * 3600 * 24 + alertForm["creditH"].value * 3600 + alertForm["creditM"].value * 60 + alertForm["creditS"].value * 1;

    alerte.renew = alertForm["renew"].value === "true" ? true : false;

    if (alerte.renew) alerte.renew_freq = alertForm["renewD"].value * 3600 * 24 + alertForm["renewH"].value * 3600 + alertForm["renewM"].value * 60 + alertForm["renewS"].value * 1;

    alerte.block = alertForm["block"].value === "true" ? true : false;

    chrome.runtime.sendMessage({from: "popup", call: "addAlerte", data: alerte}, (res) => {
        openAlertFormBtn.hidden = false;
        alertFormElement.hidden = true;
        alerts = res.json();
        showAlertesDetails()
        alertForm.reset();
    });

}