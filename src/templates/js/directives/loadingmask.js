uiCore.directive('loadingmask', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_loadingmask">'
        + '<div class="c60_fbar_loadingmask_datouwang8">'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container1">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container1_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container1_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container1_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container2">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container2_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container2_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container2_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container2_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container3">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container3_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container3_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container3_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container3_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_tips_txt_loading" ng-bind="compData.js.loadingtext"></div>'
        + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            var timeout = null ;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData.js.loadingtext = $scope.compData.js.loadingtext || '加载中';
                $element.css($scope.compData.css);
            }
            ;
            $scope.show = function() {
                $element.css({
                    "display": "block"
                });
                timeout = setTimeout($scope.hide, $scope.compData.js.autohide || 10000)
            }
            ;

            $scope.hide = function() {
                $element.css({
                    "display": "none"
                });
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null ;
                }

            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.$on($attrs['cid'] + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "loadingmask";
            $scope.init();
        }
    };
});
