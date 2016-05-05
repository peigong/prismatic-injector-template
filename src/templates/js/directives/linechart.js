uiCore.directive('linechart', [function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div class="c60_fbar_linechartwrap"><div class="c60_fbar_linechart">'
        + '<div class="c60_fbar_linechart_title"><span class="c60_fbar_linechart_titleicon"></span><span class="c60_fbar_linechart_titletext" ng-bind="chartText.JS.titletext.text"></span></div>'
        + '<div class="c60_fbar_linechart_text"><span class="c60_fbar_linechart_used"><b class="c6_fbar_usedtext_text" ng-bind="chartText.JS.usedtext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgused.v+avgused.u"></b></span><span class="c60_fbar_linechart_left"><b class="c6_fbar_usedtext_value" ng-bind="chartText.JS.lefttext.text"></b><b class="c6_fbar_usedtext_value" ng-bind="avgremain.v+avgremain.u"></b></span></div>'
        + '<div class="c60_fbar_linewrap" ng-show="linewrapflag"><div class="c60_fbar_lineballwrap" id="c60_fbar_lineballwrap" style="position:absolute;top:0;" >'
        + '<canvas id="lineChart" class="c60_fbar_lineCanvas" style="position:absolute;top:0;left:0;z-index:99">browser does not support the canvas element.</canvas>'
        + '<div class="c60_fbar_lineballs"></div>'
        + '</div></div>'
        + '</div></div>',
        scope: {},
        controller: ["$scope", "$element", "$attrs", 'coreService',
        'coreUtils',
        'Const', function($scope, $element, $attrs, coreService, coreUtils, Const) {
            var linchart = angular.element($element[0].querySelector('.tbholder .c60_fbar_linechart'));
            $scope.linewrapflag = false;
            $scope.compData = {
                'CSS': {},
                'JS': {}
            };
            var setting = {
                'K': 1024,
                'M': 1024 * 1024,
                'G': 1024 * 1024 * 1024,
                'T': 1024 * 1024 * 1024 * 1024
            };

            $scope.transferK = function(value, keepfloat) {
                var n = keepfloat || 2;
                return coreUtils.trafficValueTransferfromKB(value, n);

            }
            ;
            $scope.eventMap = {};
            $scope.init = function() {}
            ;
            $scope.showLine = function(config) {

                if (config) {
                    var chartConfig = config.JS.chartConfig || {};
                    $scope.chartText = config.JS.chartText || {};
                    //单位转换
                    if (config.trraficdata.avgremain && config.trraficdata.avgused && config.trraficdata.trafficchart) {
                        $scope.linewrapflag = true;
                        $scope.avgremain = $scope.transferK(config.trraficdata.avgremain.value);
                        $scope.avgused = $scope.transferK(config.trraficdata.avgused.value);
                        var trafficchart = config.trraficdata.trafficchart;
                        var drawLine = function() {
                            var lineballs = angular.element($element[0].querySelector('.c60_fbar_lineballs'))[0];
                            var canvas = top.document.getElementById('lineChart');
                            var canvaswrap = angular.element($element[0].querySelector('.c60_fbar_lineballwrap'));
                            var ctxt = canvas.getContext("2d");

                            var lineDate = []
                              , lineValue = []
                              , traffic = [];
                            var list = [], currentC, bglinearray = [];
                            var trafficlen = trafficchart.length;
                            var myDate = new Date();
                            var day = myDate.getDate();

                            if (trafficlen > 0) {

                                if (trafficlen > chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'right': '0px'
                                    });
                                } else if (trafficlen < chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'left': '0px'
                                    });
                                } else if (trafficlen == chartConfig.showNumber) {
                                    canvaswrap.css({
                                        'right': '0px'
                                    });
                                }
                            }

                            //将data放进数组lineDate,将value放进数组lineValue
                            var tralen;
                            if (trafficlen < 8 && trafficlen > 0) {
                                tralen = 7;
                            } else {
                                tralen = trafficlen;
                            }
                            for (var n = 0; n < tralen; n++) {
                                lineDate[n] = parseInt(n + 1);
                            }
                            for (var i = 0; i < trafficlen; i++) {
                                lineValue[i] = trafficchart[i].traffic;
                                traffic[i] = $scope.transferK(trafficchart[i].traffic);
                            }
                            lineValue.push(config.trraficdata.avgremain.value);
                            lineValue.push(config.trraficdata.avgused.value);
                            //计算spacing的大小定义canvas的宽度
                            var clientW = top.window.innerWidth
                              , clientH = top.window.innerHeight
                              , baseWidth = 320;
                            var ratio;
                            var metas = top.document.getElementsByName("viewport")[0];
                            var heads = top.document.getElementsByTagName('head')[0];
                            if (metas != undefined) {
                                var widthV = metas.getAttribute('content').split(',')[1].split('width=')[1];
                                if (/taobao/.test(top.window.location.href)) {
                                    if (/tmall|ju|jhs|taoshenghuo|app/.test(top.window.location.href)) {
                                        ratio = 1;
                                    } else {
                                        var value1 = parseFloat(metas.getAttribute('content').split(',')[0].split('initial-scale=')[1]).toFixed(2);
                                        ratio = Math.round(1 / value1 * 100) / 100;
                                    }

                                } else {
                                    if (/163/.test(top.window.location.href)) {
                                        if (navigator.userAgent.indexOf("iPhone") != -1) {
                                            if (navigator.userAgent.indexOf("NewsApp") != -1) {
                                                ratio = 2;
                                            } else {
                                                ratio = 1;
                                            }
                                            if (/m.163/.test(top.window.location.href)) {
                                                ratio = 2;
                                            }

                                        } else if (navigator.userAgent.indexOf("Android") != -1) {
                                            if (navigator.userAgent.indexOf("NewsApp") != -1) {
                                                ratio = 1;
                                            } else {
                                                ratio = 1;
                                            }
                                            if (/m.163/.test(top.window.location.href)) {
                                                ratio = 2;
                                            }
                                        } else {
                                            ratio = 1;
                                        }
                                    } else {
                                        ratio = 1;
                                    }


                                }
                            } else {
                                ratio = top.window.innerWidth / 320;
                            }
                            var lastwidth = ratio == 1 ? 30 : 60;
                            chartConfig.xStartSpacing = ratio == 1 ? 30 : chartConfig.xStartSpacing;
                            chartConfig.spacing = parseInt((clientW - chartConfig.xStartSpacing - lastwidth) / parseInt(chartConfig.showNumber - 1));
                            var canvasWidth = parseInt((tralen - 1) * chartConfig.spacing) + parseInt(chartConfig.xStartSpacing) + lastwidth;
                            canvaswrap.css('width', canvasWidth + 'px');
                            canvas.setAttribute("width", canvasWidth + 'px');
                            canvas.setAttribute("height", 160 * ratio + 'px');
                            canvas.setAttribute("style", "border-bottom:1px solid #ccc");
                            //定义原点坐标,纵向刻度的范围
                            var originPointX = 0
                              , originPointY = 130 * ratio
                              , yheight = 100 * ratio;
                            //查找lineValue中的最大最小值
                            function getMaximin(arr, maximin) {
                                if (maximin == "max") {
                                    return Math.max.apply(Math, arr);
                                } else if (maximin == "min") {
                                    return Math.min.apply(Math, arr);
                                }
                            }
                            var maxnum = getMaximin(lineValue, "max");
                            var minnum = getMaximin(lineValue, "min");
                            var numcut = parseInt(maxnum - minnum);
                            //计算已用日均的高度，剩余日均的高度
                            var avgusedheight, avgremainheight;
                            avgusedheight = Math.abs(yheight / numcut * (config.trraficdata.avgused.value - minnum)),
                            avgremainheight = Math.abs(yheight / numcut * (config.trraficdata.avgremain.value - minnum));
                            //定义纵向起点，获取纵向背景线
                            var Starty0 = originPointY
                              , Startx0 = parseInt(originPointX + chartConfig.xStartSpacing)
                              , xpad = 0;
                            var yStartArray = []
                              , yEndArray = [];
                            var pointArray = []
                              , arraya = []
                              , Xcontentarray = [];
                            for (var j = 0; j < tralen; j++) {
                                var yy1 = parseInt(Starty0 - yheight)
                                  , yx1 = parseInt(Startx0 + xpad);
                                var py1 = parseInt(Starty0 - (yheight / numcut * (lineValue[j] - minnum)))
                                  , px1 = parseInt(Startx0 + xpad);
                                xpad = parseInt(xpad + chartConfig.spacing);
                                yStartArray[j] = [yx1 + "," + yy1];
                                yEndArray[j] = [yx1 + "," + Starty0];

                                //获取折线圆点坐标
                                if (trafficlen == 1) {
                                    arraya[j] = {
                                        x: px1,
                                        y: py1
                                    }
                                } else if (trafficlen > 1) {
                                    arraya[j] = {
                                        x: px1,
                                        y: py1
                                    }
                                }
                                pointArray.push(arraya[j]);
                                //显示背景线
                                if (chartConfig.isShowBgLine) {

                                    ctxt.beginPath();
                                    ctxt.strokeStyle = chartConfig.bgLineColor;
                                    ctxt.lineWidth = chartConfig.bgLineWidth;
                                    ctxt.moveTo(yx1, yy1);
                                    ctxt.lineTo(yx1, Starty0);
                                    ctxt.stroke();
                                    ctxt.closePath();
                                }
                                //显示横向内容
                                if (chartConfig.isShowXContent) {
                                    if (j == (day - 1)) {
                                        var Xcontent = angular.element('<div class="c60_fbar_xcontents">' + chartConfig.todayText + '</div>')[0];
                                        Xcontentarray.push(Xcontent);
                                        lineballs.appendChild(Xcontent);
                                        angular.element(Xcontentarray[j]).css({
                                            'width': chartConfig.spacing + 'px',
                                            'left': parseInt(yx1) + 'px',
                                            'top': originPointY + 'px',
                                            'font': chartConfig.XContentCurrentFont,
                                            'color': chartConfig.XContentCurrentColor,
                                            'word-wrap': 'normal',
                                            'white-space': 'nowrap',
                                            'margin-left': -chartConfig.spacing * 0.5 + 'px'
                                        });
                                    } else {
                                        var Xcontent = angular.element('<div class="c60_fbar_xcontents">' + lineDate[j] + '</div>')[0];
                                        Xcontentarray.push(Xcontent);
                                        lineballs.appendChild(Xcontent);
                                        angular.element(Xcontentarray[j]).css({
                                            'width': chartConfig.spacing + 'px',
                                            'left': parseInt(yx1) + 'px',
                                            'top': originPointY + 'px',
                                            'font': chartConfig.XContentFont,
                                            'color': chartConfig.XContentColor,
                                            'margin-left': -chartConfig.spacing * 0.5 + 'px'
                                        });
                                    }
                                }
                            }
                            drawPolygon(ctxt);
                            //画多边形
                            function drawPolygon(ctxt) {
                                if (chartConfig.PolygonShow) {
                                    ctxt.beginPath();

                                    ctxt.moveTo(pointArray[0].x, pointArray[0].y);
                                    for (var xx = 0; xx < trafficlen - 1; xx++) {
                                        ctxt.fillStyle = chartConfig.PolygonColor;
                                        ctxt.lineTo(pointArray[xx + 1].x, pointArray[xx + 1].y);
                                    }
                                    ctxt.lineTo(pointArray[trafficlen - 1].x, Starty0);
                                    ctxt.lineTo(Startx0, Starty0);
                                    ctxt.fill();
                                    ctxt.closePath();
                                }
                            }
                            drawPolyLine(ctxt);
                            //画折线
                            function drawPolyLine() {
                                for (var x = 0; x < trafficlen - 1; x++) {

                                    if (chartConfig.polyLineShow) {
                                        ctxt.beginPath();
                                        ctxt.strokeStyle = chartConfig.lineColor;
                                        ctxt.lineWidth = chartConfig.lineWidth;
                                        ctxt.moveTo(pointArray[x].x, pointArray[x].y);
                                        ctxt.lineTo(pointArray[x + 1].x, pointArray[x + 1].y);
                                        ctxt.stroke();
                                        ctxt.closePath();
                                    }
                                }
                            }
                            //画圆
                            if (chartConfig.polyPointShow) {
                                drawCircle();
                            }
                            function drawCircle() {
                                var dot = []
                                  ,
                                dotdetail = [];
                                for (var i = 0; i < trafficlen; i++) {

                                    var linecircle = angular.element('<div class="c60_fbar_linecirclewrap"><div class="c60_fbar_linecircle"></div></div>')[0];
                                    var linecontent = angular.element('<div class="c60_fbar_linecontent">' + traffic[i].v + traffic[i].u + '</div>')[0];
                                    dot.push(linecircle);
                                    dotdetail.push(linecontent);
                                    lineballs.appendChild(linecircle);
                                    lineballs.appendChild(linecontent);
                                }

                                //设置圆的样式

                                for (var j = 0; j < trafficlen; j++) {
                                    angular.element(dot[j]).css({
                                        'left': pointArray[j].x + 'px',
                                        'top': pointArray[j].y + 'px'

                                    });
                                    angular.element(dotdetail[j]).css({
                                        'left': pointArray[j].x + 'px',
                                        'top': pointArray[j].y + 'px'

                                    });

                                    var _touchstart = Const.touchEvent.start
                                      ,
                                    _touchend = Const.touchEvent.end
                                      ,
                                    dotcontainer = angular.element(dot[j]);
                                    var f = (function(j) {

                                        var touch = function(e) {

                                            e.stopPropagation();
                                            e.preventDefault();

                                            for (var i = 0; i < trafficlen; i++) {
                                                if (i != j) {

                                                    angular.element(dot[i]).removeClass('c60_fbar_curcircle').css({
                                                        '-webkit-transform': 'scale(1)',
                                                        '-moz-transform': 'scale(1)',
                                                        '-o-transform': 'scale(1)',
                                                        '-ms-transform': 'scale(1)',
                                                        'transform': 'scale(1)',
                                                        'margin-left': '-0.3em',
                                                        'margin-top': '-0.3em',
                                                    });
                                                    angular.element(dotdetail[i]).removeClass('c60_fbar_curcontent').css({
                                                        'display': 'none'
                                                    });
                                                }
                                            }
                                            angular.element(dot[j]).addClass('c60_fbar_curcircle').css({
                                                '-webkit-transform': 'scale(1.5)',
                                                '-moz-transform': 'scale(1.5)',
                                                '-o-transform': 'scale(1.5)',
                                                '-ms-transform': 'scale(1.5)',
                                                'transform': 'scale(1.5)',
                                                'margin-left': '-0.15em',
                                                'margin-top': '-0.15em',
                                            });
                                            angular.element(dotdetail[j]).addClass('c60_fbar_curcontent').css({
                                                'display': 'block'
                                            });

                                        }
                                        return touch;

                                    })(j)
                                    dotcontainer.bind(_touchstart, f);

                                }

                            }
                            //已用日均线
                            if (chartConfig.avgusedlineShow) {
                                var avgusedline = angular.element('<div class="c60_fbar_avgusedline"></div>')[0];
                                lineballs.appendChild(avgusedline);
                                var avgusedlines = angular.element($element[0].querySelector('.c60_fbar_avgusedline'));
                                if (metas != undefined) {
                                    avgusedlines.css('border-top', '1px solid #ccc');
                                }
                                var avgusedlineWidth = parseInt(pointArray[trafficlen - 1].x - originPointX)
                                  , avgusedlineHeight = Math.abs(parseInt(originPointY - avgusedheight));
                                avgusedlines.css({
                                    'top': avgusedlineHeight + 'px',
                                    'width': avgusedlineWidth + 'px',
                                    'border-color': chartConfig.avgusedlineStyle
                                });



                            }
                            //剩余日均线
                            if (chartConfig.avgremainlineShow) {
                                var avgremainline = angular.element('<div class="c60_fbar_avgremainline"></div>')[0];
                                lineballs.appendChild(avgremainline);
                                var avgremainlines = angular.element($element[0].querySelector('.c60_fbar_avgremainline'));
                                if (metas != undefined) {
                                    avgremainlines.css('border-top', '1px dotted #ccc');
                                }
                                var avgremainlineWidth = parseInt(canvasWidth - pointArray[trafficlen - 1].x)
                                  , avgremainlineHeight = Math.abs(parseInt(originPointY - avgremainheight));
                                avgremainlines.css({
                                    'top': avgremainlineHeight + 'px',
                                    'left': parseInt(pointArray[trafficlen - 1].x - originPointX) + 'px',
                                    'width': avgremainlineWidth + 'px',
                                    'border-color': chartConfig.avgremainlineStyle
                                });

                            }

                        }
                        ;
                        drawLine();
                        if (chartConfig.showNumber < trafficchart.length) {
                            dragMove();
                        }

                    } else {
                        linchart.css('height', '4em');
                        $scope.linewrapflag = false;
                    }

                }

            }
            ;

            var totaldistance = 0;

            //滑动canvas
            var dragMove = function() {
                var _touchstart = Const.touchEvent.start;
                var _touchmove = Const.touchEvent.move;
                var _touchend = Const.touchEvent.end;
                var _lastYPos = 0;
                var _lastXPos = 0;
                var _currentYPos = 0;
                var _currentXPos = 0;
                var moveflag = false;
                var lineChart = angular.element($element[0].querySelector('#c60_fbar_lineballwrap'));
                lineChart.bind(_touchstart, function(e) {

                    _lastXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    _lastYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    moveflag = false;
                });
                lineChart.bind(_touchmove, function(e) {


                    _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                    _currentYPos = e.touches ? e.touches[0].pageY : e.pageY;
                    if (!moveflag && Math.abs(_currentYPos - _lastYPos) > Math.abs(_currentXPos - _lastXPos)) {

                        return;
                    }
                    //if(Math.abs(_currentYPos - _lastYPos) == 0){

                    if (Math.abs(_currentXPos - _lastXPos) > 3 || moveflag) {
                        e.stopPropagation();
                        e.preventDefault();
                        moveflag = true;
                        var canWidth = parseInt(lineChart.css('width'));
                        var screenWidth = top.window.innerWidth;
                        var leftdis = parseInt(canWidth - screenWidth);
                        if (moveflag) {
                            var xdistance = _currentXPos - _lastXPos;
                            _lastXPos = _currentXPos;
                            totaldistance = totaldistance + xdistance;
                            if (totaldistance <= 0) {

                                totaldistance = 0;
                            }
                            else if (totaldistance > leftdis) {
                                totaldistance = leftdis;
                            }
                            lineChart.css({
                                '-webkit-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-moz-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-o-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                '-ms-transform': 'translateX(' + totaldistance + 'px)'
                            });
                            lineChart.css({
                                'transform': 'translateX(' + totaldistance + 'px)'
                            });
                        }
                    }
                    //}


                });
                lineChart.bind(_touchend, function(e) {
                    moveflag = false;
                });
            }
            ;

            $scope.$on('lineconfig', function(event, data) {
                $scope.showLine(data);

            });

        }
        ],
        link: function($scope, $element, $attrs, ctl) {

            $scope.pageID = ctl.pageID;
            $scope.componentType = 'linechart';
            $scope.init();
        }
    }
}
]);
