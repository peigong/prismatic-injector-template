uiCore.directive('msgbox', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template:
        '<div class="tbholder" style="display:block">'
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">'
        + '   <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.text"></div>'
        + '   </div>'
        //反馈页面----------start--------------
        /*
			+'    <div class="c60_fbar_new_center_pop hwlhide">'
			+'        <div class="c60_fbar_ncp_top">'
			+'        	<div class="c60_fbar_ncp_tit">'
			+'                <span class="c60_fbar_ncp_tit_txt">反馈回复</span>'
			+'                <span class="c60_fbar_ncp_tit_close"></span>'
			+'            </div>'
			+'        	<div class="c60_fbar_ncp_bottom">'
			+'            	<div class="c60_fbar_ncpb_txt">Q：我在使用toolbar的时候，不想看见的时候能 让它隐藏么？用的时候再打开。</div>'
			+'                <div class="c60_fbar_ncpb_txt">A：尊敬的用户，您好。<br/>首先谢谢您的积极反馈，我们也正在极力打造这样一个便捷操作，方便toolbar用户。<br/>预计该功能在下次更新中能让您体验到，预祝您身体健康，工作顺利。</div>'
			+'            </div>'
			+'        </div>'
			+'    </div>'
			*/
        //反馈页面----------end--------------
        //这边是确认弹出页面--------------start----------------

        + '<div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>'
        + '<div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">'
        + '	<div class="c60_fbar_img_txt_info">'
        + '    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">'
        + '        	<tr>'
        + '            	<td><span class="c60_fbar_haveatea"></span></td>'
        + '                <td>'
        + '                	<div class="c60_fbar_txt"><span ng-bind="phoneFilter(phoneNumber)"></span><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text1"></span></div>'
        + '                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text2"></span></div>'
        + '                	<div class="c60_fbar_txt"><span ng-bind="compData.JS.c60_fbar_pop_block_text.JS.text3"></span></div>'
        + '                </td>'
        + '            </tr>'
        + '        </table>'
        + '    </div>'
        + '    <div class="c60_fbar_img_txt_btn clearfloat">'
        + '        <div class="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>'
        + '        <div class="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>'
        + '    </div>'
        + '</div>'
        //这边是确认弹出页面--------------end----------------


        + '	<div class="c60_fbar_news_center_df" ng-bind="c60_fbar_news_center_dfText()" ng-click="click(\'c60_fbar_news_center_df\');$event.stopPropagation();"></div>'
        + '    <div class="c60_fbar_news_center">'
        + '    	<ul class="c60_fbar_nc_tabtit c60_fbar_clearfloat">'
        + '        	<li ng-style="c60_fbar_nc_tabtitStyle(0)" ng-click="click(\'c60_fbar_nc_tabtit0\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text0"></span><span ng-show="c60_fbar_nc_tabtitNum(0)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread0"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit0span.JS.text1"></span></span></li>'
        + '          <li ng-style="c60_fbar_nc_tabtitStyle(1)" ng-click="click(\'c60_fbar_nc_tabtit1\')"><span ng-bind="compData.JS.c60_fbar_nc_tabtit.JS.text1"></span><span ng-show="c60_fbar_nc_tabtitNum(1)"><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text0"></span><span ng-bind="compData.JS.c60_fbar_ncc_list.JS.unread1"></span><span ng-bind="compData.JS.c60_fbar_nc_tabtit1span.JS.text1"></span></span></li>'
        + '      </ul>'
        + '      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(0)">'
        + '        <div class="c60_fbar_nc_con c60_fbar_nc_container1" simplescroll>'
        + '        	<div class="c60_fbar_ncc_list" ng-style="c60_fbar_ncc_listStyle0(item.status)" ng-repeat="item in respData[0].list" ng-click="c60_fbar_ncc_lb_icoClick0($index);$event.stopPropagation();">'
        + '            	<div class="c60_fbar_ncc_list_top">'
        + '                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">'
        + '                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>'
        + '                        <a class="c60_fbar_ncc_lt_looktxt" ng-click="c60_fbar_ncc_listClick0($index);$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_ncc_lt_looktxt.JS.text"></a>'
        + '                    </div>'
        + '                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>'
        + '                </div>'
        + '                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">'
        + '                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>'
        + '                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show" ></span>'
        + '                </div>'
        + '            </div>'

        + '            <div class="c60_fbar_ncc_more0" ng-style="c60_fbar_ncc_moreStyle0();" ng-bind="compData.JS.c60_fbar_ncc_more0.JS.text" ng-click="click(\'c60_fbar_ncc_more0\')"></div>'
        + '            <div class="c60_fbar_ncc_nomore0" ><span class="c60_fbar_ncc_nomore_icotxt">no more...</span></div>'
        + '        </div>'

        + '        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">'
        + '            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>'
        + '            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>'
        + '        </div>'

        + '       </div>'


        + '      <div class="c60_fbar_msg_conlist" ng-style="c60_fbar_nc_conStyle(1)" >'
        + '        <div class="c60_fbar_nc_con c60_fbar_nc_container2" simplescroll>'
        + '        	<div class="c60_fbar_ncc_list" ng-click="c60_fbar_ncc_listClick1($index)" ng-style="c60_fbar_ncc_listStyle1(item.status)" ng-repeat="item in respData[1].list">'
        + '            	<div class="c60_fbar_ncc_list_top">'
        + '                	<div class="c60_fbar_ncc_lt_tit c60_fbar_clearfloat">'
        + '                    	<span class="c60_fbar_ncc_lt_title" ng-bind="getTitleType(item.category)"></span>'
        + '                    </div>'
        + '                    <div class="c60_fbar_ncc_lt_detailtxt" ng-bind-html="to_trusted(item.subject)"></div>'
        + '                </div>'
        + '                <div class="c60_fbar_ncc_list_bottom c60_fbar_clearfloat">'
        + '                	  <span class="c60_fbar_ncc_lb_time" ng-bind="formatTime(item.date)"></span>'
        + '                    <span class="c60_fbar_ncc_lb_ico_gray" ng-style="c60_fbar_ncc_lb_icoStyle(item.id)" ng-show="compData.JS.c60_fbar_ncc_list.JS.show"></span>'
        + '                </div>'
        + '            </div>'

        + '            <div class="c60_fbar_ncc_more1" ng-style="c60_fbar_ncc_moreStyle1();" ng-bind="compData.JS.c60_fbar_ncc_more1.JS.text" ng-click="click(\'c60_fbar_ncc_more1\')"></div>'
        + '            <div class="c60_fbar_ncc_nomore1" ><span class="c60_fbar_ncc_nomore_icotxt">no more...</span></div>'

        + '        </div>'

        + '        <div class="c60_fbar_news_center_del" ng-show="compData.JS.c60_fbar_news_center_del.JS.show">'
        + '            <div class="c60_fbar_news_center_delbtn" ng-style="c60_fbar_news_center_delbtnStyle()" ng-click="click(\'c60_fbar_news_center_del\')" ng-bind="compData.JS.c60_fbar_news_center_del.JS.text"></div>'
        + '            <span class="c60_fbar_ncc_lb_ico_gray_all" ng-style="c60_fbar_ncc_lb_ico_gray_allStyle()" ng-click="c60_fbar_ncc_lb_ico_gray_allClick();$event.stopPropagation();"></span>'
        + '        </div>'

        + '       </div>'
        + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        '$sce',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.respData = {};
            $scope.phoneNumber = "";
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                        $scope.$apply();
                    });*/
            }
            ;
            var stringToArray = function() {
                //记录选择删除的消息id
                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                $scope.compData.JS.c60_fbar_news_center_df.JS.index = 0;
                //显示通用消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                //记录用户点击删除按钮，默认用户没有点击
                $scope.compData.JS.c60_fbar_news_center_df.JS.del = false;

                //记录用户是否查看更多或者删除按钮
                $scope.compData.JS.moreDel = "init";
                $scope.compData.JS.c60_fbar_ncc_list.JS.msgids = [];

                //未读消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.unread0 = 0;
                $scope.compData.JS.c60_fbar_ncc_list.JS.unread1 = 0;
                //现在删除个数
                $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                //重新计算列表
                var ele = angular.element($element[0].querySelector('.c60_fbar_nc_con'));
                var totalDistance = "0";
                ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');

                //初始化通用消息和业务消息
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = 10;
                //通用消息目前总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = 10;
                //业务消息目前总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = 10;
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = 10;
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = 0;
                //通用消息上次返回总数
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = 0;
                //业务消息上次返回总数
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                stringToArray();
                //设置当前点击哪个更多查询，0表示通用消息，1表示业务消息，-1表示初始化
                $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = -1;

                $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "none");
                angular.element($element[0].querySelector('.c60_fbar_ncc_more2')).css("display", "none");
                $scope.compData.JS.delete0 = 0;
                $scope.compData.JS.delete1 = 0;
            }
            ;
            $scope.formatTime = function(time) {
                if (time && time.length >= 14) {
                    return time.substring(0, 4) + "年" + time.substring(4, 6) + "月" + time.substring(6, 8) + "日 " + time.substring(8, 10) + ":" + time.substring(10, 12);
                }
            }
            ;
            $scope.c60_fbar_ncc_listStyle0 = function(input) {
                return $scope.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state" + input];
            }
            ;
            $scope.c60_fbar_ncc_listStyle1 = function(input) {
                return $scope.compData.JS.c60_fbar_ncc_list.JS.stateconfig["state" + input];
            }
            ;
            $scope.c60_fbar_nc_tabtitStyle = function(index) {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == Number(index)) {
                    return $scope.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_nc_tabtit.JS.stateconfig.state1;
                }
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if (Number($scope.compData.JS.bg_black_pop.JS.stateconfig.state) == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.text = msg;
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
            $scope.c60_fbar_nc_conStyle = function(index) {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == Number(index)) {
                    return {
                        "display": "block"
                    };
                } else {
                    return {
                        "display": "none"
                    };
                }
            }
            ;
            $scope.getTitleType = function(type) {
                return $scope.compData.JS.titleType.JS[type];
            }
            ;
            //确认页面-----------start------------
            $scope.getbg_pop_blockStyle = function() {
                if (Number($scope.compData.JS.bg_pop_block.JS.stateconfig.status) == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.getpop_blockStyle = function() {
                if (Number($scope.compData.JS.pop_block.JS.stateconfig.status) == 0) {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status1;
                }
            }
            ;
            //确认页面-----------end------------
            //接收来自后台的数据:消息盒子列表请求
            $scope.queryMessageListRecvd = function(inputData) {
                if (inputData && inputData.respparam) {
                    //重置选择删除的记录
                    //                        $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    //                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                    //                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                    //                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    //                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                    if (inputData.respparam.messages.length == 0) {
                        $scope.respData = {
                            "phoneNumber": inputData.respparam.phoneNumber,
                            "messages": [{
                                "type": "0",
                                //0:通知消息 1:业务消息
                                "messagenumber": "0",
                                "unreadmessagenumber": "0",
                                "list": [
                                ]
                            }, {
                                "type": "1",
                                "messagenumber": "0",
                                "unreadmessagenumber": "0",
                                "list": [
                                ]

                            }
                            ]
                        };
                    } else if (inputData.respparam.messages.length == 2) {
                        $scope.respData = inputData.respparam.messages;
                        //重新计算列表
                        var ele = angular.element($element[0].querySelector('.c60_fbar_nc_container1'));
                        var totalDistance = "0";
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');

                        ele = angular.element($element[0].querySelector('.c60_fbar_nc_container2'));
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                    }
                    //                    	console.log("$scope.compData.JS.moreDel",$scope.compData.JS.moreDel);
                    if ($scope.compData.JS.moreDel == "delete") {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.moreDel = "init";
                        //重新计算列表
                        var ele = angular.element($element[0].querySelector('.c60_fbar_nc_container1'));
                        var totalDistance = "0";
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');

                        ele = angular.element($element[0].querySelector('.c60_fbar_nc_container2'));
                        ele.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        ele.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');

                        //初始化通用消息和业务消息
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = 10;
                        //通用消息目前总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = 10;
                        //业务消息目前总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = 10;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = 10;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = 0;
                        //通用消息上次返回总数
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = 0;
                        //业务消息上次返回总数
                    } else if ($scope.compData.JS.moreDel == "more0") {
                        $scope.respData[0] = inputData.respparam.messages[0];
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0;
                        if ((Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) && (($scope.compData.JS.delete0) == 1)) {
                            $scope.c60_fbar_ncc_lb_ico_gray_allClick("delmore");
                        }
                        $scope.compData.JS.moreDel = "init";
                    } else if ($scope.compData.JS.moreDel == "more1") {
                        $scope.respData[1] = inputData.respparam.messages[0];
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1;
                        if ((Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) && (($scope.compData.JS.delete1) == 1)) {
                            $scope.c60_fbar_ncc_lb_ico_gray_allClick("delmore");
                        }
                        $scope.compData.JS.moreDel = "init";
                    } else {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = -1;
                    }

                    //初次查询
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex) == -1) {
                        stringToArray();
                    }
                    //将电话号码初始化
                    $scope.phoneNumber = inputData.respparam.phoneNumber;

                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0 = $scope.respData[0].list.length;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1 = $scope.respData[1].list.length;

                    $scope.compData.JS.c60_fbar_ncc_list.JS.unread0 = Number($scope.respData[0].unreadmessagenumber);
                    $scope.compData.JS.c60_fbar_ncc_list.JS.unread1 = Number($scope.respData[1].unreadmessagenumber);

                }
            }
            ;
            $scope.c60_fbar_nc_tabtitNum = function(index) {
                //当未读为0时候隐藏
                if (index == 0) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.unread0) == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                if (index == 1) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.unread1) == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            $scope.eventMap['queryMessageListRecvd'] = $scope.queryMessageListRecvd;

            $scope.c60_fbar_ncc_moreStyle0 = function() {
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0) < 10) {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                        return;
                    }
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0 <= $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum0) {
                        //展示more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "none");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "block");
                        return;
                    } else {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                        return;
                    }
                } else {
                    //展示no more
                    angular.element($element[0].querySelector('.c60_fbar_ncc_nomore0')).css("display", "block");
                    angular.element($element[0].querySelector('.c60_fbar_ncc_more0')).css("display", "none");
                    return;
                }
            }
            ;
            $scope.c60_fbar_ncc_moreStyle1 = function() {

                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 1) {
                    if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1) < 10) {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                        return;
                    }
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1 <= $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastgetNum1) {
                        //展示more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "none");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "block");
                        return;
                    } else {
                        //展示no more
                        angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                        angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                        return;
                    }
                } else {
                    //展示no more
                    angular.element($element[0].querySelector('.c60_fbar_ncc_nomore1')).css("display", "block");
                    angular.element($element[0].querySelector('.c60_fbar_ncc_more1')).css("display", "none");
                    return;
                }
            }
            ;
            $scope.c60_fbar_news_center_delbtnStyle = function() {
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.count) != 0) {
                    $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state = "0";
                } else {
                    $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state = "1";
                }
                if (Number($scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state) == "0") {
                    return $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state1;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoStyle = function(msgid) {
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids.length > 0) {
                    if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                        $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 1;
                    } else {
                        $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 0;
                    }
                } else {
                    $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state = 0;
                }
                if (Number($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state) == 0) {
                    return $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_ncc_lb_ico.JS.stateconfig.state1;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoClick0 = function(index) {
                //当不是删除时候，点击没有效果
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                    return;
                }
                var msgid = $scope.respData[0].list[index].id;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'lbico0')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                } else {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_icoClick1 = function(index) {
                var msgid = $scope.respData[1].list[index].id;
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'lbico1')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                } else {
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                }
            }
            ;
            //点击每个通用消息，显示具体信息
            $scope.c60_fbar_ncc_listClick0 = function(index) {
                var msgid = $scope.respData[0].list[index].id;
                if (Number($scope.respData[0].list[index].status) == 0) {
                    $scope.compData.JS.c60_fbar_ncc_list.JS.msgids[msgid] = true;
                    if ($scope.compData.JS.c60_fbar_ncc_list.JS.unread0 > 0) {
                        $scope.compData.JS.c60_fbar_ncc_list.JS.unread0--;
                    }
                }
                $scope.respData[0].list[index].status = "1";
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_list.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'list0')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_list.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //将需要查看的消息id发送给后台
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageDetail', {
                    "messageid": msgid
                });
            }
            ;
            //点击每个通用消息，显示具体信息
            $scope.c60_fbar_ncc_listClick1 = function(index) {
                //当不是删除时候，点击没有效果
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 1) {
                    $scope.c60_fbar_ncc_lb_icoClick1(index);
                } else {
                    var msgid = $scope.respData[1].list[index].id;
                    if (Number($scope.respData[1].list[index].status) == 0) {
                        $scope.compData.JS.c60_fbar_ncc_list.JS.msgids[msgid] = true;
                        if ($scope.compData.JS.c60_fbar_ncc_list.JS.unread1 > 0) {
                            $scope.compData.JS.c60_fbar_ncc_list.JS.unread1--;
                        }
                    }
                    $scope.respData[1].list[index].status = "1";
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_list1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'list1')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_list1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                }
            }
            ;
            $scope.c60_fbar_ncc_lb_ico_gray_allStyle = function() {
                //通知消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    if (Number($scope.compData.JS.delete0) == 0) {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0;
                    } else {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1;
                    }
                } else {
                    if (Number($scope.compData.JS.delete1) == 0) {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state0;
                    } else {
                        return $scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.stateconfig.state1;
                    }
                }
            }
            $scope.c60_fbar_ncc_lb_ico_gray_allClick = function(param) {
                //通知消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 0) {
                    var list0 = $scope.respData[0].list;
                    var msgid;
                    //全部选择
                    if (param == "delmore") {
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                        return;
                    }
                    if (Number($scope.compData.JS.delete0) == 0) {
                        $scope.compData.JS.delete0 = 1;
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                    } else {
                        //全部取消
                        $scope.compData.JS.delete0 = 0;
                        for (item in list0) {
                            msgid = list0[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                            }
                        }
                    }
                }
                //业务消息
                if (Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex) == 1) {
                    var list1 = $scope.respData[1].list;
                    var msgid;
                    //全部选择
                    if (param == "delmore") {
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                        return;
                    }
                    if (Number($scope.compData.JS.delete1) == 0) {
                        $scope.compData.JS.delete1 = 1;
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] != true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = true;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count++;
                            }
                        }
                    } else {
                        //全部取消
                        $scope.compData.JS.delete1 = 0;
                        for (item in list1) {
                            msgid = list1[item].id;
                            if ($scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] == true) {
                                $scope.compData.JS.c60_fbar_news_center_df.JS.msgids[msgid] = false;
                                $scope.compData.JS.c60_fbar_news_center_df.JS.count--;
                            }
                        }
                    }
                }
                //记录话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'delallicon')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_lb_ico_gray_all.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            ;
            $scope.c60_fbar_news_center_dfText = function() {
                if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                    return $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.text0
                } else {
                    return $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.text1;
                }
            }
            ;
            //接收来自后台的数据:消息盒子删除请求返回,当前没有要求对返回进行处理
            $scope.deleteMessageDetailRecvd = function(inputData) {
                if (inputData && inputData.respparam) {
                    var ret = inputData.respparam.result
                    if (Number(ret) == 0) {
                        $scope.bg_black_popShow($scope.compData.JS.c60_fbar_right_itbtn.JS.text2);
                    } else {
                        $scope.bg_black_popShow($scope.compData.JS.c60_fbar_right_itbtn.JS.text3);
                    }
                    //重新发送请求列表
                    var param = {
                        "flag": "-2",
                        "startNum": "1",
                        "number": "10"
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                }
            }
            ;
            $scope.eventMap['deleteMessageDetailRecvd'] = $scope.deleteMessageDetailRecvd;
            var myClick = {
                c60_fbar_news_center_df: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_news_center_df.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'centerdf')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_news_center_df.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    //重置选择删除的记录
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                    //点击删除
                    if (Number($scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index) == 0) {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 1;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = true;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = true;
                        $scope.compData.JS.delete0 = 0;
                        $scope.compData.JS.delete1 = 0;
                    } else {
                        $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                        $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                        $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    }
                },
                c60_fbar_news_center_del: function(param) {
                    if (Number($scope.compData.JS.c60_fbar_news_center_del.JS.stateconfig.state) == 1) {
                        return false;
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_news_center_del.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'centerdel')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_news_center_del.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 1;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 1;
                },
                c60_fbar_nc_tabtit0: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_nc_tabtit0.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tabtit0')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_nc_tabtit0.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 0;
                },
                c60_fbar_nc_tabtit1: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_nc_tabtit1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tabtit1')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_nc_tabtit1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex = 1;
                },
                c60_fbar_left_itbtn: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'litbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                },
                c60_fbar_right_itbtn: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'ritbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_news_center_df.JS.del = true;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curIndex;
                    var msglist = $scope.compData.JS.c60_fbar_news_center_df.JS.msgids;
                    var idStr = "";
                    for (key in msglist) {
                        if (msglist[key] == true) {
                            idStr = idStr + "|" + key;
                        }
                    }
                    if (idStr.length >= 1) {
                        idStr = idStr.substring(1);
                    }
                    //将需要删除的消息id发送给后台
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'deleteMessageDetail', {
                        "messageid": idStr
                    });
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                    $scope.compData.JS.c60_fbar_news_center_df.JS.textconfig.index = 0;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.show = false;
                    $scope.compData.JS.c60_fbar_news_center_del.JS.show = false;
                    $scope.compData.JS.moreDel = "delete";
                    //重置选择删除的记录
                    $scope.compData.JS.c60_fbar_news_center_df.JS.msgids = [];
                    $scope.compData.JS.c60_fbar_news_center_df.JS.count = 0;
                },
                c60_fbar_ncc_more0: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_more0.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': 'c60_fbar_ncc_more0'
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_more0.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = 0;
                    var curNum = Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum0) + Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);
                    curNum = "" + curNum;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum0 = curNum;
                    //发送给后台,请求需要 的数据
                    var param = {
                        "flag": "0",
                        "startNum": $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,
                        "number": curNum
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                    $scope.compData.JS.moreDel = "more0";
                },
                c60_fbar_ncc_more1: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncc_more1.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': 'c60_fbar_ncc_more1'
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_ncc_more1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.moreindex = 1;

                    var curNum = Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.curNum1) + Number($scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.step);
                    curNum = "" + curNum;
                    $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.lastcurNum1 = curNum;
                    //发送给后台,请求需要 的数据
                    var param = {
                        "flag": "1",
                        "startNum": $scope.compData.JS.c60_fbar_ncc_list.JS.listconfig.startNum,
                        "number": curNum
                    };
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'queryMessageList', param);
                    $scope.compData.JS.moreDel = "more1";
                },
            };
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_news_center_df':
                    myClick.c60_fbar_news_center_df(param);
                    break;
                case 'c60_fbar_news_center_del':
                    myClick.c60_fbar_news_center_del(param);
                    break;
                case 'c60_fbar_nc_tabtit0':
                    myClick.c60_fbar_nc_tabtit0(param);
                    break;
                case 'c60_fbar_nc_tabtit1':
                    myClick.c60_fbar_nc_tabtit1(param);
                    break;
                case 'c60_fbar_left_itbtn':
                    myClick.c60_fbar_left_itbtn(param);
                    break;
                case 'c60_fbar_right_itbtn':
                    myClick.c60_fbar_right_itbtn(param);
                    break;
                case 'c60_fbar_ncc_more0':
                    myClick.c60_fbar_ncc_more0(param);
                    break;
                case 'c60_fbar_ncc_more1':
                    myClick.c60_fbar_ncc_more1(param);
                    break;
                default:

                }
            }
            ;
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
            $scope.componentType = "msgbox";
            $scope.init();
        }
    };
});
