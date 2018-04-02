<template>
    <div class="ReturnWineEdit">
        <div class="goodsInfo">
            <div class="goodsContent">
                <el-table :data="goodsData" :summary-method="getSummaries" show-summary border style="width: 100%">
                    <el-table-column prop="productDesc" label="商品详情" width="200">
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
                                <div>价格：{{scope.row.basicPrice | formatPrice}}</div>
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
                    <el-table-column prop="paymentTotalMoney" label="还酒金额" width="180px">
                        <template slot-scope="scope">
                            <div>{{scope.row.paymentTotalMoney|formatPrice}}</div>
                        </template>
                    </el-table-column>
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
export default {
    name: 'ReturnWineEdit',
    data() {
        return {
            goodsData: [],
            defaultImg: require('../../../../../assets/defaultimg.png'),
            tFee: 0
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

            willAppendData = willAppendData.map(v => {
                //baleQuantity 箱数
                //baseQuantity 瓶数
                //packageNum 一包瓶数
                //paymentTotalMoney 货款金额
                let megerObj = {};
                //箱
                megerObj.baleQuantity = v.baleQuantity || 1;
                // 瓶
                megerObj.baseQuantity = megerObj.baleQuantity * v.packageNum;
                // 货款金额
                megerObj.paymentTotalMoney = megerObj.baseQuantity * v.basicPrice;
                return Object.assign({}, v, megerObj);
            });





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
            if (this.goodsData.length == 0) {
                this.$Notify({ title: '商品不能为空', type: 'warning' });
                return;
            }
            let totalMoney = this.goodsData.reduce((acc, v) => acc + v.paymentTotalMoney, 0)

            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    amount: totalMoney
                }
            };
            let serverUrl = '/ocm-web/api/b2b/returnwine-bills/checktfee';
            _this.$http.get(serverUrl, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.tFee = res.data;
                        this.$router.push({ name: 'ReturnWineOrder', params: { selectedData: this.goodsData,tFee:res.data } });
                    }
                });
        },

        //表格合计
        getSummaries(params) {
            let _this = this;
            const { columns, data } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a), 0);
                        let value = String(Number(total).toFixed(2));
                        var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        arr[i] = `还酒总金额:¥${str}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        },
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
        if (this.$route.params.selectedData) {
            this.goodsData = this.$route.params.selectedData.map(v => {
                //baleQuantity 箱数
                //baseQuantity 瓶数
                //packageNum 一包瓶数
                //paymentTotalMoney 货款金额
                let megerObj = {};
                //箱
                megerObj.baleQuantity = v.baleQuantity || 1;
                // 瓶
                megerObj.baseQuantity = megerObj.baleQuantity * v.packageNum;
                // 货款金额
                megerObj.paymentTotalMoney = megerObj.baseQuantity * v.basicPrice;
                return Object.assign({}, v, megerObj);
            });
        }
    },
    deactivated() { },
}
</script>
<style lang="scss">
@import "./ReturnWineEdit.scss";
</style>
