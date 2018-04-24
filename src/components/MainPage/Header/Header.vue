<template>
    <div class="Header">
        <div class="headerTop">
            <div class="content clearfix">
                <div class="left">
                    全国统一客服热线：400-806-6969
                </div>
                <!-- <i @click="openMask" class="icon iconfont lj-msg headerMessage">
                </i> -->
                <!-- <span id="operation"></span> -->
                <!-- <a id="operation" title="运维消息" href="javascript:void (0);" class="navbar-avatar">
                    <div class="u-badge" data-badge="0">
                        <i class="icon iconfont lj-msg headerMessage"></i>
                    </div>
                </a>            -->
                <div class="right">
                    <span>欢迎:{{$store.state.userloginName}}</span>
                    <a @click="logOut">注销</a>
                    <a @click="changePwd">修改密码</a>
                </div>
            </div>
        </div>
        <div class="headerBottom">
            <div class="content clearfix">
                <div class="logo">
                    <img :src="logoImg" alt="">
                </div>

                <div class="nav">
                    <ul>
                        <template v-for="(item,index) in navList">
                            <router-link :to="item.routeTo" :key="index">
                                <li @click="headerClick(index)" :class="[item.hasSelected?'navItemSelected':'']">{{item.name}}</li>
                            </router-link>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <form v-show="false" id="bankForm" method="post" action="http://111.205.207.144:7003/ecp/htmlMhtInFwd/forward">
            <button id="bankFormSubmit" type="submit">提交</button>
        </form>
        <CheckCustomerInfo></CheckCustomerInfo>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'Vuex';
import CheckCustomerInfo from './CheckCustomerInfo/CheckCustomerInfo.vue';
export default {
    name: 'Header',
    components: { CheckCustomerInfo },
    data() {
        return {
            searchInfo: "",
            logoImg: require('../../../assets/logo.jpg'),
            state: this.$store.state,
            messageMaskVisiable: false,//聊天层是否可见
        }
    },
    methods: {
        ...mapMutations({
            changeCurrentNav: 'changeCurrentNav'
        }),
        headerClick(index) {
            this.changeCurrentNav({ index });

        },
        search() {
            console.log(this.searchInfo.trim());
        },
        routeToPurchaseBills() {
            this.$router.push({ name: 'PurchaseBills', params: {} });
            this.$store.commit('changeCurrentNav', { hash: '' })
        },
        logOut() {
            let _this = this;
            $('#chat-pannel').css('right', '-210px');
            $('#chat-dialog').hide();

            //清空cookies
            let cookies = new this.$util.Cookies();
            cookies.clear().then(res => {
                _this.$router.push('Login');
                //清空ID
                _this.$store.commit('setCustomerId', '');
                //清空用户名
                _this.$store.commit('changeUsername', '');
            });
        },
        changePwd() {
            this.$router.push({ name: 'ChangePassword' });
        },
        //检查是否签约过
        checkIsNotSign() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            let url = '/ocm-web/api/base/customer/isSign';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.data.isSign === 0) {
                        //未签约
                        _this.$store.commit('isSign', false);
                        _this.$store.commit('CheckCustomerInfoIsVisiable', true)
                        _this.$router.push({ name: 'AccountMgr', params: { to: 'AccountMgr' } });
                    } else {
                        _this.$store.commit('isSign', true);
                    }
                });
        },
        //去签约页面
        goSigin() {
            let _this = this;
            // _this.$Notification({
            //     title: '请签约',
            //     type: 'warning',
            //     duration: 0,
            //     offset: 90
            // });

            _this.$confirm('你还没有与银行签约，是否去签约?', '未签约', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning',
                center: true,
                dangerouslyUseHTMLString: true,
                message: '<div style="font-size:18px">你还没有与银行签约，是否去签约?</div>'
            }).then(() => {
                _this.goMgr();
            }).catch(() => {

            });
        },
        goMgr() {
            //去管理
            let _this = this;
            let params = {
                clientId: this.$store.state.customerId
            };
            debugger
            _this.$http.post('/ocm-web/api/cmbc/queryCustomerInfo', params)
                .then(res => {
                    debugger
                    if (res.headers['x-ocm-code'] == '1') {
                        let bankForm = document.querySelector('#bankForm');
                        let bankFormSubmit = document.querySelector('#bankFormSubmit');
                        let params = res.data.reduce((acc, v) => {
                            acc[v.name] = v.value;
                            return acc;
                        }, {});
                        Object.keys(params).forEach(key => {
                            if (key != 'forwardUrl') {
                                let input = document.createElement('input');
                                input.setAttribute('name', key);
                                input.value = params[key];
                                bankForm.appendChild(input);
                            }
                        });
                        //url  地址
                        debugger
                        let forwardUrl = params.forwardUrl;
                        bankForm.setAttribute('action', forwardUrl);
                        document.forms.bankForm.submit();
                        // bankFormSubmit.click();
                    }

                });
        },
        //打开聊天遮罩
        openMask() {
            // let isHide = $('#chat-pannel').css('right') === '0px' ? false : true;
            $('.hidden-toolbar').trigger('click');
            $('#empty-panel').show();
        },
        //关闭聊天遮罩 
        closeMask(e) {
            this.messageMaskVisiable = false;
        },
        //初始化，登陆聊天
        initChat() {
            console.log('header---initchat----');
            debugger
            let scripts = `<script src="./static/chat/webim_require.js" />
                <script src="./static/chat/jquery.js"/>

                <script src="./static/chat/jquery.json.js"/>

                <script src="./static/chat/jquery-ui.js"/>
                <script type="text/javascript" src="./static/chat/jquery.mousewheel.min.js"/>
                <script type="text/javascript" src="./static/chat/jquery.iviewer.min.js"/>
                <script src="./static/chat/YYIMSDK.js"/>
                <script src="./static/chat/webim_chat.js" async/>`;
            if($('script[src="./static/chat/webim_require.js"]').length === 0){
                $('body').append(scripts);
            }else{
                $('script[src="./static/chat/webim_require.js"]').remove();
                $('script[src="./static/chat/jquery.js"]').remove();
                $('script[src="./static/chat/jquery.json.js"]').remove();
                $('script[src="./static/chat/jquery-ui.js"]').remove();
                $('script[src="./static/chat/./static/chat/jquery.mousewheel.min.js"]').remove();
                $('script[src="./static/chat/jquery.iviewer.min.js"]').remove();
                $('script[src="./static/chat/YYIMSDK.js"]').remove();
                $('script[src="./static/chat/webim_chat.js"]').remove();
                 $('body').append(scripts);
            }
        }

    },
    computed: {
        ...mapState({

            navList(state) {
                return state.navList
            }
        })
    },
    mounted() {
        let _this = this;
        let cookies = new this.$util.Cookies();
        this.$store.commit('userloginName', cookies.getCookie('customerName'));
        this.$store.commit('setCustomerId', cookies.getCookie('customerId'));
        //登陆用户名-修改密码
        this.$store.commit('changeUsername', cookies.getCookie('username'));
        //检查是否签约过
        _this.checkIsNotSign();
        // _this.initChat();
    }

}
</script>
<style lang="scss">
@import "./Header.scss";
</style>

