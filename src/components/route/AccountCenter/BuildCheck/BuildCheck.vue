<template>
    <div class="BuildCheck">
        <SearchComp 
            :canExport="true"
            exportUrl="/ocm-web/api/fundDetailExport-excel/excelDataExport"
            ref="searchRef" 
            :searchConfig="searchConfig" 
            @receiveData="receiveData" 
            serverUrl="/ocm-web/api/b2b/query-balance/queryFundDetail" 
            :disable11="true">
        </SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData" border>
                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <!-- <el-table-column prop="syb"
                        label="事业部编码"></el-table-column> -->
                <el-table-column prop="sybName" label="事业部名称"></el-table-column>
                <el-table-column prop="ctype" label="费用类型"></el-table-column>
                <el-table-column prop="billcode" width="150px" label="单据号"></el-table-column>
                <el-table-column prop="memo" width="200px" label="摘要"></el-table-column>
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
        type: 'select',
        field: 'productGroupId',
        label: '事业部：',
        dataSource: []
    },
    {
        type: 'datePickerRange',
        field: 'apprDate',
        label: '日期：',
        defaultValue: defaultValue
    },
    {
        type: 'select',
        field: 'ctype',
        label: '费用类型：',
        dataSource: [
            {
                label: 'X类',
                value: 'X'
            },
            {
                label: '非X类',
                value: 'F'
            }
        ]
    }
];
export default {
    name: 'BuildCheck',
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
        //获取产品线(事业部)下拉框
        fetchSysDataSource() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId
                }
            }
            return _this.$http.get('/ocm-web/api/base/organization/get-offices-list', paramsWrap)
                .then(res => {
                    return res.data;
                })
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
        _this.fetchSysDataSource()
            .then(data => {
                searchConfig[0].dataSource = data.map(v => ({ label: v.name, value: v.id }));
                _this.searchConfig = searchConfig;
            });
        let params = {
            page: 0,
            size: _this.pageParams.pageSize
        };
        _this.$refs.searchRef.search(params);

    }
}
</script>
<style lang="scss" scoped>
@import './BuildCheck.scss';
</style>