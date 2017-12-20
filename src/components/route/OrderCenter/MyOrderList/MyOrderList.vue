<template>
    <div class="MyOrderList">
        <div class="topList">
            <el-tabs @tab-click="tabClick" tab-position="top">
                <el-tab-pane label="全部订单"></el-tab-pane>
                <el-tab-pane label="暂存订单"></el-tab-pane>
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
                default:
                    this.$router.push({ path: '/TotalOrder' });
                    break;
            }
         }
    }
}
</script>
<style lang="scss">
@import './MyOrderList.scss';
</style>

