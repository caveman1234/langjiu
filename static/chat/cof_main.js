/**
 * Created by 炎 on 2017/6/15 015.
 */

require.config({
    paths: {
        "sys_config": "js/sys_config",
        "EJS": "js/webim_ejs",
        "EJSObj": "js/webim_ejstemplate",
        "containner":"js/cof_templatejs/containner",
        "user": "js/cof_templatejs/user",
        "lib" : "js/cof_templatejs/lib"
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
function errorDialog(text) {
    if (!text) {
        text = "发生错误";
    }
    $("#dialog-confirm p span").text(text);
    $("#dialog-confirm p img").attr("src","chat/img/ism_img/wrong.png");

    $("#dialog-confirm").dialog({
        resizable: false,
        width: 310,
        modal: true,
        buttons: {
            "确定": function () {
                $(this).dialog("close");
                $("#dialog-confirm p img").attr("src","chat/img/ism_img/warn.png");
            }
        }
    });
    var html = "<img src='chat/img/close.png' width='12'>";
    $(".ui-dialog-titlebar-close").html(html);
}

function comfireDialog(text, ok, cancel) {
    if (!text) {
        text = "发生错误";
    }
    $("#dialog-confirm p span").text(text);
    $("#dialog-confirm").dialog({
        resizable: false,
        //height: 160,
        modal: true,
        buttons: {
            "取消": function () {
                $(this).dialog("close");
                if (cancel && typeof(cancel) === "function") {
                    cancel();
                }
            },
            "确定": function () {
                $(this).dialog("close");
                if (ok && typeof(ok) === "function") {
                    ok();
                }
            }
        }
    });
    var html = "<img src='chat/img/close.png' width='12'>";
    $(".ui-dialog-titlebar-close").html(html);

}


require(["containner"],function(containner){

    containner.init();
})

