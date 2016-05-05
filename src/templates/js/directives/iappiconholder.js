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
