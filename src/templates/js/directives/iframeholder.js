uiCore.directive('iframeholder', [
'coreService',
'coreUtils',
function(coreService, coreUtils) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div><iframe id="ciframe"></iframe></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    'width': '100%',
                    'height': '100%',
                    'position': 'relative'
                },
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'iframecfg': {
                        'CSS': {
                            'border': '0',
                            'position': 'absolute',
                            'top': '0',
                            'left': '0',
                            'width': '100%',
                            'height': '100%',
                        },
                        'JS': {
                            'preload': true,
                            'iframeUrl': ''
                        }
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
                $scope.customIframe = angular.element($element[0].querySelector('[id="ciframe"]'));
                $scope.processStyle();
                $scope.processConfig();
            }
            ;
            $scope.processStyle = function() {
                $element.css($scope.compData.CSS);
                $scope.customIframe.css($scope.compData.JS.iframecfg.CSS);
            }
            ;
            $scope.processConfig = function() {
                if ($scope.compData.JS.iframecfg.JS.preload) {
                    $scope.customIframe.removeAttr('src');
                    $scope.customIframe.attr('src', $scope.compData.JS.iframecfg.JS.iframeUrl);
                }
            }
            ;
            $scope.receive = function(input, deferred) {
                $scope.customIframe.removeAttr('src');
                $scope.customIframe.attr('src', input.url);
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.loadFrame = function(eventInput, deferred) {
                $scope.customIframe.removeAttr('src');
                $scope.customIframe.attr('src', $scope.compData.JS.iframecfg.JS.iframeUrl);
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.unloadFrame = function(eventInput, deferred) {
                $scope.customIframe.removeAttr('src');
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.updateFrameURL = function(eventInput, deferred) {
                $scope.compData.JS.iframecfg.JS.iframeUrl = eventInput.iframeUrl || '';
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['receive'] = $scope.receive;
            $scope.eventMap['loadFrame'] = $scope.loadFrame;
            $scope.eventMap['unloadFrame'] = $scope.unloadFrame;
            $scope.eventMap['updateFrameURL'] = $scope.updateFrameURL;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iframeholder';
            scope.init();
        }
    };
}
]);
