<template>
    <div class="FinancingInfo">
        <SearchComp :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/queryCashDetail"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData">
                <el-table-column prop="applyDate" label="日期"></el-table-column>
                <el-table-column prop="custcode" label="客户编码"></el-table-column>
                <el-table-column prop="syb" label="产品线"></el-table-column>
                <el-table-column prop="ctype" label="费用类型"></el-table-column>
                <el-table-column prop="billcode" label="单据号"></el-table-column>
                <el-table-column prop="memo" label="摘要"></el-table-column>
                <el-table-column prop="amount" label="收入"></el-table-column>
                <el-table-column prop="amount" label="支出"></el-table-column>
                <el-table-column prop="amount" label="余额"></el-table-column>
            </el-table>
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
            tableData: []
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
        },
        //获取事业部下拉框
        fetchSysDataSource() {
            let _this = this;
            _this.$http.get('')
                .then(res => {
                    return res.data;
                })
        }
    }
}
</script>
<style lang="scss" scoped>
@import './FinancingInfo';
</style>

