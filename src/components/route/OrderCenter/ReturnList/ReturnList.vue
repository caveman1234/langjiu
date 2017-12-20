<template>
    <div class="ReturnList">
        <SearchComp @searchData="searchData" :searchUrl="searchUrl"></SearchComp>
        <ReturnDeliverTable :tableData="tableData"></ReturnDeliverTable>
    </div>
</template>
<script>
import SearchComp from '../MyOrderList/SearchComp/SearchComp.vue';
import ReturnDeliverTable from '../ReturnDeliverTable/ReturnDeliverTable';
let tableData = [
    {
        orderDate: '2017-01-01',
        orderCode: 'langjiu12345678',
        orderList: [
            {
                imgUrl: "src/assets/goodsItem.png",
                brief: "1郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "volume": 500,
                "strength": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "待退货"
            },
            {
                imgUrl: "src/assets/goodsItem.png",
                brief: "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "volume": 500,
                "strength": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "待退货"
            }
        ]
    },
   
];
export default {
    name: 'ReturnList',
    components: { SearchComp, ReturnDeliverTable },
    data() {
        return {
            tableData:tableData,
            searchUrl:'/order/search'
        }
    },
    methods: {
        searchData(data){}
    }
}
</script>
<style lang="scss">
@import './ReturnList.scss';
</style>

