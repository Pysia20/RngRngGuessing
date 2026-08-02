let correct = ""
let num = 0
let mouseX = 0
let mouseY = 0

const randOut = document.getElementById("TheNumber")

document.addEventListener('mousemove', function (event) {
    mouseX = event.clientX
    mouseY = event.clientY
})

function generate() {
    const method = Math.floor(Math.random() * 4) //wait, it's all just math.random?  always has been.

    switch (method) {
        case 0:
            num = Math.floor(Math.random() * 1000)
            correct = ".Math"
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
            console.log("switch err")
    }
    randOut.innerHTML = num
}

function guess(anwser) {
    if (anwser === correct) {
        console.log("yuppie")
    } else {
        console.log("BOOOOOOOOOOO")
    }
    generate()
}