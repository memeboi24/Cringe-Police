// Function to replace specified words in text content
function replaceWords(node) {
    const replacements = {
        "skibidi": "***",
        " rizz ": "***",
        "fanum tax": "***",
        "skibidi toilet": "***",
        "gyatt": "***",
        "Sigma": "***",
        "Rizzler": "***",
        "In Ohio": "***",
        " Edge ": "***",
    };
    
    // Regular expression to match the specified words
    const regex = new RegExp(Object.keys(replacements).join("|"), "gi");
    
    // Recursive function to traverse the DOM tree and replace text content
    function replaceText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = node.nodeValue.replace(regex, match => replacements[match.toLowerCase()]);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const childNode of node.childNodes) {
                replaceText(childNode);
            }
        }
    }
    
    replaceText(node);
}

// Observer configuration to observe changes in the DOM
const observerConfig = {
    childList: true,
    subtree: true
};

// Function to handle mutations in the DOM
function handleMutations(mutationsList, observer) {
    for(const mutation of mutationsList) {
        for(const addedNode of mutation.addedNodes) {
            replaceWords(addedNode);
        }
    }
}

// Create a MutationObserver instance
const observer = new MutationObserver(handleMutations);

// Start observing the document body for changes
observer.observe(document.body, observerConfig);

// Initial call to replace words in existing content
replaceWords(document.body);
