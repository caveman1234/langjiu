import Others from './Others/Others';
import Mine from './Mine/Mine';
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
                userName: '小郎酒事业部',//用户名
                headImgUrl: '',//用户头像
                message: '消息22222',//消息内容
                imgUrl: 'http://www.img.com',//图片地址
                fileUrl: 'http://www.file.com',//文件地址
                isImg: false,//是否图片
                isFile: false,//是否文件
                isText: true,//是否文本
                isMine: false//是否是自己的消息
            }
        ]
    }
];

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
            dialogVisible1: this.dialogVisible,
            activeNames: ['1', '2', '3', '4'],
            selectedUser: '270122',//聊天选中的用户
            totalMsg: totalMsg,//所有的聊天信息
            currentMsg: totalMsg[0],//当前的客服消息
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
        },
        open() {

        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
    },
    watch: {
        dialogVisible(val) {
            this.dialogVisible1 = val;
        },
        //监听选择客服的变化
        selectedUser(val) {
            console.log(val);
        }
    },
    mounted() {


    }
}