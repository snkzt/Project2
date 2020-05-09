document.getElementById("grid").addEventListener('click', sayHi);

function sayHi(event) {
  console.log(`hello world from the grid ${event.target.id}!`);
}
