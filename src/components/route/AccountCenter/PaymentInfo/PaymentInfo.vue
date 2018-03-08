<template>
    <div class="PaymentInfo">
        <SearchComp ref="searchRef"
            :searchConfig="searchConfig"
            serverUrl="/ocm-web/api/b2b/payment-bill/list"
            @receiveData="receiveData"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData" border>
                <el-table-column prop="paymentTime"
                    label="支付日期"
                    width="100px">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.paymentTime | formatDate}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="code"
                    label="支付单号" width="150px"></el-table-column>
                <el-table-column prop="orderCode"
                    label="订单号"
                    width="150px"></el-table-column>
                <el-table-column prop="orderMny"
                    label="订单金额">
                    <template slot-scope="scope">
                        <div>{{scope.row.orderMny | formatInOut}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="paymentMny"
                    label="支付金额"
                    width="150px">
                    <template slot-scope="scope">
                        <div>{{scope.row.paymentMny | formatInOut}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="paymentStatus"
                    label="支付状态">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.paymentStatus|formatPaymentStatus}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="payer"
                    label="付款方">
                </el-table-column>
                <el-table-column prop="payerAccount"
                    label="付款方账户"
                    width="180px">
                </el-table-column>
                <el-table-column prop="payerName"
                    label="付款方户名" width="100px">
                </el-table-column>
                <el-table-column prop="payerBank" width="100px"
                    label="付款方银行">
                </el-table-column>

                <el-table-column prop="receiver"
                    label="收款方">
                </el-table-column>
                <el-table-column prop="receiverAccount"
                    label="收款方账户"
                    width="180px">
                </el-table-column>
                <el-table-column prop="receiverName"
                    label="收款方户名" width="100px">
                </el-table-column>
                <el-table-column prop="receiverBank"
                    label="收款方银行" width="100px">
                </el-table-column>
                <el-table-column prop="remark"
                    label="备注"
                    width="300px">
                </el-table-column>

            </el-table>
            <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageParams.pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total"
                prev-text="上一页"
                next-text="下一页">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let defaultValue = [new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30), new Date(new Date().getTime())];
let searchConfig = [
    {
        type: 'datePickerRange',
        field: 'paymentTime',
        label: '支付日期：',
        defaultValue: defaultValue
    },
    {
        type: 'input',
        field: 'orderCode',
        label: '订单号：',
    },
    {
        type: 'input',
        field: 'code',
        label: '支付单号：',
    },
    {
        type: 'select',
        field: 'paymentStatus',
        label: '支付状态：',
        dataSource: [
            {
                value: '',
                label: '全部'
            },
            {
                value: '0',
                label: '未支付'
            },
            {
                value: '1',
                label: '支付中'
            },
            {
                value: '2',
                label: '支付成功'
            },
            {
                value: '3',
                label: '支付失败'
            }
        ]
    }
];
export default {
    name: 'PaymentInfo',
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
            this.tableData = data.content;
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
@import './PaymentInfo';
</style>