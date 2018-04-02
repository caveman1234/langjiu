<template>
  <div class="Others">
    <div class="userLeft">
      <div class="userIcon">
        <img :src="msgItem.headImgUrl || defaultHeaderImg" alt="">
      </div>
    </div>
    <div class="userRight">
      <div class="userRightTitle">
        <span style="margin-right:15px;">客服：{{msgItem.userName}}</span>
        <span>时间：{{msgItem.time | formatDateTime}}</span>
      </div>
      <div class="userRightContent">
        {{msgItem.message}}
      </div>
    </div>
  </div>
</template>
<script>
let defaultHeaderImg = require('../img/defaultHeaderImg.jpeg');
export default {
  name: 'Others',
  props: {
    msgItem: {
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultHeaderImg: defaultHeaderImg
    }
  }
}
</script>
<style lang="scss">
@import "./Others.scss";
</style>

