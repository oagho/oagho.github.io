
const SayHello = () => {
    const divEl = document.getElementById("hello");
  
    divEl.onclick = () => {
      const p = document.createElement("p");
      p.textContent = " Hello";
      divEl.appendChild(p);
    };
  };
  

  const StarColor = () => {
    const inputEl = document.querySelector("#color input");
    const svgEl = document.querySelector("#color svg");
    inputEl.onchange = () => {
      svgEl.setAttribute("fill", inputEl.value);
    };
  };
  
  const ChangeImage = () => {
    const imageUrls = [
        "https://images.freeimages.com/images/large-previews/7cc/cherry-blossom-1057556.jpg",
        "https://images.freeimages.com/images/large-previews/200/cherry-blossom-1194518.jpg",
        "https://images.freeimages.com/images/large-previews/d2d/blossom-1370138.jpg",
        "https://images.freeimages.com/images/large-previews/5a3/flowers-1375015.jpg",
        
    ];
    let counter = 0;
  
    const imgEl = document.querySelector("#image img");
    imgEl.onclick = () => {
      ++counter;
      if (counter === imageUrls.length) counter = 0;
      imgEl.src = imageUrls[counter];
    };
  };
  
  window.onload = () => {
    SayHello();
    StarColor();
    ChangeImage();
  };