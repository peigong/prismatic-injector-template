uiCore.directive('sitenavigation', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: ' <div class="c60_fbar_sitenavigation" ng-style="getConfigStyle({sitenavigation:1})">'
        + ' <div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()">'
        + ' <div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div>'
        + ' <div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div>'
        + ' <div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn">'
        + ' <a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a>'
        + ' </div>'
        + ' </div>'
        + ' <div class="tbholder c60_fbar_navigation">'
        + ' <div class="c60_fbar_navigation_site" simplescroll>'
        + '	<div class="c60_fbar_navigation_site_detail">'
        + ' <ul class="c60_fbar_navigation_ul c60_fbar_clearfloat">'
        + ' <li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="site in sites" ng-click="navigate(site.weblink,site.linktype)">'
        + ' <div class="c60_fbar_site_detail">'
        + ' <img class="c60_fbar_navigation_ul_img" ng-src="{{site.iconurl}}" alt=""/>'
        + ' <p class="c60_fbar_navigation_ul_txt">{{site.title}}</p>'
        + ' </div>'
        + ' </li>'
        + ' </ul>'
        + ' </div>'
        + ' </div>'
        + ' </div>'
        + ' </div>',

        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {
                CSS: {},
                JS: {}
            };
            $scope.eventMap = {};

            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData = coreUtils.extendDeep($scope.compData || {}, properties);
                $scope.paddingtop = $scope.compData.JS.sitenavigation.CSS;
                //                    $element.css($scope.compData.css || {});
                //                    coreService.fireEvent($element.attr('cid'), 'init');
                //                coreService.fireEvent($element.attr('cid'),'sitenavigation');
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

            $scope.updateData = function(param) {
                if (param != null  && param != undefined && param.respparam != null  && param.respparam != undefined) {
                    $scope.respData = param.respparam;
                    if ($scope.respData.website != null  && $scope.respData.website != undefined && $scope.respData.website.length > 0) {
                        $scope.sites = $scope.respData.website;

                        $scope.showSuccess();
                        for (var i = 0; i < $scope.sites.length; i++) {
                            var sites = $scope.sites;
                            var l = Math.ceil(sites.length / 3);
                            $scope.len1 = $scope.len1 + l * 5.5;
                        }
                        angular.element($element[0].querySelector('.c60_fbar_navigation_site')).attr('totalheight', $scope.len1 * 16 + "px");
                    } else {
                        $scope.showError();
                        return false;
                    }
                } else {
                    $scope.showError();
                    return false;
                }
            }
            ;

            $scope.navigate = function(linkUrl, linkType)
            {
                if (linkType == undefined || linkType == 0) {
                    window.open(linkUrl);
                } else {
                    coreService.fireEvent($element.attr('cid'), 'gotoPage', {
                        "linktype": linkType,
                        "url": linkUrl
                    });
                }
            }
            ;

            $scope.getConfigStyle = function(input) {
                var classname;
                for (item in input) {
                    classname = item;
                    break;
                }
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;

            $scope.getapp_result_conStyle = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    if ($scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status == 0) {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status0;
                    } else {
                        return $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status1;
                    }
                }
            }
            ;

            $scope.appresulturl = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var imgUrl = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].imgUrl;
                    return imgUrl.replace(/'/g, '');
                }
            }
            ;

            $scope.appresulttxt = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var btntxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].btntxt;
                    return btntxt;
                }
            }
            ;
            $scope.appresulttips = function() {
                if ($scope.compData.JS && $scope.compData.JS.c60_fbar_app_result_con) {
                    var status = 'status' + $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig.status;
                    var tipstxt = $scope.compData.JS.c60_fbar_app_result_con.JS.statusconfig[status].tipstxt;
                    return tipstxt;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 1;
                $scope.compData.JS.sitenavigation.CSS = {
                    'padding-top': '6em'
                };
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'none'
                });
                //coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;

            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 0;
                $scope.compData.JS.sitenavigation.CSS = $scope.paddingtop;
                $element.css($scope.compData.JS.sitenavigation.CSS);
                angular.element($element[0].querySelector('.c60_fbar_navigation_site')).css({
                    'display': 'block'
                });
                //   coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.returnclick = function() {
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, '', 'goFirstPage')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'goFirstPage');
            }
            ;
            $scope.eventMap['update'] = $scope.updateData;
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
