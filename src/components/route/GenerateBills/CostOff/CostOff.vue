<template>
    <div class="CostOff">
        <el-button @click="add" size="mini" type="primary">费用抵扣</el-button>
        <el-dialog :visible.sync="dialogVisible" width="1000" @close="handleClose" @open="handleOpen">
            <div class="CostOffTitle" slot="title">
                <h2 class="title">费用抵扣</h2>
            </div>
            <div class="dialogContainer">
                <el-row>
                    <el-col :span="3">订单总金额：</el-col>
                    <el-col :span="3">{{totalMoney}}</el-col>
                    <el-col :span="4">使用折扣金额：</el-col>
                    <el-col :span="6">
                        <el-input @input="useOffMoneyChange" v-model="useOffMoney" size="mini" :placeholder="maxMoney"></el-input>
                    </el-col>
                </el-row>
                <el-table :data="searchData" show-summary sum-text="合计" border style="width: 100%">
                    <el-table-column prop="ctype" label="费用类型"></el-table-column>
                    <el-table-column prop="reserve" label="可用余额"></el-table-column>
                    <el-table-column prop="currentMoney" label="本次使用金额">
                        <template slot-scope="scope">
                            <div>{{scope.row.currentMoney || 0}} </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
let searchData = [
    {
        ctype: 'E',
        reserve: 1000,
        currentMoney: 0
    },
    {
        ctype: 'Q',
        reserve: 1000,
        currentMoney: 0
    },
    {
        ctype: 'F',
        reserve: 1000,
        currentMoney: 0
    }
];
export default {
    name: 'CostOff',
    props: ["goodsData", "totalMoney"],
    data() {
        return {
            searchUrl: '',
            dialogVisible: false,
            searchData: searchData,/* 选中的数据 */
            useOffMoney: '',/* 使用折扣金额 */
            ratio: 0
        }
    },
    methods: {
        add() {
            this.dialogVisible = true;
        },
        /* 关闭弹窗 */
        handleClose(done) {
            this.searchData = [];
            this.useOffMoney = '' ;
        },
        /* 打开弹窗 */
        handleOpen() {
            this.fetchMoneyType();
            this.fetchMoneyType();
        },
        cancel() {
            this.dialogVisible = false;
        },
        /* 确认 */
        confirm() {
            let _this = this;
            this.fetchCalcMoney()
                .then(calcMoney => {
                    _this.dialogVisible = false;
                    _this.$emit('CostOffEvent', calcMoney,this.useOffMoney,this.searchData);
                });
        },
        useOffMoneyChange(value) {
            let useOffMoney = value ? parseFloat(value).toFixed(2) : 0;
            this.searchData.forEach(v => {
                if (useOffMoney > v.reserve || useOffMoney == v.reserve) {
                    v.currentMoney = parseFloat(v.reserve).toFixed(2);
                    useOffMoney = useOffMoney - v.reserve;
                } else if (useOffMoney < v.reserve) {
                    v.currentMoney = parseFloat(useOffMoney).toFixed(2);
                    useOffMoney = 0;
                }
            });
        },
        /* 获取折扣金额 */
        fetchUseOffMoney() {
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            this.$http.get('/ocm-web/api/base/customer/getMaxLimit', paramsWrap)
                .then(res => {
                    this.ratio = res.data;
                });
        },
        /* 获取价格类型列表 */
        fetchMoneyType() {
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    productGroupId: this.$store.state.prodGroupId
                }
            };
            this.$http.get('/ocm-web/api/b2b/query-balance/getChargeReserve', paramsWrap)
                .then(res => {
                    this.searchData = res.data.map(v => {
                        return Object.assign({}, v, { currentMoney: 0 });
                    });
                });
        },
        /* 获取计算费用 */
        fetchCalcMoney() {
            let itemList = this.goodsData.map(v => {
                return {
                    productId: v.productId,
                    baseQuantity: v.baseQuantity,
                    basePrice: v.basicPrice,
                    fundPrice: v.fundPrice
                }
            });
            let paramsWrap = {
                saleChannelCode: '00',
                distributorId: this.$store.state.customerId,
                productGroupId: this.$store.state.prodGroupId,
                totalFee: this.useOffMoney,
                itemList: itemList
            };
            return this.$http.post('/ocm-web/api/b2b/purchase-orders/calculateFee', paramsWrap)
                .then(res => res.data.itemList);
        }
    },
    computed: {
        maxMoney() {
            return `最大值不能超过${this.totalMoney * this.ratio}`
        }
    },
    mounted() {
        this.fetchUseOffMoney()
        this.fetchMoneyType();
    }
}
</script>
<style lang="scss">
@import './CostOff.scss';
</style>

