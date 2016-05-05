uiCore.directive('storefee', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_feewrapdiv"><div class="c60_fbar_feewrap">'
        + '<div class="c60_fbar_feecontentwrap" >'
        + '<div class="c60_fbar_feecons" ng-repeat="fee in feepkg">'
        + '<div class="c60_fbar_feecon_title c60_fbar_clearfloat"><div class="c60_fbar_feecon_title_type ng-binding" style="background:{{fee.ccolor}}" ng-bind="fee.text==\'当前\'?fee.text:\'B\'"></div><div class="c60_fbar_feecon_title_price" style="background:{{fee.ccolor}}"><span class="c60_fbar_feecon_title_price_color" ><span class="c60_fbar_feecon_title_price_left_color" ng-bind="fee.name"></span><span class="c60_fbar_feecon_title_price_right_color" ng-bind="compData.JS.priceunit.value+fee.price"></span></span></div></div>'
        + '<div class="c60_fbar_feecon_comwrap"><div ng-show="fee.comboProperies.length>0?true:false" class="c60_fbar_feecon_txt" ng-repeat="com in fee.comboProperies" ng-bind="compData.JS.keyconfig[com.key].key+\':\'+com.value" ng-style="compData.JS.cssconfig[fee.comboProperies.length].CSS"></div><div class="c60_fbar_feecon_effecttype" ng-show="fee.effecttype!=undefined&&fee.effecttype!=null&&fee.effecttype!=\'\'" ng-bind="compData.JS.effectconfig[fee.effecttype].value"></div><div class="c60_fbar_feecon_txtdesc" ng-style="compData.JS.txtdesc.CSS" ng-bind-html="to_trusted(fee.desc)"></div></div>'
        + '</div>'
        + '</div>'
        + '<div class="c60_fbar_comments" ng-bind="compData.JS.comments.text"></div></div>'
        + '<div class="c60_fbar_changeorderbtn"><button class="c60_fbar_btn_changeorderd" ccid="c60_fbar_btn_changeorderd" ng-click="changebtn()" ng-bind="btncon"></button></div>'
        + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils', '$sce',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, $sce, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            var changebtn = angular.element($element[0].querySelector('.c60_fbar_btn_changeorderd'));
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
                if (param) {

                    $scope.pmdatas = param.pmdatas || '',
                    $scope.feepkg = param.pmdata || '';
                    var ccolor = [$scope.feepkg[0].color, $scope.feepkg[1].color];
                    $scope.feepkg[0].ccolor = ccolor[1];
                    $scope.feepkg[1].ccolor = ccolor[0];
                    $scope.btncon = $scope.compData.JS.buttonconfig.text || '';
                    $scope.taskId = param.taskId || '';
                }
            }
            ;
            $scope.changebtn = function() {
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.changeorderdbtn.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.changeorderdbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($scope.cid, 'receive', {
                    'pmdata': $scope.pmdatas,
                    'taskId': $scope.taskId
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
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'storefee';
            $scope.init();
        }
    }
}
]);
