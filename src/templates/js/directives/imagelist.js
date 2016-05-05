uiCore.directive('imagelist', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_imagelist">' + '<div class="c60_fbar_imagelist_wrapper" ng-style="wrapperstyle">' + '<div ng-style="image.imagestyle" ng-click="weblink($index,image);$event.stopPropagation()" ng-repeat="image in imagearray" class="c60_fbar_imagelist_image_container" ccid="c60_fbar_link_click">' + '</div></div>' + '<div class="c60_fbar_circle_dotted_con">' + '<span class="c60_fbar_circle_dotted" ng-repeat="image in imagearray" ng-style="getStyle($index)"></span>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "display": 'block'
                },
                JS: {}
            };

            $scope.updateData = function(param) {
                var temp = param.respparam.adlocation || [];
                $scope.wrapperstyle = {
                    'width': temp.length * 100 + '%'
                };
                $scope.totallength = temp.length;
                for (var i = 0; i < temp.length; i++) {
                    temp[i].imagestyle = {
                        'background-image': 'url(' + temp[i].imageurl + ')',
                        'width': (100 / temp.length) + '%'
                    };
                }
                $scope.imagearray = temp;
            }
            ;
            $scope.weblink = function(index, image) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': image.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: image.linktype,
                    url: image.weblink
                });
            }
            ;
            $scope.getStyle = function(index) {
                if ($scope.totallength > 1) {
                    if (index == $scope.currentIndex) {
                        return {
                            'background-color': '#FFF'
                        }
                    } else {
                        return {
                            'background-color': ''
                        }
                    }
                } else {
                    return {
                        'display': 'none'
                    }
                }
            }
            ;

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                var param = {
                    'adlocation': $scope.compData.JS.adposid
                }
                coreService.fireEvent($element.attr('cid'), 'init', param);
                $scope.drag();
            }
            ;

            $scope.currentIndex = 0;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                imagecontainer.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                imagecontainer.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                });
                imagecontainer.bind(_touchend, function(e) {
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    if (xdistance < 0) {
                        if ($scope.currentIndex < $scope.totallength - 1) {
                            $scope.currentIndex = $scope.currentIndex + 1;
                        }
                    } else {
                        if ($scope.currentIndex > 0) {
                            $scope.currentIndex = $scope.currentIndex - 1;
                        }
                    }
                    $scope.$apply();
                    $scope.slide($scope.currentIndex, $scope.totallength);
                });
            }
            ;


            $scope.slide = function(index, length) {
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                var percent = index * 100 / length;
                var cssvalue = 'translate(-' + percent + '%,0px)';
                imagecontainer.css({
                    '-webkit-transform': cssvalue,
                    '-moz-transform': cssvalue,
                    '-ms-transform': cssvalue,
                    '-o-transform': cssvalue
                });
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
            $scope.eventMap['update'] = $scope.updateData;
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'imagelist';
            $scope.init();
        }
    }
}
]);
