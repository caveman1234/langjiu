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
                    <div class="name">期望到货日期：</div>
                </el-col>
                <el-col :span="5">
                    <div class="desc">{{infoData.orderCode}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="name">送货地址：</div>
                </el-col>
                <el-col :span="7">
                    <div class="desc">{{infoData.address}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="ApplySendBody">
            <el-table :data="infoData.goodsList" border style="width: 100%">
                <el-table-column prop="productDesc" label="商品详情" width="400">
                    <template slot-scope="scope">
                        <div class="detailContainer">
                            <div :style='{"backgroundImage":`url(${scope.row.imageUrl})`}' class="goodsImg"></div>
                            <div class="desc">{{scope.row.productDesc}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="volume" label="规格">
                    <template slot-scope="scope">
                        <p>容量: {{ scope.row.standard }}ml</p>
                        <p>度数: {{ scope.row.productModel }}度</p>
                    </template>
                </el-table-column>
                <el-table-column prop="baleQuantity" label="订单数量"></el-table-column>
                <el-table-column prop="diliverNum" label="已发货数量"></el-table-column>
                <el-table-column prop="applyNum" label="可发货数量"></el-table-column>
                <el-table-column prop="applySendNum" label="申请发货金额"></el-table-column>
            </el-table>
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
                        <el-button size="mini" type="primary">提交发货申请</el-button>
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
            price:10,
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
            price:11,
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
            price:11,
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
            this.infoData.goodsList.forEach(v => {
                total += (v.applyNum * v.price);
            });
            return total;
        }
    }
}
</script>
<style lang="scss" scoped>
@import './ApplySend.scss';
</style>

