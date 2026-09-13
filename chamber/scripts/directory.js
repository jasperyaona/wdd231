const url = "data/members.json";

async function getCompanyData() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanyData(data);
}



let cards = document.querySelector('.business-list');

const displayCompanyData = (companies) => {
    companies.forEach(company => {

        let card = document.createElement('section');
        let businessName = document.createElement('h2');
        let logo = document.createElement('img');
        let phone = document.createElement('p');
        let url = document.createElement('p');
        let address = document.createElement('p');
        businessName.textContent = `${company.name}`;
        phone.textContent = `Number: ${company.phone}`;
        url.innerHTML = `URL: <a href="${company.website}">${company.website}</a>`;
        address.textContent = `Address: ${company.address}`;
        logo.setAttribute('src', `${company.image}`);
        logo.setAttribute('alt', `Logo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '150');
        logo.setAttribute('height', '150;');

        card.classList.add('card');
        card.appendChild(businessName);
        card.appendChild(phone);
        card.appendChild(url);
        card.appendChild(address);
        card.appendChild(logo);
        cards.appendChild(card);
    });
}

/* =========================
   GRID - LIST BUTTONS
   ========================= */
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector(".business-list");

gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});


getCompanyData();