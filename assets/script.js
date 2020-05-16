
document.getElementById("grid").addEventListener('click', yourMark);

var img = document.createElement("IMG");
img.setAttribute("src", "https://raw.githubusercontent.com/snkzt/noughts-and-crosses/master/assets/image/X.png");
img.setAttribute("height", "50px");
img.setAttribute("width", "50px");
img.setAttribute("alt", "X");

function yourMark(event) {
  if (event.target !== img) {
     event.target.appendChild(img);
   } else {
     event.target.remove(img);
     event.target.innerText = '';
     }
    }

