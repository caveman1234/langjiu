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
                            <div class="noticeName">发货类型:</div>
                        </el-col>
                        <el-col :span="5">
                            <el-select size="mini" v-model="carriageMethod" placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in carriageMethodCombo" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <div class="noticeName">期望到货日期：</div>
                        </el-col>
                        <el-col :span="5">
                            <el-date-picker size="mini" v-model="arriveDate" type="date" placeholder="选择日期" style="width:100%;">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="2">
                            <div class="noticeName">通知发货：</div>
                        </el-col>
                        <el-col :span="5">
                            <el-radio-group v-model="isNotice">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="goodsInfo">
            <div class="goodsTitle">商品信息</div>
            <div class="goodsContent">
                <div class="tableTitle">
                    <div class="info">商品信息</div>
                    <div class="price">单价</div>
                    <div class="amount">箱数</div>
                    <div class="bottle">瓶数</div>
                    <div class="commonMoney">共建基金</div>
                    <div class="money">金额</div>
                    <div class="handle">操作</div>
                </div>
                <div class="tableBody">
                    <div v-for="(item,index) in goodsData" :key="index" class="tableRow">
                        <div class="info">
                            <div :style='{"backgroundImage":`url(${item.goodsImg})`}' class="goodsImg"></div>
                            <div class="goodsDesc">{{item.goodsDetail}}</div>
                        </div>
                        <div class="price">{{item.price}}/瓶</div>
                        <div class="amount">{{item.amount}}箱</div>
                        <div class="bottle">{{item.bottle}}瓶</div>
                        <div class="commonMoney">¥{{item.commonMoney}}</div>
                        <div class="money">¥{{item.money}}</div>
                        <div @click="handleClick(item)" class="handle">
                            <i class="el-icon-delete"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="goodsFooter"></div>
        </div>
        <div class="offMoney">
            <div class="offTitle">费用折扣</div>
            <div class="offContent">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <div class="name">输入费用折扣：</div>
                    </el-col>
                    <el-col :span="5">
                        <el-input placeholder="输入金额≤5000" size="mini"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <div class="name">查看明细</div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="calcMoney">
            <div class="calcTitle">费用结算</div>
            <el-row>
                <el-col :span="17"><div class="calcLeft">1</div></el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">总 金 额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥1000000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17"><div class="calcLeft">1</div></el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">折扣金额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">-¥1000000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="17"><div class="calcLeft">1</div></el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">账户余额：</div>
                        </el-col>
                        <el-col :span="14">
                            <div class="calcRightMoney">¥900000.00</div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>
            <el-row class="realTotal">
                <el-col :span="17"><div class="calcLeft">1</div></el-col>
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
                <el-col :span="17"><div class="calcLeft">1</div></el-col>
                <el-col :span="7">
                    <div class="calcRight">
                        <el-col :span="10">
                            <div class="calcRightName">
                                <el-button size="mini">在线支付</el-button>
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
    components: { DeliveryInfo },
    data() {
        return {
            isNotice: 1,/* 发货通知 */
            carriageMethod: '',/* 运输方式 */
            arriveDate: '',/* 期望到货日期 */
            address: '',
            remark: '',
            carriageMethodCombo: carriageMethodCombo,
            infoData: infoData,
            goodsData: goodsData
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
        handleClick({ id }) {
            let index = this.goodsData.findIndex(v => v.id === id);
            this.goodsData.splice(index, 1);
        }
    },
    mounted(){
    }
}
</script>
<style lang="scss">
@import './GenerateBills.scss';
</style>
