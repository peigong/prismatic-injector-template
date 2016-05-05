uiCore.directive('goldcoinlayout', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder">' + '<div class="c60_fbar_goldcoin_result_con" ng-style="gettaocan_result_conStyle()"><div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{taocanresulturl()}}"/></div><div class="c60_fbar_tips_txt" ng-bind="taocanresulttips()"></div><div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="taocanresulttxt()" ng-click="returnclick()"></a></div></div>' + '<div id="circleholder"><div id="circle"><div id="circletxt1">{{::compData.JS.circletxt1.JS.text}}</div><div id="circletxt2">{{compData.JS.circletxt2.JS.text}}</div><div id="circletxt3" ccid="circletxt3" ng-click="circletxt3Click();$event.stopPropagation();">{{::compData.JS.circletxt3.JS.text}}</div></div></div><div id="coinbtn1" ccid="coinbtn1" ng-click="coinbtn1Click()"><div id="coinbtn1text">{{::compData.JS.coinbtn1text.JS.text}}</div></div><div id="coinbtn2" ccid="coinbtn2" ng-click="coinbtn2Click()"><div id="coinbtn2text">{{::compData.JS.coinbtn2text.JS.text}}</div></div><div id="tipholder"><div id="tiptext"></div></div><div id="mainholder1" ng-transclude class="money-list-animate" ng-class="compData.JS.moneyListDisplay?\'showmlist\':\'hidemlist\'"></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$interval',
        function($scope, $element, $attrs, $interval) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.startUp = true;
            $scope.runningCount = 0;
            $scope.eventMap = {};
            var intervalObject;
            $scope.compData = {
                'CSS': {
                    'width': '100%',
                    'height': '100%',
                    'background': '#ff7d55',
                    'text-align': 'center',
                    'position': 'relative',
                    'overflow-y': 'hidden',
                    'z-index': '2047483647'
                },
                'JS': {
                    'cdr': true,
                    'buttonEnable': false,
                    'moneyListDisplay': false,
                    'goldcoinAnimationTime': 2000,
                    'goldcoinToAnimate': 100,
                    'circleholder': {
                        'CSS': {
                            'width': '8.9em',
                            'height': '8.9em',
                            'text-align': 'center',
                            'background': '#ff7d55',
                            'border': '0.2em solid #fff',
                            '-moz-border-radius': '8.9em',
                            '-webkit-border-radius': '8.9em',
                            'border-radius': '8.9em',
                            'margin': '0 auto',
                            'margin-top': '4em'
                        },
                        'JS': {}
                    },
                    'circle': {
                        'CSS': {
                            'width': '8em',
                            'height': '8em',
                            'text-align': 'center',
                            'line-height': '8em',
                            'background': '#fff',
                            '-moz-border-radius': '8em',
                            '-webkit-border-radius': '8em',
                            'border-radius': '8em',
                            'position': 'relative'
                        },
                        'JS': {}
                    },
                    'circletxt1': {
                        'CSS': {
                            'width': '100%',
                            'color': '#222',
                            'line-height': 'normal',
                            'font-size': '0.875em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'left': '0',
                            'top': '1.8em'
                        },
                        'JS': {
                            'text': '我的金币'
                        }
                    },
                    'circletxt2': {
                        'CSS': {
                            'color': '#222',
                            'font-size': '2em',
                            'line-height': '4em',
                            'text-align': 'center',
                            'padding-top': '0.2em'
                        },
                        'JS': {
                            'text': '0',
                            'newtext': '',
                            'datamapping': 'respparam.total'
                        }
                    },
                    'circletxt3': {
                        'CSS': {
                            'width': '100%',
                            'color': '#73d7bd',
                            'line-height': 'normal',
                            'font-size': '0.875em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'left': '0',
                            'bottom': '1em'
                        },
                        'JS': {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            },
                            'text': '兑换流量'
                        }
                    },
                    'coinbtn1': {
                        'CSS': {
                            'width': '100%',
                            'text-align': 'center',
                            'margin-top': '1em'
                        },
                        'JS': {
                            'isEnables': 0,
                            'datamapping': 'respparam.signflag',
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            },
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
                    },
                    "coinbtn1_second": {
                        "CSS": {},
                        "JS": {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'coinbtn1text': {
                        'CSS': {
                            'display': 'inline-block',
                            'width': '45%',
                            'height': '3.5em',
                            'line-height': '3.5em',
                            'text-align': 'center',
                            'background': '#fff',
                            'color': '#222',
                            'font-size': '0.875em',
                            '  -moz-border-radius': '0.4em',
                            '-webkit-border-radius': '0.4em',
                            'border-radius': '0.4em'
                        },
                        'JS': {
                            'text': '签到送金币',
                            'text1': '恭喜您签到成功'
                        }
                    },
                    'coinbtn2': {
                        'CSS': {
                            'width': '100%',
                            'text-align': 'center',
                            'margin-top': '1em'
                        },
                        'JS': {
                            'isEnables': 1,
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'coinbtn2text': {
                        'CSS': {
                            'display': 'inline-block',
                            'width': '45%',
                            'height': '3.5em',
                            'line-height': '3.3em',
                            'text-align': 'center',
                            'background': '#ff7d55',
                            'color': '#222',
                            'font-size': '0.875em',
                            '-moz-border-radius': '0.4em',
                            '-webkit-border-radius': '0.4em',
                            'border-radius': '0.4em',
                            'border': '0.2em solid #fff',
                            '-webkit-box-sizing': 'border-box',
                            '-moz-box-sizing': 'border-box',
                            'box-sizing': 'border-box'
                        },
                        'JS': {
                            'text': '企业签到送金币'
                        }
                    },
                    'tipholder': {
                        'CSS': {
                            'width': '70%',
                            'height': '4em',
                            'background': 'rgba(0,0,0,0.5)',
                            'padding': '0.8em 1.5em',
                            'text-align': 'center',
                            'position': 'absolute',
                            'z-index': '101',
                            'left': '50%',
                            'margin-left': '-35%',
                            'bottom': '9em',
                            '-moz-border-radius': '4em',
                            '-webkit-border-radius': '4em',
                            'border-radius': '4em',
                            '-moz-box-sizing': 'border-box',
                            '-webkit-box-sizing': 'border-box',
                            'box-sizing': 'border-box',
                            'display': 'none'
                        },
                        'JS': {
                            'timeout': 3
                        }
                    },
                    'tiptext': {
                        'CSS': {
                            'color': '#fff',
                            'font-size': '0.875em'
                        },
                        'JS': {
                            'text': '今日签到成功，{1}个金币已存入您的金币账户',
                            'text1': '不好意思，刚刚没签上，麻烦您再签一次',
                            'text2': '不好意思，您已经签过到了，明天再来吧~',
                            'text3': '我也是醉了，系统出小差了.',
                            'coinsAdded': 0,
                            'datamapping': 'respparam.vaIncreased'
                        }
                    },
                    'coinholder': {
                        'CSS': {
                            'position': 'absolute',
                            'text-align': 'center',
                            'z-index': '9998',
                            'top': '-100px',
                            'width': '67px',
                            'height': '67px',
                            '-webkit-animation-iteration-count': '1',
                            '-webkit-animation-direction': 'normal, normal',
                            '-webkit-animation-timing-function': 'linear, ease-in',
                            '-moz-animation-iteration-count': '1',
                            '-moz-animation-direction': 'normal, normal',
                            '-moz-animation-timing-function': 'linear, ease-in',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/gold.png?V=1')",
                            'background-position': '0 0',
                            'background-repeat': 'no-repeat',
                            'background-color': 'transparent',
                            'background-size': '100% 100%'
                        },
                        'JS': {}
                    },
                    'coinholderspan': {
                        'CSS': {
                            'position': 'absolute',
                            'display': 'block',
                            '-webkit-animation-iteration-count': '1',
                            '-webkit-animation-direction': 'alternate',
                            '-webkit-animation-timing-function': 'ease-in-out',
                            '-webkit-transform-origin': '50%-100%',
                            '-moz-animation-iteration-count': '1',
                            '-moz-animation-direction': 'alternate',
                            '-moz-animation-timing-function': 'ease-in-out',
                            '-moz-transform-origin': '50%-100%'
                        },
                        'JS': {}
                    },
                    "status": {
                        'CSS': {

                        },
                        'JS': {
                            'datamapping': 'respparam.status',
                            'status': '0',
                            "status0": "2015521",
                            "status1": "2015522",
                            "status2": "2015523",
                            "status3": "2015524",
                        }
                    },
                    'c60_fbar_goldcoin_result_con': {
                        "CSS": {},
                        "JS": {
                            "showconfig": {
                                "status": "0",
                                "status0": {
                                    "display": "none"
                                },
                                "status1": {
                                    "display": "block"
                                }
                            },
                            "statusconfig": {
                                "status": "1",
                                "status1": {
                                    "tipstxt": "不要阻止我，我要去天台思考人生",
                                    "btntxt": "去首页看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/404.jpg"
                                },
                                "status2": {
                                    "tipstxt": "攻程狮正在奋力开采中，敬请期待!",
                                    "btntxt": "去首页看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/gongchengshi.jpg"
                                },
                                "status3": {
                                    "tipstxt": "我也是醉了，系统出小差了",
                                    "btntxt": "返回看看",
                                    "imgUrl": top.tlbs.templatePath + "/images/zuile.jpg"
                                }
                            }
                        }
                    },
                    "c60_fbar_link_btn": {
                        "CSS": {},
                        "JS": {
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
                var cssData = JSON.stringify($scope.compData.JS.coinholder.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle('.coinholder', '', cssData);
                cssData = JSON.stringify($scope.compData.JS.coinholderspan.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle('.coinholder span', '', cssData);
                coreService.fireEvent($scope.cid, 'init', null );
            }
            ;
            $scope.processConfig = function() {
                //mainholder
                $element.css($scope.compData.CSS);
                //circleholder
                var circleholder = angular.element($element[0].querySelector('[id="circleholder"]'));
                circleholder.css($scope.compData.JS.circleholder.CSS);
                try {
                    var height = parseInt(top.window.innerHeight);
                    if (height <= 400) {
                        circleholder.css({
                            'margin-top': '0.8em'
                        });
                    }
                } catch (e) {}

                //circle
                angular.element($element[0].querySelector('[id="circle"]')).css($scope.compData.JS.circle.CSS);
                //circletxt1
                angular.element($element[0].querySelector('[id="circletxt1"]')).css($scope.compData.JS.circletxt1.CSS);
                //circletxt2
                angular.element($element[0].querySelector('[id="circletxt2"]')).css($scope.compData.JS.circletxt2.CSS);
                //circletxt3
                angular.element($element[0].querySelector('[id="circletxt3"]')).css($scope.compData.JS.circletxt3.CSS);
                //coinbtn1
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css($scope.compData.JS.coinbtn1.CSS);
                //coinbtn1text
                angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1text.CSS);
                //coinbtn2
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css($scope.compData.JS.coinbtn2.CSS);
                //coinbtn2text
                angular.element($element[0].querySelector('[id="coinbtn2text"]')).css($scope.compData.JS.coinbtn2text.CSS);
                //tipholder
                angular.element($element[0].querySelector('[id="tipholder"]')).css($scope.compData.JS.tipholder.CSS);
                //tipholder
                angular.element($element[0].querySelector('[id="tiptext"]')).css($scope.compData.JS.tiptext.CSS);
            }
            ;
            $scope.updateCoinsData = function(eventObject) {
                coreService.fireEvent($scope.cid, 'coinUpdated');
                var totalCoins = $scope.extractData(eventObject, $scope.compData.JS.circletxt2.JS.datamapping);
                if (null  != totalCoins && totalCoins.length > 0) {
                    $scope.hideTip();
                    $scope.showSuccess();
                    $scope.compData.JS.buttonEnable = true;
                    $scope.compData.JS.circletxt2.JS.text = 0;
                    $scope.compData.JS.circletxt2.JS.newtext = $scope.extractData(eventObject, $scope.compData.JS.circletxt2.JS.datamapping) || $scope.compData.JS.circletxt2.JS.text;
                    $scope.compData.JS.tiptext.JS.coinsAdded = $scope.extractData(eventObject, $scope.compData.JS.tiptext.JS.datamapping) || $scope.compData.JS.tiptext.JS.coinsAdded;
                    $scope.compData.JS.coinbtn1.JS.isEnables = $scope.extractData(eventObject, $scope.compData.JS.coinbtn1.JS.datamapping) || $scope.compData.JS.coinbtn1.JS.isEnables;
                    if ($scope.compData.JS.coinbtn1.JS.isEnables == 0) {
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                    } else {
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text);
                    }
                    coreService.fireEvent($scope.cid, 'showsucc');
                    if ($scope.compData.JS.tiptext.JS.coinsAdded > 0 && ($scope.compData.JS.circletxt2.JS.text + $scope.compData.JS.tiptext.JS.coinsAdded) > $scope.compData.JS.circletxt2.JS.newtext) {
                        $scope.compData.JS.circletxt2.JS.newtext = $scope.compData.JS.circletxt2.JS.text + $scope.compData.JS.tiptext.JS.coinsAdded;
                    }
                    $scope.updateCoinCount();
                    if (!$scope.startUp && $scope.compData.JS.tiptext.JS.coinsAdded > 0) {
                        $scope.animationStart();
                        $scope.updateSuccessTip();
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                        $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                    } else {
                        $scope.startUp = false;
                    }
                } else {
                    $scope.compData.JS.buttonEnable = false;
                    $scope.hideTip();
                    coreService.fireEvent($scope.cid, 'showerror');
                    $scope.showError();
                    return false;
                }
            }
            ;
            $scope.showError = function() {
                //将提示页面显示出来，隐藏原来空白页面
                $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status = 1;
                angular.element($element[0].querySelector('.c60_fbar_goldcoin_result_con')).css({
                    'background': '#fff'
                });
                angular.element($element[0].querySelector('[id="circleholder"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('[id="tipholder"]')).css({
                    'display': 'none'
                });
                $scope.compData.CSS.background = '#fff';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status = 0;
                angular.element($element[0].querySelector('[id="circleholder"]')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('[id="coinbtn1"]')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('[id="coinbtn2"]')).css({
                    'display': 'block'
                });
                $scope.compData.CSS.background = '#ff7d55';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.gettaocan_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    if ($scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;
            $scope.taocanresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;
            $scope.taocanresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.taocanresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_goldcoin_result_con != null  && $scope.compData.JS.c60_fbar_goldcoin_result_con != undefined) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_goldcoin_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig && null != $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr && $scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    //coreUtils.uiTracingCdr('', "c60_fbar_link_btn", $scope.pageID);
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.updateCoinsData2 = function(param) {
                $scope.compData.JS.tiptext.JS.coinsAdded = param.respparam.vaIncreased;
                $scope.compData.JS.status.JS.status = param.respparam.status;
                if ($scope.compData.JS.status.JS.status == $scope.compData.JS.status.JS.status1 || $scope.compData.JS.status.JS.status == $scope.compData.JS.status.JS.status3) {
                    if ($scope.compData.JS.tiptext.JS.coinsAdded != null  && $scope.compData.JS.tiptext.JS.coinsAdded != undefined) {
                        coreService.fireEvent($scope.cid, 'coinIncreased', param);
                        $scope.compData.JS.circletxt2.JS.newtext = Number($scope.compData.JS.circletxt2.JS.text) + Number($scope.compData.JS.tiptext.JS.coinsAdded);
                        $scope.updateCoinCount();
                        $scope.animationStart();
                        $scope.updateSuccessTip();
                        $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                    } else {
                        $scope.updateFailesTip(true, $scope.compData.JS.tiptext.JS.text1);
                    }
                } else {
                    $scope.updateFailesTip(true, $scope.compData.JS.tiptext.JS.text1);
                }
                $scope.compData.JS.tiptext.JS.coinsAdded = 0;
                $scope.compData.JS.coinbtn1.JS.stateconfig.state = 0;
                angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1.JS.stateconfig.state0);
            }
            ;

            $scope.updateCoinsData3 = function(param) {
                $scope.compData.JS.tiptext.JS.coinsAdded = param.respparam.vaIncreased;
                if ($scope.compData.JS.tiptext.JS.coinsAdded != null  && $scope.compData.JS.tiptext.JS.coinsAdded != undefined) {
                    $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) + Number($scope.compData.JS.tiptext.JS.coinsAdded);
                }
                if (param.respparam.status == $scope.compData.JS.status.JS.status1 || param.respparam.status == $scope.compData.JS.status.JS.status3) {
                    $scope.compData.JS.coinbtn1.JS.isEnables = 0;
                    angular.element($element[0].querySelector('[id="coinbtn1text"]')).text($scope.compData.JS.coinbtn1text.JS.text1);
                }
                $scope.compData.JS.tiptext.JS.coinsAdded = 0;
            }
            ;

            $scope.updateSuccessTip = function() {
                angular.element($element[0].querySelector('[id="tiptext"]')).text($scope.compData.JS.tiptext.JS.text.replace('{1}', $scope.compData.JS.tiptext.JS.coinsAdded));
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                $timeout(function() {
                    angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                    $scope.compData.JS.tiptext.JS.coinsAdded = 0;
                }, $scope.compData.JS.tipholder.JS.timeout * 1000);
            }
            ;
            $scope.updateFailesTip = function(withTimeout, text) {
                angular.element($element[0].querySelector('[id="tiptext"]')).text(text);
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                if (withTimeout) {
                    $timeout(function() {
                        angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                    }, $scope.compData.JS.tipholder.JS.timeout * 1000);
                }
            }
            ;
            $scope.hideTip = function() {
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
            }
            ;

            $scope.hideMoney = function() {
                $scope.compData.JS.moneyListDisplay = false;
                coreService.fireEvent($scope.cid, 'moneyhide');
            }
            ;
            $scope.secondClickTip = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn1_second.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.coinbtn1_second.JS.cdrConfig && null != $scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr && $scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'personalSign')
                    };
                    coreUtils.cdrService($scope.compData.JS.coinbtn1_second.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    //coreUtils.uiTracingCdr('', "coinbtn1", $scope.pageID);
                }
                angular.element($element[0].querySelector('[id="tiptext"]')).text($scope.compData.JS.tiptext.JS.text2);
                angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'block');
                $timeout(function() {
                    angular.element($element[0].querySelector('[id="tipholder"]')).css('display', 'none');
                }, $scope.compData.JS.tipholder.JS.timeout * 1000);
            }
            $scope.error = function() {
                $scope.hideTip();
                coreService.fireEvent($scope.cid, 'showerror');
                $scope.showError();
            }
            $scope.eventMap['updateCoinsData'] = $scope.updateCoinsData;
            $scope.eventMap['updateCoinsData2'] = $scope.updateCoinsData2;
            $scope.eventMap['updateCoinsData3'] = $scope.updateCoinsData3;
            $scope.eventMap['hideMoney'] = $scope.hideMoney;
            $scope.eventMap['error'] = $scope.error;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

            $scope.circletxt3Click = function() {
                coreService.fireEvent($scope.cid, 'circletxt3Click');
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.circletxt3.JS.cdrConfig)) {
                    //if (null != $scope.compData.JS.circletxt3.JS.cdrConfig && null != $scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr && $scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr.enable) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'trafficExchange')
                    };
                    coreUtils.cdrService($scope.compData.JS.circletxt3.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    //coreUtils.uiTracingCdr('', "circletxt3", $scope.pageID);
                }
            }
            ;

            $scope.coinbtn1Click = function() {
                if ($scope.compData.JS.coinbtn1.JS.stateconfig.state == 1) {
                    return false;
                }
                if ($scope.compData.JS.buttonEnable) {
                    if ($scope.compData.JS.coinbtn1.JS.isEnables == 1) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn1.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, '', 'personalSign')
                            };
                            coreUtils.cdrService($scope.compData.JS.coinbtn1.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        $scope.compData.JS.coinbtn1.JS.stateconfig.state = 1;
                        angular.element($element[0].querySelector('[id="coinbtn1text"]')).css($scope.compData.JS.coinbtn1.JS.stateconfig.state1);
                        coreService.fireEvent($scope.cid, 'coinbtn1Click');
                    } else {
                        $scope.secondClickTip();
                    }
                }
            }
            ;

            $scope.coinbtn2Click = function() {
                if ($scope.compData.JS.buttonEnable && $scope.compData.JS.coinbtn2.JS.isEnables == 1) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.coinbtn2.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, '', 'companySign')
                        };
                        coreUtils.cdrService($scope.compData.JS.coinbtn2.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.compData.JS.moneyListDisplay = true;
                    coreService.fireEvent($scope.cid, 'coinbtn2Click');
                }
            }
            ;
            $scope.updateCoinCount = function() {
                if ($scope.runningCount == 0) {
                    var diff = Number($scope.compData.JS.circletxt2.JS.newtext) - Number($scope.compData.JS.circletxt2.JS.text);
                    $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text);
                    var count = Math.abs(diff);

                    if (count > 100) {

                        if (diff > 0) {
                            $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) + count - 100;

                        } else {
                            $scope.compData.JS.circletxt2.JS.text = Number($scope.compData.JS.circletxt2.JS.text) - count + 100;
                        }
                        count = 100;
                    }
                    $scope.runningCount = count;

                    if (diff > 0) {
                        intervalObject = $interval(incrementCount, 10, count);
                    } else if (diff < 0) {
                        intervalObject = $interval(decrementCount, 10, count);
                    }
                }
            }
            ;

            function incrementCount() {
                if ($scope.compData.JS.circletxt2.JS.text <= $scope.compData.JS.circletxt2.JS.newtext) {
                    $scope.compData.JS.circletxt2.JS.text += 1;
                    $scope.runningCount -= 1;
                }
            }
            ;

            function decrementCount() {
                if ($scope.compData.JS.circletxt2.JS.text <= $scope.compData.JS.circletxt2.JS.newtext) {
                    $scope.compData.JS.circletxt2.JS.text -= 1;
                    $scope.runningCount -= 1;
                }
            }
            ;
            $element.on('$destroy', function() {
                $interval.cancel(intervalObject);
            });
            $scope.animationStart = function() {
                animationRule();
                for (var i = 0; i < 15; i++) {
                    $element[0].appendChild(createcoin());
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;

            $scope.extractData = function(inputData, key) {
                if (null  != inputData && null  != key) {
                    var keys = key.split('.');
                    var keyData = inputData[keys[0]];
                    if (null  != keyData) {
                        for (var j = 1; j < keys.length; j++) {
                            keyData = keyData[keys[j]];
                        }
                        if (null  != keyData) {
                            return keyData;
                        } else {
                            return null ;
                        }
                    } else {
                        return null ;
                    }
                } else {
                    return null ;
                }
            }
            ;

            $scope.showcb = function() {
                $scope.compData.JS.moneyListDisplay = false;
            }
            ;

            function createcoin() {
                var html5iconElement = document.createElement('div');
                html5iconElement.className = 'coinholder';
                var html5icon = document.createElement('span');
                html5icon.innerHTML = '&nbsp;';
                html5iconElement.appendChild(html5icon);
                var fadeAndDropDuration = durationValue();
                var iconDelay = 1;
                html5iconElement.style.webkitAnimationName = 'fade, drop';
                html5iconElement.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
                html5iconElement.style.webkitAnimationDelay = iconDelay;
                html5iconElement.style.MozAnimationName = 'fade, drop';
                html5iconElement.style.MozAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
                html5iconElement.style.MozAnimationDelay = iconDelay;
                html5iconElement.style['left'] = randomInteger(10, 90) + '%';
                angular.element(html5iconElement).on(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                function(event) {
                    var source = event.target || event.srcElement;
                    $element[0].removeChild(source);
                });
                return html5iconElement;
            }

            function animationRule() {
                var lastSheet = top.top.document.styleSheets[document.styleSheets.length - 1];
                var drop_height = top.window.innerHeight;
                try {
                    lastSheet.insertRule("@-webkit-keyframes drop { 0% { -webkit-transform: translate(0px, -50px); } 100% { -webkit-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@keyframes drop { 0% { transform: translate(0px, -50px); } 100% { transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@-moz-keyframes drop { 0% { -moz-transform: translate(0px, -50px); } 100% { -moz-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
                try {
                    lastSheet.insertRule("@-o-keyframes drop { 0% { -o-transform: translate(0px, -50px); } 100% { -o-transform: translate(0px, " + drop_height + "px); } }", lastSheet.cssRules.length);
                } catch (e) {}
            }

            function durationValue() {
                return randomFloat(1, 3) + 's';
            }

            function randomFloat(low, high) {
                return low + Math.random() * (high - low);
            }

            function randomInteger(low, high) {
                return low + Math.floor(Math.random() * (high - low));
            }
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'goldcoinlayout';
            scope.init();
        }
    };
}
]);
