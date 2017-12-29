<template>
    <div class="CashCheck">
        <SearchComp :searchConfig="searchConfig" serverUrl="/ocm-web/api/b2b/query-balance/queryCashDetail" @receiveData="receiveData"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData">
                <el-table-column prop="amount" label="余额"></el-table-column>
                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <el-table-column prop="billcode" label="单据编号"></el-table-column>
                <el-table-column prop="memo" label="摘要"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'datePickerRange',
        field: 'billDate',
        label: '日期：'
    }
];
export default {
    name: 'CashCheck',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig,
            tableData: []
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
            console.log(data);
        }
    }
}
</script>
<style lang="scss" scoped>
@import './CashCheck.scss';
</style>