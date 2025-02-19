document.addEventListener("DOMContentLoaded", function () {
    function addHorizontalLines(numLines) {
        const container = document.querySelector(".container");
        const lineSpacing = 80 / (numLines + 1); // Adjust spacing dynamically

        for (let i = 1; i <= numLines; i++) {
            let horizontalLine = document.createElement("div");
            horizontalLine.classList.add("horizontal-line");
            horizontalLine.style.top = `${lineSpacing * i}vh`; // Positioning dynamically
            container.appendChild(horizontalLine);
        }
    }

    // Call the function with the desired number of lines
    addHorizontalLines(1); // Change the number to add more or fewer lines
});
