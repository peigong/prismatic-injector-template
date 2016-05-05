uiCore.directive('tbresize', [
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
            var isPhonePage = function() {
                var viewport = top.document.getElementsByName('viewport');

                if (!viewport || viewport.length == 0) {

                    return false;
                } else {
                    return true;
                }
            }
            ;
            //fullscreenbar cancel resize function
            if (top.barresizetype == '1') {
                var scale = function() {

                    if (/window/ig.test(navigator.userAgent)) {
                        $element.css({
                            'font-size': '16px'
                        });
                    } else {
                        var width = parseInt(top.window.innerWidth);
                        var height = parseInt(top.window.innerHeight);

                        if (width < 319) {
                            $element.css({
                                'font-size': '12px'
                            });
                        } else if (width >= 320 && width < 359) {
                            $element.css({
                                'font-size': '14px'
                            });
                        } else if (width >= 360 && width < 399) {
                            if (height <= 485) {
                                $element.css({
                                    'font-size': '14px'
                                });
                            } else if (height < 530) {
                                $element.css({
                                    'font-size': '15px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '16px'
                                });
                            }

                        } else if (width >= 400 && width < 479) {
                            if (height < 740) {
                                $element.css({
                                    'font-size': '19px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '20px'
                                });
                            }
                        } else if (width >= 480 && width < 539) {
                            $element.css({
                                'font-size': '20px'
                            });
                        } else if (width >= 540 && width < 639) {
                            $element.css({
                                'font-size': '22px'
                            });
                        } else if (width >= 640 && width < 719) {
                            $element.css({
                                'font-size': '28px'
                            });
                        } else if (width >= 720 && width < 879) {
                            $element.css({
                                'font-size': '32px'
                            });
                        } else if (width >= 880 && width < 959) {
                            $element.css({
                                'font-size': '36px'
                            });
                        } else if (width >= 960 && width < 1079) {
                            $element.css({
                                'font-size': '44px'
                            });
                        } else if (width >= 1080 && width < 1280) {
                            $element.css({
                                'font-size': '48px'
                            });
                        } else if (width >= 1280) {
                            $element.css({
                                'font-size': '56px'
                            });
                        }
                    }
                }
                ;

                scale();
                top.window.addEventListener('load', scale);
                $interval(function() {
                    scale();
                }, 3000);
                return;
            }
            $scope.pWidth = 0;
            $scope.pHeight = 0;

            $scope.resize = function() {
                var baseHeight = 360
                  ,
                baseWidth = 320;

                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;
                var cFontSize = 0
                  ,
                newFontSize = 0;
                if ($scope.pWidth == $scope.cWidth) {
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.cHeight != $scope.pHeight && Math.min($scope.pHeight, $scope.cHeight) / Math.max($scope.pHeight, $scope.cHeight) >= 0.8) {
                    $scope.pWidth = $scope.cWidth;
                    $scope.pHeight = $scope.cHeight;
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.pHeight == $scope.cHeight) {
                    return;
                }
                if ($scope.cWidth <= $scope.cHeight) {
                    cFontSize = $scope.cWidth / baseWidth;
                } else {
                    cFontSize = $scope.cHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.cWidth) {
                    cFontSize = $scope.cWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                //newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.pWidth = $scope.cWidth;
                $scope.pHeight = $scope.cHeight;
            }
            ;
            $scope.resizeForPreview = function(w, h) {
                var baseheight = 360
                  ,
                baseWidth = 320;

                if (w <= h) {
                    cFontSize = w / baseWidth;
                } else {
                    cFontSize = h / baseHeight;
                }
                var newSize = cFontSize * 18;
                $element.css('font-size', newSize + 'px');
            }
            ;
            //tlbm preview no need set resize interval
            if (top.tlbs.w && top.tlbs.h) {
                $scope.resizeForPreview(parseInt(top.tlbs.w), parseInt(top.tlbs.h));
            } else {
                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;

                var w = angular.element(top.window);
                w.bind('resize', function() {
                    $scope.resize();
                });
                $scope.resize();
                $scope.intervalObject = $interval(function() {
                    $scope.resize();
                }, 10);
            }
        }
        ]
    };
}
]);
/*
iradioselectiondiv: component for customized radio selection Box.
setSelectionValue(): method used to get the data from serivce. need to fire once data got received though event chain.
 $scope.compData.JS.selectedValue : gives selected value.
*/
