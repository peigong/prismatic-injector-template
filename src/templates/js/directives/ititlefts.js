uiCore.directive('ititlefts', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        scope: {
            param: '=param'
        },
        template: '<div {{param}}><imageholder cid="titleimage" ng-show="compData.JS.titleimageconfigflag" param="compData.JS.titleimageconfig"></imageholder><irichtext cid="titletext" param="compData.JS.titletextconfig"></irichtext></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                CSS: {
                    "z-index": "2047483648",
                    position: "relative",
                    width: "100%",
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    height: "2.4em",
                    "line-height": "2.4em",
                    "text-align": "left",
                    "padding-left": "2.3em",
                    "border-bottom-width": "1px",
                    "border-bottom-style": "solid",
                    "border-bottom-color": "rgb(214,214,214)",
                    background: "rgb(248,248,248)",
                    "-webkit-box-sizing": "border-box",
                    "-moz-box-sizing": "border-box",
                    "box-sizing": "border-box"
                },
                JS: {
                    clickable: false,
                    stateconfig: {
                        state: "0"
                    },
                    titleimageconfig: {
                        CSS: {},
                        JS: {
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    titletextconfig: {
                        CSS: {
                            "text-align": "left",
                            color: "rgb(34,34,34)",
                            display: "block",
                            "font-size": "1em",
                            height: "2.4em",
                            "line-height": "2.4em"
                        },
                        JS: {
                            clickable: false,
                            stateconfig: {
                                state: "0"
                            }
                        }
                    }

                }
            };
            $scope.setEvents = function() {
                if ($scope.compData.JS.clickable) {
                    var _touchstart = Const.touchEvent.start;
                    var _touchmove = Const.touchEvent.move;
                    var _touchend = Const.touchEvent.end;
                    var _lastYPos = 0;
                    var _lastXPos = 0;
                    var _currentYPos = 0;
                    var _currentXPos = 0;
                    $element.bind(_touchend, function(e) {
                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.cdrConfig)) {
                            $scope.compData.JS['cdrData'] = {};
                            $scope.compData.JS.cdrData = {
                                'pageId': $scope.pageID,
                                'componentId': coreUtils.createCdrid($scope.pageID, "", 'returnback')
                            };
                            coreUtils.cdrService($scope.compData.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                        }
                        coreService.fireEvent($scope.cid, 'click' + $scope.compData.JS.stateconfig.state);
                    });
                }
            }
            ;

            $scope.setState = function(data) {
                $scope.compData.JS.stateconfig.state = data.state;
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
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.applyStyle();
                $scope.setEvents();
            }
            ;

            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                //用于appbar有subscribeid时
                //                        if(top.subscribeid1){
                //                        $element.css({'padding-left':'0','left':'.7em','top':'.5em'});
                //                        }
            }
            ;

            $scope.$watch($scope.param, function(newValue) {
                if ($scope.param) {
                    $scope.compData = $scope.param;
                    $scope.applyStyle();
                }
            });
            $scope.updateTitleText = function(titleTextData, deferred) {
                $scope.compData.JS.titletextconfig.JS.textdata = titleTextData.stitle;
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;

            $scope.eventMap['updateState'] = $scope.setState;
            $scope.eventMap['updateTitleText'] = $scope.updateTitleText;
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
            $scope.componentType = 'ititlefts';
            $scope.init();
        }
    };
}
]);
