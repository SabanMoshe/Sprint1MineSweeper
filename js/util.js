'use strict'


//for right click menu not to apear
const div = document.getElementById("myTable");
div.addEventListener("contextmenu", (e) => {e.preventDefault()});


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}

//var randomIndxMines= getRandomMinesIdx()
//console.log('randomIndxMines', randomIndxMines)
//console.log('indxArr', randomIndxMines[0].randIdx)
function getRandomMinesIdx() {
    //getRandomMinesIdx() generating array in length of gLevel.MINES with random indexes [{i,j} {i,j}]
    const minesIndex = []
    for (var i = 1; i <= gLevel.MINES; i++) {
        const randIdx = getRandomInt(0, gLevel.SIZE)
        const randJdx = getRandomInt(0, gLevel.SIZE)
        minesIndex.push({ randIdx, randJdx })
    }
    return minesIndex
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}

function getRandomIdx() {
    //getRandomMinesIdx() generating array in length of gLevel.MINES with random indexes [{i,j} {i,j}]
    const index = []
    for (var i = 1; i <= 3; i++) {
        const randIdx = getRandomInt(0, gLevel.SIZE)
        const randJdx = getRandomInt(0, gLevel.SIZE)
        index.push({ randIdx, randJdx })
    }
    console.log('check')
    return index
}





// Convert a location object { i: i, j: j } to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}


// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}


function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}



function countSeatsAround(rowIdx, colIdx) {
    var seatCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gCinema.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gCinema[0].length) continue
            var currCell = gCinema[i][j]
            if (currCell.isSeat && !currCell.isBooked) seatCount++
        }
    }
    return seatCount
}


var gNums = [1, 2, 3, 4, 5, 6, 7]

function drawNum() {
    return gNums.pop()
}

function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var randIdx = getRandomInt(0, items.length);
        var keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function drawNum2() {//drawing random number from an array
    var randIdx = getRandomInt(0, gNums2.length)
    var num = gNums2[randIdx]
    gNums2.splice(randIdx, 1)
    return num
}




function findEmptyPos() { //matrix as arrays of arrays of strings
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            const cell = gBoard[i][j]
            if (!cell) {
                // const pos = { i: i, j: j } same writing
                const pos = { i, j }
                return pos
            }
        }
    }
}
function findEmptyPosRandom() {
    const emptyLocations = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        for (var j = 0; j < BOARD_SIZE; j++) {
            const cell = gBoard[i][j]
            if (!cell) {
                const pos = { i, j }
                emptyLocations.push(pos)
            }
        }
    }
    const randIdx = getRandomInt(0, emptyLocations.length)
    return emptyLocations[randIdx]
}


