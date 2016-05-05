uiCore.directive('ftsiappholder', [
'coreService',
'coreUtils',
'$timeout',
function(coreService, coreUtils, $timeout) {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div></div>',
        transclude: true,
        scope: {},
        require: '^pid',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$compile',
        '$templateCache',
        '$interval',
        '$timeout',
        function($scope, $element, $attrs, $compile, $templateCache, $interval, $timeout) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            $scope.compData = {
                'CSS': {
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    left: "0px",
                    top: "0px",
                    'background-color': '#fff'
                },
                'JS': {
                    backable: true,
                    closeable: true,
                    'cdr': true,
                    'clickable': false,
                    'animation': false,
                    'pageStack': [],
                    'apploadState': false,
                    'pagercompmapping': {},
                    'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                    },
                    'currentpageid': '',
                    'backimageconfig': {
                        'CSS': {
                            "background-repeat": "no-repeat",
                            "background-size": "1.6em 1.6em",
                            'height': "1.6em",
                            'left': "0.6em",
                            'position': "absolute",
                            'top': "0.4em",
                            'width': "1.6em",
                            "z-index": "2047483649"
                        },
                        'JS': {
                            'clickable': "true",
                            'stateconfig': {
                                'state': "0",
                                'state0': {
                                    "background-image": "none",
                                    'cursor': "auto"
                                },
                                'state1': {
                                    "background-image": "url('" + top.tlbs.templatePath +
                                    "/images/toback.png')",
                                    'cursor': "pointer"
                                }
                            }
                        }
                    },
                    'backimageconfigtouch': {
                        'CSS': {
                            'display': "block",
                            'height': "2.4em",
                            'left': "0em",
                            'position': "absolute",
                            'top': "0em",
                            'width': "5em",
                            "z-index": "2047483649"
                        },
                        'JS': {
                            'clickable': "true",
                            'stateconfig': {
                                'state': "0"
                            },
                            'cdrConfig': {
                                'uitracingcdr': {
                                    'cdrType': 'uitracingcdr',
                                    'enable': true,
                                    'storeData': false
                                }
                            }
                        }
                    },
                    'closeimageconfig': {
                        CSS: {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/close.png')",
                            "background-repeat": "no-repeat",
                            "background-size": "1.6em 1.6em",
                            cursor: "pointer",
                            height: "1.6em",
                            position: "absolute",
                            right: "0.6em",
                            top: "0.4em",
                            width: "1.6em",
                            "z-index": "2047483649"
                        },
                        JS: {
                            clickable: "true",
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    closeimageconfigtouch: {
                        CSS: {
                            display: "block",
                            height: "2.4em",
                            position: "absolute",
                            right: "0em",
                            top: "0em",
                            width: "5em",
                            "z-index": "2047483649"
                        },
                        JS: {
                            clickable: "true",
                            stateconfig: {
                                state: "0"
                            }
                        }
                    },
                    'progresswindowconfig': {
                        'CSS': {
                            position: "fixed",
                            height: "100%",
                            width: "100%",
                            left: "0px",
                            display: "none",
                            "z-index": "2047483649",
                            top: "0px",
                            background: "rgba(0,0,0,0.498039)"
                        },
                        'JS': {}
                    },
                    'progresstextconfig': {
                        'CSS': {
                            "background-color": "#4C4C4C",
                            "border-radius": ".1em .1em .1em .1em",
                            color: "white",
                            height: "2em",
                            "line-height": "1.8em",
                            margin: "0 auto",
                            position: "relative",
                            "text-align": "center",
                            top: "6.75em",
                            width: "8em"
                        },
                        'JS': {
                            'progresstext': 'Please Wait...'
                        }
                    },
                    'statusholderconfig': {
                        'CSS': {
                            'display': 'none',
                            'height': '4.5em',
                            'top': '30%',
                            'color': '#BDBDBD',
                            'border': '0.05em solid #F2F2F2',
                            'background-color': '#F9F9F9',
                            'position': 'absolute',
                            'width': '50%',
                            'left': '25%',
                            'line-height': '100%',
                            'text-align': 'left',
                            '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                            'list-style': 'none outside none',
                            'padding': '0',
                            'z-index': '2047483649',
                        },
                        'JS': {
                            'statustext': '<p class="img"></p><p class="info"><i res="PLEASE_RELOAD">对不起！<br>服务器正忙.<br>请重试.</i></p>'
                        }
                    },
                    pagercompmapping: {
                        goldcoin: "goldcoinlayout"
                    }
                }
                /*'CSS': {},
                        'JS': {
                        'clickable': false,
                        'animation': false,
                        'pageStack': [],
                        'apploadState': false,
                        'pagercompmapping': {},
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        },
                        'currentpageid': '',
                        'backimageconfig': {
                        'CSS': {},
                        'JS': {
                        'clickable': false,
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        }
                        }
                        },
                        'closeimageconfig': {
                        'CSS': {},
                        'JS': {
                        'clickable': false,
                        'stateconfig': {
                        'state': 0,
                        'state0': {},
                        'state1': {}
                        }
                        }
                        },
                        'progresswindowconfig': {
                        'CSS': {
                        'width': '100%',
                        'height': '100%',
                        'display': 'none'
                        },
                        'JS': {

                        }
                        },
                        'progresstextconfig': {
                        'CSS': {
                        'position': 'relative',
                        'border-radius': '.1em .1em .1em .1em',
                        'width': '8em',
                        'height': '2em',
                        'line-height': '1.8em',
                        'top': '6.75em',
                        'text-align': 'center',
                        'background-color': '#4C4C4C',
                        'margin': '0 auto',
                        'color': 'white'
                        },
                        'JS': {
                        'progresstext': 'Please Wait...'
                        }
                        },
                        'statusholderconfig': {
                        'CSS': {
                        'display': 'none',
                        'height': '4.5em',
                        'top': '30%',
                        'color': '#BDBDBD',
                        'border': '0.05em solid #F2F2F2',
                        'background-color': '#F9F9F9',
                        'position': 'absolute',
                        'width': '50%',
                        'left': '25%',
                        'line-height': '100%',
                        'text-align': 'left',
                        '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                        'list-style': 'none outside none',
                        'padding': '0',
                        'z-index': '2047483647',
                        },
                        'JS': {
                        'statustext': '<p class="img"></p><p class="info"><i res="PLEASE_RELOAD">对不起！<br>服务器正忙.<br>请重试.</i></p>'
                        }
                        }
                        }*/
            };
            $scope.compData.JS.previouspageid = '';
            $scope.pagechangeChangeTimer = null ;
            $scope.pageChangeFlag = true;
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            var loadAppObject = function() {}
            ;
            loadAppObject.prototype.eexecute = function() {
                if (!$scope.compData.JS.apploadState) {
                    var elementTemplateCache = $templateCache.get($attrs.templateurl);
                    elementTemplateCache = '<div id="progressholder"><div id="progresstextholder">{{compData.JS.progresstextconfig.JS.progresstext}}</div></div><div id="statusholder" class="reload"></div>' + elementTemplateCache;
                    $element.html(elementTemplateCache);
                    $compile($element.contents())($scope);
                    $scope.compData.JS.apploadState = true;
                    $scope.ctrlPageGroup = {};
                    $scope.progressHolderElement = angular.element($element[0].querySelector('[id="progressholder"]'));
                    $scope.progressTextHolderElement = angular.element($element[0].querySelector('[id="progresstextholder"]'));
                    $scope.statusHolder = angular.element($element[0].querySelector('[id="statusholder"]'));
                    $scope.titleBackImage = angular.element($element[0].querySelector('.c60_fbar_titlebackimage'));
                    var alllLoad = angular.element($element[0].querySelectorAll('[lload="0"]'));
                    for (var i = 0; i < alllLoad.length; i++) {
                        var localElement = angular.element(alllLoad[i]);
                        $scope.ctrlPageGroup[localElement.attr('pid')] = localElement;
                    }
                }
            }
            ;
            $scope.loadApps = function(stateObject, deferred) {
                var loadApp = new loadAppObject().eexecute();
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['loadApps'] = $scope.loadApps;
            $scope.lloadApps = function(loadObject, deferred) {
                if (null  != loadObject.applist && loadObject.applist.length > 0) {
                    var pageidSplit = loadObject.applist.split(',');
                    var appArrayObj = new loadAppArray().eexecute(pageidSplit, deferred);
                } else if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            var loadAppArray = function() {}
            ;

            loadAppArray.prototype.eexecute = function(pageArray, deferred) {
                var i = 0
                  ,
                j = pageArray.length
                  ,
                count = 0
                  ,
                pageArrayIds = pageArray
                  ,
                deferred = deferred;
                var executeFunction = function(lKey) {
                    var pageObject = $scope.ctrlPageGroup[pageArrayIds[count]];
                    if (null  != pageObject && pageObject.attr('lload') == 0) {
                        new loadSingleApp(pageObject).eexecute();
                    }
                    count = count + 1;
                    if (count == j && null  != deferred) {
                        deferred.resolve();
                    }
                }
                ;
                $interval(executeFunction, 150, j, this.loadKey);
            }
            ;

            var loadSingleApp = function(singleAppObject) {
                this.singleAppObject = singleAppObject;
            }
            ;
            loadSingleApp.prototype.eexecute = function() {
                this.singleAppObject.attr('lload', '1');
            }
            ;
            $scope.eventMap['lloadApps'] = $scope.lloadApps;
            $scope.init = function() {
                coreService.registerComponentInstance($scope.cid, $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid));
                $scope.loadApps();
                $scope.applyStyle();
                $scope.initNext();
                coreService.fireEvent($scope.cid, 'init', null );
                /* $timeout(function() {
                        $scope.loadApps();
                        $scope.applyStyle();
                        $scope.initNext();
                        coreService.fireEvent($scope.cid, 'init', null);
                        }, 500);*/
            }
            ;
            $scope.initNext = function() {
                $scope.statusHolder.css($scope.compData.JS.statusholderconfig.CSS);
                $scope.statusHolder[0].innerHTML = $scope.compData.JS.statusholderconfig.JS.statustext;
            }
            ;
            $scope.showStatus = function() {
                $scope.statusHolder.css('display', 'block');
            }
            ;
            $scope.hideStatusMessage = function() {
                $scope.statusHolder.css('display', 'none');
            }
            ;
            $scope.applyStyle = function() {
                if (null  != $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]) {
                    coreUtils.extendDeep($scope.compData.CSS, $scope.compData.JS.stateconfig['state' + $scope.compData.JS.stateconfig.state]);
                }
                $element.css($scope.compData.CSS);
                $scope.progressHolderElement.css($scope.compData.JS.progresswindowconfig.CSS);
                $scope.progressTextHolderElement.css($scope.compData.JS.progresstextconfig.CSS);
                if (null  != $scope.titleBackImage) {
                    if (null  != $scope.compData.JS.backimageconfig.JS.stateconfig['state' + $scope.compData.JS.backimageconfig.JS.stateconfig.state]) {
                        coreUtils.extendDeep($scope.compData.JS.backimageconfig.CSS, $scope.compData.JS.backimageconfig.JS.stateconfig['state' + $scope.compData.JS.backimageconfig.JS.stateconfig.state]);
                    }
                    $scope.titleBackImage.css($scope.compData.JS.backimageconfig.CSS);
                }
            }
            ;
            $scope.changeState = function(stateObject, deferred) {
                if (null  != stateObject && null  != stateObject.cstate) {
                    if ($scope.compData.JS.stateconfig.state != stateObject.cstate) {
                        $scope.compData.JS.stateconfig.state = stateObject.cstate;
                        $scope.applyStyle();
                        $scope.$evalAsync(
                        function() {
                            if (null  != deferred) {
                                if ($scope.compData.JS.animation) {
                                    //var _transitionEnd = /webkit/i.test(navigator.userAgent) ? 'webkitTransitionEnd' : 'transitionend';
                                    $element.on(top.tlbs.transitionendEvent, function(e) {
                                        deferred.resolve();
                                    });
                                } else {
                                    deferred.resolve();
                                }
                            }
                        });
                    } else if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.eventMap['changeState'] = $scope.changeState;
            $scope.eventMap['showStatus'] = $scope.showStatus;
            $scope.changeCurrentPageIDB = function(pageIDConfig, deferred) {
                if (null  != pageIDConfig && null  != pageIDConfig.pageid && pageIDConfig.pageid.length > 0) {
                    if ($scope.compData.JS.progresswindowconfig.CSS['display'] == 'block') {
                        $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                    }
                    $scope.hideStatusMessage();
                    var rootComponentConfig = $scope.compData.JS.pagercompmapping[pageIDConfig.pageid];
                    if (null  != rootComponentConfig && rootComponentConfig.length > 0) {
                        var compScope = coreService.getComponentScope(rootComponentConfig);
                        if (null  != compScope) {
                            typeof compScope.showcb === 'function' &&
                            compScope.showcb();
                        }
                    }
                    if (null  != pageIDConfig.cpageid && pageIDConfig.cpageid != $scope.compData.JS.currentpageid) {
                        return;
                    }
                    if (pageIDConfig.pageid == $scope.compData.JS.currentpageid) {
                        return;
                    }
                    $scope.pageChangeFlag = true;
                    $scope.compData.JS.previouspageid = $scope.compData.JS.currentpageid;
                    $scope.compData.JS.currentpageid = pageIDConfig.pageid;
                    if (null  != pageIDConfig.state && '1' == pageIDConfig.state) {
                        $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                        if ($scope.compData.JS.pageStack.length > 1) {
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 1;
                        } else {
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                        }
                    } else {
                        $scope.compData.JS.pageStack = [];
                        $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                        $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                    }
                    $timeout(function() {
                        $scope.compData.JS.backimageconfigtouch.JS.stateconfig.state = $scope.compData.JS.backimageconfig.JS.stateconfig.state;
                        var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageIDConfig.pageid + '"]'));
                        var backable = currentpage[0].getAttribute('backable');
                        var closable = currentpage[0].getAttribute('closable');
                        $scope.compData.JS.backable = backable == '0' ? false : true;
                        $scope.compData.JS.closable = closable == '0' ? false : true;
                    }, 10);

                }
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['changeCurrentPageIDB'] = $scope.changeCurrentPageIDB;
            var timer;

            function checkPageLoad(pageid) {
                var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageid + '"]'));
                var html = currentpage[0].innerHTML;
                if ("<div></div>" == html) {
                    timer = $timeout(function() {
                        checkPageLoad(pageid);
                    }, 50);
                } else {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    coreService.fireEvent((currentpage[0].getAttribute('pagesrcid') || pageid) + 'show', 'recvd');
                }
            }
            ;
            $scope.changeCurrentPageID = function(pageIDConfig, deferred) {
                if (null  != pageIDConfig && null  != pageIDConfig.pageid && pageIDConfig.pageid.length > 0) {
                    if ($scope.compData.JS.progresswindowconfig.CSS['display'] == 'block') {
                        $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                    }
                    $scope.hideStatusMessage();
                    var rootComponentConfig = $scope.compData.JS.pagercompmapping[pageIDConfig.pageid];
                    if (null  != rootComponentConfig && rootComponentConfig.length > 0) {
                        var compScope = coreService.getComponentScope(rootComponentConfig);
                        if (null  != compScope) {
                            typeof compScope.showcb === 'function' &&
                            compScope.showcb();
                        }
                    }
                    if (null  != pageIDConfig.cpageid && pageIDConfig.cpageid != $scope.compData.JS.currentpageid) {
                        return;
                    }
                    if ($scope.compData.JS.cdr) {
                        var cdrConfig = {
                            'cdrType': 'uidisplaycdr',
                            'enable': true,
                            'storeData': false
                        };
                        var cdrDataOpen = {
                            'pageId': pageIDConfig.pageid,
                            'displayType': 1,
                            'displayResult': 0
                        };
                        if (pageIDConfig.pageid != $scope.compData.JS.currentpageid) {
                            var cdrDataClose = {
                                'pageId': $scope.compData.JS.currentpageid,
                                'displayType': 0,
                                'displayResult': 0
                            };
                            coreUtils.cdrService(cdrConfig, cdrDataOpen);
                            coreUtils.cdrService(cdrConfig, cdrDataClose);
                            //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 0, 0);
                            //coreUtils.uiDisplayCdr(pageIDConfig.pageid, 1, 0);
                        } else {
                            coreUtils.cdrService(cdrConfig, cdrDataOpen);
                            //coreUtils.uiDisplayCdr(pageIDConfig.pageid, 1, 0);
                        }
                    }
                    top.tlbs.currentpageid = pageIDConfig.pageid;
                    var currentpage = angular.element($element[0].querySelectorAll('[pid="' + pageIDConfig.pageid + '"]'));
                    if (pageIDConfig.pageid != $scope.compData.JS.currentpageid) {
                        $scope.pageChangeFlag = true;
                        $scope.compData.JS.previouspageid = $scope.compData.JS.currentpageid;
                        $scope.compData.JS.currentpageid = pageIDConfig.pageid;
                        if (null  != pageIDConfig.state && '1' == pageIDConfig.state) {
                            $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                            if ($scope.compData.JS.pageStack.length > 1) {
                                $scope.compData.JS.backimageconfig.JS.stateconfig.state = 1;
                            } else {
                                $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                            }
                        } else {
                            $scope.compData.JS.pageStack = [];
                            $scope.compData.JS.pageStack.push(pageIDConfig.pageid);
                            $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                        }
                        $timeout(function() {
                            $scope.compData.JS.backimageconfigtouch.JS.stateconfig.state = $scope.compData.JS.backimageconfig.JS.stateconfig.state;
                            var backable = currentpage[0].getAttribute('backable');
                            var closable = currentpage[0].getAttribute('closable');
                            $scope.compData.JS.backable = backable == '0' ? false : true;
                            $scope.compData.JS.closable = closable == '0' ? false : true;
                        }, 10);
                    }
                    var lload = currentpage[0].getAttribute('lload');
                    if (lload == '0') {
                        $scope.lloadApps({
                            "applist": pageIDConfig.pageid
                        });
                        checkPageLoad(pageIDConfig.pageid);

                    } else if (pageIDConfig.reload != '0') {
                        coreService.fireEvent((currentpage[0].getAttribute('pagesrcid') || pageIDConfig.pageid) + 'show', 'recvd');
                    }
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['changeCurrentPageID'] = $scope.changeCurrentPageID;
            $scope.popPage = function(args, deferred) {
                top.tlbs.cdrData = null ;
                if (null  != $scope.compData.JS.pageStack) {
                    var poppage = $scope.compData.JS.pageStack.pop();
                    if (null  != poppage) {
                        if (poppage == $scope.compData.JS.currentpageid) {
                            $scope.popPage();
                        } else {
                            $scope.changeCurrentPageID({
                                'pageid': poppage,
                                'state': 1,
                                'reload': (args || {}).reload || '0'
                            }, deferred);
                        }
                    } else {
                        $scope.compData.JS.pageStack = [];
                        $scope.compData.JS.backimageconfig.JS.stateconfig.state = 0;
                    }
                }
                if (null  != deferred) {
                    deferred.resolve();
                }
            }
            ;
            $scope.eventMap['popPage'] = $scope.popPage;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, inputData, deferred) {
                $scope.eventMap[event](inputData, deferred);
            });
            $scope.isCurrentPage = function(pageID) {
                return $scope.compData.JS.currentpageid == pageID ? true : false;
            }
            ;
            $scope.getPageClass = function(pageID) {
                return ($scope.compData.JS.previouspageid == pageID && $scope.pageChangeFlag) ? 'pprevious' : $scope.compData.JS.currentpageid == pageID ? 'pcurrent' : 'phidden';
            }
            ;
            $scope.showProgress = function(stateObject, deferred) {
                $scope.compData.JS.progresswindowconfig.CSS['display'] = 'block';
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['showProgress'] = $scope.showProgress;
            $scope.hideProgress = function(stateObject, deferred) {
                $scope.compData.JS.progresswindowconfig.CSS['display'] = 'none';
                if (null  != deferred) {
                    deferred.resolve();
                }
                $scope.applyStyle();
            }
            ;
            $scope.eventMap['hideProgress'] = $scope.hideProgress;
            $scope.writeCPageOpenCDR = function(stateObject, deferred) {
                if ($scope.compData.JS.cdr) {
                    var cdrConfig = {
                        'cdrType': 'uidisplaycdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'pageId': $scope.compData.JS.currentpageid,
                        'displayType': 1,
                        'displayResult': 0
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 1, 0);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.writeCPageCloseCDR = function(stateObject, deferred) {
                top.tlbs.cdrData = null ;
                if ($scope.compData.JS.cdr) {
                    var cdrConfig = {
                        'cdrType': 'uidisplaycdr',
                        'enable': true,
                        'storeData': false
                    };
                    var cdrData = {
                        'pageId': $scope.compData.JS.currentpageid,
                        'displayType': 0,
                        'displayResult': 0
                    };
                    coreUtils.cdrService(cdrConfig, cdrData);
                    //coreUtils.uiDisplayCdr($scope.compData.JS.currentpageid, 0, 0);
                    if (null  != deferred) {
                        deferred.resolve();
                    }
                }
            }
            ;
            $scope.$watch(function() {
                return $scope.compData.JS.previouspageid;
            }, function(newValue, oldValue) {
                if (null  != newValue && newValue.length > 0) {
                    $timeout.cancel($scope.pagechangeChangeTimer);
                    $scope.pagechangeChangeTimer = $timeout(function() {
                        $scope.pageChangeFlag = false;
                    }, 500);
                }
            });
            $scope.$on(
            "$destroy",
            function(event) {
                $timeout.cancel($scope.pagechangeChangeTimer);
            }
            );
            $scope.eventMap['writeCPageOpenCDR'] = $scope.writeCPageOpenCDR;
            $scope.eventMap['writeCPageCloseCDR'] = $scope.writeCPageCloseCDR;
        }
        ],
        link: function(scope, element, attrs, ctrl) {
            scope.pageID = attrs['ppid'] || ctrl.pageID;
            scope.componentType = 'ftsiappholder';
            scope.init();
        }
    };
}
]);
