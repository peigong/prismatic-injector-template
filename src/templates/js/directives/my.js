uiCore.directive('my', function() {
    return {
        restrict: 'EA',
        replace: true,
        require: '^pid',
        template: '<div>' + '<div class="c60_fbar_mine_result_waiting"><div class="c60_fbar_datouwang8"><div class="c60_fbar_datouwang8-container c60_fbar_container1"><div class="c60_fbar_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container1_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container1_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container1_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container2"><div class="c60_fbar_circle1 c60_fbar_container2_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container2_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container2_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container2_circle4 c60_fbar_container_div"></div></div><div class="c60_fbar_datouwang8-container c60_fbar_container3"><div class="c60_fbar_circle1 c60_fbar_container3_circle1 c60_fbar_container_div"></div><div class="c60_fbar_circle2 c60_fbar_container3_circle2 c60_fbar_container_div"></div><div class="c60_fbar_circle3 c60_fbar_container3_circle3 c60_fbar_container_div"></div><div class="c60_fbar_circle4 c60_fbar_container3_circle4 c60_fbar_container_div"></div></div></div><div class="c60_fbar_tips_txt_loading ng-binding" ng-bind="compData.JS.loadingtext.JS.textdata">爱我，别走~~</div></div><div class="c60_fbar_mine_result" ><div><div class="c60_fbar_mine_result_con" ><div class="c60_fbar_mine_result_con_img"><span class="c60_fbar_mine_result_con_img_span" ng-show="compData.JS.c60_fbar_mine_result.JS.isShow"   ng-style="getStyle(\'c60_fbar_mine_result\')"></span></div><div class="c60_fbar_mine_result_title " ng-show="compData.JS.c60_fbar_mine_result.JS.isShow" ng-bind="compData.JS.c60_fbar_mine_result.JS.title"></div><div class="c60_fbar_mine_result_btn" ><a class="c60_fbar_my_result_link_btn" ng-show="compData.JS.c60_fbar_my_result_link_btn.JS.isShow" ng-click="click(\'c60_fbar_my_result_link_btn\');$event.stopPropagation();" ng-bind="compData.JS.c60_fbar_my_result_link_btn.JS.text"  ng-style="getStyle(\'c60_fbar_my_result_link_btn\')"></a></div></div></div></div>' + '<div class="c60_fbar_mine_tips" ng-style="getStyle(\'c60_fbar_mine_tips\')"><div class="c60_fbar_mine_tipstext" ng-style="getStyle(\'c60_fbar_mine_tipstext\')" ng-bind="compData.JS.c60_fbar_mine_tipstext.JS.waitmessage"></div></div><div class="c60_fbar_mine_pop_block"></div>' + '   <div class="c60_fbar_memberday_pop">' + '    <div class="c60_fbar_memberday_pop_top">' + '      <div class="c60_fbar_memberday_pop_tit">' + '         <span class="c60_fbar_memberday_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_member_tips.JS.title"></span>' + '         <span class="c60_fbar_memberday_pop_tit_close"  ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '     </div>' + '     </div>' + '     <div class="c60_fbar_memberday_pop_bottom">' + '       <div class="c60_fbar_memberday_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_member_tips.JS.text)"></div>' + '     </div>' + '   </div>	' + '   <div class="c60_fbar_qiandao_pop">' + '      <div class=" c60_fbar_qiandao_pop_top">' + '        <div class="c60_fbar_qiandao_pop_tit">' + '           <span class="c60_fbar_qiandao_pop_tit_txt" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.title"></span>' + '           <span class="c60_fbar_qiandao_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==0">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0"><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessagebegin"></i><span ng-bind="revData.respparam.vaIncreased"></span><i ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.unit"></i></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==0" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessageend"></div><div class="c60_fbar_qiandao_pop_bottom_txt" ng-show="vaIncreasedFlag==1" ng-bind="compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.successmessage"></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_successbtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_successbtn.JS.text"  ccid="c60_fbar_my_tips_successbtn" ng-click="click(\'c60_fbar_my_tips_successbtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==1">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage1)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ng-show="compData.JS.c60_fbar_my_tips_failurebtn.JS.isShow" ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '     <div class="c60_fbar_qiandao_pop_bottom" ng-show="signResultFlag==2">' + '       <div class="c60_fbar_qiandao_pop_bottom_txt c60_fbar_qiandao_pop_bottom_txt2"  ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_attend_tips.JS.resultmessage.failuremessage2)" ></div>' + '       <div class="c60_fbar_qiandao_pop_bottom_btn" ccid="c60_fbar_my_tips_failurebtn" ng-click="click(\'c60_fbar_my_tips_failurebtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_tips_failurebtn.JS.text"  ng-style="getStyle(\'c60_fbar_my_head_attend_tips_textbtn\')"></div>' + '     </div>' + '   </div>' + '   <div class="c60_fbar_qiandao_rule_pop">' + '     <div class="c60_fbar_qiandao_rule_pop_top">' + '       <div class="c60_fbar_qiandao_rule_pop_tit">' + '         <span class="c60_fbar_qiandao_rule_pop_tit_txt"  ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.title" ></span>' + '         <span class="c60_fbar_qiandao_rule_pop_tit_close" ccid="c60_fbar_my_tips_closebtn" ng-click="click(\'c60_fbar_my_tips_closebtn\');$event.stopPropagation();"  ng-style="getStyle(\'c60_fbar_my_tips_closebtn\')"></span>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_qiandao_rule_pop_bottom">' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc1)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc2)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_txt" ng-bind-html="to_trusted(compData.JS.c60_fbar_my_head_rule_tips.JS.listdesc3)"></div>' + '        <div class="c60_fbar_qiandao_rule_pop_bottom_linktxt"><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textbegin"></i><a class="c60_fbar_qiandao_rule_pop_bottom_orangelinktxt"  ng-style="getStyle(\'c60_fbar_my_rule_textbtn\')" ccid="c60_fbar_my_rule_textbtn" ng-click="click(\'c60_fbar_my_rule_textbtn\');$event.stopPropagation();"  ng-bind="compData.JS.c60_fbar_my_rule_textbtn.JS.text"></a><i ng-bind="compData.JS.c60_fbar_my_head_rule_tips.JS.textend"></i></div>' + '    </div> ' + '  </div>' + '<div class="c60_fbar_my_con" ><div class="c60_fbar_my_conscroll" simplescroll>' + '   <div class="c60_fbar_my_top clearfloat" >' + '    <div class="c60_fbar_my_img_txt">' + '     <span class="c60_fbar_my_head_ico" ng-style="getStyle(\'c60_fbar_my_head_ico\')" ng-show="compData.JS.c60_fbar_my_head_ico.JS.isShow"></span>' + '     <div class="c60_fbar_my_txt" >' + '      <p class="c60_fbar_moblie" ng-bind-html="to_trusted(phoneFilter(revData.respparam.msisdn))"></p>' + '     <div class="c60_fbar_my_level">' + '     <span class="c60_fbar_my_degree" ng-show="compData.JS.c60_fbar_my_head_degree.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_degree\')"><i class="c60_fbar_degreeunit" ng-bind="compData.JS.c60_fbar_my_head_degree.JS.text"></i> <i class="c60_fbar_degreenumber" ng-bind="revData.respparam.level"></i></span>' + '     <span class="c60_fbar_my_member" ng-show="compData.JS.c60_fbar_my_head_member.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_member\')"  ccid="c60_fbar_my_head_member"  ng-click="click(\'c60_fbar_my_head_member\');$event.stopPropagation();" ><i ng-bind="compData.JS.c60_fbar_my_head_member.JS.text"></i><i class="c60_fbar_my_head_member_redpoint" ng-show="RedPointFlag==true"></i></span>' + '     </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_attend_btn" >' + '    <span class="c60_fbar_attend_rule" ng-show="compData.JS.c60_fbar_my_head_rule.JS.isShow" ng-style="getStyle(\'c60_fbar_my_head_rule\')" ng-bind="compData.JS.c60_fbar_my_head_rule.JS.text"  ccid="c60_fbar_my_head_rule"  ng-click="click(\'c60_fbar_my_head_rule\');$event.stopPropagation();"></span>' + '     <a class="c60_fbar_attend_btn_link" ng-style="getattend_btn_linkStyle()" ng-bind="c60_fbar_attend_btn_text" ccid="c60_fbar_my_attend_btn" ng-click="click(\'c60_fbar_attend_btn\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_attend_btn_link.JS.isShow"></a>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con" >' + '<div class="c60_fbar_my_list c60_fbar_my_list_coin" ccid="c60_fbar_my_list_coin" ng-click="click(\'c60_fbar_my_list_coin\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_coin.JS.isShow">    <div class="c60_fbar_my_list_detail clearfloat">    <div class="c60_fbar_cointitle">    <span class="c60_fbar_mylist c60_fbar_my_list_coin" ng-style="getStyle(\'c60_fbar_my_list_coin\')" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.text" ></span><span class="c60_fbar_my_list_coin_num " ng-style="getStyle(\'c60_fbar_my_list_coin_num\')" ng-show="compData.JS.c60_fbar_my_list_coin_num.JS.isShow"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'mycoin\'))"></span>    </div>    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_coin.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_coin\')" ></span>    </div>     </div>    </div>   <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_coin.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div> <div class="c60_fbar_my_list c60_fbar_my_list_wealth"  ccid="c60_fbar_my_list_wealth" ng-click="click(\'c60_fbar_my_list_wealth\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_wealth" ng-style="getStyle(\'c60_fbar_my_list_wealth\')" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_wealth.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_wealth\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_red.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_wealth.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_wealth\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_flowcurrency.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind-html="to_trusted(unitFilter(revData.respparam.coin,\'coin\'))"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_flowcurrency" ng-click="click(\'c60_fbar_my_flowcurrency\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_flowcurrency.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_luckdraw.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind-html="to_trusted(unitFilter(revData.respparam.wodou,\'wodou\'))" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_luckdraw" ng-click="click(\'c60_fbar_my_luckdraw\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_luckdraw.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_wealth\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_red"  ccid="c60_fbar_my_list_red" ng-click="click(\'c60_fbar_my_list_red\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_red.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_red" ng-style="getStyle(\'c60_fbar_my_list_red\')" ng-bind="compData.JS.c60_fbar_my_list_red.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_red.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_red\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="(compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_discount.JS.isShow) || (compData.JS.c60_fbar_my_list_red.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow)"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_red\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_list_red_openred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.text"></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_openred" ng-click="click(\'c60_fbar_my_list_red_openred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_list_red_openred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_list_red_hairred.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_list_red_hairred" ng-click="click(\'c60_fbar_my_list_red_hairred\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_list_red_hairred.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '       </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_red\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_discount" ccid="c60_fbar_my_list_discount" ng-click="click(\'c60_fbar_my_list_discount\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat">' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_discount" ng-style="getStyle(\'c60_fbar_my_list_discount\')" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_discount.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_discount\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w" ng-show="showFlag==\'c60_fbar_my_list_discount\'"><div class="c60_fbar_my_border"></div></div>' + '    <div class="c60_fbar_my_list_second" ng-show="showFlag==\'c60_fbar_my_list_discount\'">' + '        <div class="c60_fbar_ml_second_con c60_fbar_my_bt_d8d8d8 c60_fbar_clearfloat" ng-show="compData.JS.c60_fbar_my_latestactivity.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.text"></div>' + '            <div class="c60_fbar_ml_second_con_middle"><div class="c60_fbar_ml_mysale_guaguaka" ng-style="getStyle(\'c60_fbar_my_latestactivity\')" >&nbsp;</div></div>' + '            <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_latestactivity" ng-click="click(\'c60_fbar_my_latestactivity\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')"  ng-bind="compData.JS.c60_fbar_my_latestactivity.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '        </div>' + '         <div class="c60_fbar_my_border_w c60_fbar_my_border_w2"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow"><div class="c60_fbar_my_border"></div></div>' + '        <div class="c60_fbar_ml_second_con c60_fbar_clearfloat"  ng-show="compData.JS.c60_fbar_my_preferences.JS.isShow">' + '           <div class="c60_fbar_ml_second_con_left" ng-bind="compData.JS.c60_fbar_my_preferences.JS.text" ></div>' + '           <div class="c60_fbar_ml_second_con_right"><span class="c60_fbar_ml_sc_right_btn" ccid="c60_fbar_my_preferences" ng-click="click(\'c60_fbar_my_preferences\');$event.stopPropagation();" ng-style="getStyle(\'c60_fbar_my_list_subitem_btn_link\')" ng-bind="compData.JS.c60_fbar_my_preferences.JS.c60_fbar_arrow_jump_text.JS.text"></span></div>' + '</div>' + '</div>' + '<div class="c60_fbar_my_border_w" ng-show="compData.JS.c60_fbar_my_list_discount.JS.isShow&&compData.JS.c60_fbar_my_list_privilege.JS.isShow"><div class="c60_fbar_my_border"></div></div>   <div class="c60_fbar_my_list c60_fbar_my_list_privilege" ccid="c60_fbar_my_list_privilege" ng-click="click(\'c60_fbar_my_list_privilege\');$event.stopPropagation();" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.isShow">' + '    <div class="c60_fbar_my_list_detail clearfloat">' + '    <div class="c60_fbar_cointitle">' + '    <span class="c60_fbar_mylist c60_fbar_my_list_privilege" ng-style="getStyle(\'c60_fbar_my_list_privilege\')" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.text" ></span>' + '    </div>' + '    <div class="c60_fbar_arrow_jump">       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_privilege.JS.c60_fbar_arrow_jump_text.JS.text"></span>       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_privilege\')" ></span>' + '    </div>     </div>    </div>' + '</div>' + '   <div class="c60_fbar_my_list_con" ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow || compData.JS.c60_fbar_my_list_task.JS.isShow">' + '<div class="c60_fbar_my_list c60_fbar_my_list_growup" ccid="c60_fbar_my_list_growup" ng-click="click(\'c60_fbar_my_list_growup\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_growup.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat " >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_growup" ng-style="getStyle(\'c60_fbar_my_list_growup\')" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_growup.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_growup\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '    <div class="c60_fbar_my_border_w"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"><div class="c60_fbar_my_border" ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow"></div></div>' + '    <div class="c60_fbar_my_list c60_fbar_my_list_task" ccid="c60_fbar_my_list_task" ng-click="click(\'c60_fbar_my_list_task\');$event.stopPropagation();"  ng-show="compData.JS.c60_fbar_my_list_task.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle" >' + '       <span class="c60_fbar_mylist c60_fbar_my_list_task" ng-style="getStyle(\'c60_fbar_my_list_task\')" ng-bind="compData.JS.c60_fbar_my_list_task.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_task.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_task\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_list_con " >' + '    <div class="c60_fbar_my_list c60_fbar_my_list_set"  ccid="c60_fbar_my_list_set" ng-click="click(\'c60_fbar_my_list_set\');$event.stopPropagation();"   ng-show="compData.JS.c60_fbar_my_list_set.JS.isShow">' + '     <div class="c60_fbar_my_list_detail clearfloat" >' + '      <div class="c60_fbar_cointitle">' + '       <span class="c60_fbar_mylist c60_fbar_my_list_set" ng-style="getStyle(\'c60_fbar_my_list_set\')" ng-bind="compData.JS.c60_fbar_my_list_set.JS.text"></span>' + '      </div>' + '      <div class="c60_fbar_arrow_jump">' + '       <span class="c60_fbar_arrow_jump_text" ng-show="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.isShow" ng-bind="compData.JS.c60_fbar_my_list_set.JS.c60_fbar_arrow_jump_text.JS.text"></span>' + '       <span class="c60_fbar_arrow_jump_ico" ng-style="getJumpStyle(\'c60_fbar_my_list_set\')"></span>' + '      </div>' + '     </div>' + '    </div>' + '   </div>' + '   <div class="c60_fbar_my_add_btn" ng-style="getStyle(\'c60_fbar_my_add_desktop\')" ng-show="compData.JS.c60_fbar_my_add_desktop.JS.isShow" ccid="c60_fbar_my_add_desktop" ng-click="click(\'c60_fbar_my_add_desktop\');$event.stopPropagation();"><span class="c60_fbar_my_add_btn_ico" ng-bind="compData.JS.c60_fbar_my_add_desktop_text.JS.text" ng-style="getStyle(\'c60_fbar_my_add_desktop_text\')"></span></div>' + '   </div>' + '</div>' + '</div>',
        scope: {},
        controller: [
        '$scope',
        '$element',
        '$attrs',
        '$timeout',
        'coreService',
        'coreUtils',
        'Const',
        '$sce',
        function($scope, $element, $attrs, $timeout, coreService, coreUtils, Const, $sce) {
            $scope.cid = $attrs.cid;
            $scope.eventMap = {};
            //页面元素配置项
            $scope.compData = {
                "CSS": {},
                "JS": {}
            };

            $scope.to_trusted = function(text) {
                if (text != null  && text != undefined) {
                    text = text + '';
                    return $sce.trustAsHtml(text.replace(/\n/g, "<br/>"));
                } else {
                    return "";
                }
            }
            ;
            $scope.memberInfoFlag = false;
            //初始化是否获取到用户信息标记
            $scope.c60_fbar_attend_btn_text = '';
            //初始化签到按钮文字
            $scope.c60_fbar_attend_btn_style = '';
            //初始化签到按钮样式
            $scope.RedPointFlag = false;
            //初始化小红点显示标记
            $scope.signResultFlag = -1;
            //签到结果标记
            $scope.showFlag = '';
            //显示标记
            $scope.vaIncreasedFlag = -1;
            //签到成功提醒类型标记
            $scope.time = '';


            //签到按钮状态
            $scope.getattend_btn_linkStyle = function() {
                if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state0;
                } else if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '1') {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                    $scope.c60_fbar_attend_btn_style = $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state1;
                } else {
                    $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                    $scope.c60_fbar_attend_btn_style = {
                        'background': '#ddd',
                        'color': '#FFFFFF'
                    };
                }

                return $scope.c60_fbar_attend_btn_style;
            }
            ;
            //手机号格式化
            $scope.phoneFilter = function(param) {
                if (param == undefined)
                    return '<i style="visibility:hidden">&nbsp;</i>';
                var phone = param.substring(0, 3) + "****" + param.substring(7);
                return phone;
            }
            ;
            //流量币和沃豆格式化
            $scope.unitFilter = function(param, type) {
                var total = 0;
                if (param == '' || param == undefined || Number(param) == 0) {
                    total = 0;
                } else {
                    total = parseInt(param).toString();

                    if (parseInt(param) % 10000 == 0 && parseInt(param) !== 0)
                    {
                        total = (parseInt(total) / 10000) + '万';
                    } else {
                        var m = (parseInt(total) / 10000).toString();
                        //total=(total>=10000)?m.substr(0,m.indexOf(".")+3)+'万':total;
                        var tfloatcount = Number($scope.compData.JS.tfloatcount || '2');
                        total = (total >= 10000) ? coreUtils.formatNum(parseInt(total) / 10000, tfloatcount) + '万' : total;
                    }

                }
                if (type == 'coin') {
                    num = $scope.compData.JS.c60_fbar_my_flowcurrency.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_flowcurrency.JS.unit;
                } else if (type == 'wodou') {
                    num = $scope.compData.JS.c60_fbar_my_luckdraw.JS.text + '<div class="c60_fbar_my_list_wealth_num">&nbsp;' + total + '&nbsp;</div>' + $scope.compData.JS.c60_fbar_my_luckdraw.JS.unit;
                } else {
                    num = total;
                }
                return num;
            }
            ;
            //样式赋值
            $scope.getStyle = function(classname) {
                if ($scope.compData.JS[classname] && $scope.compData.JS[classname].CSS) {
                    return $scope.compData.JS[classname].CSS;
                }
            }
            ;
            //箭头跳转样式赋值
            $scope.getJumpStyle = function(classname) {
                if (classname == $scope.showFlag && $scope.compData.JS[classname].JS.linktype == '2') {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state1;
                } else {
                    return $scope.compData.JS.c60_fbar_arrow_jump_ico.JS.stateconfig.state0;
                }
            }
            ;
            //会员日小红点状态
            $scope.show = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                    'display': 'block'
                });
                angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                    'display': 'block'
                });
                if ($scope.signResultFlag == 0 || $scope.signResultFlag == 1)
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                }
                else
                {
                    $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                }
                $scope.memberInfoFlag = true;
            }
            $scope.show2 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                    'display': 'block'
                });
            }
            //隐藏
            $scope.hide = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                    'display': 'none'
                });
            }
            ;
            //隐藏2
            /*$scope.hide2 = function() {
                	 angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({'display': 'none'});
                     angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({'display': 'none'});
                };*/
            //隐藏3
            $scope.hide3 = function() {
                angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                    'display': 'none'
                });
            }
            ;
            //样式和初始值配置和入
            $scope.extendComponentData = function(componetData) {
                $scope.compData = coreUtils.extendDeep($scope.compData, componetData);
            }
            ;
            //页面数据初始化
            $scope.init = function() {
                coreService.registerComponentInstance($element.attr('cid'), $scope);
                $scope.extendComponentData(coreService.getInitProperties($scope.cid) || {});
                $element.css($scope.compData.css || {});
                coreService.fireEvent($element.attr('cid'), 'init');
            }
            ;
            //用户信息：接收来自后台的数据
            $scope.memberinfo = function(param) {
                $scope.time = $scope.compData.JS.c60_fbar_mine_tips.JS.closetime;
                if (param && param.respparam) {
                    if (param.respparam.level && param.respparam.level !== '' && param.respparam.level !== undefined && param.respparam.jsessionid && param.respparam.jsessionid !== '' && param.respparam.jsessionid !== undefined) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        $scope.revData = param;
                        $scope.revData.respparam.coin = param.respparam.data[0].coin + '';
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou + '';
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_my_con')).css({
                            'display': 'block'
                        });
                        //判断是否会员日
                        param.respparam.memberdate = param.respparam.memberdate + '';
                        $scope.RedPointFlag = (param.respparam.memberdate == '1') ? true : false;
                        //判断是否可以签到
                        param.respparam.signflag = param.respparam.signflag + '';
                        if (param.respparam.signflag == '1') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        } else if (param.respparam.signflag == '0') {
                            $scope.memberInfoFlag = true;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text1;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '1';
                        } else {
                            $scope.memberInfoFlag = false;
                            $scope.c60_fbar_attend_btn_text = $scope.compData.JS.c60_fbar_attend_btn_link.JS.text0;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '0';
                        }
                    }
                    else
                    {
                        $timeout($scope.hide3, $scope.time);
                        $timeout($scope.show2, $scope.time);
                    }
                }
            }
            ;
            //签到成功：接收来自后台的数据
            $scope.signRet = function(param) {

                if (param && param.respparam) {
                    $scope.revData.respparam.jsessionid = param.respparam.jsessionid;
                    if (param.respparam.level !== '' && param.respparam.level && param.respparam.level !== undefined)
                        $scope.revData.respparam.level = param.respparam.level;
                    if (param.respparam.data[0].coin !== '' && param.respparam.data[0].coin && param.respparam.data[0].coin !== undefined)
                        $scope.revData.respparam.coin = param.respparam.data[0].coin;
                    if (param.respparam.data[0].wodou !== '' && param.respparam.data[0].wodou && param.respparam.data[0].wodou !== undefined)
                        $scope.revData.respparam.wodou = param.respparam.data[0].wodou;
                    if (param.respparam.vaIncreased !== '' && param.respparam.vaIncreased && param.respparam.vaIncreased !== undefined)
                    {
                        var vafloatcount = Number($scope.compData.JS.vafloatcount || '0');
                        $scope.revData.respparam.vaIncreased = coreUtils.formatNum(Number(param.respparam.vaIncreased), vafloatcount);
                        $scope.vaIncreasedFlag = 0;
                    } else {
                        $scope.vaIncreasedFlag = 1;
                    }
                    $scope.signResultFlag = 0;
                }
                $timeout($scope.hide, $scope.time);
                $timeout($scope.show, $scope.time);
            }
            ;
            //签到失败
            $scope.error = function(param) {
                if (param) {
                    if (param.errorcode == "1-140-1-027") {
                        $scope.signResultFlag = 1;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    } else {
                        $scope.signResultFlag = 2;
                        $timeout($scope.hide, $scope.time);
                        $timeout($scope.show, $scope.time);
                    }
                }
            }
            //外链内嵌和直接外链处理   0:外链内嵌  1:直接外链跳转  2:展开子项
            $scope.linkEvent = function(type, eventName) {
                if ($scope.memberInfoFlag) {
                    if ($scope.compData.JS[type].JS.linktype == '0') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        coreService.fireEvent($scope.cid, eventName, {
                            "url": url
                        });
                    } else if ($scope.compData.JS[type].JS.linktype == '1') {
                        var url = $scope.compData.JS[type].JS.url;
                        if (url.indexOf("{jsessionid}") != -1) {
                            url = url.replace("{jsessionid}", $scope.revData.respparam.jsessionid);
                        }
                        if (url.indexOf("{auth}") != -1) {
                            url = url.replace("{auth}", $scope.revData.respparam.auth);
                        }
                        if (url.indexOf("{msisdn}") != -1) {
                            url = url.replace("{msisdn}", $scope.revData.respparam.msisdn);
                        }
                        window.open(url);
                    } else {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                } else {
                    if ($scope.compData.JS[type].JS.linktype == '2') {
                        $scope.showFlag == type ? $scope.showFlag = '' : $scope.showFlag = type;
                    }
                }
            }
            //点击事件详情
            var myClick = {
                c60_fbar_my_result_link_btn: function(param) {
                    //*******************错误页面-返回首页按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'linkbtn')
                        };
                        angular.element($element[0].querySelector('.c60_fbar_mine_result')).css({
                            'display': 'none'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_mine_result_waiting')).css({
                            'display': 'none'
                        });
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_result_link_btn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'backclick');
                },
                c60_fbar_my_head_member: function(param) {
                    //*******************会员日按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'member')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_member.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    if (!$scope.RedPointFlag) {
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time);
                    } else {
                        $scope.linkEvent('c60_fbar_my_head_member', 'memberclick');
                    }
                },
                c60_fbar_my_head_rule: function(param) {
                    //*******************签到规则按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'rule')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_head_rule.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'block'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'block'
                    });
                    //$timeout($scope.hide2, $scope.time);
                },
                c60_fbar_my_rule_textbtn: function(param) {
                    //*******************签到规则-欢乐抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'textbtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_rule_textbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_rule_textbtn', 'rulebtnclick');
                },
                c60_fbar_my_tips_closebtn: function(param) {
                    //*******************弹出层关闭按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'closebtn')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_closebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_attend_btn: function(param) {
                    //*******************签到按钮*******************
                    if ($scope.memberInfoFlag == undefined)
                        return false;
                    if ($scope.memberInfoFlag)
                    {
                        if ($scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state == '0')
                        {
                            angular.element($element[0].querySelector('.c60_fbar_mine_tips')).css({
                                'display': 'block'
                            });
                            $scope.memberInfoFlag = undefined;
                            $scope.compData.JS.c60_fbar_attend_btn_link.JS.stateconfig.state = '2';
                            coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'attendclick');
                        }
                        else
                        {
                            $scope.signResultFlag = 1;
                            angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                                'display': 'block'
                            });
                            angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                                'display': 'block'
                            });
                            //$timeout($scope.hide2, $scope.time);
                        }
                    }
                    else
                    {
                        $scope.signResultFlag = 2;
                        angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                            'display': 'block'
                        });
                        angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                            'display': 'block'
                        });
                        //$timeout($scope.hide2, $scope.time);
                    }
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'attend')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_attend_btn_link.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                },
                c60_fbar_my_tips_successbtn: function(param) {
                    //*******************签到-去抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'success')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_successbtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                    $scope.linkEvent('c60_fbar_my_tips_successbtn', 'successbtnclick');
                },
                c60_fbar_my_tips_failurebtn: function(param) {
                    //*******************签到-ok按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'failure')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_tips_failurebtn.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    angular.element($element[0].querySelector('.c60_fbar_mine_pop_block')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_memberday_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_rule_pop')).css({
                        'display': 'none'
                    });
                    angular.element($element[0].querySelector('.c60_fbar_qiandao_pop')).css({
                        'display': 'none'
                    });
                },
                c60_fbar_my_list_coin: function(param) {
                    //*******************我的金币按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'coin')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_coin.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'coinclick');
                },
                c60_fbar_my_list_wealth: function(param) {
                    //*******************我的财富按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'wealth')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                },
                //                    c60_fbar_my_list_wealth: function(param) {
                //                        //*******************我的财富按钮*******************
                //                        if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig)) {
                //                            $scope.compData.JS['cdrData'] = {};
                //                            $scope.compData.JS.cdrData = {
                //                                'pageId': $scope.pageID,
                //                                'componentId': 'c60_fbar_my_list_wealth'
                //                            };
                //                            coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_wealth.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                //                        }
                //                        $scope.linkEvent('c60_fbar_my_list_wealth', 'wealthclick');
                //                    },
                c60_fbar_my_flowcurrency: function(param) {
                    //*******************我的财富-兑换流量币按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'flowcurrency')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_flowcurrency.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_flowcurrency', 'flowcurrencyclick');
                },
                c60_fbar_my_luckdraw: function(param) {
                    //*******************我的财富-沃豆抽奖按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'luckdraw')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_luckdraw.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_luckdraw', 'luckdrawclick');
                },
                c60_fbar_my_list_red: function(param) {
                    //*******************我的红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'red')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red', 'redclick');
                },
                c60_fbar_my_list_red_openred: function(param) {
                    //*******************我的红包-开红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'openred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_openred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_openred', 'openredclick');
                },
                c60_fbar_my_list_red_hairred: function(param) {
                    //*******************我的红包-发红包按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'hairred')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_red_hairred.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_red_hairred', 'hairredclick');
                },
                c60_fbar_my_list_discount: function(param) {
                    //*******************我的优惠*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'discount')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_discount.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                    $scope.linkEvent('c60_fbar_my_list_discount', 'discountclick');
                },
                c60_fbar_my_latestactivity: function(param) {
                    //*******************我的优惠-我要刮按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'latestactivity')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_latestactivity.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }

                    $scope.linkEvent('c60_fbar_my_latestactivity', 'latestactivityclick');
                },
                c60_fbar_my_preferences: function(param) {
                    //*******************我的优惠-去看看按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'preferences')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_preferences.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_preferences', 'oldcustomerpreferencesclick');
                },
                c60_fbar_my_list_privilege: function(param) {
                    //*******************我的特权按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'privilege')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_privilege.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'privilegeclick');
                },
                c60_fbar_my_list_growup: function(param) {
                    //*******************我的成长按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'growup')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_growup.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_growup', 'growupclick');
                },
                c60_fbar_my_list_task: function(param) {
                    //*******************我的任务按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'task')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_task.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    $scope.linkEvent('c60_fbar_my_list_task', 'taskclick');
                },
                c60_fbar_my_list_set: function(param) {
                    //*******************设置按钮*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'set')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_list_set.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    coreService.fireEvent($element.attr('cid'), $attrs['event'] || 'setclick');
                },
                c60_fbar_my_add_desktop: function(param) {
                    //*******************添加到桌面*******************
                    if (coreUtils.cdrUtils.canWriteUITracingCDR($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig)) {
                        $scope.compData.JS['cdrData'] = {};
                        $scope.compData.JS.cdrData = {
                            'pageId': $scope.pageID,
                            'componentId': coreUtils.createCdrid($scope.pageID, $attrs.cid, 'desktop')
                        };
                        coreUtils.cdrService($scope.compData.JS.c60_fbar_my_add_desktop.JS.cdrConfig.uitracingcdr, $scope.compData.JS.cdrData);
                    }
                    var u = navigator.userAgent;
                    if (/(android|Android)/ig.test(u))
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.androidurl);
                    }
                    else if (/(iPhone|iPad|iOS|iphone|ipad|ios)/ig.test(u))
                    {
                        window.open($scope.compData.JS.c60_fbar_my_add_desktop.JS.iosurl);
                    } else if (u.indexOf('Windows Phone') > -1) {

                    }
                }
            };
            //点击事件分割
            $scope.click = function(classname, param) {
                if (classname == undefined || classname == null ) {
                    return false;
                }
                switch (classname) {
                case 'c60_fbar_my_result_link_btn':
                    myClick.c60_fbar_my_result_link_btn(param);
                    break;
                case 'c60_fbar_my_head_member':
                    myClick.c60_fbar_my_head_member(param);
                    break;
                case 'c60_fbar_my_head_rule':
                    myClick.c60_fbar_my_head_rule(param);
                    break;
                case 'c60_fbar_my_rule_textbtn':
                    myClick.c60_fbar_my_rule_textbtn(param);
                    break;
                case 'c60_fbar_my_tips_closebtn':
                    myClick.c60_fbar_my_tips_closebtn(param);
                    break;
                case 'c60_fbar_attend_btn':
                    myClick.c60_fbar_attend_btn(param);
                    break;
                case 'c60_fbar_my_tips_successbtn':
                    myClick.c60_fbar_my_tips_successbtn(param);
                    break;
                case 'c60_fbar_my_tips_failurebtn':
                    myClick.c60_fbar_my_tips_failurebtn(param);
                    break;
                case 'c60_fbar_my_list_coin':
                    myClick.c60_fbar_my_list_coin(param);
                    break;
                case 'c60_fbar_my_list_wealth':
                    myClick.c60_fbar_my_list_wealth(param);
                    break;
                case 'c60_fbar_my_flowcurrency':
                    myClick.c60_fbar_my_flowcurrency(param);
                    break;
                case 'c60_fbar_my_luckdraw':
                    myClick.c60_fbar_my_luckdraw(param);
                    break;
                case 'c60_fbar_my_list_red':
                    myClick.c60_fbar_my_list_red(param);
                    break;
                case 'c60_fbar_my_list_red_openred':
                    myClick.c60_fbar_my_list_red_openred(param);
                    break;
                case 'c60_fbar_my_list_red_hairred':
                    myClick.c60_fbar_my_list_red_hairred(param);
                    break;
                case 'c60_fbar_my_list_discount':
                    myClick.c60_fbar_my_list_discount(param);
                    break;
                case 'c60_fbar_my_latestactivity':
                    myClick.c60_fbar_my_latestactivity(param);
                    break;
                case 'c60_fbar_my_preferences':
                    myClick.c60_fbar_my_preferences(param);
                    break;
                case 'c60_fbar_my_list_privilege':
                    myClick.c60_fbar_my_list_privilege(param);
                    break;
                case 'c60_fbar_my_list_growup':
                    myClick.c60_fbar_my_list_growup(param);
                    break;
                case 'c60_fbar_my_list_task':
                    myClick.c60_fbar_my_list_task(param);
                    break;
                case 'c60_fbar_my_list_set':
                    myClick.c60_fbar_my_list_set(param);
                    break;
                case 'c60_fbar_my_add_desktop':
                    myClick.c60_fbar_my_add_desktop(param);
                    break;
                default:
                    break;
                }
            }
            ;
            $scope.$on($scope.cid + '_handleEvent', function(eventObj, event, param, deferred) {
                $scope.eventMap[event](param);
                if (null  != deferred) {
                    deferred.resolve();
                }
            });
            $scope.eventMap['memberinfo'] = $scope.memberinfo;
            $scope.eventMap['error'] = $scope.error;
            $scope.eventMap['signRet'] = $scope.signRet;
        }
        ],
        link: function($scope, $element, $attrs, ctl) {
            $scope.pageID = ctl.pageID;
            $scope.componentType = "cmine";
            $scope.init();
        }
    };
});
