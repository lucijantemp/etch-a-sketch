// ---SELECTS AND VARIABLES---

// default number of boxes, rows, cols and max product
const numberDefault = 1500;
const defaultCols = 50;
const defaultRows = 30;
const maxRows = 120;
const maxCols = 120;

// select all color buttons
const colorBtns = document.querySelectorAll(".btn-color");

// select container for boxes and boxes
const container = document.querySelector(".container");

// select feature btns
const changeBtn = document.querySelector("#change");
const clearBtn = document.querySelector("#clear");
const fillBtn = document.querySelector("#fill");
const switchBtn = document.querySelector("#switch");

// current color, mode (will dynamicly change) and mode message
let currentColor = "black";
let currentMode = "default";
const modes = ["default", "random", "fade", "rotate", "jump", "crazy"];
const modeMsg = document.querySelector(".mode-msg");

// ---SETUP--- (generating btns and boxes dynamicly)

// color btns (generating and functionality)
colorBtns.forEach((button) => {
  button.style.backgroundColor = button.id;
  // change used color when clicked
  button.addEventListener("click", () => {
    currentColor = button.id;
    // unselect previous btn and select new
    let selectedBtn = document.querySelector(".btn-active");
    if (selectedBtn) {
      selectedBtn.classList.remove("btn-active");
    }
    button.classList.add("btn-active");
    // update hover listener for boxes
    hoverListener();
  });
});

// generate boxes
addAllBoxes(defaultRows, defaultCols);

// ---BUTTON FUNCTIONALITIES---

// CLEAR btn
clearBtn.addEventListener("click", () => {
  // reset classes and fill grid with white
  let boxes = document.querySelectorAll(".box");
  removeClasses(boxes);
  fillGrid("#ffffff");
});

// CHANGE btn
changeBtn.addEventListener("click", () => {
  // get information about wanted rows and cols
  let rows = window.prompt(
    `Please enter number of rows. \nDefault: ${defaultRows}\nMax: ${maxRows}\nMin: 1`
  );
  let cols = window.prompt(
    `Please enter number of columns. \nDefault: ${defaultCols}\nMax: ${maxCols}\nMin-rows: 1`
  );
  // check if input is valid
  if (!(rows <= 0 || cols <= 0 || rows > maxRows || cols > maxCols)) {
    // update grid templates
    container.setAttribute(
      "style",
      `width: 95vw; height: 100vh; background-color: #ffffff; display: grid; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);`
    );
    // remove old boxes
    removeAllBoxes();
    // generate new boxes
    addAllBoxes(rows, cols);
    // update hover listener
    hoverListener();
    // remove classes from boxes
    let boxes = document.querySelectorAll(".box");
    removeClasses(boxes);
  }
  // if input is not valid set default values
  else {
    addAllBoxes(defaultRows, defaultCols);
  }
});

// FILL btn
fillBtn.addEventListener("click", () => {
  let boxes = document.querySelectorAll(".box");
  removeClasses(boxes);
  fillGrid(currentColor);
});

// SWITCH btn
switchBtn.addEventListener("click", () => {
  // switch mode variable to next mode
  let currIndex = modes.indexOf(currentMode);
  let nextIndex = currIndex + 1;
  if (nextIndex >= modes.length) {
    nextIndex = 0;
  }
  currentMode = modes[nextIndex];

  // remove all modes classes
  let boxes = document.querySelectorAll(".box");
  removeClasses(boxes);

  // display mode message
  modeMsg.innerHTML = currentMode;
  modeMsg.style.zIndex = 1;
  modeMsg.style.opacity = 0;
  switchBtn.disabled = true;
  setTimeout(() => {
    modeMsg.style.zIndex = -1;
    modeMsg.style.opacity = 1;
  }, 500);
  setTimeout(() => {
    switchBtn.disabled = false;
  }, 600);
});

// ---FUNCTIONS---

// function for removing all btns
function removeAllBoxes() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((b) => {
    b.remove();
  });
}

// function for generating new btns
function addAllBoxes(rows, cols) {
  let number = rows * cols;
  // append boxes
  for (let i = 0; i < number; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    container.appendChild(box);
  }
}

// function that adds to each element hover event listener and change bg
function hoverListener() {
  // select boxes
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      // handle different modes
      switch (currentMode) {
        case "default":
          box.style.backgroundColor = currentColor;
          break;
        case "random":
          let randomColor = Math.floor(Math.random() * 16777215).toString(16);
          box.style.backgroundColor = "#" + randomColor;
          break;
        case "fade":
          box.style.backgroundColor = currentColor;
          box.classList.add("fade");
          break;
        case "rotate":
          box.style.backgroundColor = currentColor;
          box.classList.add("rotate");
          break;
        case "jump":
          box.style.backgroundColor = currentColor;
          box.classList.add("jump");
          break;
        case "crazy":
          box.style.backgroundColor = currentColor;
          box.classList.add("crazy");
          break;
      }
    });
  });
}

// function that fills grid with desired color
function fillGrid(color) {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.style.backgroundColor = color;
  });
}

// function that removes mode classes from every box
function removeClasses(list) {
  list.forEach((box) => {
    for (let i = 0; i < modes.length; i++) {
      box.classList.remove(modes[i]);
    }
  });
}
