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
                <div class="noticeTitle">收货通知</div>
                <div class="noticeContent">
                    <el-row :gutter="10">
                        <el-col :span="2">
                            <div class="noticeName">订单类型:</div>
                        </el-col>
                        <el-col :span="5">
                            <el-select size="mini" v-model="carriageMethod" placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in carriageMethodCombo" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <div class="noticeName">通知发货：</div>
                        </el-col>
                        <el-col :span="5">
                            <el-radio-group v-model="isNotice">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="2">
                            <div class="noticeName">期望到货日期：</div>
                        </el-col>
                        <el-col :span="5">
                            <el-date-picker :disabled="isNotice===1" size="mini" v-model="arriveDate" type="date" placeholder="选择日期" style="width:100%;">
                            </el-date-picker>
                        </el-col>

                    </el-row>
                </div>
            </div>
        </div>
        <div class="goodsInfo">
            <AddNewGoods @receiveData="receiveData"></AddNewGoods>
            <div class="goodsContent">
                <el-table :data="goodsData" style="width: 100%">
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
                                <div>共建：¥{{scope.row.fundPrice || 0}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="箱数">
                        <template slot-scope="scope">
                            <el-input-number @change="baleQuantityChange(scope.row)" v-model="scope.row.baleQuantity" :min="1" size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="costOffMoney" label="费用折扣金额"></el-table-column>
                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <div class="handle">
                                <i @click="delOneItem(scope.row)" class="el-icon-delete"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="goodsFooter"></div>
        </div>
        <div class="offMoney">
            <CostOff :goodsData="goodsData" :totalMoney="totalMoney" @CostOffEvent="CostOffEvent"></CostOff>
        </div>
        <div class="calcMoney">
            <div class="calcTitle">费用结算</div>
            <el-row>
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">订单总金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥1000000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">费用抵扣金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">-¥1000000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">订单支付金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥900000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">其中共建基金：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥900000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="realTotal">
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight ">
                        <el-col :span="10">
                            <div class="calcRightName">实付总额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney calcRightMoneyTotal">¥1000000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="charge">
                <el-col :span="17">
                    <div class="calcLeft">1</div>
                </el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="24">
                            <div class="calcRightName">
                                <el-button @click="payOnline" size="mini">在线支付</el-button>
                                <el-button @click="saveTemporary" size="mini">暂存</el-button>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import DeliveryInfo from './DeliveryInfo/DeliveryInfo.vue';
import AddNewGoods from './AddNewGoods/AddNewGoods';
import CostOff from './CostOff/CostOff';


export default {
    name: 'GenerateBills',
    components: { DeliveryInfo, AddNewGoods, CostOff },
    data() {
        return {
            isNotice: 1,/* 发货通知 */
            carriageMethod: '',/* 运输方式 */
            arriveDate: '',/* 期望到货日期 */
            address: '',
            remark: '',
            carriageMethodCombo: [],/* 订单类型 */
            infoData: [],/* 地址信息 */
            goodsData: []/* 表格数据 */
        }
    },
    methods: {
        addressClick(item) {
            let index = this.infoData.findIndex(v => v == item);
            this.infoData.forEach((obj, i) => {
                if (index == i) {
                    obj.isSelected = true;
                } else {
                    obj.isSelected = false;
                }
                return obj;
            });
        },
        delOneItem({ id }) {
            let index = this.goodsData.findIndex(v => v.id === id);
            this.goodsData.splice(index, 1);
        },
        receiveData(data) {/* 接收搜索数据 */
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));
            this.goodsData = this.goodsData.concat(willAppendData);
        },
        CostOffEvent(data) {/* 使用折扣金额 */
            console.log(data);
        },
        payOnline() {/* 在线支付 */

        },
        saveTemporary() {/* 暂存 */
            this.verification();
        },
        /* 获取收货地址 */
        fetchAddress() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get('/ocm-web//api/base/customer/get-addr-List', paramsWrap)
                .then(res => {
                    let infoData = res.data.map((v, i) => {
                        let obj = {
                            userName: v.firstReceiver,
                            userPhone: v.firstReceiverPhone,
                            userAddress: v.addressDetail,
                            id: v.id,
                        }
                        if (i == 0) {
                            obj.isSelected = true;
                        } else {
                            obj.isSelected = false;
                        }
                        return obj;
                    });
                    _this.infoData = infoData;
                })
        },
        /* 获取订单类型  */
        fetchOrderType() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            _this.$http.get('/ocm-web//api/b2b/po-types/get-common-add', paramsWrap)
                .then(res => {
                    let carriageMethodCombo = res.data.map(v => ({ label: v.name, value: v.id }));
                    this.carriageMethodCombo = carriageMethodCombo;
                })
        },
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
            });
        },
        /* 验证 */
        verification() {
            this.$Notification1({
                type: 'error',
                title: '不能为空'
            });
        }
    },
    computed: {
        totalMoney() {
            let total = 0;
            this.goodsData.forEach(v => {
                total = total + (v.baseQuantity * (v.basicPrice || 0))
            });
            return total;
        }
    },
    mounted() {
        this.goodsData = this.$route.params.selectedData.map(v => {
            //baleQuantity 箱数
            //costOffMoney 费用折扣金额
            //baseQuantity 瓶数
            return Object.assign(
                {},
                v,
                {
                    costOffMoney: 0,
                    baleQuantity: 1,
                    baseQuantity: v.packageNum
                }
            );
        });
        console.log('GenerateBills------', this.goodsData);
        this.fetchAddress();/* 获取收货地址 */
        this.fetchOrderType();/* 获取订单类型 */
    }
}
</script>
<style lang="scss">
@import './GenerateBills.scss';
</style>
