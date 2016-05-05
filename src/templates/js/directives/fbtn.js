uiCore.directive('fbtn', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_fbtn"><div ng-bind="compData.js.text" class="c60_fbar_fbtn_txt"></div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', "$compile", "$timeout", function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $timeout) {
            $scope.compData = {
                js: {},
                css: {}

            };
            $scope.eventMap = {};
            var txtelement = angular.element($element[0].querySelector('.c60_fbar_fbtn_txt'));

            $scope.clickbtn = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.js.cdrConfig)) {
                    $scope.compData.js['cdrData'] = {};
                    $scope.compData.js.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.cid
                    };
                    coreUtils.cdrService($scope.compData.js.cdrConfig.uitracingcdr, $scope.compData.js.cdrData);
                }
                if ($element.attr('cid') == 'closebtn')
                {
                //								 var htmls = top.document.getElementsByTagName('html')[0];
                //								 var bodys = top.document.getElementsByTagName('body')[0];
                //								 htmls.style.overflowY='auto';
                //								 bodys.style.overflowY='auto';
                }
                coreService.fireEvent($element.attr('cid'), "btnclick");

            }
            ;

            $scope.showTxt = function(data) {
                if (data && data.text) {
                    if ($scope.cid == "messagebtn" && (Number(data.text) > 99)) {
                        $scope.compData.js.text = $scope.compData.js.defaultText;
                        txtelement.css($scope.compData.js.state1 || {});
                    } else {
                        $scope.compData.js.text = data.text;
                        txtelement.css($scope.compData.js.state0 || {});
                    }

                }
                txtelement.css({
                    "display": "block"
                });

            }
            ;

            $scope.hideTxt = function() {
                txtelement.css({
                    "display": "none"
                });

            }
            ;
            //add by h00278783 2015.06.23---小红点----start-----
            $scope.queryMessageStatusFunOne = function() {
                coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
            }
            ;
            $scope.eventMap['queryMessageStatusFunOne'] = $scope.queryMessageStatusFunOne;
            var queryMessageStatusFun = function() {
                coreService.fireEvent($element.attr('cid'), 'queryMessageStatus');
                $timeout(queryMessageStatusFun, Number($scope.compData.js.queryStatusTimer) * 1000);
            }
            ;
            //每隔一段时间查询下消息状态
            $scope.queryMsgBoxTimer = function() {
                queryMessageStatusFun();
            }
            ;
            $scope.eventMap['queryMsgBoxTimer'] = $scope.queryMsgBoxTimer;
            $scope.queryMsgBox = function(data) {
                if (data && data.respparam) {
                    if (Number(data.respparam.unreadmessages) > 0) {
                        $scope.showTxt({
                            "text": data.respparam.unreadmessages
                        });
                    } else {
                        $scope.hideTxt();
                    }
                }
            }
            ;
            $scope.eventMap['queryMsgBox'] = $scope.queryMsgBox;
            // add by h00278783 2015.06.23---小红点--end--
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                $element.css($scope.compData.css);
                txtelement.css($scope.compData.js.textstyle || {});
                $element[0].addEventListener(Const.touchEvent.end, $scope.clickbtn, false);
                //$element.bind(,)
                //DTS2015071506965
                //							$element.bind(Const.touchEvent.end, $scope.clickbtn);
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

            $scope.eventMap['hidetxt'] = $scope.hideTxt;
            $scope.eventMap['showtxt'] = $scope.showTxt;
        }

        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.cid = $attrs['cid'];
            $scope.componentType = 'fbtn';
            $scope.init();
        }
    }
}
]);
