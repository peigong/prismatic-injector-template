uiCore.directive('iapplink', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div id="mainholder" ccid="mainholder"><ul class="c60_fbar_app_list"><li id="innerholder" ccid="c60_fbar_gcapplink" ng-style="getInnerholderStyle(app.JS.id)" ng-repeat="app in arrays" ng-click="appLinkClick(app.JS.id)"><div id="c60_fbar_appwrap" class="c60_fbar_appwrap" ng-style="getappwrapstyle()"><div class="c60_fbar_appimgwrap" ng-style="getConfigStyle(app.JS.id)"><div class="c60_fbar_app_textwrap" style="width:53%;float:right"><h5 id="appname" ng-style="getStyles(\'appname\')">{{app.JS.appname.JS.text}}</h5><p id="appdesc"  ng-style="getStyles(\'appdesc\')">{{app.JS.appdesc.JS.text}}</p></div></div></div></li></ul></div>',
        scope: {
            param: '=param'
        },
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.classid = '.' + $scope.cid;
            $scope.eventMap = {};
            $scope.compData = {};
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
                $scope.arrays = [];
                if ($scope.compData && $scope.compData.JS) {
                    var len = $scope.compData.JS.text.JS.len;
                    for (var i = 0; i < len; i++) {
                        $scope.arrays.push($scope.compData.JS[($scope.compData.JS.text.JS["text" + i])]);
                    }
                }
            }
            ;
            $scope.getappwrapstyle = function() {
                if ($scope.arrays.length == 1) {
                    return {
                        'width': '53%',
                        'margin': '0 auto'
                    }
                } else {
                    return {
                        'width': '100%',
                        'margin': '0 auto'
                    }
                }
            }
            ;
            $scope.getInnerholderStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        return $scope.compData.JS[input].JS.innerholder.CSS;
                    }
                }
            }
            ;
            $scope.getStyles = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].CSS) {
                        return $scope.compData.JS[input].CSS;
                    }
                }
            }
            ;
            $scope.getConfigStyle = function(input) {
                if (input) {
                    if ($scope.compData.JS[input] && $scope.compData.JS[input].JS) {
                        /*if($scope.arrays.length == 1){
	                        		$scope.compData.JS[input].JS.iconholder.CSS['background-position']='18% 40%';
	                        	}*/
                        return $scope.compData.JS[input].JS.iconholder.CSS;
                    }
                }
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
            }
            ;
            $scope.appLinkClick = function(name) {
                if (name) {
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS[name].JS.mainholder.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, name)
                        };
                        coreUtils.cdrService($scope.compData.JS[name].JS.mainholder.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($scope.cid, name + 'Click');
                }
            }
            ;
            $scope.processConfig = function() {
                if ($scope.compData && $scope.compData.JS) {
                    //mainholder
                    $element.css($scope.compData.CSS);
                    //innerholder
                    //angular.element($element[0].querySelector('[id="innerholder"]')).css($scope.compData.JS.innerholder.CSS);
                    //iconholder
                    //angular.element($element[0].querySelector('[id="iconholder"]')).css($scope.compData.JS.iconholder.applink.CSS);
                    //appname
                    angular.element($element[0].querySelector('[id="appname"]')).css($scope.compData.JS.appname.CSS);
                    //appdesc
                    angular.element($element[0].querySelector('[id="appdesc"]')).css($scope.compData.JS.appdesc.CSS);
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
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
            $scope.eventMap['show'] = $scope.show;
            $scope.eventMap['hide'] = $scope.hide;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'iapplink';
            scope.init();
        }
    };
}
]);
