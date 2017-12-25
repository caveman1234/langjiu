<template>
    <div class="MainPage">
        <Vheader></Vheader>
        <div class="routeContainer">
            <keep-alive :include="['GenerateBillsEdit']">
                <router-view/>
            </keep-alive>
        </div>
        <Vfooter></Vfooter>
    </div>
</template>
<script>
import Vheader from "@/components/MainPage/Header/Header.vue";
import Vfooter from "@/components/MainPage/Footer/Footer.vue";
export default {
    name: 'MainPage',
    components: { Vheader, Vfooter },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import "./MainPage.scss";
</style>

