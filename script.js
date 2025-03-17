document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

// Funktion til at hente JSON-data
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

// Funktion til at vise data på den korrekte side
function renderContent(data) {
    // Tjekker, om velkomstsektionen findes (kun på index.html)
    const welcomeSection = document.querySelector('.welcome');
    if (welcomeSection) {
        welcomeSection.innerHTML = `
            <h2>${data.welcome.heading}</h2>
            <p>${data.welcome.text1}</p>
            <p>${data.welcome.text2}</p>
            <p><strong>${data.welcome.offer}</strong></p>
        `;
    }

    // Tjekker, om åbningstider sektionen findes (kun på index.html)
    const hoursSection = document.querySelector('.opening-hours');
    if (hoursSection) {
        const hoursList = data.opening_hours.map(hour => `<li>${hour}</li>`).join('');
        hoursSection.innerHTML = `<h3>Åbningstider</h3><ul>${hoursList}</ul>`;
    }

    // Tjekker, om pizza-sektionen findes (på index.html og pizzas.html)
    const pizzasSection = document.querySelector('.pizzas');
    if (pizzasSection) {
        const pizzasList = data.pizzas.map(pizza => `
            <div class="pizza-item">
                <h3>${pizza.name}</h3>
                <p><strong>Ingredienser:</strong> ${pizza.ingredients}</p>
                <img class="pizza-image" src="${pizza.image}" alt="${pizza.name}" title="${pizza.name}">
            </div>
        `).join('');
        pizzasSection.innerHTML = `<h2>Vores Pizzaer</h2>${pizzasList}`;
    }

    // Tjekker, om drikkevare-sektionen findes (på index.html og drinks.html)
    const drinksSection = document.querySelector('.drinks');
    if (drinksSection) {
        const drinksList = data.drinks.map(drink => `
            <div class="drink-item">
                <h3>${drink.name}</h3>
                <img class="Hpizza-image" src="${drink.image}" alt="${drink.name}" title="${drink.name}">
            </div>
        `).join('');
        drinksSection.innerHTML = `<h2>Vores Drikkevarer</h2>${drinksList}`;
    }
}
