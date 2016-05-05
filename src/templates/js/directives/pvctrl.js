uiCore.directive('pvctrl', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'A',
        replace: false,
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$interval',
        function($scope, $element, $attrs, $interval) {
            $scope.cid = 'pvctrl';
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.ctrlPageGroup = {};
                var alllLoad = angular.element($element[0].querySelectorAll('[lload="0"]'));
                for (var i = 0; i < alllLoad.length; i++) {
                    var localElement = angular.element(alllLoad[i]);
                    $scope.ctrlPageGroup[localElement.attr('pid')] = localElement;
                }
            }
            ;
            //0:chinese word  1:english word or num 2:标点符号
            function checkword(str) {
                var regCh = new RegExp("[\\u4E00-\\u9FA5\uFE30-\uFFA0]+","g");
                var regNumEng = new RegExp("[0-9a-zA-z]+","g");
                if (regCh.test(str) == true) {
                    return 15;
                } else if (regNumEng.test(str) == true) {
                    return 1;
                } else {
                    return 15;
                }
            }
            function getEncodeMsg(message) {
                var newStr = "";
                var count = 0, temp = 0, i;
                for (i = 0; i < message.length; i++) {
                    temp = count + checkword(message[i]);
                    if (temp > 1000) {
                        break;
                    } else {
                        count = temp;
                    }
                }
                if (i == message.length) {
                    return message;
                } else {
                    return message.substring(0, i);
                }
            }
            $scope.lloadApps = function(loadObject, deferred) {
                if (null  != loadObject.applist && loadObject.applist.length > 0) {
                    var pageidSplit = loadObject.applist.split(',');
                    var appArrayObj = new loadAppArray().eexecute(pageidSplit, deferred);
                    var serverRespTime = loadObject.sresptime || '';
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': loadObject.taskId,
                        'componentId': pageidSplit[0],
                        'pageId': pageidSplit[0],
                        'message': encodeURIComponent(encodeURIComponent(getEncodeMsg(loadObject.message || ''))),
                        'sresptime': serverRespTime,
                        'functionid': loadObject.functionid
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    top.tlbs.notificationCdrData = cdrData;
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            var loadAppArray = function() {

            }
            ;

            loadAppArray.prototype.eexecute = function(pageArray, deferred) {
                var i = 0
                  ,
                j = pageArray.length
                  ,
                count = 0
                  ,
                pageArrayIds = pageArray
                  ,
                deferred = deferred;
                var executeFunction = function(lKey) {
                    var loadingPageId = pageArrayIds[count];
                    var pageObject = $scope.ctrlPageGroup[loadingPageId];
                    if (null  != pageObject && pageObject.attr('lload') == 0) {
                        pageObject.attr('lload', '1');
                        var cdrConfig = {
                            'cdrType': 'uidisplaycdr',
                            'enable': true,
                            'storeData': false
                        };
                        var cdrData = {
                            'pageId': loadingPageId,
                            'displayType': 1,
                            'displayResult': 0
                        };
                        coreUtils.cdrService(cdrConfig, cdrData);
                    }
                    count = count + 1;
                    if (count == j && null  != deferred) {
                        $timeout(function() {
                            deferred.resolve();
                        });
                    }
                }
                ;
                $interval(executeFunction, 10, j, this.loadKey);
            }
            ;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'pvctrl';
            scope.init();
        }
    };
}
]);
