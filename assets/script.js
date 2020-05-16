
document.getElementById("grid").addEventListener('click', yourMark);

var img = document.createElement("IMG");
img.setAttribute("src","image/X.png");

function yourMark(event) {
  if (event.target !== img) {
     event.target.appendChild(img);
   } else {
     event.target.remove(img);
     event.target.innerText = '';
     }
    }

