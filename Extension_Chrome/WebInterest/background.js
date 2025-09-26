chrome.runtime.onMessage.addListener((msg, sender, res) => {
    
    console.log("MSG", msg)
    if (msg.from === "popup") {

        msg.user_id = user_id;
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, msg, (result) => {
                res(result);
            });
        });
        return true;

    }

    if (msg.from === "content") {
        if (msg.call === "getUserId") {
            res(user_id);
            return true;
        }
    }
    
});

let user_id;
let stats = {};
let timer = null;
let current_domain_name;
let unfocused = false;

async function handleTime(url) {

    if (user_id === undefined) await getUserId();

    console.log(url);

    let new_domain_name;
    
    if (url !== undefined) new_domain_name = new URL(url).hostname;
    
    if (current_domain_name !== undefined && timer !== null) {
        stats[current_domain_name] = (stats[current_domain_name] || 0) + (Date.now() - timer) / 1000;
    }

    timer = Date.now();
    current_domain_name = new_domain_name;

}

function sendStats() {
    //if (unfocused) return;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.lenght === 0) return;
        chrome.tabs.sendMessage(tabs[0].id, {call: "sendUserStats", data: {user_id: user_id, stats: stats}}, (res) => {
            stats = {};
        });
    });
}

function getUserId() {
    chrome.identity.getProfileUserInfo(info => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {call: "getUserId", data: info}, (res) => {
                console.log("uid : ", res);
                user_id = res;
            });
        });
    });
}

chrome.tabs.onActivated.addListener(async (info) => {
    console.log("ON ACTIVATED");
    handleTime((await chrome.tabs.get(info.tabId)).url);
});

chrome.tabs.onUpdated.addListener((id, info, tab) => {
    console.log("ON UPDATE");
    if (tab.active && info.status === "complete")
        handleTime(tab.url);
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
    console.log("ON FOCUS CHANGED");
    if (unfocused = (windowId === chrome.windows.WINDOW_ID_NONE)) handleTime(undefined);
    else {
        timer = Date.now();
        handleTime((await chrome.tabs.query({ active: true, currentWindow: true }))[0].url);
    }
});

// Envoie les résultats à la base toutes les 30 secondes
setInterval(async () => {
    if (user_id === undefined) await getUserId();
    if (current_domain_name) {
        stats[current_domain_name] = (stats[current_domain_name] || 0) + (Date.now() - timer) / 1000;
    }
    timer = Date.now();
    sendStats();
}, 15000);

chrome.runtime.onInstalled.addListener(() => {
    console.log("INSTALLED");
    getUserId();
})