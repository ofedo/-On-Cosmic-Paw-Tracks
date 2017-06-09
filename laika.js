function showRestart() {
    "use strict";
    document.getElementById('restart').style.visibility = "visible";
    document.getElementById('restart').style.webkitAnimationPlayState = "running";
    document.getElementById('restart').style.animationPlayState = "running";
}

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=file]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }

  previewFile();