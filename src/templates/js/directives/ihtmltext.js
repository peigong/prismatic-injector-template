uiCore.directive('ihtmltext', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'dataMapping': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                if ($scope.cid) {
                    coreService.registerComponentInstance($scope.cid, $scope);
                    $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                }
                coreUtils.extendDeep($scope.compData, $scope.param || {});
                $scope.updateHTML($scope.compData.JS.textdata);
                $scope.applyStyle();
            }
            ;
            /*$scope.getTextStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch(function() {
                return $element.attr('itext');
            }, function(newValue) {
                if (null  != newValue) {
                    $scope.updateHTML(newValue);
                }
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.$watch($scope.compData, function() {
                if (null  != $scope.compData.JS.textdata) {
                    $scope.updateHTML($scope.compData.JS.textdata);
                }
            });
            $scope.updateHTML = function(htmlData) {
                //$element[0].innerHTML = '<marquee direction="up" height="100%" scrollamount="2">' + htmlData + '</marquee>';
                $element[0].innerHTML = htmlData;
            }
            ;
            $scope.updateHTMLText = function(args) {
                if ($scope.compData.JS.dataMapping) {
                    $scope.updateHTML(coreUtils.transfer(args, $scope.compData.JS.dataMapping));
                }
            }
            ;
            $scope.eventMap['text.update'] = $scope.updateHTMLText;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ihtmltext';
            $scope.init();
        }
    };
}
]);
