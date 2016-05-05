uiCore.directive('iradioselectiondiv', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: false,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-style="compData.CSS"><div ng-click="handleClick({{$index}});$event.stopPropagation();"  ng-style="compData.JS.radiobutton.CSS"  ng-repeat="key in compData.JS.dataset" id="radio_options_{{$index}}" >{{key.name}}</div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.eventMap = {};
            $scope.compData = {

            };
            $scope.handleClick = function(indexno) {
                $scope.changeState(indexno);
            }
            ;
            $scope.changeState = function(indexno) {
                $scope.index = indexno;
                var bulletIcon = $element[0].querySelector('#radio_options_' + indexno);

                for (i = 0; i <= $element.children().children().length - 1; i++) {
                    angular.element($element[0].querySelector('#radio_options_' + i))
                    .css($scope.compData.JS.radiobutton.JS.inactiveCSS);
                }
                angular.element(bulletIcon).css($scope.compData.JS.radiobutton.JS.activeCSS);

                //for getting the selected value
                $scope.compData.JS.selectedValue = $scope.compData.JS.dataset[$scope.index];
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                //$scope.setSelectionValue(window.responseparam);
            }
            ;
            /*
                                   $scope.getSelectedValue = function() {

                                       return $scope.compData.JS.dataset[$scope.index];

                                   };*/

            $scope.setSelectionValue = function(respData) {
                if ($scope.compData.JS.selectionConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.selectionConfigRespPath);
                }
                $timeout(function() {
                    $scope.$apply();
                    $scope.changeState(0);
                });
            }
            ;
            //$scope.eventMap['getSelectedValue'] = $scope.getSelectedValue;
            $scope.eventMap['setSelectionValue'] = $scope.setSelectionValue;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'iradioselectiondiv';
            $scope.init();
        }
    };
}
]);
