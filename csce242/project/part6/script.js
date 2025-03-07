//hammberger menue
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            
            // Change button icon when toggled
            if (navMenu.classList.contains("active")) {
                navToggle.innerHTML = "✖"; // Close icon
            } else {
                navToggle.innerHTML = "☰"; // Hamburger icon
            }
        });
    }
});

// Fetch and display products dynamically  https://oagho.github.io/csce242/project/part6/data/products.json
const getProducts = async () => {
    const url = "https://oagho.github.io/csce242/project/part6/data/products.json"; // Ensure the correct path

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Products fetched successfully:", data);

        if (!data || !Array.isArray(data.products)) {
            throw new Error("❌ Invalid JSON format: 'products' array not found.");
        }

        return data.products; // Return the array of products
    } catch (error) {
        console.error("❌ Error fetching products:", error);
    }
};

const showProducts = async () => {
    const products = await getProducts();

    if (!products || !Array.isArray(products)) {
        console.error("❌ No products found or invalid data format.");
        return;
    }

    const productsGrid = document.querySelector(".products-grid");

    if (!productsGrid) {
        console.error("❌ Error: .products-grid not found in shop.html");
        return;
    }

    productsGrid.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="cart.html" class="btn">Add to cart</a>
        `;

        productsGrid.appendChild(productDiv);
    });

    console.log("✅ Products displayed successfully in shop layout!");
};

// Run showProducts on Page Load
showProducts();

// random 4 product from json in index.html(home.html)

const showRandomProducts = async () => {
    const products = await getProducts();

    if (!products || products.length < 4) {
        console.error("❌ Not enough products found.");
        return;
    }

    const featuredSection = document.getElementById("featured-products");

    if (!featuredSection) {
        console.error("❌ Error: #featured-products not found in home.html");
        return;
    }

    featuredSection.innerHTML = ""; // Clear existing products

    // Shuffle array and select 4 random products
    const shuffledProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

    shuffledProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="shop.html" class="btn">View More</a>
        `;

        featuredSection.appendChild(productDiv);
    });

    console.log("✅ Featured products displayed successfully!");
};

// Run function to display random products on home page
showRandomProducts();
    // Add to Cart Function
const addToCart = async (productId) => {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) {
        console.error(`❌ Product ID ${productId} not found.`);
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
};

// Load Cart Items in cart.html
const loadCart = () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cart-total");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartItemsContainer || !cartTotal) {
        console.error("❌ Cart elements not found in cart.html.");
        return;
    }

    cartItemsContainer.innerHTML = ""; // Clear current cart display
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "$0.00";
        return;
    }

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-quantity">
            <button class="remove" data-index="${index}">Remove</button>
        `;

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;

    // Attach event listeners for quantity changes and remove buttons
    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", updateQuantity);
    });

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", removeItem);
    });
};

// Update Quantity in Cart
const updateQuantity = (event) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = event.target.getAttribute("data-index");
    const newQuantity = parseInt(event.target.value);

    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart.splice(index, 1); // Remove if quantity is zero
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart after updating
};

// Remove Item from Cart
const removeItem = (event) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = event.target.getAttribute("data-index");

    cart.splice(index, 1); // Remove selected item
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload cart after removing
};

// Clear Entire Cart
const clearCart = () => {
    localStorage.removeItem("cart");
    loadCart();
};

// Ensure cart loads when viewing cart.html
if (window.location.pathname.includes("cart.html")) {
    loadCart();
}