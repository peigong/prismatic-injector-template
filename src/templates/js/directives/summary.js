uiCore.directive('summary', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_summary" event="noevent">' + '<abnormaltips ng-click="ballclick()" ng-show="compData.JS.errortipsshow"></abnormaltips>' + '<div class="c60_fbar_liul_tab">' + '<ul class="c60_fbar_liul_tab_ul">' + '<li class="c60_fbar_liul_tab_li" ccid="c60_fbar_liul_tab_li" ng-style="getFontColor($index)" ng-click="tabClick($event,$index,trafficlist.length,this);" ng-repeat="category in trafficlist" ng-bind=category.categoryname></li>' + '</ul>' + '</div>' + '<div class="c60_fbar_liul_tab_container_div"><dl ng-style="getWidth(trafficlist.length)" class="c60_fbar_liul_tab_container_dl">' + '<dd class="c60_fbar_liul_tab_container_dd" ng-repeat="traffic in trafficlist">' + '<div class="c60_fbar_liul_tab_container_dd_left"><trafficdata  value=traffic.leftdata></trafficdata></div>' + '<div class="c60_fbar_liul_tab_ul">' + '<trafficball ng-click="ballclick()" ccid="c60_fbar_trafficball" index=$index traffic=traffic traffictime=traffictime stateconfig="{{::compData.JS}}"></trafficball>' + '</div>' + '<div class="c60_fbar_liul_tab_container_dd_right"><trafficdata  value=traffic.rightdata></trafficdata></div>' + '</div></dd></dl></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', "$compile",
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile) {
            $scope.compData = {
                js: {},
                css: {}

            };
            $scope.eventMap = {};
            var dl = null ;
            var ballcontainer = null ;
            $scope.currentIndex = 0;
            $scope.getFontColor = function(index) {
                if (index == $scope.currentIndex) {
                    return {
                        'color': '#fff'
                    };

                } else
                    return {
                        'color': '#0d7164'
                    };

            }
            ;
            var tracingcdr = function(index) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_liul_tab_li.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.trafficlist[index].category || '-1'
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_liul_tab_li.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.drag = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var ballcontainer = angular.element($element[0].querySelector('.c60_fbar_liul_tab_container_div'));
                var moveflag = false;
                ballcontainer.bind(_touchstart, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    moveflag = false;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                ballcontainer.bind(_touchmove, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    moveflag = true;

                });

                ballcontainer.bind(_touchend, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var xdistance = _currentXPos - _lastXPos;
                    var ydistance = _currentYPos - _lastYPos;
                    if (moveflag && Math.abs(xdistance) > 5) {
                        if (xdistance < 0) {
                            if ($scope.currentIndex < $scope.totallength - 1) {
                                $scope.currentIndex = $scope.currentIndex + 1;
                                tracingcdr($scope.currentIndex);
                            }
                        } else {
                            if ($scope.currentIndex > 0) {
                                $scope.currentIndex = $scope.currentIndex - 1;
                                tracingcdr($scope.currentIndex);
                            }
                        }
                        $scope.$apply();

                        $scope.slideBall($scope.currentIndex, $scope.totallength);
                    }
                });

            }
            ;

            $scope.ballclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_trafficball.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs['cid'], 'ball')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_trafficball.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), "ballclick");

            }

            $scope.tabClick = function(e, index, length, el) {
                tracingcdr(index);
                e.preventDefault();
                e.stopPropagation();
                $scope.currentIndex = index;
                $scope.slideBall(index, length);

            }
            ;

            $scope.slideBall = function(index, length) {

                dl = dl || angular.element($element[0].querySelector('.c60_fbar_liul_tab_container_dl'));
                var percent = index * 100 / length;
                dl.css('-webkit-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-moz-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-ms-transform', 'translate(-' + percent + '%,0px)');
                dl.css('-o-transform', 'translate(-' + percent + '%,0px)');
            }
            ;
            $scope.getWidth = function(count) {
                $scope.totallength = count;
                return {
                    'width': (count * 100) + '%'
                };

            }
            ;

            var transferK = function(value) {
                return coreUtils.trafficValueTransferfromKB(value, Number($scope.compData.JS.floatnum || 2));
            }
            ;

            var transferTrafficdata = function(trafficarray) {
                var numfloat = Number($scope.compData.JS.floatnum || 2);
                if (trafficarray) {
                    var temp = null ;
                    for (var i = 0, len = trafficarray.length; i < len; i++) {
                        temp = trafficarray[i];
                        temp.ecid = $scope.cid;
                        var remain = Number(temp.total) - Number(temp.used);
                        var overflow = Number(temp.overflow);
                        var remainN;
                        var datadesc = $scope.compData.JS.datadesc[temp.categoryType + ''] || {
                            totaldesc: "总流量",
                            useddesc: '已用流量',
                            remaindesc: '剩余流量',
                            overflowdesc: '超出流量',
                            dayleftdesc: '日均可用'
                        };
                        temp.desc = datadesc;
                        var iskbunit = function(type) {

                            return !type || type == '2';

                        }
                        ;

                        //only traffic data need transfer
                        if (iskbunit(temp.categoryType)) {
                            temp.totalN = transferK(temp.total);
                            temp.totalN.desc = datadesc.totaldesc;
                            temp.usedN = transferK(temp.used);
                            temp.usedN.desc = datadesc.useddesc;
                            if (temp.dateleft || (temp.dateleft == 0)) {
                                temp.dayleftN = transferK(temp.dateleft);
                                temp.dayleftN.desc = datadesc.dayleftdesc;
                            }
                        } else {
                            temp.totalN = {
                                v: coreUtils.formatNum(temp.total, numfloat),
                                u: temp.unit,
                                desc: datadesc.totaldesc
                            };
                            temp.usedN = {
                                v: coreUtils.formatNum(temp.used, numfloat),
                                u: temp.unit,
                                desc: datadesc.useddesc
                            };
                            if (temp.dateleft || (temp.dateleft == 0)) {
                                temp.dayleftN = {
                                    v: coreUtils.formatNum(temp.dateleft, numfloat),
                                    u: temp.unit,
                                    desc: datadesc.dayleftdesc
                                };
                            }
                        }
                        var showItems = ($scope.compData.JS.showItem || 'total,used').split(",");
                        temp.leftdata = temp[showItems[0] + 'N'] || {
                            v: '',
                            u: ''
                        };
                        temp.rightdata = temp[showItems[1] + 'N'] || {
                            v: '',
                            u: ''
                        };
                        if (overflow > 0) {
                            if (iskbunit(temp.categoryType)) {
                                remainN = transferK(overflow);
                            } else {
                                remainN = {
                                    v: coreUtils.formatNum(overflow, numfloat),
                                    u: temp.unit
                                };
                            }
                            remainN.v = 0 - remainN.v;
                        } else {
                            if (iskbunit(temp.categoryType)) {
                                remainN = transferK(remain);
                            } else {
                                remainN = {
                                    v: coreUtils.formatNum(remain, numfloat),
                                    u: temp.unit
                                }
                            }
                        }
                        if (remain != 0 && remainN.v == 0) {
                            remainN.v = 0.01;
                        }
                        temp.remainN = remainN;
                    }

                }
            }
            ;

            $scope.update = function(data) {
                if (data.respparam) {
                    var trafficlistemp;
                    $scope.totallength = 0;
                    if (data.respparam.trafficusage.traffics !== undefined && data.respparam.trafficusage.traffics !== '' && data.respparam.trafficusage.traffics !== null ) {
                        trafficlistemp = data.respparam.trafficusage.traffics;
                        transferTrafficdata(trafficlistemp);

                        $scope.trafficlist = trafficlistemp;
                        $scope.traffictime = data.respparam.trafficusage.traffictime;
                        $scope.totallength = data.respparam.trafficusage.traffics.length;
                    }

                    if ($scope.totallength == 0) {
                        $scope.compData.JS.errortipsshow = true;
                        $scope.showError({
                            'errorcode': 'nodata'
                        });
                    } else {
                        $scope.compData.JS.errortipsshow = false;

                    }
                }
            }
            $scope.getparam = function(name) {
                try {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                    var r = top.window.location.search.substr(1).match(reg);
                    if (r != null )
                        return unescape(r[2]);
                    return "";
                }
                catch (e) {

                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css($scope.compData.css);
                $scope.drag();
                $scope.$broadcast('abnormaltipsinit', $scope.compData.JS.errortipsconfig);
                //用于appbar直接显示页面订购
                if ($scope.getparam('subscribeid') && $scope.getparam('appkey')) {
                    coreService.fireEvent($attrs['cid'], 'init1');
                    top.subscribeid = $scope.getparam('subscribeid');
                    //用于appbar有subscribeid时其他组件判断
                    top.subscribeid1 = top.subscribeid;
                } else {
                    coreService.fireEvent($attrs['cid'], 'init');
                }

                initCategoryTabStyle();
            }
            ;

            var initCategoryTabStyle = function()
            {
                var elementTab = angular.element($element[0].querySelector('.c60_fbar_liul_tab'));
                var isShowCategoryTab = $scope.compData.JS.showCategoryTab && $scope.compData.JS.showCategoryTab == true;
                var showCategoryTab = isShowCategoryTab ? "visible" : "hidden";
                elementTab.css("visibility", showCategoryTab);
            }
            ;


            $scope.showError = function(data) {
                var errorcode = data.errorcode;
                $scope.compData.JS.errortipsshow = true;
                $scope.trafficlist = null ;
                //$scope.compData.JS.tipsconfig = $scope.compData.JS.errortips[errorcode] || $scope.compData.JS.errortips['default'];
                $scope.$broadcast('trafficquryerror', {
                    'errorcode': errorcode
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
            $scope.changesrc = function(data) {
                if (data && data.ordersrc) {
                    top.tlbs.ordersrc = data.ordersrc;
                }
            }
            ;
            $scope.eventMap['changesrc'] = $scope.changesrc;
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['showerror'] = $scope.showError;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.cid = $attrs['cid'];
            $scope.componentType = 'summary';
            $scope.init();

        }
    }
}
]);
