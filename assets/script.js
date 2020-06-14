let countTurn= 0;
let countXwin = 0;
let countOwin = 0;
let countWin = 0;
let countTie = 0;

const winPattern = [
  [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
] 

document.getElementById("grid").addEventListener('click', turn);

function turn(event) {
  if (event.target.childNodes.length === 0) {
    countTurn++;
    if (countTurn% 2 === 1) {
      const x = document.createElement("IMG");
      x.setAttribute("class","x");
      x.setAttribute("src","image/X.png");
      event.target.appendChild(x);
    } else {
      const o = document.createElement("IMG");
      o.setAttribute("class","o");
      o.setAttribute("src","image/O.png");
      event.target.appendChild(o);
    }
    checkWin();
  } 
  if (countWin === 0) {
    checkTie();
  }
}

function checkWin() {
  if (countTurn> 4) {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const xArr = [];
    const oArr = [];

  cells.forEach(function(element){ 
    if (element.childNodes.length === 1) {
      element.childNodes.forEach (function (eachNode) {
        if (eachNode.className === "x") { 
          xArr.push(element.id);
        } else {
          if (eachNode.className === "o") {
            oArr.push(element.id);    
          }
        }
      })
    }
  })
  winPattern.forEach(function(pattern) {
    let win = pattern.toString();
    let x = xArr.toString();
    let o = oArr.toString();
    let xYes = 0;
    let oYes = 0;

    for (i = 0; i < win.length; i++) {
      if (x.includes(win[i]) === true) {
        xYes++
      } 
      if (o.includes(win[i]) === true) {
        oYes++
      }
      if (xYes >= 5) {
        window.alert("X win!");
        countXwin++;
        countWin++
        scoreUpdate();
        askContinue();
      } else {
        if (oYes >= 5) {
          window.alert("O win!");
          countOwin++;
          countWin++
          scoreUpdate();
          askContinue();
        }
      }
    }
  })
  }
}

function checkTie () {
  if (countTurn === 9) {
      window.alert("Tie game!");
      countTie++;
      scoreUpdate();
      askContinue();
  }
}

function scoreUpdate () {
  document.getElementById("countX").innerText = countXwin;
  document.getElementById("countO").innerText = countOwin;
  document.getElementById("tie").innerText = countTie;
}

function askContinue() {
  document.querySelector(".dialogue").style.visibility = "visible";
  document.querySelector(".dialogue").addEventListener('click', checkContinue);
}

//check continue after a game over -> yes: clear all cells but scoreboard, No: reload the page
function checkContinue(event) {
  if (event.target.id === "primary") {
    document.querySelector(".dialogue").style.visibility = "hidden";
    countTurn = 0;
    countWin = 0;
    let xs = Array.from(document.querySelectorAll(".x"));
    let os = Array.from(document.querySelectorAll(".o"));
    xs.forEach (xElement => xElement.remove());
    os.forEach (oElement => oElement.remove());
  } else {
    if (event.target.id === "secondary") {
      document.location.reload();
      document.querySelector(".dialogue").style.visibility = "hidden";
    }
  }  
}

//check continue during a game -> yes: keep the status as is, No: reload the page
document.querySelector(".reload").addEventListener('click', showDialogue);

function showDialogue() {
  document.querySelector(".dialogue").style.visibility = "visible";
  document.querySelector(".dialogue").addEventListener('click', checkRefresh);
}

function checkRefresh(event) {
  if (event.target.id === "secondary") {
    document.location.reload();
    document.querySelector(".dialogue").style.visibility = "hidden";
  } else {
    if (event.target.id === "primary") {
      document.querySelector(".dialogue").style.visibility = "hidden";
    }
  }  
}
