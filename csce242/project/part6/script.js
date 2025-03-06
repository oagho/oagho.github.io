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

// Fetch and display products dynamically
document.addEventListener("DOMContentLoaded", function () {
    fetch("data/products.json") // Adjust the path if necessary
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => console.error("Error loading products:", error));
});

//display product in shop.html
function displayProducts(products) {
    const productsGrid = document.querySelector(".products-grid");

    // Clear existing products in case of reload
    productsGrid.innerHTML = "";

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Rating:</strong> ⭐${product.rating} (${product.reviews} Reviews)</p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        `;
        productsGrid.innerHTML += productHTML;
    });
}

function addToCart(productId) {
    alert("Product " + productId + " added to cart!");
}
