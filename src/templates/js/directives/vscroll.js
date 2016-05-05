uiCore.directive('vscroll', function() {
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
            var wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div class="ui-com-vscroll-wrapper"></div>');
                //setHeight();
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
            }
              ,
            setHeight = function() {
                minHeight = parseInt(top.window.getComputedStyle($element[0], null )['height']);
                totalHeight = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalHeight += children[i].offsetHeight + parseInt(style['marginTop']) + parseInt(style['marginBottom']);
                }
                //in ios6 in some page,when scroll,last record can't show completely,so here add 12 to avoid,to do:analyze why
                totalHeight = totalHeight + 12;
                if (totalHeight < minHeight) {
                    totalHeight = minHeight;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);
                wrapperDiv.css('height', totalHeight / fontSize + 'em');
            }
              ,
            bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;

                var flag = false;
                $element.bind(_touchstart, function(e) {
                    setHeight();
                    var transform = wrapperDiv[0].style['webkitTransform'] || wrapperDiv[0].style['mozTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    var _lastYPos = e.touches ? e.touches[0].pageY : e.pageY
                      ,
                    target = e.target
                      ,
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        var ydistance = _currentYPos - _lastYPos;
                        if (Math.abs(ydistance) > 3) {
                            if (!flag) {
                                flag = true;
                            }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;
                        //for scroll performance,user transform:
                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalHeight + totalDistance < minHeight) {
                            totalDistance = minHeight - totalHeight;
                        }
                        if (isOpera) {
                            wrapperDiv.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            wrapperDiv.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            wrapperDiv.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }

                        //$element[0].scrollTop -= ydistance;
                    }
                      ,
                    endTouch = function(e) {
                        if (flag) {
                            e.stopPropagation();
                            e.preventDefault();
                            flag = false;
                        }
                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
              ,
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            /*
				$scope.eventMap = $scope.eventMap||{};
				$scope.eventMap['recoverposition'] = function(){
				wrapperDiv.css('-webkit-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-moz-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-o-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-ms-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('transform', 'translate3d(0,0,0)');

				};*/
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
