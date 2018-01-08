<template>
    <div class="MyOrderList">
        <div class="topList">
            <el-tabs @tab-click="tabClick"
                tab-position="top"
                v-model="currentChecked">
                <el-tab-pane label="全部订单"
                    name="total"></el-tab-pane>
                <el-tab-pane label="待审核订单"
                    name="waitCheck"></el-tab-pane>
                <el-tab-pane label="审核通过"
                    name="checkPass"></el-tab-pane>
                <el-tab-pane label="审核不通过"
                    name="notCheckPass"></el-tab-pane>
                <el-tab-pane label="已完成"
                    name="complete"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="searchBox">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MyOrderList',
    data() {
        return {
            currentChecked: 'total'
        }
    },
    methods: {
        tabClick(tab) {
            let index = tab.index;
            switch (index) {
                case '0':
                    this.$router.push({ path: '/TotalOrder' });
                    break;
                case '1':
                    this.$router.push({ path: '/SavedOrder' });
                    break;
                case '2':
                    this.$router.push({ path: '/CheckPass' });
                    break;
                case '3':
                    this.$router.push({ path: '/NotCheckPass' });
                    break;
                case '4':
                    this.$router.push({ path: '/Complete' });
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
        let _this = this;
        let from = _this.$route.params.from;
        switch (from) {
            case 'Home':
                _this.currentChecked = 'waitCheck';
                break;
            default:
                _this.currentChecked = 'total';
        }
    }
}
</script>
<style lang="scss">
@import './MyOrderList.scss';
</style>

