<template>
    <div class="GoPickGoods">
        <div class="deliveryInfo">
            <div class="accountInfo">
                <div class="accountTitle">收货人信息</div>
                <div class="accountContent">
                    <DeliveryInfo @addressClick="addressClick" v-for="(item,index) in infoData" :key="index" :infoData="item" class="accountItem"></DeliveryInfo>
                </div>
            </div>
            <div class="notice">
                <div class="noticeTitle">订单</div>
                <div class="noticeContent">
                    <el-row :gutter="10">
                        <el-col :span="2">
                            <div class="noticeName">订单类型:</div>
                        </el-col>
                        <el-col :span="5">
                            <el-select size="mini" v-model="carriageMethod" placeholder="请选择" style="width:100%;" disabled>
                                <el-option v-for="item in carriageMethodCombo" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" style="line-height:30px;">
                            <div class="noticeName">发货要求：</div>
                        </el-col>
                        <el-col :span="5">
                            <el-radio-group v-model="isNotice">
                                <el-radio :label="0">立即发货</el-radio>
                                <el-radio :label="1">待通知发货</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top:10px;">
                        <el-col :span="2" style="text-align:right;line-height:30px;">备注：</el-col>
                        <el-col :span="22">
                            <el-input v-model="remark" size="mini"></el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="goodsInfo">
            <div class="goodsContent">
                <el-table :data="goodsData" :summary-method="getSummaries" show-summary style="width: 100%">
                    <el-table-column prop="" label="商品详情" width="400">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basicPrice" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：¥{{scope.row.basePrice || '暂无价格'}}</div>
                                <div v-if="false">共建：¥{{scope.row.fundPrice || 0}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="箱数"> </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentTotalMoney" label="货款金额"></el-table-column>
                </el-table>
            </div>
            <div class="goodsFooter"></div>
        </div>
        <div class="offMoney">
            <CostOff :goodsData="goodsData" :totalMoney="totalMoney" @CostOffEvent="CostOffEvent"></CostOff>
        </div>
        <div class="calcMoney">
            <div class="calcTitle">订单结算</div>
            <el-row>
                <el-col :span="14">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="10">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">货款金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥{{totalMoney}}</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="10">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">计提X类共建基金：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥{{billFooger.xType}}</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="10">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">计提非X类共建基金：</div>
                        </el-col>
                        <el-col :span="14">
                            <span class="calcRightMoney">¥{{billFooger.notXtype}}</span>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="10">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">费用抵扣金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <el-col :span="12">
                                <span class="calcRightMoney">¥{{billFooger.deductionMoney}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span>现金余额：</span>
                                <span>¥{{billFooger.cashRest}}</span>
                            </el-col>

                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="realTotal">
                <el-col :span="14">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="10">
                    <div class="calcRight ">
                        <el-col :span="10">
                            <div class="calcRightName">本次应付金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney calcRightMoneyTotal">¥{{currentPay}}</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="charge">
                <el-col :span="20">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="4">
                    <div class="calcRight">
                        <el-col :span="24">
                            <div class="calcRightName">
                                <el-button @click="edit" size="mini" type="primary">修改</el-button>
                                <el-button @click="submit" size="mini" type="primary">提交</el-button>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import GoPickGoods from './GoPickGoods.js';
export default GoPickGoods;
</script>
<style lang="scss">
@import './GoPickGoods.scss';
</style>
