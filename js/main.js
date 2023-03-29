'use strict'

const MINES = ' @' //later will add imogies
const WALL = 'O'
const FLAG = '🚩'
const MINE = '💣'

// const ONE = '1️⃣'//add digits later if time allows
// const TWO = '2️⃣'
// const NINE = '9️⃣'

var life = 3

const gGame = {
    isOn: true,
    shownCount: 0, //shownCount: How many cells are shown 
    markedCount: 0,// How many cells are marked (with a flag)
    secsPassed: 0
}

//Support 3 levels of the game
var gLevel = {
    SIZE: 4,
    MINES: 2
}
const gBoard = []

function onInit() {
    //This is called when page loads 
    buildBoard(gLevel.SIZE) //**Creating my MODAL Matrix of cell objects
    console.log('gBoardOnInit', gBoard)
    renderBoard()
}

function buildBoard(size) {
    console.log('size', size)
    // Complete - Builds the board 
    // Complete - Set the mines - 2 mines at fixed at first
    // TODOCall setMinesNegsCount() 
    // TODO Return the created board
    // TODO Set the mines - 2 mines at local at first
    //const board = []
    for (var i = 0; i < size; i++) {
        gBoard[i] = []
        for (var j = 0; j < size; j++) {
            //board[i][j] = '0'
            if ((i === 1 && j === 1) || (i === size - 1 && j === size - 1)) { //placing initial mines on fixed positions
                //first placin Mines
                var cell = {
                    minesAroundCount: 0,
                    isShown: false,
                    isMine: true,
                    isMarked: false
                }
                gBoard[i][j] = cell
            } else {
                var cell = {
                    minesAroundCount: 0,
                    isShown: false,
                    isMine: false,
                    isMarked: false
                }
                gBoard[i][j] = cell
            }
        }
    }
    setMinesNegsCount()//running on global variable

    //requested to retune the board. but it's global- 
    //I might need to duplicate it later 

}

// TODO setMinesNegsCount(board) Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount() {//getting matrix of objects [  [{} {}...{}]  [{} {}...{}] ... [{} {}...{}] ]
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) { //for each cell look for mines neighbors
            var count = countNegsCount(gBoard, i, j)
            gBoard[i][j].minesAroundCount += count
        }
    }
}
//negiboor loop
function countNegsCount(board, rowIdx, colIdx) {
    var minesNegCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesNegCount++
        }
    }
    return minesNegCount
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class ="row" >\n` //adding class row for each i
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            var className = (cell.isMine) ? 'mine' : ''//adding classes fpr later
            if (cell.isMarked) className += ' marked'
            if (cell.isShown) className += ' shown'

            const title = `cell: ${i}, ${j}`

            strHTML += `\t<td title="${title}" class="cell ${className}" 
            onclick="onCellClicked(this, ${i}, ${j})" 
            oncontextmenu="onCellMarked(this, ${j}, ${j})">
            </td>\n`
        }
        strHTML += `</tr>\n`
        //console.log('strHTML: ',  strHTML)
    }
    const elCells = document.querySelector('.mine-sweeper')
    elCells.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    // Select the elCell and set the value

    const cell = gBoard[i][j]//for Modal
    console.log('cellClicked', elCell, i, j)
    //console.log('gBoard[i][j]', gBoard[i][j])
    if (cell.isMine === true) {
        elCell.classList.add('selectedMine')

        //MODAL update
        gBoard[i][j].isMarked = true
        gBoard[i][j].isShown = true


        //DOM update
        renderCell(location, MINE)
        //add mine image MINE = '💣'
        
        
        
        gameOver()
        //checkGameOver() with 3 lifes later 
    }

}


// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    //const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    //elCell.innerHTML = value
}

// Returns the class name for a specific cell
function getClassName(location) {
   // const cellClass = 'cell-' + location.i + '-' + location.j
   // return cellClass
}





function onCellMarked(elCell) {
    console.log('cell_right_Clicked', elCell)
}


// function checkGameOver() {
//TODO Game ends when all mines are marked, and all the other cells are shown
//     life--
//     console.log("You steped om a Mine! Your remaining life is: ",life )
//     if (life ===0) gameOver() 
// }

function gameOver() {
    console.log("game over")
}


function expandShown(board, elCell, i, j) {
    //TODO When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. 
    // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors

    // TODO BONUS: if you have the time later, try to work more like the real algorithm 
    // (see description at the Bonuses section)

}




// minesAroundCount: 0,
// isShown: false,
// isMine: false,
// isMarked: false


// var gElSelectedSeat = null
// const gDataBase = createCinema()
// renderCinema()

// function createCinema() {
//     const cinema = []
//     for (var i = 0; i < 7; i++) {
//         cinema[i] = []
//         for (var j = 0; j < 15; j++) {
//             const cell = {
//                 isSeat: (j !== 7)
//             }
//             if (cell.isSeat) {
//                 cell.isBooked = false
//                 cell.price = 5 + i
//             }
//             cinema[i][j] = cell
//         }
//     }

//     cinema[4][4].isBooked = true
//     return cinema
// }

// function renderCinema() {
//     var strHTML = ''
//     for (var i = 0; i < gCinema.length; i++) {
//         strHTML += `<tr class="cinema-row" >\n`
//         for (var j = 0; j < gCinema[0].length; j++) {
//             const cell = gCinema[i][j]

//             // For cell of type SEAT add seat class
//             var className = (cell.isSeat) ? 'seat' : ''
//             if (cell.isBooked) className += ' booked'

//             // Add a seat title: `Seat: ${i}, ${j}`
//             const title = `Seat: ${i + 1}, ${j + 1}`

//             // TODO: for cell that is booked add booked class


//             strHTML += `\t<td title="${title}" class="cell ${className}"
//                             onclick="cellClicked(this, ${i}, ${j})" >
//                          </td>\n`
//         }
//         strHTML += `</tr>\n`
//     }
//     // console.log(strHTML)

//     const elSeats = document.querySelector('.cinema-seats')
//     elSeats.innerHTML = strHTML
// }

// function cellClicked(elCell, i, j) {
//     const cell = gCinema[i][j]
//     // TODO: ignore none seats and booked
//     if (!cell.isSeat || cell.isBooked) return

//     console.log('Cell clicked: ', elCell, i, j)

//     // Support selecting a seat
//     elCell.classList.add('selected')

//     // Only a single seat should be selected
//     if (gElSelectedSeat) {
//         gElSelectedSeat.classList.remove('selected')
//     }

//     gElSelectedSeat = (gElSelectedSeat === elCell) ? null : elCell

//     // When seat is selected a popup is shown
//     if (gElSelectedSeat) {
//         showSeatDetails({ i: i, j: j })
//     } else {
//         hideSeatDetails()
//     }
// }

// function showSeatDetails(pos) {
//     const elPopup = document.querySelector('.popup')
//     const seat = gCinema[pos.i][pos.j]

//     const count = countSeatsAround(pos.i, pos.j)

//     elPopup.querySelector('h2 span').innerText = `${pos.i + 1}-${pos.j + 1}`
//     elPopup.querySelector('h3 span').innerText = `${seat.price}`
//     elPopup.querySelector('h4 span').innerText = `${count}`
//     // update the <button> dataset
//     const elBtn = elPopup.querySelector('button')
//     elBtn.dataset.i = pos.i
//     elBtn.dataset.j = pos.j
//     elPopup.hidden = false
// }

// function hideSeatDetails() {
//     document.querySelector('.popup').hidden = true
// }

// function bookSeat(elBtn) {
//     console.log('Booking seat, button: ', elBtn)

//     const i = elBtn.dataset.i
//     const j = elBtn.dataset.j

//     gCinema[i][j].isBooked = true
//     renderCinema()
//     unSelectSeat()
// }

// function unSelectSeat() {
//     hideSeatDetails()
//     gElSelectedSeat.classList.remove('selected')
//     gElSelectedSeat = null
// }



// function countSeatsAround(rowIdx, colIdx) {
//     var seatCount = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= gCinema.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= gCinema[0].length) continue
//             var currCell = gCinema[i][j]
//             if (currCell.isSeat && !currCell.isBooked) seatCount++
//         }
//     }
//     return seatCount
// }



// var count = countFoodAround(gBoard, 0, 0) //Neighbors Loop
// console.log('Found', count, ' food around me')
// function countFoodAround(board, rowIdx, colIdx) {
//     var foodCount = 0
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) {
//             if (i === rowIdx && j === colIdx) continue
//             if (j < 0 || j >= board[0].length) continue
//             var currCell = board[i][j]
//             if (currCell === FOOD) foodCount++
//         }
//     }
//     return count
// }

