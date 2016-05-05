uiCore.factory("$templateCache", ["$cacheFactory", "$injector", function(a, c) {
    var d = a("templates");
    return {
        get: function(a) {
            var g = d.get(a);
            g || (c.get("$compile")(top.tlbs.templateData + '<script id="empty" type="text/ng-template"><div></div>\x3c/script>'),
            g = d.get(a));
            return g
        },
        remove: function(a) {},
        put: function(a, c) {
            d.put(a, c)
        }
    }
}
]);
