/*
 _._     _,-'""`-._
(,-.`._,'(       |\`-/|
    `-.-' \ )-`( , o o)
          `-    \`_`"'-
*/

let correct = ""
let num = 0
let streak = 0
let highScore = 0
let mouseX = 0
let mouseY = 0
let britishController = false
let welcomeText = false
let regenerated = false
let tipGiven = false
let resetProgressConfirmations = 0

const confettiSound  = new Audio()
const typeSound = new Audio()
const hoverSound = new Audio("assets/audio/hover.mp3")
const clickSound = new Audio("assets/audio/click.mp3")

typeSound.volume = 0.75
hoverSound.volume = 0.4
clickSound.volume = 0.8

const blocker = document.querySelector(".Blocker")
const narrator = document.querySelector(".Narrator")
const volumeDiv = document.querySelector(".VolumeSlider")
const anwsers = document.querySelectorAll(".anwser")

const randOut = document.getElementById("TheNumber")
const streakOut = document.getElementById("StreakNum")
const highOut = document.getElementById("HighscoreNum")
const mathDiv = document.getElementById("Math")
const cursorDiv = document.getElementById("Cursor")
const timeDiv = document.getElementById("Time")
const prevDiv = document.getElementById("Prev")
const narratorText = document.getElementById("NarratorText")

function loadHighScore() {
    const tempScore = parseInt(localStorage.getItem("RNGsHighScore"))
    const didTutorials = localStorage.getItem("RNGsTutorials")
    if (tempScore) {
        highScore = tempScore
    }
    if (didTutorials) {
        tipGiven = true
        regenerated = true
        welcomeText = true
    }
    highOut.innerHTML = "High-score: " + highScore
}

function updateHighScore() {
    if (streak > highScore) {
        highScore = streak
        localStorage.setItem("RNGsHighScore", highScore)
        highOut.innerHTML = "High-score: " + highScore
        if (tipGiven && regenerated && welcomeText) {
            localStorage.setItem("RNGsTutorials", "yup")
        }
    }
}

function resetProgress() {
    switch (resetProgressConfirmations) {
        case 0:
            britishController.add("Thou shalt annihilate thy save data!")
            britishController.add("Art thou truly sure?!")
            britishController.show()
            resetProgressConfirmations++
            setTimeout(() => {
                resetProgressConfirmations = 0
            }, 20000)
            break
        case 1:
            britishController.add("No but like fr.")
            britishController.add("This will delete your save!")
            britishController.show()
            resetProgressConfirmations++
            break
        case 2:
            britishController.add("Click one more time to confirm delete")
            britishController.show()
            resetProgressConfirmations++
            break
        case 3:
            localStorage.removeItem("RNGsTutorials")
            localStorage.removeItem("RNGsHighScore")
            location.reload()
            break
        default:
            console.log("generate err")
    }
}

function toggleSlider() {
    if (volumeDiv.classList.contains("hidden")) {
        volumeDiv.classList.replace("hidden", "shown")
    } else {
        volumeDiv.classList.replace("shown", "hidden")
    }
}

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
})

document.addEventListener('DOMContentLoaded', () => {
    loadHighScore()
    generate()
    if (!welcomeText) {
        britishController = new British_Controller(["Welcome, THOU UTTER FOOL!", "Thou shalt guess my RNGs!", "NOWTH"])
    } else {
        britishController = new British_Controller(["Welcome back, my little fool!"])
        britishController.changeSpeed(100)
    }
    welcomeText = true
})

for (const anwser of anwsers) {
    anwser.addEventListener("mouseenter", () => {
        hoverSound.load()
        hoverSound.play()
    })
}


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

function regenerate() {
    if (!regenerated) {
        britishController.changeSpeed(100)
        britishController.add("This thingamajig alloweth thee to regenerate the tally using the selfsame fashion.")
        britishController.add("But why art thou regenerating!?")
        britishController.add("I deem thee cheat!!!!1!")
        britishController.show()
        regenerated = true
    }
    switch (correct) {
        case "Math":
            num = Math.floor(Math.random() * 1000)
            break
        case "Cursor":
            num = (mouseX * mouseY) % 1000
            break
        case "Time":
            num = Date.now() % 1000
            break
        case "Prev":
            num = Math.pow(num, 4) % 1000
            break
        default:
            console.log("regenerate err")
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
        clickSound.play()
        streak = 0
        streakOut.innerHTML = "Streakn't"
        updateStyle(anwser)
    }
    blocker.style.display = "block"
    updateHighScore()
}

function giveTip(type) {
    britishController.changeSpeed(100)
    if (!tipGiven) {
        britishController.changeSpeed(100)
        britishController.add("FOUL, STINKING CHEAT!!");
        britishController.add("...")
        britishController.add("but if thine unworthy self must know, behold how mine RNGs functioneth!");
        tipGiven = true
    }
    switch (type) {
        case "Math":
            britishController.add(".random() is a function of the Math library.")
            britishController.add("In other words, it's pretty much just random.")
            britishController.add("Good luck.")
            britishController.show()
            break
        case "Cursor":
            britishController.add("This one uses the position of your cursor.")
            britishController.add("Position X (left and right): " + mouseX + " and Y (up and down): " + mouseY)
            britishController.add("It's the easiest one to guess correctly if you just click refresh.")
            britishController.show()
            break
        case "Time":
            britishController.add("This one's a bit weird.")
            britishController.add("Date.now() doesn't return the formatted date or time.")
            britishController.add("It returns the number of milliseconds that have passed since January 1, 1970.")
            britishController.show()
            break
        case "Prev":
            britishController.add("This one just uses the previous number.")
            britishController.add("It's also pretty easy to guess if you use refresh and sometimes even obvious without it.")
            britishController.show()
            break
        default:
            console.log("Tip err")
    }
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
    constructor(dialogues) {
        this.dialogues = dialogues
        this.current = ""
        this.speed = 140

        this.timeOuts = []
    }

    add(text) {
        this.dialogues.push(text)
    }

    show() {
        narrator.style.display = "flex"
        narrator.classList.add("Showing")
        setTimeout(() => {
            narrator.style.opacity = 1
        }, 1)
        this.next()
        this.spell()
    }

    hide() {
        narrator.classList.remove("Showing")
        narrator.style.opacity = 0
        setTimeout(() => {
            narrator.style.display = "none"
        }, 500)
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
                    if (toSpell[i] !== " ") {
                        typeSound.src = "assets/audio/writing" + ((i % 3) + 1) + ".mp3"
                        typeSound.play()
                    }
                }, this.speed * (i + 1))
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

    changeSpeed(num) {
        this.speed = num
    }
}