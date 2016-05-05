uiCore.directive('iholdert', [
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
        '$compile',
        '$templateCache',
        '$timeout',
        function($scope, $element, $attrs, $compile, $templateCache, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'stylestates': '',
                        'extrastates': '',
                        'cstylestate': '',
                        'cextrastate': '',
                        'state': 0,
                        'estate': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processStyle();
                $scope.updateStyle();
                if (null  != $attrs.templateurl) {
                    $scope.getTemplate();
                }
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
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.updateStyle();
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
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if ($scope.compData.JS.stateconfig.estate != stateObject.cstate) {
                    $scope.compData.JS.stateconfig.estate = stateObject.cstate;
                    $scope.updateStyle();
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;

            $scope.show = function(data) {
                $element.css({
                    'display': 'block'
                });
                var time = $scope.compData.JS.closetime;
                if (time) {
                    $timeout($scope.hide, time);
                }

            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
            $scope.processStyle = function() {
                var cssData = JSON.stringify($scope.compData.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle($scope.classid, '', cssData);
                var styleStateArray = $scope.compData.JS.stateconfig.stylestates.split('|');
                var styleStateArrayLength = styleStateArray.length;
                var extraStateArray = $scope.compData.JS.stateconfig.extrastates.split('|');
                var extraStateArrayLength = extraStateArray.length;
                for (var i = 0; i < styleStateArrayLength; i++) {
                    var styleState = styleStateArray[i];
                    if (styleState.length > 0) {
                        cssData = JSON.stringify($scope.compData.JS.stateconfig[styleState]);
                        cssData = $scope.formatStyleData(cssData);
                        coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState, cssData);
                        for (var j = 0; j < extraStateArrayLength; j++) {
                            var extraState = extraStateArray[j];
                            if (extraState.length > 0) {
                                cssData = JSON.stringify($scope.compData.JS.stateconfig[extraState]);
                                cssData = $scope.formatStyleData(cssData);
                                coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState + '.' + extraState, cssData);
                            }
                        }
                    }
                }
                $element.addClass($scope.cid);
                if (null  != $scope.compData.JS.stateconfig.state) {
                    var currentState = 'state' + $scope.compData.JS.stateconfig.state;
                    $scope.compData.JS.stateconfig.stylestates = currentState;
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            $scope.updateStyle = function() {
                $element.removeClass($scope.compData.JS.stateconfig.cstylestate);
                $element.removeClass($scope.compData.JS.stateconfig.cextrastate);
                $scope.compData.JS.stateconfig.cstylestate = 'state' + $scope.compData.JS.stateconfig.state;
                $element.addClass($scope.compData.JS.stateconfig.cstylestate);
                if ($scope.compData.JS.stateconfig.state != $scope.compData.JS.stateconfig.estate) {
                    $scope.compData.JS.stateconfig.cextrastate = 'state' + $scope.compData.JS.stateconfig.estate;
                    $element.addClass($scope.compData.JS.stateconfig.cextrastate);
                }
            }
            ;
            $scope.getTemplate = function() {
                var elementTemplateCache = $templateCache.get($attrs.templateurl);
                $element.html(elementTemplateCache);
                $compile($element.contents())($scope);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iholdert';
            scope.init();
        }
    };
}
]);
