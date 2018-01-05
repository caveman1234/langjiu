<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
import Vheader from "@/components/MainPage/Header/Header.vue";
import Vfooter from "@/components/MainPage/Footer/Footer.vue";
import MainPage from "@/components/MainPage/MainPage.vue";
export default {
    components: { Vheader, Vfooter, MainPage },
    name: 'app',
    data() {
        return {

        }
    },
    methods: {
        initUserName() {
            let _this = this;
            let username = _this.$store.state.username;
            let cookies = new _this.$util.Cookies();
            let customerName = cookies.getCookie('customerName');
            let customerId = cookies.getCookie('customerId');
            //设置header的登陆名字
            _this.$store.commit('userloginName', customerName);
            //设置经销商ID
            _this.$store.commit('setCustomerId', customerId);
        }
    },
    mounted() {
        this.initUserName();
    }
}
</script>

<style lang="scss">
/* 全局css */

@import './css/style.scss';







/* App样式 */

@import './css/App.scss';
</style>

