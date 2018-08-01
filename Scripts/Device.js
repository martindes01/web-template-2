// Immediately-invoked function expression - Device
(function () {
    // Private constants
    const cAttributeName_MouseClasses = "data-device-mouse-classes";
    const cAttributeName_TouchClasses = "data-device-touch-classes";
    const cDelimiter_MouseClasses = ' ';
    const cDelimiter_TouchClasses = ' ';
    const cTouchEvent_Check = "ontouchstart";

    // Replace all touch classes with corresponding mouse classes as necessary
    Device_Touch_ReplaceClass = function () {
        // Check that touch events are unavailable
        if (!(cTouchEvent_Check in document.documentElement)) {
            // Check for mouse classes attribute
            if (document.body.hasAttribute(cAttributeName_MouseClasses)) {
                // Retrieve names of mouse and touch classes
                var tMouseClasses = document.body.getAttribute(cAttributeName_MouseClasses).split(cDelimiter_MouseClasses);
                var tTouchClasses = document.body.getAttribute(cAttributeName_TouchClasses).split(cDelimiter_TouchClasses);
                var tTouchClasses_Length = tTouchClasses.length;
                // Replace all touch classes with corresponding mouse classes
                for (var i = 0; i < tTouchClasses_Length; i++) {
                    // Evaluate mouse class and touch class
                    var tMouseClass = tMouseClasses[i];
                    var tTouchClass = tTouchClasses[i];
                    // Get HTML elements with specified touch class
                    var tTouchElements = document.getElementsByClassName(tTouchClass);
                    var tTouchElements_Length = tTouchElements.length;
                    // Replace touch class with mouse class
                    for (var j = 0; j < tTouchElements_Length; j++) {
                        tTouchElements[j].classList.replace(tTouchClass, tMouseClass);
                    }
                }
            }
        }
    };
})(window);
