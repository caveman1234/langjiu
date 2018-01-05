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
        initUsername() {
            let _this = this;
            let cookies = new _this.$util.Cookies();
            //设置登陆名字
            _this.$nextTick(() => {
                _this.$store.commit('userloginName', cookies.getCookie('customerName'));
            });
        }
    },
    mounted() {
        this.initUsername();
    }
}
</script>

<style lang="scss">
/* 全局css */

@import './css/style.scss';









/* App样式 */

@import './css/App.scss';
</style>

