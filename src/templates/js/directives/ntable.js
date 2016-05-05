uiCore.directive('ntable', [function() {
    return {
        restrict: 'AE',
        replace: true,
        require: '^pid',
        template: '<li ng-class="{\'c60_fbar_packagePriceDesc\':true}" ng-repeat="package in param.list" ng-style="packageCurrent(package)" >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitle\':true}" ng-click="packageClick(package,$index,true);">' + '<div  ng-class="{\'c60_fbar_packagePriceDescTitleSize\':true}"  ng-style="packageCurrent2(package)" ng-bind="package.title"></div>' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleContent\':true,\'c60_fbar_packagePriceDescTitleContent2\':package.iscombo==1}"  ng-style="packageCurrent2(package)"  >' + '<div ng-class="{\'c60_fbar_packagePriceDescTitleNameprice\':true}">' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleName\':true}"  ng-bind="package.name"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescTitleprice\':true}" ng-show="package.iscomboflag" ng-bind="package.price"></p>' + '</div>' + '</div>' + '</div>' + '<div ng-class="{\'c60_fbar_packagePriceDescContent\':true}" class="c60_fbar_detail" ng-style="packagePriceDescContentHide(package)">' + '<div ng-show="package.iscomboflag">' + '<p ng-repeat="properies in package.properies" ng-class="{\'c60_fbar_packagePriceDescContentP\':true}"  ng-bind="properies"></p>' + '</div>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentP2\':true}" ng-show="!(package.iscomboflag2)"  ng-bind-html="to_trusted(package.desc)"></p>' + '<p ng-class="{\'c60_fbar_packagePriceDescContentremarks\':true}" ng-bind="package.effectdesc"></p>' + '<button ng-if="!compData.JS.showbottombuybtn" ng-class="{\'c60_fbar_BuyNowBtn\':true}" ng-style="buyNowBtnStyleForEach(package)" ng-click="buyNowForEach(package);$event.stopPropagation();" ng-bind="buyNowBtnForEach(package)"></button>' + '</div>' + '</li>',
        scope: {
            param: '=param',
        },
        controller: ["$scope", "$element", "$attrs", 'coreService', 'coreUtils', 'Const', '$sce',
        function($scope, $element, $attrs, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = 'page';
        }
    }
}
]);
