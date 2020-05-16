
document.getElementById("grid").addEventListener('click', yourMark);

function yourMark(event) {
  if (event.target.innerHTML === '') {
     event.target.innerHTML = "<img src = 'https://raw.githubusercontent.com/snkzt/noughts-and-crosses/master/assets/image/X.png' height = '50px' width = '50px'>";
   } else {
     event.target.innerHTML = '';
     }
    }
