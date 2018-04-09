define([
    "EJS", "EJSObj","emotion","login","webim_chat_template","org","sys_config"
], function (EJS, EJSObj,emotion,login,webim_chat_template,org,sys_config) {

    function init() {


        $(function () {
            //联系人菜单标签

            var activelabelindex;
            //预初始化ejs模板   主面板
            var html = EJSObj.e_template("webim_template.ejs", "/ism/chat/template/webim_template.ejs");
            var data = [];
            var trueHtml = EJSObj.e_template2Html(html, {list: data});
            $("#chat-pannel").html(trueHtml);



            $("#chat-pannel").on("click",".tabbar-item",function () {
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index = $(this).attr("flagindex");
                if(index==1){
                    $(".list-content .list").show();
                    $(".list-content .org-list").hide();
                }else{
                    $(".list-content .list").hide();
                    $(".list-content>.org-list").show();
                }
            })

             //常用联系人列表
            $("#chat-pannel").on("click",".list .list-item",function () {
                //console.log(login);
                //判断是否登陆
                if(!login.IsLogin.logined){
                    errorAlert("未登录");  
                    return;
                }
                //点击后隐藏floatbutton
                $(".floatbutton").hide();

                var id = $(this).attr("flagid");
                var name = $(this).find(".list-item-content span:first-child").text();
                var intro = $(this).find(".list-item-content span:last-child").text();
                var img = $(this).find('img').attr("src");

                //未读消息读取条数
                var notReadMessage = $(this).find(".list-item-badge").text();
                notReadMessage = Number(notReadMessage);
                if(notReadMessage%1!=0){
                    notReadMessage = 99;
                }

                //初始化item-badge
                $(this).find(".list-item-badge").text(0).hide();

                //totalmessage改变
                var totalmessage = 0;
                $("#chat-pannel .list .list-item").find(".list-item-badge:visible").each(function(index){
                    totalmessage += Number( $(this).text() );
                    if(!(totalmessage>=0&&totalmessage<=99)){
                        totalmessage = "99+";
                        return false;
                    }
                });

                $("#operation .u-badge").attr("data-badge",totalmessage);

                //tabbar 红点
                //tabbar消息提醒
                if( $("#chat-pannel .list .list-item .list-item-badge:visible").length<1 ){
                    $("#chat-pannel .tabbar-item .tabbar-item-badge").hide();
                }

                //隐藏left-menu红点
                var dom = $(".left-menu .left-menu-item[flagid='"+id+"']");
                if(dom.length>0){
                    dom.find(".left-menu-item-dot").hide();
                }
                dom = null;

                $("#chat-dialog").show();
                var flag = $("#chat-dialog .left-menu .left-menu-item[flagid='"+id+"']");
                //var flag = $(".chat-dy_hidden[flagid='"+id+"']");



                if(flag.length){  //激活已存在的标签
                    var activeid = id;
                    $("#chat-dialog .left-menu .left-menu-item").siblings().removeClass("labelactive");
                    $("#chat-dialog .left-menu .left-menu-item[flagid='"+id+"']").addClass("labelactive");

                    //内容区
                    $("#chat-dialog .chat-content>div").removeClass("chat-dy_show");

                    $("#chat-dialog .chat-content>div[flagid='"+id+"']").addClass("chat-dy_show");

                    //判断悬浮按钮红点是否显示   ?判断left-menu 是否有未读消息
                    if($(".left-menu .left-menu-item .left-menu-item-dot:visible").length < 1 ){
                        $(".floatbutton").children("div").hide();
                    }
                    dom = $("#chat-dialog .chat-content .chat-dy_hidden[flagid='"+id+"']");  //内容区
                    // 滚动
                    dom.find(".chat-inner")
                        .scrollTop( dom.find(".chat-inner")[0].scrollHeight);

                }else{
                    var obj = {};
                    obj.id = id;
                    obj.name = name;
                    obj.intro = intro;
                    obj.img = img;
                    obj.endVersion = $(this).attr("endVersion");
                    var trueHtml = EJSObj.e_templateHtml("left_menu.ejs","/ism/chat/template/left_menu.ejs", {data: obj});

                    $("#chat-dialog .left-menu").prepend(trueHtml);
                    //设置active
                    $("#chat-dialog .left-menu .left-menu-item").siblings().removeClass("labelactive");
                    $("#chat-dialog .left-menu .left-menu-item:first-child").addClass("labelactive");

                    //内容区

                    $("#chat-dialog .chat-content>div").removeClass("chat-dy_show");
                    var trueHtml = EJSObj.e_templateHtml("webim_chat_template.ejs","/ism/chat/template/webim_chat_template.ejs", {data: obj});
                    $("#chat-dialog .chat-content").append(trueHtml);
                    $("#chat-dialog .chat-content>div[flagid='"+id+"']").addClass("chat-dy_show");

                    //下载截图软件href
                    $(".footer-button a").attr("href",sys_config.ApiBaseUrl+"api/downFile");

                    //获取历史消息3条  notReadMessage
                    var arg={
                        id:id,
                        chatType:'chat',
                        size:notReadMessage>3?notReadMessage:3,
                        endVersion:$(this).attr("endVersion"),
                        success: function(obj){
                            //console.log('历史消息获取成功');
                            var result = obj.result;
                            //console.log(result);
                            if(result.length<1){
                                //console.log("无历史消息");
                                return;
                            }
                            var html = "";
                            dom = $("#chat-dialog .chat-content .chat-dy_hidden[flagid='"+id+"']");  //内容区
                            for(var i=result.length-1;i>=0;i--){
                                var data = result[i];
                                if (data.data.contentType == 2) {  //文本

                                    html = webim_chat_template.getTextMessage_Html(data.from, data.data, "");
                                } else if (data.data.contentType == 8) {  //图片

                                    html = webim_chat_template.getPicMessage_Html(data.from, data.data, "");
                                }else if(data.data.contentType == 4){  //文件
                                    html = webim_chat_template.getFileMessage_Html(data.from, data.data, "");
                                }
                                //var html = webim_chat_template.getTextMessage_Html(data.fromId, data.body, "");

                                dom.find(".inner").append(html);

                            }
                            // 滚动
                            dom.find(".chat-inner")
                                .scrollTop( dom.find(".chat-inner")[0].scrollHeight);

                            //已读回执
                            var lastmess = result[0];
                            YYIMChat.sendReadedReceiptsPacket({
                                to:lastmess.from,
                                type:"chat",
                                id:lastmess.id,
                                sessionVersion:lastmess.sessionVersion
                            });
                        },
                        error: function (e) {
                            //console.log("历史消息获取失败")
                            //console.log(e)
                        }
                    }
                    YYIMChat.getHistoryMessage(arg);

                }







                //$("#chat-dialog").html(trueHtml);
                //渲染chatdialog
                // var data ={headTitle:"张三丰",list:[{message:"这个****",from:"me",to:"杨大柱"}],pics:emotion};




            })

            //组织点击  进入下一级组织
            $("#chat-pannel").on("click",".org-org .org-org-head",function(){
                var trangle = $(this).children(".trangle");
                if(trangle.hasClass("changedirection")){ //已经展开
                    trangle.removeClass("changedirection");
                    $(this).parent().children(".org-org-list").hide();

                }else{
                    //var id = $(this).parent().attr("flagid");
                    //var html = org.getOrgAndPerson(id);
                    //////console.log(html)
                    //if(!html){
                    //    trangle.addClass("changedirection");
                    //    return;
                    //}

                    //$(this).parent().children(".org-org-list").html(html);
                    trangle.addClass("changedirection");
                    $(this).parent().children(".org-org-list").show();
                }

            })

            //点击人  添加进去常用联系人   并且打开聊天面板
            $("#chat-pannel").on("click",".org-list .org-person",function(){
                var id = $(this).attr("flagusername");
                var dom = $(".list .list-item[flagid='"+id+"']");
                if(dom.length>0){
                    dom.trigger("click");
                    return;
                }
                var obj = {};
                obj.id = id;
                obj.photo = $(this).children("img").attr("src");
                obj.title = $(this).find(".org-person-info span:first-child").text();
                //obj.lastmessage = $(this).find(".org-person-info span:last-child").attr("tel");
                var html = EJSObj.e_templateHtml("add_list_item.ejs","/ism/chat/template/add_list_item.ejs",{data:obj})
                $(".list ").append(html);
                $(".list .list-item[flagid='"+id+"']").trigger("click");
            })

            var flag = false;

            function togglechat() {
                //console.log(flag);
                if (!flag) {
                    $("#chat-pannel").slideLeftShow();

                    $("#chat-pannel .hidden-toolbar .trangle-right").addClass("trangle-changedirection");
                } else {
                    $("#chat-pannel").slideLeftHide();
                    //trangle
                    $("#chat-pannel .hidden-toolbar .trangle-right").removeClass("trangle-changedirection");
                }
                flag = !flag;

            }

            $("#chat-pannel").on("click",".hidden-toolbar",togglechat)




        })

    }

    return {init: init};


});