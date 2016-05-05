uiCore.directive('store', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        /*template : '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store">' + '<div ng-class="{\'c60_fbar_tab\':true}">' + '<ul ng-class="{\'c60_fbar_tabList\':true}" ng-style="getStyleWidth(revData,0);" id="dfdfdf" class="c60_fbar_tabList2">' + '<li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryname"></span>(<span ng-class="{\'c60_fbar_tabTitleNum\':true}" ng-bind="category.list.length"></span>)</li>' + '</ul>' + '</div>' + '<div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper">' + '<div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)">' + '<ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll>' + '<ntable  catatoryindex=$index param=catagroy ></ntable>' + '<div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"></span><div ng-bind-html="to_trusted(no_more_desc)"></div></div></ul>' + '</div>' + '</div>' + '<div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" >' + '<button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"></button>' + ' </div>' + '<div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"></div></div>' + '<div ng-class="{\'c60_fbar_pop_block2\':true}">' + '<div ng-class="{\'c60_fbar_img_bgimg\':true}"></div>' + '<div ng-class="{\'c60_fbar_img_txt_info\':true}">' + '<table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}">' + '<tr>' + '<td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"></span></td>' + '<td>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"></div>' + '<div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"></p><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"></p></div>'
				+ '</td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"></span></span></div>'
				+ '<div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="revConfirmData.effectiveWay"></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><div style="clear:both"></div><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"></span><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"></span><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"></span></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"></div>' + '</td>' + '</tr>'
				+ '<tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"></span><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"></span></td></tr>'
				+ '</table>' + '</div>'
				+ '<div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"></li></ul></div>'
				+ '<div ng-class="{\'c60_fbar_img_txt_btn2\':true}">' + '<div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div>' + '<div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" ng-click="submitConfirm()">是的，确认</div>' + '</div>' + '</div>' + '</div>',
				 */
        template: '<div ng-class="{\'c60_fbar_store\':true}" class="c60_fbar_store"><div id="cdcdcd" ng-class="{\'c60_fbar_tab\':true}"><ul ng-class="{\'c60_fbar_tabList\':true}" id="dfdfdf" class="c60_fbar_tabList2"><li ng-class="{\'c60_fbar_tabTitle\':true}" ng-repeat="category in revData" ng-style="tabCurrent($index,revData);" ccid="c60_fbar_tabcategory"  ng-click="categoryClick($index,category,true);$event.stopPropagation();"><span ng-bind="category.categoryTitle"/></li></ul></div><div ng-class="{\'c60_fbar_wrapper\':true}" class="c60_fbar_wrapper"><div ng-class="{\'c60_fbar_packageList\':true}" ng-style="getStyleWidth(revData,1)"><ul  ng-repeat="catagroy in revData"  ng-class="{\'c60_fbar_packagePriceDescList\':true}" ng-style="getStyleWidth(revData,2)" class="c60_fbar_ulwrapper" simplescroll><ntable  catatoryindex=$index param=catagroy /><div class="c60_fbar_store_no_more" ng-show="catagroy.list.length==0?true:false"><span ng-bind="no_more_title"/><div ng-bind-html="to_trusted(no_more_desc)"/></div></ul></div></div><div ng-if="compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_fixedBtn\':true}" ><button ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyle()" ccid="c60_fbar_store_buybtn" ng-click="buyNow(1);$event.stopPropagation();" ng-bind="buyNowBtn()"/></div><div ng-class="{\'c60_fbar_bg_pop_block2\':true}"  ng-click="$event.stopPropagation();"><div class="c60_fbar_bg_pop_nopkg"/></div><div ng-class="{\'c60_fbar_pop_block2\':true}"><div ng-class="{\'c60_fbar_img_bgimg\':true}"/><div ng-class="{\'c60_fbar_img_txt_info\':true}"><table cellpadding="0" cellspacing="0" ng-class="{\'c60_fbar_img_txt_table\':true}"><tr><td><span ng-class="{\'c60_fbar_haveatea\':true}" ng-style="popBlock(\'ico\')"/></td><td><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="revConfirmData.phoneNo"/><div ng-class="{\'c60_fbar_pop_txt1\':true}"><p ng-class="{\'c60_fbar_txt_green\':true}" ng-style="popBlock(\'packagename\')" ng-bind="revConfirmData.packageName"/><p ng-class="{\'c60_fbar_pkgprice\':true}" class="c60_fbar_pkgprice" ng-bind="revConfirmData.packagePrice"/></div></td></tr><tr><td colspan="2"><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==1?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight(1)" ccid="c60_fbar_store_effective1" ng-click="checkEffectiveClick(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay0"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight(2)" ccid="c60_fbar_store_effective2" ng-click="checkEffectiveClick(2);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWay1"/></span></div><div ng-class="{\'c60_fbar_txt1\':true}" ng-show="effectiveWayFlag==0?true:false">本套餐<span ng-bind="revConfirmData.effectiveWay"/></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-show="effectiveWayFlag==2?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><span ng-class="{\'c60_fbar_sx_time\':true}"><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_left\':true}" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/></span></div><div ng-class="{\'c60_fbar_pop_txt1\':true}"  ng-show="effectiveWayFlag==3?true:false"><span ng-class="{\'c60_fbar_sx_txt_out\':true}" >本套餐</span><div style="clear:both"/><span ng-class="{\'c60_fbar_sx_time2\':true}" class="c60_fbar_sx_time2"><span ng-class="{\'c60_fbar_sx_month2 c60_fbar_br_circle_left\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(1)" ccid="c60_fbar_store_effective_special1" ng-click="checkEffectiveClick2(1);$event.stopPropagation();" ng-bind="revConfirmData.effectiveWayspecial1"/><span ng-class="{\'c60_fbar_sx_month2\':true}" class="c60_fbar_sx_month2" ng-style="effectiveLeftRight2(2)" ccid="c60_fbar_store_effective_special2" ng-click="checkEffectiveClick2(2);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial2"/><span ng-class="{\'c60_fbar_sx_month3 c60_fbar_br_circle_right\':true}" ng-style="effectiveLeftRight2(3)" ccid="c60_fbar_store_effective_special3" ng-click="checkEffectiveClick2(3);$event.stopPropagation();"  ng-bind="revConfirmData.effectiveWayspecial3"/></span></div></div><div ng-class="{\'c60_fbar_pop_txt1\':true}" ng-bind="compData.JS.packageeffectstate.JS.specialdesc" ng-show="(effectiveWayFlag==2||effectiveWayFlag==3)?true:false" class="c60_fbar_pop_txt1" ng-style="popBlock(\'specialdescstyle\')"/></td></tr><tr class="c60_fbar_store_inputwarp" ng-show="compData.JS.checkCode.JS.isShow"><td colspan="2"><span style="float: left;font-size: 1em;padding-top: 0.1em;margin-right: 1em;width: 18%;height: 2.5em;line-height: 2.5em;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;" class="c60_fbar_inputTxt">验证码</span><span class="c60_fbar_inputNum" ng-bind="compData.JS.curNum"/><span class="c60_fbar_inputNumRight" ng-bind="compData.JS.keyNum"/></td></tr></table></div><div class="c60_fbar_store_keyboard"  ng-show="compData.JS.checkCode.JS.isShow"><ul class="c60_fbar_store_keyboard_warp c60_fbar_clearfloat"><li ng-repeat="item in compData.JS.keyboardNum track by $index" ng-bind="item" ng-click="numclick($index);$event.stopPropagation();" class="c60_fbar_store_keyboard_num"/></ul></div><div ng-class="{\'c60_fbar_img_txt_btn2\':true}"><div ng-class="{\'c60_fbar_left_itbtn\':true}"  ng-style="popBlock(\'cancel\')"  ccid="c60_fbar_store_closebtn" ng-click="popBlockHide();$event.stopPropagation();">不了，谢谢</div><div ng-class="{\'c60_fbar_right_itbtn\':true}" ng-style="popBlock(\'submit\')"  ccid="c60_fbar_store_btn" ng-click="submitConfirm()">是的，确认</div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce',
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.selectedPkg = {};
            //初始化套餐类型对应被选中的套餐
            $scope.homeflag = 0;
            $scope.effectiveWayFlag = 0;
            //初始化生效方式时显示状态
            $scope.effectiveLeftRightFlag = 0;
            //初始化存在两种生效方式时立即生效状态
            $scope.effectiveLeftRightFlag2 = 0;
            $scope.flowUpshiftFlag = '1';
            //初始化二次确认确认后被传递的生效状态
            $scope.buyBtnType = {};
            //初始化套餐类型对应底部按钮文字
            $scope.currentCategoryId = undefined;
            //初始化当前套餐类型ID
            $scope.eventMap = {};
            $scope.orderedPackage = {};
            $scope.packageStatus = {};
            $scope.taskId = '';
            $scope.no_more_title = '';
            $scope.no_more_desc = '';
            $scope.effecttimevalue = '0';
            $scope.effectperiod = '0';
            $scope.monthpack = '1';
            $scope.globalpackages = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            var buybtncanclick = true;
            //为防止页面响应慢，用户重复点击导致误点订购按钮
            var popupmask = undefined;
            //订购遮罩
            var confirmdialog = undefined;
            //确认框
            var submitconfirmbtn = true;
            //为防止页面响应慢，用户重复点击导致误点确认按钮
            var verify = undefined;
            //验证码输入框
            //标签类需要的总长度，如果标签类总长度不足100%，平均每个标签类平分剩余长度
            var categoryliTotalCssWidth = 0;
            var hundredwidth = 0;
            //记录标签类wrapper宽度
            //获取后台数据
            $scope.updateData = function(param, flag) {
                categoryliTotalCssWidth = 0;
                if (!flag) {
                    $scope.notFromStore = false;
                    $scope.taskId = '';
                }
                $scope.maxdisplaynum = parseInt($scope.compData.JS.tabTitleconfig.JS.maxdisplaynum);
                //可视区域显示TAB导航个数
                var word = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                if (param && param.respparam && param.respparam.packages) {
                    var temp = param.respparam.packages;
                    var pkg = null ;
                    var mn = 0;
                    $scope.no_more_title = $scope.compData.JS.nomoreconfig.JS.no_more_title;
                    $scope.no_more_desc = $scope.compData.JS.nomoreconfig.JS.no_more_desc;
                    $scope.maxdisplaynum = (param.respparam.packages.length >= $scope.maxdisplaynum && $scope.maxdisplaynum !== 0) ? $scope.maxdisplaynum : param.respparam.packages.length;
                    temp = param.respparam.packages;
                    for (var i = 0, len = temp.length; i < len; i++) {
                        temp[i].categoryTitle = temp[i].categoryname + '(' + (temp[i].list || []).length + ')';
                        categoryliTotalCssWidth += temp[i].categoryTitle.length;
                        var list = temp[i].list;
                        if (list != null  && list != undefined && list.length != 0) {
                            for (var j = 0, vlen = list.length; j < vlen; j++) {
                                pkg = list[j];
                                $scope.globalpackages[pkg.id] = pkg;
                                pkg.catagoryindex = i;
                                $scope.packageStatus[pkg.id] = pkg.status;
                                if ($scope.orderedPackage[pkg.id] == 1) {
                                    pkg.status = '0';
                                }
                                if (pkg.iscombo == '1') {
                                    pkg.iscomboflag = true;
                                    pkg.iscomboflag2 = (pkg.comboProperies == null  || pkg.comboProperies == undefined || pkg.comboProperies.length == 0) ? false : true;
                                    pkg.title = word[j];
                                    pkg.name = pkg.name;
                                } else {
                                    pkg.iscomboflag = false;
                                    pkg.iscomboflag2 = false;
                                    pkg.name = pkg.price;
                                }

                                pkg.description = pkg.desc;
                                if (pkg.comboProperies != null  && pkg.comboProperies != undefined && pkg.comboProperies.length != 0) {
                                    var keyconfig = $scope.compData.JS.packagedescstate.JS.keyconfig
                                      ,
                                    traffickey = $scope.compData.JS.packagedescstate.JS.traffickeyconfig
                                      ,
                                    n = 0;
                                    pkg.properies = {};
                                    for (var k = 0; k < pkg.comboProperies.length; k++) {
                                        for (var m in keyconfig) {
                                            if (pkg.comboProperies[k].key == m) {
                                                if (pkg.iscombo == '1') {
                                                    if (keyconfig[m].unit == null  || keyconfig[m].unit == undefined)
                                                        keyconfig[m].unit = '';
                                                    pkg.properies[n] = keyconfig[m].key + '：' + pkg.comboProperies[k].value + keyconfig[m].unit;
                                                    n++;
                                                } else if (pkg.iscombo == '0') {
                                                    if (keyconfig[m].unit == null  || keyconfig[m].unit == undefined)
                                                        keyconfig[m].unit = '';
                                                    if (pkg.comboProperies[k].key == traffickey)
                                                        pkg.title = pkg.comboProperies[k].value + keyconfig[m].unit;
                                                } else {}
                                            }
                                        }
                                    }
                                }
                                pkg.categoryid = temp[i].categoryid;
                                var packageeffectstate = $scope.compData.JS.packageeffectstate.JS.stateconfig;
                                for (var n in packageeffectstate) {
                                    if (pkg.effecttype == n) {
                                        pkg.effectdesc = packageeffectstate[n].value;
                                    }
                                }
                            }
                        }
                        {

                            var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                            var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
                            hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['width']);
                            var fontsize = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['fontSize']);
                            //console.log('dfdf', fontsize,categoryliTotalCssWidth * fontsize, hundredwidth);
                            if (categoryliTotalCssWidth * fontsize < hundredwidth) {
                                tabcontainer.css({
                                    width: '100%'
                                });
                            } else {
                                tabcontainer.css({
                                    width: categoryliTotalCssWidth + 'em'
                                });

                            }

                        }

                    }
                    //存储数据
                    $scope.revData = temp;
                    //param.respparam.packages;
                    var temppkg;
                    for (var i = 0, len = $scope.revData.length; i < len; i++) {
                        var categoryid = $scope.revData[i].categoryid;
                        //设置订购按钮文字
                        if ($scope.revData[i].list && $scope.revData[i].list && $scope.revData[i].list.length != 0) {
                            if ($scope.revData[i].list[0].iscombo != null  && $scope.revData[i].list[0].iscombo != undefined) {
                                if ($scope.revData[i].list[0].iscombo == 1) {
                                    $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1;
                                } else {
                                    $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
                                }
                            }

                            //如果用户已经选择过该套餐，则不初始化该套餐
                            if (categoryid == $scope.currentCategoryId) {
                                //add by y00131156 at 20151117 begin
                                //if no other pkg can be ordered,display the first package or the package last ordered,
                                //else display the first pkg which can be ordered
                                var lastorderedpkgindex = -1;

                                for (var tk = 0; tk < $scope.revData[i].list.length; tk++) {
                                    var tpkg = $scope.revData[i].list[tk];
                                    if (tpkg.status == '1') {
                                        $scope.selectedPkg[categoryid] = tpkg.id;
                                        $scope.compData.JS.packageIndex = tk;
                                        break;
                                    } else if (tpkg.id == $scope.userbuypkg) {
                                        lastorderedpkgindex = tk;

                                    }
                                }

                                if (!$scope.selectedPkg[categoryid]) {
                                    if (lastorderedpkgindex != -1) {
                                        $scope.selectedPkg[categoryid] = $scope.userbuypkg;
                                        $scope.compData.JS.packageIndex = lastorderedpkgindex;

                                    } else {
                                        $scope.selectedPkg[categoryid] = $scope.revData[i].list[0].id;
                                        $scope.compData.JS.packageIndex = 0;
                                    }
                                }
                                //add by y00131156 at 20151117 end
                                continue;
                            }
                            $scope.selectedPkg[categoryid] = undefined;
                            for (var j = 0; j < $scope.revData[i].list.length; j++) {
                                temppkg = $scope.revData[i].list[j];
                                if (temppkg.status == '1') {
                                    $scope.selectedPkg[categoryid] = temppkg.id;
                                    if (!$scope.currentCategoryId) {
                                        $scope.currentCategoryId = categoryid;
                                        $scope.compData.JS.tabcategoryIndex = i;
                                        $scope.compData.JS.tabTitleconfig.JS.index = i;
                                        angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
                                            'margin-left': -i * 100 + '%'
                                        });
                                        $scope.compData.JS.packageIndex = j;
                                    }
                                    break;
                                }

                            }
                        } else {
                            $scope.buyBtnType[categoryid] = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0;
                        }
                    }

                    if (top.subscribeid) {
                        $scope.changeCurrentByOid({
                            'oid': top.subscribeid
                        });
                        top.subscribeid = undefined;
                    }
                }
            }
            ;

            //编辑套餐类型对应被选中的套餐ID
            $scope.setCurrentPkgid = function(pkgid) {
                var lastpkgid = $scope.selectedPkg[$scope.currentCategoryId];
                if (pkgid != null  && pkgid != undefined && pkgid != lastpkgid) {
                    $scope.selectedPkg[$scope.currentCategoryId] = pkgid;
                    return true;
                }
                return false;
            }
            ;
            //Tab菜单样式
            $scope.tabCurrent = function(index, pkg) {
                /*console.log(top.window.getComputedStyle(tabcontainer[0], null)['width'], categoryliTotalCssWidth);
							if (index != null && index != undefined && pkg != null && pkg != undefined) {
							if (pkg.length <= $scope.maxdisplaynum) {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 100 / pkg.length + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 100 / pkg.length + '%';
							} else {
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = 1 / pkg.length * 100 + '%';
							$scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = 1 / pkg.length * 100 + '%';
							}
							if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
							} else {
							return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
							}
							}*/

                var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var hundredwidth = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['width']);
                var fontsize = parseInt(top.window.getComputedStyle(tabcontainerwrapper[0], null )['fontSize']) * 0.9;
                var width = 0;
                if (categoryliTotalCssWidth * fontsize < hundredwidth) {

                    width = pkg[index].categoryTitle.length - 0.21 + (hundredwidth / fontsize - categoryliTotalCssWidth) / pkg.length + 'em';

                } else {
                    width = pkg[index].categoryTitle.length - 0.21 + 'em';
                }
                if ($scope.compData.JS.tabTitleconfig.JS.index == index) {
                    $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1.width = width;
                    return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state1;
                } else {
                    $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0.width = width;
                    return $scope.compData.JS.tabTitleconfig.JS.stateconfig.state0;
                }

            }
            ;

            //计算选中标签类的位置，如果在可视范围以外，需要设置tabcontainer的位移
            var moveCategoryTab = (function() {
                //var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));
                var translatex = 0;
                var execute = function(currentIndex) {
                    var totalWidth = hundredwidth;
                    var ulWidth = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['width']);
                    var fontSize = parseInt(top.window.getComputedStyle(tabcontainer[0], null )['fontSize']);
                    if (totalWidth < ulWidth) {
                        if (currentIndex == $scope.revData.length - 1) {
                            translatex = totalWidth - ulWidth;
                        } else {

                            //计算当前套餐标题是否在可视区域内
                            var posx1 = 0;
                            var posx2 = 0;
                            for (var i = 0; i < currentIndex; i++) {
                                posx1 = posx1 + $scope.revData[i].categoryTitle.length;
                            }
                            posx1 = posx1 * fontSize + translatex;
                            posx2 = posx1 + $scope.revData[currentIndex].categoryTitle.length * fontSize;
                            if (posx1 < 0) {
                                translatex = translatex - posx1 + 2 * fontSize;
                                if (translatex > 0) {
                                    translatex = 0;
                                }

                            } else if (posx2 > totalWidth) {

                                translatex = translatex + totalWidth - posx2;
                            }

                        }

                        tabcontainer.css('-webkit-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-moz-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-ms-transform', 'translate(' + translatex + 'px,0px)');
                        tabcontainer.css('-o-transform', 'translate(' + translatex + 'px,0px)');

                    }
                }

                return execute;
            })();
            //Tab菜单点击事件
            $scope.categoryClick = function(index, catetory, flag) {
                if (index != null  && index != undefined && catetory != null  && catetory != undefined) {
                    $scope.compData.JS.tabcategoryIndex = index;
                    $scope.compData.JS.tabTitleconfig.JS.index = index;
                    $scope.currentCategoryId = catetory.categoryid;
                    angular.element($element[0].querySelector('.c60_fbar_packageList')).css({
                        'margin-left': -index * 100 + '%'
                    });

                    //delete by y00131156 at 20151117 use moveCategoryTab replace the below function begin
                    //resolve zjyd when click recommanded pkg,the pkg category not show fully
                    /*var marginLeft = 0;
								if (Number(index) < Number($scope.maxdisplaynum)) {
								marginLeft = 0;
								} else {
								marginLeft = -100 / $scope.maxdisplaynum * (Number(index) - Number($scope.maxdisplaynum) + 1);
								}
								angular.element($element[0].querySelector('.c60_fbar_tabList2')).css({
								'margin-left' : marginLeft + '%'
								});*/
                    //delete by y00131156 at 20151117 use moveCategoryTab replace the below function end
                    moveCategoryTab(index);
                    if (flag) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packagetitlebgstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': catetory.categoryid
                            };
                            //console.log('categoryClick');
                            coreUtils.cdrService($scope.compData.JS.packagetitlebgstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            //初始化套餐内容列表整体和个体宽度
            $scope.getStyleWidth = function(pkg, no) {
                if (pkg != null  && pkg != undefined && no != null  && no != undefined) {
                    if (no == 0) {

                    //如果套餐类总宽度>100%,直接设置宽度
                    //如果套餐类总宽度<100%，设置100%
                    /*if (pkg.length <= $scope.maxdisplaynum) {
									return {
									width : '100%'
									};
									} else {
									return {
									width : pkg.length * 100 / $scope.maxdisplaynum + '%'
									};
									}*/
                    } else if (no == 1) {
                        return {
                            width: pkg.length * 100 + '%'
                        };
                    } else {
                        return {
                            width: (100 / (pkg.length)) + '%'
                        };
                    }
                }
            }
            ;
            //底部订购按钮样式
            $scope.buyNowBtnStyle = function() {
                if ($scope.selectedPkg[$scope.currentCategoryId] != null  && $scope.selectedPkg[$scope.currentCategoryId] != undefined && $scope.selectedPkg[$scope.currentCategoryId])
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;
                else
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;

            }
            ;
            //底部订购按钮样式
            $scope.buyNowBtnStyleForEach = function(pkg) {
                if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || pkg.ordering == 1)
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state1;
                else
                    return $scope.compData.JS.buynowbtnconfig.JS.stateconfig.state;

            }
            ;
            //底部订购按钮文本
            $scope.buyNowBtn = function() {
                return $scope.buyBtnType[$scope.currentCategoryId];
            }
            ;

            $scope.buyNowBtnForEach = function(pkg) {
                var text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text0 || '立即订购';
                if (pkg.iscombo == '1') {
                    text = $scope.compData.JS.buynowbtnconfig.JS.stateconfig.text1 || '预约升档';
                }
                return text;
            }
            ;

            $scope.hideConfirmDialog = function() {
                //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                $scope.compData.JS.confirmBtn = false;
                $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
                if (!verify) {

                    verify = angular.element($element[0].querySelector('.c60_fbar_inputNum'))
                }
                verify.css({
                    'border': ''
                });
                if (!confirmdialog) {
                    confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                }
                confirmdialog.css({
                    'z-index': '0',
                    'display': 'none'
                });
                if (!popupmask) {
                    popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                }

                popupmask.css({
                    'z-index': '0',
                    'display': 'none'
                });

            }

            //取消按钮关闭事件
            $scope.popBlockHide = function() {
                //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                /*$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});
							angular.element($element[0].querySelector('.c60_fbar_pop_block2')).css({
							'z-index' : '0',
							'display' : 'none'
							});*/
                $scope.hideConfirmDialog();
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popblockconfig.JS.uitracingcancel.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pageID + "_" + 'canclebtn',
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService($scope.compData.JS.popblockconfig.JS.uitracingcancel.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //top.tlbs.cdrData = null;
            }
            ;
            //二次确认弹出层样式（小图片，套餐名，取消按钮，提交按钮）
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
                    } else if (type == 'specialdescstyle') {
                        return $scope.compData.JS.packageeffectstate.JS.specialdescstyle;
                    } else {}
                }
            }
            ;
            //二次确认弹出层存在多种生效方式时：立即和预约生效样式
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

            $scope.effectiveLeftRight2 = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        if ($scope.effectiveLeftRightFlag2 == 0) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else if (no == 2) {
                        if ($scope.effectiveLeftRightFlag2 == 1) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }
                    } else {
                        if ($scope.effectiveLeftRightFlag2 == 2) {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state0;
                        } else {
                            return $scope.compData.JS.popblockconfig.JS.effectivewayconfig.state1;
                        }

                    }
                }
            }
            ;
            //二次确认弹出层存在多种生效方式时：点击事件
            $scope.checkEffectiveClick = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag = 1;
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_0'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.flowUpshiftFlag = '1';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_1'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            $scope.checkEffectiveClick2 = function(no) {
                if (no != null  && no != undefined) {
                    if (no == 1) {
                        $scope.effectiveLeftRightFlag2 = 0;
                        $scope.effecttimevalue = '0';
                        $scope.effectperiod = '1';
                        $scope.flowUpshiftFlag = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_01'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else if (no == 2) {
                        $scope.effectiveLeftRightFlag2 = 1;
                        $scope.flowUpshiftFlag = '0';
                        $scope.effecttimevalue = '0';
                        $scope.effectperiod = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_02'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    } else {
                        $scope.effectiveLeftRightFlag2 = 2;
                        $scope.flowUpshiftFlag = '1';
                        $scope.effecttimevalue = '1';
                        $scope.effectperiod = '0';
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packageeffectstate.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': $scope.pageID + '_' + 'effectway_12'
                            };
                            coreUtils.cdrService($scope.compData.JS.packageeffectstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                    }
                }
            }
            ;
            var auhidetimeout = null ;
            //根据id查询套餐
            $scope.getpkgById = function(pkgid) {
                return $scope.globalpackages[pkgid];
            }
            ;
            //获取后台数据-二次去人弹出层显示数据

            $scope.confirmData = function(param) {
                if (param != null  && param != undefined) {
                    $scope.revConfirmData = param.respparam;
                    if ($scope.revConfirmData.packageId != null  && $scope.revConfirmData.packageId != undefined && $scope.revConfirmData.effectiveWay != null  && $scope.revConfirmData.effectiveWay != undefined) {
                        var temp = {};
                        var pkg = $scope.getpkgById($scope.revConfirmData.packageId);
                        if (pkg) {
                            $scope.monthpack = pkg.isMonthPack + '';
                            temp.packagePrice = "" + pkg.price;
                        }
                        temp.phoneNo = $scope.revConfirmData.msisdn.replace($scope.revConfirmData.msisdn.substr($scope.revConfirmData.msisdn.length == 11 ? 3 : 4, 4), "****") + ', 您好。确认订购';
                        temp.packageName = $scope.revConfirmData.packageName;

                        $scope.compData.JS.packageeffectstate.JS.specialstate = $scope.compData.JS.packageeffectstate.JS.specialstate + '';
                        $scope.compData.JS.packageeffectstate.JS.specialstateconfig = $scope.compData.JS.packageeffectstate.JS.specialstateconfig || {
                            "0": {
                                "value1": "当月生效",
                                "value2": "永久生效"
                            },
                            "1": {
                                "value": "预约生效"
                            }
                        };
                        temp.effectiveWayspecial1 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value1;
                        temp.effectiveWayspecial2 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["0"].value2;
                        temp.effectiveWayspecial3 = $scope.compData.JS.packageeffectstate.JS.specialstateconfig["1"].value;

                        if ($scope.revConfirmData.effectiveWay == 0) {
                            if ($scope.compData.JS.packageeffectstate && $scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 2;
                                $scope.effecttimevalue = '0';
                                $scope.effectperiod = '1';
                            } else {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                $scope.effectiveWayFlag = 0;
                            }
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        } else if ($scope.revConfirmData.effectiveWay == 1) {
                            if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 0;
                                temp.effectiveWay = temp.effectiveWayspecial3;
                                $scope.effecttimevalue = '1';
                                $scope.effectperiod = '0';

                            } else {
                                temp.effectiveWay = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 0;
                            }
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        } else if ($scope.revConfirmData.effectiveWay == 2) {
                            if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                                $scope.effectiveWayFlag = 3;
                                $scope.effecttimevalue = '0';
                                $scope.effectperiod = '1';
                                $scope.flowUpshiftFlag = '0';

                            } else {
                                temp.effectiveWay0 = $scope.compData.JS.packageeffectstate.JS.stateconfig[0].value;
                                temp.effectiveWay1 = $scope.compData.JS.packageeffectstate.JS.stateconfig[1].value;
                                $scope.effectiveWayFlag = 1;
                                $scope.flowUpshiftFlag = '1';
                            }
                        } else {
                            $scope.effectiveWayFlag = -1;
                            $scope.flowUpshiftFlag = $scope.revConfirmData.effectiveWay;
                        }
                        $scope.userbuypkg = $scope.revConfirmData.packageId;
                        $scope.revConfirmData = temp;
                        $scope.flag = 1;
                        submitconfirmbtn = false;
                        if (!confirmdialog) {
                            confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                        }
                        if ($scope.compData.JS.checkCode.JS.isShow) {
                            //输出随机码
                            $scope.compData.JS.keyNum = $scope.compData.JS.keyboardNum[new Date().getTime() % $scope.compData.JS.checkCodelen];
                        }

                        confirmdialog.css({
                            'z-index': '2047483647889',
                            'display': 'block'
                        });
                        if ($scope.compData.JS.checkCode.JS.isShow) {
                            confirmdialog.css({
                                'margin-bottom': '-10em'
                            });
                        }
                        setTimeout(function() {
                            submitconfirmbtn = true
                        }, Number($scope.compData.JS.delaysubmitbtn || 200));
                        auhidetimeout = setTimeout($scope.hideConfirmDialog, Number($scope.compData.JS.confirmPopupAutohide || 10) * 1000);
                        $scope.effectiveLeftRightFlag = 0;
                        $scope.effectiveLeftRightFlag2 = 0;
                    } else {
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickTime');
                    }
                }
            }
            ;
            //底部订购和升档按钮事件-传递套餐ID
            $scope.buyNow = function(clickFrom) {
                if (auhidetimeout) {
                    clearTimeout(auhidetimeout);
                    auhidetimeout = null ;
                }
                if ($scope.currentCategoryId != null  && $scope.currentCategoryId != undefined && $scope.selectedPkg[$scope.currentCategoryId] != null  && $scope.selectedPkg[$scope.currentCategoryId] != undefined) {
                    angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2')).css({
                        'z-index': '2047483647888',
                        'display': 'block'
                    });
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                        "id": $scope.selectedPkg[$scope.currentCategoryId],
                        "epageId": top.tlbs.ordersrc
                    });
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.buynowbtnconfig.JS.cdrConfig)) {
                        var cdrConfig = angular.copy($scope.compData.JS.buynowbtnconfig.JS.cdrConfig.uitracingcdr);
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': $scope.pageID + "_" + 'buybtn'
                        };
                        if ($scope.notFromStore) {
                            cdrConfig['storeData'] = false;
                        }
                        coreUtils.cdrService(cdrConfig, $scope.compData.JS.cdrData);
                    }

                    /*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
                }
            }
            ;

            //底部订购和升档按钮事件-传递套餐ID

            $scope.buyNowForEach = function(pkg, cdrflag) {
                if (auhidetimeout) {
                    clearTimeout(auhidetimeout);
                    auhidetimeout = null ;
                }

                if (pkg) {
                    if (pkg.status == '0' || $scope.orderedPackage[pkg.id] == 1 || !buybtncanclick || pkg.ordering == 1) {
                        return
                    }
                    pkg.ordering = 1;
                    setTimeout(function() {
                        pkg.ordering = 0
                    }, Number($scope.buybtnclickinterval || 500));
                    if (!popupmask) {
                        popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                    }
                    popupmask.css({
                        'z-index': '2047483647888',
                        'display': 'block'
                    });
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0', {
                        "id": pkg.id,
                        "epageId": top.tlbs.ordersrc
                    });

                    if (cdrflag != '0' && coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.buynowbtnconfig.JS.cdrConfig)) {
                        var cdrConfig = angular.copy($scope.compData.JS.buynowbtnconfig.JS.cdrConfig.uitracingcdr);
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': $scope.pageID + "_" + 'buybtn',
                            'pkgid': pkg.id
                        };
                        if ($scope.notFromStore) {
                            cdrConfig['storeData'] = false;
                        }
                        coreUtils.cdrService(cdrConfig, $scope.compData.JS.cdrData);
                    }

                    /*for (var i = 0, len = $scope.revData.length; i < len; i++) {
								if ($scope.currentCategoryId == $scope.revData[i].categoryid) {
								for (var j = 0, len2 = $scope.revData[i].list.length; j < len2; j++) {
								if ($scope.revData[i].list[j].id == $scope.selectedPkg[$scope.currentCategoryId]) {
								$scope.monthpack = $scope.revData[i].list[j].isMonthPack;
								return false;
								}
								}
								}
								}*/
                }
            }
            ;

            $scope.queryerror = function() {
                if (!popupmask) {
                    popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                }
                popupmask.css({
                    'z-index': '0',
                    'display': 'none'
                });

            }
            //二次确认弹出层中确定按钮事件-传递套餐ID+生效类型ID
            $scope.submitConfirm = function() {
                //当有二维码确认并且用户验证错误情况下，直接返回
                if ($scope.compData.JS.checkCode.JS.isShow && ($scope.compData.JS.confirmBtn == false)) {
                    return;
                }
                if (!submitconfirmbtn) {
                    return;
                }
                /*if (!confirmdialog) {
							confirmdialog = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
							}
							//将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
							$scope.compData.JS.confirmBtn = false;
							$scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
							angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({'border':''});
							confirmdialog.css({
							'z-index' : '0',
							'display' : 'none'
							});
							if (!popupmask) {
							popupmask = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
							}

							popupmask.css({
							'z-index' : '0',
							'display' : 'none'
							});*/
                $scope.hideConfirmDialog();
                var inputData;
                if ($scope.compData.JS.packageeffectstate.JS.specialstate == '1' && $scope.monthpack == '0') {
                    inputData = {
                        "id": $scope.userbuypkg,
                        "flowUpshiftFlag": $scope.flowUpshiftFlag,
                        "saleid": "",
                        "epageId": top.tlbs.ordersrc,
                        "effecttime": {
                            "value": $scope.effecttimevalue
                        },
                        "effectperiod": {
                            "value": $scope.effectperiod
                        },
                        "isMonthPack": $scope.monthpack || ''
                    };

                } else {
                    inputData = {
                        "id": $scope.userbuypkg,
                        "flowUpshiftFlag": $scope.flowUpshiftFlag,
                        "saleid": "",
                        "epageId": top.tlbs.ordersrc,
                        "effecttime": {
                            "value": $scope.flowUpshiftFlag
                        },
                        "effectperiod": {
                            "value": $scope.flowUpshiftFlag == '0' ? '1' : '0'
                        },
                        "isMonthPack": $scope.monthpack || ''
                    };
                }
                if (null  != top.tlbs.cdrData) {
                    inputData['epageId'] = top.tlbs.cdrData.pageId || '';
                }

                inputData['taskId'] = $scope.taskId || '';

                //console.log(inputData)
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'clickSubmit', inputData);
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popblockconfig.JS.uitracingsubmit.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pageID + '_' + 'okbtn',
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService($scope.compData.JS.popblockconfig.JS.uitracingsubmit.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //top.tlbs.cdrData = null;
            }
            ;
            //套餐列表样式
            $scope.packageCurrent = function(pkg) {
                var style = '';
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid,
                    style;
                    if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo == 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if ($scope.orderedPackage[pkg.id] == 1 && pkg.iscombo != 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    } else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state1;
                    } else if (pkg.status == 1 && pkg.iscombo == 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if (pkg.status == 0 && pkg.iscombo == 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state0;
                    } else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state3;
                    } else if (pkg.status == 1 && pkg.iscombo != 1 && pkg.id !== $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    } else if (pkg.status == 0 && pkg.iscombo != 1) {
                        style = $scope.compData.JS.packagetitlebgstate.JS.stateconfig.state2;
                    }
                    return style;
                }

            }
            ;
            //套餐列表中颜色块标题样式
            $scope.packageCurrent2 = function(pkg) {
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid,
                    style;
                    if (pkg.status == 0 || $scope.orderedPackage[pkg.id] == 1) {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state2;
                    } else if (pkg.id == $scope.selectedPkg[categoryid]) {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state1;
                    } else {
                        style = $scope.compData.JS.packagetitlestate.JS.stateconfig.state0;
                    }
                    return style;
                }
            }
            ;
            //单个套餐点击事件

            $scope.packageClick = function(pkg, index, flag) {
                if (index != null  && index != undefined && pkg != null  && pkg != undefined) {
                    $scope.compData.JS.packageIndex = index;
                    //if (pkg.status == 1) //去掉如果套餐不能订购无法点击的限制
                    {
                        var notExpandedBefore = $scope.setCurrentPkgid(pkg.id);
                        //如果已经展开，不需要重复记录话单
                        if (flag && notExpandedBefore) {
                            //top.tlbs.cdrData = null;
                            if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.packagetitlebgstate.JS.cdrConfig)) {
                                $scope.compData.JS['cdrData'] = {};
                                $scope.compData.JS.cdrData = {
                                    'pageId': $scope.pageID,
                                    'componentId': pkg.oid
                                };
                                coreUtils.cdrService($scope.compData.JS.packagetitlebgstate.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                            }
                            buybtncanclick = false;

                            setTimeout(function() {
                                buybtncanclick = true
                            }, Number($scope.compData.JS.delaybuybtn || 200));

                        } else {
                            buybtncanclick = true;
                        }
                    }

                }
            }
            ;

            //升档包和非升档包详情信息显示隐藏（流量，语音，短信，套餐详情，生效方式）
            $scope.packagePriceDescContentHide = function(pkg) {
                if (pkg != null  && pkg != undefined) {
                    var categoryid = pkg.categoryid;
                    if (pkg.iscombo == 1) {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state2;
                    } else if (pkg.id == $scope.selectedPkg[categoryid]) {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state1;
                    } else {
                        return $scope.compData.JS.packagedescstate.JS.stateconfig.state0;
                    }
                }
            }
            ;

            $scope.delaytime = function(param) {
                if (param != null  && param != undefined) {
                    if (param.respparam.subscribtionstatus != null  && param.respparam.subscribtionstatus != undefined && param.respparam.subscribtionstatus == 0) {
                        var pkgid = $scope.selectedPkg[$scope.currentCategoryId];
                        $scope.selectedPkg[$scope.currentCategoryId] = undefined;
                        $scope.orderedPackage[pkgid] = 1;
                        $timeout(function() {
                            for (var i = 0; i < $scope.revData.length; i++) {
                                var list = $scope.revData[i].list;
                                for (var j = 0; j < list.length; j++) {
                                    for (var j = 0; j < list.length; j++) {
                                        if (pkgid == list[j].id) {
                                            $scope.orderedPackage[pkgid] = 0;
                                            $scope.revData[i].list[j].status = $scope.packageStatus[pkgid];
                                            // if($scope.packageStatus[pkgid]=='1'&&j==0)
                                            //$scope.packageClick(list[0]);
                                        }
                                    }
                                }
                            }
                        }, $scope.compData.JS.packagetitlebgstate.JS.stateconfig.settimer);

                    }

                }
            }

            var marginLeft = 0;
            var tabcontainer = angular.element($element[0].querySelector('[id="dfdfdf"]'));

            //套餐切换
            $scope.changeCurrent = function(param, buyflag) {

                $scope.taskId = '';
                if (top.tlbs.cdrData) {
                    $scope.taskId = top.tlbs.cdrData.taskId || '';
                }
                $scope.notFromStore = true;
                var times = times || 0;
                var tipsel = angular.element($element[0].querySelector('.c60_fbar_bg_pop_nopkg'));
                var popblock = angular.element($element[0].querySelector('.c60_fbar_bg_pop_block2'));
                var confirmdiag = angular.element($element[0].querySelector('.c60_fbar_pop_block2'));
                confirmdiag.css({
                    'display': 'none',
                    'z-index': '0'
                });
                var hideTips = function() {
                    popblock.css({
                        'display': 'none',
                        'z-index': '0'
                    });
                    tipsel.css({
                        'display': 'none',
                        'z-index': '0'
                    });
                }
                ;
                var displayTips = function() {
                    tipsel[0].innerHTML = $scope.compData.JS.changingtips || '查询中...';
                    popblock.css({
                        'display': 'block',
                        'z-index': '2047483647888'
                    });
                    tipsel.css({
                        'display': 'block',
                        'z-index': '2047483647889'
                    });
                }
                ;
                var process = function() {
                    var pkg = $scope.setSelected(param);
                    if (pkg) {
                        hideTips();
                        if ((buyflag || $scope.compData.JS.directBuy) && pkg.status == '1') {
                            $scope.buyNowForEach(pkg, 0);
                        }
                    } else {
                        tipsel[0].innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
                        setTimeout(
                        hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
                    }
                }
                var remoteData = undefined;
                var onSuccess = function(data, status, headers) {
                    remoteData = data;
                    $scope.updateData(data, true);
                    process();
                }
                ;
                var onError = function(data, status, headers) {
                    tipsel.innerHTML = $scope.compData.JS.nopkgtips || '对不起，未找到指定套餐。';
                    setTimeout(
                    hideTips, Number($scope.compData.JS.pkgnofoundautohide || 2) * 1000);
                }
                ;

                displayTips();
                //如果 $scope.revData为空，触发查询
                if (!$scope.revData) {
                    coreUtils.sendRequest($scope.compData.JS.pkgservice || 'packagestore', {}, onSuccess, onError);
                } else {
                    process();
                }

            }
            ;

            $scope.setSelected = function(param) {
                if (param != null  && param != undefined) {
                    var pkgid = param.pkgid;
                    var categorys = $scope.revData || [];
                    for (var i = 0, len = categorys.length; i < len; i++) {
                        list = categorys[i].list;
                        for (var j = 0, llen = list.length; j < llen; j++) {
                            if (list[j].id == pkgid || list[j].oid == param.oid || list[j].oid == param.pkgoid) {
                                $scope.compData.JS.tabcategoryIndex = i;
                                categoryid = categorys[i].categoryid;
                                pkg = list[j];
                                $scope.categoryClick(i, categorys[i], false);
                                $scope.packageClick(pkg, j, false);
                                /*if (i <= 3) {
											marginLeft = 0;
											tabcontainer.css({
											'margin-left' : 0
											});
											} else {
											marginLeft =  - (i - 3) * 100 / 3;
											tabcontainer.css({
											'margin-left' :  - (i - 3) * 100 / 3 + '%'
											});
											}*/
                                if (list[j].status == "1") {
                                //$scope.taskId = param.taskId;
                                } else {
                                    $scope.selectedPkg[categoryid] = undefined;
                                }
                                return pkg;
                            }
                        }
                    }
                }
                return undefined;
            }
            ;

            $scope.changeCurrentByOid = function(param) {
                $scope.changeCurrent(param, true);

            }
            ;

            $scope.touchTab = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var translatex = 0;
                var tabcontainerwrapper = angular.element($element[0].querySelector('[id="cdcdcd"]'));
                var moveflag = false;
                tabcontainer.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                tabcontainer.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                });
                tabcontainer.bind(_touchend, function(e) {

                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;

                    var currentIndex = $scope.compData.JS.tabcategoryIndex;
                    var maxIndex = ($scope.revData || []).length - 1;
                    if (moveflag) {
                        if (xdistance < 0) {
                            currentIndex++;
                            if (currentIndex > maxIndex) {
                                currentIndex = maxIndex;
                            }

                        } else {
                            currentIndex--;
                            if (currentIndex < 0) {
                                currentIndex = 0;
                            }
                        }
                        $scope.categoryClick(currentIndex, $scope.revData[currentIndex], true)
                    }
                    moveflag = false;

                    //var distance = 100 / $scope.maxdisplaynum;
                    //var maxWidth =  - ($scope.revData.length - $scope.maxdisplaynum) * distance;
                    //console.log(marginLeft+'---------'+distance+'+++++++++'+xdistance)
                    /*if ($scope.revData.length > $scope.maxdisplaynum) {
								if (xdistance < 0) {
								if (marginLeft - distance >= maxWidth) {
								tabcontainer.css({
								'margin-left' : marginLeft - distance + '%'
								});
								marginLeft = marginLeft - distance;
								} else {
								tabcontainer.css({
								'margin-left' : maxWidth + '%'
								});
								marginLeft = maxWidth;
								}
								} else {
								if (marginLeft + distance <= 0) {
								tabcontainer.css({
								'margin-left' : marginLeft + distance + '%'
								});
								marginLeft = marginLeft + distance;
								} else {
								tabcontainer.css({
								'margin-left' : 0
								});
								marginLeft = 0;
								}
								}
								}*/
                    $scope.$apply();
                });
            }
            ;
            //当点击数字列表时候处理函数
            $scope.numclick = function(index) {
                var curNum = $scope.compData.JS.keyboardNum[index];
                if (Number($scope.compData.JS.keyNum) == Number(curNum)) {
                    $scope.compData.JS.confirmBtn = true;
                    $scope.compData.JS.curNum = curNum;
                    angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
                        'border': ''
                    });
                } else {
                    $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.errorTips;
                    $scope.compData.JS.confirmBtn = false;
                    angular.element($element[0].querySelector('.c60_fbar_inputNum')).css({
                        'border': '1px solid red'
                    });
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                $element.css($scope.compData.CSS || {});
                var wrapper = angular.element($element[0].querySelector(".c60_fbar_wrapper"));
                wrapper.css($scope.compData.JS.wrappercss || {
                    "padding-bottom": "1em"
                });
                var pricetips = angular.element($element[0].querySelector(".c60_fbar_pkgprice"));
                pricetips.css($scope.compData.JS.pricetipscss || {
                    "font-size": "1em",
                    "color": "red"
                });
                //将配置中的数字转化为数组-----start
                if ($scope.compData.JS.checkCode.JS.isShow) {
                    var nums = $scope.compData.JS.checkCode.JS.nums;
                    if (nums == undefined || nums == null  || nums == "") {
                        nums = $scope.compData.JS.checkCode.JS.defaultNum;
                    }
                    var numarr = [];
                    $scope.compData.JS.checkCodelen = nums.length < 6 ? nums.length : 6;
                    for (var i = 0; i < $scope.compData.JS.checkCodelen; i++) {
                        numarr[i] = nums[i];
                    }
                    //输出选择数字列表
                    $scope.compData.JS.keyboardNum = numarr;
                    $scope.compData.JS.curNum = $scope.compData.JS.checkCode.JS.curNum;
                    //将"是的，确认"按钮状态修改为不可点击，直到用户二维码才对位置
                    $scope.compData.JS.confirmBtn = false;
                }
                //将配置中的数字转化为数组-----end
                coreService.fireEvent($element.attr('cid'), 'init');
                $scope.touchTab();

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

            $scope.eventMap['changecurrent'] = $scope.changeCurrent;
            $scope.eventMap['changecurrentbyoid'] = $scope.changeCurrentByOid;
            $scope.eventMap['confirm'] = $scope.confirmData;
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['delaytime'] = $scope.delaytime;
            $scope.eventMap['queryerror'] = $scope.queryerror;
            $scope.eventMap['hideConfirmDialog'] = $scope.hideConfirmDialog;

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
