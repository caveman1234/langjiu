define([
    "EJS", "EJSObj", 'emotion', 'sys_config', "niuniucapture"
], function (EJS, EJSObj, emotion, sys_config, NiuniuCaptureObject) {
    function ReceiveMsg(type, msg) {
        //console.log(msg);  //来message
        var name = $(".left-menu-item[flagid='" + msg.from + "'] .left-menu-item-name").text();
        if (name) {
            if (type == 2) { //文本

                if ($("#chat-dialog").is(':visible')) {
                    var html = getTextMessage_Html(name, msg.data, "");

                    //消息内容更新
                    var dom = $(".chat-content .chat-dy_hidden[flagid='" + msg.from + "'] .inner");
                    dom.append(html);
                    dom.parent().scrollTop(dom.parent()[0].scrollHeight);
                }

            } else if (type == 8) {  //图片

                if ($("#chat-dialog").is(':visible')) {
                    var html = getPicMessage_Html(name, msg.data, "");
                    var dom = $(".chat-content .chat-dy_hidden[flagid='" + msg.from + "'] .inner");
                    dom.append(html);
                    dom.parent().scrollTop(dom.parent()[0].scrollHeight);
                }

            } else {     //文件

                if ($("#chat-dialog").is(':visible')) {
                    var html = getFileMessage_Html(name, msg.data, "");
                    var dom = $("#chat-dialog .chat-content .chat-dy_show .inner");
                    dom.append(html);
                    dom.parent().scrollTop(dom.parent()[0].scrollHeight);
                }
            }
        }


        //endVersion更新
        //常用联系人面板
        $("#chat-pannel .list .list-item[flagid='" + msg.from + "']").attr("endversion", msg.sessionVersion);
        //left-menu面板
        $(".left-menu .left-menu-item[flagid='" + msg.from + "']").attr("endversion", msg.sessionVersion);


        //聊天主面板消息提醒判断
        var a = $("#chat-dialog .chat-content .chat-dy_hidden[flagid='" + msg.from + "']")
            .hasClass("chat-dy_show");
        var b = $("#chat-dialog").is(':visible');
        //console.log(a + "---" + b);
        if (a && b) {
            //已读回执
            YYIMChat.sendReadedReceiptsPacket({
                to:msg.from,
                type:"chat",
                id:msg.to,
                sessionVersion:msg.sessionVersion
            });
            return;
        }

        //

        //左边menu更新
        var dom = $(".left-menu .left-menu-item[flagid='" + msg.from + "']");
        if (!dom.hasClass("labelactive"))
            dom.find(".left-menu-item-dot").show();
        //右边主面板更新
        dom = $("#chat-pannel .list .list-item[flagid='" + msg.from + "']").find(".list-item-badge");
        var num = Number(dom.text());
        var totalnum = $("#operation .u-badge").attr("data-badge");

        if (dom.length < 1) {
            //console.log("添加对应的消息来源人员");
            //查找树，找出人员

            var dom1 = $(".org-list .org-person[flagusername='" + msg.from + "']").eq(0);
            if (dom1.length < 1) {
                return;
            }
            var obj = {};
            obj.endVersion = msg.sessionVersion;
            obj.id = msg.from;
            obj.photo = dom1.children("img").attr("src");
            obj.title = dom1.find(".org-person-info span:first-child").text();

            var html = EJSObj.e_templateHtml("add_list_item.ejs", "/ism/chat/template/add_list_item.ejs", {data: obj})
            $(".list ").append(html);

            //初始化未读消息
            var notreadnum = msg.sessionVersion - msg.readedVersion;
            if (notreadnum > 0)
                $("#chat-pannel .list .list-item[flagid='" + msg.from + "']").find(".list-item-badge").text(notreadnum).show();
            totalnum = Number(totalnum) + notreadnum;
        } else {
            num++;
            totalnum = Number(totalnum) + 1;
        }




        if (num >= 0 && num <= 99) {

        } else {
            num = "99+";
        }
        dom.text(num).show();

        // 总消息条数
        //取出
        if (totalnum >= 0 && totalnum <= 99) {
        } else {
            totalnum = "99+";
        }
        //存入
        $("#operation .u-badge").attr("data-badge", totalnum);

        //tabbar 红点
        //tabbar消息提醒
        if ($("#chat-pannel .list .list-item .list-item-badge:visible").length > 0) {
            $("#chat-pannel .tabbar-item .tabbar-item-badge").show();
        }


        //悬浮按钮提醒
        var dom = $("#chat-dialog .chat-content .chat-dy_hidden[flagid='" + msg.from + "']");
        if ($(".floatbutton").is(':visible') && dom.length > 0) {
            $(".floatbutton").children("div").show();
        }


    }

    //将code转化为表情图片
    function CodeToImage(code) {
        var codemessage = code;
        $.each(emotion, function (index, ele) {
            if (code.indexOf(ele.actionKey) < 0) {
                return true;
            }
            codemessage = codemessage.replace(ele.reg, "<img class=\"face-p\" src='chat/img/face/'" + ele.url + "\" alt=\"" + ele.actionKey + "\"/>");
        });
        return codemessage;
    }

    //表情图片转化为code
    function ImageToCode(code) {
        var parentdiv = $('<div></div>');
        parentdiv.html(code);
        var va = parentdiv.find(".face-p");
        if (va.size() < 0) {
            return code;
        }
        $.each(va, function (ind, ele) {
            var tex = $(this).attr("alt"); //转换后文本
            $(this).replaceWith(tex);
        });
        return parentdiv.html();
    }

    //文本消息接收html模板
    function getTextMessage_Html(name, body, friheadpic) {
        try {
            friheadpic = ((friheadpic == "" || friheadpic == undefined) ? "/ism/chat/img/avastar.png" : friheadpic);
            var message = CodeToImage(body.content); //如果有表情就转化为图片
            var username = $(".chat-dy_hidden.chat-dy_show .header .left span").text();

            var html = EJSObj.e_templateHtml("message.ejs", "/ism/chat/template/message.ejs", {
                data: {
                    time: new Date(body.dateline),
                    friheadpic: friheadpic, //
                    name: username, //
                    message: message, //
                    chat_from: name == account.userName  //标志   其他人和我
                }
            });
            //errorAlert("df")
            return html;
        } catch (e) {
            //console.log("文本消息html模板错误:" + e);
        }
        return "";
    }

    //发送的文本消息模板
    function sendTextMessage_Html(name, cont, headimg) {
        try {
            //console.log(new Date().getTime().toString())
            // var message = ImageToCode(cont); //如果有表情就转化为图片
            var html = EJSObj.e_templateHtml("message.ejs", "/ism/chat/template/message.ejs", {
                data: {
                    time: new Date(),
                    friheadpic: headimg, //
                    name: name, //
                    message: cont, //
                    chat_from: "me" //标志   其他人和我
                }
            });
            return html;

        } catch (e) {
            //console.log("我发送的文本消息模板错误:" + e);
        }
        return "";
    }

    function getPicMessage_Html(name, body, friheadpic) {
        friheadpic = ((friheadpic == "" || friheadpic == undefined) ? "/ism/chat/img/avastar.png" : friheadpic);
        try {
            var username = $(".chat-dy_hidden.chat-dy_show .header .left span").text();

            var html = EJSObj.e_templateHtml("pic.ejs", "/ism/chat/template/pic.ejs", {
                data: {
                    time: new Date(body.dateline),
                    friheadpic: friheadpic, //
                    name: username, //
                    src: body.content.path, //
                    chat_from: name == account.userName  //标志   其他人和我
                }
            });

            return html;
        } catch (e) {
            //console.log(e)
        }
    }

    function getFileMessage_Html(name, body, friheadpic) {
        friheadpic = ((friheadpic == "" || friheadpic == undefined) ? "/ism/chat/img/avastar.png" : friheadpic);
        try {
            var username = $(".chat-dy_hidden.chat-dy_show .header .left span").text();
            var type = body.content.name.split(".");
            type = type[type.length - 1];

            var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/template/file.ejs", {
                data: {
                    img: "/ism/chat/img/filetype/" + fileType(type) + ".png",
                    time: new Date(body.dateline),
                    friheadpic: friheadpic, //
                    name: username, //
                    filename: body.content.name, //
                    size: (body.content.size / 1024.0 / 1024.0).toFixed(3) + "M",
                    path: body.content.path,
                    chat_from: name == account.userName  //标志   其他人和我
                }
            });
            //errorAlert("df")
            return html;
        } catch (e) {
            //console.log(e)
        }
    }

    /**
     * 文件类型
     */
    function fileType(type) {
        var result;
        switch (type) {
            case "avi":
                ;
            case "bmp":
                ;
            case "doc":
                ;
            case "docx":
                ;
            case "exe":
                ;
            case "jpeg":
                ;
            case "jpg":
                ;
            case "pdf":
                ;
            case "png":
                ;
            case "ppt":
                ;
            case "pptx":
                ;
            case "psd":
                ;
            case "rar":
                ;
            case "swf":
                ;
            case "txt":
                ;
            case "xls":
                ;
            case "xlsx":
                ;
            case "zip":
                result = type;
                break;
            default :
                result = "default";
                break;

        }
        return result;
    }


    function init() {
        jQuery.fn.slideDownHide = function (speed, callback) {
            this.animate({
                height: "hide",
                paddingTop: "hide",
                paddingBottom: "hide",
                marginTop: "hide",
                marginBottom: "hide"
            }, speed, callback);
        };


        $(function () {

            //截图 初始化
            function screenShotInit() {
                captureObj = new NiuniuCaptureObject();
                captureObj.NiuniuAuthKey = "niuniu";
                //此处可以设置相关参数
                captureObj.TrackColor = rgb2value(255, 0, 0);
                captureObj.EditBorderColor = rgb2value(0, 0, 255);

                //设置工具栏的TOOLTIP
                //captureObj.ToolTipText = "tipRectangle|tipCircle|tipArrow|tipBrush|tipGlitter|tipMosaic|tipText|tipUndo|tipSave|tipCancel|tipFinish|Finish";

                //设置控件加载完成以及截图完成的回调函数
                captureObj.FinishedCallback = OnCaptureFinishedCallback;
                captureObj.PluginLoadedCallback = PluginLoadedCallback;
                captureObj.VersionCallback = VersionCallback;

                //初始化控件
                captureObj.InitNiuniuCapture();
            }

            //截图回调
            function OnCaptureFinishedCallback(type, x, y, width, height, info, content, localpath) {
                if (type < 0) {
                    //需要重新安装控件
                    //ShowDownLoad();
                    //errorAlert("请安装牛牛截屏插件");
                    $("#chat-dialog .footer .footer-button a").show();
                    return;
                } else {
                    $("#chat-dialog .footer .footer-button a").hide();
                }
                flag_captureload = true;
                //$('#show').hide();
                switch (type) {
                    case 1:
                    {
                        //$('#info').html('截图完成： x:' + x + ',y:' + y + ',widht:' + width + ',height:' + height);
                        //UploadCaptureData(content, localpath);
                        //console.log("localpath");
                        //console.log(localpath);
                        //图片上传服务器
                        //var datas = new FormData();
                        //datas.append("file", file);

                        //上传图片
                        $.post(sys_config.ApiBaseUrl + "api/uploadPrintscreenImgBase64", {
                            jsonBase64: JSON.stringify({
                                creator: account.userName + "." + sys_config.ImInfo.appId + "." + sys_config.ImInfo.etpId,
                                decodeImage: content
                            }),
                            token: sys_config.ImInfo.token
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert("截图上传失败"); 
                                return;
                            }
                            //将图片加入聊天框
                            var dom = document.createElement("img");
                            dom.className = "screenshotimg pic";
                            dom.src = result.data;
                            //var img = "<img class='screenshotimg  pic' src='" + result.data.path + "' >";
                            //图片加入发送框
                            //$("#chat-dialog .chat-dy_show .footer-input .edit").append(img);
                            //console.log(capture_focusflag);
                            if (capture_focusflag) {
                                $("#chat-dialog .chat-dy_show .footer-input .edit").focus();
                                insertExpressionHTML(dom);
                            } else {
                                $("#chat-dialog .chat-dy_show .footer-input .edit").append(dom);
                            }
                        })
                        break;
                    }
                    case 2:
                    {
                        //$('#info').html('您取消了截图');
                        break;
                    }
                    case 3:
                    {
                        break;
                    }
                    case 4:
                    {
                        if (info == '0') {
                            //$('#info').html('从剪贴板获取到了截图： ' + localpath);

                            //UploadCaptureData(content, localpath);
                        }
                        else {
                            //$('#info').html('从剪贴板获取图片失败。');
                        }
                        break;
                    }
                }
            }

            //用于返回控件的版本号
            function VersionCallback(ver) {

            }

            /*
             当控件成功加载后回调的的函数，您可以在此控制相应的UI显示
             */
            function PluginLoadedCallback(success) {
                //console.log(success)
                //if (success) {
                //    flag_captureload = true;
                //}
            }


            function insertExpressionHTML(html) {
                var sel, range;

                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {

                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement('div');
                    el.appendChild(html);
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }

                } else if (document.selection) {
                    //errorAlert(document.selection.createRange());
                    document.selection.createRange().parseHTML(html);
                }
            }

            function insertExpressionHTML2(html) {
                var sel, range;
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement('div');
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            }


            function upload(file, type, id) {
                var datas = new FormData();
                datas.append("file", file);
                var toid = $("#chat-dialog .chat-dy_show").attr("flagid");
                YYIMChat.sendFormMessage({
                    to: toid,
                    file: {
                        name: file.name,
                        size: file.size
                    },
                    data: datas,
                    mediaType: type == "pic" ? 1 : 2, //1:图片，2：附件
                    type: "chat",
                    success: function (data) {
                        //console.log("发送" + type + "成功");
                        //console.log(data);
                        if (type == "pic") {
                            var html = getPicMessage_Html(data.from, data.data, "");
                            var dom = $("#chat-dialog .chat-content .chat-dy_show .inner");
                            dom.append(html);
                            dom.parent().scrollTop(dom.parent()[0].scrollHeight);
                        } else {
                            //console.log("文件");

                            $("#" + id).parent().find("a").attr("href", data.data.content.path);
                            $("#" + id).remove();
                        }
                        //更新endversion
                        var node = $(".list .list-item[flagid="+toid+"]");
                        var num = node.attr("endversion")?node.attr("endversion"):0;
                        num = Number(num)+1;
                        node.attr("endversion",num);

                    },
                    error: function (e) {
                        //console.log("发送" + type + "错误");
                        //console.log(e);
                    },
                    progress: function (arg) {
                        if (!type == "file")
                            return;

                        //console.log(arg)

                        try {
                            //arg["Toid"] = id;
                            //arg["Totype"] = talktype;
                            //arg["Tofileid"] = fileId;
                            //arg["Filename"] = file.name;
                            var per = (arg.percent * 100).toFixed(2) + "%";

                            $("#" + id).find(".chat-file-progress-inner").width(per);
                            $("#" + id).find(".chat-file-progress-text").text(per);


                        } catch (e) {
                            //console.log("发送文件进度错误:" + e)
                        }
                    }
                })

            }


            $(".floatbutton").draggable({containment: "document", scroll: false});
            $("#chat-dialog").draggable({containment: "document", scroll: false, handle: ".chat-content-drag"});

            //$(".floatbutton").dragging({
            //    move: 'both',
            //    randomPosition: false,
            //    //hander: '.floatbutton'
            //});
            //
            //$("#chat-dialog").dragging({
            //    move: 'both',
            //    randomPosition: false,
            //    hander: '.chat-content-drag'
            //});

            //忽略默认拖拽事件
            function ignoreDrag(e) {
                e.originalEvent.stopPropagation();
                e.originalEvent.preventDefault();
            }

            function drop(e) {
                ignoreDrag(e);
                var dt = e.originalEvent.dataTransfer;
                var file = dt.files[0];
                //console.log(file);
                var type = file.name.split(".");
                type = type[type.length - 1];

                //聊天消息显示文件图片和进度
                var data = {};
                data.img = "/ism/chat/img/filetype/" + fileType(type) + ".png";
                data.chat_from = true;
                data.time = new Date();
                data.filename = file.name;
                data.size = (file.size / 1024.0 / 1024.0).toFixed(3) + "M";
                //console.log(data.size);

                var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/template/file.ejs", {data: data});
                $("#chat-dialog .chat-dy_show .inner").append(html);

                $("#" + data.time.getTime()).show();

                var dom = $("#chat-dialog .chat-dy_show .chat-inner");
                dom.scrollTop(dom[0].scrollHeight);
                dom = null;

                upload(file, "file", data.time.getTime()); //最后一个参数为id 方便更新进度

            }

            //截图句柄
            var captureObj = "";
            //控件是否加载标志
            var flag_captureload = false;
            var capture_focusflag = false;

            //初始化截图
            screenShotInit();

            //初始化表情面板
            var html = EJSObj.e_templateHtml("expression_pannel.ejs", "/ism/chat/template/expression_pannel.ejs",
                {pics: emotion});
            $(".expression-panel").html(html);


            // 焦点判断变量
            var focusflag = false;
            var position_style;

            //双击全屏 还原
            $(".chat-content-drag").dblclick(function () {
                $("#chat_max").trigger("click");
            })

            $("#chat-dialog").on("click", "#chat_minus", function () {
                $("#chat-dialog").hide();
                $(".floatbutton").show();
            })

            $("#chat-dialog").on("click", "#chat_max", function () {
                //$("#chat-dialog").slideDownHide();
                //$("#show_chat").show();
                if (!$("#chat-dialog").hasClass("chat-dialog-max")) {
                    $(this).attr("src", "/ism/chat/img/svg/restore.svg")
                    $("#chat-dialog").addClass("chat-dialog-max");
                    //最大化不允许拖拽位置   记录位置style;
                    position_style = $("#chat-dialog").attr("style");

                } else {
                    $(this).attr("src", "/ism/chat/img/svg/max.svg")
                    $("#chat-dialog").removeClass("chat-dialog-max");
                    $("#chat-dialog").attr("style", position_style);
                }


            })

            $("#chat-dialog").on("click", "#chat_close", function () {

                $(".left-menu .left-menu-item .left-menu-item-close").trigger("click");
                //关闭窗口还原位置
                $("#chat-dialog").removeClass("chat-dialog-max");
                $("#chat-dialog").attr("style", "");
                $("#chat-dialog").hide();

                //最大化  还原图标
                $("#chat_max").attr("src", "/ism/chat/img/svg/max.svg");

            })

            $(".floatbutton").dblclick(function () {
                $(this).children("div").hide();
                $(this).hide();
                $("#chat-dialog").show();
                $(".left-menu-item.labelactive").trigger("click");

            })

            $("#chat-dialog").on('click', '#emotion', function () {
                $(".expression-panel").fadeIn();
                return false;
            })

            $("#chat-dialog").on("click", "#file", function () {
                $("#uploadFile").trigger("click");

            })
            $("#chat-dialog").on("click", "#picture", function () {
                $("#uploadPic").trigger("click");
            })

            $("#chat-dialog").on("click", "#screenshot", function () {
                ////console.log(flag_captureload)
                //if (!flag_captureload) {
                //    //提示下载安装控件
                //    return;
                //}
                if (focusflag) {
                    capture_focusflag = true;
                } else {
                    capture_focusflag = false;
                }

                //console.log('截图操作');
                captureObj.DoCapture("screenshot_temp.jpg", 0, 0, 0, 0, 0, 0);
                setTimeout(function () {
                    if (!flag_captureload) {
                        $("#chat-dialog .footer .footer-button a").show();
                    }
                }, 3000)

            })


            //上传文件监听
            $("#chat-dialog").on('change', "#uploadFile", function () {

                var file = this.files[0];

                var type = file.name.split(".");
                type = type[type.length - 1];

                //聊天消息显示文件图片和进度
                var data = {};
                data.img = "/ism/chat/img/filetype/" + fileType(type) + ".png";
                data.chat_from = true;
                data.time = new Date();
                data.filename = file.name;
                data.size = (file.size / 1024.0 / 1024.0).toFixed(3) + "M";
                //console.log(data.size);

                var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/template/file.ejs", {data: data});
                $("#chat-dialog .chat-dy_show .inner").append(html);

                $("#" + data.time.getTime()).show();

                var dom = $("#chat-dialog .chat-dy_show .chat-inner");
                dom.scrollTop(dom[0].scrollHeight);
                dom = null;

                upload(file, "file", data.time.getTime()); //最后一个参数为id 方便更新进度

                //更新dom input元素   清空
                var input = $("#uploadFile").clone(true);
                $("#uploadFile").remove();
                $(".chat-content").append(input);


            });
            $("#chat-dialog").on('change', "#uploadPic", function () {

                var pic = this.files[0];
                upload(pic, "pic");
                //更新dom input元素   清空
                var input = $("#uploadPic").clone(true);
                $("#uploadPic").remove();
                $(".chat-content").append(input);


            });

            $("#chat-dialog").on("click", ".footer-input .edit", function () {
                //获得焦点
                focusflag = true;

                $(".expression-panel").fadeOut();
                return false;
            })

            $("body").click(function () {

                $(".expression-panel").fadeOut();
                //焦点失去
                focusflag = false;
                //console.log("失去焦点");
            })

            //left-menu点击切换
            $("#chat-dialog").on("click", ".left-menu .left-menu-item", function () {
                //left
                $(this).siblings().removeClass("labelactive");
                $(this).addClass("labelactive");
                $(this).find(".left-menu-item-dot").hide();

                var id = $(this).attr("flagid");

                $(".list .list-item[flagid='" + id + "']").trigger("click");

                /*
                 //right 内容
                 $("#chat-dialog .chat-content .chat-dy_show").removeClass("chat-dy_show");
                 var id = $(this).attr("flagid");
                 $("#chat-dialog .chat-content>div[flagid='" + id + "']").addClass("chat-dy_show");

                 var dom = $("#chat-dialog .chat-content>div[flagid='" + id + "'] .chat-inner");
                 dom.scrollTop(dom[0].scrollHeight);

                 //更新对应主面板人员未读消息

                 //初始化badge
                 $("#chat-pannel .list .list-item").find(".list-item-badge").text(0).hide();

                 //tabbar 消息提醒条数更新
                 //未读消息读取条数
                 var notReadMessage = $(this).find(".list-item-badge").text();
                 notReadMessage = Number(notReadMessage);
                 //初始化tabbar-badge
                 var dom = $("#chat-pannel .tabbar-item .tabbar-item-badge");
                 var num = Number( dom.text() ) - notReadMessage;
                 dom.text( num );
                 if(num==0){
                 dom.hide();
                 }



                 */

            })


            $("#chat-dialog").on("click", ".expression-panel .face-pic", function () {
                var index = $(this).attr("flagindex");
                var dom = document.createElement("img");
                dom.className = "face-p";
                dom.src = "/ism/chat/img/face/" + emotion[index].url;
                //再此判断是否在编辑区获取焦点 点击表情按钮
                //console.log(focusflag);

                if (focusflag) {
                    $(".chat-content .chat-dy_show .footer-input .edit").focus();
                    insertExpressionHTML(dom);
                } else {
                    $(".chat-content .chat-dy_show .footer-input .edit").append(dom);
                }
            })


            //输入框 .footer-input .edit
            $("#chat-dialog").on('keypress', '.footer-input .edit', function (event) {
                //console.log(event)
                ////console.log(event);
                if (event.ctrlKey && (event.keyCode == 13 || event.keyCode == 10)) {
                    $(".chat-dy_show #sendMessage").trigger("click");

                    // $(".footer-input .edit div span:last-child").focus();
                    //var html = event.target.innerHTML;
                    //html = html.replace(/<br>/g,"<span><br></span>");
                    //$(this).html(html);
                } else if (event.which == 13) {
                    insertExpressionHTML2("</br></br>");
                    return false;
                }
            })

            //发送消息
            $("#chat-dialog").on("click", "#sendMessage", function () {


                var cont = $("#chat-dialog .chat-dy_show .footer-input .edit").html();
                if (!cont)
                    return;

                var temp = cont;
                temp = temp.replace(/(&nbsp;)|(<br>)/g,"").trim();
                if(!temp){
                    return;
                }
                cont = cont.replace(/<br>$/gi,"");

                var toid = $(this).attr("flagid");
                var body = {};


                var html = sendTextMessage_Html("我", cont, "");
                $(".chat-content .chat-dy_show .inner").append(html);
                $(".chat-content .chat-dy_show .chat-inner").scrollTop($(".chat-content .chat-dy_show .chat-inner")[0].scrollHeight);

                YYIMChat.sendTextMessage({
                    to: toid,
                    type: "chat",
                    msg: cont,
                    success: function (data) {
                        //console.log("发送成功!" + JSON.stringify(data));
                        //更新endversion
                        var node = $(".list .list-item[flagid="+toid+"]");
                        var num = node.attr("endversion")?node.attr("endversion"):0;
                        num = Number(num)+1;
                        node.attr("endversion",num);
                    }
                });
                $("#chat-dialog .chat-dy_show .footer-input .edit").empty();

            })

            //hover出现关闭按钮
            $("#chat-dialog ").on("mouseover", ".left-menu-item", function () {
                $(this).find(".left-menu-item-close").show();

            })
            $("#chat-dialog ").on("mouseout", ".left-menu-item", function () {
                $(this).find(".left-menu-item-close").hide();

            })
            //关闭聊天对象
            $("#chat-dialog").on("click", ".left-menu-item-close", function () {
                var id = $(this).parent().attr("flagid");
                var isactive = $(this).parent().hasClass("labelactive");
                $(this).parent().remove();
                //删除面板
                $("#chat-dialog .chat-dy_hidden[flagid='" + id + "']").remove();


                //active面板第一个聊天对象
                var dom = $("#chat-dialog .left-menu .left-menu-item")
                if (dom.length <= 0) {
                    $("#chat_close").trigger("click");
                } else {
                    if (isactive) {
                        dom.eq(0).addClass("labelactive");
                        //激活面板
                        var activeid = dom.eq(0).attr("flagid");
                        $("#chat-dialog .chat-dy_hidden[flagid='" + activeid + "']").show();
                    } else {

                    }

                }

                return false;
            })

            //加载历史消息

            var pagecount = 10;
            $("#chat-dialog").on("click", ".chat-inner .chat-inner-history span", function () {
                var finish_history = $(this).attr('flag_finish_history');
                var add_history = $(this).attr('flag_add_history');
                var start = $(this).attr('flag_start') || 0;
                start = Number(start);
                var that = this;
                if (finish_history)
                    return;

                var hasmessagenum = 0;
                if (!add_history) {
                    hasmessagenum = $(this).parent().parent().find(".inner .inner-chat").length;
                    start = hasmessagenum;
                } else {
                    start += pagecount;
                }
                //var hasmessagenum = $(this).parent().parent().find(".inner .inner-chat").length;

                YYIMChat.getHistoryMessage({
                    id: $(this).parent().parent().parent().attr("flagid"),
                    chatType: 'chat',
                    //contentType : data.contentType || 0,
                    start: start,
                    size: pagecount,
                    endVersion: $(".left-menu-item.labelactive").attr("endVersion"),
                    success: function (obj) {
                        //console.log('历史消息获取成功');
                        var result = obj.result;
                        //console.log(result);
                        if (!add_history) {

                            $(".chat-dy_show .chat-inner-history span").attr('flag_add_history', 'true');
                        }
                        $(that).attr('flag_start', start);
                        if (result.length < pagecount) {
                            $(".chat-dy_show .chat-inner-history span").attr('flag_finish_history', "true");
                            $(".chat-dy_show .chat-inner-history").hide();
                        }

                        for (var i = 0; i < result.length; i++) {
                            var data = result[i];

                            if (data.data.contentType == 2) {  //文本

                                var html = getTextMessage_Html(data.from, data.data, "");
                            } else if (data.data.contentType == 8) {  //图片

                                var html = getPicMessage_Html(data.from, data.data, "");
                            } else if (data.data.contentType == 4) {  //文件
                                var html = getFileMessage_Html(data.from, data.data, "");

                            }


                            $("#chat-dialog .chat-content .chat-dy_show .inner").prepend(html);
                            //$("#chat-dialog .chat-content .chat-dy_show .inner")
                            //    .scrollTop($("#chat-dialog .chat-content .chat-dy_show .inner")[0].scrollHeight);
                        }
                    },
                    error: function (e) {
                        //console.log("获取消息历史记录:" + e);
                    }
                });

            })


            //文件拖拽上传
            $('.chat-content')
                .bind('dragenter', ignoreDrag)
                .bind('dragover', ignoreDrag)
                .bind('drop', drop);

            //聊天消息图片双击事件
            $("#chat-dialog").on("dblclick", ".chat-inner .inner .inner-chat img.pic", function () {
                var src = $(this).attr("src");
                $("#iviewer").fadeIn().trigger('fadein');
                $("#iviewer .loader").show();
                $("#iviewer .viewer").hide();

                var viewer = $("#iviewer .viewer")
                    .iviewer('loadImage', src)
                    .iviewer('set_zoom', 'fit');
                //$(".full-screen-pic>img").attr("src", src);
                //$(".full-screen-pic").css("display", "block");
            })

            //全屏图片关闭
            //$(".full-screen-pic>div").click(function () {
            //    $(".full-screen-pic").hide();
            //})

            var viewer = $("#iviewer .viewer").
                width($(window).width() - 80).
                height($(window).height()).
                iviewer({
                    ui_disabled: true,
                    zoom: 'fit',
                    onFinishLoad: function (ev) {
                        $("#iviewer .loader").fadeOut();
                        $("#iviewer .viewer").fadeIn();
                    }
                }
            );

            $("#iviewer .zoomin").click(function (e) {
                e.preventDefault();
                viewer.iviewer('zoom_by', 1);
            });

            $("#iviewer .zoomout").click(function (e) {
                e.preventDefault();
                viewer.iviewer('zoom_by', -1);
            });


            $("#iviewer .close").click(function (e) {
                e.preventDefault();
                $("#iviewer").fadeOut().trigger('fadeout');
            });

            $("#iviewer").bind('fadein', function () {
                $(window).keydown(function (e) {
                    if (e.which == 27) {
                        $("#iviewer").fadeOut().trigger('fadeout');
                    }
                });
            });


        })
    }

    return {
        init: init, ReceiveMsg: ReceiveMsg, getTextMessage_Html: getTextMessage_Html,
        getPicMessage_Html: getPicMessage_Html, getFileMessage_Html: getFileMessage_Html
    };

});