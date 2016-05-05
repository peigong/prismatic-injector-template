uiCore.directive('percentage', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            percent: '=',
        },
        require: '^pid',
        template: '<div class=\'ui-com-percentage\'><div class=\'ui-com-percentage-value\'></div><div class=\'ui-com-percentage-image\'></div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        '$timeout',
        'coreUtils',
        function($scope, $element, $attrs, coreService, $timeout, coreUtils) {
            $scope.setPercent = function(percent) {
                $scope.percent = percent;
            }
            ;
            $scope.showPercentage = function() {
                $scope.jsProp.styleSet = coreUtils.String2JSON($attrs['styleset']);
                angular.element($element[0].querySelector('.ui-com-percentage-value')).css({
                    'background-color': $scope.getPercentageColor().activecolor,
                    'width': $scope.percent + '%'
                });
                if (($attrs['showpercentageimage'] == "true") && ($scope.getPercentageColor().activeimage)) {
                    angular.element($element[0].querySelector('.ui-com-percentage-image')).css({
                        'background-image': $scope.getPercentageColor().activeimage,
                        'left': ($scope.percent - 1) + '%'
                    });
                }
            }
            ;
            $scope.getPercentageColor = function() {
                var valueSet = undefined;
                for (p in $scope.jsProp.styleSet) {
                    var dataSet = p.split("_");
                    if (dataSet.length > 0) {
                        if (parseInt(dataSet[0]) <= $scope.percent && $scope.percent <= parseInt(dataSet[1])) {
                            return $scope.jsProp.styleSet[p];
                        }
                    }
                }
                return $scope.jsProp.styleSet.defaultset.activecolor;
            }
            ;
            $scope.init = function() {
                var defaultJsProp = {}
                  ,
                properties = coreService.getInitProperties($attrs['cid']) || {}
                  ,
                jsProp = properties.JS || {}
                  ,
                cssProp = properties.CSS || {}
                  ,
                jsData = coreUtils.String2JSON($attrs['jsdata'])
                  ,
                cssData = coreUtils.String2JSON($attrs['cssdata']);
                $scope.jsProp = coreUtils.extendDeep(defaultJsProp, jsProp, jsData);
                $scope.cssProp = coreUtils.extendDeep(cssProp, cssData);
                $element.css($scope.cssProp);
                $timeout($scope.showPercentage, 0);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'percentage';
            $scope.init();
        }
    };
});
