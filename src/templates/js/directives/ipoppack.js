uiCore.directive('ipoppack', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            ipack: '=ipack',
            pageID: '=ppid',
            taskId: '=taskid'
        },
        template: '<div  class="c60_fbar_flux_bag_recomm" ccid="c60_fbar_flux_bag_recomm">' + '<div class="c60_fbar_flux_bag_type_price c60_fbar_clearfloat"><div class="c60_fbar_flux_bag_type c60_fbar_bg_90c666" style="background:{{ipack.color}}" ng-bind="ipack.categoryname"></div><div class="c60_fbar_flux_bag_price c60_fbar_bg_90c666" style="background:{{ipack.color}}"><span class="c60_fbar_flux_bag_price_color" ng-bind="unitconfig+ipack.price"></span></div></div>' + '<div class="c60_fbar_flux_volume_txt" ng-bind="ipack.value"></div>' +
        '</div>',
        controller: [
        "$scope",
        "$element",
        "$attrs",
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.touchLink = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var startflag = false;
                $element.bind(_touchstart, function(e) {
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    moveflag = false;
                    startflag = true;
                });
                $element.bind(_touchmove, function(e) {
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (Math.abs(_currentYPos - _lastYPos) > 3) {
                        moveflag = true;
                    } else {
                        moveflag = false;
                    }
                });
                $element.bind(_touchend, function(e) {
                    //add by h00278783 点击弹框，上报状态消息-----------start---
                    try {
                        if (top.tlbs.messageid != "") {
                            coreService.fireEvent($scope.cid, 'messagestatuschange', {
                                "messageid": top.tlbs.messageid
                            });
                        }
                        //add by h00278783 点击弹框，上报状态消息-----------end---

                        if (startflag == true && moveflag == false) {
                            var config = coreUtils.String2JSON($attrs['config']);

                            if (coreUtils.cdrUtils.canWriteUITracingCDR(config.flux_bag_recomm.cdrConfig)) {
                                $scope.compData.JS['cdrData'] = {};
                                $scope.compData.JS.cdrData = {
                                    'pageId': $scope.pageID,
                                    'componentId': $scope.ipack.id,
                                    'taskId': $scope.taskId,
                                    'iseComp': '1'
                                };
                                coreUtils.cdrService(config.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                            }

                            coreService.fireEvent($scope.ipack.eid, 'click0', {
                                'pkgid': $scope.ipack.id,
                                'taskid': $scope.taskId
                            });
                            coreService.fireEvent($scope.ipack.eid, 'click', {
                                'pkgid': $scope.ipack.id,
                                'pkgoid': $scope.ipack.oid,
                                'taskid': $scope.taskId
                            });
                        }
                    }
                    finally {

                        startflag = false;
                        moveflag = false;
                    }

                });
            }
            ;


            $scope.click = function(ipack) {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                var config = coreUtils.String2JSON($attrs['config']);

                if (coreUtils.cdrUtils.canWriteUITracingCDR(config.flux_bag_recomm.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': ipack.id,
                        'taskId': $scope.taskId,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService(config.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent(ipack.eid, 'click0', {
                    'pkgid': ipack.id,
                    'taskid': $scope.taskId
                });
                coreService.fireEvent(ipack.eid, 'click', {
                    'pkgid': ipack.id,
                    'taskid': $scope.taskId
                });

            }
            ;
            $scope.init = function() {
                var config = coreUtils.String2JSON($attrs['config']);
                $scope.unitconfig = config.unitconfig.unitisShow == true ? config.unitconfig.unit : '';
                $scope.touchLink();
            }
            ;
        }
        ],

        link: function($scope, $element, $attrs, ctl) {
            $scope.compData = {
                'JS': {},
                'CSS': {}
            };

            $scope.init();
        }
    }
});
