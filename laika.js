function showRestart() {
    "use strict";
    document.getElementById('restart').style.visibility = "visible";
    document.getElementById('restart').style.webkitAnimationPlayState = "running";
    document.getElementById('restart').style.animationPlayState = "running";
}

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var reader  = new FileReader();
       reader.onloadend = function () {
           preview.src = reader.result;
       }
       preview.src = "";
  }

  previewFile();
