
document.getElementById("grid").addEventListener('click', yourMark);

function yourMark(event) {
  if (event.target.innerText === '') {
     event.target.innerText = "O";
   } else {
     event.target.innerText = '';
     }
    }