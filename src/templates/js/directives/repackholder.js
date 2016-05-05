uiCore.directive('repackholder', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        scope: {},
        template: '<div class=" c60_fbar_taocan_tj"><div class="c60_fbar_sytips"><h1 class="c60_fbar_sytips_title"><span ng-bind-html="to_trusted(desc[0])"></span><b></b></h1><p class="c60_fbar_sytips_desc" ng-bind-html="to_trusted(desc[1])"></p></div>' +
        '<div class="c60_fbar_package"><div style="overflow:hidden">' +
        '<pack ppid="pageID" taskid="taskId" ecid=cid recommandations=recommandations stateconfig="{{::compData.JS.config}}" config="{{::compData.js}}"  ng-repeat="pack in recommandations" pack-color="pack.color" packid="pack.id" pack-name="pack.categoryname" pack-price="pack.price" pack-total="pack.value"></pack>' +
        '</div>' +
        '<div class="c60_fbar_package_more" ng-show="compData.js.moreflag.isShow"><a class="c60_fbar_package_more_a" ng-click="toPackageStore()" ng-bind="compData.JS.config.recommandationtitle"></a></div>' +
        '</div></div>',
        controller: [
        "$scope",
        "$element",
        "$attrs",
        'coreService',
        'coreUtils',
        'Const',
        "$compile",
        "$sce",
        function($scope, $element, $attrs, coreService, coreUtils,
        Const, $compile, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'JS': {
                    'config': {
                        'packages': {
                            'margin-left': '0%',
                            'float': 'none',
                            'margin': '0 auto'
                        },
                    }
                },
                'CSS': {}

            };
            $scope.eventMap = {};
            $scope.recommandations = [];
            $scope.taskId = null ;
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.getDatavalue = function(comboProperies) {
                if (comboProperies) {
                    for (var j = 0; j < comboProperies.length; j++) {
                        if (comboProperies[j]) {
                            if (comboProperies[j].key == "2") {
                                return comboProperies[j].value
                            }
                        }
                    }
                }
                return '';
            }
            ;
            $scope.show = function() {
                if ($scope.recommandations.length > 0) {
                    setTimeout(function() {
                        coreService.fireEvent($element.attr('cid'), 'initfinished');
                    }, Number($scope.compData.js.showdelay || 1000));
                }
            }
            ;

            $scope.update = function(data) {
                if (data) {
                    var desc = data.respparam.desc || "";
                    $scope.taskId = data.respparam.taskId;
                    var descArray = desc.split('|');
                    $scope.desc = descArray;
                    var recommandations = data.respparam.recommandations;
                    //此变量用于判断是否有套餐数
                    $scope.recommandationlen = recommandations.length;
                    var temp = [];
                    var list = [];
                    var revData = $scope.revData;
                    var isnull = function(obj) {
                        for (var n in obj) {
                            return true
                        }
                        return false;
                    }
                    ;
                    var listTest = []
                      ,
                    m = 0;
                    for (var i = 0; i < recommandations.length; i++) {
                        list = recommandations[i].list;
                        for (var li = 0; li < list.length; li++) {
                            var value = $scope.getDatavalue(list[li].comboProperies);
                            listTest[m] = {
                                'categoryname': recommandations[i].categoryname || '',
                                'value': value,
                                'price': list[li].price || '',
                                'id': list[li].id
                            };
                            m++;
                        }
                    }
                    var len = Math.min($scope.compData.js.packnum, listTest.length);
                    for (var r = 0; r < len; r++) {

                        $scope.recommandations[r] = listTest[r];
                        $scope.recommandations[r].color = $scope.compData.js.packcolor['color' + r] || ' ';
                    }
                    //coreService.fireEvent($element.attr('cid'), 'initfinished');
                    var cdrConfig = {
                        'cdrType': 'uinotiftracingcdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'taskId': $scope.taskId,
                        'componentId': 'c60_fbar_p_package',
                        'pageId': $scope.pageID,
                        'message': '',
                        'sresptime': '',
                        'functionid': ''
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                }
                if ($scope.recommandationlen > 0) {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title1;
                    }

                } else {
                    if ($scope.compData.js.packagestore) {
                        $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                    }
                }
                $scope.show();
            }
            ;
            $scope.toPackageStore = function() {
                coreService.fireEvent($element.attr('cid'), 'topackagestore');
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.js = properties.JS || {};
                if ($scope.compData.js.packagestore) {
                    $scope.compData.JS.config.recommandationtitle = $scope.compData.js.packagestore.title2;
                }
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            $scope.$on($attrs['cid'] + '_handleEvent', function(event,
            cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.update;
            $scope.eventMap['show'] = $scope.show;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'repackholder';
            $scope.init();
        }

    }

}
]);
