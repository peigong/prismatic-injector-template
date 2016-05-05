uiCore.directive('lresize', [
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
                    'w': top.window.innerWidth,
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']),
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'cw': $element.css('width')
                };
            }
            ;
            w.bind("scroll", function() {
                $scope.rresize();
            });
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            var baseHeight = 360
              ,
            baseWidth = 320;
            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.rresize = function() {
                //console.log('top.document.documentElement.clientHeight:', top.document.documentElement.clientHeight, 'top.window.innerHeight:', top.window.innerHeight, 'top.window.pageYOffset:', top.window.pageYOffset);
                //console.log('top.document.documentElement.clientWidth:', top.document.documentElement.clientWidth, 'top.window.innerWidth:', top.window.innerWidth, 'top.window.pageXOffset:', top.window.pageXOffset);
                if ((top.window.innerWidth / top.document.documentElement.clientWidth) != 1) {
                    $element.css('bottom', top.document.documentElement.clientHeight - (top.window.pageYOffset + top.window.innerHeight) + 'px');
                    $element.css('position', 'absolute');
                    if ($element.css('width') != '0%') {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    } else if (top.window.pageXOffset == 0) {
                        $element.css('right', top.document.documentElement.clientWidth - top.window.innerWidth + 'px');
                    } else if (top.window.pageXOffset > 0) {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    }
                    //console.log($element.css('width'));
                } else {
                    $scope.setFontSize();
                    $element.css('position', 'fixed');
                    $element.css('bottom', '0px');
                    $element.css('right', '0px');
                }
                $element.css('-webkit-transform', 'scale(' + top.window.innerWidth / top.document.documentElement.clientWidth + ')');
                $element.css('-webkit-box-sizing', 'border-box');
                $element.css('box-sizing', 'border-box');
                $element.css('-webkit-transition', 'all 0.2s ease-in-out');
                $element.css('-webkit-transform-origin', '0 100%');

            }
            ;
            $scope.setFontSize = function() {
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
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;

                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
