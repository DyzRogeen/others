function walk(node) {
    let child;

    switch (node.nodeType) {
        case 1:
        case 9:
        case 11:

            const tag = node.tagName.toLowerCase();
            if (["script", "style", "noscript", "iframe", "meta"].includes(tag)) {
                return;
            }

            child = node.firstChild;
            while (child) {
                walk(child);
                child = child.nextSibling;
            }
            break;

        case 3: // text node
            handleText(node)
            break;
    }
}

function handleText(textNode) {
    let text = textNode.nodeValue.toUpperCase();
    text = text.replace(/(OK|ok)/g, (match, p1) => {
        return "04";
    });
    textNode.nodeValue = text;
}

walk(document.body);

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
        walk(addedNode);
    }
}});