/**
 * Created by 炎 on 2017/6/16 016.
 */
define(["EJS", "EJSObj","sys_config"], function (EJS, EJSObj,sys) {
    function userinit() {
        $(function () {
            //初始化user-list
            //var data = [];
            //var obj = {
            //    type: 0,
            //    CLSCODE: 2,
            //    CLSNAME: "dknv"
            //};
            //var obj1 = {
            //    type: 1,
            //    CLSCODE: 1,
            //    CLSNAME: "vds"
            //};
            //
            //data.push(obj, obj1);
            //var html = EJSObj.e_templateHtml("user-list.ejs",
            //    "chat/cof_template/user-list.ejs", {list: data});
            //$(".list-left").html(html);
            //
            ////初始化right-left
            //var data = [];
            //var obj = {
            //    nickname: "张三",
            //    username: "QY-cichaun",
            //    name: "李汉南",
            //    sex: "男",
            //    tel: "13525525525",
            //    rolename: "运维支持"
            //};
            //data.push(obj, obj, obj, obj, obj);
            var userdata = "";
            var userindex = "";
            $.post(sys.ApiBaseUrl + "getUsersList", function (result) {
                if(result.result!="true"){
                    errorDialog("获取用户列表失败");
                    return;
                }
                userdata = result.data;
                var html = EJSObj.e_templateHtml("user-list.ejs",
                    "chat/cof_template/user-list.ejs", {list: result.data});
                $(".content-inner-user .content-inner-list .table-head").after(html);
            });


            //点击事件  分配办事处
            $(".content-inner").on("click", ".assigning", function () {
                userindex = $(this).attr("userindex");
                userid = $(this).attr("userid");

                $.post(sys.ApiBaseUrl + "getOrgList", {userid: userid,rolecode:userdata[userindex].rolecode}, function (result) {
                    ////console.log(result);

                    var html = EJSObj.e_templateHtml("user-assigning.ejs",
                        "chat/cof_template/user-assigning.ejs", {list: result});
                    $("#dialog").html(html).show();
                    $("#dialog-mask").show();

                    //dialog dragable

                    $("#dialog").draggable({containment: "parent", handle: ".dialog-header", scrollSensitivity: 0});

                });
            })

            //关闭dialog
            $("#dialog").on("click", ".dialog-header img", function () {
                $("#dialog").hide();
                $("#dialog-mask").hide();
            })

            //dialog  取消
            $("#dialog").on("click", ".dialog-footer #dialog-cancel", function () {
                $("#dialog").hide();
                $("#dialog-mask").hide();
            })

            //dialog  确定
            $("#dialog").on("click", ".dialog-footer #dialog-ensure", function () {
                var otherdata = [];
                $("#dialog .office-list input.chk_1:checked").each(function () {
                    otherdata.push($(this).attr("code")) ;
                });
                //if(otherdata.length<1){
                //    errorDialog("请至少选择一个办事处");
                //    return;
                //}

                var data = userdata[userindex];
                ////console.log(data.keys());
                var obj = {};
                var val = "";
                for(var e in data){
                    val = data[e];
                    obj[e.toLowerCase()] = val;
                }
                obj.position="";

                $.post(sys.ApiBaseUrl+"setUserOrg",{
                    qydata:JSON.stringify(obj),
                    otherdata:otherdata.join()
                },function(result){
                    if(result.result!="true"){
                        errorDialog();
                        return;
                    }

                    $("#dialog").hide();
                    $("#dialog-mask").hide();
                });


            })


            //事件
            //删除当前组织
            //$(".content-inner").on("click", "#deleteorg", function () {
            //    var dom = $(".list-left input.chk_1:checked");
            //    if (dom.length < 1) {  //未选中任何组织
            //        errorDialog("未选中组织，不能删除")
            //    } else {
            //        var orgname = dom.parent().next().text();
            //        comfireDialog("你确定要删除组织\"" + orgname + "\"", function () {
            //            dom.parents(".sort-item").remove();
            //            errorDialog("操作成功，三秒后自动关闭");
            //            setTimeout(function () {
            //                $(".ui-dialog-titlebar-close").trigger("click");
            //            }, 3000);
            //        });
            //    }
            //})
            //
            ////删除当前用户
            //$(".content-inner").on("click", "#deleteuser", function () {
            //    var dom = $(".list-right input.chk_1:checked").not($("#selectall"));
            //    if (dom.length < 1) {  //未选中任何人员
            //        errorDialog("未选中人员，不能删除")
            //    } else {
            //        var usernnum = dom.length;
            //        comfireDialog("你确定要删除个" + usernnum + "用户", function () {
            //            dom.parents("tr").remove();
            //            $("#selectall").prop("checked", false);
            //            errorDialog("操作成功，三秒后自动关闭");
            //            setTimeout(function () {
            //                $(".ui-dialog-titlebar-close").trigger("click");
            //            }, 3000);
            //        });
            //    }
            //})
            //
            ////用户全选 || 取消全选
            //$(".content-inner").on("click", "#selectall", function () {
            //    if ($(this).is(":checked")) {
            //        $(".list-right table input.chk_1").not($("#selectall")).prop("checked", true);
            //    } else {
            //        $(".list-right table input.chk_1").not($("#selectall")).prop("checked", false);
            //    }
            //
            //
            //})
            //
            ////新增组织
            //$(".content-inner").on("click", "#addorg", function () {
            //    var dom = $(".list-left input.chk_1:checked");
            //    if (dom.length < 1) {  //未选中任何组织
            //        errorDialog("未选中组织，不能增加组织");
            //    } else {
            //        //渲染dialog-addorg
            //        var html = EJSObj.e_templateHtml("dialog-addorg.ejs",
            //            "chat/cof_template/dialog-addorg.ejs", {list: data});
            //        $("#dialog").html(html).show();
            //        $("#dialog-mask").show();
            //        //添加标志
            //        $("#dialog").attr("flag", "addorg")
            //        //dialog  dragable
            //        $("#dialog").draggable({containment: "parent", handle: ".dialog-header"});
            //
            //
            //        //初始化org list
            //        var data = [];
            //        var obj = {
            //            num: "skfndsvHH",
            //            name: "市场扩展"
            //        };
            //        data.push(obj, obj, obj, obj, obj);
            //        var html = EJSObj.e_templateHtml("org-list.ejs",
            //            "chat/cof_template/org-list.ejs", {list: data});
            //        $("#dialog .table-head").after(html);
            //
            //
            //    }
            //})
            //
            ////新增员工
            //$(".content-inner").on("click", "#adduser", function () {
            //    var dom = $(".list-left input.chk_1:checked");
            //    if (dom.length < 1) {  //未选中任何组织
            //        errorDialog("未选中组织，不能增加员工");
            //    } else {
            //        //渲染dialog-adduser
            //        var html = EJSObj.e_templateHtml("dialog-adduser.ejs",
            //            "chat/cof_template/dialog-adduser.ejs", {list: data});
            //        $("#dialog").html(html).show();
            //        $("#dialog-mask").show();
            //        //添加标志
            //        $("#dialog").attr("flag", "adduser")
            //
            //        //dialog  dragable
            //        $("#dialog").draggable({containment: "parent", handle: ".dialog-header"});
            //
            //        //初始化list 人员
            //        var data = [];
            //        var obj = {
            //            nickname: "张三",
            //            username: "QY-cichaun",
            //            name: "李汉南",
            //            sex: "男",
            //            tel: "13525525525",
            //            rolename: "运维支持"
            //        };
            //        data.push(obj, obj, obj, obj, obj);
            //        var html = EJSObj.e_templateHtml("user-list.ejs",
            //            "chat/cof_template/user-list.ejs", {list: data});
            //        $("#dialog .table-head").after(html);
            //    }
            //})
            //
            //
            ////点击left-list change事件   chk_2
            //
            //
            //$(".content-inner").on("change", ".list-left input.chk_2", function () {
            //    var dom = $(this).parents(".sort-item").find(".sort-item-list");
            //    if ($(this).is(":checked")) {
            //        if (dom.children().length > 0) {
            //
            //            dom.show();
            //        } else {
            //
            //            //find 所有下级
            //            //findNextLevel();
            //            var data = [];
            //            var obj = {
            //                type: 1,
            //                CLSCODE: 54,
            //                CLSNAME: "开发还是"
            //            };
            //            var obj1 = {
            //                type: 1,
            //                CLSCODE: 56,
            //                CLSNAME: "冯驩弹铗"
            //            };
            //
            //            data.push(obj, obj1);
            //            var html = EJSObj.e_templateHtml("user-list.ejs",
            //                "chat/cof_template/user-list.ejs", {list: data});
            //            dom.html(html);
            //            dom.show();
            //        }
            //    } else {
            //        dom.hide();
            //    }
            //});
            //
            //
            ////dialog
            ////dialog  全选 || 取消全选
            //$("#dialog").on("click", "#dialog-selectall", function () {
            //    if ($(this).is(":checked")) {
            //        $("#dialog  table input.chk_1").not($("#dialog-selectall")).prop("checked", true);
            //    } else {
            //        $("#dialog table input.chk_1").not($("#dialog-selectall")).prop("checked", false);
            //    }
            //})
            //
            ////关闭dialog
            //$("#dialog").on("click", ".dialog-header img", function () {
            //    $("#dialog").hide();
            //    $("#dialog-mask").hide();
            //})
            //
            ////dialog  取消
            //$("#dialog").on("click", ".dialog-footer #dialog-cancel", function () {
            //    $("#dialog").hide();
            //    $("#dialog-mask").hide();
            //})
            //
            ////dialog  确定
            //$("#dialog").on("click", ".dialog-footer #dialog-ensure", function () {
            //    $("#dialog").hide();
            //    $("#dialog-mask").hide();
            //})


        })
    }

    return userinit;

})