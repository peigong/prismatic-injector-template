uiCore.directive('sscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        '$window',
        'coreService',
        function($scope, $element, $attrs, $timeout, $window, coreService) {
            var w = angular.element(top.window);
            var direction = $attrs['sscroll'];
            var isHorizontal = ('h' == direction);
            var isVerticle = ('v' == direction);
            var isHorizontalWithImage = ('hi' == direction);
            var _maxTimeMotionless = 300;
            var jqLite = angular.element
              ,
            copy = angular.copy
              ,
            forEach = angular.forEach
              ,
            isString = angular.isString
              ,
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': true
            }
              ,
            wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div style="height:100%;width:100%;overflow:hidden;"></div>');
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
                if (isHorizontalWithImage) {
                    angular.element($element.parent()[0]).append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }
            }
              ,
            getContentRect = function(raw) {
                var style = top.window.getComputedStyle(raw);
                var offTop = parseInt(style.getPropertyValue('margin-top'), 10) +
                parseInt(style.getPropertyValue('padding-top'), 10);
                var offLeft = parseInt(style.getPropertyValue('margin-left'), 10) +
                parseInt(style.getPropertyValue('padding-left'), 10);
                var offRight = parseInt(style.getPropertyValue('margin-right'), 10) +
                parseInt(style.getPropertyValue('padding-right'), 10);
                var offBottom = parseInt(style.getPropertyValue('margin-bottom'), 10) +
                parseInt(style.getPropertyValue('padding-bottom'), 10);

                var ttop = parseInt(style.getPropertyValue('top'), 10);
                var bottom = parseInt(style.getPropertyValue('bottom'), 10);
                var left = parseInt(style.getPropertyValue('left'), 10);
                var right = parseInt(style.getPropertyValue('right'), 10);

                var height = parseFloat(style.getPropertyValue('height'), 10);
                var width = parseFloat(style.getPropertyValue('width'), 10);
                return {
                    top: offTop + (isNaN(ttop) ? 0 : ttop),
                    bottom: offBottom + (isNaN(bottom) ? 0 : bottom),
                    height: height,
                    width: width,
                    left: offLeft + (isNaN(left) ? 0 : left),
                    right: offRight + (isNaN(right) ? 0 : right)
                };
            }
              ,
            setHeight = function() {
                if (null  != children) {
                    var totalHeight = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalHeight += (contentRect.height + contentRect.top + contentRect.bottom);
                    }
                    wrapperDiv.css('height', totalHeight / fontSize + 'em');
                }
            }
              ,
            setWidth = function() {
                if (null  != children) {
                    var totalWidth = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalWidth += (contentRect.width + contentRect.left + contentRect.right);
                    }
                    if ($attrs['cid'] == 'iholder21') {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 0.3 + 'em');
                    } else {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 'em');
                    }
                }
            }
              ,
            moveDragState = function(state, point) {
                state.delta = distanceBetween(point, state.pos);
                state.distance = distanceBetween(point, state.origin);
                state.pos = {
                    x: point.x,
                    y: point.y
                };
                state.updatedAt = Date.now();
            }
              ,
            distanceBetween = function(p2, p1) {
                var dist = {
                    x: p2.x - p1.x,
                    y: p2.y - p1.y
                };
                dist.magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
                return dist;
            }
              ,
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" ||
                raw.tagName === "SELECT" ||
                raw.tagName === "TEXTAREA");
            }
              ,
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },

                    startedAt: Date.now(),
                    updatedAt: Date.now(),

                    stopped: false,
                    active: true
                };
            }
              ,
            dragStart = function(e) {
                e = e.originalEvent || e;

                var target = jqLite(e.target || e.srcElement);

                options.stopPropagation && e.stopPropagation();

                var point = e.touches ? e.touches[0] : e;

                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }

                self.state = startDragState({
                    x: point.pageX,
                    y: point.pageY
                });
                if (isHorizontalWithImage) {
                    showScrollImage();
                }
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;

                if (null  != self.state && self.state.active) {
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();

                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.pageX,
                        y: point.pageY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;

                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (isHorizontal || isHorizontalWithImage) {
                        $element[0].scrollLeft -= self.state.delta.x;
                    }
                    if (isVerticle) {
                        $element[0].scrollTop -= self.state.delta.y;
                    }

                    if (isHorizontalWithImage) {
                        showScrollImage();
                        coreService.commonServiceRef.schedulerService({
                            'on': 'autoclose'
                        }, {
                            "cycle": "1",
                            "interval": "5000",
                            "start": "2"
                        });
                    }
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();

                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                    if (isHorizontalWithImage) {
                        hideScrollImage();
                    }
                }
            }
              ,
            scroll = function() {
                wrapper();
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
              ,
            showScrollImage = function() {
                if ($element[0].offsetWidth < wrapperDiv[0].offsetWidth) {
                    var elementDiementions = getContentRect($element[0]);
                    if (parseFloat($element[0].scrollLeft) <= 0) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else if (parseFloat(elementDiementions.width + elementDiementions.left + elementDiementions.right + $element[0].scrollLeft + 2) >= wrapperDiv[0].offsetWidth) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });

                    }
                }
            }
              ,
            hideScrollImage = function() {
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
            }
            ;

            $scope.getParentDimentions = function() {
                if (null  != children) {
                    return {
                        'h': top.window.getComputedStyle(children[0]).height,
                        'w': top.window.getComputedStyle(children[0]).width
                    }
                }
                return {};
            }
            ;
            $scope.$watch($scope.getParentDimentions, function(newValue, oldValue) {
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
            }, true);
            $timeout(scroll, 0);

            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
