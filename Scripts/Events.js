// Immediately-invoked function expression - Events
(function () {
    // Detect whether device runs iOS (note that userAgent string can be altered by user or browser)
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        // Listen for touch events
        window.addEventListener("touchend", Events_Handler_Touch, true);
        window.addEventListener("touchmove", Events_Handler_Touch, true);
        window.addEventListener("touchstart", Events_Handler_Touch, true);
        // Cancel the touch event and dispatch relevant mouse event instead
        function Events_Handler_Touch(event) {
            var tMouseEventName;
            var tTouch = event.changedTouches[0];
            // Select relevant mouse event
            switch (event.type) {
                case "touchend":
                    tMouseEventName = "mouseup";
                    break;
                case "touchmove":
                    tMouseEventName = "mousemove";
                    break;
                case "touchstart":
                    tMouseEventName = "mousedown";
                    break;
                default: return;
            }
            // Initialise and dispatch mouse event
            var tMouseEvent = document.createEvent("MouseEvent");
            tMouseEvent.initMouseEvent(tMouseEventName, true, true, window, 1, tTouch.screenX, tTouch.screenY, tTouch.clientX, tTouch.clientY, false, false, false, false, 0, null);
            tTouch.target.dispatchEvent(tMouseEvent);
            // Cancel original touch event
            event.preventDefault();
        }
    }
})();
