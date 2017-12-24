<template>
    <div class="DeliverList">
        <SearchComp @searchData="searchData" :searchUrl="searchUrl"></SearchComp>
        <ReturnDeliverTable :orderData="orderData"></ReturnDeliverTable>
    </div>
</template>
<script>
import SearchComp from '../MyOrderList/SearchComp/SearchComp.vue';
import ReturnDeliverTable from '../ReturnDeliverTable/ReturnDeliverTable';
let orderData = [
    {
        orderDate: 1496678400000,
        poTypeCode: 'langjiu123',
        billStatusName: "已审核",
        totalAmount:1000,
        purchaseOrderItems: [
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "1郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "standard": 500,
                "productModel": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "代发货",
                basePrice:120
            },
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "standard": 500,
                "productModel": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "审批中",
                basePrice:120
            }
        ]
    },
    {
        orderDate: 1496678400000,
        poTypeCode: 'langjiu124',
        billStatusName: "未审核",
        totalAmount:1000,
        purchaseOrderItems: [
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "1郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "standard": 500,
                "productModel": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "代发货",
                basePrice:120
            },
            {
                imageUrl: "src/assets/goodsItem.png",
                productDesc: "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "standard": 500,
                "productModel": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "审批中",
                basePrice:120
            }
        ]
    }
    
];
export default {
    name: 'DeliverList',
    components: { SearchComp, ReturnDeliverTable },
    data() {
        return {
            orderData: orderData,
            searchUrl:'/order/search'
        }
    },
    methods: {
        searchData(data){}
    }
}
</script>
<style lang="scss">
@import './DeliverList.scss';
</style>

