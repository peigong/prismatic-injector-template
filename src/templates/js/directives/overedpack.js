uiCore.directive('overedpack', [function() {

    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            name: '=opackName',
            time: '=opackTime',
            desc: '=opackDesc',
            ordered: '=ordered',
        },
        template: '<div class="c60_fbar_overed_buy_list">' +
        '<div class="c60_fbar_type_time c60_fbar_clearfloat">' +
        '<div class="c60_fbar_type"><span class="c60_fbar_up" ng-bind="name"></span></div>' +
        '<div class="c60_fbar_time" ng-bind="time"></div></div>' +
        '<div class="c60_fbar_txt" ng-bind="desc"></div>' +
        '</div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.changeStyle = function() {
                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var element = angular.element($element[0].querySelector('.c60_fbar_up'));
                var name = $scope.name;
                if (name.indexOf("升级包") > 0) {
                    element.css(states.up);
                }
            }
            ;
            $scope.init = function() {
                $scope.changeStyle();
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
