uiCore.directive('ipopuppkgrec', [function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {},
        require: '^pid',
        template: '<div class="c60_fbar_tanchuang_bottom">'
        + '<div class="c60_fbar_tanchuangpkgrec_wrapper"  ng-show="pkgflag"><div style="overflow:hidden" simplescroll><ipoppack ecid="cid" config="{{::compData.JS}}" ppid="pageID" ng-repeat="ipack in packagelist" taskid="taskId" ipack=ipack></ipoppack></div></div>'
        + '<div class="c60_fbar_tuisong_name clearfloat" ng-show="pkgflag"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div>'
        + '<div class="c60_fbar_mainpkg" ng-show="!pkgflag"><ul class="c60_fbar_mainpkg_list">'
        + '<li ng-click="liCkick(mainpkg.id);" ng-repeat="mainpkg in pmdata" ccid="c60_fbar_mainpkgtj">'
        + '<div class="c60_fbar_mainpkg_title c60_fbar_clearfloat"><div class="c60_fbar_mainpkg_title_type" style="background:{{mainpkg.color}}" ng-bind="mainpkg.text"></div><div class="c60_fbar_mainpkg_title_price" ><div class="c60_fbar_mainpkg_title_pricebgcolor" style="background:{{mainpkg.color}}"></div><span class="c60_fbar_mainpkg_title_price_color" ></span></div></div>'
        + '<div class="c60_fbar_mainpkg_title_names" ng-bind="mainpkg.name"></div>'
        + '<div  class="c60_fbar_mainpkg_txt"><div class="c60_fbar_mainpkg_txt_scroll" ng-bind-html="to_trusted(mainpkg.desc)" simplescroll></div></div>'
        + '</li></ul></div></div>',

        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils',
        'Const', "$compile", '$interval', '$sce',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $compile, $interval, $sce) {

            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.pkgflag = true;
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
            $scope.update = function(param) {
                $scope.taskId = param.taskId;
                if (param.pmdata) {
                    $scope.pkgflag = false;
                    var pmdata = param.pmdata;
                    $scope.pmdatas = param.pmdata;
                    $scope.ptaskId = param.pmdata.taskId;
                    if ($scope.compData.JS.colorconfig) {
                        pmdata.currentpackage.color = $scope.compData.JS.colorconfig['color0'];
                        pmdata.recommandpackage.color = $scope.compData.JS.colorconfig['color1'];
                    }
                    if ($scope.compData.JS.textconfig) {
                        pmdata.currentpackage.text = $scope.compData.JS.textconfig['text0'];
                        pmdata.recommandpackage.text = $scope.compData.JS.textconfig['text1'];
                    }

                    $scope.pmdata = [pmdata.currentpackage || {}, pmdata.recommandpackage || {}];

                } else {
                    $scope.pkgflag = true;
                    var colorconfig = $scope.compData.JS.colorconfig;
                    var packagelist = param.packagelist || [];
                    var list = [];
                    var value = [];
                    var temp = [];
                    for (var i = 0, len = packagelist.length; i < len; i++) {
                        list = packagelist[i].list;
                        for (var j = 0, llen = list.length; j < llen; j++) {
                            var isnull = function(obj) {
                                for (var n in obj) {
                                    return true
                                }
                                return false;
                            }
                            ;
                            if (isnull(list[j])) {
                                if (isnull(list[j].comboProperies)) {
                                    for (var x = 0; x < list[j].comboProperies.length; x++) {

                                        if (list[j].comboProperies[x].key == '2') {
                                            list[j].value = list[j].comboProperies[x].value;
                                        }

                                    }
                                }
                                list[j].categoryname = packagelist[i].categoryname;
                                list[j].eid = $scope.cid;
                                list[j].color = colorconfig['color' + i];
                                temp.push(list[j]);
                            } else {

                            }
                        }
                    }

                    $scope.packagelist = temp;
                }

            }
            ;
            $scope.liCkick = function(id) {
                if (top.tlbs.popupTxtMove == true) {
                    return;
                }
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.flux_bag_recomm.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': id,
                        'taskId': $scope.taskId,
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.flux_bag_recomm.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                var titlephone = $scope.compData.JS.phonetitle || '存费送机';
                var titlefee = $scope.compData.JS.feetitle || '存费送费';
                coreService.fireEvent($scope.cid, 'storefee', {
                    'pmdatas': $scope.pmdatas,
                    'pmdata': $scope.pmdata,
                    'taskId': $scope.ptaskId,
                    'linktype': $scope.compData.JS.linkconfig.linktype || '2',
                    'url': $scope.compData.JS.linkconfig.url || 'istorefee',
                    'stitle': $scope.pmdatas.isoffer == true || $scope.pmdatas.isoffer == 'true' ? titlephone : titlefee
                });
            }
            ;
            $scope.eventMap['update'] = $scope.update;
            $scope.extendComponentData = function(componetData) {
                coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.CSS || {});
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
            }
            ;

            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopuppkgrec';
            scope.init();
        }
    };
}
]);
