const cells = document.querySelectorAll(".cell");
greetClick();

function greetClick () {
  for (var i= 0; i < cells.length; i++) {
    cells[i].addEventListener('click', sayHi);
  }
}

function sayHi() {
  console.log('hello world!');
}

