<template>
    <div class="MoneyRestItem">
        <div class="itemTitle">{{title}}</div>
        <div class="itemMoneyContent">
            <span class="itemMoney">¥100000.00</span>
            <span class="loogDetail">查看明细</span>
        </div>
        <div class="itemTab">
            <el-tabs v-model="titleCurrentActive" type="card" @tab-click="handleClick">
                <el-tab-pane label="小郎酒事业部" name="first">
                    <div class="tabContainer">
                        <div class="totalAmount">
                            <span>总额:</span>
                            <span class="money">100000.00</span>
                        </div>
                        <div class="moneyType">
                            <span>E类：2000.00</span>
                            <span>Q类：2001.00</span>
                            <span>F类：2002.00</span>
                        </div>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="红花郎事业部" name="second">红花郎事业部</el-tab-pane>
                <el-tab-pane label="特曲事业部" name="third">特曲事业部</el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>
<script>
export default {
    name: 'MoneyRestItem',
    props: ['title'],
    data() {
        return {
            titleCurrentActive: "first",

        }
    },
    methods: {
        handleClick({ name }) {
            let _this = this;
            _this.$emit('itemClick', name);
        }
    }
}
</script>
<style lang="scss">
@import './MoneyRestItem.scss';
</style>
