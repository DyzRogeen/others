async function process() {
    const user_id = await chrome.runtime.sendMessage({from: "content", call: "getUserId"});

    const domain_name = window.location.hostname;
    const res = await (await fetch(`https://dns.google/resolve?name=${domain_name}&type=A`)).json();
    let domain_ip = res.Answer[0].data;
    if (domain_ip.length > 15) domain_ip = "/";

    console.log(user_id, domain_name, res.Answer[0].data);
    await fetch("https://172.23.71.204:3001/sites", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"domain_name": domain_name, "domain_ip": domain_ip, "user_id": user_id })
    });
}

chrome.runtime.onMessage.addListener((msg, sender, res) => {
    
    if (msg.call === "getUserId") {
        const info = msg.data;
        fetch("https://172.23.71.204:3001/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"googleId": info.id, "name": info.email.split("@")[0] })
        }).then(r => r.json()).then(d => res(d.id));
        return true;
    }

    if (msg.call === "sendUserStats") {
        const info = msg.data;
        fetch(`https://172.23.71.204:3001/sites/updateStats/${msg.data.user_id}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(msg.data.stats)
        }).then(r => r.json()).then(d => res(d.id));
        return true;
    }
    
    if (msg.call === "getUserSites") {
        fetch(`https://172.23.71.204:3001/sites/${msg.user_id}`)
        .then(res => res.json())
        .then(sites => res(sites));
        return true;
    }

    if (msg.call === "getActivities") {
        fetch(`https://172.23.71.204:3001/activities/${msg.site_id}`)
        .then(res => res.json())
        .then(sites => res(sites));
        return true;
    }

    if (msg.call === "addAlerte") {
        fetch("https://172.23.71.204:3001/alertes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(msg.data)
        }).then(r => r.json()).then(d => res(d));
        return true;
    }

});

process();
