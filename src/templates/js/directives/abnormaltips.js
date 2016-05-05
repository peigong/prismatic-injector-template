uiCore.directive('abnormaltips', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_abnormalwrapper">'
        + '<div class="c60_fbar_abnormalicon">'
        + '<span class="c60_fbar_abnormalspan"></span>'
        + '</div>'
        + '<div class="c60_fbar_abnormaldesc" ng-bind="compData.js.description"></div>'
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {
                js: {},
                css: {}
            };

            var wrapper = $element;
            var errorconfig = null ;
            var icon = angular.element($element[0].querySelector('.c60_fbar_abnormalicon'));
            var text = angular.element($element[0].querySelector('.c60_fbar_abnormalspan'));
            var desc = angular.element($element[0].querySelector('.c60_fbar_abnormaldesc'));
            $scope.init = function(data) {

                wrapper.css(data.CSS || {});
                icon.css(data.JS.icon || {});
                text.css(data.JS.text || {});
                desc.css(data.JS.desc || {});
                errorconfig = data.JS.errorcodetips;
            }
            ;

            $scope.show = function(data) {
                var config = errorconfig[data.errorcode] || errorconfig['default'] || {};
                var iconstyle = config.CSS || {};
                var description = config.JS ? config.JS.description : '';
                $scope.compData.js.description = description;
                icon.css(iconstyle);
            }
            $scope.$on('trafficquryerror', function(event, data) {
                $scope.show(data);

            });

            $scope.$on('abnormaltipsinit', function(event, data) {
                $scope.init(data);

            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'abnormaltips';
            //$scope.init();
        }
    }
}
]);
