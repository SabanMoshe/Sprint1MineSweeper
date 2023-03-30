'use strict'

const MINES = ' @' //later will add imogies
const WALL = 'O'
const FLAG = '🚩'
const MINE = '💣'
const MINE_IMG = '<img src="img/MINE.png">'//too big mine
const NONE = '_'
var gLife = 3

const gGame = {
    isOn: false,
    shownCount: 0, //shownCount: How many cells are shown 
    markedCount: 0,// How many cells are marked (with a flag)
    secsPassed: 0
}

//Support 3 levels of the game
var level = "beginner" //get it from button later
if (level === " beginner") {//add medium and expert later
    // var gLevel = {
    //     SIZE: 4,
    //     MINES: 2
    // }
}
const gLevel = { //add buttons for level later
    SIZE: 8,
    MINES: 14
}
var gElTimer = 1
var gTimerClick = 0
var gTimerIntervalId

const gBoard = []
function onInit() {
    gLife = 3
    gGame.isOn = true
    gGame.shownCount=0
    gGame.markedCount=0
    gGame.secsPassed=0
    gTimerClick = 0
    updateLife()
    buildBoard(gLevel.SIZE) //**Creating my MODAL Matrix of cell objects
    console.log('gBoardOnInit', gBoard)
    renderBoard()
    hideModal()
}

function buildBoard(size) {
    console.log('size', size)
    // Complete - Builds the board 
    // Complete - Set the mines - 2 mines at fixed at first
    // Complete setMinesNegsCount() 
    // complete Return the created board (no need it's global)
    // complete Set the mines - 2 mines at local at first
    //const board = []

    var randomIndxMines = getRandomMinesIdx()//[{i,j} {i,j}] // getting the mines index array
    console.log('randomIndxMines', randomIndxMines)

    for (var i = 0; i < size; i++) {
        gBoard[i] = []
        for (var j = 0; j < size; j++) {


             //*************Random Mines Option********************************* */
                var cell = {
                    minesAroundCount: 0,
                    isShown: false,
                    isMine: false,
                    isMarked: false
                }
                gBoard[i][j] = cell

               //running over cels when mines are relevalt - not efficient - improve if tim allows
                //running on the mines index array
                for (var index = 0; index < gLevel.MINES; index++) {
                    if ((randomIndxMines[index].randIdx === i) && (randomIndxMines[index].randJdx === j)) {
                        console.log('i,j', i, j)
                        var cell = {
                            minesAroundCount: 0,
                            isShown: false,
                            isMine: true,
                            isMarked: false
                        }
                        gBoard[i][j] = cell
                    }   
                }

            //**************2 Mines Option****************************** */
            // if ((i === 1 && j === 1) || (i === size - 1 && j === size - 1)) { //placing initial mines on fixed positions
            //     //first placing 2 Mines maually
            //     var cell = {
            //         minesAroundCount: 0,
            //         isShown: false,
            //         isMine: true,
            //         isMarked: false
            //     }
            //     gBoard[i][j] = cell

            // } else {
            //     var cell = {
            //         minesAroundCount: 0,
            //         isShown: false,
            //         isMine: false,
            //         isMarked: false
            //     }
            //     gBoard[i][j] = cell
            // }
        }

    }

 //*********************************************************** */

    setMinesNegsCount()//running on global variable
}

// complete - setMinesNegsCount(board) Count mines around each cell and set the cell's minesAroundCount.

function setMinesNegsCount() {//getting matrix of objects [  [{} {}...{}]  [{} {}...{}] ... [{} {}...{}] ]
    //saving for each cell, how many MINE neigboors it has
    //("isShow is still true")
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
    console.log('renderedBoard')
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class ="row" >\n` //adding class row for each i
        for (var j = 0; j < gBoard[0].length; j++) {
            const cell = gBoard[i][j]

            var className = (cell.isMine) ? 'mine ' : ''//adding classes fpr later
            if (cell.isMarked) className += ' marked'
            if (cell.isShown) className += ' shown '

            var cellClassspecific = getClassName({ i: i, j: j }) + ' '

            className += cellClassspecific

            const title = `cell: ${i}, ${j}`

            strHTML += `\t<td title="${title}" 
            class="cell ${className}" 
            onclick="onCellClicked(this, ${i}, ${j})" 
            oncontextmenu="onCellMarked(this, ${i}, ${j})"
            class=class-${i}-${j}>
    
            </td>\n`
        }
        strHTML += `</tr>\n`
        //console.log('strHTML: ',  strHTML)
    }
    const elCells = document.querySelector('.mine-sweeper')
    elCells.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    console.log('elCell', elCell)
    console.log('gTimerClick', gTimerClick)
    if (gTimerClick === 0) {
        startTimer()
        gTimerClick++
        //gTimerClick++
        console.log('gTimerClick', gTimerClick)
    }
    if (gGame.isOn= false) return
    // Select the elCell and set the value
    console.log('Entered onCellClicked(elCell, i, j)')
    console.log('elCell and i j =', elCell, i, j)

    const cell = gBoard[i][j]//for Modal
    if (cell.isShown) {
        console.log('the selected cell isShown')
        return
    }
    //elCell.classList.add('selected')
    console.log('elCell after .add(selected) =', elCell)

    if (cell.isMine === true) {// if MINE – reveal the mine clicked
        //elCell.classList.add('selectedMine')
        //MODAL update:
        gLife--
        updateLife()
        if (!checkGameOver()) {
            //console.log("got into checkgameover")
            showModal2()
        } else {
            elCell.classList.add('selectedMine')
            cell.isShown = true
            gGame.shownCount++
            //DOM update:
            renderCell({ i: i, j: j }, MINE)
            //**here need to loop on the board together with the mines arry to show all mines and pint in red
            gameOver()
            //with 3 lifes later   
        }

    }


    if (cell.minesAroundCount && cell.isMine !== true) {//Cell with no neighbors – reveal the cell alone
        elCell.classList.add('selected')
        //MODAL update:
        cell.isShown = true
        gGame.shownCount++
        //DOM update:
        console.log('cell.minesAroundCount', cell.minesAroundCount)
        //renderBoard()
        var num = cell.minesAroundCount
        renderCell({ i: i, j: j }, num)

        //not complete...      
    }

    if (!cell.minesAroundCount && cell.isMine !== true) {// Cell without mine neighbors – expand it and its 1st degree neighbors
        elCell.classList.add('selected')
        console.log('no Mine neigbors')

        console.log('i,j', i, j)

        //gGame.shownCount++
        //expandShown1(i, j)//expandShown(board, elCell, i, j)
        expandShownRec(i, j)

    }
}

//function onCellMarked(elCell)  - this is the request
function onCellMarked(elCell, i, j) {
    console.log('cell_right_mouse_Clicked', elCell)
    const cell = gBoard[i][j]//for Modal
    if (cell.isMarked) {
        console.log('the selected cell is')
        renderCell({ i: i, j: j }, ' ')
        return
    } else {
        //Modal
        const cell = gBoard[i][j]
        cell.isMarked = true
        //DOM 
        renderCell({ i: i, j: j }, FLAG)
        checkVictory1()
    }
}

function checkVictory1() {
    //winning is wehn you reveal all the empty squares witout hitting a mine
    if ((gLevel.SIZE ** 2) === (gGame.markedCount + gGame.shownCount)) {
        console.log('you win')
        //add MODAL MESSEGE LATER
        console.log('gGame.shownCount', gGame.shownCount)
        console.log('gGame.markedCount', gGame.markedCount)
    }
}

function checkGameOver() {
    //TODO Game ends when all mines are marked, 
    //TODO and all the other cells are shown

    console.log("You steped om a Mine! Your remaining life is: ", gLife)
    //ADD AMODAL LATER
    if (gLife === 0) {
        return true
    } else return false
}

function gameOver() {
    stopTimer()
    console.log("game over")
    showModal() 
}

//seems to be working as recorsive!
//seems to be working as recorsive!

function expandShownRec(rowIdx, colIdx) { //seems to be working as recorsive!
    console.log('EnteredexpandShownRec')
    // stop condition
    if (!relvant(rowIdx, colIdx)) return; // if the index sent is a mine or shown or marked get out of recorsia
    //console.log('passed the shouldHandle ', !relvant)
    renderCell2(rowIdx, colIdx);

    if (gBoard[rowIdx][colIdx].minesAroundCount) return;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) 
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            expandShownRec(i, j)       
        }
}

function relvant(rowIdx, colIdx) {
    console.log('Entered relvant')
   
    // out of bounds
    if (rowIdx < 0 || rowIdx >= gLevel.SIZE) return false;
    if (colIdx < 0 || colIdx >= gLevel.SIZE) return false;
    
    var currCell= gBoard[rowIdx][colIdx]; 
    // if shown
    if (currCell.isShown || currCell.isMarked || currCell.isMine) return false;

    return true;
}

function renderCell2(rowIdx, colIdx) {
    console.log('updateCell')
    var currCell = gBoard[rowIdx][colIdx]; 
    const cellSelector = '.' + getClassName({ i: rowIdx, j: colIdx }) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.classList.add('selected')
    if (currCell.minesAroundCount) elCell.innerText = currCell.minesAroundCount
    currCell.isShown = true;
}


function updateLife() {
    console.log('check')
    const elBallsCount = document.querySelector('.Life span')
    elBallsCount.innerText = gLife
}

function startTimer() {
    var startTime = Date.now()
    gElTimer = document.querySelector('.Time')
    gTimerIntervalId = setInterval(() => {
        const diff = Date.now() - startTime
        gGame.secsPassed=(diff / 1000).toFixed(1)
        gElTimer.innerText = (diff / 1000).toFixed(1)
    }, 10)
}

function stopTimer() {
    clearInterval(gTimerIntervalId)
}

function showModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
}


function showModal2() {
    const elModal = document.querySelector('.modal2')
    elModal.classList.remove('hide')
}

function hideModal2() {
    const elModal = document.querySelector('.modal2')
    elModal.classList.add('hide2')
}

function eliminate3Mines(){ //elimination3 random mines
    console.log('eliminate3Mines()')
    const idx = getRandomIdx()

    for (var i = 0; i < gLevel.SIZE; i++) { 
        for (var j = 0; j < gLevel.SIZE; j++) {
             console.log('gBoard[i][j].isMine', gBoard[i][j].isMine)  
             
             for (var index = 0; index < idx.length; index++) {
                if ((idx[index].randIdx === i) && (idx[index].randJdx === j)) {
                    gBoard[i][j].isMine=false //removing a mine
                }
            }       
       } 
    }
}

// for (var index = 0; index < gLevel.MINES; index++) {
//     if ((randomIndxMines[index].randIdx === i) && (randomIndxMines[index].randJdx === j)) {
//         console.log('i,j', i, j)
//         var cell = {
//             minesAroundCount: 0,
//             isShown: false,
//             isMine: true,
//             isMarked: false
//         }
//         gBoard[i][j] = cell








//*************previous expandShown versions *****************************/



// //do not enter expandShown() so edit to expandShown1()
// function expandShown1(rowIdx, colIdx) {//expandShown(board, elCell, i, j) 
//     //TODO When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. 
//     // NOTE: start with a basic implementation that only opens the non-mine 1st degree neighbors
//     // TODO BONUS: if you have the time later, try to work more like the real algorithm 
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= gLevel.SIZE) continue //out of matrix bound (to left or too right)
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) { //out of matrix bound (to up or too down)
//             if (i === rowIdx && j === colIdx) continue //this it the main cell that was sent
//             if (j < 0 || j >= gLevel.SIZE) continue
            

//             //MODAL
//             var currCell = gBoard[i][j]
//             if(currCell.minesAroundCount){
//                 console.log('currCell.minesAroundCount', currCell.minesAroundCount)
//                 return //stooping condition
//             } 
//             currCell.isShown = true
//             gGame.shownCount++

//             //DOM
//             const cellSelector = '.' + getClassName({ i: i, j: j }) // cell-i-j
//             const elCell = document.querySelector(cellSelector)
//             elCell.classList.add('selected')

//             if (currCell.minesAroundCount) elCell.innerText = currCell.minesAroundCount


//         }
//     }
// }

// //getting her first time if no mine arround
// //not working  ar recorsive
// function expandShown1Rec(elCell, rowIdx, colIdx) {//expandShown(board, elCell, i, j)
//     console.log('elCell =', elCell)
//     for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
//         if (i < 0 || i >= gLevel.SIZE) continue //out of matrix bound (to left or too right)
//         for (var j = colIdx - 1; j <= colIdx + 1; j++) { 
//             if (i === rowIdx && j === colIdx) continue //this it the main cell that was sent
//             if (j < 0 || j >= gLevel.SIZE) continue //out of matrix bound (to up or too down)
            
           
//             //MODAL
//             var currCell = gBoard[i][j]
//             currCell.isShown = true
//             gGame.shownCount++

//             //DOM
//             const cellSelector = '.' + getClassName({ i: i, j: j }) // cell-i-j
//             const elCell = document.querySelector(cellSelector)
//             elCell.classList.add('selected')
//             if (currCell.minesAroundCount) elCell.innerText = currCell.minesAroundCount

//         }
//     }
// }
