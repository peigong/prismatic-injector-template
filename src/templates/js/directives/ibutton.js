uiCore.directive('ibutton', [
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
        template: '<div ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" {{param}}><div id="buttontextdiv">{{compData.JS.buttontext}}<div></div>',
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
                    'buttontext': '',
                    'clickable': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'buttontextstyle': {
                        'CSS': {
                            'font-size': '0.8em'
                        },
                        'JS': {

                        }
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
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                $scope.compData = $scope.param;
                $scope.applyStyle();
            }
            ;
            /*$scope.getButtonStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                angular.element($element[0].querySelector('[id="buttontextdiv"]')).css($scope.compData.JS.buttontextstyle.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ibutton';
            $scope.init();
        }
    };
}
]);
