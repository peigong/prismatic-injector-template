uiCore.directive('minecoin', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: //'<div>aaa</div>',
        '<div ccid="c60_fbar_minecoin" ng-style="compData.JS.c60_fbar_minecoin.CSS">'

        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">'
        + '    <div class="c60_fbar_tips_txt_coin" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>'
        + '   </div>'

        + '   <div class="c60_fbar_my_coin_con" ><div simplescroll>'
        + '    <div class="c60_fbar_my_coin_top c60_fbar_clearfloat">'
        + '     <div class="c60_fbar_coin_img_txt">'
        + '      <span class="c60_fbar_myjinbi"></span>'
        + '      <div class="c60_fbar_money_txt">'
        + '       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_type" ng-bind="compData.JS.c60_fbar_coin_type.JS.text"></span><span ng-bind="revData.respparam.total"></span></p>'
        + '       <p class="c60_fbar_money_txt_p"><span class="c60_fbar_coin_detail"  ng-bind="compData.JS.c60_fbar_coin_detail.JS.text"></span><span ng-bind="revData.respparam.totaldata"></span></p>'
        + '      </div>'
        + '     </div>'
        + '     <div class="c60_fbar_exchange_btn">'
        + '      <a class="c60_fbar_exchange_btn_link" ccid="c60_fbar_exchange_btn_link" ng-style="getexchange_btnStyle()" ng-click="click(\'c60_fbar_exchange_btn_link\')"  ng-bind="compData.JS.c60_fbar_exchange_btn_link.JS.text"></a>'
        + '     </div>'
        + '    </div>'

        + '    <div class="c60_fbar_exchange_flux_con" ng-show="isexchange_flux_conShow()">'
        + '     <span class="c60_fbar_arrow_top"></span>'
        + '     <p class="c60_fbar_tit"><span ng-bind="compData.JS.c60_fbar_tit1.JS.text"></span><span class="c60_fbar_tit_txt_gray" ng-bind="compData.JS.tit_txt_gray.JS.text" ng-show="compData.JS.tit_txt_gray.JS.isShow"></span></p>'
        + '     <div class="c60_fbar_type c60_fbar_clearfloat">'
        + '      <span class="c60_fbar_type_exchange" ccid="c60_fbar_type_exchange" ng-bind="compData.JS.c60_fbar_type_exchange.JS.text"></span>'
        + '      <ul>'
        + '       <li ng-repeat="item in coinTypes" ng-click="selectedClick($index)" ng-style="isSelected($index)" ng-bind="item.productname"></li>'
        + '      </ul>'
        + '     </div>'
        + '     <div class="c60_fbar_mobile c60_fbar_clearfloat">'
        + '      <span class="c60_fbar_type_exchange2" ng-bind="compData.JS.c60_fbar_mobile.JS.text"></span><span ng-bind="phoneFilter(revData.respparam.msisdn)"></span>'
        + '      <span class="c60_fbar_mobile_txt_gray" ng-bind="compData.JS.c60_fbar_mobile_txt_gray.JS.text"></span>'
        + '     </div>'
        + '     <div class="c60_fbar_exchange_flux_btn" ccid="c60_fbar_exchange_flux_btn">'
        + '      <a class="c60_fbar_exchange_flux_btn_link" ng-style="getexchange_flux_btn_linkStyle()" ng-click="click(\'c60_fbar_exchange_flux_btn\');" ng-bind="compData.JS.c60_fbar_exchange_flux_btn_link.JS.text"></a>'
        + '     </div>'
        + '    </div>'

        + '    <ul class="c60_fbar_mycoin_tab c60_fbar_clearfloat" ng-style="getmycoin_tabStyle()">'
        + '     <li ng-style="getStyleUp(0)" ccid="c60_fbar_mycoin_tab0" ng-click="handClick(0)"  ng-bind="compData.JS.c60_fbar_mycoin_tab0.JS.text"></li>'
        + '     <li ng-style="getStyleUp(1)" ccid="c60_fbar_mycoin_tab1" ng-click="handClick(1)"  ng-bind="compData.JS.c60_fbar_mycoin_tab1.JS.text"></li>'
        + '    </ul>'
        //

        + '  <div class="c60_fbar_mycoin_date c60_fbar_money_detail0" ng-style="getmoney_detail0Style()" ng-show="isShow(0)"> '
        + '   <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat"> '
        + '    <li ng-repeat="item in compData.JS.detail.money_detail0.head"><span ng-bind="item"></span></li> '
        + '   </ul> '
        + '   <div class="c60_fbar_mycoin_date_detail"> '
        + '    <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.detail"> '
        + '      <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li> '
        + '      <li ng-bind="item.sourceName"></li> '
        + '      <li ng-bind="item.count"></li> '
        + '    </ul> '
        + '    <div class="c60_fbar_c60_toolbar_loading_more0" ccid="c60_fbar_c60_toolbar_loading_more0" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more0Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">'
        + '    </div>'
        + '   </div> '
        + '   </div> '

        + '  <div class="c60_fbar_mycoin_date c60_fbar_money_detail1" ng-style="getmoney_detail1Style()" ng-show="isShow(1)"> '
        + '   <ul class="c60_fbar_mycoin_date_title c60_fbar_clearfloat"> '
        + '    <li ng-repeat="item in compData.JS.detail.money_detail1.head"><span ng-bind="item"></span></li> '
        + '   </ul> '
        + '   <div class="c60_fbar_mycoin_date_detail"> '
        + '    <ul class="c60_fbar_mycoin_date_detail_ul c60_fbar_clearfloat" ng-repeat="item in revData.respparam.history" > '
        + '      <li><p ng-bind="dateFilter(item.time,true)"></p><p ng-bind="dateFilter(item.time,false)"></p></li> '
        + '     <li><span ng-bind="item.data"></span><span ng-bind="item.unit"></span></li> '
        + '     <li><span ng-bind="item.cost"></span></li> '
        + '    </ul> '
        + '    <div class="c60_fbar_c60_toolbar_loading_more1" ccid="c60_fbar_c60_toolbar_loading_more1" ng-bind="compData.JS.c60_fbar_c60_toolbar_loading_more.JS.text" ng-style="getc60_fbar_c60_toolbar_loading_more1Style();" ng-click="click(\'c60_toolbar_loading_more\');$event.stopPropagation();">'
        + '    </div>'

        + '</div>'
        + '   </div> '
        + '  </div>'
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
                "JS": {}
            };
            $scope.getexchange_flux_btn_linkStyle = function() {
                if ($scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state1;
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
            var stringToArray = function() {
                //金币明细标题内容
                var len = Number($scope.compData.JS.detail.money_detail0.len);
                $scope.compData.JS.detail.money_detail0.head = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.detail.money_detail0.head.push($scope.compData.JS.detail.money_detail0["head" + i]);
                }
                //兑换历史标题内容
                len = Number($scope.compData.JS.detail.money_detail1.len);
                $scope.compData.JS.detail.money_detail1.head = [];
                for (var i = 0; i < len; i++) {
                    $scope.compData.JS.detail.money_detail1.head.push($scope.compData.JS.detail.money_detail1["head" + i]);
                }
                //初始化数据
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                //将后台字符串转换为数组
                stringToArray();
            }
            ;
            $scope.phoneFilter = function(input) {
                if (input == undefined)
                    return '';
                var ret = input.substring(0, 3) + "****" + input.substring(7);
                return ret;
            }
            ;
            $scope.dateFilter = function(input, flag) {
                if (input == undefined)
                    return '';
                if (flag) {
                    var ret = input.substring(0, 4) + "-" + input.substring(4, 6)
                    + "-" + input.substring(6, 8)

                } else {
                    var ret = input.substring(8, 10)
                    + ":" + input.substring(10, 12) + ":" + input.substring(12, 14);
                }
                return ret;
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
            $scope.getexchange_btnStyle = function() {
                if ($scope.compData.JS.exchange_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.exchange_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.exchange_btn.JS.stateconfig.state1;
                }
            }
            ;
            $scope.isexchange_flux_conShow = function() {
                return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state == 1 ? true : false;
            }
            ;

            var myClick = {
                c60_fbar_exchange_btn_link: function(param) {
                    //跟踪话单
                    //								if($scope.compData.JS.c60_fbar_exchange_btn_link.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_fbar_exchange_btn_link",$scope.pageID);//如果taskid没有的话，置为空''
                    //								}
                    //
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_exchange_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'exclink')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_exchange_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.exchange_btn.JS.stateconfig.state == 0) {
                        //从接口查找金币种类
                        $scope.getCoinTypes();
                        $scope.compData.JS.exchange_btn.JS.stateconfig.state = 1;
                        $scope.compData.JS.exchange_flux_con.JS.stateconfig.state = 1;

                    } else {
                        $scope.compData.JS.exchange_btn.JS.stateconfig.state = 0;
                        $scope.compData.JS.exchange_flux_con.JS.stateconfig.state = 0;
                    }
                },
                c60_fbar_exchange_flux_btn: function(param) {
                    if ($scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state == 1) {
                        return false;
                    }
                    $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 1;
                    //跟踪话单
                    //								if($scope.compData.JS.c60_fbar_exchange_flux_btn.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_fbar_exchange_flux_btn",$scope.pageID);//如果taskid没有的话，置为空''
                    //								}

                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.exchange_flux_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'excflux')
                        };
                        coreUtils.cdrService($scope.compData.JS.exchange_flux_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    //获取到金币种类
                    var productid = $scope.coinTypes[$scope.compData.JS.exchange_flux_con.JS.stateconfig.index].productid;
                    //向后台发送请求
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'sendExchange',
                    {
                        'dataID': productid,
                        'count': '1'
                    });
                },
                c60_toolbar_loading_more: function(param) {
                    //跟踪话单
                    //								if($scope.compData.JS.c60_toolbar_loading_more.JS.uitracingflag == true){
                    //									  coreUtils.uiTracingCdr('',"c60_toolbar_loading_more"+$scope.compData.JS.detail.index,$scope.pageID);//如果taskid没有的话，置为空''
                    //								}
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_loading_more.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'more') + $scope.compData.JS.detail.index
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_toolbar_loading_more.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if ($scope.compData.JS.detail.index == 0) {
                        $scope.compData.JS.detail.money_detail0.number = Number($scope.compData.JS.detail.money_detail0.number) + Number($scope.compData.JS.detail.step);
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': 1,
                            'noteNo': $scope.compData.JS.detail.money_detail0.number
                        });
                    } else {
                        $scope.compData.JS.detail.money_detail1.number = Number($scope.compData.JS.detail.money_detail1.number) + Number($scope.compData.JS.detail.step);
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': 1,
                            'noteNo': $scope.compData.JS.detail.money_detail1.number
                        });
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
                case 'c60_fbar_exchange_btn_link':
                    myClick.c60_fbar_exchange_btn_link(param);
                    break;
                case 'c60_fbar_exchange_flux_btn':
                    myClick.c60_fbar_exchange_flux_btn(param);
                    break;
                case 'c60_toolbar_loading_more':
                    myClick.c60_toolbar_loading_more(param);
                    break;
                default:

                }
            }
            ;
            $scope.selectedClick = function(index) {
                //跟踪话单
                //						if($scope.compData.JS.c60_fbar_type_exchange.JS.uitracingflag == true){
                //							  coreUtils.uiTracingCdr('',"c60_fbar_type_exchange",$scope.pageID);//如果taskid没有的话，置为空''
                //						}
                //
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_type_exchange.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'typexc')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_type_exchange.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.exchange_flux_con.JS.stateconfig.index = index;
            }
            ;
            $scope.isSelected = function(index) {
                if ($scope.compData.JS.exchange_flux_con.JS.stateconfig.index == index) {
                    return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.exchange_flux_con.JS.stateconfig.state0;
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
            //兑换成功后显示信息
            $scope.getExchangeRes = function(inputData) {
                if (inputData && inputData.respparam) {
                    var retd = inputData.respparam;
                    //兑换成功
                    if (retd.status == "success") {
                        var descId = $scope.compData.JS.exchange_flux_con.JS.respons["defaultSuccessCode"];
                        var descRev = "";
                        var invoice = '';
                        //当desc为空时候
                        if (inputData.respparam.desc == undefined || inputData.respparam.desc == "" || inputData.respparam.desc == null ) {
                            descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId];
                        } else {
                            //当desc没有对应的文字描述时候
                            var descTxt = $scope.compData.JS.exchange_flux_con.JS.respons[inputData.respparam.desc];
                            if (descTxt == undefined || descTxt == null  || descTxt == "") {
                                descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId] || "";
                            } else {
                                descRev = descTxt || "";
                            }
                        }
                        if (inputData.respparam.invoice) {
                            invoice = inputData.respparam.invoice;
                        }
                        var outputDesc = descRev
                        + $scope.coinTypes[$scope.compData.JS.exchange_flux_con.JS.stateconfig.index].productname
                        + $scope.compData.JS.tips1 + invoice + $scope.compData.JS.tips2;
                        $scope.bg_black_popShow(outputDesc);
                        //兑换成功之后需要刷新数据
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'init', {
                            'startNote': '1',
                            'noteNo': '10'
                        });
                        var param = {
                            "respparam": {
                                "vaIncreased": (0 - Number(invoice))
                            }
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'updateCoinsTotal', param);
                    } else {
                        //兑换失败
                        var descId = $scope.compData.JS.exchange_flux_con.JS.respons["defaultErrorCode"];
                        var descRev = "";
                        var invoice = '';
                        //当desc为空时候
                        if (inputData.respparam.desc == undefined || inputData.respparam.desc == "" || inputData.respparam.desc == null ) {
                            descRev = $scope.compData.JS.exchange_flux_con.JS.respons[descId];
                        } else {
                            //当desc没有对应的文字描述时候
                            var descTxt = $scope.compData.JS.exchange_flux_con.JS.respons[inputData.respparam.desc];
                            if (descTxt == undefined || descTxt == null  || descTxt == "") {
                                descRev = inputData.respparam.desc;
                            } else {
                                descRev = descTxt;
                            }
                        }
                        if (inputData.respparam.invoice) {
                            invoice = inputData.respparam.invoice
                        }
                        var outputDesc = descRev;
                        $scope.bg_black_popShow(outputDesc);
                    }
                    $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 0;
                }
            }
            ;
            $scope.eventMap['getExchangeRes'] = $scope.getExchangeRes;
            $scope.getCoinTypes = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'getTypes');
            }
            ;
            //接收来自后台的数据
            $scope.getTypesFunc = function(inputData) {
                if (inputData.respparam.datas) {
                    if (inputData.respparam.datas.length > 0) {
                        //$scope.coinTypes  = inputData.respparam.datas;
                        var product = inputData.respparam.datas;
                        $scope.coinTypes = [];
                        var len = product.length;
                        if ($scope.compData.JS.maxtype == '' || $scope.compData.JS.maxtype == undefined || $scope.compData.JS.maxtype == null ) {
                            $scope.compData.JS.maxtype = 4;
                        }
                        var finallen = len > $scope.compData.JS.maxtype ? $scope.compData.JS.maxtype : len;
                        for (var i = 0; i < len; i++) {
                            if (i < finallen) {
                                $scope.coinTypes[i] = product[i] || {};
                            }
                        }
                        $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 0;
                    } else {
                        $scope.compData.JS.exchange_flux_btn_link.JS.stateconfig.state = 1;
                    }
                }

            }
            ;
            $scope.eventMap['getTypesFunc'] = $scope.getTypesFunc;
            $scope.getStyleUp = function(index) {
                var flag = false;
                if ($scope.compData.JS.detail.index == index) {
                    return $scope.compData.JS.detail.state1;
                } else {
                    return $scope.compData.JS.detail.state0;
                }
            }
            ;
            $scope.isShow = function(index) {
                if ($scope.compData.JS.detail.index == index) {
                    return true;
                } else {
                    return false;
                }
            }
            ;
            $scope.getc60_fbar_c60_toolbar_loading_more0Style = function() {
                if (Number($scope.compData.JS.detail.money_detail0.number) <= Number($scope.compData.JS.detail.money_detail0.totalget)) {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more0')).css({
                        'display': 'block'
                    });
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more0')).css({
                        'display': 'none'
                    });
                }
            }
            $scope.getc60_fbar_c60_toolbar_loading_more1Style = function() {
                if (Number($scope.compData.JS.detail.money_detail1.number) <= Number($scope.compData.JS.detail.money_detail1.totalget)) {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more1')).css({
                        'display': 'block'
                    });
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_loading_more1')).css({
                        'display': 'none'
                    });
                }
            }
            $scope.handClick = function(index) {
                //跟踪话单
                //						if($scope.compData.JS.c60_fbar_mycoin_tab.JS.uitracingflag == true){
                //							  coreUtils.uiTracingCdr('',"c60_fbar_mycoin_tab"+index,$scope.pageID);//如果taskid没有的话，置为空''
                //						}
                //
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_mycoin_tab.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'tab') + index
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_mycoin_tab.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                $scope.compData.JS.detail.index = index;
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                if (inputData && inputData.respparam) {
                    $scope.revData = inputData;
                }
                //更新明细和历史
                if (inputData.respparam.detail) {
                    $scope.compData.JS.detail.money_detail0.totalget = inputData.respparam.detail.length;
                }
                if (inputData.respparam.history) {
                    $scope.compData.JS.detail.money_detail1.totalget = inputData.respparam.history.length;
                }
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
            $scope.componentType = "cminecoin";
            $scope.init();
        }
    };
});
