<template>
    <div class="CostCheck">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/getChargeDetail"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData">
                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <el-table-column prop="syb" label="产品线编码"></el-table-column>
                <el-table-column prop="sybName" label="产品线名称"></el-table-column>
                <el-table-column prop="ctype" label="费用类型"></el-table-column>
                <el-table-column prop="billcode" label="单据号"></el-table-column>
                <el-table-column prop="memo" label="摘要"></el-table-column>
                <el-table-column prop="amount" label="收入"></el-table-column>
                <el-table-column prop="amount" label="支出"></el-table-column>
                <el-table-column prop="amount" label="余额"></el-table-column>
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
        type: 'select',
        field: 'produceGroupId',
        label: '产品线：',
        dataSource: [
            {
                label: '产品线一',
                value: 1
            },
            {
                label: '产品线二',
                value: 2
            }
        ]
    },
    {
        type: 'select',
        field: 'ctype',
        label: '费用类型：',
        dataSource: [
            {
                label: '全部',
                value: ''
            },
            {
                label: 'E',
                value: 'E'
            },
            {
                label: 'Q',
                value: 'Q'
            }
        ]
    },
    {
        type: 'datePickerRange',
        field: 'billDate',
        label: '日期：'
    }
];
export default {
    name: 'CostCheck',
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
        //获取产品线(事业部)下拉框
        fetchSysDataSource() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId
                }
            }
            return _this.$http.get('/ocm-web/api/base/prodline/get-mgr-list', paramsWrap)
                .then(res => {
                    searchConfig[0].dataSource = res.data.map(v => ({ label: v.name, value: v.id }));
                    _this.searchConfig = searchConfig;
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
    mounted() {
        let _this = this;
        _this.fetchSysDataSource()
        let params = {
                page:0,
                size:_this.pageParams.pageSize
            };
        _this.$refs.searchRef.search(params);
    }
}
</script>
<style lang="scss" scoped>
@import './CostCheck.scss';
</style>