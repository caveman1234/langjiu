<template>
    <div class="TotalOrder">
        <SearchComp ref="searchComp" @searchData="searchData" :searchParams="searchParams"></SearchComp>
        <!-- <OrderTable :orderData="orderData"></OrderTable> -->
        <OrderTable1 :orderData="orderData"></OrderTable1>
    </div>
</template>
<script>
import SearchComp from '../SearchComp/SearchComp';
import OrderTable from '../OrderTable/OrderTable';
import OrderTable1 from '../OrderTable1/OrderTable1';
let orderData = [
    {
        totalTakeMoney: 2000,/* 累计提货金额 */
        totalFillMoney: 1000,/* 累计填仓金额 */
        poTypeName: "融资订单",
        orderDate: 1496678400000,
        poTypeCode: "1234",
        billStatusName: "已审核",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        totalAmount: 1000,
        purchaseOrderItems: [
            {
                // imageUrl: "src/assets/goodsItem.png",
                productDesc: "1郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                standard: 500,
                "productModel": 53,
                basePrice: 1000,
                num: 5,
                money: 4000,
                orderStatus: '已审核',
                "imgUrl": "src/assets/goodsItem.png",
                "brief": "郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "price": 1668,
                "count": 1980,
                "hasPurchase": false,
                "id": "12345id1",
                "boxCount": 10,
                "bottolCount": 20,
                "costOffMoney": 1000,
                "commonBuild": 2000,
                "volume": 500,

            },
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                standard: 500,
                "productModel": 53,
                basePrice: 1000,
                num: 5,
                money: 4000,
                orderStatus: '已审核',
                "imgUrl": "src/assets/goodsItem.png",
                "brief": "郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "price": 1668,
                "count": 1980,
                "hasPurchase": false,
                "id": "12345id1",
                "boxCount": 10,
                "bottolCount": 20,
                "costOffMoney": 1000,
                "commonBuild": 2000,
                "volume": 500,
            }
        ]
    },
    {
        totalTakeMoney: 2000,/* 累计提货金额 */
        totalFillMoney: 1000,/* 累计填仓金额 */
        poTypeName: "融资订单",
        orderDate: 1514097811000,
        poTypeCode: "1235",
        billStatusName: "已审核",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        totalAmount: 1000,
        purchaseOrderItems: [
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "3郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                standard: 500,
                "productModel": 53,
                basePrice: 1000,
                num: 5,
                money: 4000,
                orderStatus: '已审核',
                "imgUrl": "src/assets/goodsItem.png",
                "brief": "郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "price": 1668,
                "count": 1980,
                "hasPurchase": false,
                "id": "12345id1",
                "boxCount": 10,
                "bottolCount": 20,
                "costOffMoney": 1000,
                "commonBuild": 2000,
                "volume": 500,

            },
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "4郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                standard: 500,
                "productModel": 53,
                basePrice: 1000,
                num: 5,
                money: 4000,
                orderStatus: '已审核',
                "imgUrl": "src/assets/goodsItem.png",
                "brief": "郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "price": 1668,
                "count": 1980,
                "hasPurchase": false,
                "id": "12345id1",
                "boxCount": 10,
                "bottolCount": 20,
                "costOffMoney": 1000,
                "commonBuild": 2000,
                "volume": 500,
            }
        ]
    }
];
export default {
    name: 'TotalOrder',
    components: { SearchComp, OrderTable, OrderTable1 },
    data() {
        return {
            orderData: orderData,
            /* 搜索条件 */
            searchParams: {
                serverUrl: '/ocm-web/api/b2b/purchase-orders/search-all-orders',
                poTypeBusinessType: "01,03,04",
                distributorIds: this.$store.state.customerId
            }
        }
    },
    methods: {
        searchData(data) {
            this.orderData = data;
        }
    },
    mounted() {
        let _this = this;
        _this.$refs.searchComp.searchData();
    }
}
</script>
<style lang="scss">
@import './TotalOrder.scss';
</style>

