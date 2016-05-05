uiCore.directive('taocanresult', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_taocan_result_con1">' + '<div class="c60_fbar_datouwang8">' + '<div class="c60_fbar_datouwang8-container c60_fbar_container1">' + '<div class="c60_fbar_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div>' + '</div>' + '<div class="c60_fbar_datouwang8-container c60_fbar_container2">' + '<div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div>' + '</div>' + '<div class="c60_fbar_datouwang8-container c60_fbar_container3">' + '<div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div>' + '<div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div>' + '</div>' + '</div>' + '<div class="c60_fbar_tips_txt_loading" ng-bind="compData.JS.loadingtext.JS.textdata"></div>' + '</div>' + '<div class="c60_fbar_taocan_result_con2">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_succ_img"  ng-style="{\'background-image\':\'url(\'+taocanresult.imgUrl+\')\'}"/></span></div>' + '<div class="c60_fbar_tips_txt1"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresult.btntxt" ng-click="returnclick(taocanresult.action)"></a></div>' + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};
            $scope.gobackClick = function() {}
            ;
            var loadingel = null ;
            var resultel = null ;
            var descel = null ;
            $scope.loadingData = function(param) {
                $element.css({
                    "display": "block"
                });
                loadingel.css({
                    'display': 'block'
                });
                resultel.css({
                    'display': 'none'
                });

            }
            ;

            $scope.errorData = function(param) {
                var JS = $scope.compData.JS.resultsconfig.JS;
                var temp = null ;
                if (param.errorcode != null  && param.errorcode != undefined) {
                    $scope.result = param.errorcode;
                    if (JS[$scope.result] != null  && JS[$scope.result] != undefined) {
                        temp = JS[$scope.result];
                    } else {
                        temp = JS['default'];
                    }
                } else {
                    temp = JS['default'];
                }
                loadingel.css({
                    'display': 'none'
                });
                resultel.css({
                    'display': 'block'
                });
                temp.imgUrl = temp.imgUrl.replace(/'/g, '');
                $scope.taocanresult = temp;
                descel.innerHTML = $scope.taocanresult.tipstxt;
                coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
                    "state": temp.backaction || '0'
                });

            }
            $scope.updateData = function(param) {
                var JS = $scope.compData.JS.resultsconfig.JS;
                var temp = null ;
                if (param.respparam.subscribtionstatus != null  && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus != "") {
                    $scope.result = param.respparam.subscribtionstatus;
                    //后台没有找到对应错误码，将原始接口错误信息直接通过suberrordesc返回到前台
                    if ($scope.result == JS['defaultErrorCode']) {
                        temp = JS['default'];
                        if (param.respparam.suberrordesc != "" && param.respparam.suberrordesc != null  && param.respparam.suberrordesc != undefined) {
                            temp.tipstxt = param.respparam.suberrordesc || "";
                        }
                    } else {
                        //找到对应的错误码
                        temp = JS[$scope.result];
                        //当返回的错误码前台没有对应信息后，显示默认错误码
                        if (temp == undefined || temp == null  || temp == "") {
                            temp = JS['default'];
                        }
                    }
                } else {
                    temp = JS['default'];
                }
                loadingel.css({
                    'display': 'none'
                });
                resultel.css({
                    'display': 'block'
                });
                temp.imgUrl = temp.imgUrl.replace(/'/g, '');
                $scope.taocanresult = temp;
                descel.innerHTML = $scope.taocanresult.tipstxt;
                coreService.fireEvent($element.attr('cid'), 'changebackbtn', {
                    "state": temp.backaction || '0'
                });
            }
            ;

            $scope.getparam = function(name) {
                try {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                    var r = top.window.location.search.substr(1).match(reg);
                    if (r != null )
                        return unescape(r[2]);
                    return "";
                } catch (e) {}
            }
            ;

            $scope.returnclick = function(type) {
                //                    coreUtils.addToLocalStorage("cdrcid", "c60_fbar_link_btn");
                if (type == '0') {
                    //用于appbar直接显示页面订购
                    if ($scope.getparam('appkey') && $scope.getparam('subscribeid'))
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1');
                    else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
                    }

                } else if (type == '1') {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1');
                } else if (type == '3') {

                    $element.css({
                        'display': 'none'
                    });
                    loadingel.css({
                        'display': 'none'
                    });
                    resultel.css({
                        'display': 'none'
                    });

                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'returnbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                loadingel = angular.element($element[0].querySelector('.c60_fbar_taocan_result_con1'));
                resultel = angular.element($element[0].querySelector('.c60_fbar_taocan_result_con2'));
                descel = $element[0].querySelector(".c60_fbar_tips_txt1");
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
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['error'] = $scope.errorData;
            $scope.eventMap['loading'] = $scope.loadingData;

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
