<template>
    <div class="OrderCenter">
        <div class="leftList">
            <el-tabs @tab-click="tabClick" tab-position="left" v-model="currentCheck">
                <el-tab-pane label="我的订单" name="TotalOrder"></el-tab-pane>
                <el-tab-pane label="填仓提货单" name="AddPickOrder"></el-tab-pane>
                <el-tab-pane label="发货通知单" name="DeliverList"></el-tab-pane>
                <el-tab-pane label="退订申请单" name="ReturnList"></el-tab-pane>
                <el-tab-pane label="未出货明细查询" name="notDeliverSearch"></el-tab-pane>
                
            </el-tabs>
        </div>
        <div class="orderContainer">
            <router-view @receiveCurrentCheck="receiveCurrentCheck"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderCenter',
    data() {
        return {
            currentCheck: 'TotalOrder'
        }
    },
    methods: {
        tabClick(tab) {
            let index = tab.index;
            switch (index) {
                case '0':
                    this.$router.push({ path: '/MyOrderList' });
                    break;
                case '1':
                    this.$router.push({ path: '/AddPickOrder' });
                    break;
                case '2':
                    this.$router.push({ path: '/DeliverList' });
                    break;
                case '3':
                    this.$router.push({ path: '/ReturnList' });
                    break;
                case '4':
                    this.$router.push({ path: '/NotDeliverSearch' });
                    break;
            }
        },
        clearSearchData() {
            this.orderCode = '';
            this.orderStatus = '0';
            this.orderDateRange = '';
        },
        searchData() { },
        receiveCurrentCheck(currentCheck){
            this.currentCheck = currentCheck;
        }
    },
    mounted() {
        this.$store.commit('changeCurrentNav', { hash: '/OrderCenter' });
        switch (this.$route.params.from) {
            case 'DeliverList':
                this.currentCheck = 'DeliverList';
                break;
            case 'ReturnList':
                this.currentCheck = 'ReturnList';
                break;
            case 'ApplySend':
                this.currentCheck = 'DeliverList';
                break;
            case 'ApplyReturn':
                this.currentCheck = 'ReturnList';
                break;
            default:
                this.currentCheck = 'TotalOrder';
        }

    }
}
</script>
<style lang="scss">
@import "./OrderCenter.scss";
</style>