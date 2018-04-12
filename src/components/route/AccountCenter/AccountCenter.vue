<template>
    <div class="AccountCenter">
        <div class="leftList">
            <el-tabs v-model="currentChecked" @tab-click="tabClick" tab-position="left">
                <template v-for="(item,index) in tabArr">
                    <el-tab-pane :label="item.label" :name='item.name' :key="index"></el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="AccountContainer">
            <router-view />
        </div>
    </div>
</template>
<script>
let tabArr = [
    {
        label: '我的资产',
        name: 'MyProperty',
        routeName: 'MyProperty'
    },
    {
        label: '账户管理',
        name: 'AccountMgr',
        routeName: 'AccountMgr'
    },
    {
        label: '现金对账',
        name: 'CashCheck',
        routeName: 'CashCheck'
    },
    {
        label: '融资对账',
        name: 'FinatialCheck',
        routeName: 'FinatialCheck'
    },
    {
        label: '费用对账',
        name: 'CostCheck',
        routeName: 'CostCheck'
    },
    {
        label: '共建基金对账',
        name: 'BuildCheck',
        routeName: 'BuildCheck'
    },
    {
        label: '保证金对账',
        name: 'PromiseCheck',
        routeName: 'PromiseCheck'
    },
    {
        label: '直投对账',
        name: 'TakeWineCheck',
        routeName: 'TakeWineCheck'
    },
    {
        label: '待审核费用对账',
        name: 'WaitAuditCheck',
        routeName: 'WaitAuditCheck'
    },
    {
        label: '对账函',
        name: 'CheckBills',
        routeName: 'CheckBills'
    },
    {
        label: '电子发票下载',
        name: 'BillDownload',
        routeName: 'BillDownload'
    },
    // {
    //     label: '物流码下载',
    //     name: 'LogisticsDownload',
    //     routeName: 'LogisticsDownload'
    // },
    {
        label: '融资信息',
        name: 'FinancingInfo',
        routeName: 'FinancingInfo'
    },
    // {
    //     label: '在线充值',
    //     name: 'OnlineRecharge',
    //     routeName: 'OnlineRecharge'
    // },
    {
        label: '付款信息',
        name: 'PaymentInfo',
        routeName: 'PaymentInfo'
    },
    
    // {
    //     label: '我的信息',
    //     name: 'MyInfo',
    //     routeName: 'MyInfo'
    // },
];
export default {
    name: 'AccountCenter',
    data() {
        return {
            userInfoImg: 'src/assets/goodsItem.png',
            currentChecked: 'MyProperty',
            tabArr: tabArr
        }
    },
    methods: {
        tabClick(tab) {
            let index = tab.index;
            let { routeName } = this.tabArr[index];
            this.$router.push({ name: routeName });
        }
    },
    mounted() {
        let _this = this;
        this.$store.commit('changeCurrentNav', { hash: '/AccountCenter' });
        let to = _this.$route.params.to;
        switch (to) {
            case 'AccountMgr':
                _this.currentChecked = 'AccountMgr';
                break;
            case 'MyProperty':
                _this.currentChecked = 'MyProperty';
                break;
            case 'WaitAuditCheck':
                _this.currentChecked = 'WaitAuditCheck';
                break;
            default:
        }
    }
}
</script>
<style lang="scss">
@import "./AccountCenter.scss";
</style>

