var isServer = window.isServer;
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

var account = {
    userName: getCookie("username"),    //jxs2test   userwith2roles
    // userName: "44b1052e90684e67b2ed8ae9aeda72e8",    //jxs2test   userwith2roles
    passworld: "12345678"
};

require.config({
    paths: {
        "sys_config": `${isServer ? "/terminal" : ''}/static/chat/js/sys_config`,
        "login": `${isServer ? "/terminal" : ''}/static/chat/js/webim_login`,
        "EJS": `${isServer ? "/terminal" : ''}/static/chat/js/webim_ejs`,
        "EJSObj": `${isServer ? "/terminal" : ''}/static/chat/js/webim_ejstemplate`,
        "ejs_template": `${isServer ? "/terminal" : ''}/static/chat/js/ejs_template`,
        "webim_template": `${isServer ? "/terminal" : ''}/static/chat/js/templatejs/webim_template`,
        "webim_chat_template": `${isServer ? "/terminal" : ''}/static/chat/js/templatejs/webim_chat_template`,
        "emotion": `${isServer ? "/terminal" : ''}/static/chat/data/emotion`,
        "org": `${isServer ? "/terminal" : ''}/static/chat/js/org`,
        "niuniucapture": `${isServer ? "/terminal" : ''}/static/chat/niuniucapture`

    },
    shim: {
        "EJS": {
            exports: "EJS"
        },
        "EJSObj": {
            exports: "EJSObj"
        },
        "niuniucapture": {
            exports: "NiuniuCaptureObject"
        }
    }
})

//统一报错
function errorAlert(text) {
    if (!text) {
        text = "发生错误";
    }
    $("#dialog-error p span").text(text);

    $("#dialog-error").dialog({
        resizable: false,
        //height: 160,
        modal: true,
        buttons: {
            "确定": function () {
                $(this).dialog("close");
            }
        }
    });
    var html = "<img src='/ism/chat/img/close.png' width='12'>";
    $(".ui-dialog-titlebar-close").html(html);
}

//通讯连接失败提示
function errorHint(hint) {
    if (!hint) {
        return;
    }
    var dom = $("#chat-pannel .errorhint");
    if (dom.length > 0) {
        dom.text("注意:" + hint);
        return;
    }
    var html = "<p class='errorhint'> 注意:" + hint + "</p>";
    $("#chat-pannel").append(html);
}




require(["login", "ejs_template"],
    function (login, ejs_template) {

        login.YYIMChatLogin(account.userName, account.passworld);


        $.fn.slideLeftHide = function (speed, callback) {
            this.animate({
                right: -this.width() + "px"
            }, speed, callback);
        };
        $.fn.slideLeftShow = function (speed, callback) {
            this.animate({
                right: 0
            }, speed, callback);
        };

        $.fn.slideUpShow = function (speed, callback) {
            this.animate({
                height: "show",
                paddingTop: "show",
                paddingBottom: "show",
                marginTop: "show",
                marginBottom: "show"
            }, speed, callback);
        };


        /////////////////////////////////////////////

        $(function () {

            // $.ajax({
            //     url: '/iuap_qy_tenantmanage/loginuser/title',
            //     type: 'GET',
            //     contentType: 'application/x-www-form-urlencoded',
            //     success: function (res) {
            //         if (res.status != 1) {
            //             console.error(res.msg);
            //             return;
            //         }

            //         //添加登录账号名称显示
            //         if ($("#id_titleInsert").length < 1) {
            //             var htmlCode = "<span id='id_titleInsert' style='height:60px;line-height:60px;display:inline-block;" +
            //                 "font-size: 18px;color: whitesmoke;'>丨 " + res.data + "</span>";
            //             $("#app #portal > nav > div.u-container-fluid > div.u-navbar-header").after(htmlCode);
            //         } else {
            //             $("#id_titleInsert").text(res.data);
            //         }


            //     }
            // })






            //初始化骨架
            var html = EJSObj.e_templateHtml("empty-panel.ejs", "/ism/chat/template/empty-panel.ejs", {});
            $("#empty-panel").html(html);



            //绑定点击事件
            $("#operation").click(function () {
                var badge_num = $(this).find(".u-badge").attr("data-badge");
                if (badge_num == '0') {    //toggle  chat-panel
                    $("#chat-pannel .hidden-toolbar").trigger("click");
                } else {                   //展开所有面板  添加所有未读消息人员进入chat-dialog 添加提醒红点
                    var flag = $("#chat-pannel .hidden-toolbar .trangle-right").hasClass("trangle-changedirection");
                    if (!flag) {
                        $("#chat-pannel .hidden-toolbar").trigger("click");
                    }

                    // 添加所有未读消息人员进入chat-dialog
                    var temp = "";
                    $(".list-content .list-item").each(function () {
                        if ($(this).find(".list-item-badge").is(":visible")) {
                            temp = $(this);
                            $(this).trigger("click");
                            //添加红点提醒
                            var flagid = $(this).attr("flagid");
                            $(".left-menu .left-menu-item[flagid='" + flagid + "']").find(".left-menu-item-dot").show();
                        }
                    })

                    //第一个取消红点提醒
                    temp.trigger("click");


                    $("#chat-dialog").show();
                }
            })


            ejs_template.init();

        })

    })