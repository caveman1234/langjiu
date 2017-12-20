<template>
    <div class="DeliverList">
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
                orderStatus: "代发货"
            },
            {
                imgUrl: "src/assets/goodsItem.png",
                brief: "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "volume": 500,
                "strength": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "审批中"
            }
        ]
    },
    {
        orderDate: '2017-01-02',
        orderCode: 'langjiu12345679',
        orderList: [
            {
                imgUrl: "src/assets/goodsItem.png",
                brief: "1郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "volume": 500,
                "strength": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "代发货"
            },
            {
                imgUrl: "src/assets/goodsItem.png",
                brief: "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                "volume": 500,
                "strength": 53,
                applyNum: 20,
                money: 4000.00,
                orderStatus: "审批中"
            }
        ]
    }
];
export default {
    name: 'DeliverList',
    components: { SearchComp, ReturnDeliverTable },
    data() {
        return {
            tableData: tableData,
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

