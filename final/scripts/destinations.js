import { getFavorites, isFavorite, toggleFavorite } from "./storage.js";

export async function getDestinations() {
  try {
    const response = await fetch("data/destinations.json");
    if (!response.ok) throw new Error(`Destination data request failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Destination data must be an array.");
    return data;
  } catch (error) {
    console.error("Unable to load destinations:", error);
    throw error;
  }
}

export function destinationCard(destination) {
  return `
    <article class="destination-card">
      <img src="images/${destination.image}" alt="${destination.imageAlt}" width="600" height="400" loading="lazy">
      <div class="card-content">
        <span class="card-meta">${destination.region} · ${destination.type}</span>
        <h3>${destination.name}</h3>
        <p>${destination.shortDescription}</p>
        <div class="card-actions">
          <button class="button details-button" type="button" data-destination-id="${destination.id}">View details</button>
          <button class="favorite-button" type="button" data-favorite-id="${destination.id}" aria-pressed="${isFavorite(destination.id)}" aria-label="${isFavorite(destination.id) ? "Remove" : "Save"} ${destination.name} ${isFavorite(destination.id) ? "from" : "to"} favorites">${isFavorite(destination.id) ? "★ Saved" : "☆ Save"}</button>
        </div>
      </div>
    </article>`;
}

export function renderDestinations(destinations, container) {
  if (!container) return;
  if (destinations.length === 0) {
    container.innerHTML = '<p class="status-message">No destinations match your filters. Try another search.</p>';
    return;
  }
  container.innerHTML = destinations.map(destinationCard).join("");
  container.querySelectorAll("[data-favorite-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.favoriteId;
      toggleFavorite(id);
      const saved = isFavorite(id);
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "★ Saved" : "☆ Save";
      button.setAttribute("aria-label", `${saved ? "Remove" : "Save"} ${id} ${saved ? "from" : "to"} favorites`);
      document.dispatchEvent(new CustomEvent("favorites-changed", { detail: { favorites: getFavorites() } }));
    });
  });
  container.querySelectorAll("[data-destination-id]").forEach((button) => {
    button.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("show-destination", { detail: { id: button.dataset.destinationId } }));
    });
  });
}

export function setupDestinationDialog(destinations) {
  const dialog = document.querySelector("#destination-dialog");
  const content = document.querySelector("#dialog-content");
  const closeButton = document.querySelector("#dialog-close");
  if (!dialog || !content) return;
  document.addEventListener("show-destination", (event) => {
    const destination = destinations.find((item) => item.id === event.detail.id);
    if (!destination) return;
    content.innerHTML = `
      <img src="images/${destination.image}" alt="${destination.imageAlt}" width="600" height="400">
      <p class="eyebrow">${destination.region} · ${destination.type}</p>
      <h2 id="dialog-title">${destination.name}</h2>
      <p>${destination.description}</p>
      <h3>Things to do</h3><p>${destination.activities.join(", ")}</p>
      <h3>Travel tip</h3><p>${destination.travelTip}</p>`;
    dialog.showModal();
  });
  closeButton?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
