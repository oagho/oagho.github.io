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


