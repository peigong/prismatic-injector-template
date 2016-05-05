uiCore.service("styleService", function() {
    var a = angular.element(top.top.document.createElement("style"))
      , c = window.angular.element(top.top.document).find("head");
    a.attr("type", "text/css");
    a.attr("id", "toolbarstyle");
    a.attr("title", "toolbar");
    a.append('@charset "UTF-8";');
    c.prepend(a);
    this.appendStyle = function(c, b, g) {
        a.append(c + b + g)
    }
});
