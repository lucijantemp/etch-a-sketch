// select all color buttons
const btnsColors = document.querySelectorAll(".btn-color");

let usedColor = "black"

// add color background to each button corresponding to id
btnsColors.forEach(button => {
    button.style.backgroundColor = button.id
    // change color when clicked
    button.addEventListener("click", () => {
        usedColor = button.id
    })
})

// select container fo boxes
const container = document.querySelector(".container")

// generate boxes
for (let i=0; i<800; i++) {
    let box = document.createElement("div")
    box.classList.add("box")
    container.appendChild(box)
}

// select boxes
const boxes = document.querySelectorAll(".box")

// hover event listener
boxes.forEach(b => {
    b.addEventListener("mouseover", () => {
        b.style.backgroundColor = usedColor
    })
})

// reset button
const resetBtn = document.querySelector(".btn-reset")
resetBtn.addEventListener("click", () => {
    boxes.forEach(b => {b.style.backgroundColor = "white"})
})