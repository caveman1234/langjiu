<template>
    <div class="TakeWineList">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/borrowwine-bills/search"></SearchComp>
        <TakeWineTable :tableData="tableData" @checkPass="checkPass" @checkNotPass="checkNotPass"></TakeWineTable>
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
        <SelectAddress @receiveSelectedAddress="receiveSelectedAddress"  :dialogVisible.sync="dialogVisible"></SelectAddress>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
import TakeWineTable from '../TakeWineTable/TakeWineTable';
import SelectAddress from './SelectAddress/SelectAddress';
let searchConfig = [
    {
        type: 'input',
        field: 'code',
        label: '订单号：'
    },
    {
        type: 'select',
        field: 'billStatus',
        label: '订单状态：',
        dataSource: [
            {
                label: '已提交',
                value: '0'
            },
            {
                label: '已审核',
                value: '1'
            },
            {
                label: '已完成',
                value: '2'
            },
            {
                label: '已作废',
                value: '3'
            },
            {
                label: '审核不通过',
                value: '4'
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
    name: 'TakeWineList',
    components: { SearchComp, TakeWineTable, SelectAddress },
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
            this.tableData = data.content.map(obj=>{
                obj.totalMoney = obj.borrowWineBillItems.reduce((acc,v)=>acc+v.amount,0);
                return obj;
            });
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
        //审核通过按钮
        checkPass(item) {
            let _this = this;
            _this.dialogVisible = true;
            //选中的订单
            _this.selectedItem = item;
        },
        //获取选中的地址
        receiveSelectedAddress(addressId) {
            //this.selectedItem
            //addressId
            let _this = this;
            let sreverUrl = '/ocm-web/api/b2b/borrowwine-bills/audit';
            let params = {
                receiveAddressId: addressId,
                id: _this.selectedItem.id,
                customerId: this.$store.state.customerId
            };
            _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        //成功提示
                         _this.$Notify({ title: '操作成功', type: 'success' });
                        let params = {
                            page: 0,
                            size: _this.pageParams.pageSize
                        };
                        _this.$refs.searchRef.search(params);
                    }
                });
        },
        //审核不通过按钮
        checkNotPass(item) {
            let _this = this;
            let sreverUrl = '/ocm-web/api/b2b/borrowwine-bills/unaudit';
            let params = {
                id: item.id,
                customerId: this.$store.state.customerId
            };
            _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        //不成功提示
                        _this.$Notify({ title: '操作成功', type: 'success' });
                        let params = {
                            page: 0,
                            size: _this.pageParams.pageSize
                        };
                        _this.$refs.searchRef.search(params);
                    }
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
<style lang="scss">
@import './TakeWineList.scss';
</style>
