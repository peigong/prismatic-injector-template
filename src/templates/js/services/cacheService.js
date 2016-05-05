uiCore.service("cacheService", function() {
    this.cacheData = {};
    this.getDataFromCache = function(a) {
        return this.cacheData[a]
    }
    ;
    this.updateDataToCache = function(a, c) {
        this.cacheData[a] = c
    }
    ;
    this.deleteDataFromCache = function(a) {
        delete this.cacheData[a]
    }
});
