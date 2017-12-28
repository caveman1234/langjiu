<template>
    <div class="MyProperty">
        <div class="MyPropertyLeft">
            <div @click="cashRestDetail" class="cashRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">现金余额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥{{totalCash}}</div>
                    </el-col>
                    <el-col :span="7">
                        <!-- <div class="lookDetail">查看明细
                                                                                <i class="el-icon-d-arrow-right"></i>
                                                                            </div> -->
                    </el-col>
                </el-row>
            </div>
            <div @click="costOffDetail" class="costRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">费用余额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥{{totalCost}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div @click="buildRestDetail" class="buildRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">共建基金余额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥{{totalBuildRest}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div @click="promiseRestDetail" class="promiseRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">保证金余额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥{{totalPromiseRest}}</div>
                    </el-col>
                    <el-col :span="7">
                        <div class="lookDetail">查看明细
                            <i class="el-icon-d-arrow-right"></i>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="notDeliver MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">未发货金额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥50002.00</div>
                    </el-col>
                    <el-col :span="7">

                    </el-col>
                </el-row>
            </div>

        </div>
        <div class="MyPropertyRight">
            <component :is="currentShow" :tableDataArr='tableDataArr'></component>
        </div>
    </div>
</template>
<script>
import costOff from './costOff/costOff';
import promiseRest from './promiseRest/promiseRest';
import buildRest from './buildRest/buildRest';
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
            //缓存表格明细信息
            cacheTableDataArr: {
                cashTableDataArr: [],
                costtableDataArr: [],
                promiseTableDataArr: [],
                buildTableDataArr: [],
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
            }
        }
    },
    methods: {
        /* 现金余额明细 */
        cashRestDetail() {
            let _this = this;
            _this.currentShow = '';
            
        },
        /* 费用余额明细 */
        costOffDetail() {
            let _this = this;
            _this.currentShow = costOff;
            _this.tableDataArr =_this.cacheTableDataArr.costtableDataArr;

        },
        /* 保证金余额明细 */
        promiseRestDetail() {
            let _this = this;
            this.currentShow = promiseRest;
            _this.tableDataArr =_this.cacheTableDataArr.promiseTableDataArr;
        },
        /* 共建基金余额明细 */
        buildRestDetail() {
            let _this = this;
            this.currentShow = buildRest;
            _this.tableDataArr =_this.cacheTableDataArr.buildTableDataArr;
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
    }
}
</script>
<style lang="scss" scoped>
@import './MyProperty';
</style>