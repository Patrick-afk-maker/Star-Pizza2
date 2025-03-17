document.addEventListener('DOMContentLoaded', function () {
    // Hent data fra JSON-filen
    fetchData();
});

// Funktion til at hente data
async function fetchData() {
    try {
        const response = await fetch('data.json');  // URL til JSON-filen
        if (!response.ok) {
            throw new Error('Netværksresponsen var ikke ok');
        }
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        console.error('Der opstod en fejl ved hentning af data:', error);
    }
}

// Funktion til at vise data på hjemmesiden
function renderContent(data) {
    // Velkomstsektion
    const welcomeSection = document.querySelector('.welcome');
    welcomeSection.innerHTML = `
        <h2>${data.welcome.heading}</h2>
        <p>${data.welcome.text1}</p>
        <p>${data.welcome.text2}</p>
        <p><strong>${data.welcome.offer}</strong></p>
    `;

    // Åbningstider
    const hoursSection = document.querySelector('.opening-hours');
    const hoursList = data.opening_hours.map(hour => `<li>${hour}</li>`).join('');
    hoursSection.innerHTML = `<h3>Åbningstider</h3><ul>${hoursList}</ul>`;

    // Pizza-menu
    const pizzasSection = document.querySelector('.pizzas');
    const pizzasList = data.pizzas.map(pizza => `
        <li><strong>${pizza.name}:</strong> ${pizza.ingredients}</li>
        <a href="${pizza.image}" target="_blank"><img src="${pizza.image}" alt="${pizza.name}" title="${pizza.name}"></a>
    `).join('');
    pizzasSection.innerHTML = `<h2>Vores Pizzaer</h2><ul>${pizzasList}</ul>`;

    // Drikkevarer
    const drinksSection = document.querySelector('.drinks');
    const drinksList = data.drinks.map(drink => `
        <li>${drink.name}</li>
        <img src="${drink.image}" alt="${drink.name}" title="${drink.name}" />
    `).join('');
    drinksSection.innerHTML = `<h2>Vores Drikkevarer</h2><ul>${drinksList}</ul>`;
}
