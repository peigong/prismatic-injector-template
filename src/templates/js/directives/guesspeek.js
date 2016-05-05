uiCore.directive('guesspeek', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_c60_toolbar_aodi_con">' + '<span class="c60_fbar_c60_toolbar_aodi_img" ccid="c60_toolbar_aodi_img" ng-style="getStyle(\'c60_toolbar_aodi_img\')" ng-click="click(\'c60_toolbar_aodi_img\')"></span>' + '<span class="c60_fbar_c60_toolbar_aodi_close" ccid="c60_fbar_c60_toolbar_aodi_close" ng-style="getStyle(\'c60_toolbar_aodi_close\')" ng-click="click(\'c60_toolbar_aodi_close\');$event.stopPropagation();" ng-bind="compData.JS.c60_toolbar_aodi_close.JS.text"></span>' + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            var myClick = {
                //跳转到第三方页面
                c60_toolbar_aodi_img: function(param) {
                    if ($scope.compData.JS.compdata.imgLink) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'pictClk')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.compdata.imgLink);
                    }

                },
                c60_toolbar_aodi_close: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'close')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goback');
                }
            };
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_toolbar_aodi_img':
                    myClick.c60_toolbar_aodi_img(param);
                    break;
                case 'c60_toolbar_aodi_close':
                    //返回到猜品牌页面
                    myClick.c60_toolbar_aodi_close(param);
                    break;
                default:

                }
            }
            ;
            $scope.getDataInit = function(inputData) {
                if (inputData != undefined && Object.keys(inputData).length > 0) {
                    $scope.compData.JS.compdata = inputData;
                    if ($scope.compData.JS.compdata && $scope.compData.JS.compdata.imgUrl) {
                        angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_aodi_img')).css('background-image', 'url(' + $scope.compData.JS.compdata.imgUrl + ')');
                    }
                }
            }
            ;
            $scope.eventMap['getDataInit'] = $scope.getDataInit;

            //处理所有元素样式
            $scope.getStyle = function(classname) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisuccess');
                //						$scope.revData = inputData;
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "guesspeek";
            $scope.init();
        }
    };
});
