<template>
    <div class="ApplySend">
        <div class="ApplySendTitle">
            <el-row>
                <div class="sendTitleTitle">收件人信息</div>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="name">单据名称：</div>
                </el-col>
                <el-col :span="5">
                    <div class="desc">{{infoData.orderName}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="name">单据编码：</div>
                </el-col>
                <el-col :span="4">
                    <div class="desc">{{infoData.orderCode}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="name">运输方式：</div>
                </el-col>
                <el-col :span="5">
                    <div class="desc">{{infoData.orderName}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="name">期望到货日期：</div>
                </el-col>
                <el-col :span="5">
                    <div class="desc">{{infoData.orderCode}}</div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="name">送货地址：</div>
                </el-col>
                <el-col :span="22">
                    <div class="desc">{{infoData.address}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="ApplySendBody">
            <div class="title">申请发货商品信息</div>
            <div class="tableContainer">
                <div class="theader">
                    <div class="goodsInfo">商品详情</div>
                    <div class="orderTotalNum">订单数量</div>
                    <div class="diliverNum">已发货数量</div>
                    <div class="restDiliverNum">剩余发货数量</div>
                    <div class="standard">规格</div>
                    <div class="applyNum">申请数量</div>
                    <div class="applySendNum">申请发货金额</div>
                </div>
                <div class="tbody">
                    <div v-for="(item,index) in infoData.goodsList" :key="index" class="bodyItem">
                        <div class="goodsInfo">
                            <div class="goodsImg" :style='{"backgroundImage":`url(${item.goodsImg})`}'></div>
                            <div class="goodsDesc">{{item.brief}}</div>
                        </div>
                        <div class="orderTotalNum">{{item.orderTotalNum}}</div>
                        <div class="diliverNum">{{item.diliverNum}}</div>
                        <div class="restDiliverNum">{{item.restDiliverNum}}</div>
                        <div class="standard">
                            <div class="volume">容量：{{item.volume}}ml</div>
                            <div class="strength">度数：{{item.strength}}度</div>
                        </div>
                        <div class="applyNum">
                            <el-input-number v-model="item.applyNum" size="mini" :min="0" :max="10000"></el-input-number>
                        </div>
                        <div class="applySendNum">¥{{item.applySendNum}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ApplySendFooter">
            <el-row>
                <el-col :span="16">
                    <div class="footerLeft">1</div>
                </el-col>
                <el-col :span="4">
                    <div class="price">
                        <span class="name">金额</span>
                        <span class="money">¥{{totalMoney}}</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="submitBtn">
                        <el-button class="redBtn" size="mini">提交发货申请</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
let infoData = {
    orderName: '盛唐嘉业科技股份有限公司',
    orderCode: 'langjiu12345678',
    carrayMethod: '快递',
    expectDate: '2017-01-01',
    address: '四川省成都市双流区麓湖生态城1980号',
    goodsList: [
        {
            goodsImg: "src/assets/goodsItem.png",
            "brief": "1郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
            orderTotalNum: 1000,
            diliverNum: 2000,
            restDiliverNum: 3000,
            volume: 500,
            strength: 50,
            applyNum: 101,
            applySendNum: 201.00,
        },
        {
            goodsImg: "src/assets/goodsItem.png",
            "brief": "2郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
            orderTotalNum: 1000,
            diliverNum: 2000,
            restDiliverNum: 3000,
            volume: 500,
            strength: 50,
            applyNum: 101,
            applySendNum: 201.00,
        },
        {
            goodsImg: "src/assets/goodsItem.png",
            "brief": "3郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
            orderTotalNum: 1000,
            diliverNum: 2000,
            restDiliverNum: 3000,
            volume: 500,
            strength: 50,
            applyNum: 101,
            applySendNum: 201.00,
        }
    ]
};
export default {
    name: 'ApplySend',
    props: {
        infoData: {
            default() {
                return infoData
            }
        }
    },
    computed: {
        totalMoney() {
            let total = 0;
            this.infoData.goodsList.forEach(v=>{
                total += v.applySendNum;
            });
            return total;
        }
    }
}
</script>
<style lang="scss" scoped>
@import './ApplySend.scss';
</style>

