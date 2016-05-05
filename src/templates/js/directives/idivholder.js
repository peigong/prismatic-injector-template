uiCore.directive('idivholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        //console.log('$scope.compData.JS.stateconfig.state:', $scope.compData.JS.stateconfig.state, 'stateObject.cstate:', stateObject.cstate, '$scope.cid:', $scope.cid);
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                        /*$timeout(function() {
                                    $scope.$apply();
                                    if (null != deferred) {
                                        if ($scope.compData.JS.animation) {
                                            var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                            $element.on(_transitionEnd, function(e) {
                                                deferred.resolve();
                                            });
                                        } else {
                                            deferred.resolve();
                                        }
                                    }
                                });*/
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    $scope.compData.CSS = coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + stateObject.cstate]);
                    $scope.applyStyle();
                }
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    //console.log('cid:', $scope.cid, '$scope.param:', $scope.param);
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'idivholder';
            scope.init();
        }
    };
}
]);
