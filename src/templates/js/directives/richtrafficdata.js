uiCore.directive('richtrafficdata', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        scope: {
            traffic: '=traffic',
            traffictime: '=traffictime'
        },
        template: '<div class="c60_fbar_liul_text">'
        + '<p class="c60_fbar_liul_texth1 clearfloat">'
        + '<span class="c60_fbar_liul_texth1span" ng-bind=remainnumvalue></span>'
        + '<span class="c60_fbar_liul_texth1spanalarm">'
        + '<span class="c60_fbar_liul_alarm" ng-bind=alarm></span>'
        + '<b class="c60_fbar_liul_texth1b" ng-bind=remainfloatvalue></b>'
        + '</span>'
        + '</p>'
        + '<p class="c60-trafficdata-desc">'
        + '<span class="c60_fbar_liul_textpspan" ng-bind=unit></span>'
        + '<b class="c60_fbar_liul_textpb" ng-bind=remaintips></b>'
        + '</p>'
        + '<p class="c60_fbar_date">'
        + '<i class="c60_fbar_liul_textpi" ng-bind=traffictime></i>'
        + '</p>'
        + '</div>',
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {

            var integernum = angular.element($element[0].querySelector('.c60_fbar_liul_texth1span'));
            var floatnum = angular.element($element[0].querySelector('.c60_fbar_liul_texth1b'));
            var unit = angular.element($element[0].querySelector('.c60_fbar_liul_textpspan'));
            var desc = angular.element($element[0].querySelector('.c60_fbar_liul_textpb'));
            var alarmtext = angular.element($element[0].querySelector('.c60_fbar_liul_alarm'));
            //var tips = angular.element($element[0].querySelector('.c60_fbar_liul_textpb'));
            $scope.applyConfig = function() {
                var config = coreUtils.String2JSON($attrs['stateconfig']);
                config.num = config.num || {};
                config.desc = config.desc || {};
                config.exceeddesc = config.exceeddesc || config.desc;
                config.exceednum = config.exceednum || config.num;
                var remain = $scope.traffic.remainN.v;
                $scope.unit = $scope.traffic.remainN.u;
                var alarm = config.alarm || {};
                $scope.alarm = alarm.text || '';
                var temp = (Math.abs(remain) + '').split('.');
                $scope.remainnumvalue = temp[0]
                if (temp[1]) {
                    $scope.remainfloatvalue = '.' + temp[1]

                }
                var descstyle = remain > 0 ? config.desc.style : config.exceeddesc.style;
                var numstyle = remain > 0 ? config.num.style : config.exceednum.style;
                if (remain < 0) {
                    $scope.remaintips = $scope.traffic.desc.overflowdesc;

                } else {
                    $scope.remaintips = $scope.traffic.desc.remaindesc;

                }
                desc.css(descstyle || {});
                unit.css(descstyle || {});
                integernum.css(numstyle || {});
                floatnum.css(numstyle || {});
                alarmtext.css(alarm.style || {})

            }
            ;

            $scope.$watch($attrs, function() {
                //console.log($attrs.stateconfig)
                $scope.applyConfig();

            });
        }

        ],
        link: function($scope, $element, $attrs, ctl) {}
    }
}
]);
