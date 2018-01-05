<template>
    <div class="ContractCenter">
        <div class="leftList">
            <el-tabs @tab-click="tabClick" tab-position="left" v-model="tabModel">
                <el-tab-pane label="合同执行情况" name="ExeCondition"></el-tab-pane>
                <el-tab-pane label="合同签订" name="Sign"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="contractContainer">
            <component :is="comp"></component>
        </div>
    </div>
</template>
<script>
import ExeCondition from './ExeCondition/ExeCondition';
import Sign from './Sign/Sign';
export default {
    name: 'ContractCenter',
    data() {
        return {
            tabModel: 'ExeCondition',
            comp: ExeCondition
        }
    },
    methods: {
        tabClick(tab) {
            let _this = this;
            let index = tab.index;
            switch (index) {
                case '0':
                    _this.comp = ExeCondition;
                    break;
                case '1':
                    _this.comp = Sign;
                    break;
            }
        }
    },
    mounted(){
        let _this = this;
        _this.$store.commit('changeCurrentNav', { hash: '/ContractCenter' });
    }
}
</script>
<style lang="scss">
@import './ContractCenter.scss';
</style>

