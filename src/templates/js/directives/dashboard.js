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
