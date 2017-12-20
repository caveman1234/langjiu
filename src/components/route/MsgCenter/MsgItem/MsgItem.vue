<template>
    <div class="MsgItem">
        <div class="msgTitle">{{msgItem.msgTitle}}</div>
        <div class="msgDate">{{msgItem.msgDate}}</div>
        <div class="msgBrief">{{msgItem.msgBrief}}</div>
    </div>
</template>
<script>
export default {
    name: 'MsgItem',
    props: {
        msgItem: {
            type: Object,
            default: function() {
                return {
                    msgTitle: '空中旅行邂逅清花郎 一起诉说大自然与时光的奥秘',
                    msgDate: '2017-01-01',
                    msgBrief: '12月，《中国之翼》、《东方航空》、《南方航空》、《云端》 等航机杂志刊登《清花郎，大自然与时光的恩赐》一文，当您在岁末的路途上，无论“回来”还是归去，在天空的旅程中翻开杂志，都可以看到青花郎与您相伴，诉说大自然与时光的奥秘。'
                }
            }
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import "./MsgItem.scss";
</style>

