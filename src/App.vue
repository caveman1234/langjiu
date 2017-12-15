<template>
  <div id="app">
    <Vheader></Vheader>
    <div class="routeContainer">
      <router-view/>
    </div>
    <Vfooter></Vfooter>
  </div>
</template>

<script>
import Vheader from "@/components/MainPage/Header/Header.vue";
import Vfooter from "@/components/MainPage/Footer/Footer.vue";
export default {
  components: { Vheader, Vfooter },
  name: 'app'
}
</script>

<style lang="scss">
/* 全局css */

@import './css/style.scss';


/* App样式 */

@import './css/App.scss';
</style>

