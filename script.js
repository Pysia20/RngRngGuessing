let correct = ""
let num = 0
let streak = 0
let mouseX = 0
let mouseY = 0

const blocker = document.querySelector(".Blocker")

const randOut = document.getElementById("TheNumber")
const streakOut = document.getElementById("StreakNum")
const mathDiv = document.getElementById("Math")
const cursorDiv = document.getElementById("Cursor")
const timeDiv = document.getElementById("Time")
const prevDiv = document.getElementById("Prev")

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
})

document.addEventListener('DOMContentLoaded', () => {
    generate()
})

function generate() {
    const method = Math.floor(Math.random() * 4) //wait, it's all just math.random?  always has been.

    switch (method) {
        case 0:
            num = Math.floor(Math.random() * 1000)
            correct = "Math"
            break
        case 1:
            num = (mouseX * mouseY) % 1000
            correct = "Cursor"
            break
        case 2:
            num = Date.now() % 1000
            correct = "Time"
            break
        case 3:
            num = Math.pow(num, 4) % 1000
            correct = "Prev"
            break
        default:
            console.log("generate err")
    }
    randOut.innerHTML = num
}

function guess(anwser) {
    if (anwser === correct) {
        streak += 1
        streakOut.innerHTML = "Streak: " + streak
        updateStyle(anwser)
    } else {
        streak = 0
        streakOut.innerHTML = "Streakn't"
        updateStyle(anwser)
    }
    blocker.style.display = "block"
}

function updateStyle(anwser) {
    const correctDiv = getCorrectDiv()
    switch (anwser) {
        case "Math":
            mathDiv.classList.add("wrong")
            cursorDiv.classList.add("unimportant")
            timeDiv.classList.add("unimportant")
            prevDiv.classList.add("unimportant")
            correctDiv.classList.remove("unimportant")
            correctDiv.classList.remove("wrong")
            correctDiv.classList.add("correct")
            break
        case "Cursor":
            mathDiv.classList.add("unimportant")
            cursorDiv.classList.add("wrong")
            timeDiv.classList.add("unimportant")
            prevDiv.classList.add("unimportant")
            correctDiv.classList.remove("unimportant")
            correctDiv.classList.remove("wrong")
            correctDiv.classList.add("correct")
            break
        case "Time":
            mathDiv.classList.add("unimportant")
            cursorDiv.classList.add("unimportant")
            timeDiv.classList.add("wrong")
            prevDiv.classList.add("unimportant")
            correctDiv.classList.remove("unimportant")
            correctDiv.classList.remove("wrong")
            correctDiv.classList.add("correct")
            break
        case "Prev":
            mathDiv.classList.add("unimportant")
            cursorDiv.classList.add("unimportant")
            timeDiv.classList.add("unimportant")
            prevDiv.classList.add("wrong")
            correctDiv.classList.remove("unimportant")
            correctDiv.classList.remove("wrong")
            correctDiv.classList.add("correct")
            break
        default:
            console.log("updateStyle err")
    }
}

function getCorrectDiv() {
    switch (correct) {
        case "Math":
            return mathDiv
        case "Cursor":
            return cursorDiv
        case "Time":
            return timeDiv
        case "Prev":
            return prevDiv
        default:
            console.log("getAnwserDiv err")
    }
}

function resetStyle() {
    mathDiv.classList.remove("unimportant")
    cursorDiv.classList.remove("unimportant")
    timeDiv.classList.remove("unimportant")
    prevDiv.classList.remove("unimportant")
    mathDiv.classList.remove("wrong")
    cursorDiv.classList.remove("wrong")
    timeDiv.classList.remove("wrong")
    prevDiv.classList.remove("wrong")
    getCorrectDiv().classList.remove("correct")
}

function proceed() {
    blocker.style.display = "none"
    resetStyle()
    generate()
}