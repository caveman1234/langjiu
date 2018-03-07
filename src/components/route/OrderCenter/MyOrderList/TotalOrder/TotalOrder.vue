<template>
    <div class="TotalOrder">
        <SearchComp ref="searchRef"
            :searchConfig="searchConfig"
            @receiveData="receiveData"
            :extralParams="extralParams"
            method="post"
            serverUrl="/ocm-web/api/b2b/purchase-orders/search-all-orders">
        </SearchComp>
        <OrderTable1 :orderData="orderData"></OrderTable1>
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
</template>
<script>
import OrderTable1 from '../OrderTable1/OrderTable1';
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'select',
        field: 'poTypeId',
        label: '订单类型：',
        dataSource: []
    },
    {
        type: 'select',
        field: 'billStatusCode',
        label: '订单状态：',
        dataSource: []
    },
    {
        type: 'datePickerRange',
        field: 'orderDate',
        label: '订单日期：'
    },
    {
        type: 'input',
        field: 'orderCode',
        label: '订单编号：'
    }
];
export default {
    name: 'TotalOrder',
    components: { SearchComp, OrderTable1 },
    data() {
        return {
            orderData: [],
            //分页参数
            pageParams: {
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            searchConfig: searchConfig,
            //搜索额外字段
            extralParams: {
                poTypeBusinessType: "01,03",
                distributorIds: this.$store.state.customerId,
            }
        }
    },
    methods: {
        receiveData(data) {
            this.orderData = data.content.map(v=>{
                //展示更多
                v.isMoreShow = false;
                //支付loading
                v.isPayOnlineLoading = false;
                return v;
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
        fetchOrderType() {
            let _this = this;
            /* 获取订单类型 */
            return _this.$http.get('/ocm-web/api/b2b/po-types/get-common')
                .then(res => {
                    return res.data.filter(v=>v.code!=='04').map(v => ({ label: v.name, value: v.id }));
                });
        },
        fetchOrderStatus() {
            let _this = this;
            /* 获取订单状态 */
            return _this.$http.get('/ocm-web/api/b2b/billstatus/getAll')
                .then(res => {
                    return res.data.map(v => ({ label: v.name, value: v.value }));
                });
        }
    },
    mounted() {
        let _this = this;
        let params = {
            page: 0,
            size: _this.pageParams.pageSize
        };
        //页面初始化搜索
        _this.$refs.searchRef.search(params);
        //获取订单类型下拉框
        _this.fetchOrderType().then(res => {
            _this.searchConfig[0].dataSource = res;
        });
        //获取订单状态下拉框
        _this.fetchOrderStatus().then(res => {
            _this.searchConfig[1].dataSource = res;
        });
    }
}
</script>
<style lang="scss">
@import './TotalOrder.scss';
</style>

