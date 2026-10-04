import { discoverItems } from "../data/discover.mjs";

/* =========================
   BUILD CARDS
   ========================= */

const gallery = document.querySelector("#discover-gallery");

discoverItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card", `item-${index + 1}`);

    const title = document.createElement("h2");
    title.textContent = item.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.setAttribute("src", item.image);
    img.setAttribute("alt", item.name);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "300");
    img.setAttribute("height", "200");
    figure.appendChild(img);

    const description = document.createElement("p");
    description.textContent = item.description;

    const address = document.createElement("address");
    address.textContent = item.address;

    const textBlock = document.createElement("div");
    textBlock.classList.add("card-text");
    textBlock.appendChild(description);
    textBlock.appendChild(address);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.appendChild(figure);
    cardBody.appendChild(textBlock);

    const learnMoreBtn = document.createElement("button");
    learnMoreBtn.type = "button";
    learnMoreBtn.textContent = "Learn More";
    learnMoreBtn.addEventListener("click", () => {
        const query = encodeURIComponent(`${item.name}, ${item.address}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank", "noopener");
    });

    card.appendChild(title);
    card.appendChild(cardBody);
    card.appendChild(learnMoreBtn);

    gallery.appendChild(card);
});


/* =========================
   LAST VISIT MESSAGE (localStorage)
   ========================= */

const visitMessageEl = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const msInDay = 1000 * 60 * 60 * 24;
    const daysSince = Math.floor((now - Number(lastVisit)) / msInDay);

    if (daysSince < 1) {
        visitMessageEl.textContent = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
        visitMessageEl.textContent = "You last visited 1 day ago.";
    } else {
        visitMessageEl.textContent = `You last visited ${daysSince} days ago.`;
    }
}

localStorage.setItem("lastVisit", String(now));