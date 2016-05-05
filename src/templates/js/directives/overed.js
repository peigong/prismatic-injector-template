uiCore.directive('overed', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_overed_buy_con"><div style="overflow:hidden;height:100%" simplescroll>' +
        '<overedpack stateconfig="{{::compData.JS.config}}" ordered=orderedProducts ng-repeat="opack in orderedProducts" opack-name="opack.name" opack-name="opack.name" opack-time="opack.orderedtime" opack-desc="opack.description"></overedpack>' +
        '<div class="c60_fbar_no_more"><span>no more...</span></div>' +
        '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile",
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'config': {
                        'up': {
                            'background': 'url("' + top.tlbs.templatePath + '/images/shengdangtip.png") center right no-repeat',
                            'background-size': '0.65em 0.65em',
                            'padding-right': '0.9em'
                        }
                    }

                }
            };
            $scope.eventMap = {};
            $scope.orderedProducts = [];
            $scope.update = function(data) {
                if (data && data.respparam && data.respparam.trafficusage) {
                    $scope.orderedProducts = data.respparam.trafficusage.orderedProducts;
                }
            }
            ;
            $scope.init = function(param) {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                coreService.fireEvent($element.attr('cid'), 'init');
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
            $scope.eventMap['update'] = $scope.update;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'overed';
            $scope.init();
        }

    }

}
]);
