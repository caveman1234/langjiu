<template>
    <div class="TakeWine">
        <div class="leftList">
            <el-tabs @tab-click="tabClick" tab-position="left" v-model="currentCheck">
                <el-tab-pane label="借酒列表" name="takeWineList"></el-tab-pane>
                <el-tab-pane label="还酒列表" name="returnWineList"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="orderContainer">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TakeWine',
    data() {
        return {
            currentCheck:"takeWineList"
        }
    },
    methods:{
        tabClick(tab){
            let _this = this;
            let index = tab.index;
            switch(index){
                case "0" :
                    _this.$router.push({ path: '/takeWineList' });
                    break;
                case "1" :
                    _this.$router.push({ path: '/returnWineList' });
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
@import './TakeWine.scss';
</style>
