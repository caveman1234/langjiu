define(['sys_config', 'right_pannel'], function(sys_config, chat) {
    //判断是否登录
    IsLogin = { logined: false, USERNAME: "", realName: "", attachmentfileId: "", lastone: 0 };

    //登录
    function YYIMChatLogin(userName, userPwd) {

        try {
            $.post(sys_config.ApiBaseUrl + "login_zt", {
                    "qydata": "{\"username\":\"" + userName + "\",\"userpwd\":\"" + userPwd + "\"}"
                },
                function(e, status) {
                    //console.log(e.data.REALNAME);

                    if (e.result == null) {
                        //console.log("服务器错误");
                        return;
                    }

                    if (e.result != "true") {
                        //console.log(e.msg);
                        return;
                    }
					
                    IsLogin.realName = e.data.REALNAME;
                    IsLogin.USERNAME = e.data.USERNAME;

                    account.avstar = e.data.PHOTO;

                    YYIMChat.login(userName, e.data.token);
                    sys_config.ImInfo.token = e.data.token;
                });

        } catch (e) {
            //console.log("登陆成功事件:" + e);
        }
    }

    var flag_relogin = false;

    //初始化
    function initIMSDK() {
        try {
            YYIMChat.init({
                onOpened: function() {
                    IsLogin.logined = true;
                    //console.log("登录成功");
                    YYIMChat.setPresence();
                    $(".containner .left-pannel .errorhint").remove();
                    if (!flag_relogin) {
                        //查找是否有特定的文件群      _attachmentFile
                        YYIMChat.getChatGroups({
                            success: function(result) {
                                //console.log(result)
                                //result = JSON.parse(result);

                                for (var i = 0; i < result.roomItems.length; i++) {
                                    if (result.roomItems[i].name == "_special_attachmentFile") {
                                        IsLogin.attachmentfileId = result.roomItems[i].id;
                                        //console.log(result.roomItems[i].id);
                                        return;
                                    }
                                }

                                //创建群   _attachmentFile
                                YYIMChat.createChatGroup({
                                    name: "_special_attachmentFile",
                                    members: [account.userName],
                                    success: function(data) {
                                        //console.log(data)
                                        IsLogin.attachmentfileId = data.id;
                                    },
                                    error: function(e) {
                                        //console.log(e);
                                    }
                                })
                            }
                        })

                        //获取最近联系人
                        YYIMChat.getRecentDigset({
                            success: function(result) {
                                //console.log(result);
                                var latesttime = 0;
                                var lastone;

                                result.list.forEach(function(ele, index) {
                                    if (ele.type == "groupchat" || !ele.lastMessage || ele.state != "exists")
                                        return;
                                    //未读消息
                                    if (latesttime < ele.lastMessage.dateline &&
                                        ele.readedVersion == ele.sessionVersion) { //默认
                                        latesttime = ele.lastMessage.dateline;
                                        lastone = index;
                                    }
                                })
                                sys_config.lastone = result.list[lastone].id;


                                result.list.forEach(function(ele, index) {

                                    if (ele.type == "groupchat" || !ele.lastMessage || ele.state != "exists")
                                        return;
                                    ele.lastMessage.from = ele.id;
                                    ele.lastMessage.readedVersion = ele.readedVersion;
                                    setTimeout(function() {
                                        chat.ReceiveMsg(ele.lastMessage.data.contentType, ele.lastMessage, true);
                                    }, 100);

                                })

                                ////默认点击最新聊天人
                                //$(".left-pannel-content .person[flagid='"+sys_config.lastone+"']").trigger("click");

                            }
                        })
                    }

                }, // 登录成功
                onExpiration: function(callback) {
                    //自动更新token
                    //callback(token, expiration);
                },
                onClosed: function(arg) {
                    //连接关闭
                    //console.log(arg)
                },
                onConflicted: function(arg) {
                    //登陆冲突
                    //console.log(arg);
                    errorHint("通讯连接冲突，请刷新重试!");
                },
                onClientKickout: function(arg) {
                    //被他端踢掉
                    //console.log(arg)
                    errorHint("通讯连接冲突，请刷新重试!");
                },
                onUpdatePassword: function(arg) {
                    //更改密码，被踢掉
                    //console.log(arg)
                },
                onAuthError: function(arg) {
                    //登陆认证失败
                    //console.log(arg)
                    errorHint("通讯连接失败，请刷新重试!");
                },
                onConnectError: function(arg) {
                    //连接失败
                    //console.log(arg)
                    errorHint("通讯连接失败，请刷新重试!");
                    flag_relogin = true;
                },
                onReceipts: function(arg) {
                    //消息回执
                    //console.log(arg)
                },
                onSubscribe: function(arg) {
                    //发生订阅
                    //console.log(arg)
                },
                onRosterFavorited: function(arg) {
                    //被收藏
                    //console.log(arg)
                },
                onRosterUpdateded: function(arg) {
                    //好友信息更改
                    //console.log(arg)
                },
                onMessage: function(arg) {
                    //收到消息
                    //console.log(arg);
                    chat.ReceiveMsg(arg.data.contentType, arg)
                },
                onGroupUpdate: function(arg) {
                    //群组更新
                    //console.log(arg)
                },
                onKickedOutGroup: function(arg) {
                    //群成员被群主提出
                    //console.log(arg)
                },
                onTransferGroupOwner: function(arg) {
                    //群主转让
                    //console.log(arg)
                },
                onPresence: function(arg) {
                    //好友presence改变
                    //console.log(arg)
                },
                onRosterDeleted: function(arg) {
                    //好友被删除
                    //console.log(arg)
                },
                onPubaccountUpdate: function(pubaccounts) {
                    //公共号信息更新
                    //console.log(arg)
                },
                onTransparentMessage: function(arg) {
                    //透传业务消息
                    //console.log(arg)
                }
            });

            YYIMChat.initSDK({
                app: sys_config.ImInfo.appId, //appId
                etp: sys_config.ImInfo.etpId, //sys_config.ImInfo.etpId, //etpId
                wsurl: "47.100.200.251", //websocket Url
                wsport: 5222, //websocket port 5227/5222/5225
                hbport: 7070, //httpbind  port 7075/7070
                servlet: "https://c.langjiu.cn/", //rest Url
                flash_swf_url: '', //flash 上传 swf文件位置
                logEnable: false, //client log
                clientMark: 'web' //client mark 'web' or 'pc'
            });
        } catch (err) {
            //console.log("SDKInit:" + err);
        }
    };

    initIMSDK();
    return { YYIMChatLogin: YYIMChatLogin, IsLogin: IsLogin }
})