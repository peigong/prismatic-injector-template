uiCore.directive('iappsearch', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template:
        '<div>'
        + '<div class="c60_fbar_search">'
        + '<div class="c60_fbar_search_box">'
        + '<form class="c60_fbar_search_innerbox">'
        + '<div class="c60_fbar_search_text">'
        + '<input id="searchinput" type="text" name="fname" ng-model="searchkeys" class="c60_fbar_search_input1" placeholder="搜索应用"/>'
        + '</div>'
        + '<div class="c60_fbar_search_submit">'
        + '<input type="submit" ccid="c60_fbar_search_submit" class="c60_fbar_search_input2" ng-click="submit()"/>'
        + '</div>'
        + '</form>'
        + '</div>'
        + '</div>'
        + '</div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.changeStyle = function() {

            }

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                angular.element($element[0].querySelector(".c60_fbar_search")).css($scope.compData.CSS || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;

            $scope.searchkeys = "";

            $scope.queryWoChain = function(param) {
                if (param && param.respparam) {
                    $scope.queryWoChain1 = param.respparam.session;
                }
            }
            ;

            $scope.submit = function() {
                var url1 = $scope.compData.JS.searchurl.iframeurl;
                if ($scope.queryWoChain1) {
                    if ($scope.queryWoChain1.auth == null  || $scope.queryWoChain1.auth == undefined) {
                        $scope.queryWoChain1.auth = "";
                    }
                    if ($scope.queryWoChain1.jsessionid == null  || $scope.queryWoChain1.jsessionid == undefined) {
                        $scope.queryWoChain1.jsessionid = "";
                    }
                    url1 = url1.replace("{jsessionid}", $scope.queryWoChain1.jsessionid);
                    url1 = url1.replace("{auth}", $scope.queryWoChain1.auth);

                } else {
                    url1 = url1.replace("{jsessionid}", "");
                    url1 = url1.replace("{auth}", "");
                }

                //mod by y00131156 at 20150821  begin
                //用户输入需要调用后台服务加密
                if ($scope.compData.JS.encodeflag != '0') {
                    var onSuccess = function(data, status, headers) {
                        url1 = url1.replace("{searchkeys}", (data.respparam.appsearch || {}).encodedstr || '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    var onError = function() {
                        url1 = url1.replace("{searchkeys}", '');
                        coreService.fireEvent($scope.cid, 'urltranslate', {
                            "url": url1
                        });
                    }
                    ;
                    coreUtils.sendRequest($scope.compData.JS.encodeservcie || 'encodeservice', {
                        'str': encodeURI($scope.searchkeys),
                        'encodetype': $scope.compData.JS.encodetype || 'DES'
                    }, onSuccess, onError);
                } else {
                    url1 = url1.replace("{searchkeys}", $scope.searchkeys);
                    coreService.fireEvent($scope.cid, 'urltranslate', {
                        "url": url1
                    });
                }

                //url1=url1.replace("{searchkeys}",$scope.searchkeys);
                //coreService.fireEvent($scope.cid,'urltranslate',{"url":url1});
                //mod by y00131156 at 20150821  end
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'sub')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_search_submit.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
            }
            $scope.hide = function() {
                $scope.compData.CSS.display = 'none';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.show = function() {
                $scope.compData.CSS.display = 'block';
                $element.css($scope.compData.CSS);
            }
            ;
            $scope.eventMap['querywo1'] = $scope.queryWoChain;
            $scope.eventMap['hide'] = $scope.hide;
            $scope.eventMap['show'] = $scope.show;
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
            $scope.componentType = 'iappsearch';
            $scope.init();
        }
    }
}
]);
