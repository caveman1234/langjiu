<template>
    <div class="Header">
        <div class="headerTop">
            <div class="content clearfix">
                <div class="left">
                    全国统一客服热线：400-806-6969
                </div>
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
                    <img :src="logoImg"
                        alt="">
                </div>

                <div class="nav">
                    <ul>
                        <template v-for="(item,index) in navList">
                            <router-link :to="item.routeTo"
                                :key="index">
                                <li @click="headerClick(index)"
                                    :class="[item.hasSelected?'navItemSelected':'']">{{item.name}}</li>
                            </router-link>
                        </template>
                    </ul>
                </div>
                <div v-show="false" class="notice">
                    <el-alert title="警告：账户未签约"
                        type="warning"
                        show-icon>
                    </el-alert>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'Vuex';
export default {
    name: 'Header',
    data() {
        return {
            searchInfo: "",
            logoImg: require('../../../assets/logo.jpg'),
            state: this.$store.state
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
        }

    },
    computed: {
        ...mapState({
            purchaseCount(state) {
                return state.purchaseCount;
            },
            navList(state) {
                return state.navList
            }
        })
    },
    mounted() {
        let cookies = new this.$util.Cookies();
        this.$store.commit('userloginName', cookies.getCookie('customerName'));
        this.$store.commit('setCustomerId', cookies.getCookie('customerId'));
        //登陆用户名-修改密码
        this.$store.commit('changeUsername', cookies.getCookie('username'));
    }

}
</script>
<style lang="scss">
@import "./Header.scss";
</style>

