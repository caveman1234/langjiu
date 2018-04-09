/**
 * Created by 炎 on 2017/5/17 017.
 */
define(["EJS","EJSObj","right_pannel"],function(EJS,EJSObj,right_pannel){
     function init(){

         $(function(){

             //点击事件
             //点击人员事件
             $(".left-pannel-content").on("click",".person",function(){
                 var id   = $(this).attr("flagid");
                 var name = $(this).find(".person-info b").text();
                 var department = $(this).find(".person-info span.hidden_department").text();

                 var notReadMessage = Number($(this).find(".badge").text()); /////////////////////??
                 if(notReadMessage%1!=0){
                     notReadMessage = 100;
                 }
                 $(this).find(".badge").text(0).hide();

                 //totalmessage改变
                 var totalmessage = 0;
                 $(".left-pannel-content").find(".badge:visible").each(function(){
                     totalmessage += Number( $(this).text() );
                     if(!(totalmessage>=0&&totalmessage<=99)){
                         totalmessage = "99+";
                         return false;
                     }
                 });

                 $("#operation .u-badge").attr("data-badge",totalmessage);



                 //更新选中的背景
                 $(".left-pannel-content .person").siblings().removeClass("person-active");
                 $(this).addClass("person-active");
                 //清空右侧edit面板数据
                 $(".footer-input .edit").empty();
                 //更新right-pannel head 名字
                 $(".right-pannel-head>span").text(name);
                 //更新部门
                 $(".right-pannel-head>small").text(department);

                 var flag = $(".right-pannel-center-inner[flagid='"+id+"']");
                 if(flag.length && notReadMessage == 0){  //激活已存在的标签  无消息

                     //内容区显隐
                     $(".right-pannel-center-inner").removeClass("show-chat");
                     flag.addClass("show-chat");
                     flag.scrollTop(flag[0].scrollHeight);

                 }else{                                 //添加标签
                     //隐藏之前无关的聊天窗口
                     $(".right-pannel-center-inner").removeClass("show-chat");
                     var size = 3;
                     //加载对应的聊天窗口
                     if(flag.length < 1 ){
                         var html =  EJSObj.e_templateHtml("right_pannel_center_inner.ejs",
                             "/ism/chat/ism_template/right_pannel_center_inner.ejs",{data:id});
                         $(".right-pannel-center").append(html);
                     }else{
                         size = notReadMessage;
                         $(".right-pannel-center-inner[flagid='"+id+"']").addClass("show-chat");
                     }

                     //获取历史聊天消息
                     //获取历史消息3条  notReadMessage
                     var arg={
                         id:id,
                         type:'chat',
                         size:size,
                         endVersion:$(this).attr("endversion"),
                         success: function(obj){
                             //console.log('历史消息获取成功');
                             var result = obj.result;
                             //console.log(result);

                             var dom = $(".right-pannel-center-inner[flagid='"+id+"']");
                             var html = "";
                             for(var i=result.length-1;i>=0;i--){
                                 var data = result[i];
                                 html = "";

                                 if (data.data.contentType == 2) {  //文本

                                     html = right_pannel.getTextMessage_Html(data.from, data.data, "");
                                 } else if (data.data.contentType == 8) {  //图片

                                     html = right_pannel.getPicMessage_Html(data.from, data.data, "");
                                 }else if(data.data.contentType == 4){  //文件

                                     html = right_pannel.getFileMessage_Html(data.from, data.data, "");
                                 }

                                 dom.append(html);

                             }
                             dom.scrollTop(dom[0].scrollHeight);
                             //回执已读消息
                             var lastmess = result[0];
                             YYIMChat.sendReadedReceiptsPacket({
                                 to:lastmess.from,
                                 type:"chat",
                                 id:lastmess.id,
                                 sessionVersion:lastmess.sessionVersion
                             });
                         },
                         error: function (e) {
                             //console.log("历史消息获取失败");
                             //console.log(e);
                         }
                     }
                     YYIMChat.getHistoryMessage(arg);

                 }


             })



         })

     }

    return {init:init}
})