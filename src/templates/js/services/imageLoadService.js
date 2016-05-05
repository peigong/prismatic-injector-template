uiCore.service("imageLoadService", function() {
    var a = function(a) {
        this.downloadImageArray = a;
        return this
    }
    ;
    a.prototype.execute = function() {
        angular.forEach(this.downloadImageArray, function(a) {
            (new Image).src = a
        })
    }
    ;
    return a
});
