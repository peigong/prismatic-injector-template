uiCore.directive('iimagenotification', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder"><div id="notificationholder"><img class="imageholder" ccid="C60_fbar_imageholder" ng-src="{{campaign.image}}" ng-style="compData.JS.imageholder.CSS" ng-click="notificationClick()" /><div id="closeholder" class="C60_fbar_closeholder" ccid="C60_fbar_closeholder"  ng-bind="compData.JS.closeholder.JS.text"></div><div class="checkBtn" ng-show="compData.JS.checkBtn.JS.isShow" ccid="C60_fbar_checkBtn" ng-click="btnClick()" ng-style="compData.JS.checkBtn.CSS" ng-bind="compData.JS.checkBtn.JS.text"></div></div></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile", '$interval', '$timeout',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {

                }
            };
            $scope.campaign = {};
            $scope.taskId = "";
            $scope.btnClick = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.checkBtn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': 'C60_fbar_checkBtn'
                    };
                    coreUtils.cdrService($scope.compData.JS.checkBtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                var campaign = $scope.campaign;
                window.open(campaign.url);

            }
            ;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.upDate = function(param) {}
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $scope.processConfig();

            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.processConfig = function() {
                //mainholder
                $element.css($scope.compData.CSS);
                //notificationholder
                angular.element($element[0].querySelector('[id="notificationholder"]')).css($scope.compData.JS.notificationholder.CSS);
                //imageholder
                angular.element($element[0].querySelector('[id="imageholder"]')).css($scope.compData.JS.imageholder.CSS);
                //closeholder
                angular.element($element[0].querySelector('[id="closeholder"]')).css($scope.compData.JS.closeholder.CSS);
            }
            ;

            $scope.showNotification = function(eventObj) {
                if (null  != eventObj && null  != eventObj.campaign.image) {
                    $scope.taskId = eventObj.taskId;
                    $scope.campaign = eventObj.campaign;
                    top.tlbs.messageid = eventObj.messageid || "";
                    preloadimages($scope.campaign.image).done(function() {
                        $element.css('display', 'block');
                        // angular.element($element[0].querySelector('.imageholder')).css({'background':"url('" + eventObj.campaign.image + "') left top no-repeat",'background-size':'100% 100%'});
                        var time = $scope.compData.js.closeTime;
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------start-----
                        if (top.tlbs.messageid != "") {
                            $timeout(function() {
                                if ($element.css('display') != 'none') {
                                    top.tlbs.notificationCdrData = null ;
                                }
                                $scope.closeNotification();
                            }, time);
                        }
                        //add by h00278783 当植入时候弹框，需要自动隐藏，消息中心不需要自动隐藏------end-----


                    });
                }
            }
            ;
            $scope.eventMap['showNotification'] = $scope.showNotification;
            $scope.eventMap['update'] = $scope.upDate;
            var _touchstart = Const.touchEvent.start
              ,
            container = angular.element($element[0].querySelector('.C60_fbar_closeholder'));
            container.bind(_touchstart, function(e) {
                e.stopPropagation();
                e.preventDefault();
                _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                $element.css({
                    'display': 'none'
                });
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.closeholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.closeholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
            });
            $scope.closeNotification = function() {
                $element.css('display', 'none');
            }
            ;

            $scope.notificationClick = function() {
                //coreService.fireEvent($scope.cid, 'notificationClick');
                //var campaign = $scope.campaign;
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---

                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.imageholder.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'taskId': $scope.taskId,
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'imagebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.imageholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //window.open($scope.campaign.url);
                $element.css('display', 'none');
                if ($scope.campaign.linkType == undefined)
                    $scope.campaign.linkType = '0';
                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    "linktype": $scope.campaign.linkType,
                    "url": $scope.campaign.url
                });
            }
            ;

            var ThumbnailImageArray = [];

            function preloadimages(arr) {
                var loadedimages = 0;
                var postaction = function() {}
                ;
                var arr = (typeof arr != "object") ? [arr] : arr;

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
            scope.componentType = 'iimagenotification';
            scope.init();
        }
    };
}
]);
