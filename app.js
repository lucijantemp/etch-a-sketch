// default number of boxes, rows, cols and max product
const numberDefault = 1500
const defaultCols = 50
const defaultRows = 30
const maxProduct = 10000

// select all color buttons
const btnsColors = document.querySelectorAll(".btn-color");

// select container for boxes
const container = document.querySelector(".container")

// used color
let usedColor = "black"

// add color backgrounds to btns and update hover listener for boxes for new color
btnsColors.forEach(button => {
    button.style.backgroundColor = button.id
    // change color when clicked
    button.addEventListener("click", () => {
        usedColor = button.id
        // update hover listener for boxes
        hoverListener(boxes, usedColor)
    })
})

// generate boxes
addAllBtns(numberDefault)

// select boxes
let boxes = document.querySelectorAll(".box")

// select reset button
const resetBtn = document.querySelector("#reset")

// event listener for reset btn
resetBtn.addEventListener("click", () => {
    // get information about wanted rows and cols
    let rows = window.prompt(`Please enter number of rows. \nDefault-rows: ${defaultRows}\nMax-product: ${maxProduct}\nMin-rows: 1`)
    let columns = window.prompt(`Please enter number of columns. \nDefault-cols: ${defaultCols}\nMax-product: ${maxProduct}\nMin-rows: 1`)
    // update grid templates
    container.setAttribute("style", `width: 80%; height: 80%; background-color: #ffffff; display: grid; grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, 1fr);`)
    // remove old btns
    removeAllBtns()
    // generate new btns
    let numberOfBtns = rows*columns
    addAllBtns(numberOfBtns)
    // update boxes variable
    boxes = document.querySelectorAll(".box")
})

// event listener for clear btn
const clearBtn = document.querySelector("#clear")

clearBtn.addEventListener("click", () => {
    clearGrid()
})

// function for removing all btns
function removeAllBtns () {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach(b => {
        b.remove()
    })
}

// function for generating new btns 
function addAllBtns(number) {
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
function hoverListener(list, color) {
    list.forEach(elem => {
        elem.addEventListener("mouseover", () => {
            elem.style.backgroundColor = color
        })
    })
}

// function that clears the grid from colors
function clearGrid() {
    boxes.forEach(box => {
        box.style.backgroundColor = "white"
    })
}