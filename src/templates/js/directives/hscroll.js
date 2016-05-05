//usage:<hpanel hcroll>
// this directive can be use to scroll left or rihgt
//element which use this directive need define width
uiCore.directive('hscroll', function() {
    return {
        restrict: 'A',
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'Const',
        function($scope, $element, $attrs, $timeout, Const) {
            var children, wrapperDiv, minHeight = 0, scrollDiv = angular.element('<div style="height:100%;overflow:hidden;"></div>'),
            wrapper = function() {
                children = $element.children();
                minWidth = parseInt(top.window.getComputedStyle($element[0], null )['width']);
                wrapperDiv = angular.element('<div class="ui-com-hscroll-wrapper" style="height:100%;"></div>');
                setWidth();
                wrapperDiv.append(children);
                scrollDiv.append(wrapperDiv);
                $element.append(scrollDiv);
                if ($scope.hscrollType == "1")
                {
                    $element.append('<div class="ui-com-hscroll-left-arrow"></div><div  class="ui-com-hscroll-right-arrow"></div>');
                }

            }
            ,
            setWidth = function() {
                var totalWidth = 0;
                style = null ;
                for (var i = 0; i < children.length; i++) {
                    style = top.window.getComputedStyle(children[i], null );
                    totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);

                }
                if (totalWidth < minWidth) {
                    totalWidth = minWidth;
                }
                var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);

                //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
                //console.log("minWidth:"+widdd);
                //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);


                //wrapperDiv.css('width', (totalWidth-10 / fontSize)+ 'em');
                wrapperDiv.css('width', (totalWidth / fontSize) + 'em');

            }
            ,
            getWidth = function() {

            /*
                    	var totalWidth = 0;
                             style = null;
                         for (var i = 0; i < scrollDiv[0].children.length; i++) {
                             style = top.window.getComputedStyle(children[i], null);
                             totalWidth += children[i].offsetWidth + parseInt(style['marginLeft']) + parseInt(style['marginRight']);

                         }
                         if (totalWidth < minWidth) {
                             totalWidth = minWidth;
                         }
                      */

            //console.log(children.length * parseFloat($scope.compData.JS.tabStyle.defaultStyle.width.substring(0,$scope.compData.JS.tabStyle.defaultStyle.width.indexOf('em'))));
            //console.log("minWidth:"+widdd);
            //console.log("widhh:"+totalWidth+"..." + fontSize+"..."+totalWidth / fontSize);
            //console.log(" Width1:",totalWidth);
            // wrapperDiv.css('width', (totalWidth / fontSize)-10+ 'em');
            // return totalWidth;
            }
            ,
            bind = function() {
                var _touchstart = Const.touchEvent.start
                  ,
                _touchmove = Const.touchEvent.move
                  ,
                _touchend = Const.touchEvent.end;
                scrollDiv.bind(_touchstart, function(e) {
                    //e.stopPropagation();
                    //e.preventDefault();
                    setWidth();


                    var fontSize = parseInt(top.window.getComputedStyle($element[0], null )['fontSize']);

                    var _lastXPos = e.touches ? e.touches[0].pageX : e.pageX
                      ,
                    target = e.target
                      ,
                    touch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        var _currentXPos = e.touches ? e.touches[0].pageX : e.pageX;
                        var xdistance = _currentXPos - _lastXPos;
                        // console.log("current postion:"+_currentXPos);
                        // console.log("last postion:"+_lastXPos);
                        _lastXPos = _currentXPos;
                        scrollDiv[0].scrollLeft -= xdistance;

                        //console.log(" Width2:",parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft),"width2:",wrapperDiv[0].offsetWidth);

                        if ($scope.hscrollType == "1")
                        {
                            if (parseInt(scrollDiv[0].scrollLeft) <= 0)
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');
                            }
                            else if (parseInt(scrollDiv[0].offsetWidth + scrollDiv[0].scrollLeft) + 2 >= wrapperDiv[0].offsetWidth)
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                            }
                            else
                            {
                                angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '1.15');
                                angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '1.15');

                            }
                        }

                    }
                      ,
                    touchstart = function(e)
                    {

                    //console.log("display DIV width:"+scrollDiv[0].offsetWidth);
                    //console.log("max container width:"+wrapperDiv[0].offsetWidth);
                    //console.log("moved left position:"+scrollDiv[0].scrollLeft);

                    /*
								 * if($scope.hscrollType=="1")
	                             {
									if(parseInt(scrollDiv[0].scrollLeft)<=0)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');
									}
									else if(parseInt(scrollDiv[0].offsetWidth+scrollDiv[0].scrollLeft)>=wrapperDiv[0].offsetWidth)
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									}
									else
									{
									angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity','1.15');
									angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity','1.15');

									}
								}
								 */



                    }
                      ,
                    endTouch = function(e) {
                        //e.stopPropagation();
                        //e.preventDefault();
                        angular.element($element[0].querySelector('.ui-com-hscroll-left-arrow')).css('opacity', '0');
                        angular.element($element[0].querySelector('.ui-com-hscroll-right-arrow')).css('opacity', '0');

                        top.document.removeEventListener(_touchmove, touch, false);
                        top.document.removeEventListener(_touchend, endTouch, false);
                    }
                    ;
                    //top.document.addEventListener(_touchstart, touchstart, false);
                    top.document.addEventListener(_touchmove, touch, false);
                    top.document.addEventListener(_touchend, endTouch, false);
                });
            }
            ,
            scroll = function() {
                bind();
                wrapper();
            }
            ;
            $timeout(scroll, 0);
        }
        ],
        link: function($scope, element, $attrs) {
            //        	console.log("hscrolltype1",$attrs['hscrolltype']);

            $scope.hscrollType = $attrs['hscrolltype'];
            var eleft = element[0].offsetLeft;
            var etop = element[0].offsetTop;
            var eWidth = element[0].offsetWidth;
            var eHeight = element[0].offsetHeight;
            //             console.log(element[0].offset);
        }
    };
});
