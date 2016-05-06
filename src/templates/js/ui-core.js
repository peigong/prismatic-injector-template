var uiCore =  angular.module("toolbarCore", ["ngTouch"]);

top.tlbs.referer = top.window.location ? top.window.location.hostname + (top.window.location.port ? ":" + top.window.location.port : "") : "";
top.tlbs.transitionendEvent = "transitionend";
top.tlbs.preloadList = [];

void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend && (top.tlbs.transitionendEvent = "webkitTransitionEnd transitionend");
