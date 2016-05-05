uiCore.directive('buoy', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_buoy" ccid="c60_fbar_buoy"><div class="c60_fbar_buoy_img">&nbsp;</div><div class="c60_fbar_buoy_value"><span class="c60_fbar_buoy_value_percent" ng-bind="compData.JS.value"></span></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', '$timeout', '$interval', function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout, $interval) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                js: {},
                css: {}
            };
            var keyframeindex = 0;
            $scope.eventMap = {};
            $scope.doclick = function() {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click');
            }
            ;
            var $imageElement = angular.element($element[0].querySelector('.c60_fbar_buoy_img'));
            var $valueElement = angular.element($element[0].querySelector('.c60_fbar_buoy_value'));
            var $valuespan = angular.element($element[0].querySelector('.c60_fbar_buoy_value_percent'));
            var posx = 0;
            var posy = 0;
            var setPostion = function(posx, posy) {
                $element.css('-webkit-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-moz-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-ms-transform', 'translate(' + posx + 'px,' + posy + 'px)');
                $element.css('-o-transform', 'translate(' + posx + 'px,' + posy + 'px)');
            }
            ;
            $scope.getStates = function(value) {
                for (var i = 0; i < 10; i++) {
                    var state = $scope.compData.JS['state' + i];
                    if (state) {
                        if (value <= Number(state.maxvalue) && value > Number(state.minvalue)) {
                            return {
                                valueStyle: state.valueStyle,
                                imageStyle: state.imageStyle
                            };
                        }
                    }
                }
                return {
                    valueStyle: {},
                    imageStyle: {}
                };
            }
            ;
            $scope.createAnmiateFrame = function(percent) {
                var ypos = (1 - percent) * ($scope.compData.JS.height || 2.8);
                try {
                    keyframeindex++;
                    var csstext = "c60_fbar_buoy_wave_animation" + "_" + (keyframeindex) + "{0% {background-position: 0 " + ypos + "em;} 100% {background-position: 2.84em " + ypos + "em;}}";
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    var length = sheets.length;
                    for (var i in sheets) {
                        //firefox 非同源css操作会报insecure错误，所以此处需要捕获异常
                        try {
                            if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                                lastSheet = sheets[i];
                                len = sheets[i].cssRules.length;
                                break;
                            }
                        }
                        catch (e) {}
                    }
                    try {
                        lastSheet.insertRule("@-webkit-keyframes " + csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule("@keyframes  " + csstext, len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule("@-moz-keyframes  " + csstext, len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule("@-o-keyframes  " + csstext, len);
                                } catch (e) {
                                    throw e;
                                }
                            }
                        }
                    }

                    var tempvalue = [];
                    tempvalue.push("c60_fbar_buoy_wave_animation_" + keyframeindex);
                    tempvalue.push($scope.compData.JS.animation.duration || '1s');
                    tempvalue.push($scope.compData.JS.animation.times || 'infinite');
                    tempvalue.push($scope.compData.JS.animation.func || 'linear');
                    var cssvalue = tempvalue.join(" ");
                    var csstxt = {
                        "-moz-animation": cssvalue,
                        "-o-animation": cssvalue,
                        "-webkit-animation": cssvalue,
                        "animation": cssvalue
                    };
                    $imageElement.css(csstxt);
                } catch (e) {
                    console.log(e);
                    $imageElement.css({
                        'background-position': '0 ' + ypos + 'em',
                    });
                }
            }
            ;
            $scope.createJumpAnmiateFrame = function() {
                var position = (parseInt(top.window.getComputedStyle($element[0], null )['width']) - top.window.innerWidth) / 2;
                try {
                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i = sheets.length - 1; i >= 0; i--) {
                        if (sheets[i].cssRules && sheets[i].href) {
                            lastSheet = sheets[i];
                            len = sheets[i].cssRules.length;
                            break;
                        }
                    }
                    try {
                        var csstext = "@-webkit-keyframes c60_fbar_buoy_jump_animation {0% {-webkit-transform: translate(" + position + "px, -300px);} 40% { -webkit-transform: translate(" + position + "px, -0px);} 60% {-webkit-transform: translate(" + position + "px, -80px);} 70% {-webkit-transform: translate(" + position + "px, -0px);} 80% {-webkit-transform: translate(" + position + "px, -30px);} 90% {-webkit-transform: translate(" + position + "px, 0px);} 100% {-webkit-transform: translate(" + position + "px, 0px);}}";
                        lastSheet.insertRule(csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule("@keyframes c60_fbar_buoy_jump_animation {0% {transform: translate(-500px, -300px);} 40% { transform: translate(-500px, -0px);} 60% {transform: translate(-500px, -80px);} 70% {transform: translate(-500px, -0px);} 80% {transform: translate(-500px, -30px);} 90% {transform: translate(-500px, 0px);} 100% {transform: translate(-500px, 0px);}}", len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule("@-moz-keyframes c60_fbar_buoy_jump_animation {0% {-moz-transform: translate(-500px, -300px);} 40% { -moz-transform: translate(-500px, -0px);} 60% {-moz-transform: translate(-500px, -80px);} 70% {-moz-transform: translate(-500px, -0px);} 80% {-moz-transform: translate(-500px, -30px);} 90% {-moz-transform: translate(-500px, 0px);} 100% {-moz-transform: translate(-500px, 0px);}}", len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule("@-o-keyframes c60_fbar_buoy_jump_animation {0% {-o-transform: translate(-500px, -300px);} 40% { -o-transform: translate(-500px, -0px);} 60% {-o-transform: translate(-500px, -80px);} 70% {-o-transform: translate(-500px, -0px);} 80% {-o-transform: translate(-500px, -30px);} 90% {-o-transform: translate(-500px, 0px);} 100% {-o-transform: translate(-500px, 0px);}}", len);
                                } catch (e) {
                                    throw e
                                }
                            }
                        }
                    }
                    $element.css($scope.compData.JS.jumpanimation);
                } catch (e) {
                    $element.css({
                        'display': 'block'
                    });
                }
            }

            $scope.showerror = function() {
                $imageElement.css($scope.compData.JS.defaultImageStyle || {});
            }
            ;

            $scope.show = function(data) {
                var respparam = data.respparam;
                if (respparam && respparam.trafficusage) {
                    var param = respparam.trafficusage;

                    var total = param.total;
                    var used = param.used;
                    if ($scope.total == total && $scope.used == used) {
                        return;
                    } else {
                        $scope.total = total;
                        $scope.used = used;
                    }

                    var remain = total - used;
                    remain = remain < 0 ? 0 : remain;
                    var floatcount = $scope.compData.JS.floatcount || 2;
                    var remainPercentage = "0";
                    if (total != 0) {
                        remainPercentage = Number(remain / total * 100).toFixed(floatcount);
                    } else {
                        $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                        $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                        return true;
                    }
                    if ($scope.compData.JS.threshold && Number(remainPercentage) > Number($scope.compData.JS.threshold)) {
                        $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                        $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                        return true;
                    }
                    $scope.createAnmiateFrame(remainPercentage / 100);
                    var config = null ;
                    if (remainPercentage == 0.00) {
                        config = $scope.getStates(Number(remainPercentage) + 0.001);
                    } else {
                        config = $scope.getStates(Number(remainPercentage))
                    }
                    if (config) {
                        $imageElement.css(config.imageStyle);
                        $valueElement.css(config.valueStyle);
                        if (config.valueStyle.color) {
                            $valuespan.css({
                                'color': config.valueStyle.color
                            });
                        }
                    }
                    var valueArray = remainPercentage.split(".");
                    if (valueArray.length == 2 && Number(valueArray[1]) == 0) {
                        remainPercentage = valueArray[0];
                    }
                    $scope.compData.JS.value = remainPercentage + '%';
                }

            }
            ;
            $scope.setInitPosition = function() {
                var pos = top.tlbs.ballpos;
                if (pos) {
                    if (Number(pos.x || '0') !== 0) {
                        posx = parseInt(top.window.getComputedStyle($element[0], null )['width']) - top.window.innerWidth;
                        posy = Number(pos.y || '0') * top.window.innerHeight;
                    } else {
                        posx = 0;
                        posy = Number(pos.y || '0') * top.window.innerHeight;
                    }
                }
                setPostion(posx, posy);

            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css($scope.compData.css);
                $imageElement.css($scope.compData.JS.defaultImageStyle || {});
                $valueElement.css($scope.compData.JS.defaultValueStyle || {});
                $scope.setInitPosition();
                if (top.tlbs.dayfirstflag == '1') {
                    $scope.createJumpAnmiateFrame();
                }
                if ($scope.compData.JS.timerstate) {
                    $scope.compData.JS.timerstate = false;
                    $scope.startAutoStateChangeTimer(null , null );
                }
                coreService.fireEvent($element.attr('cid'), 'init');

                //add by h00278783 09-06  DTS2015082904394 展示用户数统计不准 start
                var cdrConfig = {
                    'cdrType': 'uidisplaycdr',
                    'enable': true,
                    'storeData': false
                };
                var cdrDataOpen = {
                    'pageId': 'ibuoy',
                    'displayType': 1,
                    'displayResult': 0
                };
                coreUtils.cdrService(cdrConfig, cdrDataOpen);
                //add by h00278783 09-06  DTS2015082904394 展示用户数统计不准 end
            }
            ;
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var windowWidth = 0;
                var windowHeight = 0;
                var width = 0;
                var height = 0;
                var moveflag = false;
                $element.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    windowWidth = top.window.innerWidth;
                    windowHeight = top.window.innerHeight;
                    var _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    var _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    var touch = function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        $scope.stopAutoStateChangeTimer();
                        var _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                        var _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                        var ydistance = _currentYPos - _lastYPos;
                        var xdistance = _currentXPos - _lastXPos;
                        _lastYPos = _currentYPos;
                        _lastXPos = _currentXPos;
                        if (Math.abs(ydistance) > 3 || Math.abs(xdistance) > 3 || moveflag) {
                            moveflag = true;
                            posx = posx + xdistance;
                            posy = posy + ydistance;
                            setPostion(posx, posy);
                        }
                    }
                    ;
                    var endTouch = function(e) {
                        try {
                            e.stopPropagation();
                            e.preventDefault();
                            $scope.startAutoStateChangeTimer();
                            if (!moveflag) {
                                var param = {
                                    "pageId": "ibuoy",
                                    "pageid": "summarypage"
                                };
                                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                                    $scope.compData.JS['cdrData'] = {};
                                    $scope.compData.JS.cdrData = {
                                        'pageId': $scope.pageID,
                                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                                        'iseComp': '1'
                                    };

                                    coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);

                                }
                                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'click');
                            } else {
                                width = parseInt(top.window.getComputedStyle($element[0], null )['width']);
                                height = parseInt(top.window.getComputedStyle($element[0], null )['height']);
                                if (posx > 0) {
                                    posx = 0
                                } else if (Math.abs(posx) * 2 > windowWidth) {
                                    posx = 0 - windowWidth + width;
                                } else
                                    (posx = 0);
                                if (posy > 0) {
                                    posy = 0
                                } else if (Math.abs(posy) > windowHeight - height) {
                                    posy = 0 - windowHeight + height;
                                }
                                setPostion(posx, posy);
                                coreService.fireEvent($element.attr('cid'), 'positionchange', {
                                    x: Number(posx / windowWidth).toFixed(3),
                                    y: Number(posy / windowHeight).toFixed(3)
                                });
                            }
                        }
                        finally {
                            moveflag = false;
                            top.document.removeEventListener(_touchmove, touch, false);
                            top.document.removeEventListener(_touchend, endTouch, false);
                        }
                    }
                    ;
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
            ;
            $scope.startAutoStateChangeTimer = function(stateObject, deferred) {
                if (!$scope.compData.JS.timerstate) {
                    $scope.compData.JS.timerstate = true;
                    $scope.timerInterval = $interval(function() {
                        $scope.compData.JS.stateconfig.state = 0;
                        var state = $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state];
                        $element.css(state);
                        $interval.cancel($scope.timerInterval);
                        $scope.compData.JS.timerstate = false;
                    }, $scope.compData.JS.autostatechangetimeout)
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.stopAutoStateChangeTimer = function(stateObject, deferred) {
                $interval.cancel($scope.timerInterval);
                $scope.compData.JS.stateconfig.state = 1;
                $scope.compData.JS.timerstate = false;
                var state = $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state];
                $element.css(state);
            }
            ;
            $scope.eventMap['startAutoStateChangeTimer'] = $scope.startAutoStateChangeTimer;
            $scope.eventMap['stopAutoStateChangeTimer'] = $scope.stopAutoStateChangeTimer;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['showerror'] = $scope.showerror;
            $scope.hide = function() {
                $element.css("display", "none");
            }
            ;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'buoy';
            $scope.init();
            $scope.drag();
        }
    }
}
]);
