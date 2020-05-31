let setCount = 0;

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
    setCount++;
    if (setCount % 2 === 1) {
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
    checkTie();
  } 
}

function checkWin() {
  if (setCount >= 5) {
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
    if (pattern.toString() === xArr.toString()) {
      window.alert("x win!");
    }
    if (pattern.toString() === oArr.toString()) {
      window.alert("o win!");
    }
  })
  }
}

function checkTie () {
  if (setCount === 9) {
    window.alert("Tie game!");
  }
}

