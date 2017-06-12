function showRestart() {
    "use strict";
    document.getElementById('restart').style.visibility = "visible";
    document.getElementById('restart').style.webkitAnimationPlayState = "running";
    document.getElementById('restart').style.animationPlayState = "running";
}

var lightPercent = 0.0;
function lightUp() {
    lightPercent = lightPercent + 0.25;
    if (lightPercent > 1) {
        lightPercent = 0;
    }
    document.getElementById('webCamWindow').style.opacity = lightPercent;
}

docReady(function() {
  if (document.getElementById('webCamWindow')) {
    var core = new MotionDetector.Core();
  }
});
