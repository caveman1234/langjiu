<template>
    <div class="SearchComp">
        <div class="searchBox">
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="searchName">订单类型：</div>
                </el-col>
                <el-col :span="10">
                    <el-select size="mini" v-model="searchCondition.orderType" placeholder="请选择" style="width:100%;">
                        <el-option v-for="item in searchCondition.orderTypeCombo" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <div class="searchName">订单状态：</div>
                </el-col>
                <el-col :span="10">
                    <el-select size="mini" v-model="searchCondition.orderStatus" placeholder="请选择" style="width:100%;">
                        <el-option v-for="item in searchCondition.orderStatusCombo" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top:10px;">
                <el-col :span="2">
                    <div class="searchName">订单日期：</div>
                </el-col>
                <el-col :span="10">
                    <el-date-picker size="mini" v-model="searchCondition.orderDateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button @click="clearSearchData" size="mini" type="primary">清空</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button id="searchBtn" @click="searchData" size="mini" type="primary">搜索</el-button>
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
        num: 5,
        money: 4000,
        orderStatus: '暂存'
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
        num: 5,
        money: 4000,
        orderStatus: '暂存'
    }
];
export default {
    name: 'SearchComp',
    props: ['searchParams'],
    data() {
        return {
            searchCondition: {
                /* 订单类型v-model */
                orderType: '',
                /* 订单状态 */
                orderStatus: '',
                /* 日期范围 */
                orderDateRange: '',
                /* 订单类型combo */
                orderTypeCombo: [],
                /* 订单状态combo */
                orderStatusCombo: []
            },

        }
    },
    methods: {
        searchData() {
            let _this = this;
            let startTime = '';
            let endTime = '';
            if (this.searchCondition.orderDateRange) {
                startTime = this.searchCondition.orderDateRange[0].getTime();
                endTime = this.searchCondition.orderDateRange[1].getTime();
            }
            let params = {
                distributorIds: this.searchParams.distributorIds,
                poTypeBusinessType: this.searchParams.poTypeBusinessType,
                billStatusCode: this.searchParams.billStatusCode,
                orderDateStart: startTime,
                orderDateEnd: endTime,
                poTypeId: this.searchCondition.orderType,
                billStatusCode: this.searchCondition.orderStatus
            };
            _this.$http.post(this.searchParams.serverUrl, params)
                .then(res => {
                    let data = res.data.content;
                    _this.$emit('searchData', data)
                });

        },
        clearSearchData() {
            this.searchCondition.orderType = '';
            this.searchCondition.orderStatus = '';
            this.searchCondition.orderDateRange = '';
        },
        fetchCombos() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    productGroupId: this.$store.state.prodGroupId
                }
            };
            /* 获取订单类型 */
            _this.$http.get('/ocm-web/api/b2b/po-types/get-common')
                .then(res => {
                    _this.searchCondition.orderTypeCombo = res.data.map(v => ({ label: v.name, value: v.id }));
                });
            /* 获取订单状态 */
            _this.$http.get('/ocm-web/api/b2b/billstatus/getAll')
                .then(res => {
                    _this.searchCondition.orderStatusCombo = res.data.map(v => ({ label: v.name, value: v.value }));
                });
        }
    },
    mounted() {
        /* 获取下拉框 */
        this.fetchCombos();
        this.searchData();
    }
}
</script>
<style lang="scss" scoped>
@import './SearchComp.scss';
</style>


