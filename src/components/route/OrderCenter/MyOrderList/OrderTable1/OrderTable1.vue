<template>
    <div class="OrderTable1">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单金额:</el-col>
                        <el-col v-red :span="2">{{item.totalAmount | formatPrice}}</el-col>
                        <el-col :span="2">订单时间:</el-col>
                        <el-col :span="2">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="2">订单编号:</el-col>
                        <el-col :span="3">{{item.orderCode}}</el-col>
                        <el-col :span="2">订单状态:</el-col>
                        <el-col v-red :span="2">{{item.billStatusName}}</el-col>
                        <el-col :span="4">
                            <el-button v-if="item.poTypeBusinessType =='03' && item.billStatusCode == '03' && item.totalRepaidAmount < item.totalRepayAmount" @click="goPickGoods(item)" size="mini" type="primary">去提货</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table :data="item.purchaseOrderItems" :span-method="spanMethod" border style="width: 100%">
                    <el-table-column prop="productDesc" label="商品详情" width="300">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="规格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.standard}}ml</div>
                                <div>度数：{{scope.row.productModel}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basePrice" label="单价"> </el-table-column>
                    <el-table-column prop="boxCount" label="数量">
                        <template slot-scope="scope">
                            <div>
                                <div>箱数：{{scope.row.baleQuantity}} 箱</div>
                                <div>瓶数：{{scope.row.baseQuantity}} 瓶</div>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="" label="金额">
                                <template slot-scope="scope">
                                    <div v-red>{{item.totalAmount | formatPrice}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="操作">
                                <template slot-scope="scope">
                                    <div>
                                        <el-button size="mini" type="primary">去融资</el-button>
                                    </div>
                                </template>
                            </el-table-column> -->
                </el-table>
            </div>
        </template>
    </div>
</template>
<script>
/* 
单据类型 poTypeBusinessType
订单状态 billStatusCode

融资订单：poTypeBusinessType == '03'
累计已填仓金额 totalRepaidAmount
累计已还款金额 totalRepayAmount
1. billStatusCode == '03' totalRepaidAmount < totalRepayAmoun 已审核(审核通过) -> 去提货 

填仓订单：


*/
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
export default {
    name: 'OrderTable1',
    props: {
        orderData: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            defaultImg: require('../../../../../assets/defaultimg.png')
        }
    },
    methods: {
        /* 去提货 */
        goPickGoods(data) {
            let _this = this;
            _this.$router.push({ name: 'GoPickGoodsEdit', params: { selectedData: data.purchaseOrderItems } });
        },
        /* table合并列 */
        spanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 4) {
                if (rowIndex == 0) {
                    return {
                        rowspan: 1000,
                        colspan: 1
                    }
                } else {
                    return {
                        rowSpan: 1,
                        colspan: 1
                    }
                }
            }
            if (columnIndex == 5) {
                if (rowIndex == 0) {
                    return {
                        rowspan: 1000,
                        colspan: 1
                    }
                } else {
                    return {
                        rowSpan: 1,
                        colspan: 1
                    }
                }
            }
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
@import './OrderTable1.scss';
</style>
