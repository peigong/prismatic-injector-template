uiCore.directive("iappbuttonholder", ["coreService", "coreUtils", "$timeout", "Const", "$window", function(c, a, b, d, e) {
    return {
        restrict: "AE",
        replace: true,
        template: '<div ng-style="compData.CSS" ><div ng-style="compData.JS.appbuttoncontainer.CSS"><div  ng-style="compData.JS.appbutton.CSS" ng-repeat="apps in compData.JS.dataset | limitTo:compData.JS.maxcount" id="news_app_{{$index}}" ng-click="compData.JS.clickable?handleClick({{$index}}):clickDisable();$event.stopPropagation();"><imageholder cid="appimage" dynamicproperties="{\'CSS\':{\'background-image\':apps.imageurl}}" param="compData.JS.appbutton.JS.imageconfig"></imageholder><irichtext cid="apptext" param="settextdata(compData.JS.appbutton.JS.textconfig,apps.title)"></irichtext></div></div></div>',
        scope: {
            param: "=param"
        },
        require: "^pid",
        controller: ["$scope", "$element", "$attrs", function(h, g, f) {
            h.cid = f.cid;
            h.index = 0;
            h.maxindex = 0;
            h.eventMap = {};
            h.imageset = {};
            h.compData = {};
            h.handleClick = function(i) {
                i = h.compData.JS.dataset[i].weblink;
                if (null  != i && i.length != 0) {
                    c.commonServiceRef.dynamicService(null , {
                        serviceType: "urlservice",
                        openurl: i
                    })
                }
            }
            ;
            h.clickDisable = function() {}
            ;
            h.settextdata = function(j, i) {
                j.JS.textdata = i;
                return j
            }
            ;
            h.extendComponentData = function(i) {
                h.compData = a.extendDeep(h.compData, i);
                b(function() {
                    h.$apply()
                })
            }
            ;
            h.init = function() {
                c.registerComponentInstance(h.cid, h);
                h.extendComponentData(c.getInitProperties(h.cid));
                h.maxindex = h.compData.JS.maxcount;
                this.setNewsappData(window.newsparam)
            }
            ;
            h.setNewsappData = function(i) {
                if (h.compData.JS.newsappsConfigRespPath) {
                    h.compData.JS.dataset = a.transfer(i, h.compData.JS.newsappsConfigRespPath)
                }
                if (null  != h.compData.JS.dataset && h.compData.JS.dataset.length < h.compData.JS.maxcount) {
                    h.maxindex = h.compData.JS.dataset.length
                }
            }
            ;
            h.eventMap.setNewsappData = h.setNewsappData;
            h.$on(h.cid + "_handleEvent", function(l, j, k, i) {
                h.eventMap[j](k, i)
            })
        }
        ],
        link: function(h, g, f, i) {
            h.pageID = f.ppageid || i.pageID;
            h.componentType = "iappbuttonholder";
            h.init()
        }
    }
}
]);
