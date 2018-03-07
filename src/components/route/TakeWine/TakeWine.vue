<template>
    <div class="TakeWine">
        <div class="leftList">
            <el-tabs @tab-click="tabClick" tab-position="left" v-model="currentCheck">
                <el-tab-pane label="借酒单" name="takeWineList"></el-tab-pane>
                <el-tab-pane label="还酒单" name="returnWineList"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="orderContainer">
            <keep-alive :include="['ReturnWineEdit']">
                <router-view/>
            </keep-alive>
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
    },
    mounted(){
        this.$store.commit('changeCurrentNav', { hash: '/TakeWine' });
    }
}
</script>
<style lang="scss">
@import './TakeWine.scss';
</style>
