/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1; // active player: 1 or 2
 // array of rows, each row is array of cells  (board[y][x])
// let board = [];
let board = [];

class Game {
  constructor(p1, p2, HEIGHT, WIDTH){
    this.players = [p1, p2];
    this.HEIGHT = HEIGHT;
    this.WIDTH = WIDTH;
    this.currPlayer = p1;
    
    this.makeBoard();
    this.makeHtmlBoard();
    // this.findSpotForCol = findSpotForCol.bind(this)
   
  }
  /** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
  makeBoard() {
  this.board = [];
    for (let y = 0; y < this.HEIGHT; y++) {
      board.push(Array.from({ length: this.WIDTH }));
    }
  }

  
  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    //make a new variable that will be bound to "this"

    // this.handleGameClick = this.handleClick.bind(this);
    // top.addEventListener('click', this.handleGameClick);
    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener("click", this.handleGameClick);
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // make main part of board
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  // findSpotForCol(x) {
  //   for (let y = this.height - 1; y >= 0; y--) {
  //     if (!this.board[y][x]) {
  //       return y;
  //     }
  //   }
  //   return null;
  // }


  findSpotForCol = (x)=> {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }


    /** placeInTable: update DOM to place piece into HTML table of board */

    placeInTable(y, x) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.classList.add(`p${this.currPlayer}`);
      piece.style.top = -50 * (y + 2);
    
      const spot = document.getElementById(`${y}-${x}`);
      spot.append(piece);
    }
    /** endGame: announce game end */
    endGame(msg) {
      alert(msg);
    }

  /** handleClick: handle click of column top to play piece */
  handleClick= (evt) => {

    const x = +evt.target.id;
    console.log(x)
  

    
    const y = this.findSpotforCol(x);
    
    
    console.log(y);
    if (y === null) {
      return;
    }
 
  
    // place piece in board and add to HTML table
       // this.placeInCurrentTable = this.placeInTable.bind(this);
    this.board[y][x] = this.currPlayer;
    // this.placeInCurrentTable(y, x);
    this.placeInTable(y, x);

        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return endGame('Tie!');
        }
    
    // check for win

    // this.checkForWinCurrentBoard = this.checkForWin.bind(this);
    // this.endCurrentGame = this.endGame.bind(this);
    // if (this.checkForWinCurrentBoard()) {
    //   return this.endCurrentGame(`Player ${currPlayer} won!`);
    // }
    if (this.checkForWin()) {
      // this.gameOver = true;
      return this.endGame(`The ${this.currPlayer.color} player won!`);
    }
    
    

      
    // switch players
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }





/** checkForWin: check board cell-by-cell for "does a win start here?" */

checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.HEIGHT &&
        x >= 0 &&
        x < this.WIDTH &&
        this.board[y][x] === this.currPlayer
    );
  }

  for (let y = 0; y < this.HEIGHT; y++) {
    for (let x = 0; x < this.WIDTH; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

}

new Game(1, 2, 6, 7);




// checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < this.HEIGHT &&
//         x >= 0 &&
//         x < this.WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < this.HEIGHT; y++) {
//     for (let x = 0; x < this.WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

    // get x from ID of clicked cell
    // no need to declare .this.evt because you're getting x from evt target directly
    // get next spot in column (if none, ignore click)
    // this.findSpotforColor = this.findSpotForCol.bind(this);
    // need to declare this.findSpotforCol because that function has to refer to the new instance x
    // this.findSpotForCol = findSpotForCol.bind(this);








