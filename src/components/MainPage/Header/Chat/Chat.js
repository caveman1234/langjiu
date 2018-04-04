import Others from './Others/Others';
import Mine from './Mine/Mine';
/* 
企业ID 	quanyou 
应用ID 	liangjiu
应用名称 	liangjiuism
Client ID 	f2cb1ff19973ecf3b84b33536beec9de
Client Secret 	345B477C77BC6BEC658D1E96DAA9D9CE
*/
let totalMsg = [
    {
        notReadMsgCount: 2,//未收到的消息
        headImgUrl: '',//用户头像
        userName: '小郎酒事业部',//用户名
        code: '270122',//用户编码，用着发送消息的code
        customerId: 'sdfsdafdsdf',//经销商id
        msgList: [
            {
                time: 1522653439361,//
                userName: '小郎酒事业部',//用户名
                headImgUrl: '',//用户头像
                message: '消息11111',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: false//是否是自己的消息
            },
            {
                time: 1522653439361,//
                userName: '自己',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: true//是否是自己的消息
            },
            {
                time: 1522653439361,//
                userName: '小郎酒事业部',//用户名
                headImgUrl: '',//用户头像
                message: '消息11111',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: false//是否是自己的消息
            },
            {
                time: 1522653439361,//
                userName: '小郎酒事业部',//用户名
                headImgUrl: '',//用户头像
                message: '消息11111',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: false//是否是自己的消息
            },
            {
                time: 1522653439361,//
                userName: '小郎酒事业部',//用户名
                headImgUrl: '',//用户头像
                message: '消息11111',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: false//是否是自己的消息
            }
            ,
            {
                time: 1522653439361,//
                userName: '自己',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: true//是否是自己的消息
            }
            ,
            {
                time: 1522653439361,//
                userName: '自己',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: true//是否是自己的消息
            }
            ,
            {
                time: 1522653439361,//
                userName: '自己',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: true//是否是自己的消息
            }
            ,
            {
                time: 1522653439361,//
                userName: '自己',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: true//是否是自己的消息
            }

        ]
    }
];
let defaultCurrent = {
    notReadMsgCount: '',
    headImgUrl: '',
    userName: '',
    code: '',
    customerId: '',
    msgList: [],
};
let serviceUsers = [
    {
        questionName: '质量问题',
        notReadMsgCount: 0,
        code: '',
        questionUsers: [
            {
                username: '270122',
                name: '小郎酒',
                notReadMsgCount: 1,
                userImg: '',
            },
            {
                username: '270123',
                name: '青花郎',
                notReadMsgCount: 0,
                userImg: '',
            }
        ]

    },
    {
        questionName: '运输问题',
        notReadMsgCount: 0,
        code: '',
        questionUsers: [
            {
                username: '270124',
                name: '郎牌特曲',
                notReadMsgCount: 0,
                userImg: '',
            },
            {
                username: '270125',
                name: '大郎酒',
                notReadMsgCount: 0,
                userImg: '',
            }
        ]

    }
]
export default {
    components: { Others, Mine },
    name: 'Chat',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            // appId: 'liangjiu',//应用id 郎酒
            // etpId: 'quanyou',//企业id 郎酒
            appId: 'quanyouism',//应用id 全有
            etpId: 'quanyou',//企业id 全有
            clientId: 'f2cb1ff19973ecf3b84b33536beec9de',
            clientSecret: '345B477C77BC6BEC658D1E96DAA9D9CE',
            message: '',//待发送消息
            dialogVisible1: this.dialogVisible,
            selectedUser: '',//聊天选中的用户
            activeNames: [],
            totalMsg: [],//所有的聊天信息
            currentMsg: defaultCurrent,//当前的客服消息
            serviceUsers: serviceUsers
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
        },
        open() {
            let _this = this;
            _this.$nextTick(() => {
                _this.toBottom();
                $('#chatInputImg').change(function (e) {
                    _this.sendImg.call(_this, e);
                });
                $('#chatInputFile').change(function (e) {
                    _this.sendFile.call(_this, e);
                });

            })
        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
        //发送消息
        sendMsg(e) {
            let _this = this;
            if (_this.message.trim() == '') {
                return;
            }
            YYIMChat.sendTextMessage({
                to: _this.selectedUser,
                type: 'chat',
                msg: _this.message,
                style: {},
                extend: {
                    userName: '经销商二'
                },
                success(e) {
                    let message = e.data.content;
                    let time = e.data.dateline;
                    let msgItem = {
                        time: time,//
                        userName: '自己',//用户名
                        headImgUrl: '',//用户头像
                        message: message,//消息内容
                        imgUrl: '',//图片地址
                        fileUrl: '',//文件地址
                        isImg: false,//是否图片
                        isFile: false,//是否文件
                        isText: true,//是否文本
                        isMine: true//是否是自己的消息
                    }
                    _this.currentMsg.msgList.push(msgItem);
                    _this.message = '';
                    _this.toBottom();
                }
            });
        },
        //发送图片
        sendImgTrigger() {
            $('#chatInputImg').trigger('click');
        },
        sendImg(e) {
            let _this = this;
            YYIMChat.sendPic({
                chatInfo() {
                    return {
                        to: _this.selectedUser,
                        type: "chat",
                        extend: ''
                    }
                },
                fileInputId: "chatInputImg",
                success(e) {
                    let time = e.data.dateline;
                    let name = e.data.content.name;
                    let size = e.data.content.size;
                    debugger
                    _this.currentMsg.msgList.push({
                        time: time,//
                        userName: '自己',//用户名
                        headImgUrl: '',//用户头像
                        message: '',//消息内容
                        imgUrl: '',//图片地址
                        fileUrl: '',//文件地址
                        isImg: true,//是否图片
                        isFile: false,//是否文件
                        isText: false,//是否文本
                        isMine: true,//是否是自己的消息
                        name: name,
                        size: size
                    });
                    _this.$nextTick(() => {
                        $('.chatBody').scrollTop(10000)
                    })
                },
                error(e) {
                    debugger
                },
                progress(e) {
                    debugger
                }
            });
        },
        //发送文件
        sendFileTrigger() {
            $('#chatInputFile').trigger('click');
        },
        sendFile(e) {
            let _this = this;
            YYIMChat.sendFile({
                chatInfo() {
                    return {
                        to: _this.selectedUser,
                        type: "chat",
                        extend: ''
                    }
                },
                fileInputId: "chatInputFile",
                success(e) {
                    let time = e.data.dateline;
                    let name = e.data.content.name;
                    let size = e.data.content.size;
                    debugger
                    _this.currentMsg.msgList.push({
                        time: time,//
                        userName: '自己',//用户名
                        headImgUrl: '',//用户头像
                        message: '',//消息内容
                        imgUrl: '',//图片地址
                        fileUrl: '',//文件地址
                        isImg: false,//是否图片
                        isFile: true,//是否文件
                        isText: false,//是否文本
                        isMine: true,//是否是自己的消息
                        name: name,
                        size: size
                    });
                    _this.toBottom();
                },
                error(e) {
                    debugger
                },
                progress(e) {
                    debugger
                }
            });
        },
        initQuestionList() {
            let _this = this;
            let formData = new FormData();
            formData.append('username', "44b1052e90684e67b2ed8ae9aeda72e8");
            let headers = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
            let url = '/ism/api/getUserinfo';
            let serviceUsers = [];
            _this.$http.post(url, formData, headers)
                .then(res => {
                    if (Boolean(res.data.result) === true) {
                        serviceUsers = res.data.data.map(v => {
                            return {
                                questionName: v.rolename,
                                rolecode: v.rolecode,
                                notReadMsgCount: 0,
                                questionUsers: []
                            }
                        })
                        let formData = new FormData();
                        formData.append('username', "44b1052e90684e67b2ed8ae9aeda72e8");
                        let headers = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }
                        let url = '/ism/api/getUserinfo';
                    }
                });
        },
        toBottom() {
            let _this = this;
            _this.$nextTick(() => {
                $('.chatBody').scrollTop(10000)
            });
        }
    },
    watch: {
        dialogVisible(val) {
            this.dialogVisible1 = val;
        },
        //监听选择客服的变化
        selectedUser(code) {
            let _this = this;
            let defaultObj = {
                notReadMsgCount: '',
                headImgUrl: '',
                userName: '',
                code: code,
                customerId: '',
                msgList: [],
            };
            _this.currentMsg = _this.totalMsg.find(v => v.code == code) || defaultObj;
            _this.toBottom();

        }
    },
    computed: {
        isDisplayChat(){
            return this.selectedUser;
        }
    },
    mounted() {
        let _this = this;

        _this.activeNames = _this.serviceUsers.map((v, i) => i);


        YYIMChat.init({
            onOpened: function (e) {
                console.log('登录成功');
                // debugger
                // YYIMChat.getHistoryMessage({
                //     // id: _this.$store.state.username,
                //     id:'44b1052e90684e67b2ed8ae9aeda72e8',
                //     type: 'chat'
                // });
            },
            onClosed: function (e) {
                console.log('退出登陆');
            }, // 连接关闭
            onMessage: function (e) {
                debugger
                let code = e.from;
                let time = e.data.dateline;
                let userName = JSON.parse(e.data.extend).userName;
                let message = e.data.content;
                let fromMsg = _this.totalMsg.find(v => v.code == code);
                if (fromMsg) {
                    fromMsg.msgList.push({
                        time: time,//
                        userName: userName,//用户名
                        headImgUrl: '',//用户头像
                        message: message,//消息内容
                        imgUrl: '',//图片地址
                        fileUrl: '',//文件地址
                        isImg: false,//是否图片
                        isFile: false,//是否文件
                        isText: true,//是否文本
                        isMine: false,//是否是自己的消息
                    });
                } else {
                    _this.totalMsg.push({
                        notReadMsgCount: 0,//未收到的消息
                        headImgUrl: '',//用户头像
                        userName: userName,//用户名
                        code: code,//用户编码，用着发送消息的code
                        customerId: 'sdfsdafdsdf',//经销商id
                        msgList: [
                            {
                                time: time,//
                                userName: userName,//用户名
                                headImgUrl: '',//用户头像
                                message: message,//消息内容
                                imgUrl: '',//图片地址
                                fileUrl: '',//文件地址
                                isImg: false,//是否图片
                                isFile: false,//是否文件
                                isText: true,//是否文本
                                isMine: false,//是否是自己的消息
                            }
                        ]
                    })
                }

                _this.toBottom();
            }, // 接收到文本(表情)消息
            onPictureMessage: function (e) {
                debugger
            }, // 接收到图片
            onFileMessage: function (e) {
                debugger
            }, // 接收到文件
        });
        YYIMChat.initSDK({
            app: _this.appId, //appId
            etp: _this.etpId, //sys_config.ImInfo.etpId, //etpId
            wsurl: "172.30.3.15", //websocket Url
            wsport: 5222, //websocket port 5227/5222/5225
            hbport: 7070, //httpbind  port 7075/7070
            servlet: "http://172.30.3.15/", //rest Url
            flash_swf_url: '', //flash 上传 swf文件位置
            logEnable: false, //client log
            clientMark: 'web' //client mark 'web' or 'pc'
        });
        let params = {
            "username": _this.$store.state.username,
            "userpwd": "123456",
        };
        let formData = new FormData();
        formData.append('qydata', JSON.stringify(params));
        let headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        let url = '/ism/login';
        _this.$http.post(url, formData, headers)
            .then(res => {
                let result = res.data.result;
                let msg = res.data.msg;
                let userName = res.data.data.userName;
                let token = res.data.data.token;
                if (Boolean(result) === true) {
                    YYIMChat.login(userName, token);
                }
            });
        //获取问题列表
        // _this.initQuestionList();




    }
}