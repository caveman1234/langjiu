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
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="订单总金额：" label-width="130px">
                                    <div>{{totalMoney}}</div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="可用费用余额：" label-width="130px">
                                    <div>{{moneyRest}}</div>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="本次最大使用金额：" label-width="130px" style="font-size:12px;">
                                    <div>{{maxUseRest}}</div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="14">
                                <el-form-item label="本次使用金额：" prop="useOffMoney" label-width="130px" style="font-size:12px;">
                                    <el-input @input="useOffMoneyChange" :placeholder="placeholderMax" v-model="formData.useOffMoney" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

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
        let useOffMoneyCheck = function (rule, value, callback) {

            let validateValue = Number(value);
            let isNotNum = Number.isNaN(validateValue);
            if (isNotNum) {
                callback(new Error('必须输入数字'));
            }
            let maxDiscont = _this.totalMoney * _this.ratio;
            if (validateValue > maxDiscont) {
                callback(new Error(`金额必须小于${maxDiscont}`));
            }
            if (validateValue > _this.moneyRest) {
                callback(new Error(`输入金额必须小于总可用余额${_this.moneyRest}`));
            }
            callback();
        };
        return {
            dialogVisible: false,
            searchData: [],/* e q f 费用 */
            ratio: 0,
            formData: {
                /* 使用折扣金额 */
                useOffMoney: ''
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
            this.fetchUseOffMoney();
        },
        cancel() {
            this.dialogVisible = false;
        },
        /* 确认 */
        confirm(isMainPage) {
            let _this = this;
            /* 验证 */
            //主页进来就加载计算
            if (isMainPage == true) {
                this.fetchCalcMoney()
                    .then(calcMoney => {
                        _this.dialogVisible = false;
                        _this.$emit('CostOffEvent', calcMoney, _this.formData.useOffMoney, _this.searchData);
                    });
            } else {
                _this.$refs.form1.validate(valide => {
                    if (valide) {
                        _this.fetchCalcMoney()
                            .then(calcMoney => {
                                _this.dialogVisible = false;
                                _this.$emit('CostOffEvent', calcMoney, _this.formData.useOffMoney, _this.searchData);
                            });
                    }
                });
            }


        },
        /* 输入框改变事件 */
        useOffMoneyChange(value, oldValue) {
            let _this = this;
            /* 验证 */
            _this.$refs.form1.validate(valide => {
                if (valide) {
                    let useOffMoney = value ? parseFloat(value).toFixed(2) : 0;
                    _this.searchData.forEach(v => {
                        if (useOffMoney > v.reserve || useOffMoney == v.reserve) {
                            if (v.reserve < 0) {
                                v.currentMoney = 0.00;
                            } else {
                                v.currentMoney = parseFloat(v.reserve).toFixed(2);
                                useOffMoney = useOffMoney - v.reserve;
                            }

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
            return this.$http.get('/ocm-web/api/base/customer/getMaxLimit', paramsWrap)
                .then(res => {
                    this.ratio = res.data;
                    // this.formData.useOffMoney = this.ratio * this.totalMoney;
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
            debugger
            return this.$http.get('/ocm-web/api/b2b/query-balance/getChargeReserve', paramsWrap)
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
                    basePrice: v.basicPrice || v.basePrice,
                    fundPrice: v.fundPrice
                }
            });

            let paramsWrap = {
                saleChannelCode: '00',
                distributorId: this.$store.state.customerId,
                productGroupId: this.$store.state.prodGroupId,
                totalFee: Number(this.formData.useOffMoney),
                //++
                eFeeUsedAmount: this.searchData[0] ? this.searchData[0].currentMoney : 0,
                qFeeUsedAmount: this.searchData[1] ? this.searchData[1].currentMoney : 0,
                fFeeUsedAmount: this.searchData[2] ? this.searchData[2].currentMoney : 0,
                //++
                itemList: itemList
            };
            debugger
            return this.$http.post('/ocm-web/api/b2b/purchase-orders/calculateFee', paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        return res.data.itemList
                    } else {
                        Promise.reject();
                    }
                });
        }
    },
    computed: {
        maxMoney() {
            return `最多可使用${this.totalMoney * this.ratio}元`
        },
        moneyRest() {
            return this.searchData.reduce((acc, v) => (acc + v.reserve), 0).toFixed(2)
        },
        placeholderMax() {
            //本次最大使用金额
            let maxUsed = this.totalMoney * this.ratio;
            //费用余额
            let moneyRest = this.moneyRest;
            return String(Math.min(maxUsed, moneyRest).toFixed(2));
        },
        //最大使用额度
        maxUseRest() {
            //最大使用额
            let maxUse = Number(this.totalMoney * this.ratio).toFixed(2);
            //费用余额
            let moneyRest = Number(this.moneyRest);
            return Number(maxUse > moneyRest ? moneyRest : maxUse).toFixed(2);
        }
    },
    mounted() {
        this.fetchMoneyType();
        this.fetchUseOffMoney();
    }
}
</script>
<style lang="scss">
@import "./CostOff.scss";
</style>

