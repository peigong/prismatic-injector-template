uiCore.directive('logodock', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        '$window',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, $timeout, $window, coreService, coreUtils) {
            var _maxTimeMotionless = 300;
            var getBrowserDimensions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight)
                };
            }
            ;
            $scope.moved = false;
            var winnerHeight = getBrowserDimensions().height
              ,
            elementHeight = 0;
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
                'shouldBlurOnDrag': false
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
                winnerHeight = getBrowserDimensions().height;
                elementHeight = parseFloat(top.window.getComputedStyle($element[0]).height);
                e = e.originalEvent || e;

                var target = jqLite(e.target || e.srcElement);

                options.stopPropagation && e.stopPropagation();

                var point = e.touches ? e.touches[0] : e;

                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }
                //console.log('START point.clientY:' + point.clientY);
                self.state = startDragState({
                    x: point.clientX,
                    y: point.clientY
                });
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;

                if (null  != self.state && self.state.active) {
                    $scope.moved = true;
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();

                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.clientX,
                        y: point.clientY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;

                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (self.state.pos.y <= 0) {
                        $element.parent().parent().css({
                            'top': '0px'
                        });
                    } else if (self.state.pos.y <= (winnerHeight - elementHeight)) {
                        $element.parent().parent().css({
                            'top': self.state.pos.y + 'px'
                        });
                    }
                    coreService.commonServiceRef.schedulerService({
                        'on': 'autoclose'
                    }, {
                        "cycle": "1",
                        "interval": "5000",
                        "start": "2"
                    });
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active && null  != self.state.distance && $scope.moved == true) {
                    $scope.moved = false;
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    var dockPosition = top.tlbs.dockPosition || false;
                    if (self.state.pos.y >= (winnerHeight / 2)) {
                        if (dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveBottom', {});
                            top.tlbs.dockPosition = false;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': false
                            });
                        }
                        $element.parent().parent().css({
                            'bottom': '0px',
                            'top': 'initial'
                        });
                    } else {
                        if (!dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveTop', {});
                            top.tlbs.dockPosition = true;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': true
                            });
                        }
                        $element.parent().parent().css({
                            'top': '0px',
                            'bottom': 'initial'
                        });
                    }
                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                }
            }
              ,
            scroll = function() {
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
