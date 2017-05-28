var squares = document.getElementsByClassName("square");
var resetBtn = document.getElementById('reset');
var popup = document.getElementById("pop");
var gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var game = true;
var human = false;
var computer = true;
var hVal = -1;
var cVal = 1;
var hChar;
var cChar;
var currPlayer = human;
var possWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (var i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function(e) {
    take(e.target);
  });
}

function reset() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = "";
    gameState[i] = 0;
  }
  currPlayer = human;
  game = true;
  openDialog();
}

function take(clicked) {
  if (!game) return;
  for (var i = 0; i < squares.length; i++) {
    if (squares[i] === clicked && gameState[i] === 0) {
      set(i, currPlayer);
      aiturn(gameState, 0, currPlayer, true);
    }
  }
}

function set(index, player) {
  if (!game) return;
  if (gameState[index] === 0) {
    squares[index].innerHTML = player === human ? hChar : cChar;
    gameState[index] = player === human ? hVal : cVal;
    currPlayer = !currPlayer;
    aiturn(gameState, 0, currPlayer, false);
    if (isWin(gameState, player) || isTie(gameState)) {
      game = false;
      setTimeout(reset, 1000);
    }
  }
}

function isWin(board, player) {
  var value = player === human ? hVal : cVal;
  for (var i = 0; i < 8; i++) {
    var win = true;
    for (var j = 0; j < 3; j++) {
      if (board[possWins[i][j]] !== value) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function isTie(board) {
  for (var i = 0; i < squares.length; i++) {
    if (board[i] === 0) return false;
  }
  return true;
}

function aiturn(board, depth, player, turn) {
  if (isWin(board, !player)) {
    return -10 + depth;
  }
  if (isTie(board)) {
    return 0;
  }
  var value = player === human ? hVal : cVal;
  var max = -Infinity;
  var index = 0;
  for (var i = 0; i < squares.length; i++) {
    if (board[i] === 0) {
      var newboard = board.slice();
      newboard[i] = value;
      var moveval = -aiturn(newboard, depth + 1, !player, false);
      if (moveval > max) {
        max = moveval;
        index = i;
      }
    }
  }
  if (turn) {
    set(index, player)
  }
  return max;
}

function openDialog() {
  pop.style.display = 'flex';
}

var chooseX = document.getElementById("chooseX");
var chooseO = document.getElementById("chooseO");

chooseX.addEventListener('click', function(e) {
  hChar = 'X';
  cChar = 'O';
  popup.style.display = 'none';
});

chooseO.addEventListener('click', function(e) {
  hChar = 'O';
  cChar = 'X';
  popup.style.display = 'none';
});

resetBtn.addEventListener('click', function() {
  reset();
});

openDialog();