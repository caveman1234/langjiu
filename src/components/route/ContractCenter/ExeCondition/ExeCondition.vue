<template>
    <div class="ExeCondition">
        <el-table v-show="false" :row-key="rowKey" :expand-row-keys="[1]" :data="tableData" style="width:100%;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.children">
                        <el-table-column label="产品线" prop="name"></el-table-column>
                        <el-table-column label="合同量" prop="vol"></el-table-column>
                        <el-table-column label="达成量" prop="reach"></el-table-column>
                        <el-table-column label="达成率" prop="ratio">
                            <template slot-scope="scope">
                                <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.ratio"></el-progress>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="事业部" prop="name"></el-table-column>
            <el-table-column label="合同量" prop="vol"></el-table-column>
            <el-table-column label="达成量" prop="reach"></el-table-column>
            <el-table-column label="达成率" prop="ratio">
                <template slot-scope="scope">
                    <el-progress type='circle' :percentage="scope.row.ratio" :status="scope.row.ratio==100?'success':''  "></el-progress>
                </template>
            </el-table-column>
        </el-table>
        <div style="font-size:50px;font-size: 50px;color: #999999;">即将开放,敬请期待......</div>
        <BankList @receiveSelectedBank="receiveSelectedBank" :dialogVisible.sync="dialogVisible"></BankList>
        <el-button v-show="false" @click="func">click me</el-button>
    </div>
</template>
<script>
import BankList from '@/components/commonComp/BankList/BankList';
let tableData = [
    {
        name: '小郎酒事业部',
        vol: 3000000.00,
        reach: 2000000.00,
        ratio: 66,
        index: 1,
        children: [
            {
                name: '53度小郎酒',
                vol: 1000000.00,
                reach: 500000.00,
                ratio: 50,
            },
            {
                name: '68度小郎酒',
                vol: 1000000.00,
                reach: 500000.00,
                ratio: 50,
            }
        ]
    },
    {
        name: '郎牌特曲事业部',
        vol: 3000000.00,
        reach: 2000000.00,
        ratio: 100,
        index: 2,
        children: [
            {
                name: '53度小郎酒',
                vol: 1000000.00,
                reach: 800000.00,
                ratio: 80,
            },
            {
                name: '68度小郎酒',
                vol: 1000000.00,
                reach: 200000.00,
                ratio: 20,
            }
        ]
    }
];
export default {
    name: 'ExeCondition',
    components:{BankList},
    data() {
        return {
            tableData: tableData,
            dialogVisible:false
        }
    },
    methods: {
        func(){
            this.dialogVisible = true;
        },
        receiveSelectedBank(selectedBank){
            console.log(selectedBank);
        },
        rowKey(data) {
            return data.index
        }
    }
}
</script>
<style lang="scss" scoped>
@import './ExeCondition';
</style>