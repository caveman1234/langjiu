<template>
    <div class="SavedOrder">
        <SearchComp @searchData="searchData"></SearchComp>
        <OrderTable :orderData="orderData"></OrderTable>
    </div>
</template>
<script>
import SearchComp from '../SearchComp/SearchComp';
import OrderTable from '../OrderTable/OrderTable';
let orderData = [
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
                orderStatus: '暂存'
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '暂存'
            }
        ]
    }
];
export default {
    name: 'SavedOrder',
    components: { SearchComp ,OrderTable},
    data() {
        return {
            orderData: orderData
        }
    },
    methods:{
        searchData(item){}
    }
}
</script>
<style lang="scss">
@import './SavedOrder.scss';
</style>

