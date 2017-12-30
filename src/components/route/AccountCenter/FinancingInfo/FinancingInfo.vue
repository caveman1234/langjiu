<template>
    <div class="FinancingInfo">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/queryCashDetail"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column  prop="applyDate" label="日期"></el-table-column>
                <el-table-column  prop="custcode" label="客户编码"></el-table-column>
                <el-table-column  prop="syb" label="产品线"></el-table-column>
                <el-table-column  prop="ctype" label="费用类型"></el-table-column>
                <el-table-column  prop="billcode" label="单据号"></el-table-column>
                <el-table-column  prop="memo" label="摘要"></el-table-column>
                <el-table-column  prop="amount" label="收入">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.amount|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="amount" label="支出">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.amount|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="amount" label="余额">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.amount|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageParams.pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total"
                prev-text="上一页"
                next-text="下一页"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'datePickerRange',
        field: 'applyDate',
        label: '申请日期：'
    },
    {
        type: 'input',
        field: 'code',
        label: '申请单号：'
    },
    {
        type: 'select',
        field: 'auditStatus',
        label: '审核状态：',
        dataSource: [
            {
                label: '状态一',
                value: 1
            },
            {
                label: '状态二',
                value: 2
            }
        ]
    },
    {
        type: 'datePickerRange',
        field: 'expireDate',
        label: '到期日：'
    }
];
export default {
    name: 'FinancingInfo',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig,
            tableData: [],
            //分页参数
            pageParams:{
                pageIndex:1,
                pageSize:10,
                total:0
            }
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
            this.pageParams.pageSize = data.size;//每页数量
            this.pageParams.total = data.totalElements;//总页数
            this.pageParams.pageIndex = data.number + 1;//当前页
        },
        //获取事业部下拉框
        fetchSysDataSource() {
            let _this = this;
            _this.$http.get('')
                .then(res => {
                    return res.data;
                })
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
                page:0,
                size:_this.pageParams.pageSize
            };
        _this.$refs.searchRef.search(params);
    }
}
</script>
<style lang="scss" scoped>
@import './FinancingInfo';
</style>

