<template>
    <div class="FinancingInfo">
        <SearchComp ref="searchRef"
            :searchConfig="searchConfig"
            @receiveData="receiveData"
            serverUrl="/ocm-web/api/b2b/financing-apply/list"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData"
                style="width: 100%">
                <el-table-column prop="applyDate"
                    label="申请日期">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.applyDate | formatDate}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="code"
                    label="申请单号"></el-table-column>
                <el-table-column prop="orderCode"
                    label="订单号"></el-table-column>
                <el-table-column prop="orderMny"
                    label="现金余额">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.orderMny|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="billStatus"
                    label="审核状态">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.billStatus | formatBillStatus}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalRepayMny"
                    label="累计还款金额">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.totalRepayMny|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalRepaidMny"
                    label="累计提货金额">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.totalRepaidMny|formatPrice}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="expireDate"
                    label="到期日">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.expireDate | formatDate}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark"
                    label="备注"></el-table-column>
                <el-table-column prop=""
                    label="更新融资状态">
                    <template slot-scope="scope">
                        <el-button size="mini"
                            v-if="scope.row.billStatus === 0 || scope.row.billStatus === 3 "
                            plain
                            @click="syncStatus(scope.row)">更新</el-button>
                    </template>
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
        type: 'input',
        field: 'orderCode',
        label: '订单号：'
    },
    {
        type: 'select',
        field: 'billStatus',
        label: '审核状态：',
        dataSource: [
            {
                label: '融资中',
                value: 0
            },
            {
                label: '融资成功',
                value: 1
            },
            {
                label: '融资审批拒绝',
                value: 2
            },
            {
                label: '限定时间内未处理',
                value: 3
            },
            {
                label: '作废',
                value: 4
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
        //获取事业部下拉框
        fetchSysDataSource() {
            let _this = this;
            _this.$http.get('')
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
        //同步融资状态
        syncStatus(row) {
            let _this = this;
            let params = {
                mastContCode: row.orderId
            };
            let url = '/ocm-web/api/cmbc/queryFinancingStatus';
            _this.$http.post(url, params)
                .then(res => {
                    let params = {
                        page: 0,
                        size: _this.pageParams.pageSize
                    };
                    _this.$refs.searchRef.search(params);
                });
        }
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
@import './FinancingInfo';
</style>

