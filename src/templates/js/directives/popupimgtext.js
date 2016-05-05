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
