uiCore.directive('mine', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template:
        '<div>'

        + '   <div class="c60_fbar_bg_black_pop2" ng-style="getbg_black_popStyle()">'
        + '    <div class="c60_fbar_tips_txt2" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>'
        + '   </div>'

        + '<div class="c60_fbar_my_con2" ng-style="getStyle(\'c60_fbar_my_con\')">'
        + '   <div class="c60_fbar_my_top2 clearfloat" ng-style="getStyle(\'my_top\')" ng-show="compData.JS.c60_fbar_my_con.JS.isShow">'
        + '    <div class="c60_fbar_my_img_txt2" ng-style="getStyle(\'my_img_txt\')">'
        + '     <span class="c60_fbar_mybg_green2" ng-style="getStyle(\'c60_fbar_mybg_green\')" ng-show="compData.JS.c60_fbar_mybg_green.JS.isShow"></span>'
        + '     <div class="c60_fbar_my_txt2" ng-style="getStyle(\'my_txt\')" ng-show="compData.JS.c60_fbar_c60_fbar_moblie.JS.isShow">'
        + '      <p class="c60_fbar_moblie2" ng-bind="phoneFilter(revData.respparam.msisdn)" ng-style="getStyle(\'moblie\')"></p>'
        + '     </div>'
        + '    </div>'
        + '    <div class="c60_fbar_attend_btn2" ccid="c60_fbar_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn.JS.isShow">'
        + '     <a class="c60_fbar_attend_btn_link2" ng-style="getattend_btn_linkStyle()" ng-bind="getattend_btn_linkBtn()"></a>'
        + '    </div>'
        + '   </div>'
        + '   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">'
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">'
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">'
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">'
        + '       <span class="c60_fbar_my_coin2" ng-style="getStyle(\'c60_fbar_my_coin\')" ng-bind="compData.JS.c60_fbar_my_coin.JS.text"></span><span class="c60_fbar_coin_txt_bold" ng-bind="revData.respparam.total" ng-show="compData.JS.c60_fbar_coin_txt_bold.JS.isShow" ng-style="getStyle(\'c60_fbar_coin_txt_bold\')"></span>'
        + '      </div>'
        + '      <div class="c60_fbar_arrow_jump2">'
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text1.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text1.JS.text"></span>'
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico1\')"></span>'
        + '      </div>'
        + '     </div>'
        + '    </div>'
        + '   </div>'
        + ' <div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>'
        + '   <div class="c60_fbar_my_list_con2 c60_fbar_my_list_con22" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">'
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">'
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">'
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">'
        + '       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_privilege\')" ng-bind="compData.JS.c60_fbar_privilege.JS.text"></span><span class="c60_fbar_privilege_redpoint" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.redPointShow"></span>'
        + '      </div>'
        + '      <div class="c60_fbar_arrow_jump2">'
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>'
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>'
        + '      </div>'
        + '     </div>'
        + '    </div>'
        + '   </div>'
        + '   <div class="c60_fbar_my_list_con2" ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">'
        + '    <div class="c60_fbar_my_list2" ng-style="getStyle(\'my_list\')">'
        + '     <div class="c60_fbar_my_list_detail2 clearfloat" ng-style="getStyle(\'my_list_detail\')">'
        + '      <div class="c60_fbar_cointitle2" ng-style="getStyle(\'cointitle\')">'
        + '       <span class="c60_fbar_set2" ng-style="getStyle(\'c60_fbar_set\')" ng-bind="compData.JS.c60_fbar_set.JS.text"></span>'
        + '      </div>'
        + '      <div class="c60_fbar_arrow_jump2">'
        + '       <span class="c60_fbar_arrow_jump_text2" ng-show="compData.JS.c60_fbar_arrow_jump_text2.JS.isShow" ng-bind="compData.JS.c60_fbar_arrow_jump_text2.JS.text"></span>'
        + '       <span class="c60_fbar_arrow_jump_ico2" ng-style="getStyle(\'c60_fbar_arrow_jump_ico2\')"></span>'
        + '      </div>'
        + '     </div>'
        + '    </div>'
        + '   </div>'
        + '   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();" >'
        + '     <span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')" ></span>'
        + '  </div>'
        + '</div>'
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
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
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
            };
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == '1') {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.getattend_btn_linkStyle = function() {
                if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '0') {
                    return $scope.compData.JS.attend_btn_link.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.attend_btn_link.JS.stateconfig.state1;
                }
            }
            ;
            $scope.getattend_btn_linkBtn = function() {
                if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '0') {
                    return $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1
                } else {
                    return $scope.compData.JS.c60_fbar_attend_btn_link.JS.text2;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = '1';
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop2')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = '0';
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop2')).css({
                        'display': 'none'
                    });
                }, parseInt($scope.compData.JS.bg_black_pop.JS.stateconfig.time) * 1000);
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                         $scope.$apply();
                     });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //                     coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init',{'startNote':'1','noteNo':'10'});
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.revData = inputData;
                    var ret = inputData.respparam;
                    //判断是否可以签到
                    if (ret.signflag == '1') {
                        $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '0';
                    } else {
                        $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                    }
                }
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.signRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    var ret = inputData.respparam;
                    if (ret.signtype == '111001') {
                        //签到成功
                        if (ret.status == '2015522' || ret.status == '2015524') {
                            $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                            $scope.bg_black_popShow($scope.compData.JS.tips2 + ret.vaIncreased + $scope.compData.JS.tips3);
                            $scope.revData.respparam.total = Number($scope.revData.respparam.total) + Number(inputData.respparam.vaIncreased);
                            //var param={"respparam":inputData.respparam};
                            //coreService.fireEvent($scope.cid, 'updateCoinsTotal',param);
                        } else if (ret.status == '9206') {
                            //余额不足
                            $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                            $scope.bg_black_popShow($scope.compData.JS.tips4);
                        } else {
                            //签到失败
                            angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state0);
                            $scope.compData.JS.stateconfig.state = '0';
                            $scope.bg_black_popShow($scope.compData.JS.tips5);
                        }
                    } else {
                        //签到失败
                        angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state0);
                        $scope.compData.JS.stateconfig.state = '0';
                        $scope.bg_black_popShow($scope.compData.JS.tips5);
                    }
                }
            }
            ;
            var myClick = {
                c60_fbar_my_list_coin: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'coin')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'coinclick');
                },
                c60_fbar_my_list_privilege: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'privilege')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'privilegeclick');
                },
                c60_fbar_my_list_set: function(param) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'set')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'mysetclick');
                },
                c60_fbar_attend_btn: function(param) {
                    if ($scope.compData.JS.stateconfig.state == '1') {
                        return false;
                    }
                    if ($scope.compData.JS.attend_btn_link.JS.stateconfig.state == '1') {
                        return false;
                    }
                    //跟踪话单
                    $scope.compData.JS.stateconfig.state = '1';
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_attend_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'attend')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_attend_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_attend_btn_link2')).css($scope.compData.JS.stateconfig.state1);
                    $scope.bg_black_popShow($scope.compData.JS.tips1);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'myattendClick', {
                        "id": ""
                    });
                },
                c60_fbar_my_add_desktop: function(param) {
                    //*******************添加到桌面*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'desktop')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var u = navigator.userAgent;
                    if (/(android|Android)/ig.test(u))
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.androidurl);
                    }
                    else if (/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(u))
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.iosurl);
                    } else if (u.indexOf('Windows Phone') > -1) {

                    }
                }
            };
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname)
                {
                case 'c60_fbar_my_list_coin':
                    myClick.c60_fbar_my_list_coin(param);
                    break;
                case 'c60_fbar_my_list_privilege':
                    myClick.c60_fbar_my_list_privilege(param);
                    break;
                case 'c60_fbar_my_add_desktop':
                    myClick.c60_fbar_my_add_desktop(param);
                    break;
                case 'c60_fbar_my_list_set':
                    myClick.c60_fbar_my_list_set(param);
                    break;
                case 'c60_fbar_attend_btn':
                    myClick.c60_fbar_attend_btn(param);
                    break;
                default:

                }
            }
            ;
            $scope.eventMap['signRet'] = $scope.signRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

            $scope.updateCoinsTotal = function(param) {
                if (null  != param && null  != param.respparam && undefined != param.respparam && null  != param.respparam.vaIncreased && undefined != param.respparam.vaIncreased) {
                    $scope.revData.respparam.total = Number($scope.revData.respparam.total) + Number(param.respparam.vaIncreased);
                }
                if (param.respparam.status == '2015522' || param.respparam.status == '2015524') {
                    $scope.compData.JS.attend_btn_link.JS.stateconfig.state = '1';
                }
            }
            ;
            $scope.eventMap['updateCoinsTotal'] = $scope.updateCoinsTotal;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmine";
            $scope.init();
        }
    };
});
