uiCore.directive('guide', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_bg_guide_block">'
        + '<div class="c60_fbar_guidemask"></div>'
        + '<div class="c60_fbar_guideimg"></div>'
        + '<ul class="c60_fbar_zhidao_ul_circle">'
        + '<li class="c60_fbar_zh_uc_li_curr" ng-repeat="i in indexarray" ng-style="getcircleStyle($index)"></li>'
        + '</ul>'
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            var guideel = angular.element($element[0].querySelector('.c60_fbar_guideimg'));
            $scope.currentIndex = 0;
            $scope.updateData = function(data) {
                var temp = $scope.compData.JS.stepconfig;
                var tmp = [];
                var css = [];
                for (var i = 0; i < 10; i++) {
                    if (temp["step" + i]) {
                        tmp.push(i);
                        css.push(temp["step" + i]);
                    }
                }
                $scope.indexarray = tmp;
                $scope.cssarray = css;
                $scope.maxindex = css.length - 1;
                $scope.ismessagestatuschange = false;

            }
            ;

            $scope.getcircleStyle = function(index) {
                if ($scope.indexarray.length > 1) {
                    if (index == $scope.currentIndex) {
                        return {
                            'background-color': ''
                        }
                    } else {
                        return {
                            'background-color': '#FFF'
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
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                $scope.updateData();
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
                guideel.bind(_touchstart, function(e) {

                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;

                });
                guideel.bind(_touchmove, function(e) {

                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                });
                var sendmessagestatuschange = function() {
                    if (false == $scope.ismessagestatuschange) {
                        //add by h00278783 点击弹框，上报状态消息-----------start---
                        if (top.tlbs.messageid != "") {
                            coreService.fireEvent($scope.cid, 'messagestatuschange', {
                                "messageid": top.tlbs.messageid
                            });
                        }
                        //add by h00278783 点击弹框，上报状态消息-----------end---
                    }
                }
                guideel.bind(_touchend, function(e) {
                    var xdistance = _currentXPos - _lastXPos;
                    sendmessagestatuschange();
                    $scope.ismessagestatuschange = true;
                    if (xdistance < 0) {
                        if ($scope.currentIndex < $scope.maxindex) {
                            $scope.currentIndex = $scope.currentIndex + 1
                        }
                        else {
                            top.tlbs.notificationCdrData = null ;
                            $scope.hide();
                        }

                    } else {
                        if ($scope.currentIndex > 0) {
                            $scope.currentIndex = $scope.currentIndex - 1;
                        }
                    }
                    guideel.css($scope.cssarray[$scope.currentIndex]);
                    $scope.$apply();

                });
            }
            ;

            $scope.hide = function() {
                $element.css({
                    "display": 'none'
                });
            }
            ;
            $scope.show = function(data) {
                top.tlbs.messageid = data.messageid || "";
                guideel.css($scope.cssarray[0]);
                $scope.currentIndex = 0;
                $element.css({
                    "display": 'block'
                });
            }
            ;
            $scope.eventMap["show"] = $scope.show;
            $scope.eventMap["hide"] = $scope.hide;

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
            $scope.componentType = 'guide';
            $scope.init();
        }
    }
}
]);
