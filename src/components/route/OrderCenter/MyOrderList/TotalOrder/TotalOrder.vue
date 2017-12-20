<template>
    <div class="TotalOrder">
        <SearchComp @searchData="searchData"></SearchComp>
        <div class="goodsTable">
            <div class="tableHeader">
                <div class="goodsDetail">商品详情</div>
                <div class="goodsStands">规格</div>
                <div class="goodsPrice">单价</div>
                <div class="goodsNum">数量</div>
                <div class="goodsMoney">金额</div>
                <div class="goodsStatus">状态</div>
                <div class="handle">操作</div>
            </div>
            <div class="tableBody">
                <div v-for="(item,index) in orderData" :key="index" class="tableRow">
                    <div class="goodsDetail">
                        <div :style="{'backgroundImage':`url(${item.goodsImg})`}" class="goodsImg"></div>
                        <div class="goodsDesc">{{item.orderDesc}}</div>
                    </div>
                    <div class="goodsStands">
                        <div>容量：{{item.volume}}</div>
                        <div>度数：{{item.strength}}</div>
                    </div>
                    <div class="goodsPrice">{{item.price}}</div>
                    <div class="goodsNum tableBorderRight">{{item.num}}</div>
                    <div :class="[index!=(orderData.length-1) ? 'tableNoneBorder' : '']" class="goodsMoney tableBorderRight">
                        <template v-if="index == 0">{{item.money}}</template>        
                    </div>
                    <div :class="[index!=(orderData.length-1) ? 'tableNoneBorder' : '']" class="goodsStatus tableBorderRight">
                        <template v-if="index == 0">{{item.orderStatus}}</template>
                    </div>
                    <div :class="[index!=(orderData.length-1) ? 'tableNoneBorder' : '']" class="handle">
                        <template v-if="index == 0">
                            <template v-if="item.orderStatus == '已审核'">
                                <el-button type="primary" size="mini">去融资</el-button>
                            </template>
                            <template v-if="item.orderStatus == '审批通过'">
                                <el-button type="primary" size="mini">去填仓</el-button>
                            </template>
                            <template v-if="item.orderStatus == '暂存'">
                                <el-button type="primary" size="mini">去支付</el-button>
                            </template>
                            <template v-if="item.orderStatus == '审批通过'">
                                <el-button type="primary" size="mini">申请发货</el-button>
                            </template>
                            <template v-if="item.orderStatus == '审批通过'">
                                <el-button type="primary" size="mini">申请退货·</el-button>
                            </template>
                        </template>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchComp from '../SearchComp/SearchComp';
let orderData = [
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "1郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num: 5,
        money: 40000,
        orderStatus: '已审核'
    },
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num: 5,
        money: 4000,
        orderStatus: '暂存'
    },
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "3郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num: 5,
        money: 4000,
        orderStatus: '暂存'
    },
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "4郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num: 5,
        money: 4000,
        orderStatus: '暂存'
    }
];
export default {
    name: 'TotalOrder',
    components: { SearchComp },
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

