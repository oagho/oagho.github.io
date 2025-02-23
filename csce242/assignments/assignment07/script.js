const TREADS = 10;
const CLIMB_RATE = 32;

const img = document.querySelector("img");
const climb = document.getElementById("climb");

// Creates Stairs
const DrawStairs = () => {
  const stairs = document.getElementById("stairs");
  stairs.classList.add("border-inline");
  for (let i = 0; i < TREADS; ++i) {
    const hr = document.createElement("hr");
    stairs.append(hr);
  }
};

const draw = document.getElementById("draw");

draw.onclick = () => {
  draw.setAttribute("disabled", true);
  DrawStairs();
  img.classList.remove("hidden");
  climb.classList.remove("hidden");
};

// Makes img "Climb" the stairs

let counter = 0;
let stepsClimbed = 0;
let intervalId;
const array = ["./images/right.png", "./images/left.png"];

const Climb = () => {
  img.setAttribute("src", array[counter]);
  const bottom = Number.parseInt(getComputedStyle(img).bottom);
  img.style.bottom = `${bottom + CLIMB_RATE}px`;

  ++counter;
  if (counter === 2) counter = 0;

  ++stepsClimbed;
  if (stepsClimbed === TREADS + 1) clearInterval(intervalId);
};

climb.onclick = () => {
  climb.setAttribute("disabled", true);
  intervalId = setInterval(Climb, 1000);
};