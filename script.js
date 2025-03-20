document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

// Funktion til at hente JSON-data
async function fetchData() {
    try {
        const response = await fetch('data.json');  // Henter JSON-filen
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

    console.log("Pizzadata:", data.pizzas);
    console.log("Drikkedata:", data.drinks);
    
    // Kun på index.html: Vis velkomst og åbningstider
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/" || !window.location.pathname.includes(".html")) {
        const welcomeSection = document.querySelector('.welcome');
        if (welcomeSection) {
            welcomeSection.innerHTML = `
                <h2>${data.welcome.heading}</h2>
                <p>${data.welcome.text1}</p>
                <p>${data.welcome.text2}</p>
                <p><strong>${data.welcome.offer}</strong></p>
            `;
        }

        const hoursSection = document.querySelector('.opening-hours');
        if (hoursSection) {
            const hoursList = data.opening_hours.map(hour => `<li>${hour}</li>`).join('');
            hoursSection.innerHTML = `<h3>Åbningstider</h3><ul>${hoursList}</ul>`;
        }
    }

    // Kun på pizzas.html: Vis pizza-menu
    const pizzasSection = document.querySelector('.pizzas');
    if (pizzasSection && window.location.pathname.includes("pizzas.html")) {
        const pizzasList = data.pizzas.map(pizza => `
            <div class="pizza-item">
                <h3>${pizza.name} - <span class="price">${pizza.price} kr.</span></h3>
                <p><strong>Ingredienser:</strong> ${pizza.ingredients}</p>
                <a href="${pizza.big_image}" target="_blank">
                    <img class="pizza-image" src="${pizza.image}" alt="${pizza.name}" title="${pizza.name}">
                </a>
            </div>
        `).join('');
        pizzasSection.innerHTML = `<h2>Vores Pizzaer</h2>${pizzasList}`;
    }

    // Kun på drinks.html: Vis drikkevarer
    const drinksSection = document.querySelector('.drinks');
    if (drinksSection && window.location.pathname.includes("drinks.html")) {
        const drinksList = data.drinks.map(drink => `
            <div class="drink-item">
                <h3>${drink.name} - <span class="price">${drink.price === 0 ? "Gratis" : drink.price + " kr."}</span></h3>
                <a href="${drink.big_image}" target="_blank">
                    <img class="Hpizza-image" src="${drink.image}" alt="${drink.name}" title="${drink.name}">
                </a>
            </div>
        `).join('');
        drinksSection.innerHTML = `<h2>Vores Drikkevarer</h2>${drinksList}`;
    }
}
