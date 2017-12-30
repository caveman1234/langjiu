<template>
    <div class="PromiseCheck">
        <SearchComp :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/queryDepositDetail"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData">
                <el-table-column prop="dbilldate" label="日期"></el-table-column>
                <el-table-column prop="syb" label="事业部编码"></el-table-column>
                <el-table-column prop="sybName" label="事业部名称"></el-table-column>
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
        type: 'select',
        field: 'productGroupId',
        label: '事业部：',
        dataSource: [
            {
                label: '事业部一',
                value: 1
            },
            {
                label: '事业部二',
                value: 2
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
    name: 'PromiseCheck',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig,
            tableData: searchConfig
        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
            console.log(data);
        },
        //获取产品线(事业部)下拉框
        fetchSysDataSource() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId
                }
            }
            return _this.$http.get('/ocm-web/api/base/organization/get-offices-list')
                .then(res => {
                    debugger
                    return res.data;
                })
        },
    },
    mounted() {
        let _this = this;
        _this.fetchSysDataSource()
            .then(data => {
                searchConfig[0].dataSource = data.map(v => ({ label: v.name, value: v.id }));
                _this.searchConfig = searchConfig;
            });
    }
}
</script>
<style lang="scss" scoped>
@import './PromiseCheck.scss';
</style>