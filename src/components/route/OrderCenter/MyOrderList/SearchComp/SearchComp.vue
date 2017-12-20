<template>
    <div class="SearchComp">
        <div class="searchBox">
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="searchName">订单类型：</div>
                </el-col>
                <el-col :span="10">
                    <el-select size="mini" v-model="orderType" placeholder="请选择" style="width:100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <div class="searchName">订单状态：</div>
                </el-col>
                <el-col :span="10">
                    <el-select size="mini" v-model="orderStatus" placeholder="请选择" style="width:100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top:10px;">
                <el-col :span="2">
                    <div class="searchName">订单日期：</div>
                </el-col>
                <el-col :span="10">
                    <el-date-picker size="mini" v-model="orderDateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button @click="clearSearchData" size="mini" type="primary">清空</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button @click="searchData" size="mini" type="primary">搜索</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
let options = [{ value: '0', label: '全部' }, { value: '1', label: '暂存' }, { value: '2', label: '已提交' }];
let orderData = [
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "1郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num:5,
        money:4000,
        orderStatus:'暂存'
    },
    {
        orderType: "融资订单",
        orderDate: "2017-12-12",
        orderCode: "langjiu12345678",
        goodsImg: "src/assets/goodsItem.png",
        orderDesc: "2郎酒 红花郎（10）陈酿 53度整箱装 白酒 558m l*6瓶（箱内有礼)",
        "volume": 500,
        "strength": 53,
        "price": 1000,
        num:5,
        money:4000,
        orderStatus:'暂存'
    }
];
export default {
    name: 'SearchComp',
    props: ['searchUrl'],
    data() {
        return {
            orderType: '',
            orderStatus: '',
            orderDateRange: '',
            options: options
        }
    },
    methods: {
        searchData() {
            let startTime = '';
            let endTime = '';
            if (this.orderDateRange) {
                startTime = this.orderDateRange[0].getTime();
                endTime = this.orderDateRange[1].getTime();
            }
            let params = {
                orderType: this.orderType,
                orderStatus: this.orderStatus,
                startTime: startTime,
                endTime: endTime
            };
            this.$emit('searchData',orderData)

        },
        clearSearchData() {
            this.orderType = '';
            this.orderStatus = '';
            this.orderDateRange = '';
        }
    }
}
</script>
<style lang="scss" scoped>
@import './SearchComp.scss';
</style>


