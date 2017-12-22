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
                                <div :style='{"backgroundImage":`url(${scope.row.goodsImg})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.brief}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：¥{{scope.row.price}}</div>
                                <div>共建：¥{{scope.row.commonBuild}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="boxCount" label="箱数">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.boxCount" :min="1" size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bottolCount" label="瓶数"></el-table-column>
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
            <CostOff :goodsData="goodsData" @CostOffEvent="CostOffEvent"></CostOff>
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
let carriageMethodCombo = [{ label: '选项一', value: 1 }, { label: '选项二', value: 2 }, { label: '选项三', value: 3 }]
let infoData = [
    {
        userName: '张三1',
        userPhone: '1366666666',
        userAddress: '四川省成都市高新区天府大道南一段189号麓湖生态城',
        id: '1',
        isSelected: true
    },
    {
        userName: '张三2',
        userPhone: '1366666666',
        userAddress: '四川省成都市高新区天府大道南一段189号麓湖生态城',
        id: '2',
        isSelected: false
    },
    {
        userName: '张三3',
        userPhone: '1366666666',
        userAddress: '四川省成都市高新区天府大道南一段189号麓湖生态城',
        id: '3',
        isSelected: false
    }
];
let goodsData = [
    {
        "goodsImg": "src/assets/goodsItem.png",
        "goodsDetail": "1郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "productCode": "langjiu098765",
        "price": 1000,
        "amount": 1,
        "bottle": 10,
        "commonMoney": 1000,
        "money": 111,
        "id": 1
    },
    {
        "goodsImg": "src/assets/goodsItem.png",
        "goodsDetail": "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "productCode": "langjiu098765",
        "price": 1000,
        "amount": 1,
        "bottle": 10,
        "commonMoney": 1000,
        "money": 111,
        "id": 2
    },
    {
        "goodsImg": "src/assets/goodsItem.png",
        "goodsDetail": "3郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "productCode": "langjiu098765",
        "price": 1000,
        "amount": 1,
        "bottle": 10,
        "commonMoney": 1000,
        "money": 222,
        "id": 3
    }
]
export default {
    name: 'GenerateBills',
    components: { DeliveryInfo, AddNewGoods,CostOff },
    data() {
        return {
            isNotice: 1,/* 发货通知 */
            carriageMethod: '',/* 运输方式 */
            arriveDate: '',/* 期望到货日期 */
            address: '',
            remark: '',
            carriageMethodCombo: carriageMethodCombo,
            infoData: infoData,/* 地址信息 */
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
            data.forEach(obj => {
                this.goodsData = this.goodsData || [];
                let id = obj.id;
                let hasExistObj = this.goodsData.find(v => v.id === id);
                if (hasExistObj) {
                    hasExistObj.boxCount = hasExistObj.boxCount + obj.boxCount
                } else {
                    this.goodsData.push(obj);
                }
            });
        },
        CostOffEvent(data){/* 使用折扣金额 */
            console.log(data);
        },
        payOnline(){/* 在线支付 */

        },
        saveTemporary(){/* 暂存 */

        }
    },
    mounted() {
        this.goodsData = this.$route.params.selectedData;
        console.log(this.goodsData);
    }
}
</script>
<style lang="scss">
@import './GenerateBills.scss';
</style>
