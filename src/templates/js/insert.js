(function(global){
    var insertToolbar = function(b) {
        angular.element(document).ready(function() {
            var a = window.parent.document.createElement("div");
            a.setAttribute("id", "tlbstoolbar");
            a.setAttribute("ng-app", "toolbarCore");
            a.setAttribute("ng-controller", "coreController");
            a.setAttribute(b, "");
            a.setAttribute("tbparentisolator", "");
            a.setAttribute("tbresize", b);
            a.setAttribute("class", "tbholder");
            a.setAttribute("pvctrl", "");
            a.style.display = "block";
            avoidQQClear(a);
            var c = window.template_PropertyMap[b + "_propertyTable"]
              , c = c || {
                common: {
                    CSS: {}
                }
            };
            top.barresizetype = c.common.CSS.resizetype;
            //window.parent.document.body.appendChild(a);
            global.inject(a);
            angular.bootstrap(window.parent.document.getElementById("tlbstoolbar"), ["toolbarCore"]);
            angular.element(a).injector().get("commonService").imagePreloadService();
            for (key in top.tlbs.toolbarInitData)
                coreService.fireEvent(void 0, key, top.tlbs.toolbarInitData[key])
        });
        top.tlbs.toolbarclose = "show"
    }
      , avoidQQClear = function(b) {
        if (0 < top.window.location.href.indexOf("qq.com")) {
            var a = b.getAttribute;
            b.getAttribute = function(b) {
                return "id" ===
                b ? "wrapper" : a.apply(this, [b])
            }
        }
    }
    ;
    (function() {
        try {
            var b = void 0
              , a = 0
              , c = function() {
                !top.tlbs && 3E3 > a && (b && window.clearTimeout(b),
                a += 1,
                b = window.setTimeout(c, 100))
            }
            ;
            c();
            //insertToolbar(top.tlbs.templateID);
            insertToolbar('fullscreenbar');
            var d = window.setInterval(function() {
                if ("show" == top.tlbs.toolbarclose) {
                    var a = top.window.document.getElementById("tlbstoolbar")
                      , b = a.style.display;
                    if ("none" == b || "" == b)
                        a.style.display = "block"
                } else
                    "close" == top.tlbs.toolbarclose && (a = top.window.document.getElementById("tlbstoolbar"),
                    a.style.display = "none")
            }, 200);
            setTimeout(function() {
                d && window.clearInterval(d);
                "close" == top.tlbs.toolbarclose && (top.window.document.getElementById("tlbstoolbar").style.display = "none")
            }, 1E4)
        } catch (e) {}
    })(window);
})(__PI__);
