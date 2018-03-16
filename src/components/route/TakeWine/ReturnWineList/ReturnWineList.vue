<template>
    <div class="ReturnWineList">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/returnwine-bills/search"></SearchComp>
        <el-row>
            <!-- <AddRetrunWineOrder @receiveSearchData="receiveSearchData"></AddRetrunWineOrder> -->
        </el-row>
        <ReturnWineTable :tableData="tableData"></ReturnWineTable>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
        </el-pagination>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
import ReturnWineTable from '../ReturnWineTable/ReturnWineTable';
import AddRetrunWineOrder from './AddRetrunWineOrder/AddRetrunWineOrder';
let searchConfig = [
    {
        type: 'input',
        field: 'orderCode',
        label: '单据号：'
    },
    {
        type: 'select',
        field: 'billStatus',
        label: '订单状态：',
        dataSource: [
            {
                label: '未提交',
                value: '01'
            },
            {
                label: '已提交',
                value: '02'
            },
            {
                label: '审核通过',
                value: '03'
            },
            {
                label: '审核不通过',
                value: '04'
            },
            {
                label: '已完成',
                value: '05'
            }
        ]
    },
    {
        type: 'datePickerRange',
        field: 'billDate',
        label: '日期：'
    },
];
export default {
    name: 'ReturnWineList',
    components: { SearchComp, ReturnWineTable, AddRetrunWineOrder },
    data() {
        return {
            dialogVisible: false,//选择地址弹框
            searchConfig: searchConfig,
            tableData: [],
            //分页参数
            pageParams: {
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            selectedItem: {}
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
        receiveSearchData(selectedData) {
            let _this = this;
            _this.$router.push({ name: 'ReturnWineEdit', params: { selectedData: selectedData } });
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
<style lang="scss">
@import './ReturnWineList.scss';
</style>