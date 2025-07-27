const searchBar = document.getElementById("searchBar");
const clearBtn = document.getElementById("clearBtn");
const searchButton = document.getElementById("searchButton");

const musicItems = Array.from(document.querySelectorAll(".music-1"));
const parent = musicItems[0].parentNode;
const originalOrder = [...musicItems];
let recentSearchOrder = [];
let debounceTimer;

function renderTop7(list) {
    parent.innerHTML = "";
    list.slice(0, 7).forEach(item => {
        item.style.display = "block";
        parent.appendChild(item);
    });
}

function filterMusic(query) {
    query = query.toLowerCase().trim();
    if (!query) {
        const resetList = [
            ...recentSearchOrder,
            ...originalOrder.filter(i => !recentSearchOrder.includes(i))
        ];
        renderTop7(resetList);
        return;
    }
    let matches = [];
    musicItems.forEach(item => {
        const title = (item.querySelector("h2")?.innerText || "").toLowerCase();
        const singer = (item.querySelector("p")?.innerText || "").toLowerCase();
        if (title.includes(query) || singer.includes(query)) matches.push(item);
    });
    matches.forEach(m => {
        recentSearchOrder = recentSearchOrder.filter(i => i !== m);
        recentSearchOrder.unshift(m);
    });
    const combined = [
        ...matches,
        ...originalOrder.filter(i => !matches.includes(i))
    ];
    renderTop7(combined);
}

function handleSearch() {
    filterMusic(searchBar.value);
}

searchBar.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterMusic(this.value), 150);
});

searchBar.addEventListener("keypress", e => e.key === "Enter" && handleSearch());
searchButton.addEventListener("click", handleSearch);

clearBtn.addEventListener("click", () => {
    searchBar.value = "";
    clearBtn.style.display = "none";
    filterMusic("");
});

searchBar.addEventListener("input", () => {
    clearBtn.style.display = searchBar.value ? "block" : "none";
});

renderTop7(originalOrder);

