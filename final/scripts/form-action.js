import "./shared.js";
const summary = document.querySelector("#form-summary");
const params = new URLSearchParams(window.location.search);
const fields = [
  ["Name", params.get("name")],
  ["Email", params.get("email")],
  ["Preferred region", params.get("region")],
  ["Travel style", params.get("style")],
  ["Interests", params.getAll("interest").join(", ") || "No interests selected"]
];
if (summary) {
  if (!params.has("name")) {
    summary.innerHTML = "<div><dt>No form data found</dt><dd>Please complete the trip planning form first.</dd></div>";
  } else {
    summary.innerHTML = fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value || "Not provided"}</dd></div>`).join("");
  }
}
