// Immediately-invoked function expression - Events
(function () {
    // Private constants - Events
    cTouchMove_ThresholdX = 10;
    cTouchMove_ThresholdY = 10;

    // Private variables - Events
    vTouchMove = false;
    vTouchStart_X = 0;
    vTouchStart_Y = 0;

    // Detect whether device is iPad (note that userAgent string can be altered by user or browser)
    if (/iPad/.test(navigator.userAgent)) {
        // Listen for touch events
        window.addEventListener("touchstart", Events_Touch_Handle, true);
        window.addEventListener("touchmove", Events_Touch_Handle, true);
        window.addEventListener("touchend", Events_Touch_Handle, true);
        window.addEventListener("touchcancel", Events_Touch_Handle, true);
    }

    // Dispatch specified event
    function Events_Dispatch(Type, EventName, ScreenX, ScreenY, ClientX, ClientY) {
        // Initialise event
        var tEvent = document.createEvent(Type);
        tEvent.initMouseEvent(EventName, true, true, window, 1, ScreenX, ScreenY, ClientX, ClientY, false, false, false, false, 0, null);
        // Dispatch event
        tTouch.target.dispatchEvent(tEvent);
    }

    // Synchronise touch events and dispatch replacement mouse events as necessary
    function Events_Touch_Handle(event) {
        var tTouch = event.changedTouches[0];
        // Handle touch event
        switch (event.type) {
            case "touchstart":
                // Prevent default touchstart
                event.preventDefault();
                // Store location of event
                vTouchStart_X = tTouch.clientX;
                vTouchStart_Y = tTouch.clientY;
                break;
            case "touchmove":
                // Dispatch touchstart before first in series of touchmoves
                if (!vTouchMove) {
                    // Check touchmove is larger than threshold
                    if (Math.abs(tTouch.clientX - vTouchStart_X) > cTouchMove_ThresholdX || Math.abs(tTouch.clientY - vTouchStart_Y) > cTouchMove_ThresholdY) {
                        // Dispatch touchstart
                        Events_Dispatch("TouchEvent", "touchstart", tTouch.screenX, tTouch.screenY, tTouch.clientX, tTouch.clientY);
                        vTouchMove = true;
                    } else {
                        // Prevent default touchmove
                        event.preventDefault();
                    }
                }
                break;
            case "touchend":
                // Dispatch click instead of default touchend if no touchmove detected
                if (!vTouchMove) {
                    event.preventDefault();
                    Events_Dispatch("MouseEvent", "click", tTouch.screenX, tTouch.screenY, tTouch.clientX, tTouch.clientY);
                }
                // Reset touch event variables
                Events_Touch_Reset();
                break;
            default:
                // Reset touch event variables
                Events_Touch_Reset();
                return;
        }
    }

    function Events_Touch_Reset() {
        vTouchMove = false;
        vTouchStart_X = 0;
        vTouchStart_Y = 0;
    }
})();
