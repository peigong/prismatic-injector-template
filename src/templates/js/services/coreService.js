uiCore.service("coreService", ["eventService", "coreUtils", function(a, c) {
    this.commonServiceRef = void 0;
    var d = this
      , b = {};
    this.getInitObject = function(a) {
        return "undefined" == typeof window.toolbarInitData ? void 0 : window.toolbarInitData[a]
    }
    ;
    this.registerComponentInstance = function(a, c) {
        "undefined" != typeof a && "undefined" != typeof c && (b[a] = c)
    }
    ;
    this.getComponentScope = function(a) {
        return "undefined" == typeof a ? void 0 : b[a]
    }
    ;
    this.getInitProperties = function(a) {
        if ("undefined" == typeof a || "undefined" == typeof b[a])
            return {};
        var d = {}
          , g = {}
          , l = {}
          , e = b[a]
          , h = window.template_PropertyMap[top.tlbs.templateID + "_propertyTable"]
          , r = window.page_PropertyMap[e.pageID + "_propertyTable"];
        if (h) {
            var t = h[e.componentType] || {}
              , e = t.CSS || {}
              , t = t.JS || {};
            c.extendDeep(g, (h.common || {}).CSS || {});
            c.extendDeep(g, e);
            c.extendDeep(l, t)
        }
        r && r[a] && (a = r[a],
        h = a.JS,
        c.extendDeep(g, a.CSS),
        c.extendDeep(l, h));
        d.JS = l;
        d.CSS = g;
        return d
    }
    ;
    var g = function(b, c, g) {
        c && b && (b = c[b]) && (new a(d)).executeChain(b, g)
    }
    ;
    this.executeAppLink = function(b, c) {
        b && (new a(d)).executeChain(b,
        c)
    }
    ;
    this.fireEvent = function(a, c, d) {
        if ("undefined" == typeof a)
            for (key in a = "globalInit_" + c,
            window.page_EventMap)
                g(a, window.page_EventMap[key], d);
        else {
            var l = b[a];
            if (l)
                l = window.page_EventMap[l.pageID + "_eventChain"],
                g(a + "_" + c, l, d);
            else
                for (key in a = a + "_" + c,
                window.page_EventMap)
                    null  != d && null  != d.npageid ? key.substring(0, d.npageid.length) == d.npageid && g(a, window.page_EventMap[key], d) : g(a, window.page_EventMap[key], d)
        }
    }
    ;
    this.getCookieValuebyName = function(a) {
        for (var b = "", d = {}, l = document.cookie.split(";"), e = 0; e <
        l.length; e++)
            "toolbarcookiedata" == l[e].split("=")[0].trim() && (d = c.String2JSON(l[e].split("=")[1]));
        d[a.split(".")[0]] && (b = d[a.split(".")[0]][a.split(".")[1]]);
        return b
    }
    ;
    this.setCookieValuebyName = function(a, b) {
        for (var d = {}, l = document.cookie.split(";"), e = 0; e < l.length; e++)
            "toolbarcookiedata" == l[e].split("=")[0].trim() && (d = c.String2JSON(l[e].split("=")[1]));
        l = a.split(".");
        d[l[0]] || (d[l[0]] = {});
        d[l[0]][l[1]] = b;
        document.cookie = "toolbarcookiedata=" + JSON.stringify(d) + ";"
    }
}
]);
