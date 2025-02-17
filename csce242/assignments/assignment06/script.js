// Changes the src of an image
const Transportation = () => {
    const modes = {
      bike: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
      car: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      scooter:"https://images.unsplash.com/photo-1503434396599-58ba8a18d932?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      skateboard:"https://images.unsplash.com/photo-1591311337241-cecfd26f1da1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
  
    const inputEl = document.querySelector("input");
    const imageEl = document.querySelector("img");
  
    inputEl.onkeyup = () => {
      const value = inputEl.value.toLowerCase();
  
      if (modes[value]) {
        imageEl.src = modes[value];
      } else imageEl.src = "";
    };
  };
  
  // Removes the active class from an array of buttons
  const ResetActive = (array) => {
    array.forEach((el) => el.classList.remove("is-active"));
  };
  
  // Adds the active class to an array of buttons
  const AddActive = (array) => {
    array.forEach((el) => el.classList.add("is-active"));
  };
  
  // Removes aria pressed from buttons
  const ResetAria = (array) => {
    array.forEach((button) => (button.ariaPressed = "false"));
  };
  
  // Adds aria pressed to an array of buttons
  const AddAria = (array) => {
    array.forEach((button) => (button.ariaPressed = "true"));
  };
  
  // Toggles Tab buttons active to display specific data
  const ToggleTabs = () => {
    const tabs = document.querySelectorAll("li button");
    const exercise01Tabs = document.querySelectorAll(".exercise-1");
    const exercise02Tabs = document.querySelectorAll(".exercise-2");
  
    tabs.forEach((button) => {
      button.onclick = (e) => {
        if (e.target.classList.contains("is-active")) return;
  
        ResetActive(tabs);
        ResetAria(tabs);
  
        if (e.target.classList.contains("exercise-1")) {
          AddActive(exercise01Tabs);
          AddAria(exercise01Tabs);
        } else {
          AddActive(exercise02Tabs);
          AddAria(exercise02Tabs);
        }
      };
    });
  };
  
  // Toggles buttons active to fill a heart svg to a particular color
  const FillSVG = () => {
    const buttons = document.querySelectorAll("#button-wrapper button");
  
    buttons.forEach((btn) => {
      btn.onclick = (e) => {
        if (e.target.classList.contains("is-active")) return;
  
        ResetActive(buttons);
        ResetAria(buttons);
  
        e.target.classList.add("is-active");
        e.target.ariaPressed = "true";
      };
    });
  };
  
  Transportation();
  ToggleTabs();
  FillSVG();