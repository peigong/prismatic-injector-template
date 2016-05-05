uiCore.directive('trafficball', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_liul_tab_box"><div class="c60_fbar_liul_tab_cont"><div class="c60_fbar_trafficball"><div class="c60_fbar_trafficball_img"></div><richtrafficdata traffic=traffic traffictime=traffictime stateconfig="{{::config.descConfig}}"></richtrafficdata></div>',
        scope: {
            traffic: '=traffic',
            traffictime: '=traffictime',
            index: '=index'
        },
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', "$timeout",
        function($scope, $element, $attrs, coreService, coreUtils, Const, $timeout) {

            var $imageElement = angular.element($element[0].querySelector('.c60_fbar_trafficball_img'));
            $scope.updatecount = 0;
            $scope.getStates = function(value) {
                //在summary.js中传值是这样的stateconfig="{{::compData.js}}"
                var states = coreUtils.String2JSON($attrs.stateconfig);
                for (var i = 0; i < 10; i++) {
                    var state = states['state' + i];
                    if (state) {
                        if (value <= Number(state.maxvalue) && value > Number(state.minvalue)) {
                            return {
                                ballStyle: state.config.ballStyle,
                                imageStyle: state.config.imageStyle,
                                descConfig: state.config.descConfig
                            };
                        }
                    }
                }
                return {
                    ballStyle: {},
                    imageStyle: {},
                    descConfig: {}
                };
            }
            ;

            $scope.createAnmiateFrame = function() {
                var percent = $scope.currentpercent;
                var styleSheets = top.document.styleSheets;
                var ypos = (1 - percent) * 12.5;

                var animationName = 'ui-com-trafficball-wave-animation-' + $scope.index + '-' + $scope.updatecount;
                $scope.updatecount++;
                try {

                    var sheets = top.document.styleSheets;
                    var lastSheet = null ;
                    var len = 0;
                    for (var i in sheets) {
                        /*add href check to avoid dynamilly added css override keyframe*/
                        //firefox 非同源css操作会报insecure错误，所以此处需要捕获异常
                        try {
                            if (sheets[i].cssRules && sheets[i].title != 'toolbar') {
                                lastSheet = sheets[i];
                                len = sheets[i].cssRules.length;
                                break;
                            }
                        } catch (e) {}
                    }
                    var csstext = animationName + ' { 0% {background-position: 0 ' + ypos + 'em;} 100% {background-position: 12.5em ' + ypos + 'em;}}';

                    try {
                        lastSheet.insertRule('@-webkit-keyframes ' + csstext, len);
                    } catch (e) {
                        try {
                            lastSheet.insertRule('@-moz-keyframes ' + csstext, len);
                        } catch (e) {
                            try {
                                lastSheet.insertRule('@keyframes ' + csstext, len);
                            } catch (e) {
                                try {
                                    lastSheet.insertRule('@-o-keyframes ' + csstext, len);
                                } catch (e) {
                                    throw e;
                                }
                            }
                        }

                    }
                    ;

                    $imageElement.css({
                        '-webkit-animation': animationName + ' 1s linear infinite',
                        'animation': animationName + ' 1s infinite linear',
                        '-moz-animation': animationName + ' 1s infinite linear',
                        '-webkit-animation': animationName + ' 1s infinite linear',
                        '-o-animation': animationName + ' 1s infinite linear',
                        "-webkit-transform": "translate3d(0,0,0)",
                        "transform": "translate3d(0,0,0)",
                    })
                } catch (e) {

                    $imageElement.css({
                        'background-position': '0px ' + ypos + 'em'
                    });

                }
            }
            ;

            $scope.show = function() {
                var param = $scope.traffic;
                if (param) {
                    var total = param.total || 0;
                    ;
                    var used = param.used || 0;
                    var remain = total - used;
                    remain = remain < 0 ? 0 : remain;
                    $scope.ecid = param.ecid;

                    var remainPercentage = 0;
                    if (total != 0) {
                        remainPercentage = Number(remain / total * 100)
                    }
                    ;

                    $scope.currentpercent = remainPercentage / 100;
                    $scope.createAnmiateFrame();
                    $timeout($scope.createAnmiateFrame, 2000);
                    var config = null ;
                    if (remainPercentage == 0) {
                        config = $scope.getStates(remainPercentage + 0.001);
                    } else {
                        config = $scope.getStates(remainPercentage)
                    }
                    if (config) {
                        $scope.config = config;
                        $imageElement.css(config.imageStyle || {});
                        $element.css(config.ballStyle || {});

                    }

                }
            }
            ;

            $scope.$watch($attrs, function() {
                $scope.show();

            });
            $scope.init = function() {
                try {
                    var height = parseInt(top.window.innerHeight);
                    if (height <= 375) {

                        $element.css({
                            'margin-top': '0em'
                        });
                    }
                } catch (e) {}

            }
            ;
        }

        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.init();
        }
    }
}
]);
