<template>
    <div class="MyProperty">
        <div class="MyPropertyLeft">
            <div @click="cashRestDetail" class="cashRest MypropertyLeftItem">
                <el-row>
                    <el-col :span="5">
                        <div class="text">现金余额:</div>
                    </el-col>
                    <el-col :span="12">
                        <div class="money">¥10000000.00</div>
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
                        <div class="money">¥10000000.00</div>
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
                        <div class="money">¥10000000.00</div>
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
                        <div class="money">¥10000000.00</div>
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
            currentShow: '',//费用(costOff)|保证金(promiseRest)|共建基金(buildRest)
            tableDataArr: [],
            paramsInfo: {
                
                //费用
                costRestInfo: {
                    url: '',
                    paramsWrap: {
                        params: {}
                    }
                },
                //保证金
                promiseRestInfo: {
                    url: '',
                    paramsWrap: {
                        params: {}
                    }
                },
                //共建基金
                buildRestInfo: {
                    url: '',
                    paramsWrap: {
                        params: {}
                    }
                },
            }
        }
    },
    methods: {
        /* 现金余额明细 */
        cashRestDetail() {
            this.currentShow = '';
        },
        /* 费用余额明细 */
        costOffDetail() {
            let _this = this;
            _this.currentShow = costOff;
            let { url, paramsWrap } = _this.paramsInfo.costRestInfo;
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.tableDataArr = res;
                });

        },
        /* 保证金余额明细 */
        promiseRestDetail() {
            let _this = this;
            this.currentShow = promiseRest;
            let { url, paramsWrap } = _this.paramsInfo.promiseRestInfo;
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.tableDataArr = res;
                });
        },
        /* 共建基金余额明细 */
        buildRestDetail() {
            let _this = this;
            this.currentShow = buildRest;
            let { url, paramsWrap } = _this.paramsInfo.buildRestInfo;
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.tableDataArr = res;
                });
        },
    }
}
</script>
<style lang="scss" scoped>
@import './MyProperty';
</style>