uiCore.factory("httpService", ["$http", "cacheService", "coreService", "coreUtils", "$q", function(a, c, d, b, g) {
    var k = function(c, d) {
        this.httpInstent = a;
        this.actionChain = c;
        this.requestData = b.extendDeep({}, d || {});
        return this
    }
    ;
    k.prototype.execute = function() {
        var f = this.actionChain.on
          , k = this.actionChain.event || this.actionChain.on
          , l = this.actionChain.event || "";
        if (null  != this.actionChain && null  != this.actionChain.shared && this.actionChain.shared) {
            var e = c.getDataFromCache(f + "_data");
            if (null  != e) {
                d.fireEvent(k, "recvd", e);
                return
            }
        }
        null  != this.requestData.sfilter && 0 < this.requestData.sfilter.length && (this.requestData = b.extractData(this.requestData, this.requestData.sfilter));
        var h;
        if ("http" == f.substring(0, 4))
            e = f,
            -1 != f.lastIndexOf("/") && (f = f.substring(f.lastIndexOf("/") + 1),
            h = a.jsonp(e + "?callback=JSON_CALLBACK", {
                params: {
                    reqparam: this.requestData,
                    csession: top.tlbs.csession,
                    templateId: top.tlbs.templateID || ""
                }
            }));
        else {
            var r = this.actionChain;
            h = a.jsonp(top.tlbs.servicePath + f + "?callback=JSON_CALLBACK", {
                params: {
                    reqparam: this.requestData,
                    csession: top.tlbs.csession,
                    templateId: top.tlbs.templateID || ""
                }
            })
        }
        h.success(function(a, e, h) {
            if (null  != a && null  != a.respparam && 0 < Object.keys(a.respparam).length)
                if (c.updateDataToCache(f + "_status", 0),
                null  != r && null  != r.shared && c.updateDataToCache(f + "_data", a),
                a.respparam.notify && a.respparam.data)
                    for (singleNotification in a.respparam.data) {
                        var u = a.respparam.data[singleNotification];
                        e = d.getComponentScope("pvctrl");
                        null  != e && (h = g.defer(),
                        e.lloadApps({
                            applist: u.npageid || "",
                            taskId: u.taskId || "",
                            message: u.message ||
                            ""
                        }, h),
                        h.promise.then(function() {
                            d.fireEvent(singleNotification, "recvd", b.extendDeep(u, {
                                notifType: singleNotification
                            }))
                        }))
                    }
                else
                    null  != a.respparam.errorcode ? "1-FFF-1-FFF" == a.respparam.errorcode ? d.fireEvent(l + "pserrorevent", "recvd", a.respparam) : "1-FFF-1-FFE" == a.respparam.errorcode ? d.fireEvent(l + "pssuberrorevent", "recvd", a.respparam) : "1-FFF-1-AAA" == a.respparam.errorcode ? d.fireEvent(l + "sessionerror", "recvd", a.respparam) : d.fireEvent(l + "commonerror", "recvd", a.respparam) : d.fireEvent(k, "recvd", a);
            else
                c.updateDataToCache(f +
                "_status", 1),
                d.fireEvent(k + "nodata", "recvd", a),
                -1 == f.lastIndexOf("cdr") && d.fireEvent("fire", "recvd", a)
        });
        h.error(function(a, b, e) {
            c.updateDataToCache(f + "_status", 2);
            -1 == f.lastIndexOf("cdr") && d.fireEvent(l + "commonerror", "recvd", null )
        })
    }
    ;
    return k
}
]);
