function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


var account = {
    userName: getCookie("username"), //jxs2test2   userwith2roles
    // userName: "44b1052e90684e67b2ed8ae9aeda72e8", //test4
    passworld: "12345678"
};

require.config({
    paths: {
        "sys_config": "/ism/chat/js/sys_config",
        "login": "/ism/chat/js/ism_webim_login",
        "EJS": "/ism/chat/js/webim_ejs",
        "EJSObj": "/ism/chat/js/webim_ejstemplate",
        "emotion": "/ism/chat/data/emotion",

        "ism_ejs_template": "/ism/chat/js/ism_templatejs/ism_ejs_template",
        "left_pannel": "/ism/chat/js/ism_templatejs/left_pannel",
        "right_pannel": "/ism/chat/js/ism_templatejs/right_pannel",
        "ism_dialog": "/ism/chat/js/dialog/dialog"
    },
    shim: {
        "EJS": {
            exports: "EJS"
        },
        "EJSObj": {
            exports: "EJSObj"
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
            "确定": function() {
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
    var dom = $(".containner .left-pannel .errorhint");
    if (dom.length > 0) {
        dom.text("注意:" + hint);
        return;
    }
    var html = "<p class='errorhint'> 注意:" + hint + "</p>";
    $(".containner .left-pannel").append(html);
}


require(["EJS", "EJSObj", "ism_ejs_template", "login", "ism_dialog", "sys_config"],
    function(EJS, EJSObj, ism_ejs_template, login, dialog, sys_config) {

        //权限判断
        $.get("/ism/ism_index.html", function(result) {
            //有权限
            $("#operation").parent().show();

            //绑定点击事件
            $("#operation").click(function() {


                $(".containner").toggle("fast", function() {
                    if ($(".containner").is(":visible")) {

                        if (window._myselectedperson_) {
                            window._myselectedperson_.trigger("click");
                        } else {

                            $(".left-pannel-content .person[flagid='" + sys_config.lastone + "']")
                                .trigger("click");
                        }
                    } else {

                        //移除active 标志
                        var dom = $(".left-pannel-content .person.person-active");
                        window._myselectedperson_ = dom;
                        $(".left-pannel-content .person.person-active").removeClass("person-active");
                        $(".right-pannel-center-inner.show-chat").remove();
                    }

                });


            })

            //初始化容器
            var obj = {};
            var html = EJSObj.e_templateHtml("container.ejs", "/ism/chat/ism_template/container.ejs", { data: obj });
            $("body").append(html);

            //初始化模板
            ism_ejs_template();
            // console.log(account.userName)

            login.YYIMChatLogin(account.userName, account.passworld);

            //初始化dialog
            dialog.init();

        }).error(function(e) {
            //306 NoPermission
        })


        // left-pannel

        //$(".left-pannel").resizable(
        //    {
        //        autoHide: true,
        //        handles: 'e',
        //        containment: 'parent',
        //        resize: function (e, ui) {
        //            var parent = ui.element.parent();
        //            var remainingSpace = parent.width() - ui.element.outerWidth(),
        //                divTwo = ui.element.next(),
        //                divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width())) / parent.width() * 100 + "%";
        //            divTwo.width(divTwoWidth);
        //        },
        //        stop: function (e, ui) {
        //            var parent = ui.element.parent();
        //            ui.element.css(
        //                {
        //                    width: ui.element.width() / parent.width() * 100 + "%",
        //                });
        //        }
        //    });


    })