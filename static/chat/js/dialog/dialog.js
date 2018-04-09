/**
 * Created by 炎 on 2017/5/19 019.
 */
define(["EJS", "EJSObj", "sys_config", "login"], function (EJS, EJSObj, sys_config, login) {
        function init() {

            $(function () {

                    //设置拖动 各个窗口
                    $(".common-dialog").draggable({containment: "parent", handle: ".dialog-header"});
                    $(".center-dialog").draggable({containment: "parent", handle: ".dialog-header"});
                    $(".centertop-dialog").draggable({containment: "parent", handle: ".dialog-header"});
                    $(".top-dialog").draggable({containment: "parent", handle: ".dialog-header"});

                    //各个列表滚动回调
                    function myScroll_register_list(dom) {
                        //列表滚动加载  register 列表
                        dom.scroll(function () {
                            if (finish_scroll)
                                return;
                            var htmlHeight = $(this)[0].scrollHeight;
                            var pannelHeight = $(this).height();
                            var scrollTop = $(this)[0].scrollTop;
                            //  //console.log(htmlHeight + "-" + pannelHeight + "-" + scrollTop)
                            if (scrollTop + pannelHeight == htmlHeight - 30) {
                                page++;
                                searchParam.page = page;
                                //加载下一页
                                $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                                    //console.log(result);
                                    if (result.result != "true") {
                                        errorAlert();
                                        return;
                                    }
                                    if (result.data.length < rows) {
                                        finish_scroll = true;
                                    }

                                    result.data.forEach(function (obj, index) {
                                        var dom = $(".card[flagid='" + obj.REGID + "']");
                                        if (dom.length > 0) {
                                            delete  result.data[index];
                                        }
                                    })

                                    var html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: result.data,
                                            flag_user: account.userName
                                        });
                                    $(".register-list").append(html);
                                    $("[data-toggle='tooltip']").tooltip();
                                })
                            }
                        })

                    }

                    function myScroll_match_list(dom) {
                        //列表滚动加载  register 列表
                        dom.scroll(function () {
                            if (finish_scroll)
                                return;
                            var htmlHeight = $(this)[0].scrollHeight;
                            var pannelHeight = $(this).height();
                            var scrollTop = $(this)[0].scrollTop;
                            //  //console.log(htmlHeight + "-" + pannelHeight + "-" + scrollTop);
                            if (scrollTop + pannelHeight == htmlHeight - 30) {  //到达页面底部
                                page++;
                                searchParam.page = page;
                                //加载下一页
                                $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                                    //console.log(result);
                                    if (result.result != "true") {
                                        errorAlert();
                                        return;
                                    }
                                    if (result.data.length < rows) {
                                        finish_scroll = true;
                                    }
                                    var html = EJSObj.e_templateHtml("match_list.ejs",
                                        "/ism/chat/ism_template/match_list.ejs", {list: result.data});
                                    $(".match-list").append(html);
                                    $("[data-toggle='tooltip']").tooltip();
                                })
                            }
                        })

                    }

                    function myScroll_apply_list(dom) {
                        //列表滚动加载  apply 列表
                        dom.scroll(function () {
                            if (finish_scroll)
                                return;
                            var htmlHeight = $(this)[0].scrollHeight;
                            var pannelHeight = $(this).height();
                            var scrollTop = $(this)[0].scrollTop;
                            //
                            if (scrollTop + pannelHeight == htmlHeight - 30) {
                                page++;
                                searchParam.page = page;
                                //加载下一页
                                $.post(sys_config.ApiBaseUrl + "selectbydispatchdata", searchParam, function (result) {
                                    //console.log(result);
                                    if (result.result != "true") {
                                        errorAlert();
                                        return;
                                    }
                                    if (result.data.length < rows) {
                                        finish_scroll = true;
                                    }

                                    result.data.forEach(function (obj, index) {
                                        var dom = $(".card[flagid='" + obj.REGID + "']");
                                        if (dom.length > 0) {
                                            delete  result.data[index];
                                        }
                                    })

                                    var html = EJSObj.e_templateHtml("apply_list.ejs",
                                        "/ism/chat/ism_template/apply_list.ejs", {
                                            list: result,
                                            flag_user: account.userName
                                        });
                                    $(".apply-list").append(html);
                                    $("[data-toggle='tooltip']").tooltip();
                                })
                            }
                        })

                    }

                    function myScroll_lib_list(dom) {
                        //列表滚动加载  apply 列表
                        dom.scroll(function () {
                            if (finish_scroll)
                                return;
                            var htmlHeight = $(this)[0].scrollHeight;
                            var pannelHeight = $(this).height();
                            var scrollTop = $(this)[0].scrollTop;
                            //
                            if (scrollTop + pannelHeight == htmlHeight - 30) {
                                page++;

                                //加载下一页
                                var clsname = [];
                                var dom = $(".common-dialog input.chk_1:checked");

                                if (dom.length > 0) {
                                    dom.each(function (index, ele) {
                                        clsname.push($(this).attr("id"));
                                    })
                                    clsname = clsname.join(",");

                                }
                                searchParam.page = page;
                                searchParam.clsname = clsname;
                                //console.log(clsname);

                                $.post(sys_config.ApiBaseUrl + "selectbyclsmatchdata", searchParam, function (result) {
                                    //console.log(result);
                                    if (result.result != "true") {
                                        errorAlert();
                                        return;
                                    }
                                    if (result.data.length < rows) {
                                        finish_scroll = true;
                                    }
                                    var html = EJSObj.e_templateHtml("sort_list.ejs",
                                        "/ism/chat/ism_template/sort_list.ejs", {
                                            list: result.data
                                        });
                                    $(".lib-list").append(html);
                                    $("[data-toggle='tooltip']").tooltip();
                                })
                            }
                        })

                    }

                    //找到所有子节点
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

                    //展开所有节点
                    function openAllNode() {
                        flag_openallnode = true;
                        $(".sort-item .trangle").not(".trangle-active,.trangle-hidden").trigger("click");
                    }


                    var treedata = "";   //全局的树节点数据;
                    var lastchecked_id = ""; //分类模块 选中的节点
                    var flag_openallnode = false;
                    var page = 1;           //分页参数  第X页
                    var rows = 6;           //分页参数  条数
                    var finish_scroll = false;  //滚动加载，加载完所有数据后禁用滚动加载
                    var searchParam = {};

                    //////////////////////////////////////////////////////
                    /*               register                           */
                    /////////////////////////////////////////////////////

                    //打开dialog     register
                    $("#register").click(function () {
                        flag_openallnode = false;
                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        searchParam.page = page;
                        searchParam.rows = rows;

                        //获取问题列表
                        $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            if (result.data.length < rows) {
                                finish_scroll = true;
                            }
                            var html = EJSObj.e_templateHtml("register.ejs",
                                "/ism/chat/ism_template/register.ejs", {
                                    list: result.data,
                                    flag_user: account.userName
                                });
                            $(".common-dialog-inner").html(html);
                            $(".common-dialog .dialog-header> span").text("问题列表");
                            $(".common-dialog .search_input").show();
                            $(".common-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "1").show();
                            //时间
                            $("#search_register_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_register_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");

                            $("[data-toggle='tooltip']").tooltip();
                            //滚动加载
                            myScroll_register_list($(".register-list"));
                        })

                    })


                    //关闭dialog
                    $(".common-dialog").on("click", ".dialog-header>img", function () {
                        $(".common-dialog").hide();
                        //关闭mask
                        $(".dialog-mask").hide();
                        temp_message = "";
                        page = 1;
                        rows = 6;
                        finish_scroll = false;
                        temp_message = "";

                        $(".common-dialog .search_input input").val("");
                        $(".search_input").hide();
                        //清除缓存
                        searchParam = {};
                    });


                    //关闭
                    $(".center-dialog").on("click", ".dialog-header>img", function () {
                        $(".center-dialog").hide();

                        //mask
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;

                        $(".dialog-mask").css("z-index", zindex);
                        if (zindex <= 0) {
                            $(".dialog-mask").hide();
                        }

                        //隐藏搜索框
                        $(".center-dialog .search_input input").val("");
                        $(".center-dialog .search_input").hide();
                        //清除缓存
                        searchParam = {};
                    })

                    //登记详情  取消||确认按钮
                    $(".center-dialog").on("click", ".dialog-footer #register_add_ensure", function () {
                        var request = $("#input_questionsummary").html().trim();
                        if (!request) {
                            errorAlert("问题描述不能为空");
                            return;
                        }

                        $.post(sys_config.ApiBaseUrl + "updateRegister", {
                            regid: $("#input_questionsummary").attr("serialnum"),
                            request: $("#input_questionsummary").html(),
                            usernmae: account.userName
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            //更新成功后更新列表
                            //更新修改的内容
                            var regid = $("#input_questionsummary").attr("serialnum");
                            var data = [];
                            $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                regid: regid
                            }, function (result) {
                                data.push(result.data);
                                var html = EJSObj.e_templateHtml("register_list.ejs",
                                    "/ism/chat/ism_template/register_list.ejs", {
                                        list: data,
                                        flag_user: account.userName
                                    });
                                $(".card[flagid='" + regid + "']").replaceWith(html);
                                data = null;
                                $(".center-dialog").hide();
                                //mask
                                $(".dialog-mask").css("z-index", "1");
                            })

                        })


                    })

                    $(".center-dialog").on("click", ".dialog-footer #register_add_cancel", function () {
                        $(".center-dialog").hide();
                        //mask
                        $(".dialog-mask").css("z-index", "1");


                    })


                    //搜索框提示文字
                    $(".common-dialog").on("focus", ".search_input input", function () {
                        $(this).parent().find("span").hide();
                        $(this).parent().find("small").show();

                    })
                    $(".common-dialog").on("blur", ".search_input input", function () {

                        if ($(this).val().trim()) {

                        } else {
                            $(this).parent().find("span").show();
                            $(this).parent().find("small").hide();

                        }

                    })

                    $(".common-dialog").on("click", ".search_input", function () {

                        $(this).find("input").focus();
                    })

                    // 搜索框enter事件
                    $(".common-dialog,.center-dialog").on("keydown", ".search_input>input", function (e) {
                        if (event.which == 13 || event.keyCode == 13) {

                            $(this).parent().parent().find(".button-searh").trigger("click");
                        }
                    })

                    //清除搜索框文字
                    $(".common-dialog,.center-dialog").on("click", ".search_input small", function () {

                        $(this).prev().prev().val("");
                        $(".search_input>input").focus();
                        return false;
                    })


                    //                  //
                    $(".center-dialog").on("focus", ".search_input input", function () {
                        $(this).parent().find("span").hide();
                        $(this).parent().find("small").show();

                    })
                    $(".center-dialog").on("blur", ".search_input input", function () {

                        if ($(this).val()) {

                        } else {
                            $(this).parent().find("span").show();
                            $(this).parent().find("small").hide();

                        }

                    })

                    $(".center-dialog").on("click", ".search_input", function () {

                        $(this).find("input").focus();
                    })


                    //搜索按钮
                    $(".common-dialog").on("click", ".button-searh-register", function () {
                        //console.log("搜索开始");
                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        //缓存搜索条件
                        searchParam.page = 1;
                        searchParam.rows = 6;
                        searchParam.registerstardate = $("#search_register_timestart").val();
                        searchParam.registerstopdate = $("#search_register_timeend").val();
                        searchParam.handlestardate = $("#search_deal_timestart").val();
                        searchParam.handlestopdate = $("#search_deal_timeend").val();
                        searchParam.registerusername = $("#search_register_person").val();
                        searchParam.handleusername = $("#search_deal_person").val();
                        searchParam.dispatchstatus = $("#search_register_applystatus").val();
                        searchParam.handlestatus = $("#search_register_dealstatus").val();
                        searchParam.quickkeyword = $("#common-search_keywords").val();

                        $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();

                                return;
                            }
                            if (result.data.length < rows) {
                                finish_scroll = true;
                            }
                            var html = EJSObj.e_templateHtml("register_list.ejs",
                                "/ism/chat/ism_template/register_list.ejs", {
                                    list: result.data,
                                    flag_user: account.userName
                                });
                            $(".register-list").html(html);
                            $("[data-toggle='tooltip']").tooltip();
                        })

                        return false;
                    })

                    $(".common-dialog").on("click", ".button-searh-apply", function () {

                        //console.log("搜索开始");
                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        searchParam.page = 1;
                        searchParam.rows = 6;
                        searchParam.dispatchdate_star = $("#search_apply_timestart").val();
                        searchParam.dispatchdate_stop = $("#search_apply_timeend").val();
                        searchParam.handledate_star = $("#search_deal_timestart").val();
                        searchParam.handledate_stop = $("#search_deal_timeend").val();
                        searchParam.dispatchusername = $("#search_apply_person").val();
                        searchParam.handleusername = $("#search_deal_person").val();
                        searchParam.isurgent = $("#search_apply_applystatus").val();
                        searchParam.handlestatus = $("#search_apply_dealstatus").val();
                        searchParam.quickkeyword = $("#common-search_keywords").val();

                        $.post(sys_config.ApiBaseUrl + "selectbydispatchdata", searchParam, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            if (result.data.length < rows) {
                                finish_scroll = true;
                            }
                            var html = EJSObj.e_templateHtml("apply_list.ejs",
                                "/ism/chat/ism_template/apply_list.ejs", {
                                    list: result,
                                    flag_user: account.userName
                                });
                            $(".apply-list").html(html);
                            $("[data-toggle='tooltip']").tooltip();
                        })

                        return false;
                    })

                    //搜索重置
                    $(".common-dialog,.center-dialog").on("click", ".button-reset", function () {
                        $(this).parents(".center-dialog-inner").find("input,select").val("");
                        $(this).parents(".common-dialog-inner").find("input,select").val("");
                        $("#common-search_keywords").val("").blur();
                        $("#center-search_keywords").val("").blur();


                    })
                    //match  搜索
                    $(".center-dialog").on("click", ".button-searh-match", function () {

                        //console.log("搜索开始");
                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        searchParam.page = page;
                        searchParam.rows = rows;
                        searchParam.registerstardate = $("#search_register_timestart").val();
                        searchParam.registerstopdate = $("#search_register_timeend").val();
                        searchParam.handlestardate = $("#search_deal_timestart").val();
                        searchParam.handlestopdate = $("#search_deal_timeend").val();
                        searchParam.registerusername = $("#search_register_person").val();
                        searchParam.handleusername = $("#search_deal_person").val();
                        searchParam.dispatchstatus = $("#search_register_applystatus").val();
                        searchParam.handlestatus = $("#search_register_dealstatus").val();
                        searchParam.quickkeyword = $("#center-search_keywords").val();


                        $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            if (result.data.length < rows) {
                                finish_scroll = true;
                            }
                            var html = EJSObj.e_templateHtml("match_list.ejs",
                                "/ism/chat/ism_template/match_list.ejs", {
                                    list: result.data,

                                });
                            $(".match-list").html(html);
                            $("[data-toggle='tooltip']").tooltip();
                        })
                        return false;
                    })


                    //日期点击图标
                    $(".common-dialog,.center-dialog").on("click", ".date-containner img", function () {
                        $(this).prev().trigger("click");
                    })

                    //删除选中文件
                    $(".center-dialog").on("click", "#deletefile", function () {

                        var doms = $(".register-detail-filelist input:checked");
                        var ids = [];
                        doms.each(function (index, ele) {
                            ids.push($(this).attr("id"));
                        })

                        $.post(sys_config.ApiBaseUrl + "deleteAttachments", {
                            attachmentid: ids.join(",")
                        }, function (result) {
                            //console.log(result)
                        })
                        $(".register-detail-filelist input:checked").parent().parent().remove();

                    })

                    //添加文件
                    $(".center-dialog").on("click", "#addfile", function () {

                        $.post(sys_config.ApiBaseUrl + "getattachmentid", function (result) {
                            //console.log(result);
                            //弹出上传文件对话框
                            var html = EJSObj.e_templateHtml("addfile.ejs",
                                "/ism/chat/ism_template/addfile.ejs", {});
                            $(".top-dialog-inner").html(html);
                            $(".top-dialog .dialog-header>span").text("新增附件");
                            $(".top-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "3");

                            $("#add_filename").attr("attachmentid", result);

                        })


                    })


                    //topdialog 确认       上传文件后确认文件信息
                    $(".top-dialog").on("click", ".dialog-footer #inner_dialog_ensure", function () {
                        var type = $("#add_filetype").text();
                        var httpurl = $("#add_fileurl").val()
                        var attachmentremark = $("#add_fileurldescription").val();
                        if (!type) {
                            errorAlert("请选择文件");
                            return;
                        } else if (!httpurl) {
                            errorAlert("请输入url");
                            $("#add_fileurl").focus();
                            return;
                        }

                        //文件信息保存
                        $.ajax({
                            type: 'post',
                            url: sys_config.ApiBaseUrl + "InsertAttachment",
                            timeout: 10000,
                            data: {
                                foreignkeyid: $("#input_questionsummary").attr("serialnum"),
                                attachmentid: $("#add_filename").attr("attachmentid"),
                                attachmentname: $("#add_filename").val(),
                                attachmenttype: $("#add_filetype").text() == "图片" ? 1 : 2,
                                attachmentsize: $("#add_filesize").text().substring(0, $("#add_filesize").text().length - 1),
                                httpurl: $("#add_fileurl").val(),
                                attachmentremark: $("#add_fileurldescription").val()
                            },
                            success: function (result) {
                                //console.log("InsertAttachment成功");
                                //console.log(result)
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }
                                //更新列表
                                var obj = {};
                                obj.ATTACHMENTID = $("#add_filename").attr("attachmentid");
                                obj.ATTACHMENTNAME = $("#add_filename").val();
                                obj.HTTPURL = $("#add_fileurl").val();
                                //if (!$("#add_filesize").text()) {
                                //    obj.ATTACHMENTNAME = obj.HTTPURL;
                                //}
                                var html = EJSObj.e_templateHtml("attachmentfile.ejs",
                                    "/ism/chat/ism_template/attachmentfile.ejs", {data: obj});
                                $(".register-detail-filelist").append(html);
                                //关闭当前窗口
                                $(".top-dialog").hide();
                                //mask
                                var zindex = $(".dialog-mask").css("z-index");
                                zindex = Number(zindex) - 1;
                                $(".dialog-mask").css("z-index", zindex);

                            },
                            error: function (xhr, status) {
                                if (status == 'timeout') {
                                    errorAlert("请求超时");
                                }
                                //console.log(status);
                            }

                        })

                    })


                    $(".top-dialog").on("click", ".dialog-footer #inner_dialog_cancel", function () {
                        $(".top-dialog").hide();
                        //mask
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;
                        $(".dialog-mask").css("z-index", zindex);
                    })

                    //选择文件上传
                    $(".top-dialog").on("click", ".dialog-content > div >button", function () {

                        $("#uploadfile").trigger("click");

                    })

                    //文件input  onchange事件
                    $(".top-dialog").on("change", " #uploadfile", function () {
                        var file = this.files[0];
                        //console.log(file);
                        if (file.size > 30 * 1024 * 1024) {
                            errorAlert("文件大小不能超过30M");
                            return;
                        }
                        $("#add_fileselect").attr("disabled", "disabled");
                        //显示文件信息

                        if (file.type.indexOf("image") != -1)
                            $("#add_filetype").text("图片")
                        else
                            $("#add_filetype").text("文件")
                        $("#add_filesize").text((file.size / 1024 / 1024).toFixed(3) + "M")
                        //上传文件 ...
                        var filedata = new FormData();
                        filedata.append("file", file);
                        YYIMChat.sendFormMessage({
                            to: login.IsLogin.attachmentfileId,
                            file: {
                                name: file.name,
                                size: file.size
                            },
                            type: "groupchat",
                            data: filedata,
                            mediaType: "2",
                            success: function (data) {
                                //console.log(data);
                                $("#add_filename").val(file.name);
                                $("#add_fileurl").val(data.data.content.path);
                                $("#add_fileselect").removeAttr("disabled");
                            },
                            error: function (e) {
                                //console.log("上传文件失败");
                                //console.log(e);
                                $("#add_fileselect").removeAttr("disabled");
                            },
                            progress: function (data) {
                                //进度
                                //console.log(data);
                                $("#add_filename").val("已发送" + (Math.round(data.percent * 100) + "%"));
                            }
                        })

                        //更新dom input元素   清空
                        var input = $("#uploadfile").clone(true);
                        $("#uploadfile").remove();
                        $(".top-dialog-inner").append(input);

                    })

                    $(".top-dialog").on("click", ".dialog-header>img", function () {
                        $(".top-dialog").hide();
                        //mask
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;
                        $(".dialog-mask").css("z-index", zindex);
                    })


                    //点击编辑
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_edit']", function () {

                        //if ($(this).hasClass("mc-disable"))
                        //    return;

                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(this).parents(".card").attr("flagid"),
                            usernmae: account.userName
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            result.data.show_ect = true;
                            var html = EJSObj.e_templateHtml("register_detail_edit.ejs",
                                "/ism/chat/ism_template/register_detail_edit.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("问题编辑");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");

                            //问题描述加入foriginkey
                            $("#input_questionsummary").attr("serialnum", result.data.REGID);
                        })

                        return false;
                    })


                    //点击派工
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_apply']", function () {
                        //if ($(this).hasClass("mc-disable"))
                        //    return;
                        //var obj = {};
                        //obj.disable = false;
                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(this).parents(".card").attr("flagid"),
                            usernmae: account.userName
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();

                                return;
                            }
                            result.data.disable = false;
                            result.data.applytime = new Date().format("yyyy-MM-dd");
                            result.data.dispatchusername = login.IsLogin.realName;
                            result.data.handleusername = login.IsLogin.realName;
                            var html = EJSObj.e_templateHtml("apply_detail_add.ejs",
                                "/ism/chat/ism_template/apply_detail_add.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("问题派工");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            $("#dispatchdate").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });
                            $("#handlestopdate").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });

                        })


                        return false;
                    })

                    //点击完工
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_finish']", function () {

                        var that = this;

                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(that).parents(".card").attr("flagid"),
                            usernmae: account.userName
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();

                                return;
                            }
                            if (!result.data.PROJECTID) {
                                result.data.flag = "add";

                                $.ajax({
                                    async: false,
                                    type: "POST",
                                    url: sys_config.ApiBaseUrl + "getprojectid",
                                    success: function (da) {
                                        //console.log(da)
                                        result.data.PROJECTID = da;
                                    }
                                })
                            }
                            if (!result.data.HANDLEUSERNAME) {
                                result.data.HANDLEUSERID = account.userName;
                                result.data.HANDLEUSERNAME = login.IsLogin.realName;
                            }

                            var html = EJSObj.e_templateHtml("resolve_edit.ejs",
                                "/ism/chat/ism_template/resolve_edit.ejs", {
                                    data: result,
                                    flag_user: account.userName
                                });
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("处理方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");

                            $("#resolve_starttime").jcDate({
                                Default: result.data.HANDLEDATE ? result.data.HANDLEDATE.substr(0, 10) : "today",
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });
                            // resolve_endtime
                            //$("#resolve_endtime").jcDate({
                            //    Default:result.data.HANDLESTOPDATE?result.data.HANDLESTOPDATE.substr(0,10):"",
                            //    IcoClass: "jcDateIco",
                            //    Event: "click",
                            //    Speed: 100,
                            //    Left: 0,
                            //    Top: 28,
                            //    format: "-",
                            //    DoubleNum: true,
                            //    Timeout: 100
                            //});
                        })


                        return false;
                    })

                    //查看方案
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_checkplan']", function () {

                        var that = this;


                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(that).parents(".card").find(".card-head-left>span").eq(1).text(),
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();

                                return;
                            }


                            var html = EJSObj.e_templateHtml("resovle.ejs",
                                "/ism/chat/ism_template/resovle.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("解决方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                        })


                    })

                    //删除
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_delete']", function () {
                        //删除
                        var that = this;
                        $("#dialog-confirm").dialog({
                            resizable: false,
                            height: 160,
                            modal: true,
                            buttons: {
                                "取消": function () {
                                    $(this).dialog("close");
                                },
                                "确定": function () {
                                    $(this).dialog("close");

                                    $.post(sys_config.ApiBaseUrl + "deleteRegister", {
                                        regid: $(that).parents(".card").attr("flagid"),
                                        username: account.userName
                                    }, function (result) {
                                        if (result.result != "true") {
                                            errorAlert();

                                            return;
                                        }
                                        $(that).parents(".card").remove();

                                    })
                                }

                            }
                        });
                        var html = "<img src='/ism/chat/img/close.png' width='12'>"
                        $(".ui-dialog-titlebar-close").html(html);


                    })

                    //  归档   register_sort
                    $(".common-dialog").on("click", ".apply-status.button[flag='register_sort']", function () {


                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbyclsdata", {
                            username: account.userName
                        }, function (result) {
                            if (result.result != "true") {
                                errorAlert();

                                return;
                            }
                            treedata = result.data;

                            //构造根节点直接子节点   1级节点
                            var parent = result.data[0].CLSCODE;
                            var data = findChildNode(parent);
                            //console.log(data);
                            var regid = $(that).parents(".card").attr("flagid");

                            var html = EJSObj.e_templateHtml("register_sort_container.ejs",
                                "/ism/chat/ism_template/register_sort_container.ejs", {regid: regid});
                            $(".top-dialog-inner").html(html);
                            $(".top-dialog .dialog-header>span").text("归档");
                            //内容
                            var html = EJSObj.e_templateHtml("register_sort.ejs",
                                "/ism/chat/ism_template/register_sort.ejs", {list: data});
                            $(".sort-tree").html(html);
                            $(".top-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            openAllNode();

                            //显示上次归档结果
                            $.post(sys_config.ApiBaseUrl + "selectclsbyregid", {
                                regid: $("#register_sort_input").attr("regid")
                            }, function (result) {
                                if (result.result != "true") {
                                    errorAlert();

                                    return;
                                }
                                $("#register_sort_input").val(result.data.KEYWORD);
                                $("input.chk_1#" + result.data.CLSID).prop("checked", true);

                            })

                        })


                        return false;

                    })

                    //分类item点击   sort-item
                    $(".top-dialog").on("click", ".sort-content .trangle", function () {
                        var input = $(this).next().children("input");
                        var flag = $(this).hasClass("trangle-active");
                        var dom = $(this).parent().next(".sort-item-list");
                        if (!flag) {
                            $(this).addClass("trangle-active");

                            if (dom.children().length < 1) {
                                //构造子节点
                                var parent = input.attr("id");
                                var data = findChildNode(parent);
                                //console.log(data)

                                var html = EJSObj.e_templateHtml("register_sort.ejs",
                                    "/ism/chat/ism_template/register_sort.ejs", {list: data});
                                dom.html(html);
                                if (dom.children().length < 1) {
                                    dom.hide();
                                } else {
                                    dom.show();
                                }
                            } else {
                                dom.show();
                            }


                        } else {
                            $(this).removeClass("trangle-active");
                            dom.hide();

                            flag_openallnode = false;

                        }
                        if (flag_openallnode)
                            openAllNode();

                    })
                    // trangle
                    //$(".top-dialog").on("click", ".sort-content .trangle", function () {
                    //
                    //    $(this).parent().children("label").trigger("click");
                    //})
                    // .sort-left .trangle
                    $(".common-dialog").on("click", ".sort-left .trangle", function () {

                        //$(this).parent().children("label").trigger("click")
                    })

                    //确认||取消
                    $(".top-dialog").on("click", "#register_sort_ensure", function () {
                        var dom = $(".sort-tree input.chk_1:checked");
                        var keyword = $("#register_sort_input").val();
                        if (dom.length < 1) {
                            errorAlert("请选择分类");
                            return;
                        }
                        if (!(keyword && keyword.trim())) {
                            errorAlert("请输入检索关键字");
                            return;
                        }

                        $.post(sys_config.ApiBaseUrl + "updateRegisterCls", {
                            regid: $("#register_sort_input").attr("regid"),
                            clsid: dom.attr("id"),
                            keyword: $("#register_sort_input").val()
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            //更新修改的内容
                            var regid = $("#register_sort_input").attr("regid");

                            var data = [];
                            $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                regid: regid
                            }, function (result) {
                                data.push(result.data);
                                //判断是 register  还是 apply
                                var html = "";
                                if ($(".card[flagid='" + regid + "']").length > 0) {  //register
                                    html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: data,
                                            flag_user: account.userName
                                        });
                                    $(".card[flagid='" + regid + "']").replaceWith(html);
                                } else {                                            //apply
                                    html = EJSObj.e_templateHtml("apply_list.ejs",
                                        "/ism/chat/ism_template/apply_list.ejs", {
                                            list: {data: data},
                                            flag_user: account.userName
                                        });
                                    $(".card[regid='" + regid + "']").replaceWith(html);
                                }


                                data = null;
                                $(".top-dialog").hide();
                                $(".center-dialog").hide();
                                //mask
                                //var zindex = $(".dialog-mask").css("z-index");
                                //zindex = Number(zindex) - 1;
                                $(".dialog-mask").css("z-index", 1);

                            })


                        })

                        dom = null;
                    })

                    $(".top-dialog").on("click", "#register_sort_cancel", function () {
                        $(".top-dialog").hide();
                        //mask
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;
                        $(".dialog-mask").css("z-index", zindex);
                    })

                    //apply 分类
                    //$(".top-dialog").on("click", "#apply_sort_ensure", function () {
                    //    var dom = $(".sort-tree input.chk_1:checked");
                    //    var keyword = $("#register_sort_input").val();
                    //    if (dom.length < 1) {
                    //        errorAlert("请选择分类");
                    //        return;
                    //    }
                    //    if (!(keyword && keyword.trim())) {
                    //        errorAlert("请输入检索关键字");
                    //        return;
                    //    }
                    //
                    //    $.post(sys_config.ApiBaseUrl + "updateRegisterCls", {
                    //        regid: $("#register_sort_input").attr("regid"),
                    //        clsid: dom.attr("id"),
                    //        keyword: $("#register_sort_input").val()
                    //    }, function (result) {
                    //        //console.log(result)
                    //        if (result.result != "true") {
                    //            errorAlert();
                    //            return;
                    //        }
                    //
                    //        //更新修改的内容
                    //        var regid = $("#register_sort_input").attr("regid");
                    //        var data = [];
                    //        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                    //            regid: regid
                    //        }, function (result) {
                    //            data.push(result.data);
                    //            var html = EJSObj.e_templateHtml("register_list.ejs",
                    //                "/ism/chat/ism_template/register_list.ejs", {
                    //                    list: data,
                    //                    flag_user: account.userName
                    //                });
                    //            $(".card[flagid='" + regid + "']").replaceWith(html);
                    //            data = null;
                    //            $(".top-dialog").hide();
                    //            $(".center-dialog").hide();
                    //            //mask
                    //            //var zindex = $(".dialog-mask").css("z-index");
                    //            //zindex = Number(zindex) - 1;
                    //            $(".dialog-mask").css("z-index", 1);
                    //
                    //        })
                    //
                    //
                    //    })
                    //
                    //    dom = null;
                    //})
                    //
                    //$(".top-dialog").on("click", "#apply_sort_cancel", function () {
                    //    $(".top-dialog").hide();
                    //    //mask
                    //    var zindex = $(".dialog-mask").css("z-index");
                    //    zindex = Number(zindex) - 1;
                    //    $(".dialog-mask").css("z-index", zindex);
                    //})


                    //二级页面归档   register 完工->归档  底部按钮
                    $(".center-dialog").on("click", "#resolve_edit_sort", function () {

                        var name = $("#resolve_person").val();
                        var content = $("#input_dealsummary").html();
                        if (!name.trim()) {
                            errorAlert("处理人员不能为空");
                            return;
                        }
                        if (!content.trim()) {
                            errorAlert("处理方案不能为空");
                            return;
                        }


                        if (name != login.IsLogin.realName) {
                            $("#resolve_person").attr("HANDLEUSERID", "");
                        }
                        var api = "updateProject";
                        if ($("#input_questionsummary").attr("flag") == "add") {
                            api = "InsertProject";
                        }
                        $.post(sys_config.ApiBaseUrl + api, {
                            projectid: $("#input_questionsummary").attr("serialnum"),
                            regid: $("#input_questionsummary").attr("regid"),
                            handleuserid: $("#resolve_person").attr("HANDLEUSERID"),
                            handleusername: name,
                            handledate: $("#resolve_starttime").val(),
                            handlestopdate: $("#resolve_endtime").val(),
                            projectcontent: $("#input_dealsummary").html(),
                            dispatchid: $("#input_questionsummary").attr("dispatchid"),
                            username: account.userName
                        }, function (result) {

                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            //$(".center-dialog").hide();
                            //$(".dialog-mask").css("z-index", "1");
                            //更新修改的内容
                            var regid = $("#input_questionsummary").attr("regid");
                            var data = [];
                            $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                regid: regid
                            }, function (result) {
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }
                                data.push(result.data);

                                //var regid = $("#input_questionsummary").attr("regid");

                                //判断是 register  还是 apply
                                var html = "";
                                if ($(".card[flagid='" + regid + "']").length > 0) {  //register
                                    html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: data,
                                            flag_user: account.userName
                                        });
                                    $(".card[flagid='" + regid + "']").replaceWith(html);
                                } else {                                            //apply
                                    html = EJSObj.e_templateHtml("apply_list.ejs",
                                        "/ism/chat/ism_template/apply_list.ejs", {
                                            list: {data: data},
                                            flag_user: account.userName
                                        });
                                    $(".card[regid='" + regid + "']").replaceWith(html);
                                }

                                data = null;

                                $("#input_questionsummary").attr("flag", "edit");

                                //成功后归档

                                ///////////////////////////////////////////////////////


                                $.post(sys_config.ApiBaseUrl + "selectbyclsdata", {
                                    username: account.userName
                                }, function (result) {
                                    if (result.result != "true") {
                                        errorAlert();

                                        return;
                                    }
                                    treedata = result.data;
                                    //构造根节点直接子节点   1级节点
                                    var parent = result.data[0].CLSCODE;
                                    var data = findChildNode(parent);

                                    var html = EJSObj.e_templateHtml("register_sort_container.ejs",
                                        "/ism/chat/ism_template/register_sort_container.ejs", {regid: regid});
                                    $(".top-dialog-inner").html(html);
                                    $(".top-dialog .dialog-header>span").text("归档");
                                    //内容
                                    var html = EJSObj.e_templateHtml("register_sort.ejs",
                                        "/ism/chat/ism_template/register_sort.ejs", {list: data});
                                    $(".sort-tree").html(html);
                                    $(".top-dialog").show();
                                    //mask
                                    $(".dialog-mask").css("z-index", "3")
                                    openAllNode();

                                    //显示上次归档结果
                                    $.post(sys_config.ApiBaseUrl + "selectclsbyregid", {
                                        regid: $("#register_sort_input").attr("regid")
                                    }, function (result) {
                                        if (result.result != "true") {
                                            errorAlert();
                                            return;
                                        }
                                        $("#register_sort_input").val(result.data.KEYWORD);
                                        $("input.chk_1#" + result.data.CLSID).prop("checked", true);

                                    })
                                })


                            })


                        });


                        return false;
                    })


                    //////////////////////////////////////////////////////
                    /*               register                end        */
                    /////////////////////////////////////////////////////


                    //////////////////////////////////////////////////////
                    /*               apply                            */
                    /////////////////////////////////////////////////////

                    $("#apply").click(function () {
                        flag_openallnode = false;

                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        searchParam.page = page;
                        searchParam.rows = rows;

                        $.post(sys_config.ApiBaseUrl + "selectbydispatchdata", searchParam, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }


                            var html = EJSObj.e_templateHtml("apply.ejs",
                                "/ism/chat/ism_template/apply.ejs", {list: result, flag_user: account.userName});
                            $(".common-dialog-inner").html(html);
                            $(".common-dialog .dialog-header>span").text("派工列表");
                            $(".common-dialog .search_input").show();
                            $(".common-dialog").show();
                            $("[data-toggle='tooltip']").tooltip();
                            //mask
                            $(".dialog-mask").css("z-index", "1").show();

                            $("#search_apply_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_apply_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_apply_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");

                            //绑定滚动加载
                            myScroll_apply_list($(".apply-list"));


                        })


                    })

                    //查看派工详情
                    $(".common-dialog").on("click", ".line3 a[flag='apply']", function () {

                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbydispatchid", {
                            dispatchid: $(that).parents(".card").attr("dispatchid")
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            var html = EJSObj.e_templateHtml("apply_detail.ejs",
                                "/ism/chat/ism_template/apply_detail.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("派工详情");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");


                        })


                        return false;

                    })

                    //编辑
                    $(".common-dialog").on("click", ".card-head-right img[flag='apply_edit']", function () {
                        //var obj = {};
                        //obj.disable = true;
                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbydispatchid", {
                            dispatchid: $(that).parents(".card").attr("dispatchid")
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            result.data.disable = true;

                            var html = EJSObj.e_templateHtml("apply_detail_add.ejs",
                                "/ism/chat/ism_template/apply_detail_add.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("派工编辑");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            //$("#apply_time").jcDate({
                            //    IcoClass: "jcDateIco",
                            //    Event: "click",
                            //    Speed: 100,
                            //    Left: 0,
                            //    Top: 28,
                            //    format: "-",
                            //    DoubleNum: true,
                            //    Timeout: 100
                            //});
                            $("#apply_endtime").jcDate({
                                Default: result.data.HANDLESTOPDATE ? result.data.HANDLESTOPDATE.substr(0, 10) : "",
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });


                        })


                        return false;
                    })

                    //确认
                    $(".center-dialog").on("click", "#apply_detail_ensure", function () {

                        var regid = $("#input_applysummary").attr("regid");
                        var dispatchuserid = account.userName;
                        var handleuserid =
                            $("#handleusername").val() == login.IsLogin.realName ?
                                account.userName : "";
                        var dispatchrequest = $("#input_applysummary").html().trim();
                        if (!dispatchrequest) {
                            errorAlert("派工描述不能为空");
                            return;
                        }
                        $.post(sys_config.ApiBaseUrl + "InsertDispatch", {
                            regid: regid,
                            dispatchdate: $("#dispatchdate").val(),
                            dispatchuserid: dispatchuserid,
                            dispatchusername: $("#dispatchusername").text(),
                            handleuserid: handleuserid,
                            handleusername: $("#handleusername").val(),
                            dispatchrequest: $("#input_applysummary").html(),
                            handlestopdate: $("#handlestopdate").val(),
                            isurgent: $("#isurgent").val(),
                            username: account.userName
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            //更新成功后更新列表
                            //更新修改的内容
                            if ($(".register-list").length > 0) {
                                var data = [];
                                $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                    regid: regid
                                }, function (result) {
                                    data.push(result.data);
                                    var html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: data,
                                            flag_user: account.userName
                                        });
                                    $(".card[flagid='" + regid + "']").replaceWith(html);
                                    data = null;
                                    $(".center-dialog").hide();
                                    //mask
                                    var zindex = $(".dialog-mask").css("z-index");
                                    zindex = Number(zindex) - 1;
                                    $(".dialog-mask").css("z-index", zindex);
                                })
                            } else {
                                $(".center-dialog").hide();
                                //mask
                                //var zinedx = $(".dialog-mask").css("z-index");
                                //zindex = Number(zindex)-1;
                                $(".dialog-mask").css("z-index", "0").hide();
                            }
                        })
                    })

                    //派工编辑确认
                    $(".center-dialog").on("click", "#apply_edit_ensure", function () {
                        var that = this;
                        var dispatchrequest = $("#input_applysummary").html().trim();
                        var handleuser = $("#apply_edit_dealer").val();
                        if (!handleuser.trim()) {
                            errorAlert("处理人员不能为空");
                            return;
                        }
                        if (!dispatchrequest) {
                            errorAlert("派工描述不能为空");
                            return;
                        }

                        $.post(sys_config.ApiBaseUrl + "updateDispatch", {
                            dispatchid: $("#apply_dispatchid").text(),
                            dispatchusername: $("#apply_edit_sender").val(),
                            dispatchdate: $("#apply_time").val(),
                            handleusername: $("#apply_edit_dealer").val(),
                            handlestopdate: $("#apply_endtime").val(),
                            isurgent: $("#isurgent").val(),
                            dispatchrequest: $("#input_applysummary").html(),
                            dispatchuserid: account.userName,
                            handleuserid: "",
                            username: account.userName

                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            //
                            //更新修改的内容
                            var dispatchid = $("#apply_dispatchid").text();
                            var data = [];
                            $.post(sys_config.ApiBaseUrl + "selectbydispatchid", {
                                dispatchid: dispatchid
                            }, function (result) {

                                data.push(result.data);
                                //console.log(data)
                                var html = EJSObj.e_templateHtml("apply_list.ejs",
                                    "/ism/chat/ism_template/apply_list.ejs", {
                                        list: {data: data},
                                        flag_user: account.userName
                                    });
                                $(".card[dispatchid='" + dispatchid + "']").replaceWith(html);
                                data = null;
                                $(".top-dialog").hide();
                                $(".center-dialog").hide();
                                //mask

                                $(".dialog-mask").css("z-index", 1);

                            })

                        })
                    })

                    //取消
                    $(".center-dialog").on("click", "#apply_detail_cancel", function () {
                        if ($(".register-list").length > 0) {
                            $(".center-dialog").hide();
                            var zinedx = $(".dialog-mask").css("z-index");
                            zindex = Number(zindex) - 1;
                            $(".dialog-mask").css("z-index", zindex);
                        } else {
                            $(".center-dialog").hide();
                            $(".dialog-mask").css("z-index", "0").hide();
                        }

                    })

                    //apply  查看方案
                    $(".common-dialog").on("click", ".card-head-right img[flag='apply_checkplan']", function () {
                        var that = this;


                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(that).parents(".card").attr("regid"),
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            var html = EJSObj.e_templateHtml("resovle.ejs",
                                "/ism/chat/ism_template/resovle.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("解决方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                        })
                    })


                    //apply 完工
                    $(".common-dialog").on("click", ".card-head-right img[flag='apply_finish']", function () {
                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(that).parents(".card").attr("regid"),
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            if (!result.data.PROJECTID) {
                                result.data.flag = "add";

                                $.ajax({
                                    async: false,
                                    type: "POST",
                                    url: sys_config.ApiBaseUrl + "getprojectid",
                                    success: function (da) {
                                        //console.log(da)
                                        result.data.PROJECTID = da;
                                    }
                                })
                            }
                            if (!result.data.HANDLEUSERNAME) {
                                result.data.HANDLEUSERID = account.userName;
                                result.data.HANDLEUSERNAME = login.IsLogin.realName;
                            }

                            var html = EJSObj.e_templateHtml("resolve_edit.ejs",
                                "/ism/chat/ism_template/resolve_edit.ejs", {
                                    data: result,
                                    flag_user: account.userName
                                });
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("处理方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");

                            $("#resolve_starttime").jcDate({
                                Default: result.data.HANDLEDATE ? result.data.HANDLEDATE.substr(0, 10) : "today",
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });
                            // resolve_endtime
                            //$("#resolve_endtime").jcDate({
                            //    IcoClass: "jcDateIco",
                            //    Event: "click",
                            //    Speed: 100,
                            //    Left: 0,
                            //    Top: 28,
                            //    format: "-",
                            //    DoubleNum: true,
                            //    Timeout: 100
                            //});
                        })


                        $("#resolve_time").jcDate({
                            IcoClass: "jcDateIco",
                            Event: "click",
                            Speed: 100,
                            Left: 0,
                            Top: 28,
                            format: "-",
                            DoubleNum: true,
                            Timeout: 100
                        });
                        // resolve_endtime
                        $("#resolve_endtime").jcDate({
                            IcoClass: "jcDateIco",
                            Event: "click",
                            Speed: 100,
                            Left: 0,
                            Top: 28,
                            format: "-",
                            DoubleNum: true,
                            Timeout: 100
                        });
                        return false;
                    })

                    // apply 归档
                    $(".common-dialog").on("click", ".card-head-right img[flag='apply_sort']", function () {

                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbyclsdata", function (result) {
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            treedata = result.data;

                            //构造根节点直接子节点   1级节点
                            var parent = result.data[0].CLSCODE;
                            var data = findChildNode(parent);
                            //console.log(data);
                            var regid = $(that).parents(".card").attr("regid");


                            var html = EJSObj.e_templateHtml("register_sort_container.ejs",
                                "/ism/chat/ism_template/register_sort_container.ejs", {regid: regid});
                            $(".top-dialog-inner").html(html);
                            $(".top-dialog .dialog-header>span").text("归档");
                            //内容
                            var html = EJSObj.e_templateHtml("register_sort.ejs",
                                "/ism/chat/ism_template/register_sort.ejs", {list: data});
                            $(".sort-tree").html(html);
                            $(".top-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            openAllNode();

                            //显示上次归档结果
                            $.post(sys_config.ApiBaseUrl + "selectclsbyregid", {
                                regid: $("#register_sort_input").attr("regid")
                            }, function (result) {
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }
                                $("#register_sort_input").val(result.data.KEYWORD);
                                $("input.chk_1#" + result.data.CLSID).prop("checked", true);
                            })
                        });

                        return false;
                    })

                    //apply 删除
                    $(".common-dialog").on("click", ".card-head-right img[flag='apply_delete']", function () {
                        var dispatchid = $(this).parents(".card").attr("dispatchid");
                        var that = this;

                        //删除
                        $("#dialog-confirm").dialog({
                            resizable: false,
                            height: 160,
                            modal: true,
                            buttons: {
                                "取消": function () {
                                    $(this).dialog("close");
                                },
                                "确认": function () {
                                    $(this).dialog("close");

                                    $.post(sys_config.ApiBaseUrl + "deleteDispatch", {
                                        dispatchid: dispatchid,
                                        username: account.userName
                                    }, function (result) {
                                        if (result.result != "true") {
                                            errorAlert();

                                            return;
                                        }
                                        $(that).parents(".card").remove();
                                    })

                                }
                            }
                        });
                        var html = "<img src='/ism/chat/img/close.png' width='12'>";
                        $(".ui-dialog-titlebar-close").html(html);


                    })


                    //resolve_edit_ensure
                    //解决方案取消  确认
                    $(".center-dialog").on("click", "#resolve_edit_ensure", function () {

                        var name = $("#resolve_person").val();
                        var content = $("#input_dealsummary").html();
                        if (!name.trim()) {
                            errorAlert("处理人员不能为空");
                            return;
                        }
                        if (!content.trim()) {
                            errorAlert("处理方案不能为空");
                            return;
                        }


                        if (name != login.IsLogin.realName) {
                            $("#resolve_person").attr("HANDLEUSERID", "");
                        }
                        var api = "updateProject";
                        if ($("#input_questionsummary").attr("flag") == "add") {
                            api = "InsertProject";
                        }
                        $.post(sys_config.ApiBaseUrl + api, {
                            projectid: $("#input_questionsummary").attr("serialnum"),
                            regid: $("#input_questionsummary").attr("regid"),
                            handleuserid: $("#resolve_person").attr("HANDLEUSERID"),
                            handleusername: name,
                            handledate: $("#resolve_starttime").val(),
                            handlestopdate: $("#resolve_endtime").val(),
                            projectcontent: $("#input_dealsummary").html(),
                            dispatchid: $("#input_questionsummary").attr("dispatchid"),
                            username: account.userName
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            $(".center-dialog").hide();
                            $(".dialog-mask").css("z-index", "1");
                            //更新修改的内容
                            var regid = $("#input_questionsummary").attr("regid");
                            var data = [];
                            $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                regid: regid
                            }, function (result) {
                                data.push(result.data);

                                //判断是 register  还是 apply
                                var html = "";
                                if ($(".card[flagid='" + regid + "']").length > 0) {  //register
                                    html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: data,
                                            flag_user: account.userName
                                        });
                                    $(".card[flagid='" + regid + "']").replaceWith(html);
                                } else {                                            //apply
                                    html = EJSObj.e_templateHtml("apply_list.ejs",
                                        "/ism/chat/ism_template/apply_list.ejs", {
                                            list: {data: data},
                                            flag_user: account.userName
                                        });
                                    $(".card[regid='" + regid + "']").replaceWith(html);
                                }


                                data = null;
                            })


                        });


                    });

                    $(".center-dialog").on("click", "#resolve_edit_cancel", function () {
                        $(".center-dialog").hide();
                        $(".dialog-mask").css("z-index", "1");

                    });


                    //////////////////////////////////////////////////////
                    /*               apply       end                    */
                    /////////////////////////////////////////////////////


                    //////////////////////////////////////////////////////
                    /*               sort                            */
                    /////////////////////////////////////////////////////

                    $("#sort").click(function () {
                        flag_openallnode = false;
                        searchParam.page = 1;
                        searchParam.rows = 6;

                        var that = this;
                        $.post(sys_config.ApiBaseUrl + "selectbyclsdata", function (result) {
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            $.post(sys_config.ApiBaseUrl + "selectbyclsmatchdata", searchParam, function (result1) {
                                if (result1.result != "true") {
                                    errorAlert();
                                    return;
                                }

                                treedata = result.data;
                                //构造根节点直接子节点   1级节点
                                var parent = result.data[0].CLSCODE;
                                var data = findChildNode(parent);  //左边列表数据
                                //console.log(data);

                                var data1 = result1.data;

                                var html = EJSObj.e_templateHtml("sort.ejs",
                                    "/ism/chat/ism_template/sort.ejs", {list_right: data1, list_left: data});
                                $(".common-dialog-inner").html(html);
                                $(".common-dialog .dialog-header>span").text("知识库");
                                $(".common-dialog .search_input").show();
                                $("[data-toggle='tooltip']").tooltip();
                                $(".common-dialog").show();
                                //mask
                                $(".dialog-mask").css("z-index", "1").show();
                                openAllNode();

                                myScroll_lib_list($(".lib-list"));

                                //时间
                                $("#search_register_timestart").jcDate({
                                    IcoClass: "jcDateIco",
                                    Event: "click",
                                    Speed: 100,
                                    Left: 0,
                                    Top: 28,
                                    format: "-",
                                    DoubleNum: true,
                                    Timeout: 100
                                }).val("");
                                $("#search_register_timeend").jcDate({
                                    IcoClass: "jcDateIco",
                                    Event: "click",
                                    Speed: 100,
                                    Left: 0,
                                    Top: 28,
                                    format: "-",
                                    DoubleNum: true,
                                    Timeout: 100
                                }).val("");
                                $("#search_deal_timestart").jcDate({
                                    IcoClass: "jcDateIco",
                                    Event: "click",
                                    Speed: 100,
                                    Left: 0,
                                    Top: 28,
                                    format: "-",
                                    DoubleNum: true,
                                    Timeout: 100
                                }).val("");
                                $("#search_deal_timeend").jcDate({
                                    IcoClass: "jcDateIco",
                                    Event: "click",
                                    Speed: 100,
                                    Left: 0,
                                    Top: 28,
                                    format: "-",
                                    DoubleNum: true,
                                    Timeout: 100
                                }).val("");

                            })
                        })

                    });
                    //left点击checkbox sort-left
                    $(".common-dialog").on("click", ".sort-left .trangle", function () {
                        var input = $(this).next().children("input");
                        var flag = $(this).hasClass("trangle-active");
                        var dom = $(this).parent().next(".sort-item-list");
                        if (!flag) {
                            $(this).addClass("trangle-active");

                            if (dom.children().length < 1) {
                                //构造子节点
                                var parent = input.attr("id");
                                var data = findChildNode(parent);
                                //console.log(data)

                                var html = EJSObj.e_templateHtml("sort_next.ejs.ejs",
                                    "/ism/chat/ism_template/sort_next.ejs", {list: data});
                                dom.html(html);
                                if (dom.children().length < 1) {
                                    dom.hide();
                                } else {
                                    dom.show();
                                }
                            } else {
                                dom.show();
                            }

                        } else {
                            $(this).removeClass("trangle-active");
                            dom.hide();
                            flag_openallnode = false;
                        }
                        if (flag_openallnode)
                            openAllNode();

                    })

                    //点击分类项目选中 ||  取消选中
                    $(".common-dialog").on("click", ".sort-left input.chk_1", function () {
                        if ($(this).is(":checked")) {
                            $(this).parent().parent().parent().find("input.chk_1").prop("checked", true);
                        } else {
                            $(this).parent().parent().parent().find("input.chk_1").prop("checked", false);
                        }

                        $(".common-dialog .button-searh-lib").trigger("click");

                        //if ($(this).attr("id") == lastchecked_id) {
                        //    $(this).prop("checked", false);
                        //    lastchecked_id = "";
                        //    $(".common-dialog .button-searh-lib").trigger("click");
                        //} else {
                        //    lastchecked_id = $(this).attr("id");
                        //}

                    })

                    // 分类发生变化 ，搜索条件改变
                    //$(".common-dialog").on("change", ".sort-left input.chk_1", function () {
                    //    //console.log("-----------")
                    //
                    //
                    //});

                    // sort 搜索   button-searh button-searh-lib
                    $(".common-dialog").on("click", ".button-searh-lib", function () {
                        //console.log("搜索开始");
                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        var clsname = [];
                        var dom = $(".common-dialog input.chk_1:checked");

                        if (dom.length > 0) {
                            dom.each(function (index, ele) {
                                clsname.push($(this).attr("id"));
                            })
                            clsname = clsname.join(",");

                        }

                        searchParam.page = page;
                        searchParam.rows = rows;
                        searchParam.registerstardate = $("#search_register_timestart").val();
                        searchParam.registerstopdate = $("#search_register_timeend").val();
                        searchParam.handlestardate = $("#search_deal_timestart").val();
                        searchParam.handlestopdate = $("#search_deal_timeend").val();
                        searchParam.registerusername = $("#search_register_person").val();
                        searchParam.handleusername = $("#search_deal_person").val();
                        searchParam.quickkeyword = $("#common-search_keywords").val();
                        searchParam.clsname = clsname;

                        //console.log(clsname);

                        $.post(sys_config.ApiBaseUrl + "selectbyclsmatchdata", {
                            page: page,
                            rows: rows,
                            registerstardate: $("#search_register_timestart").val(),
                            registerstopdate: $("#search_register_timeend").val(),
                            handlestardate: $("#search_deal_timestart").val(),
                            handlestopdate: $("#search_deal_timeend").val(),
                            registerusername: $("#search_register_person").val(),
                            handleusername: $("#search_deal_person").val(),
                            quickkeyword: $("#common-search_keywords").val(),
                            clsname: clsname
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            if (result.data.length < rows) {
                                finish_scroll = true;
                            }
                            var html = EJSObj.e_templateHtml("sort_list.ejs",
                                "/ism/chat/ism_template/sort_list.ejs", {
                                    list: result.data,
                                });
                            $(".lib-list").html(html);
                            $("[data-toggle='tooltip']").tooltip();
                        })
                    });

                    //查看方案
                    $(".common-dialog").on("click", ".card-head-right img[flag='lib-checkplan']", function () {

                        var that = this;

                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $(that).parents(".card").attr("regid"),
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            var html = EJSObj.e_templateHtml("resovle.ejs",
                                "/ism/chat/ism_template/resovle.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("解决方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                        });


                        return false;
                    });


                    //////////////////////////////////////////////////////
                    /*               sort  end                          */
                    /////////////////////////////////////////////////////


                    //////////////////////////////////////////////////////
                    /*               add                         */
                    /////////////////////////////////////////////////////

                    var temp_message = "";

                    //新增
                    $("#add").click(function () {

                        var obj = {};
                        obj.flag = "add";
                        obj.name = login.IsLogin.realName;
                        obj.origin = $(".right-pannel-head>span").text();
                        obj.time = new Date().format("yyyy-MM-dd");
                        obj.REQUEST = temp_message;
                        ////console.log(obj);
                        var html = EJSObj.e_templateHtml("register_detail_edit.ejs",
                            "/ism/chat/ism_template/register_detail_edit.ejs", {data: {data: obj, attachment: []}});
                        $(".common-dialog-inner").html(html);
                        $(".common-dialog .dialog-header>span").text("问题登记");
                        $(".common-dialog").show();
                        //mask
                        $(".dialog-mask").css("z-index", "1").show();
                        

                        //默认第一次搜索
                        $("#register_matchproblem").trigger("click");


                        //获取序列号
                        $.get(sys_config.ApiBaseUrl + "getregid", function (result) {
                            $("#input_questionsummary").attr("serialnum", result);
                        });

                        return false;
                    });


                    //双击消息打开新增
                    $(".right-pannel-center").on("dblclick", ".message>div>p", function () {
                        temp_message = "";

                        //var dom = $(this).children("div").children("p");
                        var domclone = $(this).clone();
                        temp_message = domclone.html();
                        domclone = null;

                        //console.log(temp_message);
                        $("#add").trigger("click");

                    });

                    //编辑问题详情 paste
                    $(".common-dialog").on('paste', '#input_questionsummary', function (e) {
                        e.preventDefault();
                        var text = null;

                        if (window.clipboardData && clipboardData.setData) {
                            // //console.log("IE")
                            // IE
                            text = window.clipboardData.getData('text');
                        } else {
                            ////console.log("no IE")
                            text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('在这里输入文本');
                        }
                        if (document.body.createTextRange) {
                            ////console.log("createTextRange")
                            if (document.selection) {
                                textRange = document.selection.createRange();
                            } else if (window.getSelection) {
                                // //console.log("getSelection")
                                sel = window.getSelection();
                                var range = sel.getRangeAt(0);

                                // 创建临时元素，使得TextRange可以移动到正确的位置
                                var tempEl = document.createElement("span");
                                tempEl.innerHTML = "&#FEFF;";
                                range.deleteContents();
                                range.insertNode(tempEl);
                                textRange = document.body.createTextRange();
                                textRange.moveToElementText(tempEl);
                                tempEl.parentNode.removeChild(tempEl);
                            }
                            textRange.text = text;
                            textRange.collapse(false);
                            textRange.select();
                        } else {
                            ////console.log("Chrome之类浏览器")
                            // Chrome之类浏览器
                            document.execCommand("insertText", false, text);
                        }
                    });

                    //查看详情

                    //新增文件
                    $(".center-dialog").on("click", "#addfile_rosolve", function () {

                        $.post(sys_config.ApiBaseUrl + "getattachmentid", function (result) {
                            //console.log(result);
                            //弹出上传文件对话框
                            var html = EJSObj.e_templateHtml("addfile.ejs",
                                "/ism/chat/ism_template/addfile.ejs", {});
                            $(".top-dialog-inner").html(html);
                            $(".top-dialog .dialog-header>span").text("新增附件");
                            $(".top-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "3");
                            $("#add_filename").attr("attachmentid", result);

                        })
                    })

                    $(".center-dialog").on("click", "#deletefile_rosolve", function () {
                        //$(".register-detail-filelist input:checked").parent().parent().remove();
                        var doms = $(".register-detail-filelist input:checked");
                        var ids = [];
                        doms.each(function (index, ele) {
                            ids.push($(this).attr("id"));
                        })

                        $.post(sys_config.ApiBaseUrl + "deleteAttachments", {
                            attachmentid: ids.join(",")
                        }, function (result) {
                            //console.log(result)
                        })
                        $(".register-detail-filelist input:checked").parent().parent().remove();
                    })

                    //////////////////////////////////////////////////////
                    /*               match     end                    */
                    /////////////////////////////////////////////////////

                    //点击新增页面快速搜索   出现匹配页面
                    $(".common-dialog").on("click", ".hint-text span", function () {

                        page = 1;
                        rows = 6;
                        finish_scroll = false;

                        searchParam.page = page;
                        searchParam.rows = rows;

                        $.post(sys_config.ApiBaseUrl + "selectbymatchdata", searchParam, function (result) {
                            //console.log(result);

                            var html = EJSObj.e_templateHtml("match.ejs",
                                "/ism/chat/ism_template/match.ejs", {list: result.data});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("快速查询");
                            $(".center-dialog .search_input").show();
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            //时间
                            $("#search_register_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_register_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timestart").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");
                            $("#search_deal_timeend").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            }).val("");

                            $('[data-toggle="tooltip"]').tooltip();
                            myScroll_match_list($(".match-list"));


                        })


                    })

                    //hint questions
                    $(".common-dialog").on("click", ".hint-question", function () {

                        var regid = $(this).attr("regid");

                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: regid,
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            result.data.quickreply = true;
                            //result.data.show_ect = true;
                            var html = EJSObj.e_templateHtml("resovle.ejs",
                                "/ism/chat/ism_template/resovle.ejs", {data: result});
                            $(".center-dialog-inner").html(html);
                            $(".center-dialog .dialog-header>span").text("解决方案");
                            $(".center-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                        })

                    });

                    //快速回复
                    $(".center-dialog").on("click", "#quickreply", function () {
                        var list = [];
                        var dealplan = $("#resolve_plan").html();
                        var html = dealplan + "<br><br>";
                        $(".footer-input .edit").append(html);
                        $(".mc-contain .attachmentfile").each(function (index, ele) {
                            //$(".footer-input .edit")
                            //    .append("<img class='filepic' src='/ism/chat/img/filepic.png'>");
                            $(".footer-input .edit").append($(this).children("a"));
                            $(".footer-input .edit").append("<br>");
                        });
                        $(".center-dialog").hide();
                        $(".common-dialog").hide();
                        $(".dialog-mask").hide();

                        $("#sendMessage").trigger("click");

                    })

                    //匹配页面  查看详情   查看问题详情
                    $(".center-dialog").on("click", ".line3 a[flag='match']", function () {

                        var regid = $(this).parents(".card").attr("regid");
                        //
                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: regid
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            //result.data.show_ect = true;
                            var html = EJSObj.e_templateHtml("register_detail.ejs",
                                "/ism/chat/ism_template/register_detail.ejs", {data: result});
                            $(".centertop-dialog-inner").html(html);
                            $(".centertop-dialog .dialog-header>span").text("问题登记详情")
                            $(".centertop-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "3");
                        });

                        return false;
                    })

                    //关闭centertop-dialog
                    $(".centertop-dialog").on("click", ".dialog-header img", function () {
                        $(".centertop-dialog").hide();
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;
                        $(".dialog-mask").css("z-index", zindex);
                    })

                    // 匹配页面查看方案
                    $(".center-dialog").on("click", ".apply-status[flag='checkplan']", function () {

                        var regid = $(this).parents(".card").attr("regid");

                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: regid,
                        }, function (result) {
                            //console.log(result)
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            //result.data.show_ect = true;
                            var html = EJSObj.e_templateHtml("resovle.ejs",
                                "/ism/chat/ism_template/resovle.ejs", {data: result});
                            $(".centertop-dialog-inner").html(html);
                            $(".centertop-dialog .dialog-header>span").text("解决方案");
                            $(".centertop-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "3");
                        })


                    })


                    //新增  登记详情  取消||确认按钮
                    $(".common-dialog").on("click", ".dialog-footer #register_add_ensure", function () {

                        //更新数据

                        var regdate = $("#register_time").text();
                        var userid = login.IsLogin.USERNAME;
                        var username = $("#input_register").text();
                        var request = $("#input_questionsummary").html();
                        //  .replace(/<br>/gi,"")
                        while (request.endWith("<br>")) {
                            request = request.replace(/<br>/gi, "")
                        }
                        var requireid = $(".right-pannel-center-inner.show-chat").attr("flagid");
                        var requirename = $(".right-pannel-head>span").text();
                        if (!requirename) {
                            errorAlert("问题来源不能为空");
                            return;
                        }

                        if ("" == request) {
                            errorAlert("问题描述不能为空");
                            $("#input_questionsummary").focus();
                            return;
                        }

                        $.ajax({
                            type: 'post',
                            url: sys_config.ApiBaseUrl + "InsertRegister",
                            timeout: 10000,
                            data: {
                                regdate: regdate,
                                userid: account.userName,
                                username: username,
                                request: request,
                                requireid: requireid,
                                requirename: requirename,
                                regid: $("#input_questionsummary").attr("serialnum"),
                                //username:account.userName

                            },
                            success: function (result) {
                                //console.log(result);
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }

                                $(".common-dialog").hide();
                                //mask
                                $(".dialog-mask").hide();
                            },
                            error: function (xhr, status) {
                                if (status == 'timeout') {
                                    errorAlert("请求超时");
                                }
                                //console.log(status);
                            }
                        })


                    });

                    $(".common-dialog").on("click", ".dialog-footer #register_add_cancel", function () {
                        $(".common-dialog").hide();
                        //mask
                        $(".dialog-mask").hide();
                        temp_message = "";

                    });

                    //派工
                    $(".common-dialog").on("click", ".dialog-footer #register_add_apply", function () {

                        var regdate = $("#register_time").text();
                        var userid = account.userName;
                        var username = $("#input_register").text();
                        var request = $("#input_questionsummary").html();
                        var requireid = $(".right-pannel-center-inner.show-chat").attr("flagid");
                        var requirename = $(".right-pannel-head>span").text();
                        var regid = $("#input_questionsummary").attr("serialnum");
                        if (!requirename) {
                            errorAlert("问题来源不能为空");
                            return;
                        }

                        if ("" == request) {
                            errorAlert("问题描述不能为空");
                            $("#input_questionsummary").focus();
                            return;
                        }

                        $.ajax({
                            type: 'post',
                            url: sys_config.ApiBaseUrl + "InsertRegister",
                            timeout: 10000,
                            data: {
                                regdate: regdate,
                                userid: userid,
                                username: username,
                                request: request,
                                requireid: requireid,
                                requirename: requirename,
                                regid: $("#input_questionsummary").attr("serialnum"),
                                usernmae: account.userName
                            },
                            success: function (result) {
                                //console.log(result);
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }

                                $(".common-dialog").hide();

                                //派工界面
                                $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                    regid: regid
                                }, function (result) {
                                    //console.log(result);
                                    if (result.result != "true") {
                                        errorAlert();
                                        return;
                                    }
                                    result.data.disable = false;
                                    result.data.applytime = new Date().format("yyyy-MM-dd");
                                    result.data.dispatchusername = login.IsLogin.realName;
                                    result.data.handleusername = login.IsLogin.realName;
                                    var html = EJSObj.e_templateHtml("apply_detail_add.ejs",
                                        "/ism/chat/ism_template/apply_detail_add.ejs", {data: result});
                                    $(".center-dialog-inner").html(html);
                                    $(".center-dialog .dialog-header>span").text("问题派工");
                                    $(".center-dialog").show();
                                    //mask
                                    $(".dialog-mask").css("z-index", "1");
                                    $("#dispatchdate").jcDate({
                                        IcoClass: "jcDateIco",
                                        Event: "click",
                                        Speed: 100,
                                        Left: 0,
                                        Top: 28,
                                        format: "-",
                                        DoubleNum: true,
                                        Timeout: 100
                                    });
                                    $("#handlestopdate").jcDate({
                                        IcoClass: "jcDateIco",
                                        Event: "click",
                                        Speed: 100,
                                        Left: 0,
                                        Top: 28,
                                        format: "-",
                                        DoubleNum: true,
                                        Timeout: 100
                                    });

                                })

                            },
                            error: function (xhr, status) {
                                if (status == 'timeout') {
                                    errorAlert("请求超时");
                                }
                                //console.log(status);
                            }
                        });


                        return false;


                    });

                    //center    register编辑界面底部按钮派工
                    $(".center-dialog").on("click", ".dialog-footer #register_add_apply", function () {


                        $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                            regid: $("#input_questionsummary").attr("serialnum"),
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }
                            result.data.disable = false;
                            result.data.applytime = new Date().format("yyyy-MM-dd");
                            result.data.dispatchusername = login.IsLogin.realName;
                            result.data.handleusername = login.IsLogin.realName;
                            var html = EJSObj.e_templateHtml("apply_detail_add.ejs",
                                "/ism/chat/ism_template/apply_detail_add.ejs", {data: result});


                            $(".centertop-dialog-inner").html(html);
                            $(".centertop-dialog .dialog-header>span").text("问题派工");
                            $(".centertop-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "3");
                            $("#dispatchdate").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });
                            $("#handlestopdate").jcDate({
                                IcoClass: "jcDateIco",
                                Event: "click",
                                Speed: 100,
                                Left: 0,
                                Top: 28,
                                format: "-",
                                DoubleNum: true,
                                Timeout: 100
                            });

                        })


                    });

                    $(".centertop-dialog").on("click", "#apply_detail_ensure", function () {

                        var regid = $("#input_applysummary").attr("regid");
                        var dispatchuserid = account.userName;
                        var handleuserid =
                            $("#handleusername").val() == login.IsLogin.realName ?
                                account.userName : "";
                        var handleusername = $("#handleusername").val().trim();

                        var dispatchrequest = $("#input_applysummary").html().trim();
                        if (!handleusername) {
                            errorAlert("处理人员不能为空");
                            return;
                        }
                        if (!dispatchrequest) {
                            errorAlert("派工描述不能为空");
                            return;
                        }

                        $.post(sys_config.ApiBaseUrl + "InsertDispatch", {
                            regid: regid,
                            dispatchdate: $("#dispatchdate").val(),
                            dispatchuserid: dispatchuserid,
                            dispatchusername: $("#dispatchusername").text(),
                            handleuserid: handleuserid,
                            handleusername: $("#handleusername").text(),
                            dispatchrequest: dispatchrequest,
                            handlestopdate: $("#handlestopdate").val(),
                            isurgent: $("#isurgent").val()
                        }, function (result) {
                            //console.log(result);
                            if (result.result != "true") {
                                errorAlert();
                                return;
                            }

                            //更新成功后更新列表
                            //更新修改的内容
                            if ($(".register-list").length > 0) {
                                var data = [];
                                $.post(sys_config.ApiBaseUrl + "selectbyregid", {
                                    regid: regid
                                }, function (result) {
                                    data.push(result.data);
                                    var html = EJSObj.e_templateHtml("register_list.ejs",
                                        "/ism/chat/ism_template/register_list.ejs", {
                                            list: data,
                                            flag_user: account.userName
                                        });
                                    $(".card[flagid='" + regid + "']").replaceWith(html);
                                    data = null;
                                    $(".centertop-dialog").hide();
                                    $(".center-dialog").hide();
                                    $(".dialog-mask").css("z-index", "1");

                                })
                            } else {

                                $(".centertop-dialog").hide();
                                $(".center-dialog").hide();
                                $(".common-dialog").hide();
                                $(".dialog-mask").css("z-index", "0").hide();

                            }
                        })

                    });

                    $(".centertop-dialog").on("click", "#apply_detail_cancel", function () {

                        $(".centertop-dialog").hide();
                        var zindex = $(".dialog-mask").css("z-index");
                        zindex = Number(zindex) - 1;
                        $(".dialog-mask").css("z-index", zindex);
                    });


                    //新增    文件处理

                    //删除选中文件
                    $(".common-dialog,.center-dialog").on("click", ".attachmentfile span", function () {

                        var that = this;
                        var attachmentid = $(this).parent().attr("id");

                        $.post(sys_config.ApiBaseUrl + "deleteAttachments", {
                            attachmentid: attachmentid
                        }, function (result) {
                            //console.log(result)
                            $(that).parent().remove();
                        });

                    });

                    //添加文件
                    $(".common-dialog").on("click", "#addfile", function () {

                        $.post(sys_config.ApiBaseUrl + "getattachmentid", function (result) {
                            //console.log(result);
                            //弹出上传文件对话框
                            var html = EJSObj.e_templateHtml("addfile.ejs",
                                "/ism/chat/ism_template/addfile.ejs", {});
                            $(".top-dialog-inner").html(html);
                            $(".top-dialog .dialog-header>span").text("新增附件");
                            $(".top-dialog").show();
                            //mask
                            $(".dialog-mask").css("z-index", "2");
                            $("#add_filename").attr("attachmentid", result);

                        });

                    });

                    // 出现匹配表格
                    $(".common-dialog").on("click", "#register_matchproblem", function () {


                        var quickkeyword = $("#input_questionsummary").html().replace(/^(<br>)*|(<br>)*$/gi, "");

                        $.ajax({
                            type: 'post',
                            url: sys_config.ApiBaseUrl + "selectbymatchkeyword",
                            timeout: 10000,
                            data: {
                                rows: 3,
                                page: 1,
                                quickkeyword: quickkeyword
                            },
                            success: function (result) {
                                //console.log(result);
                                if (result.result != "true") {
                                    errorAlert();
                                    return;
                                }
                                var html = EJSObj.e_templateHtml("table_row.ejs",
                                    "/ism/chat/ism_template/table_row.ejs", {list: result.data});
                                $(".mc-table").html(html);
                            },
                            error: function (xhr, status) {
                                if (status == 'timeout') {
                                    errorAlert("请求超时");
                                }
                                //console.log(status);
                            }
                        });


                    });


                    /*****************************************/
                    //文件列表hover出现删除
                    $(".common-dialog,.center-dialog").on("mouseover", ".attachmentfile", function () {
                        $(this).addClass("attachmentfile-hover");
                        $(this).find("span").show();
                    })
                    $(".common-dialog,.center-dialog").on("mouseout", ".attachmentfile", function () {
                        $(this).removeClass("attachmentfile-hover");
                        $(this).find("span").hide();
                    })


                    //hover img  替换
                    $(".common-dialog,.center-dialog").on("mouseover", "img.button", function () {
                        if ($(this).hasClass("button-disabled"))
                            return;
                        var file_path = $(this).attr("src");
                        //var file_path  = "jn/vfkn/bfkbn/vf.png";
                        var file_name = file_path.replace(/(.*\/)*([^.]+).*/g, "$2");
                        var new_path = file_path.substr(0, file_path.length - file_name.length - 4);
                        ////console.log(new_path)
                        new_path += file_name + "_hover.png";
                        $(this).attr("src", new_path);

                    })
                    $(".common-dialog,.center-dialog").on("mouseout", "img.button", function () {
                        if ($(this).hasClass("button-disabled"))
                            return;
                        var file_path = $(this).attr("src");
                        var file_name = file_path.replace(/(.*\/)*([^.]+).*/g, "$2");
                        var new_path = file_path.substr(0, file_path.length - file_name.length - 4);
                        ////console.log(new_path)
                        new_path += file_name.substring(0, file_name.length - 6) + ".png";
                        $(this).attr("src", new_path);

                    })

                    //显示文件列表
                    $(".center-dialog").on("click", ".check_file-containner .check_file", function () {
                        if ($(".check_file img").hasClass("down-up")) {
                            $(this).parents(".register-detail-filelist-1").find(".attachmentfile").hide();
                            $(".check_file img").removeClass("down-up");
                        } else {
                            $(this).parents(".register-detail-filelist-1").find(".attachmentfile").show();
                            $(".check_file img").addClass("down-up");
                        }

                    })


                    //限制contenteditable字数  1200
                    $(".common-dialog,.center-dialog,.centertop-dialog,.top-dialog").on("input propertychange",
                        "[contenteditable]", function () {

                             if($(this).text().length>1200){
                                 $(this).text($(this).text().substr(0,1200));
                                 RangeEnd($(this)[0]);
                             }
                        })



                    function RangeEnd(obj) {
                        if (window.getSelection) {//ie11 10 9 ff safari
                            obj.focus(); //解决ff不获取焦点无法定位问题
                            var range = window.getSelection();//创建range
                            range.selectAllChildren(obj);//range 选择obj下所有子内容
                            range.collapseToEnd();//光标移至最后
                        }
                        else if (document.selection) {//ie10 9 8 7 6 5
                            var range = document.selection.createRange();//创建选择对象
                            //var range = document.body.createTextRange();
                            range.moveToElementText(obj);//range定位到obj
                            range.collapse(false);//光标移至最后
                            range.select();
                        }
                    }


                }
            )

        }

        return {init: init}
    }
)