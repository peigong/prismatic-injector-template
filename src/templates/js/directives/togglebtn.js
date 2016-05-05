uiCore.directive('togglebtn', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div ng-click="doclick();$event.preventDefault();$event.stopPropagation();" class="c60_fbar_toggle_btn" ccid="detailbtn"></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {
                JS: {},
                CSS: {}
            };
            var cur = 0;
            $scope.doclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'btn')
                    };
                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //var cur = $element[0].getAttribute('state') || '0';
                //$element[0].setAttribute('state', cur == '0' ? '1' : '0');
                coreService.fireEvent($element.attr('cid'), 'toggle' + cur);
                cur = (cur == '0' ? '1' : '0');
                $element.css($scope.compData.JS['state' + cur] || {})
            }
            $scope.changState = function() {
                $element[0].setAttribute('state', '0');
            }
            $scope.eventMap['changState'] = $scope.changState;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var jsProp = properties.JS || {};
                var cssProp = properties.CSS || {};
                $scope.jsProp = coreUtils.extendDeep($scope.compData.JS, jsProp);
                $scope.cssProp = coreUtils.extendDeep($scope.compData.CSS, cssProp);
                $scope.compData['JS'] = $scope.jsProp;
                $scope.compData['CSS'] = $scope.cssProp;
                $element.css($scope.compData.CSS || {})
                $element.css($scope.compData.JS['state' + cur] || {})
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'togglebtn';
            $scope.init();
        }
    }
}
]);
