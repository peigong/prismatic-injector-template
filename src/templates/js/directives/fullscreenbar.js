uiCore.directive('fullscreenbar', ["$templateCache", function(a) {
    return {
        restrict: "AE",
        templateUrl: 'fullscreenbar',
        scope: {},
        controller: ["$scope", "$element", "$attrs", function(d, c, b) {}
        ]
    }
}
]);
