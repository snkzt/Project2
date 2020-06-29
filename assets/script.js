let countTurn= 0;
let countXwin = 0;
let countOwin = 0;
let countWin = 0;
let countTie = 0;
let countX = 0;
let countY = 0;
// let xYes = 0;
// let oYes = 0;

const cells = Array.from(document.querySelectorAll(".cell"));
const xArr = [];
const oArr = [];
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
    if (countTurn % 2 === 1) {
      const x = document.createElement("IMG");
      x.setAttribute("class", "x");
      x.setAttribute("src", "image/X.png");
      event.target.appendChild(x);
    } else {
      const o = document.createElement("IMG");
      o.setAttribute("class", "o");
      o.setAttribute("src", "image/O.png");
      event.target.appendChild(o);
    }
    checkWin();
  } 
  if (countWin === 0) {
    checkTie();
  }
}

function checkWin() {
  if (countTurn > 4) {
    makeArr();
    console.log(xArr,"xArr")
    console.log(oArr,"oArr")
    winPattern.forEach(function(pattern) {
      console.log(pattern,"pattern")
      for (i = 0; i < pattern.length; i++) {
        for (j = 0; j < xArr.length; j++) {
          if (pattern[i] == xArr[j]) {
            console.log(pattern[i])
            console.log(xArr[j],"xArr")
            countX++
            console.log(countX,"countX")
          } else if (pattern[i] == oArr[j]) {
            console.log(oArr[j],"oArr")
            countO++
          }
          if (countX === 3) {
            xWin();
          } else if (countO === 3) {
            oWin();
          }
        }
      }
      countX = 0;
      countO = 0;
    })
  }
}

function xWin() {
  judgeX();
  countXwin++;
  countWin++;
  scoreUpdate();
  askContinue();
}

function oWin() {
  judgeO();
  countOwin++;
  countWin++;
  scoreUpdate();
  askContinue();
}


function checkTie() {
  if (countTurn === 9) {
    judgeTie();
    countTie++;
    scoreUpdate();
    askContinue();
  }
}

function makeArr() {
  cells.forEach(function(element){ 
    if (element.childNodes.length === 1) {
      element.childNodes.forEach (function (eachNode) {
        if (eachNode.className === "x") { 
          xArr.push(element.id);
        } else if (eachNode.className === "o") {
            oArr.push(element.id);    
        }
      })
    }
  })
}

function judgeX() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeX = document.createElement("P");
  const textnodeX = document.createTextNode("X win!");
  nodeX.appendChild(textnodeX);
  document.getElementById("verdict").appendChild(nodeX);
}

function judgeO() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeO = document.createElement("P");
  const textnodeO = document.createTextNode("O win!");
  nodeO.appendChild(textnodeO);
  document.getElementById("verdict").appendChild(nodeO);
}

function judgeTie() {
  document.querySelector(".judge").style.visibility = "visible";
  const nodeT = document.createElement("P");
  const textnodeT = document.createTextNode("Tie game!");
  nodeT.appendChild(textnodeT);
  document.getElementById("verdict").appendChild(nodeT);
}

function scoreUpdate() {
  document.getElementById("countX").innerText = countXwin;
  document.getElementById("countO").innerText = countOwin;
  document.getElementById("tie").innerText = countTie;
}

function askContinue() {
  document.querySelector(".judge").addEventListener('click', checkContinue);
}

//check continue after a game over -> yes: clear all cells but scoreboard, No: reload the page
function checkContinue(event) {
  if (event.target.id === "first") {
    document.querySelector(".judge").style.visibility = "hidden";
    countTurn = 0;
    const xs = Array.from(document.querySelectorAll(".x"));
    const os = Array.from(document.querySelectorAll(".o"));
    xs.forEach (xElement => xElement.remove());
    os.forEach (oElement => oElement.remove());
    document.getElementById("verdict").querySelector("P").remove();
  } else if (event.target.id === "second") {
    document.location.reload();
    document.querySelector(".judge").style.visibility = "hidden";
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
  } else if (event.target.id === "primary") {
    document.querySelector(".dialogue").style.visibility = "hidden";
  }  
}


// //check continue after a game over -> yes: clear all cells but scoreboard, No: reload the page
// function checkContinue(event) {
//   if (event.target.id === "primary") {
//     document.querySelector(".dialogue").style.visibility = "hidden";
//     countTurn = 0;
//     const xs = Array.from(document.querySelectorAll(".x"));
//     const os = Array.from(document.querySelectorAll(".o"));
//     xs.forEach (xElement => xElement.remove());
//     os.forEach (oElement => oElement.remove());
//   } else if (event.target.id === "secondary") {
//     document.location.reload();
//     document.querySelector(".dialogue").style.visibility = "hidden";
//   }  
// }