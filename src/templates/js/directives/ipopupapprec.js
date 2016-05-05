uiCore.directive('ipopupapprec', [function() {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div ng-click="link()" ccid="c60_fbar_tanchuang_bottom" class="c60_fbar_tanchuang_bottom">' +
        '<div class="c60_fbar_guess_mark_coin c60_fbar_clearfloat"><div class="c60_fbar_guess_mark_img" ng-style="compData.JS.guess_mark_img.CSS"></div><div class="c60_fbar_mark_txt"><div class="c60_fbar_mark_big_txt" ng-bind="compData.JS.mark_big_txt.text"></div><div class="c60_fbar_mark_small_txt" ng-bind="compData.JS.mark_small_txt.text"></div></div></div>' +
        '<div class="c60_fbar_tuisong_name c60_fbar_clearfloat"><span class="c60_fbar_tuisong_name_txt" ng-bind="compData.JS.tuisong_name_txt.text"></span></div></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                'CSS': {},
                'JS': {

                }
            };
            $scope.link = function() {
                //add by h00278783 点击弹框，上报状态消息-----------start---
                if (top.tlbs.messageid != "") {
                    coreService.fireEvent($scope.cid, 'messagestatuschange', {
                        "messageid": top.tlbs.messageid
                    });
                }
                //add by h00278783 点击弹框，上报状态消息-----------end---
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.tanchuang_bottom.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'linkapp'),
                        'iseComp': '1'
                    };
                    coreUtils.cdrService($scope.compData.JS.tanchuang_bottom.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), 'linkapp');

            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.CSS = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $element.css(properties.CSS);
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

        }

        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ipopupapprec';
            scope.init();
        }
    };
}
]);
