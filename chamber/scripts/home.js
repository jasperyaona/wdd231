/* =========================
   WEATHER (OpenWeatherMap)
   ========================= */

const weatherApiKey = "ad74b8648d93a44c1007fb5e730f702f";
// Members are spread across Metro Manila, so weather is centered there.
// Swap these for your chamber's actual city/coordinates if that changes.
const chamberLat = 14.5995;
const chamberLon = 120.9842;

async function getCurrentWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${chamberLat}&lon=${chamberLon}&units=metric&appid=${weatherApiKey}`;
    const response = await fetch(currentUrl);
    const data = await response.json();
    displayCurrentWeather(data);
}

async function getForecast() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLat}&lon=${chamberLon}&units=metric&appid=${weatherApiKey}`;
    const response = await fetch(forecastUrl);
    const data = await response.json();
    displayForecast(data);
}

const displayCurrentWeather = (data) => {
    const cityEl = document.querySelector("#weather-city");
    const nowEl = document.querySelector("#weather-now");

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;

    cityEl.textContent = data.name;
    nowEl.innerHTML = `<span class="temp">${temp}&deg;C</span> <span class="desc">${description}</span>`;
};

const displayForecast = (data) => {
    const forecastEl = document.querySelector("#weather-forecast");
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const middayEntries = data.list
        .filter(entry => entry.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    middayEntries.forEach(entry => {
        const date = new Date(entry.dt * 1000);
        const dayLabel = dayNames[date.getDay()];
        const dayTemp = Math.round(entry.main.temp);

        let item = document.createElement("li");
        let day = document.createElement("span");
        let temp = document.createElement("span");

        day.classList.add("fc-day");
        day.textContent = dayLabel;

        temp.classList.add("fc-temp");
        temp.textContent = `${dayTemp}\u00b0C`;

        item.appendChild(day);
        item.appendChild(temp);
        forecastEl.appendChild(item);
    });
};


/* =========================
   MEMBER SPOTLIGHTS
   ========================= */

const membersUrl = "data/members.json";

// 3 = Gold, 2 = Silver, 1 = Bronze
const levelNames = { 3: "Gold", 2: "Silver", 1: "Bronze" };

async function getSpotlightData() {
    const response = await fetch(membersUrl);
    const companies = await response.json();
    displaySpotlights(companies);
}

let spotlightContainer = document.querySelector("#spotlight-cards");

const displaySpotlights = (companies) => {
    const eligible = companies.filter(
        company => company.membershipLevel === 3 || company.membershipLevel === 2
    );

    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const count = Math.random() < 0.5 ? 2 : 3;
    const chosen = shuffled.slice(0, count);

    spotlightContainer.innerHTML = "";

    chosen.forEach(company => {
        let card = document.createElement("article");
        let badge = document.createElement("span");
        let businessName = document.createElement("h3");
        let logo = document.createElement("img");
        let description = document.createElement("p");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");

        card.classList.add("spotlight-card");

        badge.classList.add("badge", `badge-${levelNames[company.membershipLevel].toLowerCase()}`);
        badge.textContent = `${levelNames[company.membershipLevel]} Member`;

        businessName.textContent = company.name;

        logo.setAttribute("src", company.image);
        logo.setAttribute("alt", `Logo of ${company.name}`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "64");
        logo.setAttribute("height", "64");

        description.textContent = company.description;
        address.textContent = company.address;
        phone.textContent = company.phone;

        website.setAttribute("href", `https://${company.website}`);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");
        website.textContent = "Visit website";

        card.appendChild(badge);
        card.appendChild(logo);
        card.appendChild(businessName);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        spotlightContainer.appendChild(card);
    });
};


/* =========================
   RUN
   ========================= */

getCurrentWeather();
getForecast();
getSpotlightData();
