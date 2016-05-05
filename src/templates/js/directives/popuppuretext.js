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
