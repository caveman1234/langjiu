<template>
  <div class="Mine">
    
    <div class="userRight">
      <div class="userRightTitle">
        <span style="margin-right:15px;">名称：{{msgItem.userName}}</span>
        <span>时间：{{msgItem.time | formatDateTime}}</span>
      </div>
      <div class="userRightContent">
        <template v-if="msgItem.isText">
          {{msgItem.message}}
        </template>
        <template v-if="msgItem.isImg">
          <span style="margin-right:10px;"><i class="el-icon-picture"></i> {{msgItem.name}}</span>
          <span>大小:{{((msgItem.size)/1000).toFixed(2)}}KB</span>
        </template>
        <template v-if="msgItem.isFile">
          <span style="margin-right:10px;"><i class="el-icon-document"></i> {{msgItem.name}}</span>
          <span>大小:{{((msgItem.size)/1000).toFixed(2)}}KB</span>
        </template>
        
      </div>
    </div>
    <div class="userLeft">
      <div class="userIcon">
        <img :src="msgItem.headImgUrl || defaultHeaderImg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
let defaultHeaderImg = require('../img/defaultHeaderImg.jpeg');
export default {
  name: 'Mine',
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
@import "./Mine.scss";
</style>

