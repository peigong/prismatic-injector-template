uiCore.directive('mineset', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div>'
        + '   <div class="c60_fbar_returnwrap" ng-click="returnbackclick()"><div class="c60_fbar_returnback" ccid="c60_fbar_returnback"></div></div>'
        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">'
        + '    <div class="c60_fbar_tips_txt" style="color:white;margin-top:.7em;" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>'
        + '   </div>'
        + '<div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>'
        + '<div class="c60_fbar_pop_block"  ng-style="getpop_blockStyle()">'
        + '	<div class="c60_fbar_img_txt_info">'
        + '    	<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">'
        + '        	<tr>'
        + '            	<td><span class="c60_fbar_haveatea"></span></td>'
        + '                <td>'
        + '                	<div class="c60_fbar_txt1"><span ng-bind="compData.JS.c60_fbar_txt1.JS.text"></span>&nbsp;&nbsp;<span ng-style="compData.JS.c60_fbar_txt2.CSS"><span ng-bind="compData.JS.c60_fbar_txt5.JS.text"></span><span ng-bind="compData.JS.close_list_detail.JS.curText"></span><span ng-bind="compData.JS.c60_fbar_txt6.JS.text"></span></span>&nbsp;&nbsp;?</div>'
        + '                    <div class="c60_fbar_txt1" ng-style="compData.JS.c60_fbar_txt3.CSS"><span ng-bind="compData.JS.c60_fbar_txt3.JS.text"></span>&nbsp;，&nbsp;<span ng-bind="compData.JS.close_list_detail.JS.curInfo"></span><span ng-bind="compData.JS.c60_fbar_txt4.JS.text"></span></div>'
        + '                </td>'
        + '            </tr>'
        + '        </table>'
        + '    </div>'
        + '    <div class="c60_fbar_img_txt_btn clearfloat">'
        + '        <div class="c60_fbar_left_itbtn" ng-click="c60_fbar_left_itbtnClick();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text"></div>'
        + '        <div class="c60_fbar_right_itbtn" ng-click="c60_fbar_right_itbtnClick();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text"></div>'
        + '    </div>'
        + '</div>'

        + '   <div class="c60_fbar_my_con_sz" ng-style="getStyle(\'my_con\')" ><div class="c60_fbar_my_con_div" simplescroll>'
        //个性化设置

        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con4" ng-click="my_list_conClick(4)" ng-show="compData.JS.c60_fbar_gexinghua.JS.isShow">'
        + '     <div class="c60_fbar_my_list">'
        + '      <div class="c60_fbar_my_list_detail clearfloat">'
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
        + '        <span class="c60_fbar_gexinghua" ng-style="compData.JS.c60_fbar_gexinghua.CSS" ng-bind="compData.JS.c60_fbar_gexinghua.JS.text"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_arrow_down">'
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(4)"></span>'
        + '       </div>'
        + '      </div>'
        + '     </div>'
        + '     <div class="c60_fbar_gexinghua_on" ng-style="getOptionStyle(4)" ng-click="$event.stopPropagation()" >'
        //展开的内容start

        + '			<div class="c60_fbar_gexinghua_con c60_fbar_hid">'
        + '        	<div class="c60_fbar_gexinghua_detail">'
        + '            	<div class="c60_fbar_gexinghua_detail_tit">日均流量低于 <span class="c60_fbar_gexinghua_detail_orangetxt" ng-bind="compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue"></span> MB，提醒我</div>'
        + '                <div class="c60_fbar_gxh_d_cbox_con">'
        + '                	<span id="selectedline" class="c60_fbar_gxh_d_cbox_selected_line"></span>'
        + '                	<ul id="avetraffic"class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_up">'
        + '                        <li ng-repeat="item in compData.JS.avetraffic_chose.JS.text track by $index" ccid="c60_fbar_avetraffic_chose_txt" ng-click="choseTrafficNotify($index)" ng-bind="item"></li>'
        + '                  </ul>'
        + '                </div>'
        + '            </div>'
        + '            <div class="c60_fbar_gexinghua_detail">'
        + '            	<div class="c60_fbar_gexinghua_detail_tit">流量消耗超过 <span class="c60_fbar_gexinghua_detail_orangetxt1" ng-bind="compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue"></span> %，提醒我</div>'
        + '                <div class="c60_fbar_gxh_d_cbox_con">'
        + '                	<span  id="selectedline1" class="c60_fbar_gxh_d_cbox_selected_line1"></span>'
        + '                	<ul  id="consumeTrafficSet" class="c60_fbar_gexinghua_detail_chosebox c60_fbar_clearfloat" ccid="c60_fbar_touchslide_down">'
        + ' 					<li ng-repeat="item in compData.JS.consumetraffic_chose.JS.text track by $index" ccid="c60_fbar_consumetr_chose_txt" ng-click="choseConsumeTrafficNotify($index)" ng-bind="item"></li>'
        + '                  </ul>'
        + '                </div>'
        + '            </div>'
        + '        </div>'
        //展开的内容end

        + '     </div>'
        + '    </div>'


        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con1" ng-click="my_list_conClick(1)" >'
        + '     <div class="c60_fbar_my_list">'
        + '      <div class="c60_fbar_my_list_detail clearfloat">'
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
        + '        <span class="c60_fbar_about" ng-style="compData.JS.c60_fbar_about.CSS" ng-bind="compData.JS.c60_fbar_about.JS.text"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_arrow_down">'
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(1)"></span>'
        + '       </div>'
        + '      </div>'
        + '     </div>'
        + '     <div class="c60_fbar_about_con" ng-style="getOptionStyle(1)" ng-click="$event.stopPropagation()" >'
        + '      <h4 class="c60_fbar_about_tit"  ng-bind="compData.JS.textconfig.text2"></h4>'
        + '      <div class="c60_fbar_about_txt_img">'
        + '       <div class="c60_fbar_guanyu_img_left">'
        + '        <span class="c60_fbar_guanyu1_img">&nbsp;</span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text3"></span>'
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text4"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text5"></span>'
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold"  ng-bind="compData.JS.textconfig.text6"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text7"></span>'
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text8"></span><span class="c60_fbar_span_text"  ng-bind="compData.JS.textconfig.text9"></span>'
        + '        <span class="c60_fbar_span_text c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text10"></span><span class="c60_fbar_span_text" ng-bind="compData.JS.textconfig.text11"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_guanyu_img_right">'
        + '        <span class="c60_fbar_guanyu2_img">&nbsp;</span><span ng-bind="compData.JS.textconfig.text12"></span>'
        + '        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text13"></span><span ng-bind="compData.JS.textconfig.text14"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_guanyu_img_left">'
        + '        <span class="c60_fbar_guanyu3_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text15"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_guanyu_img_right">'
        + '        <span class="c60_fbar_guanyu4_img">&nbsp;</span><span  ng-bind="compData.JS.textconfig.text16"></span>'
        + '        <span class="c60_fbar_font_bold" ng-bind="compData.JS.textconfig.text17"></span></span><span ng-bind="compData.JS.textconfig.text18"></span>'
        + '       </div>'
        + '      </div>'
        + '     </div>'
        + '    </div>'
        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con2" ng-click="my_list_conClick(2)">'
        + '     <div class="c60_fbar_my_list">'
        + '      <div class="c60_fbar_my_list_detail clearfloat">'
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
        + '        <span class="c60_fbar_feedback" ng-style="compData.JS.c60_fbar_feedback.CSS" ng-bind="compData.JS.c60_fbar_feedback.JS.text"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_arrow_down">'
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(2)"></span>'
        + '       </div>'
        + '      </div>'
        + '     </div>'
        + '    </div>'

        + '    <div class="c60_fbar_my_list_confeed">'
        + '     <div class="c60_fbar_feedback_con" ng-style="getOptionStyle(2)">'
        + '      <div class="c60_fbar_feedback_tit" ccid="c60_fbar_feedback_tit" ng-bind="compData.JS.c60_fbar_feedback_tit.JS.text">'
        + '      </div>'
        + '      <div class="c60_fbar_feedback_chose clearfloat">'
        + '       <span class="c60_fbar_feedback_chose_txt" ccid="c60_fbar_feedback_chose_txt" ng-repeat="item in compData.JS.feedback_chose.JS.text" ng-style="isSelected($index)" ng-click="feedbackChoseTxtClick($index);$event.stopPropagation();"><span ng-bind="item"></span></span>'
        + '      </div>'
        + '      <span><textarea class="c60_fbar_feedback_zone" ng-focus="focus()" ng-blur="blur()"  ng-style="isfeedback_zoneShow()" ng-model="compData.JS.feedback_zone.JS.text"></textarea></span>'
        + '      <div class="c60_fbar_submit_btn clearfloat">'
        + '       <span class="c60_fbar_tijiao_btn" ccid="c60_fbar_tijiao_btn" ng-style="gettijiao_btnStyle()" ng-click="tijiao_btnClick();$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tijiao_btn.JS.text"></span>'
        + '       <span class="c60_fbar_tuiding" ng-click="tuidingClick();$event.stopPropagation();" ccid="c60_fbar_tuiding" ng-show="compData.JS.c60_fbar_tuiding.JS.isShow" ng-bind="compData.JS.c60_fbar_tuiding.JS.text"></span>'
        + '      </div>'
        + '     </div>'
        + '    </div>'

        + '    <div class="c60_fbar_my_list_con c60_fbar_my_con_sz" ccid="c60_fbar_my_list_con3" ng-click="my_list_conClick(3)">'
        + '     <div class="c60_fbar_my_list">'
        + '      <div class="c60_fbar_my_list_detail clearfloat">'
        + '       <div class="c60_fbar_mytitle" ng-style="getStyle(\'mytitle\')">'
        + '        <span class="c60_fbar_set_close" ng-style="compData.JS.c60_fbar_set_close.CSS" ng-bind="compData.JS.c60_fbar_set_close.JS.text"></span>'
        + '       </div>'
        + '       <div class="c60_fbar_arrow_down">'
        + '        <span class="c60_fbar_arrow_down_ico" id="down_up" ng-style="getIconStyle(3)"></span>'
        + '       </div>'
        + '      </div>'
        + '     </div>'
        + '     <div class="c60_fbar_close_con" ng-style="getOptionStyle(3)" ng-click="$event.stopPropagation()">'
        + '      <table class="c60_fbar_close_list_detail">'
        + '       <tbody>'
        + '        <tr ng-repeat="item in compData.JS.close_list_detail.JS.text" ng-show="item.isShow">'
        + '         <td ng-bind="item.desc"></td>'
        + '         <td><a class="c60_fbar_guanbi_btn" ccid="c60_fbar_guanbi_btn" ng-click="close_list_detailClick($index);$event.stopPropagation();" ng-bind="item.type"></a></td>'
        + '        </tr>'
        + '       </tbody>'
        + '      </table>'
        + '     </div>'
        + '     </div>'
        + '    </div>'
        + '   </div>'
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
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            //当用户点击进去的时候，置空
            $scope.focus = function() {
                if ($scope.compData.JS.feedback_zone.JS.text == $scope.compData.JS.feedback_zone.JS.oldtext) {
                    $scope.compData.JS.feedback_zone.JS.text = "";
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                }
            }
            ;
            //当用户点击进去的时候，置空
            $scope.blur = function() {
                if ($scope.compData.JS.feedback_zone.JS.text == "") {
                    $scope.compData.JS.feedback_zone.JS.text = $scope.compData.JS.feedback_zone.JS.oldtext;
                }
            }
            ;
            $scope.gettijiao_btnStyle = function() {
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true) {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
                }
                if ($scope.compData.JS.feedback_zone.JS.text == '') {
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                } else {
                    $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
                }
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state1;
                }
            }
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
	                         $scope.$apply();
	                     });*/
            }
            ;
            var stringToArray = function() {
                //关于内容
                //	                	var len = $scope.compData.JS.about_tit.JS.len;
                //						$scope.compData.JS.about_tit.JS.content = [];
                //						for(var i = 0;i<len;i++){
                //							$scope.compData.JS.about_tit.JS.content.push($scope.compData.JS.about_tit.JS["content"+i]);
                //						}
                //反馈内容
                len = $scope.compData.JS.feedback_chose.JS.len;
                //点击提交时候，记录下
                $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
                $scope.compData.JS.feedback_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.feedback_chose.JS.text.push($scope.compData.JS.feedback_chose.JS["text" + i]);
                }
                //选择日均流量提醒内容
                len = $scope.compData.JS.avetraffic_chose.JS.len;

                $scope.compData.JS.avetraffic_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.avetraffic_chose.JS.text.push($scope.compData.JS.avetraffic_chose.JS["text" + i]);
                }
                //选择消耗流量提醒内容
                len = $scope.compData.JS.consumetraffic_chose.JS.len;
                $scope.compData.JS.consumetraffic_chose.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.consumetraffic_chose.JS.text.push($scope.compData.JS.consumetraffic_chose.JS["text" + i]);
                }
                //关闭内容
                len = $scope.compData.JS.close_list_detail.JS.len;
                $scope.compData.JS.close_list_detail.JS.text = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.close_list_detail.JS.text.push($scope.compData.JS.close_list_detail.JS["text" + i]);
                }
                //初始化数据
                //将之前反馈框中内容记录下来
                $scope.compData.JS.feedback_zone.JS.oldtext = $scope.compData.JS.feedback_zone.JS.text;
                $scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[$scope.compData.JS.feedback_chose.JS.index];
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();

                //resolve when scrol feedback,the parent page alse scroll
                (function() {
                    var inputbox = $element[0].querySelector('textarea');
                    var _lastYPos = 0;
                    var _currentYPos = 0;
                    var moveFlag = false;
                    var touchFlag = false;
                    var start = function(e) {
                        touchFlag = true;
                        _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    }
                    ;
                    var move = function(e) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        if (Math.abs(_currentYPos - _lastYPos) > 3 || moveFlag || !touchFlag) {
                            moveFlag = true;
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                    }
                    ;
                    var end = function(e) {
                        if (moveFlag) {
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = 0;
                        _currentYPos = 0;
                        touchFlag = false;
                        moveFlag = false;
                    }
                    ;
                    inputbox.addEventListener('touchstart', start);
                    inputbox.addEventListener('touchmove', move);
                    inputbox.addEventListener('touchend', end);

                })();
            }
            ;
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            $scope.isSelected = function(index) {
                if ($scope.compData.JS.feedback_chose.JS.index == index) {
                    return $scope.compData.JS.feedback_chose.JS.stateconfig.status1;
                } else {
                    return $scope.compData.JS.feedback_chose.JS.stateconfig.status0;
                }
            }
            ;
            $scope.feedbackChoseTxtClick = function(index) {
                if ($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click == true) {
                    if (Number($scope.compData.JS.feedback_chose.JS.index) != Number(index)) {
                        angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
                        {
                            "background-color": "#73d7bd",
                            "color": "#fff"
                        });
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 0;
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = false;
                    }
                }

                $scope.compData.JS.feedback_chose.JS.index = index;
                var texts = $scope.compData.JS.feedback_chose.JS.text;
                var len = texts.length;
                if (index == len - 1) {
                    $scope.compData.JS.feedback_chose.JS.index = index;
                    $scope.compData.JS.feedback_zone.JS.stateconfig.status = 1;
                } else {
                    //每次点击，记录下当前字符串
                    $scope.compData.JS.feedback_chose.JS.content = $scope.compData.JS.feedback_chose.JS.text[index];
                    $scope.compData.JS.feedback_zone.JS.stateconfig.status = 0;
                }
                //						//跟踪话单
                //						if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_feedback_chose_txt.JS.cdrConfig)) {
                //	                        $scope.compData.JS['cdrData'] = {};
                //	                        $scope.compData.JS.cdrData = {
                //	                            'pageId': $scope.pageID,
                //	                            'componentId': coreUtils.createCdrid($scope.pageID,$attrs.cid,'chosetxt')
                //	                        };
                //	                        coreUtils.cdrService($scope.compData.JS.c60_fbar_feedback_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                //	                    }
            }
            $scope.isfeedback_zoneShow = function() {
                if ($scope.compData.JS.feedback_zone.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.feedback_zone.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.feedback_zone.JS.stateconfig.status1;
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

            $scope.bg_black_popShow = function(msg) {
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
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
            }
            ;

            //提交反馈内容
            $scope.tijiao_btnClick = function() {
                if (Number($scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state) != 1) {
                    //跟踪话单
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'submit')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var curIndex = $scope.compData.JS.feedback_chose.JS.index;
                    var texts = $scope.compData.JS.feedback_chose.JS.text;
                    var len = texts.length;
                    var content = "";
                    var last = false;
                    //说明用户提交的是反馈框中内容
                    if (curIndex == len - 1) {
                        content = $scope.compData.JS.feedback_zone.JS.text;
                        last = true;
                    } else {
                        content = $scope.compData.JS.feedback_chose.JS.content;
                    }
                    if (content == '') {
                        $scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips1);
                    } else if (content == $scope.compData.JS.feedback_zone.JS.oldtext) {
                        $scope.bg_black_popShow($scope.compData.JS.feedback_zone.JS.tips2);
                    } else {
                        if (last == true) {
                            $scope.compData.JS.feedback_zone.JS.text = "";
                        }
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.click = true;
                        $scope.compData.JS.c60_fbar_tijiao_btn.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelector('.c60_fbar_tijiao_btn')).css(
                        {
                            "background-color": "#cacecd",
                            "color": "#999"
                        });
                        //将反馈内容发送到后台
                        var param = {
                            "feedback": encodeURIComponent(content),
                            "componentId": "cmineset",
                            "pageId": "imineset",
                            "templateId": "fullscreenbar"
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'feedsubmit', param);

                    }
                }
            }
            ;
            //当点击反馈
            $scope.feedFunc = function(inputData) {
                if (inputData && inputData.respparam && inputData.respparam.success == 'Feedback Submitted Successfully') {
                    $scope.bg_black_popShow($scope.compData.JS.tips.submittextSuccess);
                } else {
                    $scope.bg_black_popShow($scope.compData.JS.tips.submittextFail);
                }
            }
            ;
            //退订按钮,进入到退订页面
            $scope.tuidingClick = function() {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tuiding.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tuiding')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_tuiding.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuiclick');
            }
            ;
            $scope.getbg_pop_blockStyle = function() {
                if ($scope.compData.JS.bg_pop_block.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.getpop_blockStyle = function() {
                if ($scope.compData.JS.pop_block.JS.stateconfig.status == 0) {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status0;
                } else {
                    return $scope.compData.JS.pop_block.JS.stateconfig.status1;
                }
            }
            ;
            $scope.c60_fbar_left_itbtnClick = function() {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'bule')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
            }
            ;
            $scope.c60_fbar_right_itbtnClick = function() {
                top.tlbs.toolbarclose = "close";
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'shide')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.pop_block.JS.stateconfig.status = 0;
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 0;
                var index = $scope.compData.JS.close_list_detail.JS.curIndex;
                //本日关闭
                var param = {
                    "closeunit": "1",
                    "cycle": "1",
                    "interval": "0",
                    "start": "1",
                    "componentId": 'cmineset',
                    "isSelfOperation": "true",
                    "pageId": "imineset",
                    "templateId": "fullscreenbar"
                }
                //本周关闭
                if (index == 1) {
                    param.closeunit = '2';
                }
                //本月关闭
                if (index == 2) {
                    param.closeunit = '3';
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'close', param);
            }
            ;
            //关闭类型
            $scope.close_list_detailClick = function(index) {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_guanbi_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'guanbi') + index
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_guanbi_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.bg_pop_block.JS.stateconfig.status = 1;
                $scope.compData.JS.pop_block.JS.stateconfig.status = 1;
                $scope.compData.JS.close_list_detail.JS.curIndex = index;
                $scope.compData.JS.close_list_detail.JS.curText = $scope.compData.JS.close_list_detail.JS.text[index].type;
                $scope.compData.JS.close_list_detail.JS.curInfo = $scope.compData.JS.close_list_detail.JS.text[index].info;

            }
            ;
            //当点击关闭后关闭toolbar
            $scope.closeFunc = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'closeToolbar');
            }
            ;
            $scope.eventMap['closeFunc'] = $scope.closeFunc;
            $scope.eventMap['feedFunc'] = $scope.feedFunc;
            $scope.my_list_conClick = function(item) {
                //跟踪话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'con') + item
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_tijiao_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.native.JS.index = item;
                if (item == $scope.compData.JS.native.JS.last) {
                    $scope.compData.JS.native.JS.index = -1;
                    $scope.compData.JS.native.JS.last = 0;
                } else {
                    $scope.compData.JS.native.JS.last = item;
                }
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-moz-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-ms-transform', 'translate3d(0px, 0px, 0px)');
                angular.element($element[0].querySelector('.c60_fbar_my_con_div')).css('-o-transform', 'translate3d(0px, 0px, 0px)');
            }
            ;
            $scope.getIconStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.icon.stateconfig.state1;
                } else {
                    return $scope.compData.JS.native.JS.icon.stateconfig.state0;
                }
            }
            ;
            $scope.getOptionStyle = function(index) {
                if (index == $scope.compData.JS.native.JS.index) {
                    return $scope.compData.JS.native.JS.option.stateconfig.state1;
                } else {
                    return $scope.compData.JS.native.JS.option.stateconfig.state0;
                }
            }
            ;
            //选择日均流量提醒函数
            $scope.choseTrafficNotify = function(index) {
                //上面红线移动的距离
                angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', index * 10 + '%');
                $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text" + index]);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_avetraffic_chose_txt.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'avetraf')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_avetraffic_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }

            //选择消耗流量提醒函数
            $scope.choseConsumeTrafficNotify = function(index1) {
                //上面红线移动的距离
                angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', index1 * 10 + "%");
                $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text" + index1]);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_consumetraffic_chose_txt.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'consutr')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_consumetraffic_chose_txt.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            //返回按钮点击
            $scope.returnbackclick = function() {
                var value1 = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                var value2 = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
                //如果用户没设置任何值，不发送保存报文请求
                if (value1 == $scope.initvalue1 && value2 == $scope.initvalue2)
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback');
                else
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setreturnback1', {
                        'avgremain': value1 * 1024,
                        'exceedpercent': value2
                    });
                //话单
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_returnback.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'return')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_returnback.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }

            //日均流量红线滑动
            var redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
            //红线长度
            $scope.dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchArea = angular.element($element[0].querySelector('#avetraffic'));
                var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
                //屏幕可见宽度
                var screenWidth = top.window.innerWidth;
                //ul宽度
                var ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
                //计算ul左边长度
                var ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                //用于判断是滑动的话单
                var slideup = false;
                touchArea.bind(_touchstart, function(e) {
                    redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
                    //红线长度
                    screenWidth = top.window.innerWidth;
                    //ul宽度
                    ulAveTrafficWidth = angular.element($element[0].querySelector('#avetraffic'))[0].offsetWidth;
                    //计算ul左边长度
                    ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;

                });
                touchArea.bind(_touchmove, function(e) {
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        _lastXPos = _currentXPos;
                        slideup = true;
                        if (moveflag) {
                            if ((_currentXPos >= ulpaddingleft) && (_currentXPos <= ulAveTrafficWidth))
                            {
                                var aveTrafficNotifyValuePosition = parseInt((_currentXPos - ulpaddingleft) / redlinewidth);
                                if (aveTrafficNotifyValuePosition >= $scope.compData.JS.avetraffic_chose.JS.len - 1)
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({
                                        'right': "0",
                                        "left": "inherit"
                                    });
                                else
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValuePosition * 10 + "%");
                                $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.compData.JS.avetraffic_chose.JS["text" + aveTrafficNotifyValuePosition]);
                            }
                        }
                    }

                });

                touchArea.bind(_touchend, function(e) {
                    if (moveflag && slideup) {
                        //跟踪话单
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_touchslide_up.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'slideup')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_touchslide_up.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                    moveflag = false;
                    slideup = false;
                    $scope.$apply();
                });



            }
            ;
            //流量消耗红线滑动
            $scope.dragMove1 = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchArea = angular.element($element[0].querySelector('#consumeTrafficSet'));
                var redline1 = angular.element($element[0].querySelector('#selectedline1'));
                var ulpaddingleft = angular.element($element[0].querySelector('.c60_fbar_gexinghua_con'));
                //屏幕可见宽度
                var screenWidth = top.window.innerWidth;
                //ul宽度
                var ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
                //计算ul左边长度
                var ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                //用于判断是滑动的话单
                var slidedown = false;
                touchArea.bind(_touchstart, function(e) {
                    redlinewidth = angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line'))[0].offsetWidth;
                    //红线长度
                    screenWidth = top.window.innerWidth;
                    //ul宽度
                    ulAveTrafficWidth = angular.element($element[0].querySelector('#consumeTrafficSet'))[0].offsetWidth;
                    //计算ul左边长度
                    ulpaddingleft = (screenWidth - ulAveTrafficWidth) / 2;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;

                });
                touchArea.bind(_touchmove, function(e) {
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        slidedown = true;
                        _lastXPos = _currentXPos;
                        if (moveflag) {
                            if ((_currentXPos >= ulpaddingleft) && (_currentXPos <= ulAveTrafficWidth))
                            {
                                var consumeTrafficPosition = parseInt((_currentXPos - ulpaddingleft) / redlinewidth);
                                if (consumeTrafficPosition >= $scope.compData.JS.consumetraffic_chose.JS.len - 1)
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({
                                        'right': "0",
                                        "left": "inherit"
                                    });
                                else
                                    angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', consumeTrafficPosition * 10 + "%");
                                $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.compData.JS.consumetraffic_chose.JS["text" + consumeTrafficPosition]);

                            }
                        }
                    }
                });
                touchArea.bind(_touchend, function(e) {
                    if (moveflag && slidedown) {
                        //跟踪话单
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_touchslide_down.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'slidedown')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_touchslide_down.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                    moveflag = false;
                    slidedown = false;

                    $scope.$apply();
                });

            }
            ;

            $scope.dragMove();
            $scope.dragMove1();

            //查询个性化设置初始日均流量值，流量百分比
            $scope.settingrecvd = function(param) {
                if (param && param.respparam) {
                    $scope.settingValue = param.respparam;
                    if ($scope.settingValue.avgremain != null  && $scope.settingValue.avgremain != undefined && $scope.settingValue.avgremain !== "") {
                        //日均流量初始值获取及红线移动初始化
                        $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue = parseInt($scope.settingValue.avgremain) / 1024;
                        //个性化设置初始值
                        $scope.initvalue1 = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                        var aveTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.aveTrafficNotifyValue;
                        if (aveTrafficNotifyValue / 5 > 9)
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css({
                                'right': "0",
                                "left": "inherit"
                            });
                        else
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line')).css('left', aveTrafficNotifyValue / 5 * 10 + "%");
                    } else {
                        $scope.initvalue1 = $scope.settingValue.avgremain;
                    }
                    if ($scope.settingValue.exceedpercent != null  && $scope.settingValue.exceedpercent != undefined && $scope.settingValue.exceedpercent !== "") {
                        //剩余百分比初始值及红线移动初始化
                        $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue = parseInt($scope.settingValue.exceedpercent);
                        var consumeTrafficNotifyValue = $scope.compData.JS.c60_fbar_gexinghua.JS.consumeTrafficNotifyValue;
                        if ((consumeTrafficNotifyValue - 50) / 5 > 9) {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css({
                                'right': "0",
                                "left": "inherit"
                            });
                        } else if ((consumeTrafficNotifyValue - 50) / 5 < 0) {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', 0);
                        } else {
                            angular.element($element[0].querySelector('.c60_fbar_gxh_d_cbox_selected_line1')).css('left', (consumeTrafficNotifyValue - 50) / 5 * 10 + "%");
                        }
                    } else {
                        $scope.initvalue2 = $scope.settingValue.exceedpercent;
                    }
                }
            }
            ;
            //					$scope.show = function(){
            //						$scope.compa.JS.my_coin_con.JS.stateconfig.state = 1;
            //					};
            //					$scope.eventMap['show'] = $scope.show;
            $scope.eventMap['settingrecvd'] = $scope.settingrecvd;
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
            $scope.componentType = "cmineset";
            $scope.init();
        }
    };
});
