<template>
    <div class="MsgCenter">
        <MsgItem></MsgItem>
        <MsgItem></MsgItem>
        <MsgItem></MsgItem>
        <MsgItem></MsgItem>
    </div>
</template>
<script>
import MsgItem from './MsgItem/MsgItem';
export default {
    name: 'MsgCenter',
    components: { MsgItem },
    data() {
        return {}
    },
    mounted() {
        this.$store.commit('changeCurrentNav', { hash: '/MsgCenter' });
    }
}
</script>
<style lang="scss" scoped>
@import "./MsgCenter.scss";
</style>

