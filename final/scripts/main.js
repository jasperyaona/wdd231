import "./shared.js";
import { getDestinations, renderDestinations, setupDestinationDialog } from "./destinations.js";

try {
  const destinations = await getDestinations();
  const featured = destinations.slice(0, 3);
  renderDestinations(featured, document.querySelector("#featured-destinations"));
  setupDestinationDialog(destinations);
} catch (error) {
  const container = document.querySelector("#featured-destinations");
  if (container) container.innerHTML = '<p class="status-message">Destinations could not be loaded. Please run the site with a local server and try again.</p>';
}
