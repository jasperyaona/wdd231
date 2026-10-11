export function setupSharedPage() {
  const menuButton = document.querySelector("#menu-button");
  const nav = document.querySelector("#site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
  }
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
  const modified = document.querySelector("#last-modified");
  if (modified) modified.textContent = document.lastModified;
}
setupSharedPage();
