function handleSearch() {
  const query = document.getElementById("searchBar").value.trim();

  if (query === "") {
    alert("Please search any book or author or publishers !");
    return;
  }
  const zlibUrl = `https://www.smule.com/search?q=/${encodeURIComponent(query)}`;
  window.open(zlibUrl, "_blank");
}

document.getElementById("searchButton").addEventListener("click", handleSearch);
document.getElementById("searchBar").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
document.getElementById("searchButton").addEventListener("click", handleSearch);
document.getElementById("searchBar").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});