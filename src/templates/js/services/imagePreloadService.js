uiCore.service("imagePreloadService", ["imageLoadService", function(a) {
    this.processImagePreload = function(c) {
        (new a(c)).execute()
    }
}
]);
