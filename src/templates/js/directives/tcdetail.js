uiCore.directive('tcdetail', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_taocan_xq">' + '<abnormaltips ng-show="errorflag"></abnormaltips>' + '<div class="c60_fbar_taocan_detailxq" ng-show="details && details.length>0"><div class="c60_fbar_detailwrapscroll" simplescroll>' + '<linechart ng-show="chartflag" config="{{::compData.js.lineChart}}"></linechart>' + '<div class="c60_fbar_taocan_xq_title" ><div class="c60_fbar_taocan_xq_title_text" ng-bind="compData.js.taocan_xq_title.text"></div><a class="c60_fbar_link_overbuy" ng-bind="compData.js.link_overbuy.JS.text" ccid="c60_fbar_link_overbuy" ng-click="oblink()" ng-show="showLink(\'link_overbuy\')"></a></div><div  class="c60_fbar_packwrap"><div class="c60_fbar_tcdetailscroll"><div ng-repeat="detail in details">' + '<div class="c60_fbar_taocan_block"><div class="c60_fbar_taocan_tit" ng-show="compData.js.taocan_detail.showCategory" ng-bind="detail.category"></div>' + '<tcpack  ng-repeat="tp in detail.item"  tpitem="tp"></tcpack>' + '</div></div><div class="c60_fbar_packwrapkb"></div></div></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile", "$timeout",
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {
                    "lineChart": {
                        "CSS": {},
                        "JS": {
                            "chartText": {
                                "CSS": {},
                                "JS": {
                                    "titletext": {
                                        "isShow": true,
                                        "text": "数据只含主套餐和叠加包流量，不含闲时和定向流量"
                                    },
                                    "usedtext": {
                                        "text": "已用日均:"
                                    },
                                    "lefttext": {

                                        "text": "剩余日均:"
                                    }
                                }
                            },
                            "chartConfig": {
                                "showNumber": 7,
                                "spacing": 100,
                                "xStartSpacing": 20,
                                "lineColor": "#73d7bd",
                                "lineWidth": 2,
                                "isShowBgLine": true,
                                "bgLineWidth": 2,
                                "bgLineColor": "#F2F1F1",
                                "isShowXContent": true,
                                "XContentColor": "#000",
                                "XContentCurrentColor": "#73d7bd",
                                "XContentCurrentFont": "bold 0.8em/2em Arial",
                                "XContentFont": "0.8em/2em Arial",
                                "polyLineShow": true,
                                "polyPointShow": true,
                                "polyPointColor": "#73d7bd",
                                "PolygonShow": true,
                                "PolygonColor": "rgba(152, 151, 151, 0.2)",
                                "avgusedlineShow": true,
                                "avgusedlineStyle": "#ccc",
                                "avgusedlineWidth": 1,
                                "avgremainlineShow": true,
                                "avgremainlineStyle": "#73d7bd",
                                "avgremainlineWidth": 1,
                                "todayText": "今天"
                            }

                        }
                    },
                    'titleStyle': {
                        'JS': {
                            'state0': {
                                'top': '12.5em',
                                'padding': '0 1em',
                                'height': '2em',
                                'border-top': '1px solid #ccc'
                            },
                            'state1': {
                                'top': '0em',
                                'padding': '0em 1em',
                                'height': '2em',
                                'background': '#fff',
                                'border-top': 'none',
                                'z-index': '2047483650'
                            }

                        }
                    }
                }
            };
            $scope.eventMap = {};
            $scope.errorflag = false;
            $scope.chartflag = false;
            //var titleStyle = angular.element($element[0].querySelector('.c60_fbar_taocan_xq_title'));
            //var packwrapStyle = angular.element($element[0].querySelector('.c60_fbar_packwrap'));
            var packwrapkbStyle = angular.element($element[0].querySelector('.c60_fbar_packwrapkb'));
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };
            $scope.showLink = function(classname) {
                if ($scope.compData.js[classname]) {
                    return $scope.compData.js[classname].JS.isShow;
                }
            }
            $scope.oblink = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.link_overbuy.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'link')
                    };
                    coreUtils.cdrService($scope.compData.js.link_overbuy.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'linkbuy');
            }
            ;
            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                return coreUtils.trafficValueTransferfromKB(value, n);

            }
            ;
            $scope.getStates = function(value) {
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var states;
                if (properties.JS != undefined) {
                    var states = properties.JS;
                    for (var i = 0; i < 3; i++) {
                        var state = properties.JS['state' + i];
                        if (value <= state.maxvalue && value >= state.minvalue) {
                            return state.config
                        }
                    }

                }

            }
            ;
            $scope.error = function(data) {
                $scope.errorflag = true;
                $scope.$broadcast('trafficquryerror', {
                    'errorcode': data.errorcode
                });
            }
            ;
            var children,
            wrapperDiv,
            minHeight = 0,
            totalHeight = 0;
            var isOpera = /preto/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent);
            var tcscroll = angular.element($element[0].querySelector('.c60_fbar_detailwrapscroll'));
            var packwrap = angular.element($element[0].querySelector('.c60_fbar_detailwrap'));

            var touchMove = function() {
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
                    var transform = tcscroll[0].style['webkitTransform'] || tcscroll[0].style['mozTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['msTransform'] || tcscroll[0].style['oTransform'];
                    if (transform) {
                        totalDistance = transform.split(',')[1] && parseInt(transform.split(',')[1]);
                    } else {
                        totalDistance = 0;
                    }
                    touchstartflag = true;
                    elHeight = parseInt(packwrap['totalheight'] || top.window.getComputedStyle(tcscroll[0], null )['height']) + 20;
                    parentHeight = parseInt(packwrap['parentheight'] || top.window.getComputedStyle(tcscroll[0].parentNode, null )['height']);
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
                            tcscroll.css('-o-transform', 'translate(0,' + totalDistance + 'px)');
                            tcscroll.css('transform', 'translate(0,' + totalDistance + 'px)');
                        } else {
                            tcscroll.css('-webkit-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-moz-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-o-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('-ms-transform', 'translate3d(0,' + totalDistance + 'px,0)');
                            tcscroll.css('transform', 'translate3d(0,' + totalDistance + 'px,0)');
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

            //$timeout(touchMove, 0);
            $scope.update = function(data) {

                if (data && data.respparam && data.respparam.trafficusage) {
                    if (data.respparam.trafficusage.details) {
                        var linechartss = [];
                        if (data.respparam.trafficusage.avgremain && data.respparam.trafficusage.avgused && data.respparam.trafficusage.trafficchart) {
                            var avgremain = data.respparam.trafficusage.avgremain;
                            var avgused = data.respparam.trafficusage.avgused;
                            var trafficchart = data.respparam.trafficusage.trafficchart || [];

                            if (trafficchart.length > 0) {
                                linechartss = {
                                    'avgremain': avgremain,
                                    'avgused': avgused,
                                    'trafficchart': trafficchart
                                };
                                //titleStyle.css($scope.compData.js.titleStyle.JS.state0);
                                //packwrapStyle.css($scope.compData.js.packwrapStyle.JS.state0);
                                $scope.chartflag = true;
                            } else if (trafficchart.length == 0) {
                                $scope.chartflag = false;
                            }

                            //packwrapkbStyle.css($scope.compData.JS.packwrapkbStyle.CSS);


                        } else {
                            $scope.chartflag = false;
                        }

                        $scope.errorflag = false;
                        var temp = data.respparam.trafficusage.details || [];
                        var categorydetail;
                        var items;
                        var item;
                        for (var i = 0, len = temp.length; i < len; i++) {
                            categorydetail = temp[i];
                            items = categorydetail.item || [];
                            for (var j = 0, ilen = items.length; j < ilen; j++) {
                                item = items[j];
                                var left = item.total - item.used;
                                item.usagepercent = item.used / item.total * 100;
                                item.leftpercent = left / item.total * 100;
                                var remaintmp = {
                                    v: item.total - item.used,
                                    u: item.unit
                                };
                                if (item.categoryType == 2 || !item.categoryType) {
                                    remaintmp = $scope.transferK(item.total - item.used, Number($scope.compData.js.floatnum || 2));
                                }
                                item.remain = remaintmp.v;
                                item.remainunit = remaintmp.u;
                                var config = null ;
                                if (item.usagepercent == 0) {
                                    config = $scope.getStates(item.leftpercent + 0.001);
                                } else {
                                    config = $scope.getStates(item.leftpercent)
                                }
                                if (config) {
                                    item.imagestyle = config.faceStyle;
                                    item.linestyle = coreUtils.extendDeep({}, config.lineStyle || {});
                                }
                                if (item.linestyle) {

                                    item.linestyle.width = item.usagepercent + '%';
                                }

                            }
                        }
                        $scope.details = temp;
                        $scope.compData.js.lineChart.trraficdata = linechartss;
                        $scope.$broadcast('lineconfig', $scope.compData.js.lineChart);
                        if ($scope.details.length == 0) {
                            $scope.error({
                                errorcode: 'nodata'
                            });

                        }
                    } else {
                        $scope.error({
                            errorcode: 'default'
                        })
                    }
                } else {
                    $scope.errorflag = true;
                    $scope.details = undefined;
                }
            }
            ;
            $scope.hide = function() {

                $element.css({
                    'top': '100%'
                });

            }
            ;
            $scope.show = function() {
                angular.element($element[0].querySelector('.c60_fbar_curcircle')).css({
                    '-webkit-transform': 'scale(1)',
                    'transform': 'scale(1)',
                    'margin-left': '-0.3em',
                    'margin-top': '-0.3em',
                }).removeClass("c60_fbar_curcircle");
                angular.element($element[0].querySelector('.c60_fbar_curcontent')).css({
                    'display': 'none'
                }).removeClass("c60_fbar_curcontent");
                $element.css({
                    'top': '0%'
                });
            }
            $scope.init = function(param) {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.$broadcast('abnormaltipsinit', $scope.compData.js.errortipsconfig);
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
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'tcdetail';
            $scope.init();
        }

    }

}
]);
