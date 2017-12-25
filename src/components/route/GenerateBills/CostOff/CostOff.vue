<template>
    <div class="CostOff">
        <el-button @click="add" size="mini" type="primary">费用抵扣</el-button>
        <el-dialog :visible.sync="dialogVisible" width="1000" @close="handleClose" @open="handleOpen">
            <div class="CostOffTitle" slot="title">
                <h2 class="title">费用抵扣</h2>
            </div>
            <div class="dialogContainer">
                <el-row>
                    <el-form :model="formData" ref="form1" :rules="rules1" show-message status-icon label-width="100px">
                        <el-col :span="6">
                            <el-form-item label="订单总金额：" label-width="100px">
                                <div>{{totalMoney}}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="使用折扣金额：" prop="useOffMoney" style="font-size:12px;">
                                <el-input @input="useOffMoneyChange" :placeholder="maxMoney" v-model="formData.useOffMoney" size="mini"></el-input>
                            </el-form-item>
                            <!-- <el-input @input="useOffMoneyChange" v-model="formData.useOffMoney" size="mini" :placeholder="maxMoney"></el-input> -->
                        </el-col>
                    </el-form>
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
        let _this = this;
        let useOffMoneyCheck = function(rule, value, callback) {

            let validateValue = Number(value);
            let isNotNum = Number.isNaN(validateValue);
            if (isNotNum) {
                callback(new Error('必须输入数字'));
            }
            let maxDiscont = _this.totalMoney * _this.ratio;
            if (validateValue > maxDiscont) {
                callback(new Error(`金额必须小于${maxDiscont}`));
            }
            callback();
        };
        return {
            dialogVisible: false,
            searchData: searchData,/* 选中的数据 */
            ratio: 0,
            formData: {
                /* 使用折扣金额 */
                useOffMoney: 0
            },
            rules1: {
                useOffMoney: [
                    {
                        validator: useOffMoneyCheck
                    }
                ]
            }
        }
    },
    methods: {
        /* 费用抵扣 */
        add() {
            this.dialogVisible = true;
        },
        /* 关闭弹窗 */
        handleClose(done) {
            this.searchData = [];
            this.formData.useOffMoney = '';
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
            /* 验证 */
            _this.$refs.form1.validate(valide => {
                if (valide) {
                    this.fetchCalcMoney()
                        .then(calcMoney => {
                            _this.dialogVisible = false;
                            _this.$emit('CostOffEvent', calcMoney, this.formData.useOffMoney, this.searchData);
                        });
                }
            });
        },
        useOffMoneyChange(value, oldValue) {
            let _this = this;
            /* 验证 */
            _this.$refs.form1.validate(valide => {
                if (valide) {
                    let useOffMoney = value ? parseFloat(value).toFixed(2) : 0;
                    _this.searchData.forEach(v => {
                        if (useOffMoney > v.reserve || useOffMoney == v.reserve) {
                            v.currentMoney = parseFloat(v.reserve).toFixed(2);
                            useOffMoney = useOffMoney - v.reserve;
                        } else if (useOffMoney < v.reserve) {
                            v.currentMoney = parseFloat(useOffMoney).toFixed(2);
                            useOffMoney = 0;
                        }
                    });
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
                totalFee: this.formData.useOffMoney,
                itemList: itemList
            };
            return this.$http.post('/ocm-web/api/b2b/purchase-orders/calculateFee', paramsWrap)
                .then(res => res.data.itemList);
        }
    },
    computed: {
        maxMoney() {
            return `最多可使用${this.totalMoney * this.ratio}元`
        }
    },
    mounted() {
        // this.fetchUseOffMoney()
        // this.fetchMoneyType();
        // this.this.useOffMoney = this.totalMoney * this.ratio;
    }
}
</script>
<style lang="scss">
@import './CostOff.scss';
</style>

