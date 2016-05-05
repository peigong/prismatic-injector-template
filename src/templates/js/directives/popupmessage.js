uiCore.directive('popupmessage', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_popuppure"><div class="c60_fbar_wchbg_pop_block"></div>' + '<div class="c60_fbar_wchpop_block">' + '<div class="c60_fbar_wchimg_txt_title"><span class="c60_fbar_wchyidong" ng-style="pureStyle(\'title\')" ng-bind="pureText(\'title\')"></span></div>' + '<div class="c60_fbar_wchimg_txt_info">' + '<div class="c60_fbar_wchpop_txt2"  ng-style="pureStyle(\'message\')" ng-bind-html="to_trusted(revData.message)"></div>' + '</div>' + '<div class="c60_fbar_wchimg_txt_btn clearfloat">' + '<div class="c60_fbar_wchleft_itbtn2" ng-bind="pureText(\'cancel\')" ccid="c60_fbar_popupmessage_btnclose"  ng-style="pureStyle(\'cancel\')"></div>' + '</div>' + '</div>' + '</div>',
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
            container = angular.element($element[0].querySelector('.c60_fbar_wchleft_itbtn2'));
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
            $scope.pureStyle = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.state;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.state0;
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
            $scope.pureText = function(type) {
                if (type != null  && type != undefined) {
                    switch (type) {
                    case 'title':
                        return $scope.compData.JS.popuptitleconfig.JS.stateconfig.title;
                        break;
                    case 'cancel':
                        return $scope.compData.JS.popupbtnconfig.JS.stateconfig.title0;
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
            $scope.componentType = 'popupmessage';
            $scope.init();
        }
    }
}
]);
