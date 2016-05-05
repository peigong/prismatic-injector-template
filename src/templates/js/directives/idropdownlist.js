uiCore.directive('idropdownlist', [
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
        template: '<div><horizontal-container param="compData.JS.sgH1" class="idropdownhorizantalline" ><horizontal-container  param="compData.JS.sgH1r1" class="idropdownhorizantalline" ><richtext param="compData.JS.sgpackeffectiveetime" ></richtext></horizontal-container><horizontal-container  param="compData.JS.sgH1r2" ><div class="idropdownlistmain" >' +
        '<select ng-click="handleClick1($event);" ng-change="handleClick();" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue" ng-options="key.name  for key in compData.JS.Dataset" ></select>' +
        '</div></horizontal-container></horizontal-container><horizontal-container param="compData.JS.sgH2" class="idropdownhorizantalline" ng-show="isShowSecondList"><horizontal-container param="compData.JS.sgH2r1" class="idropdownhorizantalline"  ><richtext param="compData.JS.sgpackeffectiveetime1"  ></richtext></horizontal-container><horizontal-container param="compData.JS.sgH2r2"  ><div class="idropdownlistmain" >' +
        '<select ng-click="handleClick2($event);" class="ui_com_second_dropdown"  ng-disabled="disablelist" ng-style="compData.CSS"   ng-model="compData.JS.selectedValue2" ng-options="key as key.name for key in compData.JS.Dataset2" ></select>' +
        '</div></horizontal-container></horizontal-container></div>',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        function($scope, $element, $attrs, coreService, coreUtils) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {
                    'textdata': '',
                    'clickable': false,
                    'setflag': '1',
                    'key1': 'time',
                    'key2': 'period',
                    'selectedValue': '',
                    'selectedValue2': '',
                    'opacity': '0.2',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    "sgpackeffectiveetime": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时间:"
                        }
                    },
                    "sgpackeffectiveetime1": {
                        "CSS": {
                            "color": "#999999",
                            "font-size": "0.55em",
                            "font-family": "Microsoft Yahei",
                            "width": "100%",
                            "text-align": "center",
                            "display": "table-cell",
                            "vertical-align": "middle"
                        },
                        "JS": {
                            "text": "生效时长:"
                        }
                    },
                    'sgH1': {
                        "CSS": {},
                        "JS": {
                            "sgH1": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH1"
                        }
                    },
                    'sgH1r1': {
                        "CSS": {},
                        "JS": {
                            "sgH1r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH1r1"
                        }
                    },
                    'sgH1r2': {
                        "CSS": {},
                        "JS": {
                            "sgH1r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH1r2"
                        }
                    },
                    'sgH2': {
                        "CSS": {},
                        "JS": {
                            "sgH2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "flex",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "100%"
                            },
                            "type": "sgH2"
                        }
                    },
                    'sgH2r1': {
                        "CSS": {},
                        "JS": {
                            "sgH2r1": {
                                "border": "none",
                                "box-shadow": "none",
                                display: "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative",
                                "width": "22%",
                                "background-color": "#F6F6F6"
                            },
                            "type": "sgH2r1"
                        }
                    },
                    'sgH2r2': {
                        "CSS": {},
                        "JS": {
                            "sgH2r2": {
                                "border": "none",
                                "box-shadow": "none",
                                "display": "table",
                                "extendable": false,
                                "height": "2em",
                                "position": "relative"
                            },
                            "type": "sgH2r2"
                        }
                    },
                },
            };
            $scope.handleClick1 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick2 = function(e) {
                e.stopPropagation();
            }
            ;
            $scope.handleClick = function() {
                if ($scope.isMonthPack)
                    return;
                if ($scope.compData.JS.selectedValue.value == $scope.compData.JS.setflag) {
                    $scope.disablelist = true;
                    $scope.secondDropdown.css({
                        'opacity': $scope.compData.JS.opacity
                    });
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else {
                    $scope.disablelist = false;
                    //when switch to immediate,default value should be changed,to do this value need configuable.
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                    $scope.secondDropdown.css({
                        'opacity': '1.0'
                    });
                }
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.disablelist = false;
            $scope.isShowSecondList = true;
            $scope.clickDisable = function() {}
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                $timeout(function() {
                    $scope.$apply();
                });
            }
            ;
            $scope.getData = function(eventData) {
                $scope.edata = coreUtils.extendDeep({}, eventData);
                if ($scope.edata.isMonthPack) {
                    $scope.isMonthPack = parseInt($scope.edata.isMonthPack);
                }
                if ($scope.isMonthPack) {
                    $scope.isShowSecondList = false;
                    $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[0];
                } else
                    $scope.isShowSecondList = true;
            }
            ;
            $scope.refresh = function(eventData) {
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
                $scope.disablelist = false;
                $scope.secondDropdown.css({
                    'opacity': '1.0'
                });
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                var DatasetTemp = $scope.compData.JS.Dataset;
                var Dataset2Temp = $scope.compData.JS.Dataset2;

                $scope.compData.JS.Dataset = [];
                $scope.compData.JS.Dataset2 = [];
                for (var i in DatasetTemp) {

                    $scope.compData.JS.Dataset.push(DatasetTemp[i]);
                }
                for (var i in Dataset2Temp) {

                    $scope.compData.JS.Dataset2.push(Dataset2Temp[i]);
                }
                $scope.compData.JS.selectedValue = $scope.compData.JS.Dataset[0];
                $scope.compData.JS.selectedValue2 = $scope.compData.JS.Dataset2[1];
            }
            ;
            $scope.eventMap['data.update'] = $scope.getData;
            $scope.eventMap['refresh'] = $scope.refresh;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        compile: function(element, attributes) {
            return {
                pre: function($scope, element, attributes, $controller, transcludeFn) {
                    $scope.pageID = $controller.pageID;
                    $scope.componentType = 'idropdownlist';
                    $scope.init();

                },
                post: function($scope, $element, attributes, $controller, transcludeFn) {
                    var dropdown = $element[0].querySelector('.ui_com_second_dropdown');
                    $scope.secondDropdown = angular.element(dropdown);
                }
            }
        },

    };
}
]);
