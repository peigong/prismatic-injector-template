uiCore.directive('popupfeedback', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template:
        '<div style="display:none;">'
        + '	  <div class="c60_fbar_bg_pop_block" ng-style="getbg_pop_blockStyle()" ng-click="$event.stopPropagation();"></div>'
        + '    <div class="c60_fbar_new_center_pop">'
        + '        <div class="c60_fbar_ncp_top">'
        + '        	<div class="c60_fbar_ncp_tit">'
        + '                <span class="c60_fbar_ncp_tit_txt" ng-bind="compData.JS.c60_fbar_ncp_tit_txt.JS.text"></span>'
        + '                <span class="c60_fbar_ncp_tit_close" ccid="class="c60_fbar_ncp_tit_close" ng-click="c60_fbar_ncp_tit_closeClick()"></span>'
        + '            </div>'
        + '        <div style="height:12em;">'
        + '        	<div class="c60_fbar_ncp_bottom" simplescroll>'
        + '            	<div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text0"></span><span ng-bind="respData.feedback.question"></span></div>'
        + '                <div class="c60_fbar_ncpb_txt"><span ng-bind="compData.JS.c60_fbar_ncpb_txt.JS.text1"></span><span class="c60_fbar_hwlfeedback"></span></div>'
        + '            </div>'
        + '        </div>'

        + '        </div>'
        + '    </div>'
        + '</div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", "$timeout", 'coreService', 'coreUtils', 'Const', "$sce",
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.eventMap = {};
            $scope.respData = {};
            $scope.trustAsHtml = function(text) {
                return $sce.trustAsHtml(text);
            }
            ;
            $scope.c60_fbar_ncp_tit_closeClick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'closebtn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_ncp_tit_close.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                top.tlbs.notificationCdrData = null ;
                $scope.hide();
            }
            ;
            $scope.getbg_pop_blockStyle = function() {
                if ($scope.compData.JS.bg_pop_block.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.bg_pop_block.JS.stateconfig.state1;
                }
            }
            ;

            //获取后台数据
            $scope.updateData = function(param) {
                if (param != null  && param != undefined) {
                    $scope.respData = param;
                    $element.css({
                        'display': 'block'
                    });
                    $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 1;
                    angular.element($element[0].querySelector('.c60_fbar_hwlfeedback')).html(param.feedback.answer);
                }
            }
            ;
            $scope.eventMap['update'] = $scope.updateData;
            $scope.hide = function() {
                $scope.compData.JS.bg_pop_block.JS.stateconfig.state = 0;
                $element.css({
                    'display': 'none'
                });
            }
            ;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
                /*$timeout(function() {
		                        $scope.$apply();
		                    });*/
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
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
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'popupfeedback';
            $scope.init();
        }
    }
}
]);
