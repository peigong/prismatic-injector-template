uiCore.directive('money', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="gmainmoney">' + '<div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div>' + '</div>' + '<div class="c60_fbar_myGold c60_fbar_titleNumDesc" >' + '<h5 class="c60_fbar_titleNumDesc-Title">我的金币<span class="c60_fbar_titleNumDesc-Num">{{compData.JS.respparam.total}}</span></h5>' + '<p class="c60_fbar_titleNumDesc-Desc"></p>' + '</div>' + '<div class="c60_fbar_money_result_con" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_money_succ_img"  ng-style="taocanresulturl()"></span></div>' + '<div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="c60_fbar_mwrapper"  id="gcwrapper">' + '<ul class="c60_fbar_cimgTitleList" simplescroll>' + '<li ng-repeat="commpany in compData.JS.respparam.commpany" ng-class="{\'c60_fbar_imgTitlem\':true}"><img ng-src="{{commpany.image}}" ng-class="{\'c60_fbar_imgTitle-Img\':true}" /><p ng-class="{\'c60_fbar_imgTitle-Title\':true}" >{{commpany.description}}</p><span ng-click="myclick(commpany,$index);$event.stopPropagation();" ng-class="{\'c60_fbar_imgTitle_Btn\':true}" >{{commpany.signflag==1?\'签到\':\'去逛逛\'}}</span></li>' + '</ul>' + '</div>' + '<div class="c60_fbar_bg_pop_block" ng-click="$event.stopPropagation();"></div>' + '<div class="c60_fbar_pop_block">' + '<div class="c60_fbar_img_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' + '<tr>' + '<td><span class="c60_fbar_goldIcon" ng-style="getStyle({goldIcon:1})"></span></td>' + '<td>' + '<div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3">{{signRes}}</span><span  class="c60_fbar_pop_txt3 c60_fbar_txt_blue">{{commpanyname}}</span><span  class="c60_fbar_pop_txt3" ng-bind="signTips"></span><span  class="c60_fbar_pop_txt3" style="color:red;" ng-bind="vaIncreased"></span><span  class="c60_fbar_pop_txt3" ng-bind="signTips1"></span></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_img_txt_btn c60_fbar_clearfloat">' + '<div class="c60_fbar_left_itbtn" ng-click="signOther()">{{signOtherComp}}</div>' + '<div class="c60_fbar_right_itbtn" ng-click="goShopping(golink)">{{rightbtnOption}}</div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    "c60_fbar_imgTitle_Btn": {
                        "CSS": {},
                        "JS": {
                            "stateconfig": {
                                "state": 0,
                                "state0": {
                                    "background-color": "#fff",
                                },
                                "state1": {
                                    "background-color": "#cacecd",
                                }
                            }
                        }
                    }
                }
            };
            $scope.eventMap = {};
            var timeout = null ;
            $scope.getStyle = function(input) {
                var classname;
                for (item in input) {
                    classname = item;
                    break;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(callback) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
            }
            ;
            $scope.popDown = function() {
                coreService.fireEvent($element.attr('cid'), 'showerror');
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'z-index': '2047483647888'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'z-index': '2047483647889'
                });
            }

            $scope.myclick = function(commpany, index) {
                if ($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state == 1) {
                    return false;
                }
                if (index != null  && index != undefined && commpany != null  && commpany != undefined) {
                    $scope.compData.JS.index = index;
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': commpany.commpanyid
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.obj = commpany;
                    if (commpany.signflag == '1') {
                        $scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelectorAll('.c60_fbar_imgTitle_Btn')).css($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state1);
                        $scope.bg_black_popShow();
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                            "id": commpany.commpanyid
                        });
                    } else if (commpany.signflag == '0') {
                        window.open(commpany.link);
                    }
                }
            }
            ;

            $scope.signOther = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'leftBtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }

            $scope.goShopping = function(link) {
                if (link != null  && link != undefined) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'rightBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.sign.isFailed) {
                        angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                            'display': 'none'
                        });
                    } else {
                        angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                            'display': 'none'
                        });
                        window.open(link);
                    }
                    coreService.fireEvent($element.attr('cid'), 'showsucc');
                }
            }
            ;

            $scope.updateData = function(param) {
                $scope.compData.JS.respparam = param.respparam;
                if (param.respparam.commpany && param.respparam.total.length > 0 && param.respparam.commpany.length > 0) {
                    $scope.compData.JS.respparam.total = param.respparam.total;
                    $scope.showSuccess();
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.gmainmoney')).css({
                    'background': '#fff'
                });
                angular.element($element[0].querySelector('.c60_fbar_money_result_con')).css({
                    'background': '#fff'
                });
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status = 0;
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    if ($scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_money_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].imgUrl;
                    var imgval = imgUrl.replace(/'/g, '');
                    if (imgval) {
                        return {
                            "background-image": "url(" + imgval + ")"
                        };
                    } else {
                        return {};
                    }
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_money_result_con != null  && $scope.compData.JS.c60_fbar_money_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_money_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.updateCoinsTotal = function(param) {
                if (null  != param.respparam.vaIncreased || undefined != param.respparam.vaIncreased) {
                    $scope.compData.JS.respparam.total = Number($scope.compData.JS.respparam.total) + Number(param.respparam.vaIncreased);
                }
            }
            ;

            $scope.signData = function(param) {
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'none'
                });
                $scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state = 0;
                angular.element($element[0].querySelectorAll('.c60_fbar_imgTitle_Btn')).css($scope.compData.JS.c60_fbar_imgTitle_Btn.JS.stateconfig.state0);
                if (param != null  && param != undefined) {
                    $scope.compData.JS.status = param.respparam.status;
                    $scope.compData.JS.desc = param.respparam.desc;
                    $scope.compData.JS.vaIncreased = param.respparam.vaIncreased;
                    if ($scope.compData.JS.status != null  && $scope.compData.JS.status != undefined) {
                        if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status3 || $scope.compData.JS.status == $scope.compData.JS.sign.status.status1) {
                            $scope.compData.JS.respparam.total = Number($scope.compData.JS.respparam.total) + Number($scope.compData.JS.vaIncreased);
                            $scope.obj.signflag = '0';
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option0;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option2;
                            $scope.signRes = $scope.compData.JS.sign.text.text0.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text0.signTips;
                            $scope.signTips1 = $scope.compData.JS.sign.text.text0.signTips1;
                            $scope.vaIncreased = $scope.compData.JS.vaIncreased;
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.popDown();
                            coreService.fireEvent($scope.cid, 'coinIncreased', param);
                        } else if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status4) {
                            $scope.obj.signflag = '0';
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option1;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option2;
                            $scope.signRes = $scope.compData.JS.sign.text.text1.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text1.signTips;
                            $scope.signTips1 = "";
                            $scope.vaIncreased = "";
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.popDown();
                        } else if ($scope.compData.JS.status == $scope.compData.JS.sign.status.status5) {
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updaterror', {
                                "errorcode": $scope.compData.JS.errorcode
                            });
                        } else {
                            $scope.compData.JS.sign.isFailed = true;
                            $scope.signOtherComp = $scope.compData.JS.sign.option.option1;
                            $scope.rightbtnOption = $scope.compData.JS.sign.option.option0;
                            $scope.signRes = $scope.compData.JS.sign.text.text2.signRes;
                            $scope.signTips = $scope.compData.JS.sign.text.text2.signTips;
                            $scope.signTips1 = "";
                            $scope.vaIncreased = "";
                            $scope.commpanyname = $scope.obj.name;
                            $scope.golink = $scope.obj.link;
                            $scope.compData.JS.vaIncreased = "";
                            $scope.popDown();
                        }
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
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.compData.css = $scope.compData.CSS || {};
                $scope.compData.JS = $scope.compData.JS || {};
                $element.css($scope.compData.CSS);
                //coreService.fireEvent($element.attr('cid'), 'init',{"total": ""});
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
            $scope.eventMap['signData'] = $scope.signData;
            $scope.eventMap['updateCoinsTotal'] = $scope.updateCoinsTotal;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.path = top.tlbs.templatePath;
            $scope.init();

        }
    }
}
]);
