uiCore.service("Const", function() {
    var a = /window/ig.test(top.window.navigator.userAgent);
    this.touchEvent = {
        start: "ontouchstart" in document && !a ? "touchstart" : "mousedown",
        move: "ontouchmove" in document && !a ? "touchmove" : "mousemove",
        end: "ontouchend" in document && !a ? "touchend" : "mouseup"
    }
});
