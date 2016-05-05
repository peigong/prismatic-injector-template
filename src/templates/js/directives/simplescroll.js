uiCore.directive('simplescroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'Const',
        function($scope, $element, $attrs, $timeout, Const) {
            var children,
            wrapperDiv,
            minHeight = 0,
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;
                var _lastYPos = 0;
                var _currentYPos = 0;
                var ydistance = 0;
                var flag = false;
                var elHeight = 0;
                var parentHeight = 0;
                var touchstartflag = false;
                var touchstart = function(e) {
                    top.tlbs.popupTxtMove = false;
                    var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    touchstartflag = true;
                    elHeight = parseInt($attrs['totalheight'] || top.window.getComputedStyle($element[0], null )['height']) + 20;
                    parentHeight = parseInt($attrs['parentheight'] || top.window.getComputedStyle($element[0].parentNode, null )['height']);
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (elHeight > parentHeight) {
                        top.document.addEventListener(_touchmove, touch, false);

                        top.document.addEventListener(_touchend, endTouch, false);
                    }

                }

                var touch = function(e) {
                    if (touchstartflag) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;

                        ydistance = _currentYPos - _lastYPos;

                        if (Math.abs(ydistance) > 3 || flag) {
                            top.tlbs.popupTxtMove = true;
                            flag = true;
                            e.stopPropagation();
                            e.preventDefault();
                        }

                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;

                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalDistance + elHeight <= parentHeight) {

                            totalDistance = parentHeight - elHeight;
                        }
                        if (isOpera) {
                            $element.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            $element.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            $element.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }
                    }
                }
                ;
                var endTouch = function(e) {
                    if (flag) {
                        e.stopPropagation();
                        e.preventDefault();
                        flag = false;
                    }
                    touchstartflag = false;
                    top.document.removeEventListener(_touchmove, touch, false);
                    top.document.removeEventListener(_touchend, endTouch, false);
                }
                ;
                $element.bind(_touchstart, touchstart);
            }
            ;

            $timeout(bind, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
