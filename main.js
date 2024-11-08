import { Generate, ans, Validate } from "./game.js"
import { startTimer, seconds, minutes } from "./timer.js";

var currentColor = ''
var ColorSelect = document.getElementsByClassName('i')
let GameBoard = document.getElementById('Game')
let currentRow = GameBoard.lastElementChild;
var currentInput = currentRow.getElementsByClassName('input')[0]
var currentResult = currentRow.getElementsByClassName('result')[0]
let inputables = currentInput.getElementsByClassName('pin')
var PlayerAns = []
var donebtn = document.getElementById('done')
var results
var trial = 0


Generate()

startTimer()

initNewLine();


donebtn.addEventListener("click", () => {
    var black = Validate(ans, PlayerAns)[0]
    var white = Validate(ans, PlayerAns)[1]
    // console.log(`black = ${black}, white = ${white}`)
    UpdateBoard(black, white)
    addRow()
});

function initNewLine() {
    trial++
    currentRow = GameBoard.lastElementChild;
    currentInput = currentRow.getElementsByClassName('input')[0]
    inputables = currentInput.getElementsByClassName('pin')
    currentResult = currentRow.getElementsByClassName('result')[0]
    results = currentResult.getElementsByClassName('pin')

    for (let i = 0; i < inputables.length; i++) {
        inputables[i].addEventListener("click", input)
        inputables[i].addEventListener("dragover",allowdrop)
        inputables[i].addEventListener("drop",(e)=>{
            e.preventDefault() 
            var color = e.dataTransfer.getData("text")
            // console.log(color)
            if (e.srcElement.classList[1]) {
                e.srcElement.classList.remove(e.srcElement.classList[1])
            }
            e.srcElement.classList.add(color)
            PlayerAns[i] = color;
        })
    }


    for (let i = 0; i < ColorSelect.length; i++) {
        ColorSelect[i].addEventListener("click", (e) => {
            currentColor = e.srcElement.classList[2]
            //console.log(currentColor)
        });
        ColorSelect[i].addEventListener("dragstart", (e) => {
            currentColor = e.srcElement.classList[2]
            e.dataTransfer.setData("text", e.srcElement.classList[2])
        })

    }
}

function allowdrop(e) {
    e.preventDefault()
}

function UpdateBoard(pos, color) {

    for (var i = 0; i < color; i++) {
        results[i].classList.add('color')
    }
    for (var j = color; j < (color + pos); j++) {
        results[j].classList.add('pos')
    }
    if (pos === 4) {
        stop()
        win()
    }
}

function win() {
    alert(`You win in ${minutes} minutes and ${seconds} seconds or ${trial} trials`)
    location.reload()
    return
}

function input(e) {
    var el = e.srcElement
    var child = el
    var parent = child.parentNode;
    var i = Array.prototype.indexOf.call(parent.children, child);
    if (e.srcElement.classList[1]) {
        e.srcElement.classList.remove(e.srcElement.classList[1])
    }
    if (currentColor) {
        e.srcElement.classList.add(currentColor)
        PlayerAns[i] = currentColor;
    } else {
        alert('Please select a color first. ')
    }
    //console.log(PlayerAns)
}

function addRow() {
    for (let i = 0; i < inputables.length; i++) {
        inputables[i].removeEventListener("click", input)
    }

    var cell = document.createElement('DIV')
    cell.classList.add('pin')

    var inputcell = document.createElement('DIV')
    inputcell.classList.add('input')

    for (var i = 0; i < 4; i++) {
        inputcell.appendChild(cell)
        cell = cell.cloneNode()
    }

    var resultcell = document.createElement('DIV')
    resultcell.classList.add('result')


    for (var i = 0; i < 4; i++) {
        resultcell.appendChild(cell)
        cell = cell.cloneNode()
    }

    var space = document.createElement('DIV')
    space.classList.add('spacing')

    var row = document.createElement('DIV')
    row.classList.add('row')
    row.appendChild(inputcell)
    row.appendChild(space)
    row.appendChild(resultcell)

    GameBoard.appendChild(row)

    initNewLine()
}










