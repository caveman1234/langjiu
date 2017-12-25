<template>
    <div class="GenerateBillsEdit">

        <div class="goodsInfo">
            <AddNewGoods @receiveData="receiveData"></AddNewGoods>
            <div class="goodsContent">
                <el-table :data="goodsData" :summary-method="getSummaries" show-summary style="width: 100%">
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
                    <el-table-column prop="basicPrice" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：¥{{scope.row.basicPrice || '暂无价格'}}</div>
                                <div v-if="false">共建：¥{{scope.row.fundPrice || 0}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="箱数" width="180">
                        <template slot-scope="scope">
                            <el-input-number @change="baleQuantityChange(scope.row)" v-model="scope.row.baleQuantity" :min="1" size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentTotalMoney" label="货款金额"></el-table-column>
                    <el-table-column prop="handle" label="操作">
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
        <div class="handle">
            <div class="handleWrap">
                <el-row>
                    <el-col :span="22">
                        <div class="opacity0">1</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button @click="confirm" type="primary" size="mini">确定</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import AddNewGoods from '../AddNewGoods/AddNewGoods';
let goodsData = [
    {
        "imageUrl": "src/assets/goodsItem.png",
        "productDesc": "11郎酒红花郎10 53度酱香500",
        "basicPrice": 1668,
        "fundPrice": 1100,
        "baleQuantity": 10,
        "baseQuantity": 20,
        "costOffMoney": 0,
        "productId": 1,
        daikuan: 2000,
        standard: 500,
        productModel: 40
    },
    {
        "imageUrl": "src/assets/goodsItem.png",
        "productDesc": "22郎酒红花郎10 53度酱香500",
        "basicPrice": 1668,
        "fundPrice": 1100,
        "baleQuantity": 10,
        "baseQuantity": 20,
        "costOffMoney": 0,
        "productId": 2,
        daikuan: 2000,
        standard: 500,
        productModel: 40
    }
];
export default {
    name: 'GenerateBillsEdit',
    components: { AddNewGoods },
    data() {
        return {
            /* 表格数据 */
            goodsData: goodsData,
            defaultImg: require('../../../../assets/defaultimg.png')
        }
    },
    methods: {
        delOneItem({ productId }) {
            let index = this.goodsData.findIndex(v => v.productId === productId);
            this.goodsData.splice(index, 1);
        },
        /* 接收搜索数据 */
        receiveData(data) {
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));
            this.goodsData = this.goodsData.concat(willAppendData);
        },
        /* 箱数变化 */
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
                
                row.paymentTotalMoney = row.baseQuantity * row.basicPrice;
            });
        },
        /* 确定 */
        confirm() {
            if (this.goodsData.length > 0) {
                this.$router.push({ name: 'GenerateBills', params: { selectedData: this.goodsData } });
            } else {
                this.$Notify({ title: '商品不能为空', type: 'warning' });
            }
        },
        getSummaries(params) {
            let _this = this;
            const { columns, data } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a))
                        arr[i] = `货款总金额:${total}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        }
    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 + 总共建基金
                total = total + (v.baseQuantity * (v.basicPrice || 0) + (v.baseQuantity * (v.fundPrice || 0)))
            });
            return total;
        }
    },
    mounted() {

    },
    activated() {
        //mounted
        if (this.$route.params.selectedData) {
            this.goodsData = this.$route.params.selectedData.map(v => {
                //baleQuantity 箱数
                //discountAmount 费用折扣金额
                //baseQuantity 瓶数
                //packageNum 一包瓶数
                return Object.assign({},
                    v, {
                        discountAmount: 0,
                        baleQuantity: 1,
                        baseQuantity: v.packageNum,
                        paymentTotalMoney: (v.packageNum * v.basicPrice),
                    }
                );
            });
        }
    },
    deactivated() {
        //unmounted
    }
}
</script>
<style lang="scss">
@import './GenerateBillsEdit.scss';
</style>

