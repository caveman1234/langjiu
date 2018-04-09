/**
 * Created by 炎 on 2017/6/16 016.
 */
define(["EJS", "EJSObj","sys_config"], function (EJS, EJSObj,sys) {
    function libinit() {
        $(function () {


            var treedata = "";

            function findChildNode(parent) {
                var data = [];
                for (var i = 0; i < treedata.length; i++) {
                    if (treedata[i].CLSPARENTCODE == parent) {
                        if (findChildNode(treedata[i].CLSCODE).length > 0) {
                            treedata[i].type = 0;
                        } else {
                            treedata[i].type = 1;
                        }
                        data.push(treedata[i]);
                    }
                }
                return data;
            }

            function init() {  //初始化lib-list

                $.post(sys.ApiBaseUrl + "selectbyclsdata", function (result) {
                    if (result.result != "true") {
                        errorDialog();
                    }
                    treedata = result.data;
                    var data = findChildNode(result.data[0].CLSCODE);

                    var html = EJSObj.e_templateHtml("lib-list.ejs",
                        "chat/cof_template/lib-list.ejs", {list: data});
                    $(".lib-list").html(html);
                })
            }


            init();

            //点击三角符号展开
            $(".content-inner").on("click", ".lib-list .sort-item-head .trangle", function () {
                var dom = $(this).parent().parent().find(".sort-item-list");
                if (!$(this).hasClass("trangle-active")) {
                    $(this).addClass("trangle-active");
                    if (dom.children().length > 0) {
                        dom.show();
                    } else {

                        //find 所有下级
                        //findNextLevel();
                        //var data = [];
                        //var obj = {
                        //    type: 1,
                        //    CLSCODE: 54,
                        //    CLSNAME: "开发还是"
                        //};
                        //var obj1 = {
                        //    type: 1,
                        //    CLSCODE: 56,
                        //    CLSNAME: "冯驩弹铗"
                        //};
                        //
                        //data.push(obj, obj1);
                        var data = findChildNode($(this).next().children("input").attr("code"));
                        var html = EJSObj.e_templateHtml("lib-list.ejs",
                            "chat/cof_template/lib-list.ejs", {list: data});
                        dom.html(html);
                        dom.show();
                    }

                } else {
                    $(this).removeClass("trangle-active");
                    dom.hide();
                }
            })

            //点击 选中||取消
            $(".content-inner").on("click", ".lib-list input.chk_1", function (){
                if ($(this).val()=="0") {
                    $(this).val(1);
                }else{
                    $(this).prop("checked",false);
                    $(this).val(0);
                }
            })



            // lib-add
            $(".content-inner").on("click", "#lib-add", function () {
                var dom = $(".lib-list input.chk_1:checked");
                var uporgname = "";
                var uporgcode = "";
                if (dom.length > 0) {
                    uporgname = dom.parent().next().text();
                    uporgcode = dom.attr("code");

                } else {
                    //添加一级节点
                    uporgname = treedata[0].CLSNAME;
                    uporgcode = treedata[0].CLSCODE;

                }

                var html = EJSObj.e_templateHtml("lib-add.ejs",
                    "chat/cof_template/lib-add.ejs", {data: {uporgname: uporgname, uporgcode: uporgcode}});
                $("#lib-dialog").html(html).show();
                $("#dialog-mask").show();
                //dialog  dragable
                $("#lib-dialog").draggable({containment: "parent", handle: ".dialog-header", scrollSensitivity: 0});

            })

            // lib-modify
            $(".content-inner").on("click", "#lib-modify", function () {
                var dom = $(".lib-list input.chk_1:checked");
                if (dom.length > 0) {
                    var oldorgname = dom.parent().next().text();
                    var orgcode = dom.attr("code");
                    var html = EJSObj.e_templateHtml("lib-modify.ejs",
                        "chat/cof_template/lib-modify.ejs", {data: {oldorgname: oldorgname, orgcode: orgcode}});
                    $("#lib-dialog").html(html).show();
                    $("#dialog-mask").show();
                    //dialog  dragable
                    $("#lib-dialog").draggable({containment: "parent", handle: ".dialog-header", scrollSensitivity: 0});
                } else {
                    errorDialog("未选取知识分类，不能修改");

                }
            })

            //lib-delete
            $(".content-inner").on("click", "#lib-delete", function () {
                var dom = $(".lib-list input.chk_1:checked");
                if (dom.length > 0) {
                    //var oldorgname = dom.parent().next().text();
                    var hint = "";
                    if (dom.parent().prev().hasClass("trangle-hidden")) {

                    }else{
                        hint = "及其下级知识分类";
                    }
                    //删除
                    comfireDialog("您确认要删除知识分类\"" + dom.parent().next().text() + "\""+hint+"吗?", function () {
                        var clscode = dom.attr("code");
                        $.post(sys.ApiBaseUrl + "deletecls", {clscode: clscode}, function (result) {
                            if (result.result != "true") {
                                errorDialog(result.data);
                                return
                            }
                            var list = dom.parent().parent().parent().parent();
                            //ui删除节点
                            dom.parent().parent().parent().remove();
                            //判断  上级组织是否含有下级
                            if (list.children().length < 1) {
                                //移除三角符号
                                list.prev()
                                    .children(".trangle").addClass("trangle-hidden");
                            }

                        })
                    })


                    //} else {                                               //不能删除
                    //    errorDialog("该组织下含有其他组织，不能删除");
                    //}


                    var orgcode = dom.attr("code");
                    //删除


                    //var html = EJSObj.e_templateHtml("lib-modify.ejs",
                    //    "chat/cof_template/lib-modify.ejs",{data:{oldorgname:oldorgname,orgcode:orgcode}});
                    //$("#lib-dialog").html(html).show();
                    //$("#dialog-mask").show();
                    //dialog  dragable
                    //$("#lib-dialog").draggable({containment: "parent", handle: ".dialog-header"});
                } else {
                    errorDialog("未选取知识分类，不能删除");

                }
            })


            // lib-dialog 关闭
            $("#lib-dialog").on("click", ".dialog-header img", function () {
                $("#lib-dialog").hide();
                $("#dialog-mask").hide();
            })

            // 取消   公用
            $("#lib-dialog").on("click", ".dialog-footer button:first-child", function () {
                $("#lib-dialog").hide();
                $("#dialog-mask").hide();
            })

            //确认 lib-add
            $("#lib-dialog").on("click", ".dialog-footer #button-addlib", function () {
                //添加  insertcls
                var clsname = $("#lib-clsname").val().trim();
                var clsparentcode = $("#lib-uporg").attr("code");
                if (!clsname) {
                    errorDialog("请输入知识库名称");
                    return;
                }

                $.post(sys.ApiBaseUrl + "getclscode", function (recode) {
                    $.post(sys.ApiBaseUrl + "insertcls", {
                        clsname: clsname,
                        clscode: recode,
                        clsparentcode: clsparentcode
                    }, function (result) {
                        if (result.result != "true") {
                            errorDialog();
                        }
                        //Ui增加节点
                        var data = [{type: 1, CLSCODE: recode, CLSNAME: clsname}];
                        var dom = $(".lib-list input.chk_1:checked");
                        var html = EJSObj.e_templateHtml("lib-list.ejs",
                            "chat/cof_template/lib-list.ejs", {list: data});
                        if(dom.length>0){
                            dom.parent().parent().next().append(html);
                            dom.parent().prev().removeClass("trangle-hidden");
                        }else{
                             // lib-list
                            $(".lib-list").append(html);

                        }



                        $("#lib-dialog").hide();
                        $("#dialog-mask").hide();

                    })
                })


            })

            //确认 lib-modify
            $("#lib-dialog").on("click", ".dialog-footer #button-libmodify", function () {
                //添加  insertcls
                var clsname = $("#lib-clsname").val().trim();
                var orgcode = $("#lib-uporg").attr("code");
                if (!clsname) {
                    errorDialog("请输入新的知识库名称");
                    return;
                }

                $.post(sys.ApiBaseUrl + "updatecls", {
                    clsname: clsname,
                    clscode: orgcode
                }, function (result) {
                    if (result.result != "true") {
                        errorDialog();
                    }

                    var dom = $(".lib-list input.chk_1:checked");
                    dom.parent().next().text(clsname);

                    $("#lib-dialog").hide();
                    $("#dialog-mask").hide();

                })


            })


        })
    }

    return libinit;

})

