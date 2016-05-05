uiCore.directive('slider', [
'coreService',
'coreUtils',
'$timeout',
'Const',
'$window',
function(coreService, coreUtils, $timeout, Const, $window) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div  ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" ><div style="position:relative;"><div ng-swipe-right="swiperight();" ng-swipe-left="swipeleft();"  ng-style="compData.CSS" ></div><div ng-show="compData.JS.enabletitle" ng-style="compData.JS.titleconfig.CSS"></div></div> <div ng-show="compData.JS.enablebullets" ng-style="compData.JS.bulletcontainerconfig.CSS"> <div ng-style="compData.JS.bulletconfig.CSS" ng-click="changeStatebyIndex($index);$event.stopPropagation();" ng-repeat="app in compData.JS.dataset | limitTo:compData.JS.maxcount" id="slider_bullet_{{$index}}"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.maxindex = 0;
            $scope.eventMap = {};

            $scope.imageset = {}
            $scope.compData = {};

            $scope.handleClick = function() {
                if ($scope.compData.JS.dataset[$scope.index].weblink && $scope.compData.JS.dataset[$scope.index].weblink.split("http").length > 1) {
                    $window.open($scope.compData.JS.dataset[$scope.index].weblink);

                } else {
                    $window.open("http://" + $scope.compData.JS.dataset[$scope.index].weblink);
                }

            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.swipeleft = function() {
                $scope.index = $scope.index + 1;
                if ($scope.index > parseInt($scope.maxindex - 1)) {
                    $scope.index = parseInt($scope.maxindex - 1);
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.swiperight = function() {
                $scope.index = $scope.index - 1;

                if ($scope.index < 0) {
                    $scope.index = 0;
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.maxindex = $scope.compData.JS.maxcount;
            }
            ;

            $scope.setAdvertiseData = function(respData, deferred) {
                $scope.index = 0;
                if (null  != deferred) {
                    deferred.resolve();
                }
                if ($scope.compData.JS.sliderConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.sliderConfigRespPath);
                }
                $timeout(function() {
                    if ($scope.maxindex > 0) {
                        angular.element($element[0].children[0].children[0]).css({
                            'height': $scope.compData.JS.sliderheight
                        });
                        $scope.changeState(0);
                    }
                });

                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length < $scope.compData.JS.maxcount) {
                    $scope.maxindex = $scope.compData.JS.dataset.length;
                }

                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length == 0) {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': '0%'
                    });
                } else {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': $scope.compData.JS.sliderheight,
                        'margin': $scope.compData.JS.slidermargin
                    });
                }

            }
            ;

            $scope.changeStatebyIndex = function(indexno) {
                $scope.changeState(indexno);
                $scope.index = indexno;
            }

            $scope.changeState = function(indexno) {

                var bulletIcon = $element[0].querySelector('#slider_bullet_' + indexno);

                if ($scope.compData.JS.dataset) {

                    for (i = 0; i <= $scope.maxindex - 1; i++) {
                        angular.element($element[0].querySelector('#slider_bullet_' + i)).css({
                            'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state0.background_color
                        });
                    }
                }
                angular.element(bulletIcon).css({
                    'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state1.background_color
                });


                if ($scope.compData.JS.dataset) {



                    if ($scope.compData.JS.dataset[indexno].imageurl) {
                        angular.element($element[0].children[0].children[0]).css({
                            'background-image': 'url("' + $scope.compData.JS.dataset[indexno].imageurl + '")',
                        });
                    }
                    if ($scope.compData.JS.dataset[indexno].title) {
                        angular.element($element[0].children[0].children[1]).html($scope.compData.JS.dataset[indexno].title);
                    }

                }

            }
            ;

            $scope.eventMap['setAdvertiseData'] = $scope.setAdvertiseData;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });


            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });


        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = attrs.ppageid || ctrl.pageID;
            scope.componentType = 'slider';
            scope.init();
        }
    };
}
]);
