uiCore.service("eventService", ["$q", "coreUtils", function(a, c) {
    var d = void 0
      , b = function(a) {
        d = a
    }
    ;
    b.prototype.executeChain = function(b, k) {
        if (b) {
            var f = this
              , m = b.type
              , l = b.on;
            if (l) {
                k || (k = {});
                "string" == typeof k && (k = c.String2JSON(k));
                -1 != l.indexOf("_") && (l = l.split("_")[1]);
                if (b.input)
                    for (singleInput in "string" == typeof b.input && (b.input = c.String2JSON(b.input)),
                    b.input)
                        if (null  != b.input[singleInput] && -1 != b.input[singleInput].indexOf("_")) {
                            var e = b.input[singleInput].split("_")
                              , h = d.getComponentScope(e[0]);
                            k[singleInput] =
                            h ? h.$eval("compData.JS." + e[1]) : b.input[singleInput]
                        } else
                            k[singleInput] = b.input[singleInput];
                switch (m) {
                case "async":
                    l && b.event && ((h = d.getComponentScope(l)) && h.$broadcast(l + "_handleEvent", b.event, k, null ),
                    null  != b.nextaction && f.executeChain(b.nextaction, k));
                    break;
                case "sync":
                    l && b.event && ((h = d.getComponentScope(l)) ? function() {
                        var c = a.defer();
                        h.$broadcast(l + "_handleEvent", b.event, k, c);
                        return c.promise
                    }().then(function(a) {
                        null  != b.nextaction && f.executeChain(b.nextaction, k)
                    }) : null  != b.nextaction && f.executeChain(b.nextaction,
                    k));
                    break;
                case "remote_svc":
                    d.commonServiceRef.remoteService(b, k);
                    null  != b.nextaction && f.executeChain(b.nextaction, k);
                    break;
                case "dynamic_svc":
                    d.commonServiceRef.dynamicService(b, k);
                    null  != b.nextaction && f.executeChain(b.nextaction, k);
                    break;
                case "timer":
                    d.commonServiceRef.schedulerService(b, k),
                    null  != b.nextaction && f.executeChain(b.nextaction, k)
                }
            }
        }
    }
    ;
    return b
}
]);
