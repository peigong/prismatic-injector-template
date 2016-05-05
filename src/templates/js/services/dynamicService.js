uiCore.service("dynamicService", ["cacheService", "singleSchedulerService", "$window", function(a, c, d) {
    this.processDynamicService = function(a, c) {
        if (null  != c && null  != c.serviceType)
            switch (c.serviceType) {
            case "urlservice":
                null  != c.openurl && d.open(c.openurl)
            }
    }
}
]);
