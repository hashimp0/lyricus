const searchBar = document.getElementById("searchBar");
const musicItems = Array.from(document.querySelectorAll(".music-1"));
const parent = musicItems[0].parentNode;
const originalOrder = [...musicItems];

let debounceTimer;
let recentItem = null;

// --- Function to show only 2 rows with recent first ---
function showInitialRows() {
    parent.innerHTML = "";

    // 1) Put recent searched item first (if exists)
    if (recentItem) {
        recentItem.style.display = "block";
        parent.appendChild(recentItem);
    }

    // 2) Fill remaining slots (7 or 8 depending on recent item)
    let slots = recentItem ? 7 : 8;
    let shown = 0;

    for (let item of originalOrder) {
        if (item === recentItem) continue; // skip recent (already added)
        item.style.display = "block";
        parent.appendChild(item);
        shown++;
        if (shown >= slots) break;
    }
}

showInitialRows();

function filterMusic(query) {
    query = query.toLowerCase().trim();

    // If no search, just show initial layout
    if (!query) {
        showInitialRows();
        return;
    }

    parent.innerHTML = "";
    let matches = [];

    musicItems.forEach(item => {
        const title = (item.getAttribute("data-title") || item.innerText).toLowerCase();
        if (title.includes(query)) {
            item.style.display = "block";
            matches.push(item);
        } else {
            item.style.display = "none";
        }
    });

    if (matches.length > 0) {
        recentItem = matches[0];  // update most recent searched
        matches.forEach(match => parent.prepend(match));
    } else {
        console.log("No results found");
    }
}

function handleSearch() {
    filterMusic(searchBar.value);
}

searchBar.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterMusic(this.value), 150);
});

document.getElementById("searchButton").addEventListener("click", handleSearch);
document.getElementById("searchBar").addEventListener("keypress", (event) => {
    if (event.key === "Enter") handleSearch();
});

