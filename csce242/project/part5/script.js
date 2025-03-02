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