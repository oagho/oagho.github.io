document.addEventListener("DOMContentLoaded", function() {
    // Check which page we're on based on the existence of specific elements.
    if (document.getElementById('productGrid')) {
      loadShop();
    } else if (document.getElementById('productDetail')) {
      loadProduct();
    }
  });
  
  /* -----------------------------
     Shop Page Functionality
  ------------------------------ */
  function loadShop() {
    let products = [];
  
    // Function to display products on the shop page.
    function displayProducts(productList) {
      const productGrid = document.getElementById('productGrid');
      productGrid.innerHTML = ''; // Clear existing content.
  
      productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3 class="product-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart">Add to Cart</button>
        `;
        productGrid.appendChild(card);
      });
    }
  
    // Fetch product data from data.json.
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        products = data.products;
        displayProducts(products);
      })
      .catch(error => {
        console.error("Error fetching data.json:", error);
      });
  
    // Add search functionality.
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });
  }
  
  /* -----------------------------
     Product Detail Page Functionality
  ------------------------------ */
  function loadProduct() {
    // Helper function to retrieve URL parameters.
    function getQueryParam(param) {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    }
  
    const productId = parseInt(getQueryParam('id'));
  
    // Fetch product data from data.json.
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const product = data.products.find(p => p.id === productId);
        if (product) {
          // Build the product detail section.
          const productDetailDiv = document.getElementById('productDetail');
          productDetailDiv.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-info">
              <h1>${product.name}</h1>
              <p>${product.description}</p>
              <p class="price">Price: $${product.price.toFixed(2)}</p>
            </div>
          `;
  
          // Display reviews.
          const reviewsList = document.getElementById('reviewsList');
          if (product.reviews && product.reviews.length > 0) {
            reviewsList.innerHTML = '';
            product.reviews.forEach(review => {
              const reviewDiv = document.createElement('div');
              reviewDiv.className = 'review';
              reviewDiv.innerHTML = `
                <strong>${review.username}</strong>
                <p>${review.text}</p>
                <p>Rating: ${review.rating}/5</p>
              `;
              reviewsList.appendChild(reviewDiv);
            });
          } else {
            reviewsList.innerHTML = '<p>No reviews yet.</p>';
          }
        } else {
          document.body.innerHTML = '<p>Product not found.</p>';
        }
      })
      .catch(error => {
        console.error("Error fetching data.json:", error);
      });
  
    // Handle review form submission.
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const reviewerName = document.getElementById('reviewerName').value;
      const reviewText = document.getElementById('reviewText').value;
      // For demonstration, we assign a default rating of 5.
      const newReview = { username: reviewerName, text: reviewText, rating: 5 };
  
      // Append the new review to the reviews list on the page.
      const reviewsList = document.getElementById('reviewsList');
      const reviewDiv = document.createElement('div');
      reviewDiv.className = 'review';
      reviewDiv.innerHTML = `
        <strong>${newReview.username}</strong>
        <p>${newReview.text}</p>
        <p>Rating: ${newReview.rating}/5</p>
      `;
      // Remove the "No reviews yet." text if present.
      if (reviewsList.innerHTML.includes("No reviews yet.")) {
        reviewsList.innerHTML = '';
      }
      reviewsList.appendChild(reviewDiv);
  
      // Clear the form.
      reviewForm.reset();
    });
  }
  