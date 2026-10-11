import "./shared.js";
import { getDestinations, renderDestinations, setupDestinationDialog } from "./destinations.js";
import { getFavorites } from "./storage.js";

try {
  const destinations = await getDestinations();
  const container = document.querySelector("#destination-list");
  const search = document.querySelector("#search-input");
  const region = document.querySelector("#region-filter");
  const type = document.querySelector("#type-filter");
  const favoriteToggle = document.querySelector("#favorites-toggle");
  const count = document.querySelector("#result-count");
  let favoritesOnly = false;

  [...new Set(destinations.map((item) => item.region))].sort().forEach((value) => region.add(new Option(value, value)));
  [...new Set(destinations.map((item) => item.type))].sort().forEach((value) => type.add(new Option(value, value)));

  function update() {
    const query = search.value.trim().toLowerCase();
    const selectedRegion = region.value;
    const selectedType = type.value;
    const favorites = getFavorites();
    const filtered = destinations.filter((item) => {
      const matchesQuery = `${item.name} ${item.region} ${item.type} ${item.shortDescription} ${item.activities.join(" ")}`.toLowerCase().includes(query);
      const matchesRegion = selectedRegion === "all" || item.region === selectedRegion;
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesFavorite = !favoritesOnly || favorites.includes(item.id);
      return matchesQuery && matchesRegion && matchesType && matchesFavorite;
    });
    renderDestinations(filtered, container);
    count.textContent = `${filtered.length} of ${destinations.length} destinations`;
  }

  [search, region, type].forEach((control) => control.addEventListener("input", update));
  favoriteToggle.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    favoriteToggle.setAttribute("aria-pressed", String(favoritesOnly));
    favoriteToggle.textContent = favoritesOnly ? "Show all destinations" : "Show favorites";
    update();
  });
  document.addEventListener("favorites-changed", update);
  setupDestinationDialog(destinations);
  update();
} catch (error) {
  const container = document.querySelector("#destination-list");
  if (container) container.innerHTML = '<p class="status-message">Destinations could not be loaded. Please run the site with a local server and try again.</p>';
}
