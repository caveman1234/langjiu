<template>
    <div class="MyProperty">
        <div class="propertyTitle">
            <el-row>
                <el-col :span="12">
                    <MoneyRestItem title="现金余额"></MoneyRestItem>
                </el-col>
                <el-col :span="12">
                    <MoneyRestItem title="费用余额"></MoneyRestItem>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <MoneyRestItem title="共建基金"></MoneyRestItem>
                </el-col>
                <el-col :span="12">
                    <MoneyRestItem title="保证金余额"></MoneyRestItem>
                </el-col>
            </el-row>
        </div>
        <div class="propertyBody">
            <el-tabs v-model="bodyCurrentActive" type="card">
                <el-tab-pane label="现金余额" name="first">
                    <div class="tabContainer">
                        <el-table :data="cashRest" style="width: 100%">
                            <el-table-column prop="date" label="时间"></el-table-column>
                            <el-table-column prop="date" label="摘要"></el-table-column>
                            <el-table-column prop="date" label="单号"></el-table-column>
                            <el-table-column prop="date" label="事业部|品类"></el-table-column>
                            <el-table-column prop="date" label="支出"></el-table-column>
                            <el-table-column prop="date" label="收入"></el-table-column>
                            <el-table-column prop="date" label="金额"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="费用余额" name="second">
                    <div class="tabContainer">
                        <el-table :data="cashRest" style="width: 100%">
                            <el-table-column prop="date" label="时间"></el-table-column>
                            <el-table-column prop="date" label="摘要"></el-table-column>
                            <el-table-column prop="date" label="单号"></el-table-column>
                            <el-table-column prop="date" label="事业部|品类"></el-table-column>
                            <el-table-column prop="date" label="支出"></el-table-column>
                            <el-table-column prop="date" label="收入"></el-table-column>
                            <el-table-column prop="date" label="金额"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="共建基金" name="third">
                    <div class="tabContainer">
                        <el-table :data="cashRest" style="width: 100%">
                            <el-table-column prop="date" label="时间"></el-table-column>
                            <el-table-column prop="date" label="摘要"></el-table-column>
                            <el-table-column prop="date" label="单号"></el-table-column>
                            <el-table-column prop="date" label="事业部|品类"></el-table-column>
                            <el-table-column prop="date" label="支出"></el-table-column>
                            <el-table-column prop="date" label="收入"></el-table-column>
                            <el-table-column prop="date" label="金额"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="保证金余额" name="forth">
                    <div class="tabContainer">
                        <el-table :data="cashRest" style="width: 100%">
                            <el-table-column prop="date" label="时间"></el-table-column>
                            <el-table-column prop="date" label="摘要"></el-table-column>
                            <el-table-column prop="date" label="单号"></el-table-column>
                            <el-table-column prop="date" label="事业部|品类"></el-table-column>
                            <el-table-column prop="date" label="支出"></el-table-column>
                            <el-table-column prop="date" label="收入"></el-table-column>
                            <el-table-column prop="date" label="金额"></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import MoneyRestItem from './MoneyRestItem/MoneyRestItem';
export default {
    name: 'MyProperty',
    components: { MoneyRestItem },
    data(){
        return {
            cashRest: [],//现金余额
            moneyRest: [],//费用余额
            buildMoney: [],//共建基金
            promistMoney: [],//保证金余额
            bodyCurrentActive: "forth",
        }
    }
}
</script>
<style lang="scss" scoped>
@import './MyProperty';
</style>