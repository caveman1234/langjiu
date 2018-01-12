<template>
    <div class="AccountMgr">
        <div class="imgContainer">
            <div class="titleImg">
                <div class="bank"
                    :style='{backgroundImage:`url(${langImg})`}'></div>
                <div class="lang"
                    :style='{backgroundImage:`url(${bankImg})`}'></div>
            </div>
            <div class="text">本界面将导航到民生银行提供的专属账户管理界面！</div>
            <div class="btn">
                <el-button @click="goMgr"
                    size="small"
                    type="primary">账户管理</el-button>
            </div>
        </div>

        <!-- <form v-show="false"
            id="bankForm"
            method="post"
            action="http://111.205.207.144:7003/ecp/htmlMhtInFwd/forward">
            <button id="bankFormSubmit"
                type="submit">提交</button>
        </form> -->
    </div>
</template>
<script>
export default {
    name: 'AccountMgr',
    data() {
        return {
            bankImg: require('../../../../assets/bank.png'),
            langImg: require('../../../../assets/lang.jpeg'),
        }
    },
    methods: {
        goMgr() {
            let isSign = this.$store.state.isSign;
            if(!isSign){
                this.$store.commit('CheckCustomerInfoIsVisiable', true);
            }
        },
        goAssign() {
            //去签约
        }
    },
    mounted() {
        // this.$store.commit('changeCurrentNav', { hash: '/AccountMgr' });
    }
}
</script>
<style lang="scss">
@import "./AccountMgr.scss";
</style>

