uiCore.service("ngLocalStorage", ["$q", "$rootScope", function(a, c) {
    function d(b) {
        var d = Array.prototype.slice.call(arguments, 1);
        if (!ngLocalStorage.wasInit())
            throw "You must init ngLocalStorage in app config before use";
        return g.promise.then(function() {
            var l = a.defer();
            ngLocalStorage[b].apply(this, d.concat(function(a) {
                c.$apply(function() {
                    l.resolve(a)
                })
            }));
            return l.promise
        })
    }
    window.XdUtils = window.XdUtils || function() {
        return {
            extend: function(a, b) {
                var c = b || {}, e;
                for (e in a)
                    a.hasOwnProperty(e) && (c[e] = a[e]);
                return c
            }
        }
    }();
    window.ngLocalStorage = window.ngLocalStorage || function() {
        function a(b) {
            var c;
            try {
                c = JSON.parse(b.data)
            } catch (e) {}
            c && "cross-domain-local-message" === c.namespace && ("iframe-ready" === c.id ? (u = !0,
            d.initCallback()) : (b = c,
            q[b.id] && (q[b.id](b),
            delete q[b.id])))
        }
        function b(a, c, e, d) {
            g++;
            q[g] = d;
            k.contentWindow.postMessage(JSON.stringify({
                namespace: "cross-domain-local-message",
                id: g,
                action: a,
                key: c,
                value: e
            }), "*")
        }
        function c(b) {
            d = XdUtils.extend(b, d);
            b = document.createElement("div");
            window.addEventListener ? window.addEventListener("message",
            a, !1) : window.attachEvent("onmessage", a);
            b.innerHTML = '<iframe id="' + d.iframeId + '" src=' + d.iframeUrl + ' style="display: none;"></iframe>';
            document.body.appendChild(b);
            k = document.getElementById(d.iframeId)
        }
        function e() {
            return w ? u ? !0 : (console.log("You must wait for iframe ready message before using the api."),
            !1) : (console.log("You must call ngLocalStorage.init() before using it."),
            !1)
        }
        var d = {
            iframeId: "cross-domain-iframe",
            iframeUrl: void 0,
            initCallback: function() {}
        }, g = -1, k, q = {}, w = !1, u = !0;
        return {
            init: function(a) {
                if (!a.iframeUrl)
                    throw "You must specify iframeUrl";
                w ? console.log("ngLocalStorage was already initialized!") : (w = !0,
                "complete" === document.readyState ? c(a) : window.onload = function() {
                    c(a)
                }
                )
            },
            setItem: function(a, c, d) {
                e() && b("set", a, c, d)
            },
            getItem: function(a, c) {
                e() && b("get", a, null , c)
            },
            removeItem: function(a, c) {
                e() && b("remove", a, null , c)
            },
            key: function(a, c) {
                e() && b("key", a, null , c)
            },
            clear: function(a) {
                e() && b("clear", null , null , a)
            },
            wasInit: function() {
                return w
            }
        }
    }();
    var b = !1
      , g = a.defer()
      , k = c.$watch(function() {
        return b
    }, function() {
        g.resolve(!0);
        k()
    });
    return {
        init: function(d) {
            var g =
            a.defer();
            d.initCallback = function() {
                c.$apply(function() {
                    b = !0;
                    g.resolve()
                })
            }
            ;
            ngLocalStorage.init(d);
            return g.promise
        },
        setItem: function(a, b) {
            return d("setItem", a, b)
        },
        getItem: function(a) {
            return d("getItem", a)
        },
        removeItem: function(a) {
            return d("removeItem", a)
        },
        key: function(a) {
            return d("key", a)
        },
        clear: function() {
            return d("clear")
        },
        supported: function() {
            return supported
        }
    }
}
]);
