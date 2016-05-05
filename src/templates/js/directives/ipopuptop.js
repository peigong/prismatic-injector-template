uiCore.directive('ipopuptop', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        //            transclude: true,
        scope: {},
        template: '<div class="c60_fbar_tanchuang_top"><div class="c60_fbar_pop_close " id="c60_fbar_tctj_pop_close" ccid="c60_fbar_pop_close" ng-bind="compData.JS.popclose.text" ></div>'
        + '<div class="c60_fbar_flux_info_wrap" ng-show="textflag"><div class="c60_fbar_flux_info c60_fbar_clearfloat" ng-show="toptextflag"><div class="c60_fbar_flux_big_txt" ng-bind="remaincomp.v"></div><div class="c60_fbar_flux_small_txt"><div class="c60_fbar_shengyu_txt" ng-bind="compData.JS.shengyu.JS.text"></div><div class="c60_fbar_shengyu_txt" ng-bind="remaincomp.u"></div></div></div></div>'
        + '<div class="c60_fbar_flux_textmes c60_fbar_clearfloat" ng-show="!textflag" ng-bind="compData.JS.tipstext.text"></div>'
        + '<div class="c60_fbar_alert_txt"><div class="C60_fbar_alert_texts" ng-bind-html="to_trusted(message)" ng-style="cus_style"  simplescroll style="overflow:hidden;"></div></div>'
        + '<div class="c60_fbar_look_detail_btn" ccid="c60_fbar_look_detail_btn" ng-click="detail();$event.stopPropagation();$event.preventDefault();"><a class="c60_fbar_ld_btn_link" ng-bind="compData.JS.ld_btn_link.JS.text" ng-style="btn_style"></a></div>'
        + '</div>',

        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile", '$interval', '$sce',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.summary = {};
            $scope.taskId = null ;
            $scope.textflag = true;
            $scope.toptextflag = true;
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;

            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                var result = 0;
                if (value < setting['M']) {
                    result = value / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'MB'
                    }

                } else if (value < setting['G']) {
                    result = value / 1024 / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'GB'
                    }
                } else {
                    result = value / 1024 / 1024 / 1024;
                    return {
                        v: coreUtils.formatNum(result, n),
                        u: 'TB'
                    }
                }

            }
            ;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            var closeContainer = angular.element($element[0].querySelector('[id="c60_fbar_tctj_pop_close"]'));
            $scope.touchClose = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                closeContainer.bind(_touchend, function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    coreService.fireEvent($scope.cid, 'notificationclose');
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popclose.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, '', 'closeBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.popclose.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.$apply();
                    top.tlbs.notificationCdrData = null ;
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                //$scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $element.css($scope.compData.CSS || {});
                angular.element($element[0].querySelector('.flux_info')).css($scope.compData.JS.flux_info.CSS);
                angular.element($element[0].querySelector('.ld_btn_link')).css($scope.compData.JS.ld_btn_link.CSS);
                angular.element($element[0].querySelector('.c60_fbar_alert_txt')).css(($scope.compData.JS.c60_fbar_alert_txt || {}).CSS || {});

                //$scope.processConfig();
                $scope.touchClose();
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.update = function(param) {
                if (param.pmdata) {
                    $scope.textflag = false;
                    angular.element($element[0].querySelector('.C60_fbar_alert_texts')).css(($scope.compData.JS.alert_texts || {}).CSS || {});
                    var pmdata = param.pmdata;
                    $scope.pmdatas = param.pmdata;
                    $scope.ptaskId = param.pmdata.taskId;
                    pmdata.currentpackage.color = $scope.compData.JS.colorconfig['color0'];
                    pmdata.recommandpackage.color = $scope.compData.JS.colorconfig['color1'];
                    pmdata.currentpackage.text = $scope.compData.JS.textconfig['text0'];
                    pmdata.recommandpackage.text = $scope.compData.JS.textconfig['text1'];
                    $scope.pmdata = [pmdata.currentpackage || {}, pmdata.recommandpackage || {}];
                } else {
                    $scope.textflag = true;

                }
                $scope.message = param.message;
                $scope.cus_style = param.style || {};
                $scope.btn_style = param.btnstyle || {};

                if (param.traffic) {
                    $scope.traffic = param.traffic;
                    if (param.traffic.summary !== undefined && param.traffic.summary !== '' && param.traffic.summary !== null ) {
                        $scope.summary = param.traffic.summary[0] || [];
                        if ($scope.summary.remain == null  || $scope.summary.remain == '' || $scope.summary.remain == undefined) {
                            $scope.toptextflag = false;
                            angular.element($element[0].querySelector('.tbholder .c60_fbar_alert_txt')).css('margin-top', '1.4em');
                        } else {
                            $scope.remaincomp = $scope.transferK($scope.summary.remain);
                            $scope.toptextflag = true;
                        }

                    }
                }



                $scope.taskId = param.taskId;

                top.tlbs.messageid = param.messageid || "";
            }
            $scope.eventMap['update'] = $scope.update;
            $scope.processConfig = function() {

                angular.element($element[0].querySelector('.c60_fbar_alert_txt')).css($scope.compData.JS.c60_fbar_alert_txt.CSS || {});
            }
            ;

            $scope.showNotification = function(eventObj) {
                if (null  != eventObj && null  != eventObj.notifyImage) {
                    preloadimages(eventObj.notifyImage).done(function() {
                        $element.css('display', 'block');
                        angular.element($element[0].querySelector('[id="imageholder"]')).css('background-image', "url('" + eventObj.notifyImage + "')");
                    });
                }
            }
            ;
            $scope.eventMap['showNotification'] = $scope.showNotification;

            /* $scope.closeNotification = function() {
                    coreService.fireEvent($scope.cid, 'notificationclose');
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.popclose.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID,'','closeBtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.popclose.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                };*/

            $scope.notificationClick = function() {
                coreService.fireEvent($scope.cid, 'notificationClick');
            }
            ;

            $scope.detail = function() {
                if ($scope.pmdatas) {
                    var titlephone = $scope.compData.JS.phonetitle || '存费送机';
                    var titlefee = $scope.compData.JS.feetitle || '存费送费';
                    coreService.fireEvent($scope.cid, 'storefee', {
                        'pmdatas': $scope.pmdatas,
                        'pmdata': $scope.pmdata,
                        'taskId': $scope.ptaskId,
                        'linktype': $scope.compData.JS.ld_btn_link.JS.linktype || '2',
                        'url': $scope.compData.JS.ld_btn_link.JS.url || 'istorefee',
                        'stitle': $scope.pmdatas.isoffer == true || $scope.pmdatas.isoffer == 'true' ? titlephone : titlefee
                    });

                } else {
                    coreService.fireEvent($scope.cid, 'todetail');
                }

                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.detailbtn.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'detailbtn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.detailbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }

            var ThumbnailImageArray = [];

            function preloadimages(arr) {
                var loadedimages = 0
                var postaction = function() {}
                var arr = (typeof arr != "object") ? [arr] : arr

                function imageloadpost() {
                    loadedimages++;
                    if (loadedimages == arr.length) {
                        postaction(ThumbnailImageArray);
                        //call postaction and pass in newimages array as parameter
                    }
                }
                ;

                for (var i = 0; i < arr.length; i++) {
                    ThumbnailImageArray[i] = new Image();
                    ThumbnailImageArray[i].src = arr[i];
                    ThumbnailImageArray[i].onload = function() {
                        imageloadpost();
                    }
                    ;
                    ThumbnailImageArray[i].onerror = function() {
                        imageloadpost();
                    }
                    ;
                }
                return {
                    done: function(f) {
                        postaction = f || postaction
                    }
                };
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopuptop';
            scope.init();
        }
    };
}
]);
