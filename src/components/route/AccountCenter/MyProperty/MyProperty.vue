<template>
    <div class="MyProperty">
        <div class="MyPropertyLeft">
            <div @click="cashRestDetail"
                class="cashRest MypropertyLeftItem">
                <div class="main">
                    <el-row>
                        <el-col :span="7">
                            <div class="text">现金:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="money"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="brief">
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">账面余额:</div>
                        </el-col>
                        <el-col :span="17">
                            <div class="text"
                                v-red>{{totalCash|formatInOut}}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">可用余额:</div>
                        </el-col>
                        <el-col :span="17">
                            <div class="text"
                                v-red>{{cashRemaining|formatInOut}}</div>
                        </el-col>
                    </el-row>
                </div>

            </div>
            <div @click="promiseRestDetail"
                class="promiseRest MypropertyLeftItem">
                <div class="main">
                    <el-row>
                        <el-col :span="7">
                            <div class="text">保证金:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="money"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="brief">
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">账面余额:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="text"
                                v-red>{{totalPromiseRest|formatInOut}}</div>
                        </el-col>
                    </el-row>
                </div>

            </div>
            <div class="costRest MypropertyLeftItem">
                <div class="main">
                    <el-row>
                        <el-col :span="7">
                            <div class="text">费用:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="money"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="brief">
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">账面余额:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="text"
                                v-red>{{totalCost|formatInOut}}</div>
                        </el-col>
                        <el-col :span="7">
                            <div @click="costOffDetail"
                                class="lookDetail">查看明细
                                <i class="el-icon-d-arrow-right"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">可用余额:</div>
                        </el-col>
                        <el-col :span="17">
                            <div class="text"
                                v-red>{{costOffRemaining|formatInOut}}</div>
                        </el-col>
                    </el-row>
                </div>

            </div>
            <div class="buildRest MypropertyLeftItem">
                <div class="main">
                    <el-row>
                        <el-col :span="7">
                            <div class="text">共建基金:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="money"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="brief">
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">账面余额:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="text"
                                v-red>{{totalBuildRest|formatInOut}}</div>
                        </el-col>
                        <el-col :span="7">
                            <div @click="buildRestDetail"
                                class="lookDetail">查看明细
                                <i class="el-icon-d-arrow-right"></i>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="notDeliver MypropertyLeftItem">
                <div class="main">
                    <el-row>
                        <el-col :span="7">
                            <div class="text">订单:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="money"></div>
                        </el-col>
                    </el-row>
                </div>
                <div class="brief">
                    <el-row>
                        <el-col :span="7"
                            style="text-align:right;">
                            <div class="text">终审未发货:</div>
                        </el-col>
                        <el-col :span="10">
                            <div class="text"
                                v-red>{{notDeliver|formatInOut}}</div>
                        </el-col>
                        <el-col :span="7">
                            <div @click="notDeliverDetail"
                                class="lookDetail">查看明细
                                <i class="el-icon-d-arrow-right"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="7">
                            <div class="text"
                                style="text-align:right;">未终审:</div>
                        </el-col>
                        <el-col :span="10"
                            v-red>{{unSendAmountFinal|formatInOut}}</el-col>
                    </el-row>
                </div>
            </div>

        </div>
        <div class="MyPropertyRight">
            <component :is="currentShow"
                :tableDataArr='tableDataArr'></component>
        </div>
    </div>
</template>
<script>
import costOff from './costOff/costOff';
import promiseRest from './promiseRest/promiseRest';
import buildRest from './buildRest/buildRest';
import NotdeliverMoney from './NotdeliverMoney/NotdeliverMoney';
export default {
    name: 'MyProperty',
    components: { costOff, promiseRest, buildRest },
    data() {
        return {
            totalCash: 0,//总现金
            totalCost: 0,//总费用
            totalPromiseRest: 0,//总保证金
            totalBuildRest: 0,//总共建基金
            currentShow: '',//费用(costOff)|保证金(promiseRest)|共建基金(buildRest)
            tableDataArr: [],
            notDeliver: 0,//未发货金额
            unSendAmountFinal: 0,//未终审
            costOffRemaining:0,//费用余额
            cashRemaining:0,//现金可用余额
            //缓存表格明细信息
            cacheTableDataArr: {
                //现金余额
                cashTableDataArr: [],
                //费用余额
                costtableDataArr: [],
                //保证金余额
                promiseTableDataArr: [],
                //共建基金余额
                buildTableDataArr: [],
                //未发货金额
                notDeliverTableDataArr: [],
            },
            paramsInfo: {
                /* 现金余额 */
                cashRestInfo: {
                    url: '/ocm-web/api/b2b/query-balance/queryCashReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //费用
                costRestInfo: {
                    url: '/ocm-web/api/b2b/query-balance/queryChargeReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //保证金
                promiseRestInfo: {
                    url: '/ocm-web/api/b2b/query-balance/queryDepositReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //共建基金
                buildRestInfo: {
                    url: '/ocm-web/api/b2b/query-balance/queryFundReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //未发货金额
                notDeliverInfo: {
                    url: '/ocm-web/api/b2b/purchase-orders/countUnSendedOrderByCustomerId',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //未审核金额
                unSendAmountInfo: {
                    url: '/ocm-web/api/b2b/purchase-orders/countUnApproveOrderByCustomerId',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //费用余额，可用余额
                costOffRemainingInfo:{
                    url: '/ocm-web/api/b2b/query-balance/getTwoChargeReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                },
                //现金可用余额
                cashRemainingInfo:{
                    url: '/ocm-web/api/b2b/query-balance/getCashReserve',
                    paramsWrap: {
                        params: {
                            customerId: this.$store.state.customerId
                        }
                    }
                }
            }
        }
    },
    methods: {
        /* 现金余额click */
        cashRestDetail() {
            let _this = this;
            _this.currentShow = '';
        },
        /* 费用余额click */
        costOffDetail() {
            let _this = this;
            _this.currentShow = costOff;
            _this.tableDataArr = _this.cacheTableDataArr.costtableDataArr;

        },
        /* 保证金余额click */
        promiseRestDetail() {
            let _this = this;
            this.currentShow = '';
            // _this.tableDataArr = _this.cacheTableDataArr.promiseTableDataArr;
        },
        /* 共建基金余额click */
        buildRestDetail() {
            let _this = this;
            this.currentShow = buildRest;
            _this.tableDataArr = _this.cacheTableDataArr.buildTableDataArr;
        },
        //未发货金额
        notDeliverDetail() {
            let _this = this;
            _this.currentShow = NotdeliverMoney;
            _this.tableDataArr = _this.cacheTableDataArr.notDeliverTableDataArr;
        },
        fetchCashRestDetail() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.cashRestInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    return {
                        total: res.data
                    }
                });
        },
        fetchCostOffDetail() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.costRestInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.eReserve || 0) + (v.qReserve || 0) + (v.fReserve || 0)
                    }, 0);
                    return {
                        total: total,
                        data: res.data
                    }
                });
        },
        fetchPromiseRestDetail() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.promiseRestInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    return res.data;
                });
        },
        fetchBuildRestDetail() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.buildRestInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.reserve || 0);
                    }, 0);
                    return {
                        total: total,
                        data: res.data
                    }
                });
        },
        //获取未发货金额
        fetchNotDeliverDetail() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.notDeliverInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.unSendAmount || 0);
                    }, 0);
                    return {
                        total: total,
                        data: res.data
                    }
                })
        },
        //未审核金额
        fetchUnSendAmount() {
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.unSendAmountInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.unSendAmount || 0);
                    }, 0);
                    return total;
                })
        },
        //获取费用余额
        fetchCostOffRemaining(){
            let _this = this;
            //costOffRemainingInfo
            let { url, paramsWrap } = _this.paramsInfo.costOffRemainingInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.actualReserve || 0);
                    }, 0);
                    return total;
                })
        },
        //获取现金可用余额
        fetchCashRemaining(){
            let _this = this;
            let { url, paramsWrap } = _this.paramsInfo.cashRemainingInfo;
            return _this.$http.get(url, paramsWrap)
                .then(res => {
                    return res.data;
                })
        }
    },
    mounted() {
        let _this = this;
        _this.fetchCashRestDetail().then(res => {
            let { total } = res;
            _this.totalCash = total;
        });
        _this.fetchCostOffDetail().then(res => {
            let { total, data } = res;
            _this.cacheTableDataArr.costtableDataArr = data;
            _this.totalCost = total;
        });
        _this.fetchPromiseRestDetail().then(res => {
            _this.totalPromiseRest = res;
        });
        _this.fetchBuildRestDetail().then(res => {
            let { total, data } = res;
            _this.cacheTableDataArr.buildTableDataArr = data;
            _this.totalBuildRest = total;
        });
        _this.fetchNotDeliverDetail().then(res => {
            let { total, data } = res;
            _this.cacheTableDataArr.notDeliverTableDataArr = data;
            _this.notDeliver = total;
        });
        _this.fetchUnSendAmount().then(res => _this.unSendAmountFinal = res);
        _this.fetchCostOffRemaining().then(res => _this.costOffRemaining = res);
        _this.fetchCashRemaining().then(res=>_this.cashRemaining = res);
    }
}
</script>
<style lang="scss" scoped>
@import './MyProperty';
</style>