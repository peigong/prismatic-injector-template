uiCore.directive('packageactivity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_packageactivity" >' + '<div class="c60_fbar_pkgact_result_con" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="c60_fbar_tc_activity_con">' + '<div class="c60_fbar_pwrapper"><div style="width:100%;height:100%;position:relative">' + '<ul simplescroll>' + '<li ng-repeat="package in respData.packages" ccid="c60_fbar_icon_click" ng-click="iconClick($index);$event.stopPropagation();">' + '<div class="c60_fbar_taocan_type_list">' + '<div class="c60_fbar_type_name c60_fbar_clearfloat">' + '<div class="c60_fbar_name">{{package.packageName}}（<span class="c60_fbar_txt_orange">{{package.packagePrice}}</span>{{package.priceUnit}}）</div>' + '<div class="c60_fbar_arrow_btn">' + '<span class="c60_fbar_arrow_right" ng-style="getIconStyle($index)"></span>' + '<span class="c60_fbar_buy_btn" ccid="c60_fbar_buy_btn" ng-click="popDown($index);$event.stopPropagation();" ng-style="getBtnStyle($index)">立即订购</span>' + '	</div>' + '</div>' + '<div class="c60_fbar_type_txt" ng-style="getOptionStyle($index)">{{package.packageDesc}}</div>' + '</div>' + '</li></ul></div>' + '</div>' + '<div class="c60_fbar_activity_tips">' + '<div class="c60_fbar_activity_tips_tit">活动须知</div>' + '  <div class="c60_fbar_activity_tips_txt">{{activityDesc}}</div>' + '<div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_mbg_pop_block\':true}"  ng-click="$event.stopPropagation();" ng-show="flag"></div>' + '<div ng-class="{\'c60_fbar_mpop_block\':true}"  ng-show="flag">' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="recedata.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}">确认订购<span ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="packageName"></span>？</div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span>' + '<span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_pkgact_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="recedata.effectiveWay0"></span>' + '<span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_pkgact_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="recedata.effectiveWay1"></span></span></div>' + '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="recedata.effectiveWay"></span></div></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}" ccid="c60_fbar_left_itbtn" ng-style="popBlock(\'cancel\')" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ccid="c60_fbar_right_itbtn" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_pkgact_btn" ng-click="popSubmit()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.flag = false;
            $scope.eventMap = {};
            $scope.popDown = function(index) {
                $scope.obj = $scope.respData.packages[index];
                $scope.packageName = "【" + $scope.obj.packageName + "】";
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                    "id": $scope.obj.packageID
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_buy_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.obj.packageID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_buy_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            $scope.popBlock = function(type) {
                if (type != null  && type != undefined) {
                    if (type == 'ico') {
                        return $scope.compData.JS.popblockconfig.JS.icoconfig;
                    } else if (type == 'packagename') {
                        return $scope.compData.JS.popblockconfig.JS.packagenameconfig;
                    } else if (type == 'cancel') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state0;
                    } else if (type == 'submit') {
                        return $scope.compData.JS.popblockconfig.JS.btnconfig.state1;
                    }
                }
            }
            ;
            $scope.effectiveLeftRight = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        if ($scope.effectiveLeftRightFlag == 1) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else {
                        if ($scope.effectiveLeftRightFlag == 0) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    }
                }
            }
            ;
            $scope.checkEffectiveClick = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag = 1;
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_effective1.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + "_" + 'effectway_0'
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_effective1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.flowUpshiftFlag = '1';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_effective2.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + "_" + 'effectway_1'
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_effective2.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;

            $scope.getInfo = function(param) {
                if (param != null  && param != undefined) {
                    $scope.recedata = param.respparam;
                    if ($scope.recedata.packageId != null  && $scope.recedata.packageId != undefined && $scope.recedata.effectiveWay != null  && $scope.recedata.effectiveWay != undefined) {
                        var temp = {};
                        temp.phoneNo = $scope.recedata.msisdn.replace($scope.recedata.msisdn.substr($scope.recedata.msisdn.length == 11 ? 3 : 4, 4), "****") + '，您好';
                        if ($scope.recedata.effectiveWay == 0) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else if ($scope.recedata.effectiveWay == 1) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else if ($scope.recedata.effectiveWay == 2) {
                            temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                            temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                            $scope.effectiveWayFlag = 1;
                            $scope.flowUpshiftFlag = '1';
                        } else if ($scope.recedata.effectiveWay == 4) {
                            temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[4].value;
                            $scope.effectiveWayFlag = 0;
                            $scope.flowUpshiftFlag = $scope.recedata.effectiveWay;
                        } else {
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                "errorcode": $scope.compData.JS.errorcode
                            });
                            return false;
                        }
                        $scope.recedata = temp;
                        $scope.flag = 1;
                        angular.element($element[0].querySelector('.c60_fbar_mbg_pop_block')).css({
                            'z-index': '4444443647888'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_mpop_block')).css({
                            'z-index': '4444443647889'
                        });
                        $scope.effectiveLeftRightFlag = 0;
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                            "errorcode": $scope.compData.JS.errorcode
                        });
                    }
                } else {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                        "errorcode": $scope.compData.JS.errorcode
                    });
                }
            }
            ;

            $scope.popBlockHide = function() {
                $scope.flag = false;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'cancelbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.cdrData = null ;
            }
            ;
            $scope.popSubmit = function() {
                var inputData = {
                    "id": $scope.obj.packageID,
                    "flowUpshiftFlag": $scope.flowUpshiftFlag,
                    "saleid": $scope.obj.saleID,
                    "epageId": top.tlbs.ordersrc
                };
                if (null  != top.tlbs.cdrData) {
                    inputData['epageId'] = top.tlbs.cdrData.pageId || '';
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click1', inputData);
                $scope.flag = false;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_pkgact_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'submitbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_pkgact_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.cdrData = null ;
            }
            $scope.iconClick = function(item) {
                $scope.compData.JS.native.JS.index = item;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_icon_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'recordbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_icon_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;

            $scope.getBtnStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.btn.statusconfig.state0;
                } else {
                    return $scope.compData.JS.native.JS.btn.statusconfig.state;
                }
            }
            ;

            $scope.getIconStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.icon.statusconfig.state;
                } else {
                    return $scope.compData.JS.native.JS.icon.statusconfig.state0;
                }
            }
            ;
            $scope.getOptionStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.option.statusconfig.state0;
                } else {
                    return $scope.compData.JS.native.JS.option.statusconfig.state;
                }
            }
            ;
            $scope.updateData = function(param) {
                $scope.respData = param.respparam;
                if ($scope.respData && $scope.respData.packages && $scope.respData.packages.length > 0) {
                    $scope.showSuccess();
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.c60_fbar_pwrapper')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips')).css({
                    "background-color": "#fff"
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips_tit')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_activity_tips_txt')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status = 0;
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    if ($scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_pkgact_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS != null  && $scope.compData.JS != undefined && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_pkgact_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_pkgact_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css(properties.CSS);
                $scope.activityDesc = $scope.compData.JS.activityDesc;
            }
            ;
            $scope.initPage = function() {
                coreService.fireEvent($element.attr('cid'), 'init', {
                    "activityID": $scope.compData.JS.activityID
                });
            }
            ;
            $scope.error = function() {
                $scope.showError();
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
            $scope.eventMap['getInfo'] = $scope.getInfo;
            $scope.eventMap['initPage'] = $scope.initPage;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'packageactivity';
            $scope.init();
        }
    }
}
]);
