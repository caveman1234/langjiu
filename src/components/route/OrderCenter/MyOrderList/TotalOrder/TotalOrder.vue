<template>
    <div class="TotalOrder">
        <SearchComp @searchData="searchData"></SearchComp>
        <!-- <OrderTable :orderData="orderData"></OrderTable> -->
        <OrderTable :orderData="orderData"></OrderTable>
    </div>
</template>
<script>
import SearchComp from '../SearchComp/SearchComp';
import OrderTable from '../OrderTable/OrderTable';
let orderData = [
    {
        totalTakeMoney: 2000,/* 累计提货金额 */
        totalFillMoney: 1000,/* 累计填仓金额 */
        orderType: "融资订单",
        orderDate: "订单时间",
        orderCode: "langjiu12344321",
        orderStatus: "已审核",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        goodsList: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
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
                "strength": 53
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '暂存',
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
                "strength": 53
            }
        ]
    },
    {
        totalTakeMoney: 2000,/* 累计提货金额  还款*/
        totalFillMoney: 1000,/* 累计填仓金额  订单*/
        orderType: "融资订单",
        orderDate: "订单时间",
        orderCode: "langjiu12345678",
        orderStatus: "审批通过",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        goodsList: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            }
        ]
    },
    {
        totalTakeMoney: 2000,/* 累计提货金额  还款*/
        totalFillMoney: 1000,/* 累计填仓金额  订单*/
        orderType: "填仓订单",
        orderDate: "订单时间",
        orderCode: "langjiu12345678",
        orderStatus: "暂存",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        goodsList: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '暂存',
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
                "strength": 53
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '暂存',
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
                "strength": 53
            }
        ]
    },
    {
        totalTakeMoney: 2000,/* 累计提货金额  还款*/
        totalFillMoney: 1000,/* 累计填仓金额  订单*/
        orderType: "填仓订单",
        orderDate: "订单时间",
        orderCode: "langjiu12345678",
        orderStatus: "审批通过",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 10,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        goodsList: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            }
        ]
    },
    {
        totalTakeMoney: 2000,/* 累计提货金额  还款*/
        totalFillMoney: 1000,/* 累计填仓金额  订单*/
        orderType: "填仓订单",
        orderDate: "订单时间",
        orderCode: "langjiu12345678",
        orderStatus: "审批通过",
        waitNotice: "是",/* 待提货通知 */
        totalApplyNum: 30,/* 累计申请发货数量 */
        orderNum: 20,/* 订单数量 */
        goodsList: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过',
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
                "strength": 53
            }
        ]
    }
];
export default {
    name: 'TotalOrder',
    components: { SearchComp ,OrderTable},
    data() {
        return {
            orderData: orderData
        }
    },
    methods: {
        searchData(data) {
            this.orderData = data;
        }
    }
}
</script>
<style lang="scss">
@import './TotalOrder.scss';
</style>

