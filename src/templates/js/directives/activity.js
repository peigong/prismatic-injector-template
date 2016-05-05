uiCore.directive('activity', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div><div class="c60_fbar_activitywrapper">' + '<div class="c60_fbar_wrapper1">' + '<div class="c60_fbar_activity" simplescroll>'

        + '<div class="c60_fbar_taocan_result_con">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img_act"  ng-src="{{compData.JS.statusconfig.status.imgUrl}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="compData.JS.statusconfig.status.tipstxt"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="compData.JS.statusconfig.status.btntxt" ng-click="returnclick()"></a></div>' + '</div>'

        + '<ul class="c60_fbar_imgTitleDescList">' + '<li ng-repeat="imgTitleDesc in compData.JS.imgTitleDescs | objectSort: \'priority\'" ng-class="{\'c60_fbar_imgTitleDesc\':true}">' + '<a ng-click="imageclick(imgTitleDesc,$index)" ccid="c60_fbar_link_click"><img ng-src="{{imgTitleDesc.imageurl}}" ng-class="{\'c60_fbar_imgTitleDesc-Img\':true}"/></a>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Title\':true}" ng-bind="imgTitleDesc.title"></p>' + '<p ng-class="{\'c60_fbar_imgTitleDesc-Desc1\':true}" ng-bind="imgTitleDesc.description"></p></li>' + '</ul>' + '</div>' + '</div>' + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};


            $scope.updateData = function(param) {
                if (param.respparam) {
                    if (param.respparam.advertisement.maxprioritylist && param.respparam.advertisement.maxprioritylist.length > 0) {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'none'
                        });
                        $scope.compData.JS.imgTitleDescs = [];
                        $scope.temp = [param.respparam.advertisement.maxprioritylist || [], param.respparam.advertisement.minprioritylist || []];
                        for (var i = 0; i < $scope.temp.length; i++) {
                            for (var j = 0; j < $scope.temp[i].length; j++) {
                                $scope.compData.JS.imgTitleDescs.push($scope.temp[i][j]);
                            }
                        }
                    } else {
                        angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                            'display': 'block'
                        });
                    }
                }
            }
            ;

            $scope.errorupdate = function() {
                angular.element($element[0].querySelector('.c60_fbar_imgTitleDescList')).css({
                    'display': 'none'
                });
                angular.element($element[0].querySelector('.c60_fbar_taocan_result_con')).css({
                    'display': 'block'
                });
            }
            ;

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                var imgUrl = properties.JS.statusconfig.status.imgUrl;
                properties.JS.statusconfig.status.imgUrl = imgUrl.replace(/'/g, '');
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;

            $scope.returnclick = function() {

                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;

            $scope.imageclick = function(imgTitleDesc, index) {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': imgTitleDesc.CONTENTID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_click.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }

                coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                    linktype: imgTitleDesc.linktype,
                    url: imgTitleDesc.weblink
                });
            }

            $scope.$on($attrs['cid'] + '_handleEvent', function(event, cevent, args, deferred) {
                if ($scope.eventMap[cevent]) {
                    $scope.eventMap[cevent](args);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            });
            $scope.eventMap['update'] = $scope.updateData;
            $scope.eventMap['errorupdate'] = $scope.errorupdate;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.init();
        }
    }
}
]);
