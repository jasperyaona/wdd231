const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

getProphetData();

let cards = document.getElementById('cards');

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let details = document.createElement('p');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        details.innerHTML = `Date of Birth: ${prophet.birthdate}<br>Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src',`${prophet.imageurl}`);
        portrait.setAttribute('alt',`Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width','150px');
        portrait.setAttribute('height','200px;');

        card.classList.add('card');
        card.appendChild(fullName);
        card.appendChild(details);
        card.appendChild(portrait);
        cards.appendChild(card);
        


    });
}