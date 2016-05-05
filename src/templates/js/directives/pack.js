uiCore.directive('pack', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^?pid',
        scope: {
            name: '=packName',
            price: '=packPrice',
            total: '=packTotal',
            color: '=packColor',
            pkgid: '=packid',
            ecid: '=ecid',
            recommandations: '=recommandations',
            pageID: '=ppid',
            taskId: '=taskid'
        },
        template: '<div class="c60_fbar_packs" ><div class="c60_fbar_p_package"><div ccid="c60_fbar_p_package" ng-click="tostore();$event.preventDefault();$event.stopPropagation();"><div class="c60_fbar_package_title " ccid="c60_fbar_package_title" >' + '<div class="c60_fbar_packagetip"><p class="c60_fbar_jybpackagetipp" style="background:{{color}}" ng-bind="name"></p></div>' + '<div class="c60_fbar_jybpackageprice" ><div class="c60_fbar_pricebgcolor" style="background:{{color}}"></div><p class="c60_fbar_packagepricep" ng-bind="price"></p></div></div>' + '<div class="c60_fbar_packagecont" ng-bind="total"></div></div>' +
        '</div></div>',
        controller: [
        "$scope",
        "$element",
        "$attrs",
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //var $element = angular.element($element[0].querySelector('.c60_fbar_packs'));
            $scope.changeStyle = function() {

                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var list = $scope.recommandations;
                var len = list.length;
                if (len == 1) {
                    $element.css(states.packages);
                }
            }
            ;
            $scope.$watch($attrs, function() {
                $scope.changeStyle();
            });

            $scope.tostore = function() {
                var config = coreUtils.String2JSON($attrs['config']);
                if (coreUtils.cdrUtils.canWriteUITracingCDR(config.p_package.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pkgid,
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService(config.p_package.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.ordersrc = $scope.pageID;
                coreService.fireEvent($scope.ecid, 'tostore', {
                    'pkgid': $scope.pkgid,
                    'taskid': $scope.taskId
                });
            }
            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.compData = {
                'JS': {},
                'CSS': {}
            };
        }
    }
});
