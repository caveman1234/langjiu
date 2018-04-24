/**
 * Created by 炎 on 2017/5/16 016.
 */
define(['sys_config', "EJS", "EJSObj","webim_chat_template"], function (sys_config, EJS, EJSObj,chat) {

    var orgdata;

    function getOrgTree() {
        $.post(sys_config.ApiBaseUrl + "api/getUserinfo", {username: account.userName}, function (result) {
            //console.log(result);
            if(result.result!="true"){
                errorHint("获取用户信息失败");
				//隐藏聊天div
				$("#empty-panel").hide();
                return;
            }
			
			//判断是否具有聊天权限
			if(result.data.orgid == '-1'){
				//隐藏聊天div
				$("#empty-panel").hide();
				return;
            }
            // result.data.roles = result.data.roles.map(function(v){
            //     var entrys = Object.entries(v);
            //     return {
            //         rolecode:entrys[0][0],
            //         rolename:entrys[0][1]
            //     }
            // })

            getOrgs(result.data.roles);
			
			
			
			
			$("#operation").parent().show();

            $.post(sys_config.ApiBaseUrl + "api/getallorgandusers", {
                qydata: "{orgcode:'" + result.data.orgid + "'}"
            }, function (data) {
                if (data.result != "true") {
                    errorHint("获取运维人员失败");
                    return;
                }
                //console.log(data);

                getUsers(data.data, result.data.roles);

                //最后加载最近联系人
                //获取最近联系人
                YYIMChat.getRecentDigset({
                    success:function(result){
                        //console.log(result);
                        result.list.forEach(function(ele,index){
                            if(ele.type!="chat"||!ele.lastMessage||ele.state!="exists"){
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

                //orgdata = data.data;
                //var html = createOrgHtml(data.rootNode.ORGCODE,data.data);
                //$(".content>.org-list").html(html);

                //展开一级节点
                //$("#chat-pannel .org-list .org-org .org-org-head").trigger("click");
            })
        })
    }

    function getOrgs(list) {
        var html = EJSObj.e_templateHtml("orghtml.ejs", "/ism/chat/template/orghtml.ejs", {list: list});
        $(".list-content>.org-list").html(html);
        $(".list-content>.org-list >.org-org>.org-org-head>.trangle").addClass("changedirection");
    }

    function getUsers(list, roles) {
        var html = "";
        for (var i = 0; i < list.length; i++) {
            html = EJSObj.e_templateHtml("userhtml.ejs", "/ism/chat/template/userhtml.ejs", {data: list[i]});

            $(".list-content>.org-list .org-org[rolecode='" + list[i].ROLE + "']")
                .children(".org-org-list").append(html);

        }
    }


    //function getOrgAndPerson(orgcode) {
    //    //console.log(orgcode)
    //    if (orgdata)
    //        return createOrgHtml(orgcode, orgdata);
    //}

//生成组织  人员  树
//    function createOrgHtml(orgcode, orgdata) {
//        try {
//            var item = '', orghtml = '', userhtml = '';
//            for (var i = 0; i < orgdata.length; i++) {
//                item = orgdata[i];
//
//                if (item.UPORGCODE == orgcode) {
//                    if (item.NODETYPE == 0) {
//                        var obj = {};
//                        obj.orgcode = item.ORGCODE;
//                        obj.orgname = item.ORGNAME;
//                        orghtml += EJSObj.e_templateHtml("orghtml.ejs", "/ism/chat/template/orghtml.ejs", {data: obj});
//                        obj = null;
//                    } else {
//                        var obj = {};
//                        obj.username = item.USERNAME;
//                        obj.name = item.REALNAME;
//                        obj.intro = item.DEPARTMENT;
//                        obj.photo = item.PHOTO;
//                        obj.tel = item.MOBILE;
//                        userhtml += EJSObj.e_templateHtml("userhtml.ejs", "/ism/chat/template/userhtml.ejs", {data: obj});
//                        obj = null;
//                    }
//                }
//
//            }
//            return userhtml + orghtml;
//        } catch (e) {
//            //console.log("createOrgHtml 发生错误");
//            //console.log(e);
//        }
//    }

    return {getOrgTree: getOrgTree};
})