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
        initUserName(){
            debugger
            let username = this.$store.state.username;
            let cookies = new this.$util.Cookies();
            let customerName = cookies.getCookie('customerName'); 
            let customerId = cookies.getCookie('customerId'); 
            this.$store.commit('userloginName',customerName);
            this.$store.commit('setCustomerId',customerId);
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

