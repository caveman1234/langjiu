<template>
    <div class="FinatialCheck">
        <SearchComp 
            :canExport="true"
            exportUrl="/ocm-web/api/financingDetailExport-excel/excelDataExport"
            ref="searchRef" 
            :searchConfig="searchConfig" 
            serverUrl="/ocm-web/api/b2b/query-balance/queryFinancingDetail" 
            @receiveData="receiveData" 
            :disable11="true">
        </SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData" border>

                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <el-table-column prop="billcode" label="单据编号"></el-table-column>
                <el-table-column prop="memo" label="摘要"></el-table-column>
                <el-table-column prop="income" label="收入">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.income|formatInOut}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cost" label="支出">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.cost|formatInOut}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="余额">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.amount|formatInOut}}</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageParams.pageIndex"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="pageParams.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="pageParams.total"
                                prev-text="上一页"
                                next-text="下一页">
                            </el-pagination> -->
        </div>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let date11 = new Date(`${(new Date()).getFullYear()}-01-01`).getTime();
let startTime = new Date().getTime() - 24 * 60 * 60 * 1000 * 30;
let endTime = new Date();
startTime = startTime < date11 ? new Date(date11) : new Date(startTime);
let defaultValue = [startTime, endTime];
let searchConfig = [
    {
        type: 'datePickerRange',
        field: 'apprDate',
        label: '日期：',
        defaultValue: defaultValue,
        // defaultValue: [],
    }
];
export default {
    name: 'FinatialCheck',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig,
            tableData: [],
            //分页参数
            pageParams: {
                pageIndex: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data;
            this.pageParams.pageSize = data.size;//每页数量
            this.pageParams.total = data.totalElements;//总页数
            this.pageParams.pageIndex = data.number + 1;//当前页
        },
        handleSizeChange(pageSize) {
            let _this = this;
            _this.pageParams.pageSize = pageSize;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
        handleCurrentChange(pageIndex) {
            let _this = this;
            _this.pageParams.pageIndex = pageIndex;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
    },
    mounted() {
        let _this = this;
        let params = {
            page: 0,
            size: _this.pageParams.pageSize
        };
        _this.$refs.searchRef.search(params);
    }
}
</script>
<style lang="scss" scoped>
@import './FinatialCheck.scss';
</style>