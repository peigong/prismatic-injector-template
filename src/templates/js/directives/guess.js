uiCore.directive('guess', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div style="height:100%;background-color:#fff;">' + '  <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '	   <div class="c60_fbar_tips_txt" ng-bind="compData.JS.bg_black_pop.JS.desc" style="color:white;margin-top:0"></div>' + '  </div>'

        + '<div class="c60_fbar_taocan_result_con c60_fbar_taocan_result_con_guess" ng-style="gettaocan_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><span class="c60_fbar_succ_img" ng-style="compData.JS.c60_fbar_taocan_result_con.JS.state.CSS"></span></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.c60_fbar_taocan_result_con.JS.state.btntxt" ng-click="returnclick()"></a></div>' + '</div>'

        + '<div class="c60_fbar_bg_pop_block" ng-click="click(\'bg_pop_block\');"></div>' + '<div class="c60_fbar_pop_block">' + '<div class="c60_fbar_img_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_img_txt_table">' + '<tr>' + '<td><span class="c60_fbar_goldIcon"></span></td>' + '<td>' + '<div class="c60_fbar_pop_txt3"><span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips0.isShow" ng-bind="compData.JS.tips0.text"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips1.isShow" ng-bind="compData.JS.tips1.text" ng-style="compData.JS.tips1.CSS"></span>' + '<span  class="c60_fbar_pop_txt3"  ng-show="compData.JS.tips2.isShow" ng-bind="compData.JS.tips2.text"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips3.isShow" ng-bind="compData.JS.tips3.text" ng-style="compData.JS.tips3.CSS"></span>' + '<span  class="c60_fbar_pop_txt3" ng-show="compData.JS.tips4.isShow" ng-bind="compData.JS.tips4.text"></span>' + '</div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_img_txt_btn c60_fbar_clearfloat">' + '<div class="c60_fbar_left_itbtn" ccid="c60_fbar_left_itbtn" ng-click="click(\'c60_fbar_left_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_left_itbtn.JS.text" ng-style="compData.JS.c60_fbar_left_itbtn.CSS"></div>' + '<div class="c60_fbar_right_itbtn" ccid="c60_fbar_right_itbtn" ng-click="click(\'c60_fbar_right_itbtn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_right_itbtn.JS.text" ng-style="compData.JS.c60_fbar_right_itbtn.CSS"></div>' + '</div>' + '</div>' + '	<div class="c60_fbar_guess_mark_con" ng-style="getguess_mark_conStyle()">' + '		<div class="c60_fbar_mark_banner" ccid="c60_fbar_mark_banner" ng-style="getStyle(\'c60_fbar_mark_banner\')" ng-click="click(\'c60_fbar_mark_banner\');">' + '	    	<span class="c60_fbar_tou_look" ccid="c60_fbar_tou_look" ng-click="click(\'c60_fbar_tou_look\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_tou_look.JS.text"></span>' + '	    	<div class="c60_fbar_mark_banner_txt"><span ng-bind="compData.JS.c60_fbar_mark_banner_txt.JS.text"></span><span ng-bind="compData.JS.resp.guesslist[0].vaIncreased"></span><span ng-bind="compData.JS.c60_fbar_mark_banner_txt2.JS.text"></span></div>' + '	    </div>' + '	    <div class="c60_fbar_write_txt_zone">' + '	    	<div class="c60_fbar_mark_text_con">' + '	        	<span class="c60_fbar_mark_text" ng-repeat="item in compData.JS.wirte_txt_table.JS.answerlist track by $index" ng-bind="getItem($index)"></span>'

        + '	        </div>' + '	    </div>' + '	    <div class="c60_fbar_wirte_txt_chose">' + '	    	<ul class="c60_fbar_wirte_txt_table c60_fbar_clearfloat">' + '	        	<li ng-repeat="item in compData.JS.wirte_txt_table.JS.wordlist track by $index" ng-bind="item" ng-click="wordclick($index);$event.stopPropagation();"></li>' + '	        </ul>' + '	    </div>' + '	</div>' + '</div>',
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
            $scope.getguess_mark_conStyle = function() {
                if ($scope.compData.JS.guess_mark_con.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.guess_mark_con.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.guess_mark_con.JS.stateconfig.state1;
                }
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state1;
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    cssvalue = $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].CSS;
                    return cssvalue;
                }
            }
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].btntxt;
                }
            }
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_taocan_result_con) {
                    return $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig['state' + $scope.compData.JS.c60_fbar_taocan_result_con.JS.stateconfig.state].tipstxt;
                }
            }
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
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.getItem = function(index) {
                return $scope.compData.JS.wirte_txt_table.JS.answerlistcollect[index];
            }
            ;
            $scope.bg_black_popShow = function(msg, callback) {
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
            $scope.bg_pop_blockShow = function() {
                return $scope.compData.JS.bg_pop_block.JS.show;
            }
            var reset = function() {
                $scope.compData.JS.wirte_txt_table.JS.answerapp = '';
                $scope.compData.JS.wirte_txt_table.JS.answerindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect = [];
            }
            $scope.wordclick = function(index) {
                //判断下当前是否可以继续猜，不能则停留在当前页面
                if ($scope.compData.JS.isGuessAble == false) {
                    $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                    return false;
                }
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    reset();
                    return false;
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.wordclick.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'wordClick')
                    };
                    coreUtils.cdrService($scope.compData.JS.wordclick.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect[$scope.compData.JS.wirte_txt_table.JS.answerindex] = $scope.compData.JS.wirte_txt_table.JS.wordlist[index];
                $scope.compData.JS.wirte_txt_table.JS.answerindex = $scope.compData.JS.wirte_txt_table.JS.answerindex + 1;
                $scope.compData.JS.wirte_txt_table.JS.answerapp = $scope.compData.JS.wirte_txt_table.JS.answerapp + $scope.compData.JS.wirte_txt_table.JS.wordlist[index];
                if ($scope.compData.JS.wirte_txt_table.JS.answerindex >= $scope.compData.JS.wirte_txt_table.JS.answerlen) {
                    if ($scope.compData.JS.wirte_txt_table.JS.answerapp == $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].answer) {
                        if ($scope.compData.JS.resp.remainTimes <= 0) {
                            //如果猜过了，展示提示信息
                            $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                            return false;
                        }
                        //检查企业id是否在目前列表
                        /*if($scope.compData.JS.ids.length > 0){
									for(var i=0;i<$scope.compData.JS.ids.length;i++){
										if($scope.compData.JS.ids[i] == $scope.compData.JS.resp.guesslist[adindex].id){
											$scope.bg_black_popShow($scope.compData.JS.tipstext1);
											return false;
										}
									}
								}*/
                        sendGuess("guesssuc");
                        $scope.compData.JS.isGuessed = true;
                    } else {
                        $scope.compData.JS.wirte_txt_table.JS.answerapp = '';
                        $scope.bg_black_popShow($scope.compData.JS.tipstext2);
                        setTimeout(function() {
                            reset();
                        }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
                    }
                }
                ;
            }
            ;
            //接收来自后台成功数据
            $scope.guesssucRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.compData.JS.guesssucresp = inputData.respparam;
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'block'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'inline'
                    });
                    //							成功返回码2015528
                    if ($scope.compData.JS.guesssucresp.status == '2015528') {
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = true;
                        $scope.compData.JS.tips2.isShow = true;
                        $scope.compData.JS.tips3.isShow = true;
                        $scope.compData.JS.tips4.isShow = true;
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipsok.tipstext0;
                        $scope.compData.JS.tips1.text = $scope.compData.JS.answer;
                        $scope.compData.JS.tips2.text = $scope.compData.JS.tipsok.tipstext1;
                        $scope.compData.JS.tips3.text = inputData.respparam.vaIncreased;
                        $scope.compData.JS.tips4.text = $scope.compData.JS.tipsok.tipstext2;
                        var param = {
                            "respparam": {
                                "vaIncreased": inputData.respparam.vaIncreased
                            }
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updateCoinsTotal', param);
                    } else if ($scope.compData.JS.guesssucresp.status == '9206') {
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = true;
                        $scope.compData.JS.tips2.isShow = true;
                        $scope.compData.JS.tips3.isShow = false;
                        $scope.compData.JS.tips4.isShow = false;
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipsfail.tipstext0;
                        $scope.compData.JS.tips1.text = $scope.compData.JS.answer;
                        $scope.compData.JS.tips2.text = $scope.compData.JS.tipsfail.tipstext1;
                    } else {
                        //other_error
                        $scope.compData.JS.tips0.text = $scope.compData.JS.tipserror.tipstext0;
                        $scope.compData.JS.tips0.isShow = true;
                        $scope.compData.JS.tips1.isShow = false;
                        $scope.compData.JS.tips2.isShow = false;
                        $scope.compData.JS.tips3.isShow = false;
                        $scope.compData.JS.tips4.isShow = false;
                    }
                }
            }
            ;
            $scope.eventMap['guesssucRet'] = $scope.guesssucRet;
            $scope.nodatarecvd = function() {
                $scope.showError();
            }
            $scope.eventMap['nodatarecvd'] = $scope.nodatarecvd;
            var myClick = {
                c60_fbar_mark_banner: function(param) {
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_mark_banner.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'pictClick')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_mark_banner.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.resp.guesslist && $scope.compData.JS.resp.guesslist[0].tipslink);
                    }
                },
                c60_fbar_left_itbtn: function(param) {
                    //								if($scope.compData.JS.resp.remainTimes && $scope.compData.JS.resp.remainTimes!=undefined && $scope.compData.JS.resp.remainTimes<=0){
                    //									$scope.bg_black_popShow("不能再猜了哦,可以到官网逛一逛!",reset);
                    //									return false;
                    //								};
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'continue')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_left_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    sendGuess("guessagain");
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_right_itbtn: function(param) {
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'officialWeb')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_fbar_right_itbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.resp.guesslist && $scope.compData.JS.resp.guesslist[0].tipslink);
                    }
                },
                c60_fbar_tou_look: function(param) {
                    if ($scope.compData.JS.adindex >= $scope.compData.JS.wirte_txt_table.JS.wordlen) {
                        $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                        return false;
                    }
                    var params = {};
                    if ($scope.compData.JS.resp.guesslist.length > 0) {
                        params = {
                            'imgUrl': $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].tipsImage,
                            'imgLink': $scope.compData.JS.resp.guesslist[$scope.compData.JS.adindex].tipslink
                        };
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_tou_look.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'look')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_tou_look.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'peek');
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'peek2', params);
                },
                bg_pop_block: function(param) {
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_pop_block')).css({
                        'display': 'none'
                    });
                }
            }
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_left_itbtn':
                    myClick.c60_fbar_left_itbtn(param);
                    break;
                case 'c60_fbar_right_itbtn':
                    myClick.c60_fbar_right_itbtn(param);
                    break;
                case 'c60_fbar_tou_look':
                    myClick.c60_fbar_tou_look(param);
                    break;
                case 'bg_pop_block':
                    myClick.bg_pop_block(param);
                    break;
                case 'c60_fbar_mark_banner':
                    myClick.c60_fbar_mark_banner(param);
                    break;
                default:

                }
            }
            ;
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
            var sendGuess = function(event) {
                if ("guessagain" == event) {
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || event);
                } else {
                    var adindex = $scope.compData.JS.adindex;
                    var item = $scope.compData.JS.resp.guesslist[adindex];
                    var param = {
                        "id": item.id
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || event, param);
                }
            }
            ;
            var stringToArray = function() {
                //企业数组
                //	                	 $scope.compData.JS.ids = [];
                $scope.compData.JS.wirte_txt_table = {
                    "CSS": {},
                    "JS": {}
                };
                $scope.compData.JS.wirte_txt_table.JS.answerlistcollect = [];
                $scope.compData.JS.wirte_txt_table.JS.answerlist = [];
                //初始化数据
                $scope.compData.JS.isGuessAble = true;
                $scope.compData.JS.isGuessed = false;
                $scope.compData.JS.remainTimes = 100;
                $scope.compData.JS.adindex = 0;
                $scope.compData.JS.answer = "";
                $scope.compData.JS.resp = {};
                $scope.compData.JS.guesssucresp = {};
                $scope.compData.JS.wirte_txt_table.JS.answerindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerapp = 0;
                $scope.compData.JS.wirte_txt_table.JS.answerlen = 0;
                $scope.compData.JS.wirte_txt_table.JS.wordindex = 0;
                $scope.compData.JS.wirte_txt_table.JS.wordlen = 0;
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();
                //	                     sendGuess("guessagain");
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_taocan_result_con.JS.showconfig.state = 1;
                $scope.compData.JS.guess_mark_con.JS.stateconfig.state = 0;
            }

            function transData(param) {
                //首先判断remainTimes
                //DTS2015051808343 add by h00278783 start---------------
                if ((param.guesslist && param.guesslist.length <= 0) || (param.guesslist[0] && Object.keys(param.guesslist[0]).length <= 0)) {
                    $scope.compData.JS.isGuessAble = false;
                    if ($scope.compData.JS.isGuessed == false) {
                        $scope.showError();
                        return false;
                    } else {
                        //如果猜过了，展示提示信息
                        $scope.bg_black_popShow($scope.compData.JS.tipstext1);
                        return false;
                    }
                }
                reset();
                //这个时候将后台数据和组件信息绑定
                $scope.compData.JS.resp = param;
                var adindex = $scope.compData.JS.adindex;
                //DTS2015051808343 add by h00278783 end---------------
                var item = $scope.compData.JS.resp.guesslist[adindex];
                var words = item.words;
                if (words == null  || words == undefined || words.length <= 0) {
                    $scope.showError();
                    return false;
                }
                var wordlisttemp = [];
                //判断长度,不能超过系统限制的值
                var len = words.length;
                var maxlen = $scope.compData.JS.maxline * $scope.compData.JS.maxlist;

                len = len > maxlen ? maxlen : len;
                $scope.compData.JS.wirte_txt_table.JS.wordlist = [];
                for (var i = 0; i < len; i++) {
                    wordlisttemp[i] = words.charAt(i);
                }
                $scope.compData.JS.wirte_txt_table.JS.wordlist = wordlisttemp;

                var answer = item.answer;
                var answertemp = [];
                var len2 = answer.length;
                $scope.compData.JS.wirte_txt_table.JS.answerlist = [];
                for (var i = 0; i < len2; i++) {
                    answertemp[i] = answer.charAt(i);
                }
                angular.element($element[0].querySelector('.c60_fbar_mark_banner')).css('background-image', 'url(' + $scope.compData.JS.resp.guesslist[adindex].image + ')');
                $scope.compData.JS.wirte_txt_table.JS.answerlist = answertemp;
                $scope.compData.JS.wirte_txt_table.JS.answerlen = item.answer.length;
                $scope.compData.JS.wirte_txt_table.JS.wordlen = $scope.compData.JS.resp.guesslist.length;
                $scope.compData.JS.answer = $scope.compData.JS.resp.guesslist[adindex].answer;
            }
            ;
            //接收来自后台的数据
            $scope.getDataInit = function(inputData) {
                //解析words
                if (inputData && inputData.respparam) {
                    transData(inputData.respparam);
                } else {
                    //将提示页面显示出来，隐藏原来空白页面
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.eventMap['getDataInit'] = $scope.getDataInit;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
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
            $scope.componentType = "guess";
            $scope.init();
        }
    };
});
