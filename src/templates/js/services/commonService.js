uiCore.service("commonService", ["remoteService", "schedulerService", "dynamicService", "imagePreloadService", "styleService", function(a, c, d, b, g) {
    this.remoteService = function(b, c) {
        a.processRemoteService(b, c)
    }
    ;
    this.getRemoteServiceStatus = function(b) {
        return a.getRemoteServiceStatus(b)
    }
    ;
    this.schedulerService = function(a, b) {
        c.processSchedulerService(a, b)
    }
    ;
    this.dynamicService = function(a, b) {
        d.processDynamicService(a, b)
    }
    ;
    this.imagePreloadService = function() {
        null  != top.tlbs.preloadList && 0 < top.tlbs.preloadList.length &&
        b.processImagePreload(top.tlbs.preloadList)
    }
    ;
    this.appendStyle = function(a, b, c) {
        g.appendStyle(a, b, c)
    }
}
]);
