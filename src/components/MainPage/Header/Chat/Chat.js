let tempMsgArr = [
    {
        "from": "chenghao2",
        "userName": "小郎酒",
        notReadCount: 2,
        "msgList": [{
            "dateline": 1521027717048,
            "content": "SB",
            "contentType": 2,
            "userName": "小郎酒"
        }, {
            "dateline": 1521027766735,
            "content": "SB",
            "contentType": 2,
            "userName": "小郎酒"
        }, {
            "dateline": 1521027766930,
            "content": "SB",
            "contentType": 2,
            "userName": "小郎酒"
        }, {
            "dateline": 1521027767160,
            "content": "SB",
            "contentType": 2,
            "userName": "小郎酒"
        }]
    }, {
        "from": "zongtengfei",
        "userName": "青花郎",
        notReadCount: 3,
        "msgList": [{
            "dateline": 1521027768974,
            "content": "SB1",
            "contentType": 2,
            "userName": "青花郎"
        }, {
            "dateline": 1521027769161,
            "content": "SB1",
            "contentType": 2,
            "userName": "青花郎"
        }, {
            "dateline": 1521027769339,
            "content": "SB1",
            "contentType": 2,
            "userName": "青花郎"
        }]
    }];
let productLineDataSource = [
    {
        name: '小郎酒',
        chatId: 'chenghao2'
    },
    {
        name: '青花郎',
        chatId: 'zongtengfei'
    }
];
import Other from './Other/Other';
import Myself from './Myself/Myself';
export default {
    components: {  Myself, Other },
    name: 'Chat',
    data() {
        return {
            //异步获取token
            token: '',
            //消息列表
            msgArr: [],//所有的消息
            /* [
                {
                    from:'',
                    userName:'',
                    notReadCount:'',
                    msgList:[
                        {
                            dateline:'',
                            content:'',
                            contentType:'',
                            userName:''
                        }
                    ]
                }
            ] */
            productLine: '',//选中的产品线
            productLineDataSource: productLineDataSource,//产品线下拉框
            sendMsgText: '',
            chatId: 'chenghao',
        }
    },
    methods: {
        closeMask() {
            this.$emit('closeMask');
        },
        //异步获取消息
        receiveMsg(e) {
            /*var e = {
                "id": "81CBF9B6-259B-436C-9FCF-80E4EA843D5D",
                "type": "chat",
                "from": "chenghao2",
                "data": {
                    "content": "SB",
                    "contentType": 2,
                    "dateline": 1521013469676,
                    "receiptsbody": {
                        "type": "long connection",
                        "receipts": true,
                        "arg": {
                            "from": "chenghao2.ljjingxiaoshang.qewqeqwe@im.yyuap.com/web-v2.0",
                            "id": "81CBF9B6-259B-436C-9FCF-80E4EA843D5D"
                        }
                    },
                    "extend": {
                        "userName": "经销商二"
                    },
                    "style": {}
                },
                "resource": "web-v2.0"
            }*/
            let _this = this;
            let exist = _this.msgArr.find(v => v.from == e.from);
            if (exist) {
                let tempSubObj = {
                    dateline: e.data.dateline,//时间
                    content: e.data.content,//内容
                    contentType: e.data.contentType,//类型
                    ...(e.data.extend || {})
                };
                exist.msgList.push(tempSubObj);
                exist.notReadCount = exist.msgList.length;
            } else {
                let tempObj = {
                    from: e.from,
                    userName: (e.data.extend || {}).userName || '默认用户',//用户名
                    notReadCount: 1,
                    msgList: [
                        {
                            dateline: e.data.dateline,//时间
                            content: e.data.content,//内容
                            contentType: e.data.contentType,//类型
                            ...(e.data.extend || {})
                        }
                    ]
                };
                _this.msgArr.push(tempObj);
            }
        },
        //获取token
        getToken() {
            let _this = this;
            //企业id
            let etpId = 'qewqeqwe';
            //应用id
            let appId = 'ljjingxiaoshang';
            let url = `https://im.yyuap.com/sysadmin/rest/${etpId}/${appId}/token`;
            let params = {
                "username": "chenghao",
                "clientId": "9d58652b60c6c37be116f257df4c53a5",
                "clientSecret": "2CBC0A3637CAF0A87CF92C0CC301358B"
            };
            return $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(params),
                contentType: 'application/json'
            }).done(res => {
                _this.token = res.token;
            })
        },
        //发送消息
        sendMsg() {
            let _this = this;
            var arg = {
                to: _this.productLine,
                type: 'chat',
                msg: _this.sendMsgText,
                style: {},
                extend: {
                    userName: '我是经销商'
                },
                success(e) {
                    _this.sendMsgText = '';
                    let exist = _this.msgArr.find(v => v.from == e.to);
                    if (exist) {
                        debugger
                        let tempSubObj = {
                            dateline: e.body.dateline,//时间
                            content: e.body.content,//内容
                            contentType: e.body.contentType,//类型
                            ...(e.data.extend || {})
                        };
                        exist.msgList.push(tempSubObj);
                    } else {
                        debugger
                        let tempObj = {
                            from: e.from,
                            userName: (e.body.extend || {}).userName || '默认用户',//用户名
                            notReadCount: 1,
                            msgList: [
                                {
                                    dateline: e.body.dateline,//时间
                                    content: e.body.content,//内容
                                    contentType: e.body.contentType,//类型
                                    ...(e.data.extend || {})
                                }
                            ]
                        };
                        _this.msgArr.push(tempObj);
                    }













                    _this.$nextTick(() => {
                        $('.chatContent').scrollTop(10000)
                    });

                }
            };
            YYIMChat.sendTextMessage(arg);
        }
    },
    watch: {
        productLine(chatId) {
            //监听产品线的变化
            let _this = this;
            let tempObj = {
                userName: _this.productLineDataSource.find(v => v.chatId == chatId).name,
                msgList: []
            };
        }
    },
    computed: {
        currentMsgObj() {
            let productLine = this.productLine;
            let currentObj = this.msgArr.find(v => v.from == productLine);
            return currentObj || { msgList: [] }
        }
    },
    mounted() {
        let _this = this;
        YYIMChat.initSDK('ljjingxiaoshang', 'qewqeqwe');
        YYIMChat.init({
            onOpened: function (e) {
                // debugger
                console.log('登录成功');
                YYIMChat.getOfflineMessage();
            }, // 登录成功
            onClosed: function (e) {
                console.log('退出登陆');
            }, // 连接关闭
            onAuthError: function (e) { }, // 认证失败
            onStatusChanged: function (e) { }, //连接状态改变
            onConnectError: function (e) { }, // 连接错误
            onPresence: function (e) { }, // 好友状态改变
            onSubscribe: function (e) { }, // 订阅处理
            onRosterUpdateded: function (e) { }, //联系人信息更新
            onRosterDeleted: function (e) { }, //被联系人删除
            onReceipts: function (e) { }, // 接收到消息回执
            onTextMessage: function (e) {
                _this.receiveMsg(e);

            }, // 接收到文本(表情)消息
            onPictureMessage: function (e) { }, // 接收到图片
            onFileMessage: function (e) { }, // 接收到文件
            onShareMessage: function (e) { }, //接收到分享消息
            onSystemMessage: function (e) { }, //接收到单图文消息
            onPublicMessage: function (e) { }, //接收到多图文消息
            onLocationMessage: function (e) { }, //接收到位置共享消息
            onAudoMessage: function (e) { }, //接收到语音消息
            onGroupUpdate: function (e) { }, //群组信息及成员信息更新
            onKickedOutGroup: function (e) { } //被群组踢出
        });
        setTimeout(() => {
            _this.getToken().done(res => {
                YYIMChat.login(
                    "chenghao", // 用户名
                    _this.token // 密码或token
                );
            });
        }, 500);
        _this.productLine = 'chenghao2';


    }
}