<template>
    <div class="GenerateBills">
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
                            <el-radio-group v-model="isNotice" :disabled="isNoticeDisable">
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
                                <div>价格：¥{{scope.row.basicPrice || '暂无价格'}}</div>
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
        <div v-show="financingChecked" class="offMoney">
            <el-row>
                <el-col :span="22">
                    <div class="opacity">1</div>
                </el-col>
                <el-col :span="2">
                    <CostOff :goodsData="goodsData" :totalMoney="totalMoney" @CostOffEvent="CostOffEvent"></CostOff>
                </el-col>
            </el-row>
        </div>
        <div class="calcMoney">
            <div class="calcTitle">订单结算</div>
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
                                <div class="calcRightMoney">¥{{totalMoney}}</div>
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
                                <div class="calcRightMoney">¥{{(Number(billFooger.xType) + Number(billFooger.notXtype)).toFixed(2)}}</div>
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
                                <span class="calcRightMoney">¥{{useOffMoney}}</span>
                            </el-col>
                            <el-col :span="19" v-if="parseInt(billFooger.deductionMoney) && parseInt(billFooger.notXtype)">
                                <el-col :span="8">
                                    <span class="gray">其中：抵扣货款¥{{billFooger.deductionMoney}}</span>
                                </el-col>
                                <el-col :span="8">
                                    <span class="gray">
                                        计提非X类共建基金 ¥{{billFooger.notXtype}}
                                    </span>
                                </el-col>
                            </el-col>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="realTotal">
                <el-col :span="5">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="19">
                    <div class="calcRight ">
                        <el-col :span="7">
                            <div class="calcRightName">本次应付金额：</div>
                        </el-col>
                        <el-col :span="17" v-if="parseInt(billFooger.dealAmount)&&parseInt(billFooger.xType)">
                            <el-col :span="5">
                                <span class="calcRightMoney calcRightMoneyTotal">¥{{currentPay}}</span>
                            </el-col>
                            <el-col :span="19">
                                <el-col :span="8">
                                    <span class="gray">其中：货款 ¥{{billFooger.dealAmount}}</span>
                                </el-col>
                                <el-col :span="8">
                                    <span class="gray">计提X类共建基金 ¥{{billFooger.xType}}</span>
                                </el-col>
                            </el-col>

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
                                <!-- <el-button v-show="financingChecked" @click="payOnline" size="mini" type="primary">在线支付</el-button> -->
                                <el-button v-show="!financingChecked" @click="payOnline" size="mini" type="primary">去融资</el-button>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import GenerateBills from './GenerateBills.js';
export default GenerateBills;
</script>
<style lang="scss">
@import './GenerateBills.scss';
</style>
