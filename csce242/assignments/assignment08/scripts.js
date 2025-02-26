document.addEventListener("DOMContentLoaded", function () {
    const titles = {
        "Happy Birthday": "images/birthday.jpg",
        "Crazy Clown": "images/clown.jpg",
        "It's Raining": "images/rain.jpg",
        "Quiet Time": "images/read.jpg",
        "Working Hard": "images/shovel.jpg",
        "Work from Home": "images/work.jpg"
    };

    const titleContainer = document.getElementById("title-container");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupImg = document.getElementById("popup-img");
    const closeBtn = document.getElementById("close");
    const overlay = document.getElementById("overlay");

    for (let title in titles) {
        let listItem = document.createElement("div");
        listItem.textContent = title;
        listItem.classList.add("title");
        listItem.addEventListener("click", function () {
            popupTitle.textContent = title;
            popupImg.src = titles[title];
            popup.classList.remove("hidden");
            overlay.classList.remove("hidden");
            popup.style.display = "block";
            overlay.style.display = "block";
        });
        titleContainer.appendChild(listItem);
    }

    closeBtn.addEventListener("click", function () {
        popup.classList.add("hidden");
        overlay.classList.add("hidden");
        popup.style.display = "none";
        overlay.style.display = "none";
    });

    overlay.addEventListener("click", function () {
        popup.classList.add("hidden");
        overlay.classList.add("hidden");
        popup.style.display = "none";
        overlay.style.display = "none";
    });
});