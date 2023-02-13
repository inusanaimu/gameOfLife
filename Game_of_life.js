
// classs creating the cells
class Cell{
  constructor(cellnum, column, row, status){
  this.cellnum = cellnum;
  this.column = column;
  this.row = row;
  this.status = status;
  };
};

// (initializeGame) this is the container of all the created cells
var initializeGame;

//  This function create the required Number of cell with respect to the input value
function createGame(x, y) {
  initializeGame = {};
  let count = 1;
  for (let i = 1; i<= x; i++){
      initializeGame["arr" + i] = [];
      for(let j = 1; j <= y; j++){
          let DOA = (((Math.random()*1000).toFixed(0))%2 == 0)? "alive": "dead";
          let c = new Cell(count, j, i, DOA);
          count++;
          initializeGame["arr" + i].push(c);
      }
  }
  return initializeGame;

}

function newGame(){
    const btnStart = document.getElementById('btnStart')
    if (btnStart.innerHTML == 'Play'){
        console.log("start Clicked")
        
        // collecting and declaring variables 
        let rows = Number(document.getElementById('row').value);
        let columns = Number(document.getElementById('column').value);
        console.log(rows);
        console.log(columns)

        if ((rows <= 0) || (columns <= 0)) {
            rows = 20
            columns = 40
        }
        // if(!isNaN(rows) && !isNaN(columns) && (rows > 0) && (columns > 0)){
        if(!isNaN(rows) && !isNaN(columns) && (rows > 0) && (columns > 0)){
            btnStart.innerHTML = 'Pause'
      
          createGame(+rows, +columns)
          createGameGrid(initializeGame)
        repeating()
    }

  } else {
    btnStart.innerHTML = 'Play'
  }

}

function createGameGrid(gameGrid){
    const rootDiv = document.getElementById('rootDiv')
    rootDiv.innerHTML='';
    const gridContainer = document.createElement('div');
    gridContainer.className+= "grid-container";
    
    console.log(gameGrid)
    let arrKeys = Object.keys(gameGrid);
    console.log(arrKeys.length)
    
    for( let i = 0; i <arrKeys.length; i++){
        const gridRow = document.createElement('div');
        gridRow.className+= "grid-row";
        
        let arrValues = gameGrid[arrKeys[i]]
        console.log(arrValues.length)


        for(let j = 0; j < arrValues.length; j++){
            const gridCell = document.createElement('div');
            gridCell.className+= "grid-cell";

            console.log(gameGrid)
            
            if((gameGrid[arrKeys[i]][j])?.status == 'alive'){
                
                gridCell.className+= " alive";
                gridRow.append(gridCell)
                console.log(gridCell)
                
            }else {
                gridCell.className+= " dead";
                gridRow.appendChild(gridCell)
                console.log(gridCell)
            }

        }
        gridContainer.append(gridRow)

    }
    rootDiv.append(gridContainer)

}


var intervalId;

function repeating() {
  intervalId = setInterval(()=>{
     console.log(initializeGame);
      liveOrDie();
      createGameGrid(initializeGame)}, 500)
}
function terminateRepeating(arg){
    const btnStart = document.getElementById('btnStart')
    btnStart.innerHTML = 'Play'
    if(arg == "reset"){
        console.clear()
        clearInterval(intervalId)
        return;
    }
  console.log("Stop clicked")  
  clearInterval(intervalId)
}

function clearGame(){
    terminateRepeating('reset')
    console.log("reset Clicked")
    location.reload();
}



//  function liveOrDie1(){
//         for(let x in initializeGame){
//             for (let i = 0; i < (initializeGame[x]).length; i++){
//                 console.log();
//                 if (((initializeGame[x][i]).status == "alive")){
//                     console.log("Living Cell")
//                 } else {
//                     console.log("Dead Cell")
//                 }
//             }
//         }
  
//     }
// liveOrDie1();

// 


function liveOrDie(){

let newGrid = deepCopy(initializeGame)
//console.log(newGrid)

// next time obj destruction is a better option here
let arrKeys = Object.keys(newGrid);
let arrValues = newGrid[arrKeys[0]]
//console.log(arrValues.length)
//console.log(initializeGame);

for (let i = 0; i < arrKeys.length; i++){
  for(let j = 0; j < arrValues.length; j++){
      if (((newGrid[arrKeys[i]][j]) != undefined) &&
          ((newGrid[arrKeys[i]][j]).status != undefined) &&
          ((newGrid[arrKeys[i]][j]).status == "alive")){
          function checkAround_Live() {
              let counter = 0;
              //checking the current array next column cell arr i, j+1
               if ((((newGrid[arrKeys[i]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array next column cell arr i+1, j+1    
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array next column cell arr i-1, j+1
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i-1]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array current column cell arr i-1, j
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j]).status == "alive") && 
                   ((initializeGame[arrKeys[i-1]][j]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array current column cell arr i+1, j
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array previous column cell arr i-1, j-1
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i-1]][j-1]).status != "dead")){
                   counter+=1;
                  }
              //checking the current array previous column cell arr i, j-1
              if ((((newGrid[arrKeys[i]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i]][j-1]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array previous column cell arr i+1, j+1
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j-1]).status != "dead")){
                   counter+=1;
                  }
                  // console.log(`There are/is ${counter} living cells around cell number ${newGrid[arrKeys[i]][j].cellnum}`);
                  //console.log(newGrid[arrKeys[i]][j].status)
              return counter;
              
          }
          function kill(){
              let decisionValue = checkAround_Live();
              //console.log(decisionValue);
              if (decisionValue < 2 || decisionValue > 3){
                  (newGrid[arrKeys[i]][j]).status = "dead";
                  return "This Cell Is Now "+ (newGrid[arrKeys[i]][j]).status;
              } else { return ''}
          }
         kill();
        // console.log(newGrid[arrKeys[i]][j]);

      }else{
          function checkAround_Dead() {
              let counter = 0;
              //checking the current array next column cell arr i, j+1
               if ((((newGrid[arrKeys[i]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array next column arr cell i+1, j+1 
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array next column cell arr i-1, j+1
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j+1]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j+1]).status == "alive") && 
                   ((newGrid[arrKeys[i-1]][j+1]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array current column cell arr i-1, j
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j]).status == "alive") && 
                   ((newGrid[arrKeys[i-1]][j]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array current column cell arr i+1, j
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j]).status != "dead")){
                   counter+=1;
                  }
              //checking the previous array previous column cell arr i-1, j-1
              if ((((newGrid[arrKeys[i-1]]) != undefined) &&
                   ((newGrid[arrKeys[i-1]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i-1]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i-1]][j-1]).status != "dead")){
                   counter+=1;
                  }
              //checking the current array previous column cell arr i, j-1
              if ((((newGrid[arrKeys[i]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i]][j-1]).status != "dead")){
                   counter+=1;
                  }
              //checking the next array previous column cell arr i+1, j+1
              if ((((newGrid[arrKeys[i+1]]) != undefined) && 
                   ((newGrid[arrKeys[i+1]][j-1]) != undefined) && 
                   (newGrid[arrKeys[i+1]][j-1]).status == "alive") && 
                   ((newGrid[arrKeys[i+1]][j-1]).status != "dead")){
                   counter+=1;
                  }
                  //console.log(`There are/is ${counter} dead cells around cell number ${newGrid[arrKeys[i]][j].cellnum}`);
                  //console.log(newGrid[arrKeys[i]][j].status)
              return counter;
              
          }
          function Revive(){
              let decisionValue = checkAround_Dead();
              //console.log(decisionValue);
              if ( decisionValue = 3){
                  (newGrid[arrKeys[i]][j]).status = "alive";
                  return "This Cell Is Now "+ (newGrid[arrKeys[i]][j]).status;
              }
              return "Thank's for your effort Inusa";
              
          }
         // console.log(newGrid[arrKeys[i]][j]);
         Revive();
      }
  }
}
return initializeGame = deepCopy(newGrid);
}

// helper function to make a deep copy of an object the game of life
function deepCopy(obj) {
  let copy;
  if (obj === null || typeof obj !== "object") {
      return obj;
  }
  if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
          copy[i] = deepCopy(obj[i]);
      }
      return copy;
  }
  if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
          if (obj.hasOwnProperty(attr)) {
              copy[attr] = deepCopy(obj[attr]);
          }
      }
      return copy;
  }
}