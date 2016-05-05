uiCore.directive('popupwelcome', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popupwelcome"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_bg_piru" ng-style="pureWelcomeStyle(\'bg\')">' + '<div class="c60_fbar_piru_close" ccid="c60_fbar_popupwelcome_btnclose"   ng-style="pureWelcomeStyle(\'close\')"></div>' + '<div class="c60_fbar_piru_btn_txt">' + '<div class="c60_fbar_piru_txt"  ng-style="pureWelcomeStyle(\'message\')" ><p ng-bind-html="to_trusted(revData.message)" simplescroll></p></div>' + '<div class="c60_fbar_piru_btn"  ccid="c60_fbar_popupwelcome_btn" ng-style="pureWelcomeStyle(\'begin\')" ng-bind="nowbegin()"></div>' + '</div>' + '</div>' + '</div>',
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
            container = angular.element($element[0].querySelector('.c60_fbar_piru_btn'))
              ,
            container2 = angular.element($element[0].querySelector('.c60_fbar_piru_close'));

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
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupbeginconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'startbtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupbeginconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            });
            container2.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popupcloseconfig.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.popupcloseconfig.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.nowbegin = function() {
                return $scope.compData.JS.popupbeginconfig.JS.stateconfig.text;
            }
            $scope.pureWelcomeStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'bg':
                        return $scope.compData.JS.popupbgconfig.JS.stateconfig.state;
                        break;
                    case 'close':
                        return $scope.compData.JS.popupcloseconfig.JS.stateconfig.state;
                        break;
                    case 'begin':
                        return $scope.compData.JS.popupbeginconfig.JS.stateconfig.state;
                        break;
                    case 'message':
                        return $scope.compData.JS.popupdescconfig.JS.stateconfig.state;
                        break;
                    default:
                        break;
                    }
                }
            }
            ;
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
            $scope.componentType = 'popupwelcome';
            $scope.init();
        }
    }
}
]);
