<template>
    <div class="ReturnDeliverTable">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单时间:</el-col>
                        <el-col :span="3">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="2">订单编号:</el-col>
                        <el-col :span="4">{{item.orderCode}}</el-col>
                        <el-col :span="3">订单状态:</el-col>
                        <el-col :span="3" v-red>{{item.billStatusName}}</el-col>
                        <el-col v-if="item.poTypeBusinessType != '05'" :span="2" push="1">
                            <div @click="lookMore(item)" class="lookMore">
                                <span class="text">{{ item.isMoreShow ? '收起' : '更多'}}</span>
                                <i class="icon iconfont" :class="[item.isMoreShow ? 'lj-up' :'lj-down-']"></i>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单箱数：</el-col>
                        <el-col :span="2">{{item.baleQuantity}}箱</el-col>
                        <el-col :span="2">订单金额：</el-col>
                        <el-col :span="3" v-red>{{item.orderAmount|formatPrice}}</el-col>
                        <el-col :span="3">货款抵扣金额：</el-col>
                        <el-col :span="3" v-red>{{item.discountAmount|formatPrice}}</el-col>
                        <el-col :span="3">X类共建基金：</el-col>
                        <el-col :span="2" v-red>{{item.fundCash|formatPrice}}</el-col>
                        <el-col :span="2">支付金额:</el-col>
                        <el-col v-red :span="2">{{item.totalAmount | formatPrice}}</el-col>
                    </el-row>
                </div>
                <template v-if="item.poTypeBusinessType == '05'">
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">审核意见：</el-col>
                            <el-col :span="22">{{item.approveOpinion}}</el-col>
                        </el-row>
                    </div>
                </template>
                <template v-else>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">审核意见：</el-col>
                            <el-col :span="22">{{item.approveOpinion}}</el-col>
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
                        
                        <div v-if="item.poTypeBusinessType == '03'" class="orderHeader">
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
                </template>
                
                <el-table :data="item.purchaseOrderItems" border style="width: 100%">
                    <el-table-column prop="srcBillCode" label="来源单据号"></el-table-column>
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
                    <el-table-column prop="applyNum" :label="item.poTypeBusinessType == '05' ? '申请发货数量':'退订数量'  ">
                        <template slot-scope="scope">
                            <div>
                                <div>箱数：{{scope.row.baleQuantity}} 箱</div>
                                <div>瓶数：{{scope.row.baseQuantity}} 瓶</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalAmount" label="金额">
                        <template slot-scope="scope">
                            <div v-red>{{scope.row.realAmount | formatPrice}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'ReturnDeliverTable',
    props: {
        orderData: {
            default() {
                return []
            }
        }
    },
    methods: {
        lookMore(item) {
            item.isMoreShow = !item.isMoreShow;
        }
    },
    data() {
        return {
            defaultImg: require('../../../../assets/defaultimg.png'),
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
@import "./ReturnDeliverTable.scss";
</style>
