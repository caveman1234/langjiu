/**
 * Created by 炎 on 2017/5/17 017.
 */
define(["EJS", "EJSObj", "emotion", "sys_config"], function (EJS, EJSObj, emotion, sys_config) {

    //接收消息
    function ReceiveMsg(type, msg, flag) {
        ////console.log(msg);  //来message
        if (msg.type != "chat") {
            return;
        }

        if (type == 2) { //文本
            //更新lastmessage
            var formatmsg = msg.data.content.replace(/<\s?img[^>]*>/gi, "[图片]").trim();
            ////console.log(formatmsg);

            var html = EJSObj.e_templateHtml("lastmessage.ejs",
                "/ism/chat/ism_template/lastmessage.ejs", {data:formatmsg});

            //endVersion
            $(".left-pannel-content .person[flagid='" + msg.from + "']").attr("endversion", msg.sessionVersion);
            $(".left-pannel-content .person[flagid='" + msg.from + "']").find(".person-info > small")
                .html(html);
            var dom = $(".right-pannel-center-inner.show-chat[flagid='" + msg.from + "']");
            if (dom.length > 0) {
                //var src = $(".left-pannel-content .person[flagid='" + msg.from + "']")
                //    .children("img").attr("src");
                var html = getTextMessage_Html(msg.from, msg.data, "");
                dom.append(html);
                dom.scrollTop(dom[0].scrollHeight);

                //已读回执
                YYIMChat.sendReadedReceiptsPacket({
                    to:msg.from,
                    type:"chat",
                    id:msg.to,
                    sessionVersion:msg.sessionVersion
                });
                return;
            }

        } else if (type == 8) {  //图片
            //更新lastmessage

            //endVersion
            $(".left-pannel-content .person[flagid='" + msg.from + "']").attr("endversion", msg.sessionVersion);
            $(".left-pannel-content .person[flagid='" + msg.from + "']").find(".person-info > small")
                .html("[图片]");

            var dom = $(".right-pannel-center-inner.show-chat[flagid='" + msg.from + "']");
            if (dom.length > 0) {
                //var src = $(".left-pannel-content .person[flagid='" + msg.from + "']")
                //    .children("img").attr("src");
                var html = getPicMessage_Html(msg.from, msg.data, "");
                dom.append(html);
                dom.scrollTop(dom[0].scrollHeight);
                //已读回执
                YYIMChat.sendReadedReceiptsPacket({
                    to:msg.from,
                    type:"chat",
                    id:msg.to,
                    sessionVersion:msg.sessionVersion
                });
                return;
            }

        } else {     //文件

            //更新lastmessage
            //endVersion
            $(".left-pannel-content .person[flagid='" + msg.from + "']").attr("endversion", msg.sessionVersion);
            $(".left-pannel-content .person[flagid='" + msg.from + "']").find(".person-info > small")
                .html("[文件]");
            var dom = $(".right-pannel-center-inner.show-chat[flagid='" + msg.from + "']");
            if (dom.length > 0) {

                var html = getFileMessage_Html(msg.from, msg.data, "");
                ////console.log(html)
                dom.append(html);
                dom.scrollTop(dom[0].scrollHeight);
                //已读回执
                YYIMChat.sendReadedReceiptsPacket({
                    to:msg.from,
                    type:"chat",
                    id:msg.to,
                    sessionVersion:msg.sessionVersion
                });
                return;
            }
        }

        // 总消息条数
        //取出


        //消息为未读取状态，改变badge
        var dom = $(".left-pannel-content .person[flagid='" + msg.from + "']");
        if (dom.length > 0) {   //此人在联系列表中
            var totalnum = $("#operation .u-badge").attr("data-badge"); //总消息条数
            var num = dom.find(".badge").text();
            //endVersion
            dom.attr("endversion", msg.sessionVersion)
            if (num == '99+') {

            } else {
                num = (Number(num) + 1) > 99 ? '99+' : (Number(num) + 1);
            }

            dom.find(".badge").text(num).show();

            totalnum = Number(totalnum) + 1;

            //totalmessage
            if (totalnum >= 0 && totalnum <= 99) {
            } else {
                totalnum = "99+";
            }
            //存入
            $("#operation .u-badge").attr("data-badge", totalnum);

        } else {              //此人不在联系列表中
            //添加此人进列表
            var data = [];
            var lastm;
            if (type == 2) {
                lastm = msg.data.content.replace(/<\s?img[^>]*>/gi, "[图片]").trim();
            }
            else if (type == 8)   lastm = "[图片]";
            else if (type == 4)   lastm = "[文件]";
            var person = {id: msg.from, name: msg.from, lastmessage: lastm, endVersion: msg.sessionVersion};
            data.push(person);
            var html = EJSObj.e_templateHtml("left_pannel_person.ejs",
                "/ism/chat/ism_template/left_pannel_person.ejs", {list: data});
            $(".left-pannel-content").append(html);
            person = data = null;

            //未读消息badge
            var notreadnum = 0;
            if (!flag) {
                $(".left-pannel .person[flagid='" + msg.from + "']").find(".badge").text('1').show();
                notreadnum = 1;
            } else {
                //初始化未读消息
                msg.readedVersion = msg.readedVersion?msg.readedVersion:0;
                notreadnum = msg.sessionVersion - msg.readedVersion;
                if (notreadnum > 0 && notreadnum<=99)
                    $(".left-pannel .person[flagid='" + msg.from + "']").find(".badge").text(notreadnum).show();
                else if(notreadnum == 0 ){

                }
                else{
                    $(".left-pannel .person[flagid='" + msg.from + "']").find(".badge").text("99+").show();
                }

            }


            //查询此人realname       result.data.REALNAME
            if (msg.from == account.userName) {
                return;
            }
            $.post(sys_config.ApiBaseUrl + "getUserinfo_zt", {username: msg.from}, function (result) {
                if (result.result == "true") {
                    ////console.log("find user:" + msg.from);
                    ////console.log(result);
                    var _person = $(".left-pannel-content .person[flagid='" + msg.from + "']");
                    _person.find(".person-info b").text(result.data.realname);
                    _person.find(".person-info span").text(result.data.department);
                    _person.children("img").attr("src", result.data.photo);   //设置头像
                    _person.show();

                    var totalnum = $("#operation .u-badge").attr("data-badge"); //总消息条数
                    totalnum = Number(totalnum) + Number(notreadnum);//添加总消息条数

                    //totalmessage
                    if (totalnum >= 0 && totalnum <= 99) {
                    } else {
                        totalnum = "99+";
                    }
                    //存入
                    $("#operation .u-badge").attr("data-badge", totalnum);

                     ////默认点击最新聊天人
                    if(sys_config.lastone ==  msg.from && msg.readedVersion == msg.sessionVersion){

                        $(".left-pannel-content .person[flagid='"+sys_config.lastone+"']")
                            .trigger("click");
                    }


                } else {
                    ////console.log("find user:" + msg.from+"发生错误");
                    var removeperson = $(".left-pannel-content .person[flagid="+msg.from+"]");
                    removeperson.remove();//移除此人
                }
            }).error(function () {
                ////console.log("getUserinfo_zt  " + msg.from + "   error");
            })


        }




    }

    //将code转化为表情图片
    function CodeToImage(code) {
        var codemessage = code;
        $.each(emotion, function (index, ele) {
            if (code.indexOf(ele.actionKey) < 0) {
                return true;
            }
            codemessage = codemessage.replace(ele.reg, "<img class=\"face-p\" src='/ism/chat/img/face/'" + ele.url + "\" alt=\"" + ele.actionKey + "\"/>");
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
            var avstar = "";
            if (name == account.userName) {
                avstar = account.avstar;
            } else {
                avstar = $(".left-pannel-content .person[flagid='" + name + "']")
                    .children("img").attr("src");
            }

            var message = CodeToImage(body.content); //如果有表情就转化为图片

            //获取时间戳
            var hint_time = "";
            var dom = $(".right-pannel-center-inner.show-chat");
            if (dom.attr("flagtime")) {
                var oldtime = dom.attr("flagtime");
                var newtime = body.dateline;
                if (Math.abs(newtime - oldtime) > 300000) {
                    hint_time = newtime;
                    dom.attr("flagtime", hint_time);
                }
            } else {
                hint_time = body.dateline;
                dom.attr("flagtime", hint_time);
            }


            var html = EJSObj.e_templateHtml("right_pannel_center_message.ejs",
                "/ism/chat/ism_template/right_pannel_center_message.ejs", {
                    data: {
                        hint_time: hint_time,
                        message: message, //
                        avstar: avstar,
                        chat_from: name == account.userName  //标志   其他人和我
                    }
                });
            return html;
        } catch (e) {
            ////console.log("文本消息html模板错误:" + e);
        }
        return "";
    }

    //发送的文本消息模板
    function sendTextMessage_Html(name, cont, headimg) {
        //获取时间戳
        var hint_time = "";
        var dom = $(".right-pannel-center-inner.show-chat");
        if (dom.attr("flagtime")) {
            var oldtime = dom.attr("flagtime");
            var newtime = Date.now();
            if (Math.abs(newtime - oldtime) > 300000) {
                hint_time = newtime;
                dom.attr("flagtime", hint_time);
            }
        } else {
            hint_time = Date.now();
            dom.attr("flagtime", hint_time);
        }
        try {
            avstar = account.avstar;
            ////console.log(new Date().getTime().toString());
            // var message = ImageToCode(cont); //如果有表情就转化为图片
            var html = EJSObj.e_templateHtml("right_pannel_center_message.ejs",
                "/ism/chat/ism_template/right_pannel_center_message.ejs", {
                    data: {
                        hint_time: hint_time,
                        avstar: avstar,
                        message: cont, //
                        chat_from: true //标志   其他人和我
                    }
                });
            return html;

        } catch (e) {
            ////console.log("我发送的文本消息模板错误:" + e);
        }
        return "";
    }

    //接收图片
    function getPicMessage_Html(name, body, friheadpic) {

        try {
            var avstar = "";
            if (name == account.userName) {
                avstar = account.avstar;
            } else {
                avstar = $(".left-pannel-content .person[flagid='" + name + "']")
                    .children("img").attr("src");
            }
            //获取时间戳
            var hint_time = "";
            var dom = $(".right-pannel-center-inner.show-chat");
            if (dom.attr("flagtime")) {
                var oldtime = dom.attr("flagtime");
                var newtime = body.content.dateline;
                if (Math.abs(newtime - oldtime) > 300000) {
                    hint_time = newtime;
                    dom.attr("flagtime", hint_time);
                }
            } else {
                hint_time = body.content.dateline;
                dom.attr("flagtime", hint_time);
            }

            var html = EJSObj.e_templateHtml("pic.ejs", "/ism/chat/ism_template/pic.ejs", {
                data: {
                    hint_time: hint_time,
                    avstar: avstar,
                    src: body.content.path,
                    chat_from: name == account.userName  //标志   其他人和我
                }
            });

            return html;
        } catch (e) {
            ////console.log(e)
        }
    }

    //接收文件
    function getFileMessage_Html(name, body, friheadpic) {

        try {
            var avstar = "";
            if (name == account.userName) {
                avstar = account.avstar;
            } else {
                avstar = $(".left-pannel-content .person[flagid='" + name + "']")
                    .children("img").attr("src");
            }
            //获取时间戳
            var hint_time = "";
            var dom = $(".right-pannel-center-inner.show-chat");
            if (dom.attr("flagtime")) {
                var oldtime = dom.attr("flagtime");
                var newtime = body.content.dateline;
                if (Math.abs(newtime - oldtime > 300000)) {
                    hint_time = newtime;
                    dom.attr("flagtime", hint_time);
                }
            } else {
                hint_time = body.content.dateline;
                dom.attr("flagtime", hint_time);
            }


            var type = body.content.name.split(".");
            type = type[type.length - 1];
            var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/ism_template/file.ejs", {
                data: {
                    img: "/ism/chat/img/filetype/" + fileType(type) + ".png",
                    avstar: avstar,
                    time: new Date(body.dateline),
                    friheadpic: friheadpic, //
                    name: name, //
                    filename: body.content.name, //
                    size: (body.content.size / 1024.0 / 1024.0).toFixed(3) + "M",
                    path: body.content.path,
                    chat_from: name == account.userName, //标志   其他人和我
                    hint_time: hint_time
                }
            });
            //alert("df")
            return html;
        } catch (e) {
            ////console.log(e)
        }
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
            //alert(document.selection.createRange());
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
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }


        function upload(file, type, id) {
            var datas = new FormData();
            datas.append("file", file);
            var toid = $(".right-pannel-center-inner.show-chat").attr("flagid");
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
                    ////console.log("发送" + type + "成功");
                    ////console.log(data);
                    if (type == "pic") {
                        var html = getPicMessage_Html(data.from, data.data, "");
                        var dom = $(".right-pannel-center-inner.show-chat");
                        dom.append(html);
                        dom.scrollTop(dom[0].scrollHeight);
                    } else {
                        ////console.log("文件");

                        $("#" + id).parent().find("a").attr("href", data.data.content.path);
                        $("#" + id).remove();
                    }

                    //获取时间戳
                    var hint_time = "";
                    var dom = $(".right-pannel-center-inner.show-chat");
                    if (dom.attr("flagtime")) {
                        var oldtime = dom.attr("flagtime");
                        var newtime = Date.now();
                        if (Math.abs(newtime - oldtime) > 300000) {
                            hint_time = newtime;
                            dom.attr("flagtime", hint_time);
                        }
                    } else {
                        hint_time = Date.now();
                        dom.attr("flagtime", hint_time);
                    }

                },
                error: function (e) {
                    ////console.log("发送" + type + "错误");
                    ////console.log(e);
                },
                progress: function (arg) {
                    if (!type == "file")
                        return;

                    ////console.log(arg)

                    try {

                        var per = (arg.percent * 100).toFixed(2) + "%";

                        $("#" + id).find(".chat-file-progress-inner").width(per);
                        $("#" + id).find(".chat-file-progress-text").text(per);


                    } catch (e) {
                        ////console.log("发送文件进度错误:" + e)
                    }
                }
            })

            /*         new           */

            //var toid = $(".right-pannel-center-inner.show-chat").attr("flagid");
            //
            //var method = "";
            // if(type=="pic")
            // {
            //     method = "sendPic";
            // }else{
            //     method = "sendFile";
            // }
            //YYIMChat[method]({
            //    fileInputId: type=="pic"?"uploadPic":"uploadFile",
            //    chatInfo: function () {
            //        return {
            //            to: toid,
            //            type: "chat"
            //        }
            //    },
            //    success: function (data) {
            //        ////console.log("发送" + type + "成功");
            //        ////console.log(data);
            //        if (type == "pic") {
            //            var html = getPicMessage_Html(data.from, data.data, "");
            //            var dom = $(".right-pannel-center-inner.show-chat");
            //            dom.append(html);
            //            dom.scrollTop(dom[0].scrollHeight);
            //        } else {
            //            ////console.log("文件");
            //
            //            $("#" + id).parent().find("a").attr("href", data.data.content.path);
            //            $("#" + id).remove();
            //        }
            //
            //    },
            //    error: function (e) {
            //        ////console.log("发送" + type + "错误");
            //        ////console.log(e);
            //    },
            //    progress: function (arg) {
            //        if (!type == "file")
            //            return;
            //
            //        ////console.log(arg)
            //
            //        try {
            //
            //            var per = (arg.percent * 100).toFixed(2) + "%";
            //
            //            $("#" + id).find(".chat-file-progress-inner").width(per);
            //            $("#" + id).find(".chat-file-progress-text").text(per);
            //
            //
            //        } catch (e) {
            //            ////console.log("发送文件进度错误:" + e)
            //        }
            //    }
            //});

            //////console.log(method)

        }


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
                    //alert("请安装牛牛截屏插件");
                    $(".right-pannel .footer-toolbar > a").show();
                    return;
                } else {
                    $(".right-pannel .footer-toolbar > a").hide();
                }

                flag_captureload = true;

                switch (type) {
                    case 1:
                    {
                        //$('#info').html('截图完成： x:' + x + ',y:' + y + ',widht:' + width + ',height:' + height);
                        //UploadCaptureData(content, localpath);
                        ////console.log("localpath");
                        ////console.log(localpath);
                        ////console.log(content)
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
                            ////console.log(result);
                            if (result.result != "true") {
                                errorA("截图上传失败");
                                return;
                            }
                            //将图片加入聊天框
                            var dom = document.createElement("img");
                            dom.className = "screenshotimg pic";
                            dom.src = result.data;
                            //将图片加入聊天框
                            //var img = "<img class='screenshotimg  pic' src='" + result.data.path + "' >";
                            //图片加入发送框
                            //$(".right-pannel .footer-input .edit").append(img);

                            ////console.log(capture_focusflag);
                            if (capture_focusflag) {
                                $(".right-pannel .footer-input .edit").focus();
                                insertExpressionHTML(dom);
                            } else {
                                $(".right-pannel .footer-input .edit").append(dom);
                            }
                        })


                        //var toid = login.IsLogin.attachmentfileId;
                        //
                        //YYIMChat.sendFormMessage({
                        //    to: toid,
                        //    file: {
                        //        name: "screenhot",
                        //        size: content.length
                        //    },
                        //    data: {file: encodeURIComponent(content)},
                        //    mediaType: type == "pic" ? 1 : 2, //1:图片，2：附件
                        //    type: "chat",
                        //    success: function (data) {
                        //        ////console.log("文件上传成功");
                        //        var path = data.body.content.path;
                        //        var img = "<img class='screenshotimg' src='" + path + "' >";
                        //        //图片加入发送框
                        //        $("#chat-dialog .chat-dy_show .footer-input .edit").append(img);
                        //    },
                        //    error: function (e) {
                        //        ////console.log("发送" + type + "错误");
                        //        ////console.log(e);
                        //    },
                        //});

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
                ////console.log(success)
                if (success) {
                    $(".right-pannel .footer-toolbar > a").hide();
                } else {
                    $(".right-pannel .footer-toolbar > a").show();
                }
            }

            //忽略默认拖拽事件
            function ignoreDrag(e) {
                e.originalEvent.stopPropagation();
                e.originalEvent.preventDefault();
            }

            function drop(e) {
                ignoreDrag(e);
                var dt = e.originalEvent.dataTransfer;
                var file = dt.files[0];
                ////console.log(file);

                //聊天消息显示文件图片和进度
                //var data = {};
                //data.chat_from = true;
                //data.time = new Date();
                //data.filename = file.name;
                //data.size = (file.size / 1024.0 / 1024.0).toFixed(3) + "M";
                //////console.log(data.size);


                var type = file.name.split(".");
                type = type[type.length - 1];

                //聊天消息显示文件图片和进度
                var data = {};
                data.img = "/ism/chat/img/filetype/" + fileType(type) + ".png";
                data.chat_from = true;
                data.time = new Date();
                data.filename = file.name;
                data.size = (file.size / 1024.0 / 1024.0).toFixed(3) + "M";
                ////console.log(data.size);

                var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/ism_template/file.ejs", {data: data});
                $(".right-pannel-center-inner.show-chat").append(html);

                $("#" + data.time.getTime()).show();

                var dom = $(".right-pannel-center-inner.show-chat");
                dom.scrollTop(dom[0].scrollHeight);
                dom = null;
                ////console.log("upload");

                upload(file, "file", data.time.getTime()); //最后一个参数为id 方便更新进度
            }

            // 焦点判断变量
            var focusflag = false;
            var captureObj = "";
            var flag_captureload = false;
            var capture_focusflag = false;

            //初始化表情面板
            var html = EJSObj.e_templateHtml("expression_pannel.ejs", "/ism/chat/ism_template/expression_pannel.ejs",
                {pics: emotion});
            $(".expression-panel").html(html);

            //初始化下载url   http://192.168.79.65:8090/ism/downFile/captureInsatll.exe
            $(".footer-toolbar a:last-child").attr("href", sys_config.ApiBaseUrl + "api/downFile");

            screenShotInit();

            //各种点击事件

            //历史消息
            //加载历史消息
            var pagecount = 10;

            //   历史消息
            $(".right-pannel-center").on("click", ".chat-inner-history span", function () {
                var finish_history = $(this).attr('flag_finish_history');
                var add_history = $(this).attr('flag_add_history');
                var start = $(this).attr('flag_start') || 0;
                start = Number(start);
                var that = this;
                if (finish_history)
                    return;

                var hasmessagenum = 0;
                if (!add_history) {
                    hasmessagenum = $(this).parent().parent().children(".message").length;
                    start = hasmessagenum;
                } else {
                    start += pagecount;
                }

                YYIMChat.getHistoryMessage({
                    id: $(this).parent().parent().attr("flagid"),
                    type: 'chat',
                    //contentType : data.contentType || 0,
                    start: start,
                    //num: !add_history ? (pagecount + hasmessagenum) : pagecount,
                    size: pagecount,
                    endVersion: $(".person.person-active").attr("endversion"),
                    success: function (obj) {
                        ////console.log('历史消息获取成功');
                        var result = obj.result;
                        ////console.log(result);

                        $(that).attr('flag_start', start);

                        if (!add_history) {

                            $(".show-chat .chat-inner-history span").attr('flag_add_history', 'true');
                        }
                        if (result.length < pagecount) {
                            $(".show-chat .chat-inner-history span").attr('flag_finish_history', "true");
                            $(".right-pannel-center-inner.show-chat .chat-inner-history").hide();
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

                            $(".right-pannel-center-inner.show-chat .chat-inner-history").after(html);

                        }
                    },
                    error: function (e) {
                        ////console.log("获取消息历史记录:" + e);
                    }
                })


            })

            //打开表情面板
            $(".right-pannel-footer").on("click", "#emotion", function () {
                $(".expression-panel").fadeIn();
                return false;
            })

            //点击发送图片
            $(".right-pannel-footer").on("click", "#picture", function () {
                $("#uploadPic").trigger("click");
            })

            //点击发送文件
            $(".right-pannel-footer").on("click", "#file", function () {
                $("#uploadFile").trigger("click");
            })

            //点击截图
            $(".right-pannel-footer").on("click", "#screenshot", function () {

                if (focusflag) {
                    capture_focusflag = true;
                } else {
                    capture_focusflag = false;
                }

                ////console.log('截图操作');
                captureObj.DoCapture("screenshot_temp.jpg", 0, 0, 0, 0, 0, 0);
                //setTimeout(function () {
                //    if (!flag_captureload) {
                //        $(".right-pannel .footer-toolbar > a").show();
                //    }
                //    ////console.log(flag_captureload)
                //}, 3000)
            })


            //上传文件监听
            $(".right-pannel-footer").on('change', "#uploadFile", function () {

                var file = this.files[0];

                var type = file.name.split(".");
                type = type[type.length - 1];

                //聊天消息显示文件图片和进度
                var data = {};
                data.avstar = account.avstar;
                data.img = "/ism/chat/img/filetype/" + fileType(type) + ".png";
                data.chat_from = true;
                data.time = new Date();
                data.filename = file.name;
                data.size = (file.size / 1024.0 / 1024.0).toFixed(3) + "M";
                ////console.log(data.size);

                var html = EJSObj.e_templateHtml("file.ejs", "/ism/chat/ism_template/file.ejs", {data: data});
                $(".right-pannel-center-inner.show-chat").append(html);

                $("#" + data.time.getTime()).show();

                var dom = $(".right-pannel-center-inner.show-chat");
                dom.scrollTop(dom[0].scrollHeight);
                dom = null;

                upload(file, "file", data.time.getTime()); //最后一个参数为id 方便更新进度

                //更新dom input元素   清空
                var input = $("#uploadFile").clone(true);
                $("#uploadFile").remove();
                $(".footer-toolbar").append(input);


            });
            $(".right-pannel-footer").on('change', "#uploadPic", function () {

                var pic = this.files[0];
                upload(pic, "pic");


                //更新dom input元素   清空
                var input = $("#uploadPic").clone(true);
                $("#uploadPic").remove();
                $(".footer-toolbar").append(input);
            });


            //点击containner 隐藏表情框
            $(".containner").click(function () {
                $(".expression-panel").fadeOut();
                focusflag = false;
            })


            //点击表情
            $(".right-pannel-footer").on("click", ".expression-panel .face-pic", function () {
                var index = $(this).attr("flagindex");
                var dom = document.createElement("img");
                dom.className = "face-p";
                dom.src = "/ism/chat/img/face/" + emotion[index].url;
                //再此判断是否在编辑区获取焦点 点击表情按钮
                ////console.log(focusflag);
                if (focusflag) {
                    $(".right-pannel-center-inner.show-chat .footer-input .edit").focus();
                    insertExpressionHTML(dom);
                } else {
                    $(".footer-input .edit")[0].appendChild(dom);
                }
            })

            //点击输入框
            $(".right-pannel-footer").on("click", ".footer-input .edit", function () {
                //获得焦点
                focusflag = true;
                $(".expression-panel").fadeOut();
                return false;
            })


            //发送消息
            $(".right-pannel-footer").on("click", "#sendMessage", function () {
                var cont = $(".right-pannel-footer .footer-input .edit").html();

                if (!cont)
                    return;
                var temp = cont;
                temp = temp.replace(/(&nbsp;)|(<br>)/g,"").trim();
                if(!temp){
                    return;
                }
                cont = cont.replace(/<br>$/gi,"");

                var toid = $(".right-pannel-center-inner.show-chat").attr("flagid");


                var html = sendTextMessage_Html("我", cont, "");
                $(".right-pannel-center-inner.show-chat").append(html);
                $(".right-pannel-center-inner.show-chat").scrollTop($(".right-pannel-center-inner.show-chat")[0].scrollHeight);

                YYIMChat.sendTextMessage({
                    to: toid,
                    type: "chat",
                    msg: cont,
                    success: function (data) {
                        ////console.log("发送成功!" + JSON.stringify(data));
                    }
                });
                $(".footer-input .edit").empty();
            })


            //输入框 .footer-input .edit
            $(".right-pannel-footer").on('keypress', '.footer-input .edit', function (event) {
                ////console.log(event)

               if (event.ctrlKey && (event.keyCode == 13 || event.keyCode == 10)) {
                    $("#sendMessage").trigger("click");
                }else if (event.which == 13) {

                } 
            })


            //聊天消息图片双击事件
            $(".right-pannel-center").on("dblclick", ".message>div img.message-picture," +
                ".message>div>p>img.screenshotimg.pic", function () {
                ////console.log("聊天消息图片双击事件")
                var src = $(this).attr("src");
                $("#iviewer").fadeIn().trigger('fadein');
                $("#iviewer .loader").show();
                $("#iviewer .viewer").hide();

                var viewer = $("#iviewer .viewer")
                    .iviewer('loadImage', src)
                    .iviewer('set_zoom', 'fit');

                return false;
            })


            //文件拖拽上传
            $('.right-pannel')
                .bind('dragenter', ignoreDrag)
                .bind('dragover', ignoreDrag)
                .bind('drop', drop);


            //$(".footer-input .edit").on('paste', function (e) {
            //    e.preventDefault();
            //    var text = null;
            //    ////console.log(e.originalEvent);
            //
            //
            //    if (window.clipboardData && clipboardData.setData) {
            //        // ////console.log("IE")
            //        // IE
            //        text = window.clipboardData.getData('text');
            //    } else {
            //        //////console.log("no IE")
            //        text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
            //    }
            //    if (document.body.createTextRange) {
            //        //////console.log("createTextRange")
            //        if (document.selection) {
            //            textRange = document.selection.createRange();
            //        } else if (window.getSelection) {
            //            // ////console.log("getSelection")
            //            sel = window.getSelection();
            //            var range = sel.getRangeAt(0);
            //
            //            // 创建临时元素，使得TextRange可以移动到正确的位置
            //            var tempEl = document.createElement("span");
            //            tempEl.innerHTML = "&#FEFF;";
            //            range.deleteContents();
            //            range.insertNode(tempEl);
            //            textRange = document.body.createTextRange();
            //            textRange.moveToElementText(tempEl);
            //            tempEl.parentNode.removeChild(tempEl);
            //        }
            //        textRange.text = text;
            //        textRange.collapse(false);
            //        textRange.select();
            //    } else {
            //        // Chrome之类浏览器
            //        document.execCommand("insertText", false, text);
            //    }
            //});

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
    }
})


