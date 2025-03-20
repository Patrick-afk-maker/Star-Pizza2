document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    loadCart(); // Indlæs kurven fra localStorage
});

// Funktion til at hente JSON-data
async function fetchData() {
    try {
        const response = await fetch("data.json"); // Henter JSON-filen
        if (!response.ok) {
            throw new Error("Netværksresponsen var ikke ok");
        }
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        console.error("Der opstod en fejl ved hentning af data:", error);
    }
}

// Kurv-array til at gemme valgte varer
let cart = [];

// Funktion til at vise data på de rigtige sider
function renderContent(data) {
    if (window.location.pathname.includes("pizzas.html")) {
        renderPizzas(data.pizzas);
    } else if (window.location.pathname.includes("drinks.html")) {
        renderDrinks(data.drinks);
    }
    updateCartDisplay();
}

// Funktion til at vise pizzaer
function renderPizzas(pizzas) {
    const pizzasSection = document.querySelector(".pizzas");
    if (!pizzasSection) return;

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
    if (!drinksSection) return;

    const drinksList = drinks.map(drink => `
        <div class="drink-item">
            <h3>${drink.name} - <span class="price">${drink.price === 0 ? "Gratis" : drink.price + " kr."}</span></h3>
            <a href="${drink.big_image}" target="_blank">
                <img class="Hpizza-image" src="${drink.image}" alt="${drink.name}" title="${drink.name}">
            </a>
            <button onclick="addToCart('${drink.name}', ${drink.price})">Tilføj til kurv</button>
        </div>
    `).join('');
    drinksSection.innerHTML = `<h2>Vores Drikkevarer</h2>${drinksList}`;
}

// Funktion til at tilføje varer til kurven
function addToCart(name, price) {
    let item = cart.find(item => item.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
}

// Funktion til at opdatere visningen af kurven
function updateCartDisplay() {
    const cartSection = document.querySelector(".cart");
    if (!cartSection) return;

    if (cart.length === 0) {
        cartSection.innerHTML = "<p>Kurven er tom.</p>";
        return;
    }

    const cartList = cart.map((item, index) => `
        <div class="cart-item">
            <p>${item.name} - ${item.price} kr. x ${item.quantity} = ${item.price * item.quantity} kr.</p>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="decreaseQuantity(${index})">-</button>
            <button onclick="removeFromCart(${index})">Fjern</button>
        </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartSection.innerHTML = `
        <h2>Indkøbskurv</h2>
        ${cartList}
        <h3>Samlet pris: ${totalPrice} kr.</h3>
    `;
}

// Funktion til at øge mængden af en vare
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    updateCartDisplay();
}

// Funktion til at mindske mængden af en vare
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1); // Fjern varen helt
    }
    saveCart();
    updateCartDisplay();
}

// Funktion til at fjerne en vare fra kurven
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Funktion til at gemme kurven i localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Funktion til at indlæse kurven fra localStorage
function loadCart() {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}
