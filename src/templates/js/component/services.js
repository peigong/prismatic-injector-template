uiCore.directive('tcpack', [function() {

    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            tpitem: '=tpitem',
        },
        template: '<div><div class="c60_fbar_taocan_type c60_fbar_clearfloat"><div class="c60_fbar_taocan_type_info" ng-bind="tpitem.packagename"></div><div class="c60_fbar_taocan_surplus_info" ng-bind="\'剩余\'+tpitem.remain +tpitem.remainunit"></div></div><div class="c60_fbar_line"><div class="c60_fbar_line_in_green lineStyle" ng-style="tpitem.linestyle"><span class="c60_fbar_faceStyle faceStyle" ng-style="tpitem.imagestyle"></span></div></div></div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {

            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
uiCore.directive('popuppuretext', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popuppuretext"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureTextStyle(\'title\')" ng-bind="pureTextText(\'title\')"></span></div>' + '<div class="c60_fbar_wchimg_txt_info">' + '<div class="c60_fbar_wchpop_txt2"  ng-style="pureTextStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn"  ccid="c60_fbar_popuppuretext_btnclose"  ng-bind="pureTextText(\'cancel\')" ng-style="pureTextStyle(\'cancel\')"></div>' + '<div class="c60_fbar_wchright_itbtn"  ccid="c60_fbar_popuppuretext_btn" ng-bind="pureTextText(\'detail\')" ng-style="pureTextStyle(\'detail\')"></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce',
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.message != null  && param.message != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        $scope.revData.message = param.message;
                    } else {
                        $scope.revData.message = '';
                    }
                    if (param.campaign != null  && param.campaign != undefined) {
                        var temp = param.campaign;
                        //modify by y00131156 at 20150820 begin
                        //如果campainurl为空，取默认配置
                        $scope.revData.url = temp.url || $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = temp.linkType || $scope.compData.JS.popupbtnconfig.JS.linktype;
                        //modify by y00131156 at 20150820 end
                    } else {
                        $scope.revData.url = $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = $scope.compData.JS.popupbtnconfig.JS.linktype;
                    }
                    //add by y00131156 at 20150820 begin
                    //如果没有url，则不显示去看详情按钮
                    if (!$scope.compData.JS.popupbtnconfig.JS.url) {
                        $element[0].querySelector(".c60_fbar_wchright_itbtn").style.display = 'none';
                        $element[0].querySelector(".c60_fbar_wchleft_itbtn").style.width = '100%';
                    }
                    //add by y00131156 at 20150820 end


                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              ,
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn'))
              ,
            container2 = angular.element($element[0].querySelector('.c60_fbar_wchright_itbtn'));

            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                })
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                $scope.compData.JS.popupbtnconfig.JS.linktype = $scope.compData.JS.popupbtnconfig.JS.linktype + '';
                /* if($scope.compData.JS.popupbtnconfig.JS.linktype=='0')
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click0');
                     else
                        window.open($scope.compData.JS.popupbtnconfig.JS.url);*/
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.revData.linkType,
                    "url": $scope.revData.url
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'returnbtn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            });

            $scope.pureTextStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state1;
                        break;
                    case 'message':
                        return $scope.compData.JS.popupcolorconfig.JS.stateconfig.state;
                        break;
                    default:
                        break;
                    }
                }
            }
            ;
            $scope.pureTextText = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.title;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title1;
                        break;
                    default:
                        break;
                    }
                }
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
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
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popuppuretext';
            $scope.init();
        }
    }
}
]);
uiCore.directive('iapplink', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder" ccid="mainholder"><ul class="c60_fbar_app_list"><li id="innerholder" ccid="c60_fbar_gcapplink" ng-style="getInnerholderStyle(app.JS.id)" ng-repeat="app in arrays" ng-click="appLinkClick(app.JS.id)"><div id="c60_fbar_appwrap" class="c60_fbar_appwrap" ng-style="getappwrapstyle()"><div class="c60_fbar_appimgwrap" ng-style="getConfigStyle(app.JS.id)"><div class="c60_fbar_app_textwrap" style="width:53%;float:right"><h5 id="appname" ng-style="getStyles(\'appname\')">{{app.JS.appname.JS.text}}</h5><p id="appdesc"  ng-style="getStyles(\'appdesc\')">{{app.JS.appdesc.JS.text}}</p></div></div></div></li></ul></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
                $scope.arrays = [];
                if ($scope.compData && $scope.compData.JS) {
                    var len = $scope.compData.JS.text.JS.len;
                    for (var i = 0; i < len; i++) {
                        $scope.arrays.push($scope.compData.JS[($scope.compData.JS.text.JS["text" + i])]);
                    }
                }
            }
            ;
            $scope.getappwrapstyle = function() {
                if ($scope.arrays.length == 1) {
                    return {
                        'width': '53%',
                        'margin': '0 auto'
                    }
                } else {
                    return {
                        'width': '100%',
                        'margin': '0 auto'
                    }
                }
            }
            ;
            $scope.getInnerholderStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        return $scope.compData.JS[input].JS.innerholder.CSS;
                    }
                }
            }
            ;
            $scope.getStyles = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
                        return $scope.compData.JS[input].CSS;
                    }
                }
            }
            ;
            $scope.getConfigStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        /*if($scope.arrays.length == 1){
	                        		$scope.compData.JS[input].JS.iconholder.CSS['background-position']='18% 40%';
	                        	}*/
                        return $scope.compData.JS[input].JS.iconholder.CSS;
                    }
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
            }
            ;
            $scope.appLinkClick = function(name) {
                if (name) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS[name].JS.mainholder.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, name)
                        };
                        coreUtils.cdrService($scope.compData.JS[name].JS.mainholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($scope.cid, name + 'Click');
                }
            }
            ;
            $scope.processConfig = function() {
                if ($scope.compData && $scope.compData.JS) {
                    //mainholder
                    $element.css($scope.compData.CSS);
                    //innerholder
                    //angular.element($element[0].querySelector('[id="innerholder"]')).css($scope.compData.JS.innerholder.CSS);
                    //iconholder
                    //angular.element($element[0].querySelector('[id="iconholder"]')).css($scope.compData.JS.iconholder.applink.CSS);
                    //appname
                    angular.element($element[0].querySelector('[id="appname"]')).css($scope.compData.JS.appname.CSS);
                    //appdesc
                    angular.element($element[0].querySelector('[id="appdesc"]')).css($scope.compData.JS.appdesc.CSS);
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iapplink';
            scope.init();
        }
    };
}
]);
uiCore.directive('dashboard', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_cesu_con_wrapper"><div class="c60_fbar_cesu_con" simplescroll><ul class="c60_fbar_cs_toptitle c60_fbar_clearfloat"><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.networktitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.network></div></li><li><div class="c60_fbar_cs_toptitle_uptxt" ng-bind=compData.js.speedtitle></div><div class="c60_fbar_cs_toptitle_downtxt" ng-bind=compData.js.speed></div></li></ul>'
        + '<div class="c60_fbar_cs_plate"><div class="c60_fbar_cs_plate_bg"><div class="c60_fbar_cs_plate_point"></div><div class="c60_fbar_cs_plate_circle1"></div><div class="c60_fbar_cs_plate_uptxt" ng-bind=compData.js.network></div><div class="c60_fbar_cs_plate_downtxt"><div class="c60_fbar_cs_plate_downtxt_num" ng-bind=compData.js.speedvalue></div><div class="c60_fbar_cs_plate_downtxt_unit" ng-bind=compData.js.speedunit></div></div></div></div><div class="c60_fbar_cs_btn" ><span ng-click=speedtest() class="c60_fbar_cs_btn_link" ccid="c60_fbar_cs_btn_link" ng-bind=compData.js.btntext>开始测速</span></div>'
        + '<div class="c60_fbar_cs_result"><div class="c60_fbar_cs_result_tit" ng-bind=compData.js.result></div>'
        + '<div class="c60_fbar_csr_imgtxt c60_fbar_clearfloat"><div class="c60_fbar_csr_imgtxt_left"><span class="c60_fbar_csr_imgtxt_left_img"><img class="c60_fbar_csr_img_feiji" ng-src="{{compData.js.resultimg}}" alt=""></span></div><div class="c60_fbar_csr_imgtxt_right">'
        + '<div class="c60_fbar_csr_itr_uptxt"><span ng-bind=compData.js.desc></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.traffic></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.inter>/S<span></div>'
        + '<div class="c60_fbar_csr_itr_downtxt"><span ng-bind=compData.js.detail1></span><span class="c60_fbar_csr_itr_orangetxt" ng-bind=compData.js.percent></span><span ng-bind=compData.js.detail2></span></div></div></div>'
        + '<div class="c60_fbar_cs_result_progess"><div class="c60_fbar_csr_progess_line"><div class="c60_fbar_csr_plt_line2 c60_fbar_csr_bg_73d7bd"></div><div class="c60_fbar_csr_plt_con"><span class="c60_fbar_csr_plt_ico" ng-repeat="image in imagelist"><img class="c60_fbar_csr_pl_ico c60_fbar_csr_bg_dcdcdc" ng-style="{{image.style}}" ng-src="{{image.src}}" alt=""/></span></div></div></div></div>'
        + '<div class="c60_fbar_cs_tips"><div class="c60_fbar_cs_tips_tit" ng-bind=compData.js.tipstitle></div><div class="c60_fbar_cs_tips_txt" ng-bind=compData.js.tips></div></div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.testing = false;
            var lineelement = angular.element($element[0].querySelector('.c60_fbar_csr_plt_line2'));
            var clickbtn = angular.element($element[0].querySelector('.c60_fbar_cs_btn_link'));
            var resultimage = angular.element($element[0].querySelector('.c60_fbar_csr_imgtxt_left_img'));
            var result = angular.element($element[0].querySelector('.c60_fbar_cs_result'));
            var tips = angular.element($element[0].querySelector('.c60_fbar_cs_tips'));
            var point = angular.element($element[0].querySelector('.c60_fbar_cs_plate_point'));
            var insertAnimateRule = function() {
                try {
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i = sheets.length - 1; i >= 0; i--) {
                        if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                            lastSheet = sheets[i];
                            len = sheets[i].cssRules.length;
                            break;
                        }
                    }
                    var csstext;
                    try {
                        csstext = "@-webkit-keyframes speedpoint_animation {0% {-webkit-transform: rotate(35deg);} 25% { -webkit-transform: rotate(135deg);} 50% {-webkit-transform: rotate(235deg);} 75% {-webkit-transform: rotate(135deg);} 100% {-webkit-transform: rotate(35deg);}}";
                        lastSheet.insertRule(csstext, len);
                    } catch (e) {
                        try {
                            csstext = "@keyframes speedpoint_animation {0% {transform: rotate(35deg);} 25% {transform: rotate(135deg);} 50% {transform: rotate(235deg);} 75% {transform: rotate(135deg);} 100% {transform: rotate(35deg);}}";
                            lastSheet.insertRule(csstext, len);
                        } catch (e) {
                            try {
                                csstext = "@-moz-keyframes speedpoint_animation {0% {-moz-transform: rotate(35deg);} 25% { -moz-transform: rotate(135deg);} 50% {-moz-transform: rotate(235deg);} 75% {-moz-transform: rotate(135deg);} 100% {-moz-transform: rotate(35deg);}}";
                                lastSheet.insertRule(csstext, len);
                                //lastSheet.insertRule("@-moz-keyframes c60_fbar_buoy_jump_animation {0% {-moz-transform: translate(-500px, -300px);} 40% { -moz-transform: translate(-500px, -0px);} 60% {-moz-transform: translate(-500px, -80px);} 70% {-moz-transform: translate(-500px, -0px);} 80% {-moz-transform: translate(-500px, -30px);} 90% {-moz-transform: translate(-500px, 0px);} 100% {-moz-transform: translate(-500px, 0px);}}", len);
                            } catch (e) {
                                try {
                                    csstext = "@-o-keyframes speedpoint_animation {0% {-o-transform: rotate(35deg);} 25% { -o-transform: rotate(135deg);} 50% {-o-transform: rotate(235deg);} 75% {-o-transform: rotate(135deg);} 100% {-o-transform: rotate(35deg);}}";
                                    lastSheet.insertRule(csstext, len);
                                } catch (e) {
                                    throw e
                                }
                            }
                        }
                    }
                } catch (e) {}
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData.js.btntext = $scope.compData.js.beforetesttext;
                $element.css($scope.compData.css);
                insertAnimateRule();
            }
            ;

            $scope.update = function(data) {
                $scope.compData.js = coreUtils.extendDeep($scope.compData.js, data.respparam);
            }
            ;

            $scope.getState = function(value) {
                var states = $scope.compData.js.speedconfig;
                var ret = {};
                var percent;
                var maxvalue;
                var minvalue;
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];
                    if (state) {
                        if (state.maxvalue && state.minvalue) {
                            maxvalue = Number(state.maxvalue);
                            minvalue = Number(state.minvalue);
                            basepercent = Number(states['state' + (i - 1)].percent);
                            if (value <= maxvalue && value > minvalue) {
                                percent = basepercent + (state.percent - basepercent) * (value - minvalue) / (maxvalue - minvalue);
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: percent
                                }
                                break;
                            }

                        } else if (state.maxvalue) {
                            maxvalue = Number(state.maxvalue);
                            if (value <= maxvalue) {
                                percent = state.percent * value / maxvalue;
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: percent
                                }
                                break;
                            }
                        } else if (state.minvalue) {
                            if (value > Number(state.minvalue)) {
                                ret = {
                                    state: state,
                                    index: i,
                                    percent: state.percent
                                }
                                break;
                            }

                        }

                    } else {
                        break;
                    }
                }
                return ret;
            }
            ;

            $scope.getImagelist = function(index) {
                var states = $scope.compData.js.speedconfig;
                var imagelist = [];
                var image;
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];

                    if (state) {
                        image = {};
                        image.src = state.imagesrc.replace(/'/g, '');
                        if (i <= index) {
                            image.style = $scope.compData.js.levelcss || {
                                'background-color': '#73d7bd'
                            }
                        } else {
                            image.style = $scope.compData.js.nolevelcss || {
                                'background-color': '#dcdcdc'
                            }
                        }
                        imagelist.push(image);
                    } else {
                        break;
                    }
                }
                return imagelist;
            }

            $scope.speedtest = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.c60_fbar_cs_btn_link.JS.cdrConfig)) {
                    $scope.compData.js['cdrData'] = {};
                    $scope.compData.js.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'btn')
                    };
                    coreUtils.cdrService($scope.compData.js.c60_fbar_cs_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.js.cdrData);
                }
                if ($scope.testing) {
                    return;
                }
                ;
                $scope.testing = true;
                $scope.compData.js.btntext = $scope.compData.js.testingtext;
                clickbtn.css($scope.compData.js.testingcss || {
                    'background-color': '#dcdcdc'
                });
                point.attr('class', 'c60_fbar_cs_plate_point c60_fbar_speedpoint_animation')
                var startTime;
                var endTime;
                var cost;
                var speed;
                var unit = 'KB';
                var inter = '/S';
                var src = $scope.compData.js.fileurl;
                var size = $scope.compData.js.filesize;
                var stateobj;
                var state;
                var index;
                var loadImage = new Image();
                var timeout = null ;
                var formate = function(num, count) {
                    var paddingcount = count || 2;
                    var value = 10;
                    var padding = [];
                    for (var i = 0; i < paddingcount - 1; i++) {
                        padding.push('0');
                    }
                    for (var i = 1; i < paddingcount; i++) {
                        if (num < value) {
                            return padding.join('') + num;
                        }
                        value = value * 10;
                        padding.pop();
                    }
                    return num;
                }
                ;

                var getTime = function(d) {
                    var tmp = [];
                    tmp.push(d.getFullYear());
                    tmp.push(formate(d.getMonth() + 1));
                    tmp.push(formate(d.getDate()));
                    tmp.push(formate(d.getHours()));
                    tmp.push(formate(d.getMinutes()));
                    tmp.push(formate(d.getSeconds()));
                    tmp.push(formate(d.getMilliseconds(), 3));
                    return tmp.join('');
                }
                ;
                var getDeg = function(speed) {

                    var level = [0, 64, 128, 256, 512, 1024, 2048, 5120, 10240];
                    var mindeg = 15;
                    var degreerang = 30;
                    var index = 0;
                    var degree = 0;

                    for (; index < level.length; index++) {
                        if (speed < level[index]) {
                            break
                        }
                    }
                    if (index == level.length) {

                        index = level.length - 1;
                    }

                    var maxvalue = level[index];
                    var minvalue = level[index - 1];
                    degree = 30 * (index - 1) + 30 * (speed - minvalue) / (maxvalue - minvalue);
                    if (degree > 240) {
                        degree = 245;
                    }
                    return degree;

                }
                ;
                var processError = function() {
                    point.attr('class', 'c60_fbar_cs_plate_point')
                    cleartimeout();
                    $scope.testing = false;
                    $scope.imagelist = $scope.getImagelist(-1);
                    $scope.compData.js = coreUtils.extendDeep($scope.compData.js, {
                        'speed': '--',
                        'speedvalue': '0.00',
                        'speedunit': 'KB/S',
                        'desc': $scope.compData.js.faildesc || '抱歉，测速失败超时',
                        'traffic': '',
                        'inter': '',
                        'detail1': $scope.compData.js.faildetail1 || '请重新测速或点击左上角按钮，返回首页看看',
                        'detail2': '',
                        'resultimg': $scope.compData.js.failimagesrc.replace(/'/g, ''),
                        'percent': ''
                    });
                    $scope.testing = false;
                    $scope.compData.js.btntext = $scope.compData.js.aftertesttext;
                    clickbtn.css($scope.compData.js.testedcss || {
                        'background-color': '#73d7bd'
                    });
                    lineelement.css({
                        'width': '0%'
                    });
                    resultimage.css({
                        'background-color': '#dcdcdc'
                    });
                    $scope.$apply();
                    result.css({
                        'display': 'block'
                    });
                    tips.css({
                        'display': 'none'
                    });
                    coreService.fireEvent($element.attr('cid'), 'updatefail');

                }
                ;
                loadImage.onload = function() {
                    try {
                        cleartimeout();
                        endTime = new Date();
                        cost = endTime.getTime() - startTime.getTime();
                        var tmpspeed = (size * 1000) / (cost * 1024);
                        var speeddata = coreUtils.trafficValueTransfer(tmpspeed, Number($scope.compData.js.floatnum || 2));
                        speed = speeddata.v;
                        unit = speeddata.u;
                        stateobj = $scope.getState(tmpspeed);
                        state = stateobj.state;
                        index = stateobj.index;
                        $scope.imagelist = $scope.getImagelist(index);
                        $scope.compData.js = coreUtils.extendDeep($scope.compData.js, {
                            'speed': speed + unit + inter,
                            'speedvalue': speed,
                            'speedunit': unit + inter,
                            'desc': state.desc || '平均网速：',
                            'traffic': speed + unit,
                            'inter': inter,
                            'detail1': state.detail1 || '当前网速击败了全国',
                            'detail2': state.detail2 || '的用户',
                            'resultimg': state.imagesrc.replace(/'/g, ''),
                            'percent': coreUtils.formatNum(stateobj.percent, Number($scope.compData.js.floatnum || 2)) + '%'
                        });

                        lineelement.css({
                            'width': Math.min(Number(state.linewidthpercent), 100) + '%'
                        });
                        resultimage.css({
                            'background-color': '#73d7bd'
                        });
                        $scope.testing = false;
                        $scope.compData.js.btntext = $scope.compData.js.aftertesttext;
                        clickbtn.css($scope.compData.js.testedcss || {
                            'background-color': '#73d7bd'
                        });
                        $scope.$apply();
                        result.css({
                            'display': 'block'
                        });
                        tips.css({
                            'display': 'none'
                        });
                        var deg = 'rotate(' + getDeg(tmpspeed) + 'deg)';
                        point.css({
                            '-webkit-transform': deg,
                            'transform': deg,
                            '-moz-transform': deg,
                            '-o-transform': deg
                        });
                        point.attr('class', 'c60_fbar_cs_plate_point');
                        coreService.fireEvent($element.attr('cid'), 'updatesucess', {
                            "testStartTime": getTime(startTime),
                            "testEndTime": getTime(endTime),
                            "testSpeed": tmpspeed,
                            "range": stateobj.percent,
                            "text": $scope.compData.js.speed
                        });
                    } catch (e) {

                        processError();
                    }
                }
                ;
                var cleartimeout = function() {
                    if (timeout) {
                        loadImage.onload = null ;
                        loadImage.onerror = null ;
                        clearTimeout(timeout);
                        timeout = null ;
                    }

                }
                ;

                loadImage.onerror = processError
                timeout = setTimeout(processError, Number($scope.compData.js.timeout || 5) * 1000);
                startTime = new Date();
                loadImage.src = src + '?' + new Date().getTime();
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'dashboard';
            $scope.init();
        }
    }
}
]);
uiCore.directive('pid', function() {
    return {
        restrict: 'E',
        replace: false,
        template: '<div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
uiCore.directive('iappiconholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        //template : '<div class="C60-apps"><a class="c60_fbar_apps_box C-topleft" ng-click="appclick(\'app1\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico1"></span><h2 class="c60_fbar_app_title">套餐商店</h2></div></a><a class="c60_fbar_apps_box C-topright" ng-click="appclick(\'app2\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico2"></span><h2 class="c60_fbar_app_title">赚流量</h2></div></a><a class="c60_fbar_apps_box C-bottomleft" ng-click="appclick(\'app3\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico3"></span><h2 class="c60_fbar_app_title">最新活动</h2></div></a><a class="c60_fbar_apps_box C-bottomright" ng-click="appclick(\'app4\')"><div class="C60-taocan-apps"><span class="c60_fbar_app_ico4"></span><h2 class="c60_fbar_app_title">我的</h2></div></a></div>',
        template: '<div class="c60_fbar_appsholder">'
        + '<div class="c60_fbar_drag" ccid="c60_fbar_drag" ng-click="drag();$event.preventDefault();$event.stopPropagation();"><b ng-class="{\'c60_fbar_bup\':compData.JS.currentStyle==\'dropdown\'}"></b></div>'
        + '<div class="c60_fbar_apps"><a ng-repeat="app in compData.JS.appconfig"  appindex={{$index}} class="c60_fbar_apps_box" ccid="c60_fbar_apps_box"><div  appindex={{$index}} class="c60_fbar_app"><div  appindex={{$index}}  ng-show="compData.JS.remind.JS.pageid==app.pageid" ng-style="compData.JS.remind.CSS"></div><div  appindex={{$index}} class="c60_fbar_app_icon" ng-style="{\'background-image\':\'url(\'+app.defaultimage+\')\'}"></div><h2   appindex={{$index}} class="c60_fbar_app_title" ng-bind="app.name"></h2></div></a><div class="c60_fbar_app_hline"></div><div class="c60_fbar_app_vline"></div></div>'
        // + '<div class="c60_fbar_apps_borderr"></div><div class="c60_fbar_apps_borderb"></div>'

        + '</div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //ng-click="appclick(app.appid,app.pageid,app.linktype,app.url,app.content);$event.stopPropagation();"
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            $scope.compData.JS.currentStyle = 'dropdown';
            $scope.compData.JS.appconfig = top.tlbs.appholder || [];
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.dragMove();
            }
            ;
            $scope.appLinkClick = function() {
                coreService.fireEvent($scope.cid, 'applinkClick');
            }
            ;

            $scope.dropup = function() {
                $scope.compData.JS.currentStyle = 'dropdown';
                $element.css($scope.compData.JS.uptyle || {
                    'top': '0em'
                });
            }
            ;

            $scope.dropdownaauto = function() {

                if (!useraction) {
                    $scope.dropdown();
                }
            }
            $scope.dropdown = function() {

                //							 var htmls = top.document.getElementsByTagName('html')[0];
                //							 var bodys = top.document.getElementsByTagName('body')[0];
                //							 htmls.style.overflow='hidden';
                //							 bodys.style.overflow='hidden';

                $scope.compData.JS.currentStyle = 'dropup';
                $element.css($scope.compData.JS.downstyle || {
                    'top': '8em'
                });
            }
            ;

            var useraction = false;
            $scope.drag = function() {
                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                useraction = true;
                if ($scope.compData.JS.currentStyle == 'dropup') {
                    $scope.dropup();
                } else {
                    $scope.dropdown();
                }

            }
            var tracingcdr = function(ccid) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_drag.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': ccid,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_drag.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var touchstartflag = false;
                $element.bind(_touchstart, function(e) {
                    moveflag = false;
                    touchstartflag = true;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                $element.bind(_touchmove, function(e) {

                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentYPos - _lastYPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }

                });
                $element.bind(_touchend, function(e) {
                    try {
                        if (moveflag == true) {
                            var xdistance = _currentXPos - _lastXPos;
                            var ydistance = _currentYPos - _lastYPos;
                            if (ydistance < 0) {
                                //向上
                                useraction = true;
                                $scope.compData.JS.currentStyle = 'dropdown';
                                $element.css($scope.compData.JS.uptyle || {
                                    'top': '0em'
                                });
                                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                            } else if (ydistance > 0) {
                                //向下
                                useraction = true;
                                $scope.compData.JS.currentStyle = 'dropup';
                                $element.css($scope.compData.JS.downstyle || {
                                    'top': '8em'
                                });
                                tracingcdr(coreUtils.createCdrid($scope.pageID, '', 'dragbtn'));
                            }
                        } else if (touchstartflag) {
                            var target = e.target;
                            e.preventDefault();
                            e.stopPropagation();
                            if (target.getAttribute('appindex')) {
                                var index = Number(target.getAttribute('appindex'));
                                var app = $scope.compData.JS.appconfig[index];
                                $scope.appclick(app.appid, app.pageid, app.linktype, app.url, app.content);

                            }

                        }
                    }
                    finally {
                        moveflag = false;
                        touchstartflag = false;
                    }
                });

            }
            ;

            /*$scope.appclick = function (appid) {
						coreService.fireEvent($scope.cid, appid + 'click');
						};*/
            $scope.appclick = function(appid, pageid, linktype, linkurl, relatedcontent) {

                if (relatedcontent) {
                    coreService.fireEvent($element.attr('cid'), 'click', {
                        content: relatedcontent
                    });
                }
                tracingcdr(appid);
                if (linktype == '1') {
                    window.open(linkurl);
                } else {
                    //coreService.fireEvent($element.attr('cid'), 'click' + pageid + 'btn');
                    coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
                        "pageid": pageid,
                        "reload": '1'
                    });
                }

            }
            ;
            $scope.gotopage = function(param) {
                coreService.fireEvent($element.attr('cid'), 'clickappbtn', {
                    "pageid": url
                });
            }
            ;

            $scope.topage = function(param) {
                var type = Number(param.linktype);
                var url = param.url;
                var title = param.title || '链接';
                if (url) {
                    switch (type) {
                    case 0:
                        window.open(url);
                        break;
                    case 1:
                        coreService.fireEvent($element.attr('cid'), 'embedpage', {
                            "url": url,
                            'stitle': title
                        });
                        break;
                    case 2:
                        param.pageid = url;
                        coreService.fireEvent($element.attr('cid'), 'clickappbtn', param);
                        break;
                    case 9:
                        break;
                    default:
                        window.open(url);
                    }
                    if (url != $scope.pageID && param.notify) {
                        coreService.fireEvent($element.attr('cid'), "initsummary");
                    }
                }
            }
            ;

            $scope.notifytopage = function(param) {
                var p = param;
                p.notify = true;
                $scope.topage(param);
            }
            ;
            $scope.eventMap['notifytopage'] = $scope.notifytopage;
            $scope.eventMap['topage'] = $scope.topage;
            $scope.eventMap['dropdown'] = $scope.dropdownaauto;
            $scope.eventMap['dropup'] = $scope.dropup;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });

        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iappiconholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('imagelist', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_imagelist">' + '<div class="c60_fbar_imagelist_wrapper" ng-style="wrapperstyle">' + '<div ng-style="image.imagestyle" ng-click="weblink($index,image);$event.stopPropagation()" ng-repeat="image in imagearray" class="c60_fbar_imagelist_image_container" ccid="c60_fbar_link_click">' + '</div></div>' + '<div class="c60_fbar_circle_dotted_con">' + '<span class="c60_fbar_circle_dotted" ng-repeat="image in imagearray" ng-style="getStyle($index)"></span>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "display": 'block'
                },
                JS: {}
            };

            $scope.updateData = function(param) {
                var temp = param.respparam.adlocation || [];
                $scope.wrapperstyle = {
                    'width': temp.length * 100 + '%'
                };
                $scope.totallength = temp.length;
                for (var i = 0; i < temp.length; i++) {
                    temp[i].imagestyle = {
                        'background-image': 'url(' + temp[i].imageurl + ')',
                        'width': (100 / temp.length) + '%'
                    };
                }
                $scope.imagearray = temp;
            }
            ;
            $scope.weblink = function(index, image) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': image.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: image.linktype,
                    url: image.weblink
                });
            }
            ;
            $scope.getStyle = function(index) {
                if ($scope.totallength > 1) {
                    if (index == $scope.currentIndex) {
                        return {
                            'background-color': '#FFF'
                        }
                    } else {
                        return {
                            'background-color': ''
                        }
                    }
                } else {
                    return {
                        'display': 'none'
                    }
                }
            }
            ;

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                var param = {
                    'adlocation': $scope.compData.JS.adposid
                }
                coreService.fireEvent($element.attr('cid'), 'init', param);
                $scope.drag();
            }
            ;

            $scope.currentIndex = 0;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                imagecontainer.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                imagecontainer.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                    }
                });
                imagecontainer.bind(_touchend, function(e) {
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    if (xdistance < 0) {
                        if ($scope.currentIndex < $scope.totallength - 1) {
                            $scope.currentIndex = $scope.currentIndex + 1;
                        }
                    } else {
                        if ($scope.currentIndex > 0) {
                            $scope.currentIndex = $scope.currentIndex - 1;
                        }
                    }
                    $scope.$apply();
                    $scope.slide($scope.currentIndex, $scope.totallength);
                });
            }
            ;


            $scope.slide = function(index, length) {
                var imagecontainer = angular.element($element[0].querySelector('.c60_fbar_imagelist_wrapper'));
                var percent = index * 100 / length;
                var cssvalue = 'translate(-' + percent + '%,0px)';
                imagecontainer.css({
                    '-webkit-transform': cssvalue,
                    '-moz-transform': cssvalue,
                    '-ms-transform': cssvalue,
                    '-o-transform': cssvalue
                });
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
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'imagelist';
            $scope.init();
        }
    }
}
]);
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
uiCore.directive('iimagenotification', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder"><div id="notificationholder"><img class="imageholder" ccid="C60_fbar_imageholder" ng-src="{{campaign.image}}" ng-style="compData.JS.imageholder.CSS" ng-click="notificationClick()" /><div id="closeholder" class="C60_fbar_closeholder" ccid="C60_fbar_closeholder"  ng-bind="compData.JS.closeholder.JS.text"></div><div class="checkBtn" ng-show="compData.JS.checkBtn.JS.isShow" ccid="C60_fbar_checkBtn" ng-click="btnClick()" ng-style="compData.JS.checkBtn.CSS" ng-bind="compData.JS.checkBtn.JS.text"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile", '$interval', '$timeout',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {

                }
            };
            $scope.campaign = {};
            $scope.taskId = "";
            $scope.btnClick = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.checkBtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': 'C60_fbar_checkBtn'
                    };
                    coreUtils.cdrService($scope.compData.JS.checkBtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                var campaign = $scope.campaign;
                window.open(campaign.url);

            }
            ;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.upDate = function(param) {}
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.processConfig();

            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.processConfig = function() {
                //mainholder
                $element.css($scope.compData.CSS);
                //notificationholder
                angular.element($element[0].querySelector('[id="notificationholder"]')).css($scope.compData.JS.notificationholder.CSS);
                //imageholder
                angular.element($element[0].querySelector('[id="imageholder"]')).css($scope.compData.JS.imageholder.CSS);
                //closeholder
                angular.element($element[0].querySelector('[id="closeholder"]')).css($scope.compData.JS.closeholder.CSS);
            }
            ;

            $scope.showNotification = function(eventObj) {
                if (null  != eventObj && null  != eventObj.campaign.image) {
                    $scope.taskId = eventObj.taskId;
                    $scope.campaign = eventObj.campaign;
                    top.tlbs.messageid = eventObj.messageid || "";
                    preloadimages($scope.campaign.image).done(function() {
                        $element.css('display', 'block');
                        // angular.element($element[0].querySelector('.imageholder')).css({'background':"url('" + eventObj.campaign.image + "') left top no-repeat",'background-size':'100% 100%'});
                        var time = $scope.compData.js.closeTime;
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                        if (top.tlbs.messageid != "") {
                            $timeout(function() {
                                if ($element.css('display') != 'none') {
                                    top.tlbs.notificationCdrData = null ;
                                }
                                $scope.closeNotification();
                            }, time);
                        }
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----


                    });
                }
            }
            ;
            $scope.eventMap['showNotification'] = $scope.showNotification;
            $scope.eventMap['update'] = $scope.upDate;
            var _touchstart = Const.touchEvent.start
              ,
            container = angular.element($element[0].querySelector('.C60_fbar_closeholder'));
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.closeholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.closeholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.closeNotification = function() {
                $element.css('display', 'none');
            }
            ;

            $scope.notificationClick = function() {
                //coreService.fireEvent($scope.cid, 'notificationClick');
                //var campaign = $scope.campaign;
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---

                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.imageholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'taskId': $scope.taskId,
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'imagebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.imageholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //window.open($scope.campaign.url);
                $element.css('display', 'none');
                if ($scope.campaign.linkType == undefined)
                    $scope.campaign.linkType = '0';
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.campaign.linkType,
                    "url": $scope.campaign.url
                });
            }
            ;

            var ThumbnailImageArray = [];

            function preloadimages(arr) {
                var loadedimages = 0;
                var postaction = function() {}
                ;
                var arr = (typeof arr != "object") ? [arr] : arr;

                function imageloadpost() {
                    loadedimages++;
                    if (loadedimages == arr.length) {
                        postaction(ThumbnailImageArray);
                        //call postaction and pass in newimages array as parameter
                    }
                }
                ;

                for (var i = 0; i < arr.length; i++) {
                    ThumbnailImageArray[i] = new Image();
                    ThumbnailImageArray[i].src = arr[i];
                    ThumbnailImageArray[i].onload = function() {
                        imageloadpost();
                    }
                    ;
                    ThumbnailImageArray[i].onerror = function() {
                        imageloadpost();
                    }
                    ;
                }
                return {
                    done: function(f) {
                        postaction = f || postaction
                    }
                };
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iimagenotification';
            scope.init();
        }
    };
}
]);
uiCore.directive('repackholder', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        scope: {},
        template: '<div class=" c60_fbar_taocan_tj"><div class="c60_fbar_sytips"><h1 class="c60_fbar_sytips_title"><span ng-bind-html="to_trusted(desc[0])"></span><b></b></h1><p class="c60_fbar_sytips_desc" ng-bind-html="to_trusted(desc[1])"></p></div>' +
        '<div class="c60_fbar_package"><div style="overflow:hidden">' +
        '<pack ppid="pageID" taskid="taskId" ecid=cid recommandations=recommandations stateconfig="{{::compData.JS.config}}" config="{{::compData.js}}"  ng-repeat="pack in recommandations" pack-color="pack.color" packid="pack.id" pack-name="pack.categoryname" pack-price="pack.price" pack-total="pack.value"></pack>' +
        '</div>' +
        '<div class="c60_fbar_package_more" ng-show="compData.js.moreflag.isShow"><a class="c60_fbar_package_more_a" ng-click="toPackageStore()" ng-bind="compData.JS.config.recommandationtitle"></a></div>' +
        '</div></div>',
        controller: [
        "$scope",
        "$element",
        "$attrs",
        'coreService',
        'coreUtils',
        'Const',
        "$compile",
        "$sce",
        function($scope, $element, $attrs, coreService, coreUtils,
        Const, $compile, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'JS': {
                    'config': {
                        'packages': {
                            'margin-left': '0%',
                            'float': 'none',
                            'margin': '0 auto'
                        },
                    }
                },
                'CSS': {}

            };
            $scope.eventMap = {};
            $scope.recommandations = [];
            $scope.taskId = null ;
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.getDatavalue = function(comboProperies) {
                if (comboProperies) {
                    for (var j = 0; j < comboProperies.length; j++) {
                        if (comboProperies[j]) {
                            if (comboProperies[j].key == "2") {
                                return comboProperies[j].value
                            }
                        }
                    }
                }
                return '';
            }
            ;
            $scope.show = function() {
                if ($scope.recommandations.length > 0) {
                    setTimeout(function() {
                        coreService.fireEvent($element.attr('cid'), 'initfinished');
                    }, Number($scope.compData.js.showdelay || 1000));
                }
            }
            ;

            $scope.update = function(data) {
                if (data) {
                    var desc = data.respparam.desc || "";
                    $scope.taskId = data.respparam.taskId;
                    var descArray = desc.split('|');
                    $scope.desc = descArray;
                    var recommandations = data.respparam.recommandations;
                    //此变量用于判断是否有套餐数
                    $scope.recommandationlen = recommandations.length;
                    var temp = [];
                    var list = [];
                    var revData = $scope.revData;
                    var isnull = function(obj) {
                        for (var n in obj) {
                            return true
                        }
                        return false;
                    }
                    ;
                    var listTest = []
                      ,
                    m = 0;
                    for (var i = 0; i < recommandations.length; i++) {
                        list = recommandations[i].list;
                        for (var li = 0; li < list.length; li++) {
                            var value = $scope.getDatavalue(list[li].comboProperies);
                            listTest[m] = {
                                'categoryname': recommandations[i].categoryname || '',
                                'value': value,
                                'price': list[li].price || '',
                                'id': list[li].id
                            };
                            m++;
                        }
                    }
                    var len = Math.min($scope.compData.js.packnum, listTest.length);
                    for (var r = 0; r < len; r++) {

                        $scope.recommandations[r] = listTest[r];
                        $scope.recommandations[r].color = $scope.compData.js.packcolor['color' + r] || ' ';
                    }
                    //coreService.fireEvent($element.attr('cid'), 'initfinished');
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': $scope.taskId,
                        'componentId': 'c60_fbar_p_package',
                        'pageId': $scope.pageID,
                        'message': '',
                        'sresptime': '',
                        'functionid': ''
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                }
                if ($scope.recommandationlen > 0) {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title1;
                    }

                } else {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                    }
                }
                $scope.show();
            }
            ;
            $scope.toPackageStore = function() {
                coreService.fireEvent($element.attr('cid'), 'topackagestore');
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                if ($scope.compData.js.packagestore) {
                    $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                }
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event,
            cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['show'] = $scope.show;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'repackholder';
            $scope.init();
        }

    }

}
]);

uiCore.directive('pack', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^?pid',
        scope: {
            name: '=packName',
            price: '=packPrice',
            total: '=packTotal',
            color: '=packColor',
            pkgid: '=packid',
            ecid: '=ecid',
            recommandations: '=recommandations',
            pageID: '=ppid',
            taskId: '=taskid'
        },
        template: '<div class="c60_fbar_packs" ><div class="c60_fbar_p_package"><div ccid="c60_fbar_p_package" ng-click="tostore();$event.preventDefault();$event.stopPropagation();"><div class="c60_fbar_package_title " ccid="c60_fbar_package_title" >' + '<div class="c60_fbar_packagetip"><p class="c60_fbar_jybpackagetipp" style="background:{{color}}" ng-bind="name"></p></div>' + '<div class="c60_fbar_jybpackageprice" ><div class="c60_fbar_pricebgcolor" style="background:{{color}}"></div><p class="c60_fbar_packagepricep" ng-bind="price"></p></div></div>' + '<div class="c60_fbar_packagecont" ng-bind="total"></div></div>' +
        '</div></div>',
        controller: [
        "$scope",
        "$element",
        "$attrs",
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //var $element = angular.element($element[0].querySelector('.c60_fbar_packs'));
            $scope.changeStyle = function() {

                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var list = $scope.recommandations;
                var len = list.length;
                if (len == 1) {
                    $element.css(states.packages);
                }
            }
            ;
            $scope.$watch($attrs, function() {
                $scope.changeStyle();
            });

            $scope.tostore = function() {
                var config = coreUtils.String2JSON($attrs['config']);
                if (coreUtils.cdrUtils.canWriteUITracingCDR(config.p_package.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.pkgid,
                        'taskId': $scope.taskId
                    };
                    coreUtils.cdrService(config.p_package.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.ordersrc = $scope.pageID;
                coreService.fireEvent($scope.ecid, 'tostore', {
                    'pkgid': $scope.pkgid,
                    'taskid': $scope.taskId
                });
            }
            $scope.init = function() {}
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.compData = {
                'JS': {},
                'CSS': {}
            };
        }
    }
});
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
uiCore.directive('popupfeedback', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template:
        '<div style="display:none;">'
        + '	  <div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>'
        + '    <div class="c60_fbar_new_center_pop">'
        + '        <div class="c60_fbar_ncp_top">'
        + '        	<div class="c60_fbar_ncp_tit">'
        + '                <span class="c60_fbar_ncp_tit_txt" ng-bind="compData.JS.c60_fbar_ncp_tit_txt.JS.text"></span>'
        + '                <span class="c60_fbar_ncp_tit_close" ccid="class="c60_fbar_ncp_tit_close" ng-click="c60_fbar_ncp_tit_closeClick()"></span>'
        + '            </div>'
        + '        <div style="height:12em;">'
        + '        	<div class="c60_fbar_ncp_bottom" simplescroll>'
        + '            	<div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text0"></span><span ng-bind="respData.feedback.question"></span></div>'
        + '                <div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text1"></span><span class="c60_fbar_hwlfeedback"></span></div>'
        + '            </div>'
        + '        </div>'

        + '        </div>'
        + '    </div>'
        + '</div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', "$sce",
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.eventMap = {};
            $scope.respData = {};
            $scope.trustAsHtml = function(text) {
                return $sce.trustAsHtml(text);
            }
            ;
            $scope.c60_fbar_ncp_tit_closeClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
                $scope.hide();
            }
            ;
            $scope.getbg_pop_blockStyle = function() {
                if ($scope.compData.JS.bg_pop_block.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state1;
                }
            }
            ;

            //获取后台数据
            $scope.updateData = function(param) {
                if (param != null  && param != undefined) {
                    $scope.respData = param;
                    $element.css({
                        'display': 'block'
                    });
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 1;
                    angular.element($element[0].querySelector('.c60_fbar_hwlfeedback')).html(param.feedback.answer);
                }
            }
            ;
            $scope.eventMap['update'] = $scope.updateData;
            $scope.hide = function() {
                $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 0;
                $element.css({
                    'display': 'none'
                });
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
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popupfeedback';
            $scope.init();
        }
    }
}
]);
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
uiCore.directive('iholdert', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$compile',
        '$templateCache',
        '$timeout',
        function($scope, $element, $attrs, $compile, $templateCache, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'stylestates': '',
                        'extrastates': '',
                        'cstylestate': '',
                        'cextrastate': '',
                        'state': 0,
                        'estate': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processStyle();
                $scope.updateStyle();
                if (null  != $attrs.templateurl) {
                    $scope.getTemplate();
                }
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.updateStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if ($scope.compData.JS.stateconfig.estate != stateObject.cstate) {
                    $scope.compData.JS.stateconfig.estate = stateObject.cstate;
                    $scope.updateStyle();
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;

            $scope.show = function(data) {
                $element.css({
                    'display': 'block'
                });
                var time = $scope.compData.JS.closetime;
                if (time) {
                    $timeout($scope.hide, time);
                }

            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
            $scope.processStyle = function() {
                var cssData = JSON.stringify($scope.compData.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle($scope.classid, '', cssData);
                var styleStateArray = $scope.compData.JS.stateconfig.stylestates.split('|');
                var styleStateArrayLength = styleStateArray.length;
                var extraStateArray = $scope.compData.JS.stateconfig.extrastates.split('|');
                var extraStateArrayLength = extraStateArray.length;
                for (var i = 0; i < styleStateArrayLength; i++) {
                    var styleState = styleStateArray[i];
                    if (styleState.length > 0) {
                        cssData = JSON.stringify($scope.compData.JS.stateconfig[styleState]);
                        cssData = $scope.formatStyleData(cssData);
                        coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState, cssData);
                        for (var j = 0; j < extraStateArrayLength; j++) {
                            var extraState = extraStateArray[j];
                            if (extraState.length > 0) {
                                cssData = JSON.stringify($scope.compData.JS.stateconfig[extraState]);
                                cssData = $scope.formatStyleData(cssData);
                                coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState + '.' + extraState, cssData);
                            }
                        }
                    }
                }
                $element.addClass($scope.cid);
                if (null  != $scope.compData.JS.stateconfig.state) {
                    var currentState = 'state' + $scope.compData.JS.stateconfig.state;
                    $scope.compData.JS.stateconfig.stylestates = currentState;
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            $scope.updateStyle = function() {
                $element.removeClass($scope.compData.JS.stateconfig.cstylestate);
                $element.removeClass($scope.compData.JS.stateconfig.cextrastate);
                $scope.compData.JS.stateconfig.cstylestate = 'state' + $scope.compData.JS.stateconfig.state;
                $element.addClass($scope.compData.JS.stateconfig.cstylestate);
                if ($scope.compData.JS.stateconfig.state != $scope.compData.JS.stateconfig.estate) {
                    $scope.compData.JS.stateconfig.cextrastate = 'state' + $scope.compData.JS.stateconfig.estate;
                    $element.addClass($scope.compData.JS.stateconfig.cextrastate);
                }
            }
            ;
            $scope.getTemplate = function() {
                var elementTemplateCache = $templateCache.get($attrs.templateurl);
                $element.html(elementTemplateCache);
                $compile($element.contents())($scope);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iholdert';
            scope.init();
        }
    };
}
]);
uiCore.directive('activity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_activitywrapper">' + '<div class="c60_fbar_wrapper1">' + '<div class="c60_fbar_activity" simplescroll>'

        + '<div class="c60_fbar_taocan_result_con">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img_act"  ng-src="{{compData.JS.statusconfig.status.imgUrl}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.statusconfig.status.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.statusconfig.status.btntxt" ng-click="returnclick()"></a></div>' + '</div>'

        + '<ul class="c60_fbar_imgTitleDescList">' + '<li ng-repeat="imgTitleDesc in compData.JS.imgTitleDescs | objectSort: \'priority\'" ng-class="{\'c60_fbar_imgTitleDesc\':true}">' + '<a ng-click="imageclick(imgTitleDesc,$index)" ccid="c60_fbar_link_click"><img ng-src="{{imgTitleDesc.imageurl}}" ng-class="{\'c60_fbar_imgTitleDesc-Img\':true}"/></a>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Title\':true}" ng-bind="imgTitleDesc.title"></p>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Desc1\':true}" ng-bind="imgTitleDesc.description"></p></li>' + '</ul>' + '</div>' + '</div>' + '</div></div>',
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


            $scope.updateData = function(param) {
                if (param.respparam) {
                    if (param.respparam.advertisement.maxprioritylist && param.respparam.advertisement.maxprioritylist.length > 0) {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'none'
                        });
                        $scope.compData.JS.imgTitleDescs = [];
                        $scope.temp = [param.respparam.advertisement.maxprioritylist || [], param.respparam.advertisement.minprioritylist || []];
                        for (var i = 0; i < $scope.temp.length; i++) {
                            for (var j = 0; j < $scope.temp[i].length; j++) {
                                $scope.compData.JS.imgTitleDescs.push($scope.temp[i][j]);
                            }
                        }
                    } else {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'block'
                        });
                    }
                }
            }
            ;

            $scope.errorupdate = function() {
                angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                    'display': 'block'
                });
            }
            ;

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var imgUrl = properties.JS.statusconfig.status.imgUrl;
                properties.JS.statusconfig.status.imgUrl = imgUrl.replace(/'/g, '');
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;

            $scope.returnclick = function() {

                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;

            $scope.imageclick = function(imgTitleDesc, index) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': imgTitleDesc.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }

                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: imgTitleDesc.linktype,
                    url: imgTitleDesc.weblink
                });
            }

            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['errorupdate'] = $scope.errorupdate;
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
uiCore.filter("objectSort", function() {
    var listSort = function(list, field) {
        if (list == undefined) {
            return
        }
        ;
        for (var i = 0; i < list.length - 1; i++) {
            for (var j = 0; j < list.length - i - 1; j++) {
                if (list[j][field] > list[j + 1][field]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
        return list;
    }
    ;
    return listSort;
});
uiCore.directive('loadingmask', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_loadingmask">'
        + '<div class="c60_fbar_loadingmask_datouwang8">'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container1">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container1_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container1_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container1_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container2">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container2_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container2_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container2_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container2_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_datouwang8-container c60_fbar_loadingmask_container3">'
        + '<div class="c60_fbar_loadingmask_circle1 c60_fbar_loadingmask_container3_circle1 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle2 c60_fbar_loadingmask_container3_circle2 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle3 c60_fbar_loadingmask_container3_circle3 c60_fbar_loadingmask_container_div"></div>'
        + '<div class="c60_fbar_loadingmask_circle4 c60_fbar_loadingmask_container3_circle4 c60_fbar_loadingmask_container_div"></div>'
        + '</div>'
        + '</div>'
        + '<div class="c60_fbar_loadingmask_tips_txt_loading" ng-bind="compData.js.loadingtext"></div>'
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
            var timeout = null ;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.compData.js.loadingtext = $scope.compData.js.loadingtext || '加载中';
                $element.css($scope.compData.css);
            }
            ;
            $scope.show = function() {
                $element.css({
                    "display": "block"
                });
                timeout = setTimeout($scope.hide, $scope.compData.js.autohide || 10000)
            }
            ;

            $scope.hide = function() {
                $element.css({
                    "display": "none"
                });
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null ;
                }

            }
            ;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.$on($attrs['cid'] + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "loadingmask";
            $scope.init();
        }
    };
});
uiCore.directive('ipopupapprec', [function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div ng-click="link()" ccid="c60_fbar_tanchuang_bottom" class="c60_fbar_tanchuang_bottom">' +
        '<div class="c60_fbar_guess_mark_coin c60_fbar_clearfloat"><div class="c60_fbar_guess_mark_img" ng-style="compData.JS.guess_mark_img.CSS"></div><div class="c60_fbar_mark_txt"><div class="c60_fbar_mark_big_txt" ng-bind="compData.JS.mark_big_txt.text"></div><div class="c60_fbar_mark_small_txt" ng-bind="compData.JS.mark_small_txt.text"></div></div></div>' +
        '<div class="c60_fbar_tuisong_name c60_fbar_clearfloat"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {

                }
            };
            $scope.link = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.tanchuang_bottom.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'linkapp'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.tanchuang_bottom.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'linkapp');

            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.CSS = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css(properties.CSS);
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

        }

        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopupapprec';
            scope.init();
        }
    };
}
]);
uiCore.directive('popupimgtext', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popupimgtext"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_info">' + '<table cellpadding="0" cellspacing="0" class="c60_fbar_wchimg_txt_table">' + '<tr>' + '<td><span class="c60_fbar_wchadv_img" ng-style="revData.imgstyle"></span></td>' + '<td style="display:inline-block;">' + '<div class="c60_fbar_wchpop_txt4_tit" ng-bind="revData.title" ng-style="pureTextStyle2(\'title\')"></div>' + '<div class="c60_fbar_wchpop_txt4"  ng-bind-html="to_trusted(revData.titledesc)" ng-style="pureTextStyle2(\'titledesc\')"></div>' + '</td>' + '</tr>' + '</table>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn" ccid="c60_fbar_popupimgtext_btnclose"  ng-bind="pureTextBtn(\'cancel\')" ng-style="pureTextStyle2(\'cancel\')"></div>' + '<div class="c60_fbar_wchright_itbtn" ccid="c60_fbar_popupimgtext_btn"  ng-bind="pureTextBtn(\'detail\')" ng-style="pureTextStyle2(\'detail\')" ></div>' + '</div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', '$sce',
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.revData = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            //获取后台数据
            $scope.updateData = function(param) {
                $element.css({
                    'display': 'block'
                });
                if (param != null  && param != undefined) {
                    if (param.campaign != null  && param.campaign != undefined) {
                        top.tlbs.messageid = param.messageid || "";
                        var temp = param.campaign;
                        $scope.revData.title = temp.name;
                        $scope.revData.titledesc = temp.desc;
                        $scope.revData.imgstyle = $scope.compData.JS.popuptitleconfig.JS.stateconfig.state2;
                        $scope.revData.imgstyle['background-image'] = 'url(' + temp.image + ')'
                        $scope.revData.url = temp.url;
                        $scope.revData.linkType = temp.linkType;
                    } else {
                        $scope.revData.title = '';
                        $scope.revData.titledesc = '';
                        $scope.revData.url = $scope.compData.JS.popupbtnconfig.JS.url;
                        $scope.revData.linkType = $scope.compData.JS.popupbtnconfig.JS.linktype;
                    }
                }
                var time = $scope.compData.JS.closetime;
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                if (top.tlbs.messageid != "") {
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }
                //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----
            }
            ;
            $scope.hide = function() {
                $element.css({
                    'display': 'none'
                });
            }
            ;
            var _touchstart = Const.touchEvent.start
              ,
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn'))
              ,
            container2 = angular.element($element[0].querySelector('.c60_fbar_wchright_itbtn'));

            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                })
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbtnconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'returnbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbtnconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //window.open($scope.revData.url);
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.revData.linkType,
                    "url": $scope.revData.url
                });
            });
            $scope.pureTextStyle2 = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state0;
                        break;
                    case 'titledesc':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state1;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state1;
                        break;

                    default:
                        break;
                    }
                }
            }
            ;
            $scope.pureTextBtn = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
                        break;
                    case 'detail':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title1;
                        break;
                    default:
                        break;
                    }
                }
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData, properties);
                $element.css($scope.compData.css || {});
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
uiCore.directive('iappsearch', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template:
        '<div>'
        + '<div class="c60_fbar_search">'
        + '<div class="c60_fbar_search_box">'
        + '<form class="c60_fbar_search_innerbox">'
        + '<div class="c60_fbar_search_text">'
        + '<input id="searchinput" type="text" name="fname" ng-model="searchkeys" class="c60_fbar_search_input1" placeholder="搜索应用"/>'
        + '</div>'
        + '<div class="c60_fbar_search_submit">'
        + '<input type="submit" ccid="c60_fbar_search_submit" class="c60_fbar_search_input2" ng-click="submit()"/>'
        + '</div>'
        + '</form>'
        + '</div>'
        + '</div>'
        + '</div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.changeStyle = function() {

            }

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                angular.element($element[0].querySelector(".c60_fbar_search")).css($scope.compData.CSS || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;

            $scope.searchkeys = "";

            $scope.queryWoChain = function(param) {
                if (param && param.respparam) {
                    $scope.queryWoChain1 = param.respparam.session;
                }
            }
            ;

            $scope.submit = function() {
                var url1 = $scope.compData.JS.searchurl.iframeurl;
                if ($scope.queryWoChain1) {
                    if ($scope.queryWoChain1.auth == null  || $scope.queryWoChain1.auth == undefined) {
                        $scope.queryWoChain1.auth = "";
                    }
                    if ($scope.queryWoChain1.jsessionid == null  || $scope.queryWoChain1.jsessionid == undefined) {
                        $scope.queryWoChain1.jsessionid = "";
                    }
                    url1 = url1.replace("{jsessionid}", $scope.queryWoChain1.jsessionid);
                    url1 = url1.replace("{auth}", $scope.queryWoChain1.auth);

                } else {
                    url1 = url1.replace("{jsessionid}", "");
                    url1 = url1.replace("{auth}", "");
                }

                //mod by y00131156 at 20150821  begin
                //用户输入需要调用后台服务加密
                if ($scope.compData.JS.encodeflag != '0') {
                    var onSuccess = function(data, status, headers) {
                        url1 = url1.replace("{searchkeys}", (data.respparam.appsearch || {}).encodedstr || '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    var onError = function() {
                        url1 = url1.replace("{searchkeys}", '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    coreUtils.sendRequest($scope.compData.JS.encodeservcie || 'encodeservice', {
                        'str': encodeURI($scope.searchkeys),
                        'encodetype': $scope.compData.JS.encodetype || 'DES'
                    }, onSuccess, onError);
                } else {
                    url1 = url1.replace("{searchkeys}", $scope.searchkeys);
                    coreService.fireEvent($scope.cid, 'urltranslate', {
                        "url": url1
                    });
                }

                //url1=url1.replace("{searchkeys}",$scope.searchkeys);
                //coreService.fireEvent($scope.cid,'urltranslate',{"url":url1});
                //mod by y00131156 at 20150821  end
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'sub')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['querywo1'] = $scope.queryWoChain;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'iappsearch';
            $scope.init();
        }
    }
}
]);
uiCore.directive('guesspeek', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_c60_toolbar_aodi_con">' + '<span class="c60_fbar_c60_toolbar_aodi_img" ccid="c60_toolbar_aodi_img" ng-style="getStyle(\'c60_toolbar_aodi_img\')" ng-click="click(\'c60_toolbar_aodi_img\')"></span>' + '<span class="c60_fbar_c60_toolbar_aodi_close" ccid="c60_fbar_c60_toolbar_aodi_close" ng-style="getStyle(\'c60_toolbar_aodi_close\')" ng-click="click(\'c60_toolbar_aodi_close\');$event.stopPropagation();" ng-bind="compData.JS.c60_toolbar_aodi_close.JS.text"></span>' + '</div>',
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
            var myClick = {
                //跳转到第三方页面
                c60_toolbar_aodi_img: function(param) {
                    if ($scope.compData.JS.compdata.imgLink) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'pictClk')
                            };
                            coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_img.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        window.open($scope.compData.JS.compdata.imgLink);
                    }

                },
                c60_toolbar_aodi_close: function(param) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'close')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_toolbar_aodi_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goback');
                }
            };
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //处理所有点击事件
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_toolbar_aodi_img':
                    myClick.c60_toolbar_aodi_img(param);
                    break;
                case 'c60_toolbar_aodi_close':
                    //返回到猜品牌页面
                    myClick.c60_toolbar_aodi_close(param);
                    break;
                default:

                }
            }
            ;
            $scope.getDataInit = function(inputData) {
                if (inputData != undefined && Object.keys(inputData).length > 0) {
                    $scope.compData.JS.compdata = inputData;
                    if ($scope.compData.JS.compdata && $scope.compData.JS.compdata.imgUrl) {
                        angular.element($element[0].querySelector('.c60_fbar_c60_toolbar_aodi_img')).css('background-image', 'url(' + $scope.compData.JS.compdata.imgUrl + ')');
                    }
                }
            }
            ;
            $scope.eventMap['getDataInit'] = $scope.getDataInit;

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
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisuccess');
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
            $scope.componentType = "guesspeek";
            $scope.init();
        }
    };
});
uiCore.directive('my', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_mine_result_waiting"><div class="c60_fbar_datouwang8"><div class="c60_fbar_datouwang8-container c60_fbar_container1"><div class="c60_fbar_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container2"><div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container3"><div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div></div></div><div class="c60_fbar_tips_txt_loading ng-binding" ng-bind="compData.JS.loadingtext.JS.textdata">爱我，别走~~</div></div><div class="c60_fbar_mine_result" ><div><div class="c60_fbar_mine_result_con" ><div class="c60_fbar_mine_result_con_img"><span class="c60_fbar_mine_result_con_img_span" ng-show="compData.JS.c60_fbar_mine_result.JS.isShow"   ng-style="getStyle(\'c60_fbar_mine_result\')"></span></div><div class="c60_fbar_mine_result_title " ng-show="compData.JS.c60_fbar_mine_result.JS.isShow" ng-bind="compData.JS.c60_fbar_mine_result.JS.title"></div><div class="c60_fbar_mine_result_btn" ><a class="c60_fbar_my_result_link_btn" ng-show="compData.JS.c60_fbar_my_result_link_btn.JS.isShow" ng-click="click(\'c60_fbar_my_result_link_btn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_my_result_link_btn.JS.text"  ng-style="getStyle(\'c60_fbar_my_result_link_btn\')"></a></div></div></div></div>' + '<div class="c60_fbar_mine_tips" ng-style="getStyle(\'c60_fbar_mine_tips\')"><div class="c60_fbar_mine_tipstext" ng-style="getStyle(\'c60_fbar_mine_tipstext\')" ng-bind="compData.JS.c60_fbar_mine_tipstext.JS.waitmessage"></div></div><div class="c60_fbar_mine_pop_block"></div>' + '   <div class="c60_fbar_memberday_pop">' + '    <div class="c60_fbar_memberday_pop_top">' + '      <div class="c60_fbar_memberday_pop_tit">' + '         <span class="c60_fbar_memberday_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_member_tips.JS.title"></span>' + '         <span class="c60_fbar_memberday_pop_tit_close"  ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '     </div>' + '     </div>' + '     <div class="c60_fbar_memberday_pop_bottom">' + '       <div class="c60_fbar_memberday_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_member_tips.JS.text)"></div>' + '     </div>' + '   </div>	' + '   <div class="c60_fbar_qiandao_pop">' + '      <div class=" c60_fbar_qiandao_pop_top">' + '        <div class="c60_fbar_qiandao_pop_tit">' + '           <span class="c60_fbar_qiandao_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.title"></span>' + '           <span class="c60_fbar_qiandao_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==0">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0"><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessagebegin"></i><span ng-bind="revData.respparam.vaIncreased"></span><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.unit"></i></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessageend"></div><div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==1" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessage"></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_successbtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_successbtn.JS.text"  ccid="c60_fbar_my_tips_successbtn" ng-click="click(\'c60_fbar_my_tips_successbtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==1">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage1)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_failurebtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==2">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2"  ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage2)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ccid="c60_fbar_my_tips_failurebtn" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '   </div>' + '   <div class="c60_fbar_qiandao_rule_pop">' + '     <div class="c60_fbar_qiandao_rule_pop_top">' + '       <div class="c60_fbar_qiandao_rule_pop_tit">' + '         <span class="c60_fbar_qiandao_rule_pop_tit_txt"  ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.title" ></span>' + '         <span class="c60_fbar_qiandao_rule_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_qiandao_rule_pop_bottom">' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc1)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc2)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc3)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_linktxt"><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textbegin"></i><a class="c60_fbar_qiandao_rule_pop_bottom_orangelinktxt"  ng-style="getStyle(\'c60_fbar_my_rule_textbtn\')" ccid="c60_fbar_my_rule_textbtn" ng-click="click(\'c60_fbar_my_rule_textbtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_rule_textbtn.JS.text"></a><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textend"></i></div>' + '    </div> ' + '  </div>' + '<div class="c60_fbar_my_con" ><div class="c60_fbar_my_conscroll" simplescroll>' + '   <div class="c60_fbar_my_top clearfloat" >' + '    <div class="c60_fbar_my_img_txt">' + '     <span class="c60_fbar_my_head_ico" ng-style="getStyle(\'c60_fbar_my_head_ico\')" ng-show="compData.JS.c60_fbar_my_head_ico.JS.isShow"></span>' + '     <div class="c60_fbar_my_txt" >' + '      <p class="c60_fbar_moblie" ng-bind-html="to_trusted(phoneFilter(revData.respparam.msisdn))"></p>' + '     <div class="c60_fbar_my_level">' + '     <span class="c60_fbar_my_degree" ng-show="compData.JS.c60_fbar_my_head_degree.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_degree\')"><i class="c60_fbar_degreeunit" ng-bind="compData.JS.c60_fbar_my_head_degree.JS.text"></i> <i class="c60_fbar_degreenumber" ng-bind="revData.respparam.level"></i></span>' + '     <span class="c60_fbar_my_member" ng-show="compData.JS.c60_fbar_my_head_member.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_member\')"  ccid="c60_fbar_my_head_member"  ng-click="click(\'c60_fbar_my_head_member\');$event.stopPropagation();" ><i ng-bind="compData.JS.c60_fbar_my_head_member.JS.text"></i><i class="c60_fbar_my_head_member_redpoint" ng-show="RedPointFlag==true"></i></span>' + '     </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_attend_btn" >' + '    <span class="c60_fbar_attend_rule" ng-show="compData.JS.c60_fbar_my_head_rule.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_rule\')" ng-bind="compData.JS.c60_fbar_my_head_rule.JS.text"  ccid="c60_fbar_my_head_rule"  ng-click="click(\'c60_fbar_my_head_rule\');$event.stopPropagation();"></span>' + '     <a class="c60_fbar_attend_btn_link" ng-style="getattend_btn_linkStyle()" ng-bind="c60_fbar_attend_btn_text" ccid="c60_fbar_my_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn_link.JS.isShow"></a>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con" >' + '<div class="c60_fbar_my_list c60_fbar_my_list_coin" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">    <div class="c60_fbar_my_list_detail clearfloat">    <div class="c60_fbar_cointitle">    <span class="c60_fbar_mylist c60_fbar_my_list_coin" ng-style="getStyle(\'c60_fbar_my_list_coin\')" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.text" ></span><span class="c60_fbar_my_list_coin_num " ng-style="getStyle(\'c60_fbar_my_list_coin_num\')" ng-show="compData.JS.c60_fbar_my_list_coin_num.JS.isShow"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'mycoin\'))"></span>    </div>    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_coin\')" ></span>    </div>     </div>    </div>   <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div> <div class="c60_fbar_my_list c60_fbar_my_list_wealth"  ccid="c60_fbar_my_list_wealth" ng-click="click(\'c60_fbar_my_list_wealth\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_wealth" ng-style="getStyle(\'c60_fbar_my_list_wealth\')" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_wealth\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_wealth\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_flowcurrency.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'coin\'))"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_flowcurrency" ng-click="click(\'c60_fbar_my_flowcurrency\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_flowcurrency.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind-html="to_trusted(unitFilter(revData.respparam.wodou,\'wodou\'))" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_luckdraw" ng-click="click(\'c60_fbar_my_luckdraw\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_luckdraw.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_wealth\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_red"  ccid="c60_fbar_my_list_red" ng-click="click(\'c60_fbar_my_list_red\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_red.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_red" ng-style="getStyle(\'c60_fbar_my_list_red\')" ng-bind="compData.JS.c60_fbar_my_list_red.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_red\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_red\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_list_red_openred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.text"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_openred" ng-click="click(\'c60_fbar_my_list_red_openred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_hairred" ng-click="click(\'c60_fbar_my_list_red_hairred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_red\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_discount" ccid="c60_fbar_my_list_discount" ng-click="click(\'c60_fbar_my_list_discount\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat">' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_discount" ng-style="getStyle(\'c60_fbar_my_list_discount\')" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_discount\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_discount\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_discount\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_latestactivity.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.text"></div>' + '            <div class="c60_fbar_ml_second_con_middle"><div class="c60_fbar_ml_mysale_guaguaka" ng-style="getStyle(\'c60_fbar_my_latestactivity\')" >&nbsp;</div></div>' + '            <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_latestactivity" ng-click="click(\'c60_fbar_my_latestactivity\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_preferences.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_preferences" ng-click="click(\'c60_fbar_my_preferences\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_preferences.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '</div>' + '</div>' + '<div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>   <div class="c60_fbar_my_list c60_fbar_my_list_privilege" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">' + '    <div class="c60_fbar_my_list_detail clearfloat">' + '    <div class="c60_fbar_cointitle">' + '    <span class="c60_fbar_mylist c60_fbar_my_list_privilege" ng-style="getStyle(\'c60_fbar_my_list_privilege\')" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.text" ></span>' + '    </div>' + '    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_privilege\')" ></span>' + '    </div>     </div>    </div>' + '</div>' + '   <div class="c60_fbar_my_list_con" ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow || compData.JS.c60_fbar_my_list_task.JS.isShow">' + '<div class="c60_fbar_my_list c60_fbar_my_list_growup" ccid="c60_fbar_my_list_growup" ng-click="click(\'c60_fbar_my_list_growup\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat " >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_growup" ng-style="getStyle(\'c60_fbar_my_list_growup\')" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_growup\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"><div class="c60_fbar_my_border" ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_task" ccid="c60_fbar_my_list_task" ng-click="click(\'c60_fbar_my_list_task\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_task" ng-style="getStyle(\'c60_fbar_my_list_task\')" ng-bind="compData.JS.c60_fbar_my_list_task.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_task\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con " >' + '    <div class="c60_fbar_my_list c60_fbar_my_list_set"  ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();"   ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle">' + '       <span class="c60_fbar_mylist c60_fbar_my_list_set" ng-style="getStyle(\'c60_fbar_my_list_set\')" ng-bind="compData.JS.c60_fbar_my_list_set.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_set\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();"><span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')"></span></div>' + '   </div>' + '</div>' + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'coreService',
        'coreUtils',
        'Const',
        '$sce',
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
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
            $scope.memberInfoFlag = false;
            //初始化是否获取到用户信息标记
            $scope.c60_fbar_attend_btn_text = '';
            //初始化签到按钮文字
            $scope.c60_fbar_attend_btn_style = '';
            //初始化签到按钮样式
            $scope.RedPointFlag = false;
            //初始化小红点显示标记
            $scope.signResultFlag = -1;
            //签到结果标记
            $scope.showFlag = '';
            //显示标记
            $scope.vaIncreasedFlag = -1;
            //签到成功提醒类型标记
            $scope.time = '';


            //签到按钮状态
            $scope.getattend_btn_linkStyle = function() {
                if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state0;
                } else if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '1') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state1;
                } else {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = {
                        'background': '#ddd',
                        'color': '#FFFFFF'
                    };
                }

                return $scope.c60_fbar_attend_btn_style;
            }
            ;
            //手机号格式化
            $scope.phoneFilter = function(param) {
                if (param == undefined)
                    return '<i style="visibility:hidden">&nbsp;</i>';
                var phone = param.substring(0, 3) + "****" + param.substring(7);
                return phone;
            }
            ;
            //流量币和沃豆格式化
            $scope.unitFilter = function(param, type) {
                var total = 0;
                if (param == '' || param == undefined || Number(param) == 0) {
                    total = 0;
                } else {
                    total = parseInt(param).toString();

                    if (parseInt(param) % 10000 == 0 && parseInt(param) !== 0)
                    {
                        total = (parseInt(total) / 10000) + '万';
                    } else {
                        var m = (parseInt(total) / 10000).toString();
                        //total=(total>=10000)?m.substr(0,m.indexOf(".")+3)+'万':total;
                        var tfloatcount = Number($scope.compData.JS.tfloatcount || '2');
                        total = (total >= 10000) ? coreUtils.formatNum(parseInt(total) / 10000, tfloatcount) + '万' : total;
                    }

                }
                if (type == 'coin') {
                    num = $scope.compData.JS.c60_fbar_my_flowcurrency.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_flowcurrency.JS.unit;
                } else if (type == 'wodou') {
                    num = $scope.compData.JS.c60_fbar_my_luckdraw.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_luckdraw.JS.unit;
                } else {
                    num = total;
                }
                return num;
            }
            ;
            //样式赋值
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //箭头跳转样式赋值
            $scope.getJumpStyle = function(classname) {
                if (classname == $scope.showFlag && $scope.compData.JS[classname].JS.linktype == '2') {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state0;
                }
            }
            ;
            //会员日小红点状态
            $scope.show = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                    'display': 'block'
                });
                if ($scope.signResultFlag == 0 || $scope.signResultFlag == 1)
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                }
                else
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                }
                $scope.memberInfoFlag = true;
            }
            $scope.show2 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                    'display': 'block'
                });
            }
            //隐藏
            $scope.hide = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                    'display': 'none'
                });
            }
            ;
            //隐藏2
            /*$scope.hide2 = function() {
                	 angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({'display': 'none'});
                };*/
            //隐藏3
            $scope.hide3 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                    'display': 'none'
                });
            }
            ;
            //样式和初始值配置和入
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            //页面数据初始化
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            //用户信息：接收来自后台的数据
            $scope.memberinfo = function(param) {
                $scope.time = $scope.compData.JS.c60_fbar_mine_tips.JS.closetime;
                if (param && param.respparam) {
                    if (param.respparam.level && param.respparam.level !== '' && param.respparam.level !== undefined && param.respparam.jsessionid && param.respparam.jsessionid !== '' && param.respparam.jsessionid !== undefined) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        $scope.revData = param;
                        $scope.revData.respparam.coin = param.respparam.data[0].coin + '';
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou + '';
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_my_con')).css({
                            'display': 'block'
                        });
                        //判断是否会员日
                        param.respparam.memberdate = param.respparam.memberdate + '';
                        $scope.RedPointFlag = (param.respparam.memberdate == '1') ? true : false;
                        //判断是否可以签到
                        param.respparam.signflag = param.respparam.signflag + '';
                        if (param.respparam.signflag == '1') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        } else if (param.respparam.signflag == '0') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                        } else {
                            $scope.memberInfoFlag = false;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        }
                    }
                    else
                    {
                        $timeout($scope.hide3, $scope.time);
                        $timeout($scope.show2, $scope.time);
                    }
                }
            }
            ;
            //签到成功：接收来自后台的数据
            $scope.signRet = function(param) {

                if (param && param.respparam) {
                    $scope.revData.respparam.jsessionid = param.respparam.jsessionid;
                    if (param.respparam.level !== '' && param.respparam.level && param.respparam.level !== undefined)
                        $scope.revData.respparam.level = param.respparam.level;
                    if (param.respparam.data[0].coin !== '' && param.respparam.data[0].coin && param.respparam.data[0].coin !== undefined)
                        $scope.revData.respparam.coin = param.respparam.data[0].coin;
                    if (param.respparam.data[0].wodou !== '' && param.respparam.data[0].wodou && param.respparam.data[0].wodou !== undefined)
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou;
                    if (param.respparam.vaIncreased !== '' && param.respparam.vaIncreased && param.respparam.vaIncreased !== undefined)
                    {
                        var vafloatcount = Number($scope.compData.JS.vafloatcount || '0');
                        $scope.revData.respparam.vaIncreased = coreUtils.formatNum(Number(param.respparam.vaIncreased), vafloatcount);
                        $scope.vaIncreasedFlag = 0;
                    } else {
                        $scope.vaIncreasedFlag = 1;
                    }
                    $scope.signResultFlag = 0;
                }
                $timeout($scope.hide, $scope.time);
                $timeout($scope.show, $scope.time);
            }
            ;
            //签到失败
            $scope.error = function(param) {
                if (param) {
                    if (param.errorcode == "1-140-1-027") {
                        $scope.signResultFlag = 1;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    } else {
                        $scope.signResultFlag = 2;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    }
                }
            }
            //外链内嵌和直接外链处理   0:外链内嵌  1:直接外链跳转  2:展开子项
            $scope.linkEvent = function(type, eventName) {
                if ($scope.memberInfoFlag) {
                    if ($scope.compData.JS[type].JS.linktype == '0') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        coreService.fireEvent($scope.cid, eventName, {
                            "url": url
                        });
                    } else if ($scope.compData.JS[type].JS.linktype == '1') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        window.open(url);
                    } else {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                } else {
                    if ($scope.compData.JS[type].JS.linktype == '2') {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                }
            }
            //点击事件详情
            var myClick = {
                c60_fbar_my_result_link_btn: function(param) {
                    //*******************错误页面-返回首页按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'linkbtn')
                        };
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'backclick');
                },
                c60_fbar_my_head_member: function(param) {
                    //*******************会员日按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'member')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if (!$scope.RedPointFlag) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time);
                    } else {
                        $scope.linkEvent('c60_fbar_my_head_member', 'memberclick');
                    }
                },
                c60_fbar_my_head_rule: function(param) {
                    //*******************签到规则按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'rule')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'block'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'block'
                    });
                    //$timeout($scope.hide2, $scope.time);
                },
                c60_fbar_my_rule_textbtn: function(param) {
                    //*******************签到规则-欢乐抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'textbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_rule_textbtn', 'rulebtnclick');
                },
                c60_fbar_my_tips_closebtn: function(param) {
                    //*******************弹出层关闭按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'closebtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_attend_btn: function(param) {
                    //*******************签到按钮*******************
                    if ($scope.memberInfoFlag == undefined)
                        return false;
                    if ($scope.memberInfoFlag)
                    {
                        if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0')
                        {
                            angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                                'display': 'block'
                            });
                            $scope.memberInfoFlag = undefined;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '2';
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'attendclick');
                        }
                        else
                        {
                            $scope.signResultFlag = 1;
                            angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                                'display': 'block'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                                'display': 'block'
                            });
                            //$timeout($scope.hide2, $scope.time);
                        }
                    }
                    else
                    {
                        $scope.signResultFlag = 2;
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time);
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'attend')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                },
                c60_fbar_my_tips_successbtn: function(param) {
                    //*******************签到-去抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'success')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_tips_successbtn', 'successbtnclick');
                },
                c60_fbar_my_tips_failurebtn: function(param) {
                    //*******************签到-ok按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'failure')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_my_list_coin: function(param) {
                    //*******************我的金币按钮*******************
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
                c60_fbar_my_list_wealth: function(param) {
                    //*******************我的财富按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'wealth')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                },
                //                    c60_fbar_my_list_wealth: function(param) {
                //                        //*******************我的财富按钮*******************
                //                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                //                            $scope.compData.JS['cdrData'] = {};
                //                            $scope.compData.JS.cdrData = {
                //                                'pageId': $scope.pageID,
                //                                'componentId': 'c60_fbar_my_list_wealth'
                //                            };
                //                            coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                //                        }
                //                        $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                //                    },
                c60_fbar_my_flowcurrency: function(param) {
                    //*******************我的财富-兑换流量币按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'flowcurrency')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_flowcurrency', 'flowcurrencyclick');
                },
                c60_fbar_my_luckdraw: function(param) {
                    //*******************我的财富-沃豆抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'luckdraw')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_luckdraw', 'luckdrawclick');
                },
                c60_fbar_my_list_red: function(param) {
                    //*******************我的红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'red')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red', 'redclick');
                },
                c60_fbar_my_list_red_openred: function(param) {
                    //*******************我的红包-开红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'openred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_openred', 'openredclick');
                },
                c60_fbar_my_list_red_hairred: function(param) {
                    //*******************我的红包-发红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'hairred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_hairred', 'hairredclick');
                },
                c60_fbar_my_list_discount: function(param) {
                    //*******************我的优惠*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'discount')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                    $scope.linkEvent('c60_fbar_my_list_discount', 'discountclick');
                },
                c60_fbar_my_latestactivity: function(param) {
                    //*******************我的优惠-我要刮按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'latestactivity')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                    $scope.linkEvent('c60_fbar_my_latestactivity', 'latestactivityclick');
                },
                c60_fbar_my_preferences: function(param) {
                    //*******************我的优惠-去看看按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'preferences')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_preferences', 'oldcustomerpreferencesclick');
                },
                c60_fbar_my_list_privilege: function(param) {
                    //*******************我的特权按钮*******************
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
                c60_fbar_my_list_growup: function(param) {
                    //*******************我的成长按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'growup')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_growup', 'growupclick');
                },
                c60_fbar_my_list_task: function(param) {
                    //*******************我的任务按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'task')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_task', 'taskclick');
                },
                c60_fbar_my_list_set: function(param) {
                    //*******************设置按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'set')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setclick');
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
            //点击事件分割
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_my_result_link_btn':
                    myClick.c60_fbar_my_result_link_btn(param);
                    break;
                case 'c60_fbar_my_head_member':
                    myClick.c60_fbar_my_head_member(param);
                    break;
                case 'c60_fbar_my_head_rule':
                    myClick.c60_fbar_my_head_rule(param);
                    break;
                case 'c60_fbar_my_rule_textbtn':
                    myClick.c60_fbar_my_rule_textbtn(param);
                    break;
                case 'c60_fbar_my_tips_closebtn':
                    myClick.c60_fbar_my_tips_closebtn(param);
                    break;
                case 'c60_fbar_attend_btn':
                    myClick.c60_fbar_attend_btn(param);
                    break;
                case 'c60_fbar_my_tips_successbtn':
                    myClick.c60_fbar_my_tips_successbtn(param);
                    break;
                case 'c60_fbar_my_tips_failurebtn':
                    myClick.c60_fbar_my_tips_failurebtn(param);
                    break;
                case 'c60_fbar_my_list_coin':
                    myClick.c60_fbar_my_list_coin(param);
                    break;
                case 'c60_fbar_my_list_wealth':
                    myClick.c60_fbar_my_list_wealth(param);
                    break;
                case 'c60_fbar_my_flowcurrency':
                    myClick.c60_fbar_my_flowcurrency(param);
                    break;
                case 'c60_fbar_my_luckdraw':
                    myClick.c60_fbar_my_luckdraw(param);
                    break;
                case 'c60_fbar_my_list_red':
                    myClick.c60_fbar_my_list_red(param);
                    break;
                case 'c60_fbar_my_list_red_openred':
                    myClick.c60_fbar_my_list_red_openred(param);
                    break;
                case 'c60_fbar_my_list_red_hairred':
                    myClick.c60_fbar_my_list_red_hairred(param);
                    break;
                case 'c60_fbar_my_list_discount':
                    myClick.c60_fbar_my_list_discount(param);
                    break;
                case 'c60_fbar_my_latestactivity':
                    myClick.c60_fbar_my_latestactivity(param);
                    break;
                case 'c60_fbar_my_preferences':
                    myClick.c60_fbar_my_preferences(param);
                    break;
                case 'c60_fbar_my_list_privilege':
                    myClick.c60_fbar_my_list_privilege(param);
                    break;
                case 'c60_fbar_my_list_growup':
                    myClick.c60_fbar_my_list_growup(param);
                    break;
                case 'c60_fbar_my_list_task':
                    myClick.c60_fbar_my_list_task(param);
                    break;
                case 'c60_fbar_my_list_set':
                    myClick.c60_fbar_my_list_set(param);
                    break;
                case 'c60_fbar_my_add_desktop':
                    myClick.c60_fbar_my_add_desktop(param);
                    break;
                default:
                    break;
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, param, deferred) {
                $scope.eventMap[event](param);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.eventMap['memberinfo'] = $scope.memberinfo;
            $scope.eventMap['error'] = $scope.error;
            $scope.eventMap['signRet'] = $scope.signRet;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmine";
            $scope.init();
        }
    };
});
uiCore.directive('ititlefts', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}><imageholder cid="titleimage" ng-show="compData.JS.titleimageconfigflag" param="compData.JS.titleimageconfig"></imageholder><irichtext cid="titletext" param="compData.JS.titletextconfig"></irichtext></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "z-index": "2047483648",
                    position: "relative",
                    width: "100%",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    height: "2.4em",
                    "line-height": "2.4em",
                    "text-align": "left",
                    "padding-left": "2.3em",
                    "border-bottom-width": "1px",
                    "border-bottom-style": "solid",
                    "border-bottom-color": "rgb(214,214,214)",
                    background: "rgb(248,248,248)",
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                },
                JS: {
                    clickable: false,
                    stateconfig: {
                        state: "0"
                    },
                    titleimageconfig: {
                        CSS: {},
                        JS: {
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    titletextconfig: {
                        CSS: {
                            "text-align": "left",
                            color: "rgb(34,34,34)",
                            display: "block",
                            "font-size": "1em",
                            height: "2.4em",
                            "line-height": "2.4em"
                        },
                        JS: {
                            clickable: false,
                            stateconfig: {
                                state: "0"
                            }
                        }
                    }

                }
            };
            $scope.setEvents = function() {
                if ($scope.compData.JS.clickable) {
                    var _touchstart = Const.touchEvent.start;
                    var _touchmove = Const.touchEvent.move;
                    var _touchend = Const.touchEvent.end;
                    var _lastYPos = 0;
                    var _lastXPos = 0;
                    var _currentYPos = 0;
                    var _currentXPos = 0;
                    $element.bind(_touchend, function(e) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, "", 'returnback')
                            };
                            coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
                    });
                }
            }
            ;

            $scope.setState = function(data) {
                $scope.compData.JS.stateconfig.state = data.state;
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
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.applyStyle();
                $scope.setEvents();
            }
            ;

            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                //用于appbar有subscribeid时
                //                        if(top.subscribeid1){
                //                        $element.css({'padding-left':'0','left':'.7em','top':'.5em'});
                //                        }
            }
            ;

            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.updateTitleText = function(titleTextData, deferred) {
                $scope.compData.JS.titletextconfig.JS.textdata = titleTextData.stitle;
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;

            $scope.eventMap['updateState'] = $scope.setState;
            $scope.eventMap['updateTitleText'] = $scope.updateTitleText;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ititlefts';
            $scope.init();
        }
    };
}
]);
uiCore.directive('receiveinfo', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_recevicer_info">'
        + '<div class="c60_fbar_recevicer_info_con" ng-show="infoflag">'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfoname.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.name"></span></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfomemory.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.memory"></span></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfocolor.JS.text"></div>'
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_colorcons"></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfopkg.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.tariff"></span></div>'
        + '</div>'
        + '</div>'
        + '<div class="c60_fbar_recevicer_info_con"><div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left c60_fbar_ri_type_width30" ng-bind="compData.JS.receiveinfoaddress.text"></div>'
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="text" ng-model="inputData" value placeholder="{{compData.JS.inputtext.text}}" class="c60_fbar_ri_type_address_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor" ng-bind="compData.JS.inputtext.tips"></div></div>'
        + '</div></div>'
        + '<div class="c60_fbar_ri_banli_btn" ><span class="c60_fbar_ri_banli_btn_link" ccid="c60_fbar_ri_banli_btn_link" ng-click="confirmclick()" ng-style="compData.JS.button.CSS" ng-bind="compData.JS.button.JS.text"></span></div>'
        + '<div class="c60_fbar_ri_tips">'
        + '<div class="c60_fbar_ri_tips_tit" ng-bind="compData.JS.tiptitle.JS.text" ng-style="compData.JS.tiptitle.CSS"></div>'
        + '<div class="c60_fbar_ri_tips_txt"></div>'
        + '</div>'
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.infoflag = false;
            var tipstxt = angular.element($element[0].querySelector('.c60_fbar_ri_tips_txt'));
            var colordivs = angular.element($element[0].querySelector('.c60_fbar_ri_type_colorcons'))[0];
            var colordot = []
              , colordotcontainer = [];
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            $scope.confirmclick = function() {
                var offlinepacksubscription;
                if ($scope.infoflag == true) {
                    offlinepacksubscription = {
                        "address": encodeURIComponent($scope.inputData),
                        "color": $scope.colordatas,
                        "taskId": $scope.taskId

                    }
                } else if ($scope.infoflag == false) {
                    offlinepacksubscription = {
                        "address": $scope.inputData,
                        "taskId": $scope.taskId
                    }
                } else {

                }
                if ($scope.inputData == undefined || $scope.inputData == '') {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'block');
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'none');
                    if (top.tlbs.messageid != "") {
                        coreService.fireEvent($scope.cid, 'messagestatuschange', {
                            "messageid": top.tlbs.messageid
                        });
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.confirmbtn.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                            'iseComp': '1'
                        };
                        coreUtils.cdrService($scope.compData.JS.confirmbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'confirmclick', offlinepacksubscription);
                }
            }
            ;
            $scope.update = function(param) {
                if (param) {
                    var pmdata = param.pmdata || {};
                    $scope.taskId = param.taskId || '';
                    if (pmdata.isoffer == 'true' || pmdata.isoffer == true) {
                        $scope.infoflag = true;
                        $scope.offerdetails = pmdata.offerdetails;
                        var color = pmdata.offerdetails.colors;
                        if (($element[0].querySelector('.c60_fbar_ri_type_color_chose')) == null ) {
                            for (var i = 0; i < color.length; i++) {
                                var colorcon;
                                if (i == 0) {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose c60_fbar_cur" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];

                                } else {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];
                                }
                                colordot.push(colorcon);
                                colordivs.appendChild(colorcon);
                            }
                        } else {

                        }
                        var cur = angular.element($element[0].querySelector('.c60_fbar_cur'));
                        cur.css({
                            "border": "3px solid #ff7a03",
                            "color": "#ff6600",
                            "background": "#fff"
                        });
                        $scope.colordatas = cur.attr('color');
                        for (var j = 0; j < colordot.length; j++) {
                            var _touchstart = Const.touchEvent.start
                              , _touchend = Const.touchEvent.end;
                            var colordotcontainer = angular.element(colordot[j]);
                            var f = (function(j) {
                                $scope.colordatas = angular.element(colordot[0]).attr('color');
                                var touch = function(e) {

                                    e.stopPropagation();
                                    e.preventDefault();

                                    for (var i = 0; i < colordot.length; i++) {
                                        if (i != j) {
                                            angular.element(colordot[i]).removeClass('c60_fbar_cur').css({
                                                "border": "3px solid #eee",
                                                "color": $scope.compData.JS.receiveinfocolor.CSS.color,
                                                "background": "#eee"
                                            });
                                        }
                                    }
                                    angular.element(colordot[j]).addClass('c60_fbar_cur').css({
                                        "border": "3px solid #ff7a03",
                                        "color": "#ff6600",
                                        "background": "#fff"
                                    });
                                    $scope.colordatas = angular.element(colordot[j]).attr('color');
                                }
                                return touch;

                            })(j)
                            colordotcontainer.bind(_touchstart, f);
                        }
                    } else {
                        $scope.infoflag = false;
                    }
                    tipstxt.html($scope.compData.JS.tips_txt.text);
                } else {

                }

            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                coreService.fireEvent($element.attr('cid'), 'test');
            }
            ;

            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'receiveinfo';
            $scope.init();
        }
    }
}
]);
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
uiCore.directive('sitenavigation', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: ' <div class="c60_fbar_sitenavigation" ng-style="getConfigStyle({sitenavigation:1})">'
        + ' <div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()">'
        + ' <div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div>'
        + ' <div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div>'
        + ' <div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn">'
        + ' <a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a>'
        + ' </div>'
        + ' </div>'
        + ' <div class="tbholder c60_fbar_navigation">'
        + ' <div class="c60_fbar_navigation_site" simplescroll>'
        + '	<div class="c60_fbar_navigation_site_detail">'
        + ' <ul class="c60_fbar_navigation_ul c60_fbar_clearfloat">'
        + ' <li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="site in sites" ng-click="navigate(site.weblink,site.linktype)">'
        + ' <div class="c60_fbar_site_detail">'
        + ' <img class="c60_fbar_navigation_ul_img" ng-src="{{site.iconurl}}" alt=""/>'
        + ' <p class="c60_fbar_navigation_ul_txt">{{site.title}}</p>'
        + ' </div>'
        + ' </li>'
        + ' </ul>'
        + ' </div>'
        + ' </div>'
        + ' </div>'
        + ' </div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $scope.paddingtop = $scope.compData.JS.sitenavigation.CSS;
                //                    $element.css($scope.compData.css || {});
                //                    coreService.fireEvent($element.attr('cid'), 'init');
                //                coreService.fireEvent($element.attr('cid'),'sitenavigation');
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

            $scope.updateData = function(param) {
                if (param != null  && param != undefined && param.respparam != null  && param.respparam != undefined) {
                    $scope.respData = param.respparam;
                    if ($scope.respData.website != null  && $scope.respData.website != undefined && $scope.respData.website.length > 0) {
                        $scope.sites = $scope.respData.website;

                        $scope.showSuccess();
                        for (var i = 0; i < $scope.sites.length; i++) {
                            var sites = $scope.sites;
                            var l = Math.ceil(sites.length / 3);
                            $scope.len1 = $scope.len1 + l * 5.5;
                        }
                        angular.element($element[0].querySelector('.c60_fbar_navigation_site')).attr('totalheight', $scope.len1 * 16 + "px");
                    } else {
                        $scope.showError();
                        return false;
                    }
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;

            $scope.navigate = function(linkUrl, linkType)
            {
                if (linkType == undefined || linkType == 0) {
                    window.open(linkUrl);
                } else {
                    coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                        "linktype": linkType,
                        "url": linkUrl
                    });
                }
            }
            ;

            $scope.getConfigStyle = function(input) {
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

            $scope.getapp_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    if ($scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;

            $scope.appresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;

            $scope.appresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.appresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 1;
                $scope.compData.JS.sitenavigation.CSS = {
                    'padding-top': '6em'
                };
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'none'
                });
                //coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;

            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 0;
                $scope.compData.JS.sitenavigation.CSS = $scope.paddingtop;
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'block'
                });
                //   coreService.fireEvent($element.attr('cid'), 'showsucc');
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
            $scope.eventMap['update'] = $scope.updateData;
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
uiCore.directive('overed', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_overed_buy_con"><div style="overflow:hidden;height:100%" simplescroll>' +
        '<overedpack stateconfig="{{::compData.JS.config}}" ordered=orderedProducts ng-repeat="opack in orderedProducts" opack-name="opack.name" opack-name="opack.name" opack-time="opack.orderedtime" opack-desc="opack.description"></overedpack>' +
        '<div class="c60_fbar_no_more"><span>no more...</span></div>' +
        '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile",
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'config': {
                        'up': {
                            'background': 'url("' + top.tlbs.templatePath + '/images/shengdangtip.png") center right no-repeat',
                            'background-size': '0.65em 0.65em',
                            'padding-right': '0.9em'
                        }
                    }

                }
            };
            $scope.eventMap = {};
            $scope.orderedProducts = [];
            $scope.update = function(data) {
                if (data && data.respparam && data.respparam.trafficusage) {
                    $scope.orderedProducts = data.respparam.trafficusage.orderedProducts;
                }
            }
            ;
            $scope.init = function(param) {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
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
            $scope.eventMap['update'] = $scope.update;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'overed';
            $scope.init();
        }

    }

}
]);
uiCore.directive('overedpack', [function() {

    return {
        restrict: 'EA',
        require: '^?pid',
        replace: true,
        scope: {
            name: '=opackName',
            time: '=opackTime',
            desc: '=opackDesc',
            ordered: '=ordered',
        },
        template: '<div class="c60_fbar_overed_buy_list">' +
        '<div class="c60_fbar_type_time c60_fbar_clearfloat">' +
        '<div class="c60_fbar_type"><span class="c60_fbar_up" ng-bind="name"></span></div>' +
        '<div class="c60_fbar_time" ng-bind="time"></div></div>' +
        '<div class="c60_fbar_txt" ng-bind="desc"></div>' +
        '</div>',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.changeStyle = function() {
                var states = coreUtils.String2JSON($attrs['stateconfig']);
                var element = angular.element($element[0].querySelector('.c60_fbar_up'));
                var name = $scope.name;
                if (name.indexOf("升级包") > 0) {
                    element.css(states.up);
                }
            }
            ;
            $scope.init = function() {
                $scope.changeStyle();
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }

}
]);
uiCore.directive('idivholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        //console.log('$scope.compData.JS.stateconfig.state:', $scope.compData.JS.stateconfig.state, 'stateObject.cstate:', stateObject.cstate, '$scope.cid:', $scope.cid);
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                        /*$timeout(function() {
                                    $scope.$apply();
                                    if (null != deferred) {
                                        if ($scope.compData.JS.animation) {
                                            var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                            $element.on(_transitionEnd, function(e) {
                                                deferred.resolve();
                                            });
                                        } else {
                                            deferred.resolve();
                                        }
                                    }
                                });*/
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    $scope.compData.CSS = coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + stateObject.cstate]);
                    $scope.applyStyle();
                }
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    //console.log('cid:', $scope.cid, '$scope.param:', $scope.param);
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'idivholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('tbparentisolator', [
function() {
    return {
        restrict: 'AE',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            var _maxTimeMotionless = 300;
            var jqLite = angular.element
              ,
            copy = angular.copy
              ,
            forEach = angular.forEach
              ,
            isString = angular.isString
              ,
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': true
            }
              ,
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" ||
                raw.tagName === "SELECT" ||
                raw.tagName === "TEXTAREA");
            }
              ,
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },

                    startedAt: Date.now(),
                    updatedAt: Date.now(),

                    stopped: false,
                    active: true
                };
            }
              ,
            dragStart = function(e) {
                e = e.originalEvent || e;

                var target = jqLite(e.target || e.srcElement);

                options.stopPropagation && e.stopPropagation();

                var point = e.touches ? e.touches[0] : e;

                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }

                self.state = startDragState({
                    x: point.pageX,
                    y: point.pageY
                });
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;
                var target = e.target;
                if (null  != self.state && self.state.active && !isInput(target)) {
                    e.preventDefault();
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    self.state = {};
                }
            }
            ;
            $element.bind('touchstart', dragStart);
            $element.bind('touchmove', dragMove);
            $element.bind('touchend touchcancel', dragEnd);
            //$element.bind('mousedown', dragStart);
            //$element.bind('mousemove', dragMove);
            //$element.bind('mouseup mouseout', dragEnd);
        }
        ]
    };
}
]);
uiCore.directive('iresize', [
'$window',
'$interval',
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            var w = angular.element(top.window);
            w.bind('resize', function() {
                $scope.$apply();
            });
            $scope.getWindowDimensions = function() {
                return {
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth
                };
            }
            ;
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);

            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.currWidth = top.window.innerWidth;
            $scope.currHeight = top.window.innerHeight;
            $scope.rresize = function() {
                var baseHeight = 360
                  ,
                baseWidth = 320;
                $scope.currWidth = top.window.innerWidth;
                $scope.currHeight = top.window.innerHeight;
                var cFontSize = 0
                  ,
                newFontSize = 0;
                if ($scope.prevWidth == $scope.currWidth && $scope.currHeight != $scope.prevHeight && Math.min($scope.prevHeight, $scope.currHeight) / Math.max($scope.prevHeight, $scope.currHeight) >= 0.8) {
                    $scope.prevWidth = $scope.currWidth;
                    $scope.prevHeight = $scope.currHeight;
                    return;
                }
                if ($scope.prevWidth == $scope.currWidth && $scope.prevHeight == $scope.currHeight) {
                    return;
                }

                if ($scope.currWidth <= $scope.currHeight) {
                    cFontSize = $scope.currWidth / baseWidth;
                } else {
                    cFontSize = $scope.currHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.currWidth) {
                    cFontSize = $scope.currWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
uiCore.directive('lresize', [
'$window',
'$interval',
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            var w = angular.element(top.window);
            w.bind('resize', function() {
                $scope.$apply();
            });
            $scope.getWindowDimensions = function() {
                return {
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth,
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']),
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'cw': $element.css('width')
                };
            }
            ;
            w.bind("scroll", function() {
                $scope.rresize();
            });
            $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            var baseHeight = 360
              ,
            baseWidth = 320;
            $scope.prevWidth = 0;
            $scope.prevHeight = 0;
            $scope.rresize = function() {
                //console.log('top.document.documentElement.clientHeight:', top.document.documentElement.clientHeight, 'top.window.innerHeight:', top.window.innerHeight, 'top.window.pageYOffset:', top.window.pageYOffset);
                //console.log('top.document.documentElement.clientWidth:', top.document.documentElement.clientWidth, 'top.window.innerWidth:', top.window.innerWidth, 'top.window.pageXOffset:', top.window.pageXOffset);
                if ((top.window.innerWidth / top.document.documentElement.clientWidth) != 1) {
                    $element.css('bottom', top.document.documentElement.clientHeight - (top.window.pageYOffset + top.window.innerHeight) + 'px');
                    $element.css('position', 'absolute');
                    if ($element.css('width') != '0%') {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    } else if (top.window.pageXOffset == 0) {
                        $element.css('right', top.document.documentElement.clientWidth - top.window.innerWidth + 'px');
                    } else if (top.window.pageXOffset > 0) {
                        $element.css('right', '-' + top.window.pageXOffset + 'px');
                    }
                    //console.log($element.css('width'));
                } else {
                    $scope.setFontSize();
                    $element.css('position', 'fixed');
                    $element.css('bottom', '0px');
                    $element.css('right', '0px');
                }
                $element.css('-webkit-transform', 'scale(' + top.window.innerWidth / top.document.documentElement.clientWidth + ')');
                $element.css('-webkit-box-sizing', 'border-box');
                $element.css('box-sizing', 'border-box');
                $element.css('-webkit-transition', 'all 0.2s ease-in-out');
                $element.css('-webkit-transform-origin', '0 100%');

            }
            ;
            $scope.setFontSize = function() {
                $scope.currWidth = top.window.innerWidth;
                $scope.currHeight = top.window.innerHeight;
                var cFontSize = 0
                  ,
                newFontSize = 0;
                if ($scope.prevWidth == $scope.currWidth && $scope.currHeight != $scope.prevHeight && Math.min($scope.prevHeight, $scope.currHeight) / Math.max($scope.prevHeight, $scope.currHeight) >= 0.8) {
                    $scope.prevWidth = $scope.currWidth;
                    $scope.prevHeight = $scope.currHeight;
                    return;
                }
                if ($scope.prevWidth == $scope.currWidth && $scope.prevHeight == $scope.currHeight) {
                    return;
                }
                if ($scope.currWidth <= $scope.currHeight) {
                    cFontSize = $scope.currWidth / baseWidth;
                } else {
                    cFontSize = $scope.currHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.currWidth) {
                    cFontSize = $scope.currWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                $element.css('font-size', newSize + 'px');
                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;

                $scope.prevWidth = $scope.currWidth;
                $scope.prevHeight = $scope.currHeight;
            }
            ;
        }
        ]
    };
}
]);
uiCore.directive('iholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();$event.stopPropagation();" {{param}} ng-transclude></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$compile',
        '$templateCache',
        '$timeout',
        function($scope, $element, $attrs, $compile, $templateCache, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'stylestates': '',
                        'extrastates': '',
                        'cstylestate': '',
                        'cextrastate': '',
                        'state': 0,
                        'estate': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processStyle();
                $scope.updateStyle();
                if (null  != $attrs.templateurl) {
                    $scope.getTemplate();
                }
            }
            ;
            $scope.getHolderStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
            }
            ;
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, ($scope.compData.JS.clickevent || '') + 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.updateStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.changeExtraState = function(stateObject, deferred) {
                if ($scope.compData.JS.stateconfig.estate != stateObject.cstate) {
                    $scope.compData.JS.stateconfig.estate = stateObject.cstate;
                    $scope.updateStyle();
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;

            $scope.hide = function(input) {
                $element.css({
                    'display': 'none'
                });
            }
            ;

            $scope.show = function(data) {
                $element.css({
                    'display': 'block'
                });
                var time = $scope.compData.JS.closetime;
                //add by h00278783 消息盒子点击查看详细，不设置定时器-------start------
                if (data && (data.messageid == undefined)) {
                    return false;
                }
                //add by h00278783 消息盒子点击查看详细，不设置定时器-------end------
                if (time) {
                    //记录到当前弹框消息messageid
                    top.tlbs.messageid = data.messageid;
                    $timeout(function() {
                        if ($element.css('display') != 'none') {
                            top.tlbs.notificationCdrData = null ;
                        }
                        $scope.hide();
                    }, time);
                }

            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['changeExtraState'] = $scope.changeExtraState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });
            $scope.processStyle = function() {
                var cssData = JSON.stringify($scope.compData.CSS);
                cssData = $scope.formatStyleData(cssData);
                coreService.commonServiceRef.appendStyle($scope.classid, '', cssData);
                var styleStateArray = $scope.compData.JS.stateconfig.stylestates.split('|');
                var styleStateArrayLength = styleStateArray.length;
                var extraStateArray = $scope.compData.JS.stateconfig.extrastates.split('|');
                var extraStateArrayLength = extraStateArray.length;
                for (var i = 0; i < styleStateArrayLength; i++) {
                    var styleState = styleStateArray[i];
                    if (styleState.length > 0) {
                        cssData = JSON.stringify($scope.compData.JS.stateconfig[styleState]);
                        cssData = $scope.formatStyleData(cssData);
                        coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState, cssData);
                        for (var j = 0; j < extraStateArrayLength; j++) {
                            var extraState = extraStateArray[j];
                            if (extraState.length > 0) {
                                cssData = JSON.stringify($scope.compData.JS.stateconfig[extraState]);
                                cssData = $scope.formatStyleData(cssData);
                                coreService.commonServiceRef.appendStyle($scope.classid, '.' + styleState + '.' + extraState, cssData);
                            }
                        }
                    }
                }
                $element.addClass($scope.cid);
                if (null  != $scope.compData.JS.stateconfig.state) {
                    var currentState = 'state' + $scope.compData.JS.stateconfig.state;
                    $scope.compData.JS.stateconfig.stylestates = currentState;
                }
            }
            ;
            $scope.formatStyleData = function(styleData) {
                styleData = styleData.replace(/","/g, ';').replace(/":"/g, ':').replace(/\\/g, '').replace(/{"/, '{').replace(/"}/, '}');
                return styleData;
            }
            ;
            $scope.updateStyle = function() {
                $element.removeClass($scope.compData.JS.stateconfig.cstylestate);
                $element.removeClass($scope.compData.JS.stateconfig.cextrastate);
                $scope.compData.JS.stateconfig.cstylestate = 'state' + $scope.compData.JS.stateconfig.state;
                $element.addClass($scope.compData.JS.stateconfig.cstylestate);
                if ($scope.compData.JS.stateconfig.state != $scope.compData.JS.stateconfig.estate) {
                    $scope.compData.JS.stateconfig.cextrastate = 'state' + $scope.compData.JS.stateconfig.estate;
                    $element.addClass($scope.compData.JS.stateconfig.cextrastate);
                }
            }
            ;
            $scope.getTemplate = function() {
                var elementTemplateCache = $templateCache.get($attrs.templateurl);
                $element.html(elementTemplateCache);
                $compile($element.contents())($scope);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iholder';
            scope.init();
        }
    };
}
]);
uiCore.directive('ihtmltext', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'dataMapping': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                if ($scope.cid) {
                    coreService.registerComponentInstance($scope.cid, $scope);
                    $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                }
                coreUtils.extendDeep($scope.compData, $scope.param || {});
                $scope.updateHTML($scope.compData.JS.textdata);
                $scope.applyStyle();
            }
            ;
            /*$scope.getTextStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch(function() {
                return $element.attr('itext');
            }, function(newValue) {
                if (null  != newValue) {
                    $scope.updateHTML(newValue);
                }
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.$watch($scope.compData, function() {
                if (null  != $scope.compData.JS.textdata) {
                    $scope.updateHTML($scope.compData.JS.textdata);
                }
            });
            $scope.updateHTML = function(htmlData) {
                //$element[0].innerHTML = '<marquee direction="up" height="100%" scrollamount="2">' + htmlData + '</marquee>';
                $element[0].innerHTML = htmlData;
            }
            ;
            $scope.updateHTMLText = function(args) {
                if ($scope.compData.JS.dataMapping) {
                    $scope.updateHTML(coreUtils.transfer(args, $scope.compData.JS.dataMapping));
                }
            }
            ;
            $scope.eventMap['text.update'] = $scope.updateHTMLText;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ihtmltext';
            $scope.init();
        }
    };
}
]);
uiCore.directive('irichtext', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-click="compData.JS.clickable?handleClick():clickDisable();" {{param}}>{{compData.JS.textdata}}</div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
                            $scope.$apply();
                        });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.applyStyle();
            }
            ;
            /*$scope.getTextStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'irichtext';
            $scope.init();
        }
    };
}
]);
uiCore.directive('pvctrl', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$interval',
        function($scope, $element, $attrs, $interval) {
            $scope.cid = 'pvctrl';
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.ctrlPageGroup = {};
                var alllLoad = angular.element($element[0].querySelectorAll('[lload="0"]'));
                for (var i = 0; i < alllLoad.length; i++) {
                    var localElement = angular.element(alllLoad[i]);
                    $scope.ctrlPageGroup[localElement.attr('pid')] = localElement;
                }
            }
            ;
            //0:chinese word  1:english word or num 2:标点符号
            function checkword(str) {
                var regCh = new RegExp("[\\u4E00-\\u9FA5\uFE30-\uFFA0]+","g");
                var regNumEng = new RegExp("[0-9a-zA-z]+","g");
                if (regCh.test(str) == true) {
                    return 15;
                } else if (regNumEng.test(str) == true) {
                    return 1;
                } else {
                    return 15;
                }
            }
            function getEncodeMsg(message) {
                var newStr = "";
                var count = 0, temp = 0, i;
                for (i = 0; i < message.length; i++) {
                    temp = count + checkword(message[i]);
                    if (temp > 1000) {
                        break;
                    } else {
                        count = temp;
                    }
                }
                if (i == message.length) {
                    return message;
                } else {
                    return message.substring(0, i);
                }
            }
            $scope.lloadApps = function(loadObject, deferred) {
                if (null  != loadObject.applist && loadObject.applist.length > 0) {
                    var pageidSplit = loadObject.applist.split(',');
                    var appArrayObj = new loadAppArray().eexecute(pageidSplit, deferred);
                    var serverRespTime = loadObject.sresptime || '';
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': loadObject.taskId,
                        'componentId': pageidSplit[0],
                        'pageId': pageidSplit[0],
                        'message': encodeURIComponent(encodeURIComponent(getEncodeMsg(loadObject.message || ''))),
                        'sresptime': serverRespTime,
                        'functionid': loadObject.functionid
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    top.tlbs.notificationCdrData = cdrData;
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            var loadAppArray = function() {

            }
            ;

            loadAppArray.prototype.eexecute = function(pageArray, deferred) {
                var i = 0
                  ,
                j = pageArray.length
                  ,
                count = 0
                  ,
                pageArrayIds = pageArray
                  ,
                deferred = deferred;
                var executeFunction = function(lKey) {
                    var loadingPageId = pageArrayIds[count];
                    var pageObject = $scope.ctrlPageGroup[loadingPageId];
                    if (null  != pageObject && pageObject.attr('lload') == 0) {
                        pageObject.attr('lload', '1');
                        var cdrConfig = {
                            'cdrType': 'uidisplaycdr',
                            'enable': true,
                            'storeData': false
                        };
                        var cdrData = {
                            'pageId': loadingPageId,
                            'displayType': 1,
                            'displayResult': 0
                        };
                        coreUtils.cdrService(cdrConfig, cdrData);
                    }
                    count = count + 1;
                    if (count == j && null  != deferred) {
                        $timeout(function() {
                            deferred.resolve();
                        });
                    }
                }
                ;
                $interval(executeFunction, 10, j, this.loadKey);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'pvctrl';
            scope.init();
        }
    };
}
]);
uiCore.directive("iappbuttonholder", ["coreService", "coreUtils", "$timeout", "Const", "$window", function(c, a, b, d, e) {
    return {
        restrict: "AE",
        replace: true,
        template: '<div ng-style="compData.CSS" ><div ng-style="compData.JS.appbuttoncontainer.CSS"><div  ng-style="compData.JS.appbutton.CSS" ng-repeat="apps in compData.JS.dataset | limitTo:compData.JS.maxcount" id="news_app_{{$index}}" ng-click="compData.JS.clickable?handleClick({{$index}}):clickDisable();$event.stopPropagation();"><imageholder cid="appimage" dynamicproperties="{\'CSS\':{\'background-image\':apps.imageurl}}" param="compData.JS.appbutton.JS.imageconfig"></imageholder><irichtext cid="apptext" param="settextdata(compData.JS.appbutton.JS.textconfig,apps.title)"></irichtext></div></div></div>',
        scope: {
            param: "=param"
        },
        require: "^pid",
        controller: ["$scope", "$element", "$attrs", function(h, g, f) {
            h.cid = f.cid;
            h.index = 0;
            h.maxindex = 0;
            h.eventMap = {};
            h.imageset = {};
            h.compData = {};
            h.handleClick = function(i) {
                i = h.compData.JS.dataset[i].weblink;
                if (null  != i && i.length != 0) {
                    c.commonServiceRef.dynamicService(null , {
                        serviceType: "urlservice",
                        openurl: i
                    })
                }
            }
            ;
            h.clickDisable = function() {}
            ;
            h.settextdata = function(j, i) {
                j.JS.textdata = i;
                return j
            }
            ;
            h.extendComponentData = function(i) {
                h.compData = a.extendDeep(h.compData, i);
                b(function() {
                    h.$apply()
                })
            }
            ;
            h.init = function() {
                c.registerComponentInstance(h.cid, h);
                h.extendComponentData(c.getInitProperties(h.cid));
                h.maxindex = h.compData.JS.maxcount;
                this.setNewsappData(window.newsparam)
            }
            ;
            h.setNewsappData = function(i) {
                if (h.compData.JS.newsappsConfigRespPath) {
                    h.compData.JS.dataset = a.transfer(i, h.compData.JS.newsappsConfigRespPath)
                }
                if (null  != h.compData.JS.dataset && h.compData.JS.dataset.length < h.compData.JS.maxcount) {
                    h.maxindex = h.compData.JS.dataset.length
                }
            }
            ;
            h.eventMap.setNewsappData = h.setNewsappData;
            h.$on(h.cid + "_handleEvent", function(l, j, k, i) {
                h.eventMap[j](k, i)
            })
        }
        ],
        link: function(h, g, f, i) {
            h.pageID = f.ppageid || i.pageID;
            h.componentType = "iappbuttonholder";
            h.init()
        }
    }
}
]);
uiCore.directive('ifit', [
'$window',
'coreService',
function($window) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$window',
        function($scope, $element, $attrs, $window, coreService) {
            var w = angular.element(top.window);
            //mod by s00900236 at 2015-03-20 begin
            //reason:DTS2015031903381 added fontsize watch on width change
            $scope.getDimentions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight),
                    'h': top.window.innerHeight,
                    'w': top.window.innerWidth,
                    'ph': top.window.getComputedStyle($element.parent()[0]).height,
                    'pw': parseFloat(top.window.getComputedStyle($element.parent()[0]).width),
                    'fs': parseFloat(top.window.getComputedStyle($element[0], null )['fontSize'])
                }
            }
            ;
            //mod by s00900236 2015-03-20 end
            $scope.$watch($scope.getDimentions, function(newValue, oldValue) {
                $scope.rresize();
            }, true);
            $scope.rresize = function() {
                var dimention = $scope.getDimentions();
                var minusValue = $element.attr('ifit');
                var isNumber = !isNaN(parseFloat(minusValue)) && isFinite(minusValue);
                var fontSize = dimention.fs;
                var totalWidth = dimention.pw;
                if (!isNumber) {
                    if (totalWidth > 0) {
                        var firstChildWidth = 0;
                        var siblings = $element.parent().children();
                        for (i = 0; i < siblings.length; i++) {
                            var singleElement = siblings[i];
                            if (null  == singleElement.attributes['ifit']) {
                                firstChildWidth += parseFloat(top.window.getComputedStyle(singleElement).width);
                            }
                        }
                        var minusEM = firstChildWidth / fontSize;
                        if (minusValue == "bnBar")
                        {
                            $element.css('width', (((totalWidth / fontSize) - minusEM) - 1) + 'em');
                        } else
                        {
                            $element.css('width', ((totalWidth / fontSize) - minusEM) + 'em');
                        }

                    }
                } else {
                    var winnerWidth = dimention.width;
                    if (minusValue == 0) {
                        $element.css('width', (winnerWidth / fontSize) + 'em');
                    } else if (totalWidth > 0) {
                        $element.css('width', ((totalWidth / fontSize) - minusValue) + 'em');
                    }
                }
            }

            $scope.$watch(function() {
                return $element.attr('ifit');
            }, function(newValue) {
                $scope.rresize();
            });

            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ]
    };
}
]);
uiCore.directive('logodock', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        '$window',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, $timeout, $window, coreService, coreUtils) {
            var _maxTimeMotionless = 300;
            var getBrowserDimensions = function() {
                return {
                    width: (top.window.innerWidth || top.window.document.documentElement.clientWidth || top.window.document.body.clientWidth),
                    height: (top.window.innerHeight || top.window.document.documentElement.clientHeight || top.window.document.body.clientHeight)
                };
            }
            ;
            $scope.moved = false;
            var winnerHeight = getBrowserDimensions().height
              ,
            elementHeight = 0;
            var jqLite = angular.element
              ,
            copy = angular.copy
              ,
            forEach = angular.forEach
              ,
            isString = angular.isString
              ,
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': false
            }
              ,
            moveDragState = function(state, point) {
                state.delta = distanceBetween(point, state.pos);
                state.distance = distanceBetween(point, state.origin);
                state.pos = {
                    x: point.x,
                    y: point.y
                };
                state.updatedAt = Date.now();
            }
              ,
            distanceBetween = function(p2, p1) {
                var dist = {
                    x: p2.x - p1.x,
                    y: p2.y - p1.y
                };
                dist.magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
                return dist;
            }
              ,
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" ||
                raw.tagName === "SELECT" ||
                raw.tagName === "TEXTAREA");
            }
              ,
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },

                    startedAt: Date.now(),
                    updatedAt: Date.now(),

                    stopped: false,
                    active: true
                };
            }
              ,
            dragStart = function(e) {
                winnerHeight = getBrowserDimensions().height;
                elementHeight = parseFloat(top.window.getComputedStyle($element[0]).height);
                e = e.originalEvent || e;

                var target = jqLite(e.target || e.srcElement);

                options.stopPropagation && e.stopPropagation();

                var point = e.touches ? e.touches[0] : e;

                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }
                //console.log('START point.clientY:' + point.clientY);
                self.state = startDragState({
                    x: point.clientX,
                    y: point.clientY
                });
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;

                if (null  != self.state && self.state.active) {
                    $scope.moved = true;
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();

                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.clientX,
                        y: point.clientY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;

                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (self.state.pos.y <= 0) {
                        $element.parent().parent().css({
                            'top': '0px'
                        });
                    } else if (self.state.pos.y <= (winnerHeight - elementHeight)) {
                        $element.parent().parent().css({
                            'top': self.state.pos.y + 'px'
                        });
                    }
                    coreService.commonServiceRef.schedulerService({
                        'on': 'autoclose'
                    }, {
                        "cycle": "1",
                        "interval": "5000",
                        "start": "2"
                    });
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active && null  != self.state.distance && $scope.moved == true) {
                    $scope.moved = false;
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();
                    var dockPosition = top.tlbs.dockPosition || false;
                    if (self.state.pos.y >= (winnerHeight / 2)) {
                        if (dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveBottom', {});
                            top.tlbs.dockPosition = false;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': false
                            });
                        }
                        $element.parent().parent().css({
                            'bottom': '0px',
                            'top': 'initial'
                        });
                    } else {
                        if (!dockPosition) {
                            coreService.fireEvent($element.attr('cid'), 'moveTop', {});
                            top.tlbs.dockPosition = true;
                            var dockUpdateActionChain = {
                                on: 'toolbardockupdate'
                            };
                            coreService.commonServiceRef.remoteService(dockUpdateActionChain, {
                                'dockposition': true
                            });
                        }
                        $element.parent().parent().css({
                            'top': '0px',
                            'bottom': 'initial'
                        });
                    }
                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                }
            }
              ,
            scroll = function() {
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('slider', [
'coreService',
'coreUtils',
'$timeout',
'Const',
'$window',
function(coreService, coreUtils, $timeout, Const, $window) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div  ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" ><div style="position:relative;"><div ng-swipe-right="swiperight();" ng-swipe-left="swipeleft();"  ng-style="compData.CSS" ></div><div ng-show="compData.JS.enabletitle" ng-style="compData.JS.titleconfig.CSS"></div></div> <div ng-show="compData.JS.enablebullets" ng-style="compData.JS.bulletcontainerconfig.CSS"> <div ng-style="compData.JS.bulletconfig.CSS" ng-click="changeStatebyIndex($index);$event.stopPropagation();" ng-repeat="app in compData.JS.dataset | limitTo:compData.JS.maxcount" id="slider_bullet_{{$index}}"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.maxindex = 0;
            $scope.eventMap = {};

            $scope.imageset = {}
            $scope.compData = {};

            $scope.handleClick = function() {
                if ($scope.compData.JS.dataset[$scope.index].weblink && $scope.compData.JS.dataset[$scope.index].weblink.split("http").length > 1) {
                    $window.open($scope.compData.JS.dataset[$scope.index].weblink);

                } else {
                    $window.open("http://" + $scope.compData.JS.dataset[$scope.index].weblink);
                }

            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.swipeleft = function() {
                $scope.index = $scope.index + 1;
                if ($scope.index > parseInt($scope.maxindex - 1)) {
                    $scope.index = parseInt($scope.maxindex - 1);
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.swiperight = function() {
                $scope.index = $scope.index - 1;

                if ($scope.index < 0) {
                    $scope.index = 0;
                }
                $scope.changeState($scope.index);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.maxindex = $scope.compData.JS.maxcount;
            }
            ;

            $scope.setAdvertiseData = function(respData, deferred) {
                $scope.index = 0;
                if (null  != deferred) {
                    deferred.resolve();
                }
                if ($scope.compData.JS.sliderConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.sliderConfigRespPath);
                }
                $timeout(function() {
                    if ($scope.maxindex > 0) {
                        angular.element($element[0].children[0].children[0]).css({
                            'height': $scope.compData.JS.sliderheight
                        });
                        $scope.changeState(0);
                    }
                });

                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length < $scope.compData.JS.maxcount) {
                    $scope.maxindex = $scope.compData.JS.dataset.length;
                }

                if (null  != $scope.compData.JS.dataset && $scope.compData.JS.dataset.length == 0) {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': '0%'
                    });
                } else {
                    angular.element($element[0].children[0].children[0]).css({
                        'height': $scope.compData.JS.sliderheight,
                        'margin': $scope.compData.JS.slidermargin
                    });
                }

            }
            ;

            $scope.changeStatebyIndex = function(indexno) {
                $scope.changeState(indexno);
                $scope.index = indexno;
            }

            $scope.changeState = function(indexno) {

                var bulletIcon = $element[0].querySelector('#slider_bullet_' + indexno);

                if ($scope.compData.JS.dataset) {

                    for (i = 0; i <= $scope.maxindex - 1; i++) {
                        angular.element($element[0].querySelector('#slider_bullet_' + i)).css({
                            'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state0.background_color
                        });
                    }
                }
                angular.element(bulletIcon).css({
                    'background-color': $scope.compData.JS.bulletconfig.JS.stateconfig.state1.background_color
                });


                if ($scope.compData.JS.dataset) {



                    if ($scope.compData.JS.dataset[indexno].imageurl) {
                        angular.element($element[0].children[0].children[0]).css({
                            'background-image': 'url("' + $scope.compData.JS.dataset[indexno].imageurl + '")',
                        });
                    }
                    if ($scope.compData.JS.dataset[indexno].title) {
                        angular.element($element[0].children[0].children[1]).html($scope.compData.JS.dataset[indexno].title);
                    }

                }

            }
            ;

            $scope.eventMap['setAdvertiseData'] = $scope.setAdvertiseData;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });


            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                }
            });


        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = attrs.ppageid || ctrl.pageID;
            scope.componentType = 'slider';
            scope.init();
        }
    };
}
]);
uiCore.directive('pid', function() {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            this.pageID = $attrs['pid'];
        }
        ]
    };
});
uiCore.directive('idropdownlist', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div><horizontal-container param="compData.JS.sgH1" class="idropdownhorizantalline" ><horizontal-container  param="compData.JS.sgH1r1" class="idropdownhorizantalline" ><richtext param="compData.JS.sgpackeffectiveetime" ></richtext></horizontal-container><horizontal-container  param="compData.JS.sgH1r2" ><div class="idropdownlistmain" >' +
        '<select ng-click="handleClick1($event);" ng-change="handleClick();" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue" ng-options="key.name  for key in compData.JS.Dataset" ></select>' +
        '</div></horizontal-container></horizontal-container><horizontal-container param="compData.JS.sgH2" class="idropdownhorizantalline" ng-show="isShowSecondList"><horizontal-container param="compData.JS.sgH2r1" class="idropdownhorizantalline"  ><richtext param="compData.JS.sgpackeffectiveetime1"  ></richtext></horizontal-container><horizontal-container param="compData.JS.sgH2r2"  ><div class="idropdownlistmain" >' +
        '<select ng-click="handleClick2($event);" class="ui_com_second_dropdown"  ng-disabled="disablelist" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue2" ng-options="key as key.name for key in compData.JS.Dataset2" ></select>' +
        '</div></horizontal-container></horizontal-container></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'setflag': '1',
                    'key1': 'time',
                    'key2': 'period',
                    'selectedValue': '',
                    'selectedValue2': '',
                    'opacity': '0.2',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    "sgpackeffectiveetime": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时间:"
                        }
                    },
                    "sgpackeffectiveetime1": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时长:"
                        }
                    },
                    'sgH1': {
                        "CSS": {},
                        "JS": {
                            "sgH1": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH1"
                        }
                    },
                    'sgH1r1': {
                        "CSS": {},
                        "JS": {
                            "sgH1r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH1r1"
                        }
                    },
                    'sgH1r2': {
                        "CSS": {},
                        "JS": {
                            "sgH1r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH1r2"
                        }
                    },
                    'sgH2': {
                        "CSS": {},
                        "JS": {
                            "sgH2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH2"
                        }
                    },
                    'sgH2r1': {
                        "CSS": {},
                        "JS": {
                            "sgH2r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH2r1"
                        }
                    },
                    'sgH2r2': {
                        "CSS": {},
                        "JS": {
                            "sgH2r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH2r2"
                        }
                    },
                },
            };
            $scope.handleClick1 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick2 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick = function() {
                if ($scope.isMonthPack)
                    return;
                if ($scope.compData.JS.selectedValue.value == $scope.compData.JS.setflag) {
                    $scope.disablelist = true;
                    $scope.secondDropdown.css({
                        'opacity': $scope.compData.JS.opacity
                    });
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else {
                    $scope.disablelist = false;
                    //when switch to immediate,default value should be changed,to do this value need configuable.
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                    $scope.secondDropdown.css({
                        'opacity': '1.0'
                    });
                }
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.disablelist = false;
            $scope.isShowSecondList = true;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.getData = function(eventData) {
                $scope.edata = coreUtils.extendDeep({}, eventData);
                if ($scope.edata.isMonthPack) {
                    $scope.isMonthPack = parseInt($scope.edata.isMonthPack);
                }
                if ($scope.isMonthPack) {
                    $scope.isShowSecondList = false;
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else
                    $scope.isShowSecondList = true;
            }
            ;
            $scope.refresh = function(eventData) {
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                $scope.disablelist = false;
                $scope.secondDropdown.css({
                    'opacity': '1.0'
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var DatasetTemp = $scope.compData.JS.Dataset;
                var Dataset2Temp = $scope.compData.JS.Dataset2;

                $scope.compData.JS.Dataset = [];
                $scope.compData.JS.Dataset2 = [];
                for (var i in DatasetTemp) {

                    $scope.compData.JS.Dataset.push(DatasetTemp[i]);
                }
                for (var i in Dataset2Temp) {

                    $scope.compData.JS.Dataset2.push(Dataset2Temp[i]);
                }
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
            }
            ;
            $scope.eventMap['data.update'] = $scope.getData;
            $scope.eventMap['refresh'] = $scope.refresh;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        compile: function(element, attributes) {
            return {
                pre: function($scope, element, attributes, $controller, transcludeFn) {
                    $scope.pageID = $controller.pageID;
                    $scope.componentType = 'idropdownlist';
                    $scope.init();

                },
                post: function($scope, $element, attributes, $controller, transcludeFn) {
                    var dropdown = $element[0].querySelector('.ui_com_second_dropdown');
                    $scope.secondDropdown = angular.element(dropdown);
                }
            }
        },

    };
}
]);
uiCore.directive('tbresize', [
'$window',
'$interval',
function($window, $interval) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            var isPhonePage = function() {
                var viewport = top.document.getElementsByName('viewport');

                if (!viewport || viewport.length == 0) {

                    return false;
                } else {
                    return true;
                }
            }
            ;
            //fullscreenbar cancel resize function
            if (top.barresizetype == '1') {
                var scale = function() {

                    if (/window/ig.test(navigator.userAgent)) {
                        $element.css({
                            'font-size': '16px'
                        });
                    } else {
                        var width = parseInt(top.window.innerWidth);
                        var height = parseInt(top.window.innerHeight);

                        if (width < 319) {
                            $element.css({
                                'font-size': '12px'
                            });
                        } else if (width >= 320 && width < 359) {
                            $element.css({
                                'font-size': '14px'
                            });
                        } else if (width >= 360 && width < 399) {
                            if (height <= 485) {
                                $element.css({
                                    'font-size': '14px'
                                });
                            } else if (height < 530) {
                                $element.css({
                                    'font-size': '15px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '16px'
                                });
                            }

                        } else if (width >= 400 && width < 479) {
                            if (height < 740) {
                                $element.css({
                                    'font-size': '19px'
                                });
                            } else {
                                $element.css({
                                    'font-size': '20px'
                                });
                            }
                        } else if (width >= 480 && width < 539) {
                            $element.css({
                                'font-size': '20px'
                            });
                        } else if (width >= 540 && width < 639) {
                            $element.css({
                                'font-size': '22px'
                            });
                        } else if (width >= 640 && width < 719) {
                            $element.css({
                                'font-size': '28px'
                            });
                        } else if (width >= 720 && width < 879) {
                            $element.css({
                                'font-size': '32px'
                            });
                        } else if (width >= 880 && width < 959) {
                            $element.css({
                                'font-size': '36px'
                            });
                        } else if (width >= 960 && width < 1079) {
                            $element.css({
                                'font-size': '44px'
                            });
                        } else if (width >= 1080 && width < 1280) {
                            $element.css({
                                'font-size': '48px'
                            });
                        } else if (width >= 1280) {
                            $element.css({
                                'font-size': '56px'
                            });
                        }
                    }
                }
                ;

                scale();
                top.window.addEventListener('load', scale);
                $interval(function() {
                    scale();
                }, 3000);
                return;
            }
            $scope.pWidth = 0;
            $scope.pHeight = 0;

            $scope.resize = function() {
                var baseHeight = 360
                  ,
                baseWidth = 320;

                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;
                var cFontSize = 0
                  ,
                newFontSize = 0;
                if ($scope.pWidth == $scope.cWidth) {
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.cHeight != $scope.pHeight && Math.min($scope.pHeight, $scope.cHeight) / Math.max($scope.pHeight, $scope.cHeight) >= 0.8) {
                    $scope.pWidth = $scope.cWidth;
                    $scope.pHeight = $scope.cHeight;
                    return;
                }
                if ($scope.pWidth == $scope.cWidth && $scope.pHeight == $scope.cHeight) {
                    return;
                }
                if ($scope.cWidth <= $scope.cHeight) {
                    cFontSize = $scope.cWidth / baseWidth;
                } else {
                    cFontSize = $scope.cHeight / baseHeight;
                }
                if (baseWidth * cFontSize > $scope.cWidth) {
                    cFontSize = $scope.cWidth / baseWidth;
                }
                var newSize = cFontSize * 18;
                //newSize = newSize < 10 ? 10 : newSize;
                //newSize = newSize > 27 ? 27 : newSize;
                $element.css('font-size', newSize + 'px');
                $scope.pWidth = $scope.cWidth;
                $scope.pHeight = $scope.cHeight;
            }
            ;
            $scope.resizeForPreview = function(w, h) {
                var baseheight = 360
                  ,
                baseWidth = 320;

                if (w <= h) {
                    cFontSize = w / baseWidth;
                } else {
                    cFontSize = h / baseHeight;
                }
                var newSize = cFontSize * 18;
                $element.css('font-size', newSize + 'px');
            }
            ;
            //tlbm preview no need set resize interval
            if (top.tlbs.w && top.tlbs.h) {
                $scope.resizeForPreview(parseInt(top.tlbs.w), parseInt(top.tlbs.h));
            } else {
                $scope.cWidth = top.window.innerWidth;
                $scope.cHeight = top.window.innerHeight;

                var w = angular.element(top.window);
                w.bind('resize', function() {
                    $scope.resize();
                });
                $scope.resize();
                $scope.intervalObject = $interval(function() {
                    $scope.resize();
                }, 10);
            }
        }
        ]
    };
}
]);
/*
iradioselectiondiv: component for customized radio selection Box.
setSelectionValue(): method used to get the data from serivce. need to fire once data got received though event chain.
 $scope.compData.JS.selectedValue : gives selected value.
*/
uiCore.directive('iradioselectiondiv', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: false,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-style="compData.CSS"><div ng-click="handleClick({{$index}});$event.stopPropagation();"  ng-style="compData.JS.radiobutton.CSS"  ng-repeat="key in compData.JS.dataset" id="radio_options_{{$index}}" >{{key.name}}</div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.index = 0;
            $scope.eventMap = {};
            $scope.compData = {

            };
            $scope.handleClick = function(indexno) {
                $scope.changeState(indexno);
            }
            ;
            $scope.changeState = function(indexno) {
                $scope.index = indexno;
                var bulletIcon = $element[0].querySelector('#radio_options_' + indexno);

                for (i = 0; i <= $element.children().children().length - 1; i++) {
                    angular.element($element[0].querySelector('#radio_options_' + i))
                    .css($scope.compData.JS.radiobutton.JS.inactiveCSS);
                }
                angular.element(bulletIcon).css($scope.compData.JS.radiobutton.JS.activeCSS);

                //for getting the selected value
                $scope.compData.JS.selectedValue = $scope.compData.JS.dataset[$scope.index];
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                //$scope.setSelectionValue(window.responseparam);
            }
            ;
            /*
                                   $scope.getSelectedValue = function() {

                                       return $scope.compData.JS.dataset[$scope.index];

                                   };*/

            $scope.setSelectionValue = function(respData) {
                if ($scope.compData.JS.selectionConfigRespPath) {
                    $scope.compData.JS.dataset = coreUtils.transfer(respData, $scope.compData.JS.selectionConfigRespPath);
                }
                $timeout(function() {
                    $scope.$apply();
                    $scope.changeState(0);
                });
            }
            ;
            //$scope.eventMap['getSelectedValue'] = $scope.getSelectedValue;
            $scope.eventMap['setSelectionValue'] = $scope.setSelectionValue;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'iradioselectiondiv';
            $scope.init();
        }
    };
}
]);
uiCore.directive('vscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'Const',
        function($scope, $element, $attrs, $timeout, Const) {
            var children,
            wrapperDiv,
            minHeight = 0,
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div class="ui-com-vscroll-wrapper"></div>');
                //setHeight();
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
            }
              ,
            setHeight = function() {
                minHeight = parseInt(top.window.getComputedStyle($element[0], null )['height']);
                totalHeight = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalHeight += children[i].offsetHeight + parseInt(style['marginTop']) + parseInt(style['marginBottom']);
                }
                //in ios6 in some page,when scroll,last record can't show completely,so here add 12 to avoid,to do:analyze why
                totalHeight = totalHeight + 12;
                if (totalHeight < minHeight) {
                    totalHeight = minHeight;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);
                wrapperDiv.css('height', totalHeight / fontSize + 'em');
            }
              ,
            bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;

                var flag = false;
                $element.bind(_touchstart, function(e) {
                    setHeight();
                    var transform = wrapperDiv[0].style['webkitTransform'] || wrapperDiv[0].style['mozTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['msTransform'] || wrapperDiv[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    var _lastYPos = e.touches ? e.touches[0].pageY : e.pageY
                      ,
                    target = e.target
                      ,
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        var ydistance = _currentYPos - _lastYPos;
                        if (Math.abs(ydistance) > 3) {
                            if (!flag) {
                                flag = true;
                            }
                            e.stopPropagation();
                            e.preventDefault();
                        }
                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;
                        //for scroll performance,user transform:
                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalHeight + totalDistance < minHeight) {
                            totalDistance = minHeight - totalHeight;
                        }
                        if (isOpera) {
                            wrapperDiv.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            wrapperDiv.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            wrapperDiv.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            wrapperDiv.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }

                        //$element[0].scrollTop -= ydistance;
                    }
                      ,
                    endTouch = function(e) {
                        if (flag) {
                            e.stopPropagation();
                            e.preventDefault();
                            flag = false;
                        }
                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
              ,
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            /*
				$scope.eventMap = $scope.eventMap||{};
				$scope.eventMap['recoverposition'] = function(){
				wrapperDiv.css('-webkit-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-moz-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-o-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('-ms-transform', 'translate3d(0,0,0)');
				wrapperDiv.css('transform', 'translate3d(0,0,0)');

				};*/
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
//usage:<hpanel hcroll>
// this directive can be use to scroll left or rihgt
//element which use this directive need define width
uiCore.directive('hscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'Const',
        function($scope, $element, $attrs, $timeout, Const) {
            var children, wrapperDiv, minHeight = 0, scrollDiv = angular.element('<div style="height:100%;overflow:hidden;"></div>'),
            wrapper = function() {
                children = $element.children();
                minWidth = parseInt(top.window.getComputedStyle($element[0], null )['width']);
                wrapperDiv = angular.element('<div class="ui-com-hscroll-wrapper" style="height:100%;"></div>');
                setWidth();
                wrapperDiv.append(children);
                scrollDiv.append(wrapperDiv);
                $element.append(scrollDiv);
                if ($scope.hscrollType == "1")
                {
                    $element.append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }

            }
            ,
            setWidth = function() {
                var totalWidth = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);

                }
                if (totalWidth < minWidth) {
                    totalWidth = minWidth;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);

                //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
                //console.log("minWidth:"+widdd);
                //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);


                //wrapperDiv.css('width', (totalWidth-10 / fontSize)+ 'em');
                wrapperDiv.css('width', (totalWidth / fontSize) + 'em');

            }
            ,
            getWidth = function() {

            /*
                    	var totalWidth = 0;
                             style = null;
                         for (var i = 0; i < scrollDiv[0].children.length; i++) {
                             style = top.window.getComputedStyle(children[i], null);
                             totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);

                         }
                         if (totalWidth < minWidth) {
                             totalWidth = minWidth;
                         }
                      */

            //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
            //console.log("minWidth:"+widdd);
            //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);
            //console.log(" Width1:",totalWidth);
            // wrapperDiv.css('width', (totalWidth / fontSize)-10+ 'em');
            // return totalWidth;
            }
            ,
            bind = function() {
                var _touchstart = Const.touchEvent.start
                  ,
                _touchmove = Const.touchEvent.move
                  ,
                _touchend = Const.touchEvent.end;
                scrollDiv.bind(_touchstart, function(e) {
                    //e.stopPropagation();
                    //e.preventDefault();
                    setWidth();


                    var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);

                    var _lastXPos = e.touches ? e.touches[0].pageX : e.pageX
                      ,
                    target = e.target
                      ,
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                        var xdistance = _currentXPos - _lastXPos;
                        // console.log("current postion:"+_currentXPos);
                        // console.log("last postion:"+_lastXPos);
                        _lastXPos = _currentXPos;
                        scrollDiv[0].scrollLeft -= xdistance;

                        //console.log(" Width2:",parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft),"width2:",wrapperDiv[0].offsetWidth);

                        if ($scope.hscrollType == "1")
                        {
                            if (parseInt(scrollDiv[0].scrollLeft) <= 0)
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');
                            }
                            else if (parseInt(scrollDiv[0].offsetWidth + scrollDiv[0].scrollLeft) + 2 >= wrapperDiv[0].offsetWidth)
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                            }
                            else
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');

                            }
                        }

                    }
                      ,
                    touchstart = function(e)
                    {

                    //console.log("display DIV width:"+scrollDiv[0].offsetWidth);
                    //console.log("max container width:"+wrapperDiv[0].offsetWidth);
                    //console.log("moved left position:"+scrollDiv[0].scrollLeft);

                    /*
								 * if($scope.hscrollType=="1")
	                             {
									if(parseInt(scrollDiv[0].scrollLeft)<=0)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');
									}
									else if(parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft)>=wrapperDiv[0].offsetWidth)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									}
									else
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');

									}
								}
								 */



                    }
                      ,
                    endTouch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '0');
                        angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '0');

                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    //top.document.addEventListener(_touchstart, touchstart, false);
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
            ,
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, element, $attrs) {
            //        	console.log("hscrolltype1",$attrs['hscrolltype']);

            $scope.hscrollType = $attrs['hscrolltype'];
            var eleft = element[0].offsetLeft;
            var etop = element[0].offsetTop;
            var eWidth = element[0].offsetWidth;
            var eHeight = element[0].offsetHeight;
            //             console.log(element[0].offset);
        }
    };
});
uiCore.directive('sscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        '$window',
        'coreService',
        function($scope, $element, $attrs, $timeout, $window, coreService) {
            var w = angular.element(top.window);
            var direction = $attrs['sscroll'];
            var isHorizontal = ('h' == direction);
            var isVerticle = ('v' == direction);
            var isHorizontalWithImage = ('hi' == direction);
            var _maxTimeMotionless = 300;
            var jqLite = angular.element
              ,
            copy = angular.copy
              ,
            forEach = angular.forEach
              ,
            isString = angular.isString
              ,
            extend = angular.extend;
            var children, wrapperDiv, minHeight = 0;
            var options = {
                'stopPropagation': false,
                'shouldBlurOnDrag': true
            }
              ,
            wrapper = function() {
                children = $element.children();
                wrapperDiv = angular.element('<div style="height:100%;width:100%;overflow:hidden;"></div>');
                wrapperDiv.append(children);
                $element.append(wrapperDiv);
                if (isHorizontalWithImage) {
                    angular.element($element.parent()[0]).append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }
            }
              ,
            getContentRect = function(raw) {
                var style = top.window.getComputedStyle(raw);
                var offTop = parseInt(style.getPropertyValue('margin-top'), 10) +
                parseInt(style.getPropertyValue('padding-top'), 10);
                var offLeft = parseInt(style.getPropertyValue('margin-left'), 10) +
                parseInt(style.getPropertyValue('padding-left'), 10);
                var offRight = parseInt(style.getPropertyValue('margin-right'), 10) +
                parseInt(style.getPropertyValue('padding-right'), 10);
                var offBottom = parseInt(style.getPropertyValue('margin-bottom'), 10) +
                parseInt(style.getPropertyValue('padding-bottom'), 10);

                var ttop = parseInt(style.getPropertyValue('top'), 10);
                var bottom = parseInt(style.getPropertyValue('bottom'), 10);
                var left = parseInt(style.getPropertyValue('left'), 10);
                var right = parseInt(style.getPropertyValue('right'), 10);

                var height = parseFloat(style.getPropertyValue('height'), 10);
                var width = parseFloat(style.getPropertyValue('width'), 10);
                return {
                    top: offTop + (isNaN(ttop) ? 0 : ttop),
                    bottom: offBottom + (isNaN(bottom) ? 0 : bottom),
                    height: height,
                    width: width,
                    left: offLeft + (isNaN(left) ? 0 : left),
                    right: offRight + (isNaN(right) ? 0 : right)
                };
            }
              ,
            setHeight = function() {
                if (null  != children) {
                    var totalHeight = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalHeight += (contentRect.height + contentRect.top + contentRect.bottom);
                    }
                    wrapperDiv.css('height', totalHeight / fontSize + 'em');
                }
            }
              ,
            setWidth = function() {
                if (null  != children) {
                    var totalWidth = 0;
                    var fontSize = parseFloat(top.window.getComputedStyle($element[0], null )['fontSize']);
                    for (var i = 0; i < children.length; i++) {
                        var contentRect = getContentRect(children[i]);
                        totalWidth += (contentRect.width + contentRect.left + contentRect.right);
                    }
                    if ($attrs['cid'] == 'iholder21') {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 0.3 + 'em');
                    } else {
                        wrapperDiv.css('width', (totalWidth / fontSize) + 'em');
                    }
                }
            }
              ,
            moveDragState = function(state, point) {
                state.delta = distanceBetween(point, state.pos);
                state.distance = distanceBetween(point, state.origin);
                state.pos = {
                    x: point.x,
                    y: point.y
                };
                state.updatedAt = Date.now();
            }
              ,
            distanceBetween = function(p2, p1) {
                var dist = {
                    x: p2.x - p1.x,
                    y: p2.y - p1.y
                };
                dist.magnitude = Math.sqrt(dist.x * dist.x + dist.y * dist.y);
                return dist;
            }
              ,
            isInput = function(raw) {
                return raw && (raw.tagName === "INPUT" ||
                raw.tagName === "SELECT" ||
                raw.tagName === "TEXTAREA");
            }
              ,
            startDragState = function(point) {
                return {
                    origin: {
                        x: point.x,
                        y: point.y
                    },
                    pos: {
                        x: point.x,
                        y: point.y
                    },
                    distance: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },
                    delta: {
                        x: 0,
                        y: 0,
                        magnitude: 0
                    },

                    startedAt: Date.now(),
                    updatedAt: Date.now(),

                    stopped: false,
                    active: true
                };
            }
              ,
            dragStart = function(e) {
                e = e.originalEvent || e;

                var target = jqLite(e.target || e.srcElement);

                options.stopPropagation && e.stopPropagation();

                var point = e.touches ? e.touches[0] : e;

                if (options.shouldBlurOnDrag && isInput(target)) {
                    document.activeElement && document.activeElement.blur();
                }

                self.state = startDragState({
                    x: point.pageX,
                    y: point.pageY
                });
                if (isHorizontalWithImage) {
                    showScrollImage();
                }
            }
              ,
            dragMove = function(e) {
                e = e.originalEvent || e;

                if (null  != self.state && self.state.active) {
                    e.preventDefault();
                    options.stopPropagation && e.stopPropagation();

                    var point = e.touches ? e.touches[0] : e;
                    point = {
                        x: point.pageX,
                        y: point.pageY
                    };
                    var timeSinceLastMove = Date.now() - self.state.updatedAt;

                    if (timeSinceLastMove > _maxTimeMotionless) {
                        self.state = startDragState(point);
                    }
                    moveDragState(self.state, point);
                    if (isHorizontal || isHorizontalWithImage) {
                        $element[0].scrollLeft -= self.state.delta.x;
                    }
                    if (isVerticle) {
                        $element[0].scrollTop -= self.state.delta.y;
                    }

                    if (isHorizontalWithImage) {
                        showScrollImage();
                        coreService.commonServiceRef.schedulerService({
                            'on': 'autoclose'
                        }, {
                            "cycle": "1",
                            "interval": "5000",
                            "start": "2"
                        });
                    }
                }
            }
              ,
            dragEnd = function(e) {
                if (null  != self.state && self.state.active) {
                    e = e.originalEvent || e;
                    options.stopPropagation && e.stopPropagation();

                    self.state.updatedAt = Date.now();
                    self.state.stopped = (self.state.updatedAt - self.state.startedAt) > _maxTimeMotionless;
                    self.state = {};
                    if (isHorizontalWithImage) {
                        hideScrollImage();
                    }
                }
            }
              ,
            scroll = function() {
                wrapper();
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
                $element.bind('touchstart', dragStart);
                $element.bind('touchmove', dragMove);
                $element.bind('touchend touchcancel', dragEnd);
                $element.bind('mousedown', dragStart);
                $element.bind('mousemove', dragMove);
                $element.bind('mouseup mouseout', dragEnd);
            }
              ,
            showScrollImage = function() {
                if ($element[0].offsetWidth < wrapperDiv[0].offsetWidth) {
                    var elementDiementions = getContentRect($element[0]);
                    if (parseFloat($element[0].scrollLeft) <= 0) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else if (parseFloat(elementDiementions.width + elementDiementions.left + elementDiementions.right + $element[0].scrollLeft + 2) >= wrapperDiv[0].offsetWidth) {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '0',
                            'display': 'none'
                        });
                    } else {
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });
                        angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                            'opacity': '1.15',
                            'display': 'block'
                        });

                    }
                }
            }
              ,
            hideScrollImage = function() {
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-left-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
                angular.element($element.parent()[0].querySelector('.ui-com-hscroll-right-arrow')).css({
                    'opacity': '0',
                    'display': 'none'
                });
            }
            ;

            $scope.getParentDimentions = function() {
                if (null  != children) {
                    return {
                        'h': top.window.getComputedStyle(children[0]).height,
                        'w': top.window.getComputedStyle(children[0]).width
                    }
                }
                return {};
            }
            ;
            $scope.$watch($scope.getParentDimentions, function(newValue, oldValue) {
                if (isHorizontal || isHorizontalWithImage) {
                    setWidth();
                }
                if (isVerticle) {
                    setHeight();
                }
            }, true);
            $timeout(scroll, 0);

            w.bind('resize', function() {
                $scope.$apply();
            });
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('ibutton', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div ng-click="compData.JS.clickable?handleClick():clickDisable();$event.stopPropagation();" {{param}}><div id="buttontextdiv">{{compData.JS.buttontext}}<div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'buttontext': '',
                    'clickable': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'buttontextstyle': {
                        'CSS': {
                            'font-size': '0.8em'
                        },
                        'JS': {

                        }
                    }
                }
            };
            $scope.handleClick = function() {
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.clickDisable = function() {}
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.init = function() {
                $scope.compData = $scope.param;
                $scope.applyStyle();
            }
            ;
            /*$scope.getButtonStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                angular.element($element[0].querySelector('[id="buttontextdiv"]')).css($scope.compData.JS.buttontextstyle.CSS);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'ibutton';
            $scope.init();
        }
    };
}
]);
uiCore.directive('percentage', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            percent: '=',
        },
        require: '^pid',
        template: '<div class=\'ui-com-percentage\'><div class=\'ui-com-percentage-value\'></div><div class=\'ui-com-percentage-image\'></div></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        '$timeout',
        'coreUtils',
        function($scope, $element, $attrs, coreService, $timeout, coreUtils) {
            $scope.setPercent = function(percent) {
                $scope.percent = percent;
            }
            ;
            $scope.showPercentage = function() {
                $scope.jsProp.styleSet = coreUtils.String2JSON($attrs['styleset']);
                angular.element($element[0].querySelector('.ui-com-percentage-value')).css({
                    'background-color': $scope.getPercentageColor().activecolor,
                    'width': $scope.percent + '%'
                });
                if (($attrs['showpercentageimage'] == "true") && ($scope.getPercentageColor().activeimage)) {
                    angular.element($element[0].querySelector('.ui-com-percentage-image')).css({
                        'background-image': $scope.getPercentageColor().activeimage,
                        'left': ($scope.percent - 1) + '%'
                    });
                }
            }
            ;
            $scope.getPercentageColor = function() {
                var valueSet = undefined;
                for (p in $scope.jsProp.styleSet) {
                    var dataSet = p.split("_");
                    if (dataSet.length > 0) {
                        if (parseInt(dataSet[0]) <= $scope.percent && $scope.percent <= parseInt(dataSet[1])) {
                            return $scope.jsProp.styleSet[p];
                        }
                    }
                }
                return $scope.jsProp.styleSet.defaultset.activecolor;
            }
            ;
            $scope.init = function() {
                var defaultJsProp = {}
                  ,
                properties = coreService.getInitProperties($attrs['cid']) || {}
                  ,
                jsProp = properties.JS || {}
                  ,
                cssProp = properties.CSS || {}
                  ,
                jsData = coreUtils.String2JSON($attrs['jsdata'])
                  ,
                cssData = coreUtils.String2JSON($attrs['cssdata']);
                $scope.jsProp = coreUtils.extendDeep(defaultJsProp, jsProp, jsData);
                $scope.cssProp = coreUtils.extendDeep(cssProp, cssData);
                $element.css($scope.cssProp);
                $timeout($scope.showPercentage, 0);
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'percentage';
            $scope.init();
        }
    };
});
uiCore.directive('simplescroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'Const',
        function($scope, $element, $attrs, $timeout, Const) {
            var children,
            wrapperDiv,
            minHeight = 0,
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var bind = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var totalDistance = 0;
                var _lastYPos = 0;
                var _currentYPos = 0;
                var ydistance = 0;
                var flag = false;
                var elHeight = 0;
                var parentHeight = 0;
                var touchstartflag = false;
                var touchstart = function(e) {
                    top.tlbs.popupTxtMove = false;
                    var transform = $element[0].style['webkitTransform'] || $element[0].style['mozTransform'] || $element[0].style['msTransform'] || $element[0].style['msTransform'] || $element[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    touchstartflag = true;
                    elHeight = parseInt($attrs['totalheight'] || top.window.getComputedStyle($element[0], null )['height']) + 20;
                    parentHeight = parseInt($attrs['parentheight'] || top.window.getComputedStyle($element[0].parentNode, null )['height']);
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (elHeight > parentHeight) {
                        top.document.addEventListener(_touchmove, touch, false);

                        top.document.addEventListener(_touchend, endTouch, false);
                    }

                }

                var touch = function(e) {
                    if (touchstartflag) {
                        _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;

                        ydistance = _currentYPos - _lastYPos;

                        if (Math.abs(ydistance) > 3 || flag) {
                            top.tlbs.popupTxtMove = true;
                            flag = true;
                            e.stopPropagation();
                            e.preventDefault();
                        }

                        _lastYPos = _currentYPos;
                        totalDistance += ydistance;

                        if (totalDistance > 0) {
                            totalDistance = 0;
                        } else if (totalDistance + elHeight <= parentHeight) {

                            totalDistance = parentHeight - elHeight;
                        }
                        if (isOpera) {
                            $element.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            $element.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            $element.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            $element.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
                        }
                    }
                }
                ;
                var endTouch = function(e) {
                    if (flag) {
                        e.stopPropagation();
                        e.preventDefault();
                        flag = false;
                    }
                    touchstartflag = false;
                    top.document.removeEventListener(_touchmove, touch, false);
                    top.document.removeEventListener(_touchend, endTouch, false);
                }
                ;
                $element.bind(_touchstart, touchstart);
            }
            ;

            $timeout(bind, 0);
        }
        ],
        link: function($scope, $element, $attrs) {}
    };
});
uiCore.directive('imageholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div ng-click="compData.JS.clickable && handleClick();$event.preventDefault();compData.JS.stopp && $event.stopPropagation()" {{param}}></div>',
        scope: {
            param: '=param',
            dynamicproperties: '=dynamicproperties'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'clickable': false,
                    'stopp': false,
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'cdrConfig': {

                    }
                }
            };
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    }
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.handleClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                    var pageID = top.tlbs.currentpageid || $scope.pageID;
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': pageID,
                        'componentId': $scope.cid
                    };
                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));

                $scope.$watch($scope.dynamicproperties, function(newValue) {
                    if ($scope.dynamicproperties) {
                        $scope.update();
                    }
                });
                $scope.applyStyle();
            }
            ;

            $scope.update = function() {
                if (typeof $scope.dynamicproperties == 'string') {
                    $scope.dynamicproperties = coreUtils.String2JSON($scope.dynamicproperties);
                }
                if ($scope.dynamicproperties.CSS['background-image'] != "") {
                    $element.css({
                        "background-image": 'url("' + $scope.dynamicproperties.CSS['background-image'] + '")'
                    });
                }
            }
            ;

            /*$scope.getImageStyle = function() {
                        if (0 == $scope.compData.JS.stateconfig.state) {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state0);
                        } else {
                            return coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig.state1);
                        }
                    };*/
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.$on('stateChange', function(eventObj) {
                $scope.applyStyle();
            });
            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'imageholder';
            scope.init();
        }
    };
}
]);
