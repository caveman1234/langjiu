<template>
    <div class="GenerateBillsEdit">

        <div class="goodsInfo">
            <AddNewGoods @receiveData="receiveData"></AddNewGoods>
            <div class="goodsContent">
                <el-table 
                    :data="goodsData" 
                    :summary-method="getSummaries" 
                    show-summary 
                    border 
                    style="width: 100%"
                >
                    <el-table-column prop="productDesc" label="商品详情" width="200">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="规格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.standard}}ml</div>
                                <div>度数：{{scope.row.productModel}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basicPrice" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：{{scope.row.basicPrice | formatPrice}}</div>
                                <div v-if="false">共建：¥{{scope.row.fundPrice || 0}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="件数" width="180">
                        <template slot-scope="scope">
                            <el-input-number @change="baleQuantityChange(scope.row)" v-model="scope.row.baleQuantity" :min="1" size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentTotalMoney" label="货款金额" width="180px">
                        <template slot-scope="scope">
                            <div>{{scope.row.paymentTotalMoney|formatPrice}}</div>
                        </template>
                    </el-table-column>




                    <el-table-column label="请选择赠品" width="200px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.presentScheme && scope.row.presentScheme.length > 0">
                                <el-select v-model="scope.row.giftId" placeholder="请选择" size="mini">
                                    <el-option
                                        v-for="(item,index) in scope.row.presentScheme"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                            <template v-else>
                                <div style="color: #d4d4d4;">无赠品</div>
                            </template>
                            

                        </template>
                    </el-table-column>



                    
                    <el-table-column prop="handle" label="操作">
                        <template slot-scope="scope">
                            <div class="handle">
                                <i @click="delOneItem(scope.row)" class="el-icon-delete"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="goodsFooter"></div>
        </div>
        <div class="handle">
            <div class="handleWrap">
                <el-row>
                    <el-col :span="22">
                        <div class="opacity0">1</div>
                    </el-col>
                    <el-col :span="2">
                        <el-button @click="confirm" type="primary" size="mini">确定</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>

import AddNewGoods from '../AddNewGoods/AddNewGoods';
export default {
    name: 'GenerateBillsEdit',
    components: { AddNewGoods },
    data() {
        return {
            /* 表格数据 */
            goodsData: [],
            defaultImg: require('../../../../assets/defaultimg.png'),
            dialogVisible: false,//dialog配额弹框
            isGiftBills:false,//是否是赠品组合
        }
    },
    methods: {
        delOneItem({ productId }) {
            let index = this.goodsData.findIndex(v => v.productId === productId);
            this.goodsData.splice(index, 1);
        },
        /* 接收搜索数据 */
        receiveData(data) {
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));
            willAppendData = willAppendData.map(v => {
                //baleQuantity 件数
                //baseQuantity 瓶数
                //packageNum 一包瓶数
                //paymentTotalMoney 货款金额
                let megerObj = {};
                //件
                megerObj.baleQuantity = v.baleQuantity || 1;
                // 瓶
                megerObj.baseQuantity = megerObj.baleQuantity * v.packageNum;
                // 货款金额
                megerObj.paymentTotalMoney = megerObj.baseQuantity * v.basicPrice;
                return Object.assign({}, v, megerObj);
            });
            this.goodsData = this.goodsData.concat(willAppendData);
            //获取配赠方案
            this.fetchPresentScheme();
        },
        /* 件数变化 */
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baleQuantity = Math.floor(row.baleQuantity);
                row.baseQuantity = (row.baleQuantity) * row.packageNum;

                row.paymentTotalMoney = row.baseQuantity * row.basicPrice;
            });
        },
        //验证
        validateData() {
            var passed = this.goodsData.every(v => {
                var presentScheme = v.presentScheme || [];
                if (presentScheme.length == 0) {
                    return true;
                } else {
                    return v.giftId !== "";
                }
            });
            return passed;
        },
        //验证混合下单
        validateIsAll() {
            var goodsData = this.goodsData;
            var isAllGifterrorArr = [];
            var isAllNormalArr = [];
            var result = true;
            //productDesc
            //要么是赠品，要么全是普通产品
            var isAllGift = goodsData.every(v => {
                return (v.presentScheme || []).length > 0;
            });
            var isAllNormal = goodsData.every(v => {
                return (v.presentScheme || []).length === 0;
            });
            if (isAllGift == true) {
                this.isGiftBills = true;
            }
            if (isAllNormal == true) {
                this.isGiftBills = false;
            }
            if (isAllGift || isAllNormal) {
                return true;
            } else {
                var errorMsg = goodsData
                    .filter(v => (v.presentScheme || []).length === 0)
                    .map(v => `【${v.productDesc}】`)
                    .join(",");
                this.$Notify({ title: `${errorMsg}无配赠产品,不能合并下单，请修改！`, type: 'warning' });
                return false;
            }
        },
        fetchPresentScheme() {
            var goodsInfos = this.goodsData.map(v => ({
                goodsId: v.productId,
                goodsNum: v.baleQuantity,//件
                // goodsAmount: "",
                goodsUnitPrice: v.basicPrice,
            }));
            var params = {
                goodsInfos: goodsInfos,
                orderCreateDate: new Date().getTime(),//下单时间
                // organizationId: "",//销售组织
                saleChannelCode: '00',//分销渠道
                customerId: this.$store.state.customerId,
                prodGroupId: this.$store.state.prodGroupId
            };
            var url = "/ocm-web/api/prom/rule-pubapi/gift";
            var config = {
                // async:false,
                // headers:{}
            };
            this.$http.post(url, params, config)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        var goodsData = this.goodsData;
                        //组装datasource
                        Object.entries(res.data).forEach(arr => {
                            var productId = arr[0];
                            var rulesArr = arr[1];
                            var dataSource = rulesArr.reduce((acc, rule, i) => {
                                var productArr = rule.buyGiftResponseDetailDtos;
                                var dataSourceItem = productArr.map(product => {
                                    return {
                                        label: product.giftName,
                                        value: product.giftId
                                    }
                                });
                                return [...acc, ...dataSourceItem];
                            }, []);
                            //当前行数据
                            var currentObj = goodsData.find(v => v.productId == productId);
                            currentObj.presentScheme = dataSource;
                            //如果只有一行数据默认第一行数据选中
                            if (dataSource.length == 1) {
                                // currentObj.giftId = dataSource[0].value
                            }
                        });
                        var goodsDataDeepCopy = JSON.parse(JSON.stringify(goodsData));
                        this.goodsData = goodsDataDeepCopy;
                    }
                });
        },

        //跳转路由
        jumpRoute() {
            let selectedData = this.goodsData.map(v => ({ ...v }));
            this.$router.push({
                name: 'GenerateBills',
                params: {
                    selectedData: selectedData,
                    isGiftBills:this.isGiftBills
                }
            });
        },
        /* 确定 */
        confirm() {
            var _this = this;
            if (_this.goodsData.length === 0) {
                this.$Notify({ title: '商品不能为空', type: 'warning' });
                return;
            }
            var isAllValidatePassed = _this.validateIsAll();
            if (!isAllValidatePassed) {
                return;
            }
            var passed = this.validateData();
            if (!passed) {
                _this.$confirm('有未参加配赠的商品,是否继续？', '有未参加配赠的商品', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    _this.jumpRoute();
                }).catch(() => { });
            } else {
                _this.jumpRoute();
            }
            //配额是否充足
        },

        //表格合计
        getSummaries(params) {
            let _this = this;
            const { columns, data } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a), 0);
                        let value = String(Number(total).toFixed(2));
                        var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        arr[i] = `货款总金额:¥${str}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        }
    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 + 总共建基金
                total = total + (v.baseQuantity * (v.basicPrice || 0) + (v.baseQuantity * (v.fundPrice || 0)))
            });
            return total;
        }
    },
    mounted() {

    },
    activated() {
        //mounted
        if (this.$route.params.selectedData) {
            //添加商品
            this.goodsData = this.$route.params.selectedData.map(v => {
                //baleQuantity 件数
                //baseQuantity 瓶数
                //packageNum 一包瓶数
                //paymentTotalMoney 货款金额
                let megerObj = {};
                //件
                megerObj.baleQuantity = v.baleQuantity || 1;
                // 瓶
                megerObj.baseQuantity = megerObj.baleQuantity * v.packageNum;
                // 货款金额
                megerObj.paymentTotalMoney = megerObj.baseQuantity * v.basicPrice;
                //赠品方案下拉框
                megerObj.presentScheme = [];
                megerObj.giftId = "";
                return Object.assign({}, v, megerObj);
            });
            //获取配赠方案
            this.fetchPresentScheme();
        } else {
            //返回修改
        }
    },
    deactivated() {
        //unmounted
    }
}
</script>
<style lang="scss">
@import "./GenerateBillsEdit.scss";
</style>

