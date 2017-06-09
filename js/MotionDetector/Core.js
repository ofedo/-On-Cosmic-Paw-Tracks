/**
 *
 * @project        Motion Detection in JS
 * @file           ImageCompare.js
 * @description    Core functionality.
 * @author         Benjamin Horn
 * @package        MotionDetector
 * @version        -
 * 
 */

;(function(App) {

	"use strict";
	
	/*
	 * The core motion detector. Does all the work.
	 *
	 * @return <Object> The initalized object.
	 *
	 */
	App.Core = function() {

		var rendering = false;

        var optimize = 15;
		var width = 1024 / optimize;
		var height = 640 / optimize;

		var webCam = null;
		var imageCompare = null;

		var currentImage = null;
		var oldImage = null;

		var topLeft = [Infinity,Infinity];
		var bottomRight = [0,0];
        
        var diffPixels = [];

		var raf = (function(){
			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000/60);
			};
		})();

		/*
		 * Initializes the object.
		 *
		 * @return void.
		 *
		 */
		function initialize() {
			imageCompare = new App.ImageCompare();
			webCam = new App.WebCamCapture(document.getElementById('webCamWindow'));

			rendering = true;

			main();
		}

		/*
		 * Compares to images and updates the position
		 * of the motion div.
		 *
		 * @return void.
		 *
		 */
		function render() {
			oldImage = currentImage;
			currentImage = webCam.captureImage(false);

			if(!oldImage || !currentImage) {
				return;
			}

			var vals = imageCompare.compare(currentImage, oldImage, width, height);

			topLeft[0] = vals.topLeft[0] * optimize;
			topLeft[1] = vals.topLeft[1] * optimize;

			bottomRight[0] = vals.bottomRight[0] * optimize;
			bottomRight[1] = vals.bottomRight[1] * optimize;

			document.getElementById('movement').style.top = topLeft[1] + 'px';
			document.getElementById('movement').style.left = topLeft[0] + 'px';

			document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
			document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';
            
            checkForNext(topLeft[0] + (bottomRight[0] - topLeft[0]), topLeft[1] + (bottomRight[1] - topLeft[1]));
      
            if (vals.diffPixels != '') {
//                alert('length ' + vals.diffPixels.length);
                for (var i = 0; i < vals.diffPixels.length; i++) {
//                     alert(vals.diffPixels[i]);
                    if (vals.diffPixels[i] != undefined) {
//                        alert(vals.diffPixels[i][0]);
                        diffPixels[i] = [vals.diffPixels[i][0] * optimize + 125, vals.diffPixels[i][1] * optimize + 50, vals.diffPixels[i][2], vals.diffPixels[i][3]];
                    }
                }
            }
            drawPixels(diffPixels, webCam.captureImage(false));
            diffPixels = [];
            
			topLeft = [Infinity,Infinity];
			bottomRight = [0,0]

		}

		/*
		 * The main rendering loop.
		 *
		 * @return void.
		 *
		 */
		function main() {
			try{
				render();
			} catch(e) {
				console.log(e);
				return;
			}

			if(rendering == true) {
				raf(main.bind(this));
			}
		}

		initialize();
	};
})(MotionDetector);