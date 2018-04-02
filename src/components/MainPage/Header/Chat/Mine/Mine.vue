<template>
  <div class="Mine">{{msgItem.userName}}</div>
</template>
<script>
export default {
  name: 'Mine',
  props: {
    msgItem: {
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
@import "./Mine.scss";
</style>

