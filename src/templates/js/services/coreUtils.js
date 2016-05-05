uiCore.service("coreUtils", ["$log", "$window", "ngLocalStorage", "$http", function(a, c, d, b) {
    var g = angular.isUndefined, k = angular.isNumber, f = angular.isObject, m = angular.isArray, l = angular.toJson, e = angular.fromJson, h;
    this.commonServiceRef = void 0;
    (function() {
        try {
            var a = "localStorage" in c && null  !== c.localStorage
              , b = "__" + Math.round(1E7 * Math.random());
            a && (h = c.localStorage,
            h.setItem(b, ""),
            h.removeItem(b));
            return a
        } catch (e) {
            return !1
        }
    })();
    this.formatNum = function(a, b) {
        var c = 1, e;
        for (i = 0; i < b; i++)
            c *= 10;
        e = Math.round(a * c);
        return e / c
    }
    ;
    this.trafficValueTransfer = function(a, b) {
        for (var c = ["KB", "MB", "GB", "TB"], e = 0; e < c.length; e++) {
            if (1024 > a)
                return {
                    v: this.formatNum(a, Number(b || 2)),
                    u: c[e]
                };
            a /= 1024
        }
        return {
            v: this.formatNum(a, Number(b || 2)),
            u: c[c.length - 1]
        }
    }
    ;
    this.trafficValueTransferfromKB = function(a, b) {
        for (var c = a / 1024, e = ["MB", "GB", "TB"], d = 0; d < e.length; d++) {
            if (1024 > c)
                return {
                    v: this.formatNum(c, Number(b || 2)),
                    u: e[d]
                };
            c /= 1024
        }
        return {
            v: this.formatNum(a, Number(b || 2)),
            u: e[e.length - 1]
        }
    }
    ;
    this.createCdrid = function(a, b, c) {
        var e = "";
        b && (e =
        b + "_");
        return a + "_" + e + c
    }
    ;
    this.sendRequest = function(a, c, e, d) {
        a = b.jsonp(top.tlbs.servicePath + a + "?callback=JSON_CALLBACK", {
            params: {
                reqparam: c,
                csession: top.tlbs.csession,
                templateId: top.tlbs.templateID || ""
            }
        });
        a.success(function(a, b, c) {
            e && "function" == typeof e && e(a, b, c)
        });
        a.error(function(a, b, c) {
            d && "function" == typeof d && d(a, b, c)
        })
    }
    ;
    this.writeLog = function(b, c) {
        if (b && c)
            switch (b) {
            case "debug":
                a.debug(c);
                break;
            case "log":
                a.log(c);
                break;
            case "info":
                a.info(c);
                break;
            case "warn":
                a.warn(c);
                break;
            case "error":
                a.error(c)
            }
    }
    ;
    this.getOrientation = function() {
        if (window.matchMedia("(orientation: portrait)").matches)
            return 0;
        if (window.matchMedia("(orientation: landscape)").matches)
            return 1
    }
    ;
    this.readFileContent = function(a) {
        var b = new FileReader
          , c = !1;
        b.onloaded = function() {
            c = !0
        }
        ;
        b.readAsText(a, "utf-8");
        var e = void 0
          , d = function() {
            c || (e && window.clearTimeout(e),
            e = window.setTimeout(d, 100))
        }
        ;
        d();
        return b.result
    }
    ;
    this.writeFileContent = function(a, b) {
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(window.PERSISTENT, 4194304, function(c) {
            c.root.getFile(a, {
                create: !0
            }, function(a) {
                a.createWriter(function(a) {
                    a.write(b)
                })
            })
        }, function(a) {
            writeLog("error", a.code)
        })
    }
    ;
    this.JSON2String = function(a) {
        return JSON.stringify(a, null , 4)
    }
    ;
    this.String2JSON = function(a) {
        var b = {};
        a && (b = JSON.parse(a));
        return b
    }
    ;
    var r = function() {
        return this
    }
    ;
    r.canWriteUITracingCDR = function(a) {
        var b = !1;
        null  != a && null  != a.uitracingcdr && a.uitracingcdr.enable && (b = !0);
        return b
    }
    ;
    r.canWriteUIDisplayCDR = function(a) {
        var b =
        !1;
        null  != a && null  != a.uidisplaycdr && a.uidisplaycdr.enable && (b = !0);
        return b
    }
    ;
    this.cdrUtils = r;
    this.cdrService = function(a, b) {
        null  != a && null  != b && null  != a.cdrType && (null  != a.storeData && a.storeData && (top.tlbs.cdrData = b),
        b.website = top.tlbs.referer || "",
        b.templateId = top.tlbs.templateID || "",
        b.firstAccess = top.tlbs.firstflag || "0",
        b.iseComp = b.iseComp || "0",
        null  != top.tlbs.cdrData && (b.epageId = top.tlbs.cdrData.pageId || ""),
        b.epageId = b.epageId || "",
        b.taskId = b.taskId || (null  == top.tlbs.notificationCdrData ? "" : top.tlbs.notificationCdrData.taskId) ||
        "",
        this.commonServiceRef.remoteService({
            on: a.cdrType,
            shared: !1,
            event: ""
        }, b))
    }
    ;
    this.getRemoteServiceStatus = function(a) {
        return this.commonServiceRef.getRemoteServiceStatus(a)
    }
    ;
    this.extendDeep = function(a) {
        var b = this;
        angular.forEach(arguments, function(c) {
            c !== a && angular.forEach(c, function(c, e) {
                a[e] && a[e].constructor && a[e].constructor === Object ? b.extendDeep(a[e], c) : a[e] = c
            })
        });
        return a
    }
    ;
    this.transfer = function(a, b) {
        try {
            var c = b;
            "string" == typeof b && (/^\[.*\]$/.test(b) || /^{.*}$/.test(b)) && (c = JSON.parse('{"a":' +
            c + "}").a);
            if (c instanceof Array) {
                for (var e = [], d = 0; d < c.length; d++)
                    e.push(this.transfer(a, c[d]));
                return e
            }
            if ("object" == typeof c) {
                e = {};
                for (p in c)
                    e[p] = this.transfer(a, c[p]),
                    void 0 == e[p] && delete e[p];
                return e
            }
            if ("string" == typeof c) {
                for (var f = c.split("."), c = a, d = 0; d < f.length; d++)
                    c = c[f[d]];
                return c
            }
        } catch (h) {}
    }
    ;
    this.extractData = function(a, b) {
        for (var c = {}, e = b.split(","), d = 0; d < e.length; d++) {
            var f = e[d].split(".")
              , h = a[f[0]];
            if (null  != h) {
                for (var l = 1; l < f.length; l++)
                    h = h[f[l]];
                null  != h && (c[f[f.length - 1]] = h)
            }
        }
        return c
    }
    ;
    this.addToLocalStorage = function(a, b) {
        if (isLocalStorageSupported) {
            if (g(b))
                b = null ;
            else if (f(b) || m(b) || k(+b || b))
                b = l(b);
            try {
                if (f(b) || m(b))
                    b = l(b);
                d.setItem(a, b)
            } catch (c) {
                return !1
            }
            return !0
        }
        return !1
    }
    ;
    this.getFromLocalStorage = function(a) {
        isLocalStorageSupported && d.getItem(a).then(function(a) {
            return (a = a.value) && "null" !== a ? "{" === a.charAt(0) || "[" === a.charAt(0) ? e(a) : a : null
        });
        return null
    }
    ;
    this.removeFromLocalStorage = function(a) {
        if (isLocalStorageSupported) {
            try {
                d.removeItem(a)
            } catch (b) {
                return !1
            }
            return !0
        }
        return !1
    }
}
]);
