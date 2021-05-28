// ---SELECTS AND VARIABLES---

// default number of boxes, rows, cols and max product
const numberDefault = 1500
const defaultCols = 50
const defaultRows = 30
const maxProduct = 10000

// select all color buttons
const colorBtns = document.querySelectorAll(".btn-color");

// select container for boxes
const container = document.querySelector(".container")

// select feature btns
const resetBtn = document.querySelector("#reset")
const clearBtn = document.querySelector("#clear")
const fillBtn  = document.querySelector("#fill")
const switchBtn = document.querySelector("#switch")

// current color and mode (will dynamicly change)
let currentColor = "black"
let currentMode = "fadeIn"
const modes = ["default", "fadeIn", "random"]




// ---SETUP--- (generating btns and boxes dynamicly)

// color btns (generating and functionality)
colorBtns.forEach(button => {
    button.style.backgroundColor = button.id
    // change used color when clicked
    button.addEventListener("click", () => {
        currentColor = button.id
        // unselect previous btn and select new
        let selectedBtn = document.querySelector(".btn-active")
        if (selectedBtn) { selectedBtn.classList.remove("btn-active") }
        button.classList.add("btn-active")
        // update hover listener for boxes
        hoverListener(currentColor)
    })
})

// generate boxes
addAllBoxes(defaultRows, defaultCols)



// ---BUTTON FUNCTIONALITIES---

// RESET btn
resetBtn.addEventListener("click", () => {
    // get information about wanted rows and cols
    let rows = window.prompt(`Please enter number of rows. \nDefault-rows: ${defaultRows}\nMax-product: ${maxProduct}\nMin-rows: 1`)
    let cols = window.prompt(`Please enter number of columns. \nDefault-cols: ${defaultCols}\nMax-product: ${maxProduct}\nMin-rows: 1`)
    // update grid templates
    container.setAttribute("style", `width: 80%; height: 80%; background-color: #ffffff; display: grid; grid-template-columns: repeat(${cols}, 1fr); grid-template-rows: repeat(${rows}, 1fr);`)
    // remove old boxes
    removeAllBoxes()
    // generate new boxes
    addAllBoxes(rows, cols)
    // update hover listener
    hoverListener(currentColor)
})

// CLEAR btn
clearBtn.addEventListener("click", () => {
    fillGrid("#ffffff")
})

// FILL btn
fillBtn.addEventListener("click", () => {
    fillGrid(currentColor)
})

// SWITCH btn
switchBtn.addEventListener("click", () => {
    // switch mode variable to next mode
    let currIndex = modes.indexOf(currentMode)
    let nextIndex = currIndex + 1
    if (nextIndex >= modes.length) {
        nextIndex = 0
    } 
    currentMode = modes[nextIndex]
    
    // remove all modes classes
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(box => {
        box.classList.remove("fade-in")
    })
})



// ---FUNCTIONS---

// function for removing all btns
function removeAllBoxes () {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(b => {
        b.remove()
    })
}

// function for generating new btns 
function addAllBoxes(rows, cols) {
    let number = rows * cols
    // set a default value if input is omitted or number is too big
    if (number <= 0 || number > maxProduct) {
        number = numberDefault
        container.setAttribute("style", `width: 80%; height: 80%; background-color: #ffffff; display: grid; grid-template-columns: repeat(${defaultCols}, 1fr); grid-template-rows: repeat(${defaultRows}, 1fr);`)
    }
    for (let i=0; i<(number); i++) {
        let box = document.createElement("div")
        box.classList.add("box")
        container.appendChild(box)
    }
}

// function that adds to each element hover event listener and change bg
function hoverListener(color) {
    // select boxes
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(box => {
        box.addEventListener("mouseover", () => {
            // mode: classic
            if (currentMode == "default") {
                box.style.backgroundColor = color
            }
            // mode: fadeIn
            else if (currentMode == "fadeIn") {
                box.style.backgroundColor = color
                box.classList.add("fade-in")
            }
            // mode: random
            else if (currentMode == "random") {
                let randomColor = Math.floor(Math.random()*16777215).toString(16);
                box.style.backgroundColor = "#" + randomColor
            }
        })
    })
}

// function that clears the grid from colors
function fillGrid(color) {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(box => {
        box.style.backgroundColor = color
    })
}