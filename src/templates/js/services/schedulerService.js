uiCore.service("schedulerService", ["cacheService", "singleSchedulerService", function(a, c) {
    this.processSchedulerService = function(d, b) {
        if (null  != b.start)
            if ("1" == b.start) {
                var g = new c(d,b);
                null  != a.getDataFromCache(d.on) && a.getDataFromCache(d.on).stop();
                a.updateDataToCache(d.on, g);
                g.start()
            } else
                "0" == b.start ? this.stopSchedulerById(d.on) : "2" == b.start && this.resetSchedulerById(d.on)
    }
    ;
    this.stopSchedulerById = function(c) {
        var b = a.getDataFromCache(c);
        null  != b && (b.stop(),
        a.deleteDataFromCache(c))
    }
    ;
    this.resetSchedulerById =
    function(c) {
        c = a.getDataFromCache(c);
        null  != c && (c.stop(),
        c.start())
    }
}
]);
