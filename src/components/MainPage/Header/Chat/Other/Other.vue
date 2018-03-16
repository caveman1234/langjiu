<template>
    <div class="MsgOther">
        <div class="userInfo">
            <div class="name">{{itemData.userName}}</div>
            <div class="time">{{itemData.dateline | formatChatTime}}</div>
        </div>
        <div class="msgContent">
            <div class="text">{{itemData.content}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Other',
    props: {
        itemData: {
            default() {
                return {
                    dateline: 1521038861661,
                    content: '测试内容1',
                    chatId: 'chenghao2',
                    userName: '名称1'
                }
            }
        }
    },
    filters: {
        formatChatTime(value) {
            if (!value) return '';
            let date = new Date(value);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            let day = (date.getDate() + 1) < 10 ? '0' + (date.getDate()) : (date.getDate());
            let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            let formatDate = [year, month, day];
            let fromatTime = [hours, minute, seconds];
            return formatDate.join('/') + '  ' +  fromatTime.join(':');
        }
    }
}
</script>
<style lang="scss">
@import './Other.scss';
</style>
