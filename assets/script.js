var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// document = an intetface which represents a file or a page showed on the browser 
// querySelectorAll() = a method returns NodeList of given CSS selectors - class(.) cell here-.
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
  if (typeof origBoard [square.target.id] == 'number') {
    turn(square.target.id, huPlayer)
    if (!checkTie()) turn (bestSpot(), aiPlayer);
  }

}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
}

// Array.prototype.reduce(), ? = ternary operator
// reduce method is going through every element of the board array, do smt, return a single value.
// a = accumulator, if e, elements in the board array, not equals to the player, accumulator will be as it is initialised with an empty array. 
// if e===player, index will be added to a.
//22:00 - 27:00 https://youtu.be/P2TcQ3h0ipQ
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

// looping only for index of wincombo
// 27:00 - 30:30 https://youtu.be/P2TcQ3h0ipQ
function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player == huPlayer ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return origNoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner ("Tie Game!")
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, player)) {
    return {score: -10};
  } else if (checkWin(newBoard, aiPlayer)) {
    return {score: 10};
  } else if (availSpots.length === 0) {
    return {score: 0};
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.socre = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.socre = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  var bestMove;
  if(player === aiPlayer) {
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++) {
      if (move[i].score > bestScore) {
      bestScore = moves[i].score;
      bestMove = i;
    }
  }
} else {
  var bestScore = 10000;
  for(var i = 0; i < moves.length; i++) {
    if (move[i].score < bestScore) {
      bestScore = moves[i].score;
      bestMove = i;
    }
  }
}

  return moves[bestMove];
}