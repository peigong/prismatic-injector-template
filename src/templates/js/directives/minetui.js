uiCore.directive('minetui', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_my_con_tui">'

        + '   <div class="c60_fbar_bg_black_pop" ng-style="getbg_black_popStyle()">' + '    <div class="c60_fbar_tips_txt" style="color:white;margin-top:0" ng-bind="compData.JS.bg_black_pop.JS.desc"></div>' + '   </div>'

        + '   <div class="c60_fbar_sug_con">' + '    <textarea class="c60_fbar_sug_textarea" ng-focus="focus();" ng-blur="blur();" ng-model="compData.JS.c60_fbar_sug_textarea.JS.text"></textarea>' + '    <div class="c60_fbar_sug_btn_con">' + '     <a class="c60_fbar_sug_btn" ccid="c60_fbar_sug_btn" ng-style="getsug_btnStyle()" ng-click="sug_btnClick();" ng-bind="compData.JS.c60_fbar_sug_btn.JS.text"></a>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_tuiding_tips" ng-bind="compData.JS.c60_fbar_tuiding_tips.JS.text">' + '   </div>' + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        'coreService',
        'coreUtils',
        'Const',
        function($scope, $element, $attrs, coreService, coreUtils, Const) {
            //当用户点击进去的时候，置空
            $scope.focus = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext) {
                    $scope.compData.JS.c60_fbar_sug_textarea.JS.text = "";
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 1;
                }

            }
            ;
            //当用户点击进去的时候，置空
            $scope.blur = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == "") {
                    $scope.compData.JS.c60_fbar_sug_textarea.JS.text = $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext;
                }
            }
            ;
            $scope.getsug_btnStyle = function() {
                if ($scope.compData.JS.c60_fbar_sug_textarea.JS.text == '') {
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 1;
                } else {
                    $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state = 0;
                }
                if ($scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state == 0) {
                    return $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state0;
                } else {
                    return $scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state1;
                }
            }
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
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
                //记录当前输入框中的植
                $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext = $scope.compData.JS.c60_fbar_sug_textarea.JS.text;
            }
            ;
            $scope.getbg_black_popStyle = function() {
                if ($scope.compData.JS.bg_black_pop.JS.stateconfig.state == 1) {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.bg_black_pop.JS.stateconfig.state0;
                }
            }
            ;
            $scope.bg_black_popShow = function(msg) {
                $scope.compData.JS.bg_black_pop.JS.desc = msg;
                $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 1;
                angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                    'display': 'block'
                });
                setTimeout(function() {
                    //将弹框隐藏
                    $scope.compData.JS.bg_black_pop.JS.stateconfig.state = 0;
                    angular.element($element[0].querySelector('.c60_fbar_bg_black_pop')).css({
                        'display': 'none'
                    });
                }, $scope.compData.JS.bg_black_pop.JS.stateconfig.time * 1000);
            }
            ;
            //提交退订内容
            $scope.sug_btnClick = function() {
                if ($scope.compData.JS.c60_fbar_sug_btn.JS.stateconfig.state == 1) {
                    return false;
                }
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_sug_btn.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'seeyou')
                    };
                    coreUtils.cdrService($scope.compData.JS.c60_fbar_sug_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }

                var content = $scope.compData.JS.c60_fbar_sug_textarea.JS.text;
                if (content == '') {
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips1);
                } else if (content == $scope.compData.JS.c60_fbar_sug_textarea.JS.oldtext) {
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips2);
                } else {
                    top.tlbs.toolbarclose = "close";
                    //将反馈内容发送到后台
                    var param = {
                        "feedback": encodeURIComponent(content),
                        "componentId": "cminetui",
                        "pageId": "iminetui",
                        "templateId": top.tlbs.templateID
                    };
                    $scope.bg_black_popShow($scope.compData.JS.c60_fbar_sug_textarea.JS.tips3);
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisubmit', param);
                    setTimeout(function() {
                        var param2 = {
                            "closeunit": 4,
                            "templateId": top.tlbs.templateID
                        };
                        coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisubmitclose', param2);
                        $scope.compData.JS.c60_fbar_sug_textarea.JS.text = "";
                    }, $scope.compData.JS.c60_fbar_sug_btn.JS.time * 1000);
                }
            }
            ;
            //接收来自后台的数据
            $scope.getDataFromRet = function(inputData) {
                coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'tuisuccess');
                //						$scope.revData = inputData;
            }
            ;
            $scope.eventMap['getDataFromRet'] = $scope.getDataFromRet;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cminetui";
            $scope.init();
        }
    };
});
