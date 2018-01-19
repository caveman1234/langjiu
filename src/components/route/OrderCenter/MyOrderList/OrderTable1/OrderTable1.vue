<template>
    <div class="OrderTable1">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap"
                :key="index">

                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red
                            :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单日期:</el-col>
                        <el-col :span="2">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="2">订单编号:</el-col>
                        <el-col :span="3">{{item.orderCode}}</el-col>
                        <el-col :span="2">订单金额:</el-col>
                        <el-col v-red
                            :span="3">
                            {{item.totalAmount | formatPrice}}
                        </el-col>
                        <el-col :span="2">订单状态:</el-col>
                        <el-col v-red
                            :span="2">{{item.billStatusName}}</el-col>
                        <el-col :span="2">
                            <div @click="lookMore(item)"
                                class="lookMore">
                                <span class="text">{{ item.isMoreShow ? '收起' : '更多'}}</span>
                                <i class="icon iconfont"
                                    :class="[item.isMoreShow ? 'lj-up' :'lj-down-']"></i>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <div v-show="item.isMoreShow">
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">发货要求：</el-col>
                            <el-col :span="3">{{item.isNoticeSend|formatIsNoticeSend}}</el-col>
                            <el-col :span="2">发货地址：</el-col>
                            <el-col :span="17">{{item.addressDetail}}</el-col>
                        </el-row>
                    </div>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">备注：</el-col>
                            <el-col :span="22">{{item.remark}}</el-col>
                        </el-row>
                    </div>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">审核意见：</el-col>
                            <el-col :span="22">{{item.approveOpinion}}</el-col>
                        </el-row>
                    </div>
                    <div v-if="item.poTypeBusinessType == '03'"
                        class="orderHeader">
                        <el-row>
                            <el-col :span="3">融资审批状态:</el-col>
                            <el-col :span="3">{{(item.financingStatus) | formatBillStatus}}</el-col>
                            <el-col :span="2">融资金额:</el-col>
                            <el-col :span="3">{{item.totalAmount | formatPrice}}</el-col>
                            <el-col :span="3">累计已还款金额:</el-col>
                            <el-col :span="3">{{item.totalRepayAmount | formatPrice}}</el-col>
                            <el-col :span="3">累计已提货金额:</el-col>
                            <el-col :span="3">{{item.totalRepaidAmount | formatPrice}}</el-col>
                        </el-row>
                    </div>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="3">费用使用明细：</el-col>
                            <el-col :span="1">E类：</el-col>
                            <el-col :span="3">{{item.eFeeUsedAmount | formatPrice}}</el-col>
                            <el-col :span="1">Q类：</el-col>
                            <el-col :span="3">{{item.qFeeUsedAmount | formatPrice}}</el-col>
                            <el-col :span="1">F类：</el-col>
                            <el-col :span="3">{{item.fFeeUsedAmount | formatPrice}}</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="orderHeader">
                    <el-row type="flex"
                        justify="end">
                        <el-button-group>
                            <template v-if="item.poTypeBusinessType =='03' && item.billStatusCode == '03' && item.totalRepaidAmount < item.totalRepayAmount">
                                <el-button size="mini"
                                    @click="goPickGoods(item)"
                                    type="primary">去提货
                                </el-button>
                            </template>
                            <template v-if="item.isNoticeSend == 1 && item.isApplySendOver == 0 && item.billStatusCode == '03' && item.poTypeBusinessType !=='03' && item.isNcConfirm ==1 ">
                                <el-button @click="applySend(item)"
                                    size="mini"
                                    type="primary">申请发货
                                </el-button>
                            </template>

                            <template v-if="item.isSendOver == 0 && item.isNcConfirm == 1 && item.billStatusCode == '03' ">
                                <el-button @click="applyReturn(item)"
                                    size="mini"
                                    type="primary">申请退订
                                </el-button>
                            </template>
                            <template v-if="item.poTypeBusinessType == '03' && item.billStatusCode == '03' && item.financingStatus == '10' ">
                                <el-button @click="goFinancing(item)"
                                    size="mini"
                                    type="primary">去融资
                                </el-button>
                            </template>
                        </el-button-group>
                    </el-row>
                </div>
                <el-table :data="item.purchaseOrderItems"
                    :span-method="spanMethod"
                    border
                    style="width: 100%">
                    <el-table-column prop="productDesc"
                        label="商品详情"
                        width="300">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}'
                                    class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop=""
                        label="规格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.standard}}ml</div>
                                <div>度数：{{scope.row.productModel}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basePrice"
                        label="单价">
                        <template slot-scope="scope">
                            <div>{{scope.row.basePrice|formatPrice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="boxCount"
                        label="数量">
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
isNoticeSend  是  1 ， 否   0
isApplySendOver 申请发货完成 0 1，
2. isNoticeSend == 1 && isApplySendOver == 0   => 申请发货
填仓订单：

3 去融资 -》融资订单&&订单状态已审核&&融资状态未审核
item.poTypeBusinessType == '03' && item.billStatusCode == '03' && item.financingStatus=='0'
isSendOver 发货未完成

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
            defaultImg: require('../../../../../assets/defaultimg.png'),
        }
    },
    methods: {
        /* 去提货 */
        goPickGoods(data) {
            let _this = this;
            _this.$router.push({ name: 'GoPickGoodsEdit', params: { selectedData: data } });
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
        },
        //去融资
        goFinancing(item) {
            let _this = this;
            let params = {
                mastContCode: item.id,//订单id
                clientId: _this.$store.state.customerId//客户id
            };
            let url = '/ocm-web/api/cmbc/pushOrderInfoToCmbc';
            _this.$http.post(url, params)
                .then(res => {
                    //改变状态
                    item.financingStatus = '0';
                    _this.$Notify({ title: '融资成功', type: 'success' });
                })
        },
        //查看更多
        lookMore(item) {
            debugger
            item.isMoreShow = !item.isMoreShow;
        },
        //申请发货
        applySend(item) {
            let _this = this;
            let paramsWrap = {
                params: {
                    id: item.id,//订单id
                }
            }
            let url = decodeURI('/ocm-web/api/b2b/purchase-orders/get-sendapply-order-push-detail');
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.$router.push({ name: 'ApplySend', params: { infoData: res.data } });
                })

        },
        //申请退货
        applyReturn(item) {
            let _this = this;
            let paramsWrap = {
                params: {
                    id: item.id,//订单id
                }
            }
            let url = '/ocm-web/api/b2b/purchase-orders/get-returnchange-order-push-detail';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    debugger
                    _this.$router.push({ name: 'ApplyReturn', params: { infoData: res.data } });
                })
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
@import './OrderTable1.scss';
</style>
