<template>
    <div class="BillDownload">
        <!-- <div style="font-size:50px;font-size: 50px;color: #999999;">即将开放,敬请期待......</div> -->
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/base/invoice"></SearchComp>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="invoiceDate" label="开票时间">
                <template slot-scope="scope">
                    <div>{{scope.row.invoiceDate | formatDate}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="invoiceCode" label="税务票号"></el-table-column>
            <el-table-column prop="priceWithTax" label="价税合计"></el-table-column>
            <el-table-column prop="receiptCode" label="启运凭证号（发货单号）"></el-table-column>
            <el-table-column prop="date" label="操作" width="160px">
                <template slot-scope="scope">
                    <el-button @click="downloadFujian(scope.row)" size="mini">
                        查看/下载电子发票
                    </el-button>
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
        type: 'datePickerRange',
        field: 'invoiceDate',
        label: '开票时间：',
        defaultValue: defaultValue
    },
    {
        type: 'input',
        field: 'invoiceCode',
        label: '税务票号：'
    }
];
export default {
    name: 'BillDownload',
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
        downloadFujian(row) {
            let _this = this;
            let url = '/ocm-web/api/base/invoice/getDownloadUrl';
            let paramsWrap = {
                params: {
                    invoiceSerial: row.invoiceSerial
                }
            };
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    window.open(res.data);
                })
        },
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
@import './BillDownload.scss';
</style>

