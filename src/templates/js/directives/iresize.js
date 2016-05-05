uiCore.directive('iresize', [
'$window',
'$interval',
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            var w = angular.element(top.window);
            w.bind('resize', function() {
                $scope.$apply();
            });
            $scope.getWindowDimensions = function() {
                return {
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth
                };
            }
            ;
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);

            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.currWidth = top.window.innerWidth;
            $scope.currHeight = top.window.innerHeight;
            $scope.rresize = function() {
                var baseHeight = 360
                  ,
                baseWidth = 320;
                $scope.currWidth = top.window.innerWidth;
                $scope.currHeight = top.window.innerHeight;
                var cFontSize = 0
                  ,
                newFontSize = 0;
                if ($scope.prevWidth == $scope.currWidth && $scope.currHeight != $scope.prevHeight && Math.min($scope.prevHeight, $scope.currHeight) / Math.max($scope.prevHeight, $scope.currHeight) >= 0.8) {
                    $scope.prevWidth = $scope.currWidth;
                    $scope.prevHeight = $scope.currHeight;
                    return;
                }
                if ($scope.prevWidth == $scope.currWidth && $scope.prevHeight == $scope.currHeight) {
                    return;
                }

                if ($scope.currWidth <= $scope.currHeight) {
                    cFontSize = $scope.currWidth / baseWidth;
                } else {
                    cFontSize = $scope.currHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.currWidth) {
                    cFontSize = $scope.currWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
