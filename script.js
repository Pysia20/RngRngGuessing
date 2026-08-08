let correct = ""
let num = 0
let streak = 0
let mouseX = 0
let mouseY = 0
let britishController

const confettiSound  = new Audio()
const typeSound = new Audio()

const blocker = document.querySelector(".Blocker")
const narrator = document.querySelector(".Narrator")

const randOut = document.getElementById("TheNumber")
const streakOut = document.getElementById("StreakNum")
const mathDiv = document.getElementById("Math")
const cursorDiv = document.getElementById("Cursor")
const timeDiv = document.getElementById("Time")
const prevDiv = document.getElementById("Prev")
const narratorText = document.getElementById("NarratorText")

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
})

document.addEventListener('DOMContentLoaded', () => {
    generate()
    britishController = new British_Controller()
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
        spawnConfetti()
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

function spawnConfetti() {
    const file = Math.floor(Math.random() * 10)
    if (file <= 5) {
        confettiSound.src = "assets/audio/confetti1.mp3"
    } else if (file !== 9) {
        confettiSound.src = "assets/audio/confetti3.mp3"
    } else {
        confettiSound.src = "assets/audio/confetti2.mp3"
    }
    confettiSound.load()
    confettiSound.play()
    confetti({
        origin: { y: 1, x: 1 },
        angle: 125,
        particleCount: 200,
        spread: 90,
        drift: -0.75,
        ticks: 100,
        zIndex: 0
    });
    confetti({
        origin: { y: 1, x: 0 },
        angle: 55,
        particleCount: 200,
        spread: 90,
        drift: 0.75,
        ticks: 100,
        zIndex: 0
    });
}

/* SAVEs JUST IN CASE
    FROM THE ANWSERS
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.70, x: 0.33 },
        angle: 130,
        ticks: 250,
        zIndex: 0,
        drift: -0.75
    });
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.70, x: 0.66 },
        angle: 50,
        ticks: 250,
        zIndex: 0,
        drift: 0.75
    });

    FROM THE NUM
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.32, x: 0.36 },
        angle: 130,
        ticks: 100,
        zIndex: 0,
        drift: -0.75
    });
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.32, x: 0.64 },
        angle: 50,
        ticks: 100,
        zIndex: 0,
        drift: 0.75
    });
 */

function nextText() {
    britishController.next()
    britishController.spell()
}

class British_Controller {
    constructor() {
        this.dialogues = ["hello FOOL", "test", "test2"]
        this.current = ""

        this.timeOuts = []
    }

    add(text) {
        this.dialogues.push(text)
    }

    show() {
        narrator.style.display = "flex"
        this.next()
        this.spell()
    }

    hide() {
        narrator.style.display = "none"
    }

    next() {
        this.current = this.dialogues.shift()
    }

    spell() {
        if (this.current) {
            this.clearTimeouts()
            narratorText.innerHTML = ""
            const toSpell = this.current
            for (let i = 0; i < toSpell.length; i++) {
                const timeout = setTimeout(() => {
                    narratorText.innerHTML += toSpell[i]
                    typeSound.src = "assets/audio/writing" + ((i % 3) + 1) + ".mp3"
                    typeSound.play()
                }, 140 * (i + 1))
                this.timeOuts.push(timeout)
            }
        } else {
            this.hide()
        }
    }

    clearTimeouts() {
        for (const timeout of this.timeOuts) {
            clearTimeout(timeout)
        }
        this.timeOuts = []
    }
}