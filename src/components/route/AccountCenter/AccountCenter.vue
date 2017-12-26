<template>
    <div class="AccountCenter">
        <div class="leftList">
            <el-tabs v-model="tabModel" @tab-click="tabClick" tab-position="left">
                <el-tab-pane label="我的资产" name='one'></el-tab-pane>
                <el-tab-pane label="未发货金额" name='tow'></el-tab-pane>
                <el-tab-pane label="融资信息" name='three'></el-tab-pane>
                <el-tab-pane label="在线充值" name='fore'></el-tab-pane>
                <el-tab-pane label="付款信息" name='five'></el-tab-pane>
                <el-tab-pane label="民生银行账户管理" name='six'></el-tab-pane>
            </el-tabs>
        </div>
        <div class="AccountContainer">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountCenter',
    data() {
        return {
            userInfoImg: 'src/assets/goodsItem.png',
            tabModel:'one'
        }
    },
    methods: {
        tabClick(tab) {
            let index = tab.index;
            switch (index) {
                case '0':
                    this.$router.push({ name: 'MyProperty' })
                    break;
                case '1':
                    this.$router.push({ name: 'NotDeliver' })
                    break;
                case '2':
                    this.$router.push({ name: 'FinancingInfo' })
                    break;
                case '3':
                    this.$router.push({ name: 'OnlineRecharge' })
                    break;
                case '4':
                    this.$router.push({ name: 'PaymentInfo' })
                    break;
                case '5':
                    this.$router.push({ name: 'AccountMgr' })
                    break;
            }
        }
    },
    mounted() {
        this.$store.commit('changeCurrentNav', { hash: '/AccountCenter' });
    }
}
</script>
<style lang="scss">
@import "./AccountCenter.scss";
</style>

