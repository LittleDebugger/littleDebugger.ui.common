littleDebugger.common.namespacer.createNamespace("littleDebugger.ui.common");

// Enter full screen mode and fill the screen with a specified element (canvas) when a control element is clicked.
// <elementToFillScreen> The element which will fill the screen.
// <controlElement> Element to attach click event to trigger the full screen.
// <enterFullScreenCallback> Callback function for when the fullscreen mode starts.
// <enterFullScreenCallback> Callback function for when the fullscreen mode ends.
littleDebugger.ui.common.screenFiller = function (
    elementToFillScreen,
    controlElement,
    enterFullScreenCallback,
    exitFullScreenCallback) {
    // Based on https://www.sitepoint.com/use-html5-full-screen-api/
    controlElement.onclick = function() {
        if (elementToFillScreen.requestFullscreen) {
            elementToFillScreen.requestFullscreen();
        } else if (elementToFillScreen.webkitRequestFullscreen) {
            elementToFillScreen.webkitRequestFullscreen();
        } else if (elementToFillScreen.mozRequestFullScreen) {
            elementToFillScreen.mozRequestFullScreen();
        } else if (elementToFillScreen.msRequestFullscreen) {
            elementToFillScreen.msRequestFullscreen();
        }

        if (typeof (enterFullScreenCallback) !== 'undefined') {
            enterFullScreenCallback();
        }
    };

    //  Based on answers from http://stackoverflow.com/questions/10706070/how-to-detect-when-a-page-exits-fullscreen
    if (typeof (exitFullScreenCallback) !== "undefined") {

        var changeHandler = function () {
            if (document.webkitIsFullScreen === false
                || document.mozFullScreen === false
                || document.msFullscreenElement === null) {
                exitFullScreenCallback();
            }
        };

        document.addEventListener("webkitfullscreenchange", changeHandler, false);
        document.addEventListener("mozfullscreenchange", changeHandler, false);
        document.addEventListener("fullscreenchange", changeHandler, false);
        document.addEventListener("MSFullscreenChange", changeHandler, false);
    }
};