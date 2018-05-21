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
                            <el-select @change="noticeChange" size="mini" v-model="carriageMethod" placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in carriageMethodCombo" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2" style="line-height:30px;">
                            <div class="noticeName">发货要求：</div>
                        </el-col>
                        <el-col :span="5" style="margin-top: 3px;">
                            <el-radio-group @change="isNoticeChange" v-model="isNotice" :disabled="isNoticeDisable">
                                <el-radio :label="0">立即发货</el-radio>
                                <el-radio  :label="1">待通知发货</el-radio>
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
                <el-table :data="goodsData" :summary-method="getSummaries" show-summary style="width: 100%" border>
                    <el-table-column prop="" label="商品详情" width="400">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basePrice" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：{{scope.row.basePrice | formatPrice}}</div>
                                <div v-if="false">共建：{{scope.row.fundPrice | formatPrice}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="箱数"> </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentTotalMoney" label="货款金额">
                        <template slot-scope="scope">
                            <div>{{scope.row.paymentTotalMoney|formatPrice}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="goodsFooter"></div>
        </div>
        <div v-show="financingChecked" class="offMoney">
            <el-row>
                <el-col :span="22">
                    <div class="opacity">1</div>
                </el-col>
                <el-col :span="2" v-show="prodGroupId">
                    <CostOff ref="costOffRef" :goodsData="goodsData" :totalMoney="totalMoney" @CostOffEvent="CostOffEvent"></CostOff>
                </el-col>
            </el-row>
        </div>
        <div class="calcMoney">
            <template v-if="prodGroupId">
                <div v-show="financingChecked" class="calcTitle">订单结算</div>
                <el-row v-show="financingChecked">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">货款总金额：</div>
                            </el-col>
                            <el-col :span="17">
                                <el-col :span="5">
                                    <div class="calcRightMoney">{{totalMoney | formatPrice}}</div>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-show="financingChecked">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">费用抵扣总额：</div>
                            </el-col>
                            <el-col :span="17">
                                <el-col :span="5">
                                    <span class="calcRightMoney">{{useOffMoney | formatPrice}}</span>
                                </el-col>
                                <el-col :span="19" v-if="parseInt(billFooger.deductionMoney) && parseInt(billFooger.notXtype)">
                                    <el-col :span="8">
                                        <span class="gray">其中：抵扣货款{{billFooger.deductionMoney | formatPrice}}</span>
                                    </el-col>
                                    <el-col :span="8">
                                        <span class="gray">
                                            计提非X类共建基金 {{billFooger.notXtype | formatPrice}}
                                        </span>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-show="financingChecked" v-if="(Number(billFooger.xType) + Number(billFooger.notXtype)).toFixed(2)">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">计提共建基金总额：</div>
                            </el-col>
                            <el-col :span="17">
                                <el-col :span="5">
                                    <div class="calcRightMoney">{{(Number(billFooger.xType) + Number(billFooger.notXtype)) | formatPrice}}</div>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-show="financingChecked" v-if="(Number(billFooger.xType) + Number(billFooger.notXtype)).toFixed(2)">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">可用融资余额：</div>
                            </el-col>
                            <el-col :span="17">
                                <el-col :span="5">
                                    <div class="calcRightMoney">{{(Number(billHeader.totalRepayAmount) - Number(billHeader.totalRepaidAmount)) | formatPrice}}</div>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                
                <el-row v-show="financingChecked">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">可用现金余额：</div>
                            </el-col>
                            <el-col :span="17">
                                <el-col :span="5">
                                    <span class="calcRightMoney">{{billFooger.cashRest | formatPrice}}</span>
                                </el-col>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-show="financingChecked" class="realTotal">
                    <el-col :span="5">
                        <div class="calcLeft">1</div>
                    </el-col>
                    <el-col :span="19">
                        <div class="calcRight">
                            <el-col :span="7">
                                <div class="calcRightName">本次使用融资额度：</div>
                            </el-col>
                            <el-col :span="7">
                                <el-col :span="5">
                                    <div class="calcRightMoney calcRightMoneyTotal">{{(Number(totalMoney) - Number(billFooger.deductionMoney)) | formatPrice}}</div>
                                </el-col>
                            </el-col>
                            <el-col :span="7">本次使用现金金额：</el-col>
                            <el-col :span="3">
                                <div class="calcRightMoney calcRightMoneyTotal">{{Number(billFooger.xType)|formatPrice}}</div>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>

                

            </template>

            <el-row class="charge">
                <el-col :span="20">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="4">
                    <div class="calcRight">
                        <el-col :span="24">
                            <div class="calcRightName">
                                <el-button @click="edit" size="mini">修改</el-button>
                                <el-button @click="submitNormal" size="mini" type="primary">提交</el-button>
                                <!-- 在线支付 -->
                                <!-- <template v-if="parseFloat(currentPay) > parseFloat(billFooger.cashRest)">
                                    <el-button @click="payOnline" size="mini" type="primary" :loading="isPayOnlineLoading">在线支付</el-button>
                                </template>
                                <template v-else>
                                    <el-button @click="submitNormal" size="mini" type="primary">提交</el-button>
                                </template> -->
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
        <BankList :bankDataSource1="bankDataSource1" @receiveSelectedBank="receiveSelectedBank" :dialogVisible.sync="dialogVisible"></BankList>

    </div>
</template>
<script>
import GoPickGoods from './GoPickGoods.js';
export default GoPickGoods;
</script>
<style lang="scss">
@import "./GoPickGoods.scss";
</style>
