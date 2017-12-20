<template>
    <div class="OrderTable">
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
            <div v-for="(item0,index0) in orderData" :key="index0" class="orderTableContainer">
                <div class="tableTitle">
                    <el-row>
                        <el-col :span="5">
                            <el-row>
                                <el-col :span="8">
                                    <div class="tableBodyTitleName">
                                        订单类型：
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="tableBodyTitleContent orderType">
                                        {{item0.orderType}}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="9">
                            <div class="opacity0">9</div>
                        </el-col>
                        <el-col :span="5">
                            <el-row>
                                <el-col :span="8">
                                    <div class="tableBodyTitleName">
                                        订单时间：
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="tableBodyTitleContent">
                                        {{item0.orderDate}}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="5">
                            <el-row>
                                <el-col :span="8">
                                    <div class="tableBodyTitleName">
                                        订单编号：
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="tableBodyTitleContent">
                                        {{item0.orderCode}}
                                    </div>
                                </el-col>
                            </el-row>

                        </el-col>
                    </el-row>
                </div>
                <div class="tableBody">
                    <div v-for="(item,index) in item0.goodsList" :key="index" class="tableRow">
                        <div class="goodsDetail">
                            <div :style="{'backgroundImage':`url(${item.goodsImg})`}" class="goodsImg"></div>
                            <div class="goodsDesc">{{item.orderDesc}}</div>
                        </div>
                        <div class="goodsStands">
                            <div>容量：{{item.volume}}ml</div>
                            <div>度数：{{item.strength}}度</div>
                        </div>
                        <div class="goodsPrice">{{item.price}}</div>
                        <div class="goodsNum tableBorderRight">{{item.num}}</div>
                        <div :class="[index!=(item0.goodsList.length-1)&& (item0.goodsList.length) !=1? 'tableNoneBorder' : '']" class="goodsMoney tableBorderRight">
                            <template v-if="index == 0">¥{{item.money}}</template>
                        </div>
                        <div :class="[index!=(item0.goodsList.length-1)&& (item0.goodsList.length) !=1 ? 'tableNoneBorder' : '']" class="goodsStatus tableBorderRight">
                            <template v-if="index == 0">{{item.orderStatus}}</template>
                        </div>
                        <div :class="[index!=(item0.goodsList.length-1)&& (item0.goodsList.length) !=1 ? 'tableNoneBorder' : '']" class="handle">
                            <template v-if="index == 0">
                                <template v-if="item0.orderType == '融资订单'">
                                    <template v-if="item0.orderStatus == '已审核'">
                                        <el-button @click="goFinancing(item0)" type="primary" size="mini">去融资</el-button>
                                    </template>
                                    <template v-if="item0.orderStatus == '审批通过' && item0.totalTakeMoney > item0.totalFillMoney">
                                        <el-button @click="goFillStore(item0)" type="primary" size="mini">去填仓</el-button>
                                    </template>
                                </template>
                                <template v-if="item0.orderType == '填仓订单' || item0.orderType == '普通订单'">
                                    <template v-if="item0.orderStatus == '暂存'">
                                        <el-button @click="goPay(item0)" type="primary" size="mini">去支付</el-button>
                                    </template>
                                    <template v-if="item0.orderStatus == '审批通过' && item0.waitNotice=='是' && item0.totalApplyNum < item0.orderNum">
                                        <el-button @click="applySend(item0)" type="primary" size="mini">申请发货</el-button>
                                    </template>
                                    <template v-if="item0.orderStatus == '审批通过' && item0.waitNotice=='是' && item0.totalApplyNum > item0.orderNum">
                                        <el-button @click="applyReturn(item0)" type="primary" size="mini">申请退换货</el-button>
                                    </template>
                                </template>

                            </template>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>

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
                orderStatus: '已审核'
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
                orderStatus: '审批通过'
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过'
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
                orderStatus: '审批通过'
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过'
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
                orderStatus: '审批通过'
            },
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
                volume: 500,
                price: 1000,
                num: 5,
                money: 4000,
                orderStatus: '审批通过'
            }
        ]
    }
];
export default {
    name: 'OrderTable',
    props: {
        orderData: {
            default() {
                return orderData
            }
        }
    },
    data() {
        return {}
    },
    methods: {
        goFinancing(data) {/* 去融资 */
            console.log(data);
            this.$router.push({name:'GenerateBills'});
        },
        goFillStore(data) {/* 去填仓 */
            console.log(data);
        },
        goPay(data) {/* 去支付 */
            console.log(data);
        },
        applySend(data) { /* 申请发货 */
            console.log(data);
            this.$router.push({name:'ApplySend'});
        },
        applyReturn(data) { /* 申请退货 */
            console.log(data);
        },
    }
}
</script>
<style lang="scss" scoped>
@import './OrderTable.scss';
</style>

