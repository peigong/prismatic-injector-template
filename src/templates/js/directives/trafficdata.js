uiCore.directive('trafficdata', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_top_left">'
        + '<p class="c60_fbar_top_leftp"><b class="c60_fbar_top_leftpb" ng-bind=value.desc></b><span class="c60_fbar_top_leftpspan" ng-bind=value.u></span></p>'
        + '<p class="c60_fbar_top_leftp" ng-bind=value.v></p>'
        + '</div>',
        scope: {
            value: '=value',
        },
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {}

        ],
        link: function() {}
    }
}
]);
