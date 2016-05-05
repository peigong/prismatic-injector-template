uiCore.service("singleSchedulerService", ["$interval", "coreService", "coreUtils", function(a, c, d) {
    var b = function(b, c) {
        this.intervalInstent = a;
        this.actionChain = b;
        this.scheduleConfig = d.extendDeep({}, c)
    }
    ;
    b.prototype.start = function() {
        var b = this;
        this.localInterval = a(function() {
            b.fireEvent()
        }, this.scheduleConfig.interval, b.scheduleConfig.cycle)
    }
    ;
    b.prototype.fireEvent = function() {
        c.fireEvent(this.actionChain.on, "recvd", this.scheduleConfig)
    }
    ;
    b.prototype.stop = function() {
        this.intervalInstent.cancel(this.localInterval)
    }
    ;
    return b
}
]);
