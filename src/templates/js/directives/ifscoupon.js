uiCore.directive('ifscoupon', [
'coreService',
'coreUtils',
function(coreService, coreUtils) {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div class="c60_fbar_my_privilege_con"><div simplescroll><div id="topImgBanner" class="c60_fbar_mp_barnner">' +
        '<img class="c60_fbar_mp_barnner_img" ng-src="{{compData.JS.topImgBanner.JS.bannerImgURLForImg}}" alt=""/></div><div id="bottomListHolder" class="c60_fbar_mp_con">' +
        '<div class="c60_fbar_mp_list" ng-repeat="data in compData.JS.couponData"><div class="c60_fbar_mp_list_top"><table class="c60_fbar_mp_list_top_table" cellpadding="0" cellspacing="0"><tbody><tr>' +
        '<td ng-style={{::compData.JS.couponIndex.CSS}}>{{::$index+1}}</td><td><div class="c60_fbar_mp_lt_table_tit" ng-style={{::compData.JS.couponName.CSS}}>{{::data.couponname}}</div><div class="c60_fbar_mp_lt_table_tit_txt" ng-style={{::compData.JS.couponDesc.CSS}}>{{::data.description}}</div></td>' +
        '<td class="c60_fbar_clearfloat" ccid="couponLink" ng-click="openCouponURL($index)"><span class="c60_fbar_mp_lt_table_tit_btn" ng-style={{::compData.JS.couponLink.CSS}}>{{::compData.JS.couponLink.JS.text}}</span></td></tr></tbody></table></div>' +
        '<div class="c60_fbar_mp_list_bottom"><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_01" ng-style={{::compData.JS.couponCodeText.CSS}}>{{::compData.JS.couponCodeText.JS.text}}</span>' +
        '<span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponCodeValue.CSS}}>{{::data.exchangecode}}</span></div><div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat">' +
        '<span class="c60_fbar_mp_lb_d_ico_02" ng-style={{::compData.JS.couponValidDateText.CSS}}>{{::compData.JS.couponValidDateText.JS.text}}</span><span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponValidDateValue.CSS}}>{{::data.startdate+" - "+data.expiredate}}</span></div>' +
        '<div class="c60_fbar_mp_lb_detail c60_fbar_clearfloat"><span class="c60_fbar_mp_lb_d_ico_03" ng-style={{::compData.JS.couponExDescText.CSS}}>{{::compData.JS.couponExDescText.JS.text}}</span>' +
        '<span class="c60_fbar_mp_lb_d_txt" ng-style={{::compData.JS.couponExDescValue.CSS}}>{{::data.exchangedescrption}}</span></div></div></div></div></div></div>',
        scope: {},
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        function($scope, $element, $attrs) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    'height': '100%',
                    'width': '100%',
                    'position': 'relative'
                },
                'JS': {
                    'clickable': false,
                    'animation': false,
                    'clickevent': '',
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'topImgBanner': {
                        'CSS': {
                            'height': '6em'
                        },
                        'JS': {
                            'bannerImgURL': "url('" + top.tlbs.templatePath + "/images/my_privilege_banner.png')",
                            'bannerImgURLForImg': ''
                        }
                    },
                    'bottomListHolder': {
                        'CSS': {

                        },
                        'JS': {

                        }
                    },
                    'couponIndex': {
                        'CSS': {
                            'color': '#f9807c'
                        },
                        'JS': {

                        }
                    },
                    'couponName': {
                        'CSS': {
                            'width': '90%',
                            'font-size': '1em',
                            'color': '#222',
                            'white-space': 'nowrap',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis'
                        },
                        'JS': {

                        }
                    },
                    'couponDesc': {
                        'CSS': {
                            'width': '90%',
                            'font-size': '0.8em',
                            'color': '#ff7d55',
                            'white-space': 'nowrap',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis',
                            'margin-top': '0.6em'
                        },
                        'JS': {

                        }
                    },
                    'couponLink': {
                        'CSS': {
                            'float': 'right',
                            'width': '4.5em',
                            'height': '2.2em',
                            'line-height': '2.2em',
                            'background': '#ff7d55',
                            'color': '#fff',
                            'text-align': 'center',
                            'font-size': '1em',
                            'margin-right': '1.2em',
                            '-moz-border-radius': '2.2em',
                            '-webkit-border-radius': '2.2em',
                            'border-radius': '2.2em'
                        },
                        'JS': {
                            'text': '详情'
                        }
                    },
                    'couponCodeText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_01.png')"
                        },
                        'JS': {
                            'text': '兑换码:'
                        }
                    },
                    'couponCodeValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#222',
                            'font-size': '0.8em'
                        },
                        'JS': {

                        }
                    },
                    'couponValidDateText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_02.png')"
                        },
                        'JS': {
                            'text': '兑换日期:'
                        }
                    },
                    'couponValidDateValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#ff7d55',
                            'font-size': '0.8em'
                        },
                        'JS': {

                        }
                    },
                    'couponExDescText': {
                        'CSS': {
                            'float': 'left',
                            'width': '5em',
                            'font-size': '0.8em',
                            'line-height': '1.8em',
                            'color': '#222',
                            'background': 'left center no-repeat',
                            'background-size': '1.2em 1.2em',
                            'padding-left': '1.5em',
                            'background-image': "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_03.png')"
                        },
                        'JS': {
                            'text': '使用方法:'
                        }
                    },
                    'couponExDescValue': {
                        'CSS': {
                            'float': 'left',
                            'width': '65%',
                            'line-height': '1.8em',
                            'color': '#222',
                            'font-size': '0.8em'
                        },
                        'JS': {

                        }
                    }
                }
            };
            $scope.compData.JS.couponData = [];
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.processConfig();
                $scope.processStyle();
            }
            ;
            $scope.processConfig = function() {
                $scope.compData.JS.topImgBanner.JS.bannerImgURLForImg = $scope.compData.JS.topImgBanner.JS.bannerImgURL.replace("url('", "").replace("')", "");
            }
            ;
            $scope.processStyle = function() {
                $scope.topImgBanner = angular.element($element[0].querySelector('[id="topImgBanner"]'));
                $scope.bottomListHolder = angular.element($element[0].querySelector('[id="bottomListHolder"]'));

                $element.css($scope.compData.CSS);
                $scope.topImgBanner.css($scope.compData.JS.topImgBanner.CSS);
                $scope.bottomListHolder.css($scope.compData.JS.bottomListHolder.CSS);
            }
            ;
            $scope.openCouponURL = function(index) {
                var couponData = $scope.compData.JS.couponData[index];
                //add by h00278783 cdr ----------start---------------
                if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.couponLink.JS.cdrConfig)) {
                    $scope.compData.JS['cdrData'] = {};
                    $scope.compData.JS.cdrData = {
                        'pageId': $scope.pageID,
                        'componentId': $scope.compData.JS.couponData[index].couponid
                    };
                    coreUtils.cdrService($scope.compData.JS.couponLink.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                }
                //add by h00278783 cdr ----------end---------------
                if (couponData.couponlink !== '' && couponData.couponlink !== undefined && couponData.couponlink !== null ) {
                    window.open(couponData.couponlink);
                }

            }
            ;
            $scope.updateCouponData = function(eventInput, deferred) {
                if (null  != eventInput && null  != eventInput.respparam.usercoupons) {
                    $scope.compData.JS.couponData = eventInput.respparam.usercoupons;
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['init'] = $scope.init;
            $scope.eventMap['updateCouponData'] = $scope.updateCouponData;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = ctrl.pageID;
            scope.componentType = 'ifscoupon';
            scope.init();
        }
    };
}
]);
