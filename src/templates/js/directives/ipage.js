uiCore.directive('ipage', function() {
    return {
        restrict: 'AE',
        replace: false,
        scope: {},
        templateUrl: function(elem, attrs) {
            if (null  != attrs.lload && attrs.lload == 0) {
                return "empty";
            } else {
                return attrs.templateurl || '';
                /*modify 'protocol' of undefined*/
            }
        },
        controller: ['$scope', '$element', '$attrs', '$compile', '$templateCache', function($scope, $element, $attrs, $compile, $templateCache) {
            $scope.loadState = $element.attr('lload') | 0;
            if (null  != $element.attr('lload')) {
                var preloadWatch = $scope.$watch(function() {
                    return $element.attr('lload');
                }, function() {
                    var lloadArrr = $element.attr('lload');
                    if (null  != lloadArrr && 1 == lloadArrr && 0 == $scope.loadState) {
                        var data = $templateCache.get($attrs.templateurl);
                        $element.html(data);
                        $compile($element.contents())($scope);
                        $scope.loadState = 1;
                        preloadWatch();
                    }
                }, true);
            }
        }
        ],
        link: function(scope, element, attrs) {}
    };
});
