uiCore.directive('tcpack', [function() {

    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            tpitem: '=tpitem',
        },
        template: '<div><div class="c60_fbar_taocan_type c60_fbar_clearfloat"><div class="c60_fbar_taocan_type_info" ng-bind="tpitem.packagename"></div><div class="c60_fbar_taocan_surplus_info" ng-bind="\'剩余\'+tpitem.remain +tpitem.remainunit"></div></div><div class="c60_fbar_line"><div class="c60_fbar_line_in_green lineStyle" ng-style="tpitem.linestyle"><span class="c60_fbar_faceStyle faceStyle" ng-style="tpitem.imagestyle"></span></div></div></div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {

            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
