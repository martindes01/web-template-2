// Global variables - Events
gvTouch = false;

// Immediately-invoked function expression - Events
(function () {
    window.ontouchstart = function () {
        gvTouch = true;
    };
})();
