uiCore.directive('receiveinfo', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_recevicer_info">'
        + '<div class="c60_fbar_recevicer_info_con" ng-show="infoflag">'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfoname.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.name"></span></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfomemory.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.memory"></span></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfocolor.JS.text"></div>'
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_colorcons"></div>'
        + '</div>'
        + '<div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left" ng-bind="compData.JS.receiveinfopkg.text"></div>'
        + '<div class="c60_fbar_ri_type_right"><span class="c60_fbar_ri_type_righttxt" ng-bind="offerdetails.tariff"></span></div>'
        + '</div>'
        + '</div>'
        + '<div class="c60_fbar_recevicer_info_con"><div class="c60_fbar_ri_type c60_fbar_clearfloat">'
        + '<div class="c60_fbar_ri_type_left c60_fbar_ri_type_width30" ng-bind="compData.JS.receiveinfoaddress.text"></div>'
        + '<div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65"><input type="text" ng-model="inputData" value placeholder="{{compData.JS.inputtext.text}}" class="c60_fbar_ri_type_address_input" /><div class="c60_fbar_ri_type_right c60_fbar_ri_type_width65 c60_fbar_tipstextcolor" ng-bind="compData.JS.inputtext.tips"></div></div>'
        + '</div></div>'
        + '<div class="c60_fbar_ri_banli_btn" ><span class="c60_fbar_ri_banli_btn_link" ccid="c60_fbar_ri_banli_btn_link" ng-click="confirmclick()" ng-style="compData.JS.button.CSS" ng-bind="compData.JS.button.JS.text"></span></div>'
        + '<div class="c60_fbar_ri_tips">'
        + '<div class="c60_fbar_ri_tips_tit" ng-bind="compData.JS.tiptitle.JS.text" ng-style="compData.JS.tiptitle.CSS"></div>'
        + '<div class="c60_fbar_ri_tips_txt"></div>'
        + '</div>'
        + '</div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.infoflag = false;
            var tipstxt = angular.element($element[0].querySelector('.c60_fbar_ri_tips_txt'));
            var colordivs = angular.element($element[0].querySelector('.c60_fbar_ri_type_colorcons'))[0];
            var colordot = []
              , colordotcontainer = [];
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            $scope.confirmclick = function() {
                var offlinepacksubscription;
                if ($scope.infoflag == true) {
                    offlinepacksubscription = {
                        "address": encodeURIComponent($scope.inputData),
                        "color": $scope.colordatas,
                        "taskId": $scope.taskId

                    }
                } else if ($scope.infoflag == false) {
                    offlinepacksubscription = {
                        "address": $scope.inputData,
                        "taskId": $scope.taskId
                    }
                } else {

                }
                if ($scope.inputData == undefined || $scope.inputData == '') {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'block');
                } else {
                    angular.element($element[0].querySelector('.c60_fbar_tipstextcolor')).css('display', 'none');
                    if (top.tlbs.messageid != "") {
                        coreService.fireEvent($scope.cid, 'messagestatuschange', {
                            "messageid": top.tlbs.messageid
                        });
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.confirmbtn.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'btn'),
                            'iseComp': '1'
                        };
                        coreUtils.cdrService($scope.compData.JS.confirmbtn.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'confirmclick', offlinepacksubscription);
                }
            }
            ;
            $scope.update = function(param) {
                if (param) {
                    var pmdata = param.pmdata || {};
                    $scope.taskId = param.taskId || '';
                    if (pmdata.isoffer == 'true' || pmdata.isoffer == true) {
                        $scope.infoflag = true;
                        $scope.offerdetails = pmdata.offerdetails;
                        var color = pmdata.offerdetails.colors;
                        if (($element[0].querySelector('.c60_fbar_ri_type_color_chose')) == null ) {
                            for (var i = 0; i < color.length; i++) {
                                var colorcon;
                                if (i == 0) {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose c60_fbar_cur" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];

                                } else {
                                    colorcon = angular.element('<div class="c60_fbar_ri_type_color_chose" color="' + color[i].color + '" style="color:' + $scope.compData.JS.receiveinfocolor.CSS.color + '">' + color[i].name + '</div>')[0];
                                }
                                colordot.push(colorcon);
                                colordivs.appendChild(colorcon);
                            }
                        } else {

                        }
                        var cur = angular.element($element[0].querySelector('.c60_fbar_cur'));
                        cur.css({
                            "border": "3px solid #ff7a03",
                            "color": "#ff6600",
                            "background": "#fff"
                        });
                        $scope.colordatas = cur.attr('color');
                        for (var j = 0; j < colordot.length; j++) {
                            var _touchstart = Const.touchEvent.start
                              , _touchend = Const.touchEvent.end;
                            var colordotcontainer = angular.element(colordot[j]);
                            var f = (function(j) {
                                $scope.colordatas = angular.element(colordot[0]).attr('color');
                                var touch = function(e) {

                                    e.stopPropagation();
                                    e.preventDefault();

                                    for (var i = 0; i < colordot.length; i++) {
                                        if (i != j) {
                                            angular.element(colordot[i]).removeClass('c60_fbar_cur').css({
                                                "border": "3px solid #eee",
                                                "color": $scope.compData.JS.receiveinfocolor.CSS.color,
                                                "background": "#eee"
                                            });
                                        }
                                    }
                                    angular.element(colordot[j]).addClass('c60_fbar_cur').css({
                                        "border": "3px solid #ff7a03",
                                        "color": "#ff6600",
                                        "background": "#fff"
                                    });
                                    $scope.colordatas = angular.element(colordot[j]).attr('color');
                                }
                                return touch;

                            })(j)
                            colordotcontainer.bind(_touchstart, f);
                        }
                    } else {
                        $scope.infoflag = false;
                    }
                    tipstxt.html($scope.compData.JS.tips_txt.text);
                } else {

                }

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
                coreService.fireEvent($element.attr('cid'), 'test');
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
            $scope.componentType = 'receiveinfo';
            $scope.init();
        }
    }
}
]);
