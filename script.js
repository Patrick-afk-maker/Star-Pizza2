document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    loadCart(); // Indlæs kurven fra localStorage
});

// Funktion til at hente JSON-data
async function fetchData() {
    console.log("fetchData kaldt på:", window.location.pathname); // Debugging
    try {
        const response = await fetch("data.json"); // Henter JSON-filen
        if (!response.ok) {
            throw new Error("Netværksresponsen var ikke ok");
        }
        const data = await response.json();
        console.log("Data hentet:", data); // Debugging
        renderContent(data);
    } catch (error) {
        console.error("Der opstod en fejl ved hentning af data:", error);
    }
}

// Kurv-array til at gemme valgte varer
let cart = [];

// Funktion til at vise data på de rigtige sider
function renderContent(data) {
    console.log("Pizzadata:", data.pizzas);  // Debugging
    console.log("Drikkedata:", data.drinks); // Debugging

    const path = window.location.pathname;

    if (path.includes("index.html") || path === "/" || !path.includes(".html")) {
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

    if (path.includes("menu.html") || path.includes("pizzas.html") || path.includes("drinks.html")) {
        renderPizzas(data.pizzas);
        renderDrinks(data.drinks);
    }

    if (path.includes("cart.html")) {
        updateCartDisplay();
    }
}

// Funktion til at vise pizzaer
function renderPizzas(pizzas) {
    const pizzasSection = document.querySelector(".pizzas");
    if (!pizzasSection) {
        console.warn("Ingen .pizzas-sektion fundet på denne side.");
        return;
    }

    const pizzasList = pizzas.map(pizza => `
        <div class="pizza-item">
            <h3>${pizza.name} - <span class="price">${pizza.price} kr.</span></h3>
            <p><strong>Ingredienser:</strong> ${pizza.ingredients}</p>
            <a href="${pizza.big_image}" target="_blank">
                <img class="pizza-image" src="${pizza.image}" alt="${pizza.name}" title="${pizza.name}">
            </a>
            <button onclick="addToCart('${pizza.name}', ${pizza.price})">Tilføj til kurv</button>
        </div>
    `).join('');
    pizzasSection.innerHTML = `<h2>Vores Pizzaer</h2>${pizzasList}`;
}

// Funktion til at vise drikkevarer
function renderDrinks(drinks) {
    const drinksSection = document.querySelector(".drinks");
    if (!drinksSection) {
        console.warn("Ingen .drinks-sektion fundet på denne side.");
        return;
    }

    const drinksList = drinks.map(drink => `
        <div class="drink-item">
            <h3>${drink.name} - <span class="price">${drink.price === 0 ? "Gratis" : drink.price + " kr."}</span></h3>
            <a href="${drink.big_image}" target="_blank">
                <img class="drink-image" src="${drink.image}" alt="${drink.name}" title="${drink.name}">
            </a>
            <button onclick="addToCart('${drink.name}', ${drink.price})">Tilføj til kurv</button>
        </div>
    `).join('');
    drinksSection.innerHTML = `<h2>Vores Drikkevarer</h2>${drinksList}`;
}
