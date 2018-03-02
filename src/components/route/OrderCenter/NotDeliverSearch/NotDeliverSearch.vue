<template>
    <div class="NotDeliverSearch">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/unsend-goods/list"></SearchComp>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="dbilldate" label="单据日期"></el-table-column>
            <el-table-column prop="billcode" label="订单号"></el-table-column>
            <el-table-column prop="invcode" label="产品编码"></el-table-column>
            <el-table-column prop="invname" label="产品名称"></el-table-column>
            <!-- <el-table-column prop="date" label="规格">
                <template slot-scope="scope">
                    <div>容量：{{scope.row.standard}}ml</div>
                    <div>度数：{{scope.row.productModel}}度</div>
                </template>
            </el-table-column> -->
            
            <el-table-column prop="wckjs" label="未安排数(件)">
                <template slot-scope="scope">
                    <div>{{scope.row.npacknumber - scope.row.ljapjs}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="ljapjs" label="已安排数(件)">
                <template slot-scope="scope">
                    <div>{{scope.row.ljapjs}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="未发货数(件)">
                <template slot-scope="scope">
                    <div>{{scope.row.wckjs}}</div>
                </template>
            </el-table-column>
            
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
        </el-pagination> -->
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30);
let endTime = new Date();
let defaultValue = [startTime, endTime];
let searchConfig = [
    {
        type: 'input',
        field: 'billcode',
        label: '订单号：'
    },
    {
        type: 'datePickerRange',
        field: 'dbilldate',
        label: '单据日期：'
    }
];
export default {
    name: 'NotDeliverSearch',
    components: { SearchComp },
    data() {
        return {
            tableData: [],
            searchConfig: searchConfig,
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
<style lang="scss">
@import './NotDeliverSearch.scss';
</style>

