var N_SIZE = 5,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "x",
  vuoro = "1",
  score,
  moves;

function init() {
  var board = document.createElement("table");
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);
  var identifier = 1;
  for (var i = 0; i < N_SIZE; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement("td");
      cell.classList.add("col" + j, "row" + i);
      if (i === j) {
        cell.classList.add("diagonal0");
      }
      if (j === N_SIZE - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}
/* Uusi peli */
function startNewGame() {
  score = {
    x: 0,
    o: 0
  };
  moves = 0;
  turn = "x";
  vuoro = "1";
  /* pelaaja 1 aloittaa aina pelin */
  document.getElementById("turn").textContent = "Player " + vuoro;
  boxes.forEach(function(square) {
    // ruutujen tyhejnnys
    square.innerHTML = EMPTY;
    // väri takaisin valkoiseksi / alkuperäiseksi
    square.style.backgroundColor = "";
  });
}

/* Voiton tarkistus */
function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    // voiton ehto: turn == N_SIZE
    if (items.length === N_SIZE) {
      return true;
    }
  }
  return false;
}

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function(element) {
    return RegExp(text).test(element.textContent);
  });
}

/* Paikan asetus ja vuoron vaihto */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  if (turn === "x") {
    this.style.backgroundColor = "rgb(124, 252, 0)";
  } else {
    this.style.backgroundColor = "rgb(250, 128, 114)";
  }
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert("Player " + vuoro + " won!");
    startNewGame();
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw!");
    startNewGame();
  } else {
    turn = turn === "x" ? "o" : "x";
    vuoro = vuoro === "1" ? "2" : "1";
    document.getElementById("turn").textContent = "Player " + vuoro;
  }
  move();
  //countdown();
}
//
function move() {
  var elem = document.getElementById("myBar");
  elem.style.width = moves * 4 + "%";
}

/*function countdown() {
  var timeLeft = 10;
  var elementti = document.getElementById("time");
  var timerId = setInterval(countdown, 1000);
  if (moves === 0) {
    elementti.innerHTML = timeLeft + "";
    timeLeft = 10;
  } 
  else { 
    elementti.innerHTML = timeLeft + "";
    timeLeft--;
    if (timeLeft <= 0) {
      clearTimeout(timerId);
      // pelaajan vaihto
      vuoro = vuoro === "1" ? "2" : "1";
      document.getElementById("turn").textContent = "Player " + vuoro;
    } else {
  
    }
  }
}*/

var timeleft = 10;
var downloadTimer = setInterval(function() {
  document.getElementById("countdown").innerHTML =
    timeleft + " seconds remaining";
  timeleft -= 1;
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
    //pelaajan vaihto
    //
    turn = turn === "x" ? "o" : "x";
    vuoro = vuoro === "1" ? "2" : "1";
    document.getElementById("turn").textContent = "Player " + vuoro;
    //
    //timeri alusta
  }
}, 1000);

init();
