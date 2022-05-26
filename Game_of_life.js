const pp = console.log

function startGame() {
  // collecting and declaring variables
  const rows = document.getElementById('row').value
  const columns = document.getElementById('column').value
  pp('Game start')
  createGame(rows, columns)
  repeat()
}

const repeat = () => {
  setInterval(liveOrDie, 1000)
}

// classs creating the cells
class Cell {
  constructor(cellnum, column, row, status) {
    this.cellnum = cellnum
    this.column = column
    this.row = row
    this.status = status
  }
  hello() {
    const state = this.status
    console.log(`I'm a ${state} cell`)
  }
  position() {
    const pos = this.cellnum
    console.log(`I'm in cell number ${pos}`)
  }
}

// (initializeGame) is an object
// the property is array number e.g arr1 and
// the value is an array containing the created cells e.g arr1:[cell, cell, cell]
var initializeGame

//  This function create the required Number of cell due to the input value
function createGame(rows, colns = rows) {
  initializeGame = {}
  const div = document.getElementById('root')
  let count = 1
  for (let i = 1; i <= rows; i++) {
    const inner_div = document.createElement('div')
    initializeGame['arr' + i] = []
    for (let j = 1; j <= colns; j++) {
      let DOA = (Math.random() * 100).toFixed(0) % 2 == 0 ? 'alive' : 'dead'
      let c = new Cell(count, j, i, DOA)
      count++
      let span = document.createElement('div')
      let att = document.createAttribute('class')
      att.value = 'root_span'
      span.setAttributeNode(att)
      if (c.status == 'alive') {
        span.style.backgroundColor = 'white'
      } else {
        span.style.backgroundColor = 'black'
      }
      inner_div.appendChild(span)
      initializeGame['arr' + i].push(c)
    }
    div.appendChild(inner_div)
  }
  return initializeGame
}

function liveOrDie() {
  pp('live or die running')
  // next time obj destruction is a better option here
  let arrKeys = Object.keys(initializeGame)
  let arrValues = initializeGame[arrKeys[0]]
  console.log(arrValues.length)
  console.log(initializeGame)

  for (let i = 0; i < arrKeys.length; i++) {
    for (let j = 0; j < arrValues.length; j++) {
      if (
        initializeGame[arrKeys[i]][j] != undefined &&
        initializeGame[arrKeys[i]][j].status != undefined &&
        initializeGame[arrKeys[i]][j].status == 'alive'
      ) {
        function checkAround_Live() {
          let counter = 0
          //checking the current array next column cell arr i, j+1
          if (
            initializeGame[arrKeys[i]][j + 1] != undefined &&
            initializeGame[arrKeys[i]][j + 1].status == 'alive' &&
            initializeGame[arrKeys[i]][j + 1].status != 'dead'
          ) {
            counter += 1
          }
          //checking the next array next column cell arr i+1, j+1
          if (
            initializeGame[arrKeys[i + 1]] != undefined &&
            initializeGame[arrKeys[i + 1]][j + 1] != undefined &&
            initializeGame[arrKeys[i + 1]][j + 1].status == 'alive' &&
            initializeGame[arrKeys[i + 1]][j + 1].status != 'dead'
          ) {
            counter += 1
          }
          //checking the previous array next column cell arr i-1, j+1
          if (
            initializeGame[arrKeys[i - 1]] != undefined &&
            initializeGame[arrKeys[i - 1]][j + 1] != undefined &&
            initializeGame[arrKeys[i - 1]][j + 1].status == 'alive' &&
            initializeGame[arrKeys[i - 1]][j + 1].status != 'dead'
          ) {
            counter += 1
          }
          //checking the previous array current column cell arr i-1, j
          if (
            initializeGame[arrKeys[i - 1]] != undefined &&
            initializeGame[arrKeys[i - 1]][j] != undefined &&
            initializeGame[arrKeys[i - 1]][j].status == 'alive' &&
            initializeGame[arrKeys[i - 1]][j].status != 'dead'
          ) {
            counter += 1
          }
          //checking the next array current column cell arr i+1, j
          if (
            initializeGame[arrKeys[i + 1]] != undefined &&
            initializeGame[arrKeys[i + 1]][j] != undefined &&
            initializeGame[arrKeys[i + 1]][j].status == 'alive' &&
            initializeGame[arrKeys[i + 1]][j].status != 'dead'
          ) {
            counter += 1
          }
          //checking the previous array previous column cell arr i-1, j-1
          if (
            initializeGame[arrKeys[i - 1]] != undefined &&
            initializeGame[arrKeys[i - 1]][j - 1] != undefined &&
            initializeGame[arrKeys[i - 1]][j - 1].status == 'alive' &&
            initializeGame[arrKeys[i - 1]][j - 1].status != 'dead'
          ) {
            counter += 1
          }
          //checking the current array previous column cell arr i, j-1
          if (
            initializeGame[arrKeys[i]][j - 1] != undefined &&
            initializeGame[arrKeys[i]][j - 1].status == 'alive' &&
            initializeGame[arrKeys[i]][j - 1].status != 'dead'
          ) {
            counter += 1
          }
          //checking the next array previous column cell arr i+1, j+1
          if (
            initializeGame[arrKeys[i + 1]] != undefined &&
            initializeGame[arrKeys[i + 1]][j - 1] != undefined &&
            initializeGame[arrKeys[i + 1]][j - 1].status == 'alive' &&
            initializeGame[arrKeys[i + 1]][j - 1].status != 'dead'
          ) {
            counter += 1
          }
          return counter
        }
        function kill() {
          let decisionValue = checkAround_Live()
          console.log(decisionValue)
          if (decisionValue < 2 || decisionValue > 3) {
            initializeGame[arrKeys[i]][j].status = 'dead'
            return 'This Cell Is Now ' + initializeGame[arrKeys[i]][j].status
          }
        }
        kill()
        console.log(initializeGame[arrKeys[i]][j])
      } else {
        // function checkAround_Dead() {
        //   let counter = 0
        //   //checking the current array next column cell arr i, j+1
        //   if (
        //     initializeGame[arrKeys[i]][j + 1] != undefined &&
        //     initializeGame[arrKeys[i]][j + 1].status == 'alive' &&
        //     initializeGame[arrKeys[i]][j + 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the next array next column arr cell i+1, j+1
        //   if (
        //     initializeGame[arrKeys[i + 1]] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j + 1] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j + 1].status == 'alive' &&
        //     initializeGame[arrKeys[i + 1]][j + 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the previous array next column cell arr i-1, j+1
        //   if (
        //     initializeGame[arrKeys[i - 1]] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j + 1] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j + 1].status == 'alive' &&
        //     initializeGame[arrKeys[i - 1]][j + 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the previous array current column cell arr i-1, j
        //   if (
        //     initializeGame[arrKeys[i - 1]] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j].status == 'alive' &&
        //     initializeGame[arrKeys[i - 1]][j].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the next array current column cell arr i+1, j
        //   if (
        //     initializeGame[arrKeys[i + 1]] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j].status == 'alive' &&
        //     initializeGame[arrKeys[i + 1]][j].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the previous array previous column cell arr i-1, j-1
        //   if (
        //     initializeGame[arrKeys[i - 1]] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j - 1] != undefined &&
        //     initializeGame[arrKeys[i - 1]][j - 1].status == 'alive' &&
        //     initializeGame[arrKeys[i - 1]][j - 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the current array previous column cell arr i, j-1
        //   if (
        //     initializeGame[arrKeys[i]][j - 1] != undefined &&
        //     initializeGame[arrKeys[i]][j - 1].status == 'alive' &&
        //     initializeGame[arrKeys[i]][j - 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   //checking the next array previous column cell arr i+1, j+1
        //   if (
        //     initializeGame[arrKeys[i + 1]] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j - 1] != undefined &&
        //     initializeGame[arrKeys[i + 1]][j - 1].status == 'alive' &&
        //     initializeGame[arrKeys[i + 1]][j - 1].status != 'dead'
        //   ) {
        //     counter += 1
        //   }
        //   return counter
        // }
        function revive() {
          //   let decisionValue = checkAround_Dead()
          //   console.log(decisionValue)
          if (true) {
            initializeGame[arrKeys[i]][j].status = 'alive'
            return 'This Cell Is Now ' + initializeGame[arrKeys[i]][j].status
          }
          return "Thank's for your effort Inusa"
        }
        revive()
        console.log(initializeGame[arrKeys[i]][j])
      }
    }
  }
}
