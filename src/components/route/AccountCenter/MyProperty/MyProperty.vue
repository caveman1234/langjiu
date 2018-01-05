<template>
    <div class="MyProperty">
        <div class="MyPropertyLeft">
            <div @click="cashRestDetail"
                class="cashRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="7">
                        <div class="text">现金余额:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="money">{{totalCash|formatPrice}}</div>
                    </el-col>
                    <el-col :span="7">
                        <!-- <div class="lookDetail">查看明细
                                                                                            <i class="el-icon-d-arrow-right"></i>
                                                                                        </div> -->
                    </el-col>
                </el-row>
            </div>
            <div @click="costOffDetail"
                class="costRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="7">
                        <div class="text">费用余额:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="money">{{totalCost|formatPrice}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div @click="buildRestDetail"
                class="buildRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="7">
                        <div class="text">共建基金余额:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="money">{{totalBuildRest|formatPrice}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div @click="promiseRestDetail"
                class="promiseRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="7">
                        <div class="text">保证金余额:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="money">{{totalPromiseRest|formatPrice}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div @click="notDeliverDetail"
                class="notDeliver MypropertyLeftItem">
                <el-row>
                    <el-col :span="7">
                        <div class="text">未发货金额:</div>
                    </el-col>
                    <el-col :span="10">
                        <div class="money">{{notDeliver|formatPrice}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
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
            this.currentShow = promiseRest;
            _this.tableDataArr = _this.cacheTableDataArr.promiseTableDataArr;
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
                    let total = res.data.reduce((acc, v) => {
                        return acc + (v.deposit || 0);
                    }, 0);
                    return {
                        total: total,
                        data: res.data
                    }
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
            let { total, data } = res;
            _this.cacheTableDataArr.promiseTableDataArr = data;
            _this.totalPromiseRest = total;
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
    }
}
</script>
<style lang="scss" scoped>
@import './MyProperty';
</style>