uiCore.directive('imageholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();compData.JS.stopp && $event.stopPropagation()" {{param}}></div>',
        scope: {
            param: '=param',
            dynamicproperties: '=dynamicproperties'
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
                    'stopp': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'cdrConfig': {

                    }
                }
            };
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
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
                    }
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.handleClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                    var pageID = top.tlbs.currentpageid || $scope.pageID;
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': pageID,
                        'componentId': $scope.cid
                    };
                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));

                $scope.$watch($scope.dynamicproperties, function(newValue) {
                    if ($scope.dynamicproperties) {
                        $scope.update();
                    }
                });
                $scope.applyStyle();
            }
            ;

            $scope.update = function() {
                if (typeof $scope.dynamicproperties == 'string') {
                    $scope.dynamicproperties = coreUtils.String2JSON($scope.dynamicproperties);
                }
                if ($scope.dynamicproperties.CSS['background-image'] != "") {
                    $element.css({
                        "background-image": 'url("' + $scope.dynamicproperties.CSS['background-image'] + '")'
                    });
                }
            }
            ;

            /*$scope.getImageStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'imageholder';
            scope.init();
        }
    };
}
]);
