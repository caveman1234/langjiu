<template>
    <div class="CashCheck">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" serverUrl="/ocm-web/api/b2b/query-balance/queryCashDetail" @receiveData="receiveData"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData">
                <el-table-column prop="amount" label="余额"></el-table-column>
                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <el-table-column prop="billcode" label="单据编号"></el-table-column>
                <el-table-column prop="memo" label="摘要"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageParams.pageIndex"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="pageParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.totalPage">
            </el-pagination>
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
            tableData: [],
            pageParams:{
                pageIndex:1,
                pageSize:20,
                totalPage:0
            }
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
            this.pageParams.size = data.size;
            this.pageParams.totalPage = data.totalPages;
        },
        handleSizeChange(pageSize){
            let _this = this;
            _this.pageParams.pageSize = pageSize;
            let params = {
                page:_this.pageParams.pageIndex - 1,
                size:_this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
        handleCurrentChange(pageIndex){
            let _this = this;
            _this.pageParams.pageIndex = pageIndex;
            let params = {
                page:_this.pageParams.pageIndex - 1,
                size:_this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
    },
    mounted(){
        let _this = this;
        let params = {
                page:_this.pageParams.pageIndex - 1,
                size:_this.pageParams.pageSize
            };
        _this.$refs.searchRef.search(params);
    }
}
</script>
<style lang="scss" scoped>
@import './CashCheck.scss';
</style>