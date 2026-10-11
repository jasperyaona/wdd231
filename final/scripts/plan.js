import "./shared.js";
import { getFavorites } from "./storage.js";

const form = document.querySelector(".trip-form");
const style = document.querySelector("#travel-style");
const region = document.querySelector("#region");
const savedStyle = localStorage.getItem("pte-travel-style");
const savedRegion = localStorage.getItem("pte-travel-region");
if (style && savedStyle) style.value = savedStyle;
if (region && savedRegion) region.value = savedRegion;
style?.addEventListener("change", () => localStorage.setItem("pte-travel-style", style.value));
region?.addEventListener("change", () => localStorage.setItem("pte-travel-region", region.value));
form?.addEventListener("submit", () => {
  localStorage.setItem("pte-last-trip-favorites", JSON.stringify(getFavorites()));
});
