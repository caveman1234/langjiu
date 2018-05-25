/**
 * Created by 炎 on 2017/5/16 016.
 */
define(['sys_config', "EJS", "EJSObj", "webim_chat_template"], function (sys_config, EJS, EJSObj, chat) {

    var orgdata;
    //+++
    var getUsersByOrgid = function (orgid) {
        var dtd = $.Deferred();
        var params = {
            qydata: "{orgcode:'" + orgid + "'}"
        };
        var url = sys_config.ApiBaseUrl + "api/getallorgandusers";
        var tempPost = $.post(url, params, function (data) {
            if (data.result != "true") {
                dtd.resolve([]);
            }
            dtd.resolve(data.data);
        });
        return dtd.promise();
    }
    /* var getUserByidSync = function (orgid) {
        var params = {
            qydata: "{orgcode:'" + orgid + "'}"
        };
        $.ajax({
            type: "post",
            url: sys_config.ApiBaseUrl + "api/getallorgandusers",
            data: params,
            async: true,
            dataType: "json",
            success: function (data) {
                var data = data.data;
            }
        });
    } */
    //++++++

    function getOrgTree() {
        $.post(sys_config.ApiBaseUrl + "api/getUserinfo", { username: account.userName }, function (result) {
            //console.log(result);
            if (result.result != "true") {
                errorHint("获取用户信息失败");
                //隐藏聊天div
                $("#empty-panel").hide();
                return;
            }
            //判断是否具有聊天权限
            if (result.data.orgid == '-1') {
                //隐藏聊天div
                $("#empty-panel").hide();
                return;
            }


            getOrgs(result.data.roles);

            $("#operation").parent().show();
            //+++++++++++++增加
            var roles = result.data.roles;

            var orgids = result.data.orgid.split(",");
            var defferedArr = orgids.map(function (orgid) {
                return getUsersByOrgid(orgid);
            });
            $.when.apply($, defferedArr)
                .done(function (e) {
                    var usersDoubleArr = [].slice.call(arguments, 0);
                    var users = [];
                    usersDoubleArr.forEach(function (arr) {
                        users = users.concat(arr);
                    });
                    //去重
                    var usersUSERNAME = users.map(function (v) {
                        return v.USERNAME;
                    });
                    users = users.filter(function (v, i) {
                        return usersUSERNAME.indexOf(v.USERNAME) === i;
                    });
                    getUsers(users, result.data.roles);
                    //最后加载最近联系人
                    //获取最近联系人
                    YYIMChat.getRecentDigset({
                        success: function (result) {
                            //console.log(result);
                            result.list.forEach(function (ele, index) {
                                if (ele.type != "chat" || !ele.lastMessage || ele.state != "exists") {
                                    return;
                                }
                                ele.lastMessage.from = ele.id;
                                ele.lastMessage.readedVersion = ele.readedVersion;

                                chat.ReceiveMsg(ele.lastMessage.data.contentType, ele.lastMessage)
                                //var html = EJSObj.e_template("webim_template.ejs", "/ism/chat/template/webim_template.ejs");
                                //$("#chat-pannel").html(trueHtml);
                            })
                        }
                    })
                })


            //+++++++++++++


            //----------------删除
            /* $.post(sys_config.ApiBaseUrl + "api/getallorgandusers", {
                qydata: "{orgcode:'" + result.data.orgid + "'}"
            }, function (data) {
                if (data.result != "true") {
                    errorHint("获取运维人员失败");
                    return;
                }
                getUsers(data.data, result.data.roles);
                //最后加载最近联系人
                //获取最近联系人
                YYIMChat.getRecentDigset({
                    success: function (result) {
                        //console.log(result);
                        result.list.forEach(function (ele, index) {
                            if (ele.type != "chat" || !ele.lastMessage || ele.state != "exists") {
                                return;
                            }
                            ele.lastMessage.from = ele.id;
                            ele.lastMessage.readedVersion = ele.readedVersion;

                            chat.ReceiveMsg(ele.lastMessage.data.contentType, ele.lastMessage)
                            //var html = EJSObj.e_template("webim_template.ejs", "/ism/chat/template/webim_template.ejs");
                            //$("#chat-pannel").html(trueHtml);
                        })
                    }
                })
            }) */
            //--------------------
        })
    }

    function getOrgs(list) {
        var html = EJSObj.e_templateHtml("orghtml.ejs", "/ism/chat/template/orghtml.ejs", { list: list });
        $(".list-content>.org-list").html(html);
        $(".list-content>.org-list >.org-org>.org-org-head>.trangle").addClass("changedirection");
    }

    function getUsers(list, roles) {
        var html = "";
        for (var i = 0; i < list.length; i++) {
            html = EJSObj.e_templateHtml("userhtml.ejs", "/ism/chat/template/userhtml.ejs", { data: list[i] });

            $(".list-content>.org-list .org-org[rolecode='" + list[i].ROLE + "']")
                .children(".org-org-list").append(html);

        }
    }
    return { getOrgTree: getOrgTree };
})