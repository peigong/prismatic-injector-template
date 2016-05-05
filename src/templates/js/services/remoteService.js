uiCore.service("remoteService", ["httpService", "cacheService", function(a, c) {
    this.processRemoteService = function(c, b) {
        (new a(c,b)).execute()
    }
    ;
    this.getRemoteServiceStatus = function(a) {
        return c.getDataFromCache(a + "_status") || 0
    }
}
]);
