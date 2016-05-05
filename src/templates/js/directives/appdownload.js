uiCore.directive('appdownload', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_appdownload" ng-style="getConfigStyle({appdownload:1})">' + '<div class="c60_fbar_app_result_con" ng-style="getapp_result_conStyle()">' + '<div class="c60_fbar_succ_img_con"><img class="c60_fbar_succ_img"  ng-src="{{appresulturl()}}"/></div>' + '<div class="c60_fbar_tips_txt" ng-bind="appresulttips()"></div>' + '<div class="c60_fbar_result_btn" ccid="c60_fbar_link_btn"><a class="c60_fbar_link_btn" ng-bind="appresulttxt()" ng-click="returnclick()"></a></div>' + '</div>' + '<div class="tbholder c60_fbar_download">' + '    <div class="c60_fbar_download_app" simplescroll>' + '        <div class="c60_fbar_download_app_list" ng-repeat="appCategory in appCategorys">' + '        	<div class="c60_fbar_download_app_list_title c60_fbar_clearfloat">' + '            	<span class="c60_fbar_dalt_colorline" ng-style="getColorStyle($index)"></span>' + '                <span class="c60_fbar_dalt_txt">' + '					<span class="c60_fbar_dalt_txt_tit">{{appCategory.categoryName}}</span>' + '					<span class="c60_fbar_dalt_txt_name" ng-style="getTxtStyle($index)">{{appCategory.description}}</span></span>' + '                 <a class="c60_fbar_dalt_link" ccid="c60_fbar_dalt_link" ng-style="getStyle()" ng-click="more(appCategory.appCategoryID,$index)" ng-bind="compData.JS.more.JS.text"></a>' + '           </div>' + '           <div class="c60_fbar_download_app_list_detail">' + '           	<ul class="c60_fbar_dald_ul c60_fbar_clearfloat">' + '               	<li class="c60_fbar_dald_li" ccid="c60_fbar_dald_li" ng-repeat="app in appCategory.apps" ng-click="download(app.link,app.iappID)">' + '                   	<img class="c60_fbar_dald_ul_img" ng-src="{{app.logourl}}" alt=""/>' + '                       <p class="c60_fbar_dald_ul_txt">{{app.appName}}</p>' + '                   </li>' + '               </ul>' + '           </div>' + '       </div>' + '  </div>' + '</div>' + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.compData = {};
            $scope.eventMap = {};
            $scope.len1 = 7.2;
            $scope.download = function(link, iappID) {
                if (link != null  && link != undefined && link != "" && iappID != null  && iappID != undefined) {
                    window.open(link);
                    coreService.fireEvent($element.attr('cid'), 'gaingoldcoinchain', {
                        "id": iappID
                    });
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_dald_li.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': iappID
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_dald_li.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                }
            }
            $scope.getColorStyle = function(index) {
                if (index != null  && index != undefined) {
                    if (Number(index) % 2 == 0) {
                        return $scope.compData.JS.c60_fbar_dalt_colorline_green;
                    } else {
                        return $scope.compData.JS.c60_fbar_dalt_colorline_orange;
                    }
                }
            }
            $scope.getTxtStyle = function(index) {
                if (index != null  && index != undefined) {
                    if (Number(index) % 2 == 0) {
                        return $scope.compData.JS.c60_fbar_dalt_green_txt;
                    } else {
                        return $scope.compData.JS.c60_fbar_dalt_orange_txt;
                    }
                }
            }
            $scope.getStyle = function() {
                if ($scope.compData.JS != null  && $scope.compData.JS != undefined) {
                    if ($scope.compData.JS.more.CSS.isShow == true) {
                        return $scope.compData.JS.more.CSS.show;
                    } else {
                        return $scope.compData.JS.more.CSS.hide;
                    }
                }
            }
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
            $scope.more = function(appCategoryID, index) {
                if ($scope.woChain != null  && $scope.woChain != undefined) {
                    if ($scope.woChain.auth == null  || $scope.woChain.auth == undefined || $scope.woChain.auth == "") {
                        var auth = "";
                    } else {
                        var auth = $scope.woChain.auth;
                    }
                    if ($scope.woChain.jsessionid == null  || $scope.woChain.jsessionid == undefined || $scope.woChain.jsessionid == "") {
                        var jsessionid = "";
                    } else {
                        var jsessionid = $scope.woChain.jsessionid;
                    }
                } else {
                    var auth = "";
                    var jsessionid = "";
                }
                var defaulturl = $scope.compData.JS.more.JS.link.defaulturl || '';
                var defaultstatus = $scope.compData.JS.more.JS.link.defaultstatus || '0';
                var urlLink = $scope.compData.JS.more.JS.link["url" + index] || defaulturl;
                var url = urlLink.replace("{auth}", auth);
                url = url.replace("{jsessionid}", jsessionid);
                if (Number($scope.compData.JS.more.JS.linktype["status" + index] || defaultstatus) == 1) {
                    window.open(url);
                } else {
                    coreService.fireEvent($element.attr('cid'), 'more', {
                        "url": url
                    });
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_dalt_link.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': appCategoryID
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_dalt_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }

            }
            $scope.changeStyle = function() {
                angular.element($element[0].querySelector('.tbholder .c60_fbar_download')).css({
                    "padding-top": '10em'
                });
            }
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                var properties = coreService.getInitProperties($attrs['cid']) || {};
                $scope.compData.css = properties.CSS || {};
                $scope.compData.JS = properties.JS || {};
                $scope.paddingtop = $scope.compData.JS.appdownload.CSS;
                $element.css(properties.CSS);
                //coreService.fireEvent($element.attr('cid'), 'init');
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
                    if ($scope.respData.appdownload != null  && $scope.respData.appdownload != undefined && $scope.respData.appdownload.appCategorys != null  && $scope.respData.appdownload.appCategorys != undefined && $scope.respData.appdownload.appCategorys.length > 0) {
                        $scope.appCategorys = [];
                        var len = $scope.respData.appdownload.appCategorys.length;
                        var count = 0;
                        for (var j = 0; j < len; j++) {
                            if ($scope.respData.appdownload.appCategorys[j].apps.length > 0) {

                                $scope.appCategorys[count] = $scope.respData.appdownload.appCategorys[j];
                                count++;
                            }
                        }
                        if ($scope.appCategorys.length == 0) {
                            $scope.showError();
                            return false;
                        }
                        $scope.showSuccess();
                        for (var i = 0; i < $scope.appCategorys.length; i++) {
                            var app = $scope.appCategorys[i].apps;
                            var l = Math.ceil(app.length / 5);
                            $scope.len1 = $scope.len1 + l * 5.5;
                        }
                        angular.element($element[0].querySelector('.c60_fbar_download_app')).attr('totalheight', $scope.len1 * 16 + "px");
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
            $scope.gainGoldCoin = function(param) {
                if (param && param.respparam) {
                    $scope.gainGoldCoin = param.respparam;
                }
            }
            ;
            $scope.queryWoChain = function(param) {
                if (param && param.respparam) {
                    $scope.woChain = param.respparam.session;
                }
            }
            ;
            $scope.showError = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 1;
                $scope.compData.JS.appdownload.CSS = {
                    'padding-top': '5em'
                };
                $element.css($scope.compData.JS.appdownload.CSS);
                angular.element($element[0].querySelector('.c60_fbar_download_app')).css({
                    'display': 'none'
                });
                coreService.fireEvent($element.attr('cid'), 'showerror');
            }
            ;
            $scope.showSuccess = function() {
                $scope.compData.JS.c60_fbar_app_result_con.JS.showconfig.status = 0;
                $scope.compData.JS.appdownload.CSS = $scope.paddingtop;
                $element.css($scope.compData.JS.appdownload.CSS);
                angular.element($element[0].querySelector('.c60_fbar_download_app')).css({
                    'display': 'block'
                });
                coreService.fireEvent($element.attr('cid'), 'showsucc');
            }
            ;
            $scope.error = function() {
                $scope.showError();
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
            $scope.eventMap['change'] = $scope.changeStyle;
            $scope.eventMap['gaingoldcoin'] = $scope.gainGoldCoin;
            $scope.eventMap['querywo'] = $scope.queryWoChain;
            $scope.eventMap['error'] = $scope.error;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
            $scope.path = top.tlbs.templatePath;
            $scope.init();
        }
    }
}
]);
