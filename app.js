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
addAllBtns(800)

// select boxes
let boxes = document.querySelectorAll(".box")

// select reset button
const resetBtn = document.querySelector(".btn-reset")

// event listener for reset btn
resetBtn.addEventListener("click", () => {
    // get information about wanted rows and cols
    let rows = window.prompt("Please enter number of rows.")
    let columns = window.prompt("Please enter number of columns.")
    // update grid templates
    container.setAttribute("style", `width: 80%; height: 80%; background-color: #ffffff; border: 3px dotted black; display: grid; grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, 1fr);`)
    // remove old btns
    removeAllBtns()
    // generate new btns
    let numberOfBtns = rows*columns
    addAllBtns(numberOfBtns)
    // update boxes variable
    boxes = document.querySelectorAll(".box")
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
    for (let i=0; i<(number); i++) {
        let box = document.createElement("div")
        box.classList.add("box")
        container.appendChild(box)
    }
}

// function that adds to each element hover event listener and change bg
function hoverListener(list, color) {
    console.log(list)
    list.forEach(elem => {
        elem.addEventListener("mouseover", () => {
            elem.style.backgroundColor = color
        })
    })
}