uiCore.directive('tbparentisolator', [
function() {
    return {
        restrict: 'AE',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
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
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;
                var target = e.target;
                if (null  != self.state && self.state.active && !isInput(target)) {
                    e.preventDefault();
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    self.state = {};
                }
            }
            ;
            $element.bind('touchstart', dragStart);
            $element.bind('touchmove', dragMove);
            $element.bind('touchend touchcancel', dragEnd);
            //$element.bind('mousedown', dragStart);
            //$element.bind('mousemove', dragMove);
            //$element.bind('mouseup mouseout', dragEnd);
        }
        ]
    };
}
]);
