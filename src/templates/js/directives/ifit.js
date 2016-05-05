uiCore.directive('ifit', [
'$window',
'coreService',
function($window) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$window',
        function($scope, $element, $attrs, $window, coreService) {
            var w = angular.element(top.window);
            //mod by s00900236 at 2015-03-20 begin
            //reason:DTS2015031903381 added fontsize watch on width change
            $scope.getDimentions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth,
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize'])
                }
            }
            ;
            //mod by s00900236 2015-03-20 end
            $scope.$watch($scope.getDimentions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            $scope.rresize = function() {
                var dimention = $scope.getDimentions();
                var minusValue = $element.attr('ifit');
                var isNumber = !isNaN(parseFloat(minusValue)) && isFinite(minusValue);
                var fontSize = dimention.fs;
                var totalWidth = dimention.pw;
                if (!isNumber) {
                    if (totalWidth > 0) {
                        var firstChildWidth = 0;
                        var siblings = $element.parent().children();
                        for (i = 0; i < siblings.length; i++) {
                            var singleElement = siblings[i];
                            if (null  == singleElement.attributes['ifit']) {
                                firstChildWidth += parseFloat(top.window.getComputedStyle(singleElement).width);
                            }
                        }
                        var minusEM = firstChildWidth / fontSize;
                        if (minusValue == "bnBar")
                        {
                            $element.css('width', (((totalWidth / fontSize) - minusEM) - 1) + 'em');
                        } else
                        {
                            $element.css('width', ((totalWidth / fontSize) - minusEM) + 'em');
                        }

                    }
                } else {
                    var winnerWidth = dimention.width;
                    if (minusValue == 0) {
                        $element.css('width', (winnerWidth / fontSize) + 'em');
                    } else if (totalWidth > 0) {
                        $element.css('width', ((totalWidth / fontSize) - minusValue) + 'em');
                    }
                }
            }

            $scope.$watch(function() {
                return $element.attr('ifit');
            }, function(newValue) {
                $scope.rresize();
            });

            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ]
    };
}
]);
