let cart = JSON.parse(localStorage.getItem("cart")) || {};

function addToCart(id, name, price) {
    price = parseFloat(price);
    const cartBtn = document.getElementById(id);
    name = cartBtn.dataset.name
    price = cartBtn.dataset.price
    if (!cart[id]) 
        cart[id] = { name, price, quantity: 1 }; 
    else 
        cart[id].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartUI(id, name, price); 
    updateCartSummary(); 
}

function removeFromCart(id) {
    if (cart[id] && cart[id].quantity > 0) {
        cart[id].quantity--; 
        if (cart[id].quantity === 0) 
            delete cart[id]; 
    }

    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartUI(id); 
    updateCartSummary(); 
}

function deleteFromCart(id) {
    delete cart[id]; 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    updateCartUI(id); 
    updateCartSummary(); 
}

function updateCartSummary() {
    let totalItems = 0;
    let totalPrice = 0;

    Object.values(cart).forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;
    });

    totalPrice = isNaN(totalPrice) ? 0 : totalPrice;

    document.querySelector(".cart span").innerText = `${totalItems} items`;
    document.querySelector(".cart .total").innerText = `$${totalPrice.toFixed(2)}`;
}


function updateCartUI(id, name = null, price = null) {
    console.log(id)
    const cartBtn = document.getElementById(id);

    name = cartBtn.dataset.name
    price = cartBtn.dataset.price
    if (!cart[id] && name && price) 
        cart[id] = { name, price, quantity: 0 };

    if (cart[id]?.quantity > 0) {
        cartBtn.innerHTML = `
            <button onclick="removeFromCart(${id})">-</button>
            <span>${cart[id].quantity}</span>
            <button onclick="addToCart(${id}, '${cart[id].name}', ${cart[id].price})">+</button>
            <button onclick="deleteFromCart(${id})"     ="delete-btn">🗑</button>
        `;
    } 
    else {
        cartBtn.innerHTML = `
            <button class="add-to-cart" onclick="addToCart(${id}, '${name}', ${price})">
                <img src="Assets/plus-circle.svg" alt="plus"> Add
            </button>
        `;
    }
}

function loadCart() {
    Object.keys(cart).forEach(id => updateCartUI(id, cart[id].name, cart[id].price));
    updateCartSummary(); 
}

document.addEventListener("DOMContentLoaded", loadCart);
