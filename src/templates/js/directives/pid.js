uiCore.directive('pid', function() {
    return {
        restrict: 'E',
        replace: false,
        template: '<div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
uiCore.directive('pid', function() {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
