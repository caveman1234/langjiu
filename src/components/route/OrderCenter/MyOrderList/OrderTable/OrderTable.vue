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
                                        {{item0.poTypeName}}
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
                                        {{item0.poTypeCode}}
                                    </div>
                                </el-col>
                            </el-row>

                        </el-col>
                    </el-row>
                </div>
                <div class="tableBody">
                    <div v-for="(item,index) in item0.purchaseOrderItems" :key="index" class="tableRow">
                        <div class="goodsDetail">
                            <div :style="{'backgroundImage':`url(${item.imageUrl})`}" class="goodsImg"></div>
                            <div class="goodsDesc">{{item.productDesc}}</div>
                        </div>
                        <div class="goodsStands">
                            <div>容量：{{item.standard}}ml</div>
                            <div>度数：{{item.productModel}}度</div>
                        </div>
                        <div class="goodsPrice">{{item.basePrice}}</div>
                        <div class="goodsNum tableBorderRight">{{item.num}}</div>
                        <div :class="[index!=(item0.purchaseOrderItems.length-1)&& (item0.purchaseOrderItems.length) !=1? 'tableNoneBorder' : '']" class="goodsMoney tableBorderRight">
                            <template v-if="index == 0">¥{{item0.totalAmount}}</template>
                        </div>
                        <div :class="[index!=(item0.purchaseOrderItems.length-1)&& (item0.purchaseOrderItems.length) !=1 ? 'tableNoneBorder' : '']" class="goodsStatus tableBorderRight">
                            <template v-if="index == 0">{{item0.billStatusName}}</template>
                        </div>
                        <div :class="[index!=(item0.purchaseOrderItems.length-1)&& (item0.purchaseOrderItems.length) !=1 ? 'tableNoneBorder' : '']" class="handle">
                            <template v-if="index == 0">
                                <template v-if="item0.poTypeBusinessType == '03'">
                                    <template v-if="item0.billStatusCode == '08'">
                                        <el-button @click="goFinancing(item0.purchaseOrderItems)" type="primary" size="mini">去融资</el-button>
                                    </template>
                                    <template v-if="item0.billStatusCode == '03' && item0.totalTakeMoney > item0.totalFillMoney">
                                        <el-button @click="goFillStore(item0.purchaseOrderItems)" type="primary" size="mini">去填仓</el-button>
                                    </template>
                                </template>
                                <template v-if="item0.poTypeBusinessType == '04' || item0.poTypeBusinessType == '01'">
                                    <template v-if="item0.billStatusCode == '01'">
                                        <el-button @click="goPay(item0.purchaseOrderItems)" type="primary" size="mini">去支付</el-button>
                                    </template>
                                    <template v-if="item0.billStatusCode == '03' && item0.isNoticeSend==1 && item0.applyedQuantity < item0.orderNum">
                                        <el-button @click="applySend(item0.purchaseOrderItems)" type="primary" size="mini">申请发货</el-button>
                                    </template>
                                    <template v-if="item0.billStatusCode == '03' && item0.isNoticeSend==1 && item0.applyedQuantity > item0.orderNum">
                                        <el-button @click="applyReturn(item0.purchaseOrderItems)" type="primary" size="mini">申请退换货</el-button>
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
    //-----------------------------------------billStatusCode订单状态
	// Uncommitted("01", "未提交", "整单状态"),
	// Committed("02", "已提交", "整单状态"),
	// Approved("03", "已审核", "整单状态"),
	// Disapproved("04", "审核不通过", "整单状态"),
	// Finished("05", "已完成", "整单状态"),
	// RowUncommitted("06", "未提交", "行状态"),
	// RowCommitted("07", "已提交", "行状态"),
	// RowApproved("08", "已审核", "行状态"),
	// RowDisapproved("09", "审核不通过", "行状态"),
	// RowArranged("10", "已安排", "行状态"),
    // RowClosed("11", "已关闭", "行状态");
    //--------------------------------------poTypeBusinessType单据类型
    // Common("01", "普通采购订单", null),
	// RuturnChange("02", "退换货订单", null),
	// Financing("03", "融资订单", null),
	// Repaid("04", "填仓订单", null),
    // SendApply("05", "发货申请订单", null);
    //---------------------------------isNoticeSend
    //是  1 ， 否   0
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
        purchaseOrderItems: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
        purchaseOrderItems: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
        purchaseOrderItems: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
        purchaseOrderItems: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
        purchaseOrderItems: [
            {
                goodsImg: "src/assets/goodsItem.png",
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
                orderDesc: "2郎酒 红花郎（10）陈酿 53度整件装 白酒 558m l*6瓶（件内有礼)",
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
            var params = {
                selectedData: data
            };
            this.$router.push({ name: 'GenerateBills', params });
        },
        goFillStore(data) {/* 去填仓 */
            console.log(data);
            var params = {
                selectedData: data
            };
            this.$router.push({ name: 'GenerateBills', params });
        },
        goPay(data) {/* 去支付 */
            console.log(data);
            var params = {
                selectedData: data
            };
            this.$router.push({ name: 'GenerateBills', params });
        },
        applySend(data) { /* 申请发货 */
            console.log(data);
            var params = {
                selectedData: data
            };
            this.$router.push({ name: 'ApplySend', params });
        },
        applyReturn(data) { /* 申请退货 */
            console.log(data);
            var params = {
                selectedData: data
            };
            this.$router.push({ name: 'ApplyReturn', params });
        },
    }
}
</script>
<style lang="scss" scoped>
@import './OrderTable.scss';
</style>

