<template>
    <div class="GoPickGoodsEdit">
        <div class="goodsInfo">
            <AddNewGoods @receiveData="receiveData"></AddNewGoods>
            <div class="goodsContent">
                <el-table :data="goodsData" :summary-method="getSummaries" show-summary style="width: 100%" border>
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
                    <el-table-column prop="basePrice" label="单价">
                        <template slot-scope="scope">
                            <div class="price">
                                <div>价格：{{scope.row.basePrice | formatPrice}}</div>
                                <div v-if="false">共建：{{scope.row.fundPrice | formatPrice}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baleQuantity" label="件数" width="180">
                        <template slot-scope="scope">
                            <el-input-number @change="baleQuantityChange(scope.row)" v-model="scope.row.baleQuantity" :min="1"  size="mini"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baseQuantity" label="瓶数">
                        <template slot-scope="scope">
                            <div>{{scope.row.baseQuantity}} </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="paymentTotalMoney" label="货款金额" width="180px">
                        <template slot-scope="scope">
                            <div>{{scope.row.paymentTotalMoney | formatPrice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="请选择赠品" width="200px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.presentScheme && scope.row.presentScheme.length > 0">
                                <el-select 
                                    v-model="scope.row.giftId" 
                                    placeholder="请选择" 
                                    size="mini"
                                    @change="value=>presentChange(value,scope.row)"
                                >
                                    <el-option
                                        v-for="(item,index) in scope.row.presentScheme"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    >
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
//去提货，去填仓
import AddNewGoods from '@/components/route/GenerateBills/AddNewGoods/AddNewGoods';
export default {
    name: 'GoPickGoodsEdit',
    components: { AddNewGoods },
    data() {
        return {
            /* 表格数据 */
            goodsData: [],
            defaultImg: require('../../../../../assets/defaultimg.png'),
            selectedObj: {},//去提货 route传递参数
            isQuota: 1,
            cacheGoodsDataId: []
        }
    },
    methods: {
        //重现计算进货款费用
        reCalcPrice() {

            this.goodsData.forEach(v => {
                v.paymentTotalMoney = v.baseQuantity * (v.basePrice || v.basicPrice);
            });
        },
        delOneItem({ productId }) {
            this.goodsData = this.goodsData.filter(v => v.productId != productId);
            //获取配额价格
            if (this.goodsData.length !== 0) {
                // this.fetchQuotaPrice();
            }
        },
        /* 接收搜索数据 */
        receiveData(data) {
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));

            willAppendData = willAppendData.map(v => {
                v.basePrice = v.basicPrice;
                delete v.basicPrice;
                v.paymentTotalMoney = v.baseQuantity * (v.basePrice || v.basicPrice);
                return v;
            });

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
                megerObj.paymentTotalMoney = megerObj.baseQuantity * v.basePrice;
                //赠品方案下拉框
                megerObj.presentScheme = [];
                megerObj.giftId = "";
                //缓存价格 有时候计划内价格是basePrice 有时候是basicPrice
                megerObj.cacheBasePrice = v.basePrice || v.basicPrice;
                return Object.assign({}, v, megerObj);
            });
            this.goodsData = this.goodsData.concat(willAppendData);
            this.fetchPresentScheme().then(() => {
                //获取配额价格
                this.fetchQuotaPrice();
            });
        },
        /* 件数变化 */
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
                row.paymentTotalMoney = row.baseQuantity * (row.basePrice || row.basicPrice);
            });
        },
        /* 确定 */
        confirm() {
            let _this = this;
            if (_this.goodsData.length === 0) {
                this.$Notify({ title: '商品不能为空', type: 'warning' });
                return;
            }
            if(!this.validateIsAll()){
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
                    _this.calcBasePrice()
                        .then(res => {
                            if (res.headers["x-ocm-code"] == '1') {
                                _this.jumpRoute();
                            }
                        })
                }).catch(() => { });
            } else {
                _this.calcBasePrice()
                    .then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.jumpRoute();
                        }
                    })
            }


        },
        //计算共建基金baseprice
        calcBasePrice() {
            let headerId = this.selectedObj.id;
            // let childIds = this.selectedObj.purchaseOrderItems.map(v => v.id);
            let childIds = this.goodsData.map(v => (v.id || v.productId));
            let idsArr = [headerId, ...childIds];
            let ids = idsArr.toString();
            let params = `ids=${ids}`;
            let url = '/ocm-web/api/b2b/purchase-orders/getAllFundPrice';
            return this.$http.post(url, params)
                .then(res => {
                    let data = res.data;
                    let dataEntries = Object.entries(data);

                    this.goodsData.forEach(v => {
                        let exist = dataEntries.find(arr => arr[0] == v.id);
                        if (exist) {
                            v.fundPrice = exist[1];
                        }
                    })
                    this.goodsData.forEach(v => {
                        let exist = dataEntries.find(arr => arr[0] == v.id);
                        if (exist) {
                            v.fundPrice = exist[1];
                        }
                    });
                    return res;
                })
        },
        getSummaries(params) {
            let _this = this;
            const { columns, data } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a), 0)
                        let value = String(Number(total).toFixed(2));
                        var str = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                        arr[i] = `货款总金额:¥${str}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        },
        //获取配赠方案
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
            return this.$http.post(url, params, config)
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
                                        value: product.giftId,

                                        promotionId: rule.ruleId,
                                        promotionProducId: rule.goodId,
                                        promotionProducCode: rule.ruleCode,
                                        giftId: product.giftId,
                                        giftAmout: product.giftAmout,
                                        giftName: product.giftName,
                                        promotionNum: product.promotionNum,
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
            //标示赠品产品
            this.goodsData = this.goodsData.map(v => {
                return {
                    ...v,
                    isGift: v.giftId ? 1 : 0
                }
            });

            return passed;
        },
        validateIsAll() {
            //验证是否全配赠产品
            var isAllGift = this.goodsData.every(v => v.presentScheme.length > 0);
            var isAllNormal = this.goodsData.every(v => v.presentScheme.length === 0);
            var isAll = isAllGift || isAllNormal;
            if (!isAll) {
                this.$Notify({ title: '赠品和普通产品不能混合下单。', type: 'warning' });
            }
            return isAll;
        },
        presentChange(value, row) {
            let giftId = value;
            var presentScheme = row.presentScheme;
            var currentRowGiftObj = presentScheme.find(v => v.value === giftId);


            row.giftId = giftId;
            row.giftName = currentRowGiftObj.giftName;
            row.giftAmout = currentRowGiftObj.giftAmout;
            row.promotionNum = currentRowGiftObj.promotionNum;
            row.promotionProducId = currentRowGiftObj.promotionProducId;
            row.promotionProducName = currentRowGiftObj.promotionProducName;
            row.promotionProducCode = currentRowGiftObj.promotionProducCode;
        },

        jumpRoute() {
            let _this = this;
            _this.$router.push({
                name: 'GoPickGoods',
                params: {
                    selectedData: _this.goodsData,
                    billHeader: _this.selectedObj,
                    isQuota: _this.isQuota
                }
            });
        },
        //配额
        fetchQuotaPrice() {
            var selectedObj = this.selectedObj;
            if (selectedObj.isQuota === 1) {
                //融资订单是计划内，不询价
                return;
            }
            let url = "/ocm-web/api/b2b/purchase-orders/getQuotaPrice";

            let purchaseOrderItems = this.goodsData.map(v => {
                return {
                    distributorId: this.$store.state.customerId, //经销商id
                    productId: v.productId,
                    productName: v.productDesc,
                    srcBillRowId: v.id,
                    srcBillRowNum: v.rowNum,

                    productGroupId: v.productGroupId,
                    productGroupCode: v.productGroupCode,
                    productGroupName: v.productGroupName,

                    basePrice: v.basePrice,
                    fundPrice: 0,
                    dealPrice: 0,

                    discountAmount: 0,
                    dealAmount: 0,
                    fundAmount: 0,
                    fundFee: 0,
                    fundCash: 0,
                    realAmount: 0,

                    isQuota: selectedObj.isQuota,
                    srcBillType: selectedObj.poTypeId,
                    srcBillId: selectedObj.id,
                    srcBillCode: selectedObj.orderCode,
                }
            });
            let params = {
                purchaseOrderItems: purchaseOrderItems,
                distributorId: this.$store.state.customerId, //经销商id
                isQuota: selectedObj.isQuota,
                saleChannelCode: '00',
            }
            this.$http.post(url, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        var purchaseOrderItems = res.data.purchaseOrderItems;
                        purchaseOrderItems.forEach(v => {
                            var currentObj = this.goodsData.find(v1 => v1.productId === v.productId);
                            currentObj.basePrice = v.basePrice;
                        });
                        this.reCalcPrice();

                    }
                })
        }

    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 + 总共建基金
                total = total + (v.baseQuantity * (v.basePrice || 0) + (v.baseQuantity * (v.fundPrice || 0)))
            });
            return total;
        }
    },
    mounted() {
    },
    activated() {
        //mounted
        if (this.$route.params.selectedData) {
            this.selectedObj = this.$route.params.selectedData;
            this.selectedObj.isQuota = this.selectedObj.isQuota === null ? 1 : this.selectedObj.isQuota;
            this.isQuota = this.$route.params.selectedData.isQuota;
            //设置产品线
            this.$store.commit('prodGroupId', this.selectedObj.productGroupId);
            this.goodsData = this.$route.params.selectedData.purchaseOrderItems.map(v => {
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
                megerObj.paymentTotalMoney = megerObj.baseQuantity * (v.basePrice | v.basicPrice);
                //赠品方案下拉框
                megerObj.presentScheme = [];
                megerObj.giftId = "";

                //缓存价格 有时候计划内价格是basePrice 有时候是basicPrice
                megerObj.cacheBasePrice = v.basePrice || v.basicPrice;
                return Object.assign({}, v, megerObj);
            });
            //缓存融资订单初始订单号
            this.cacheGoodsDataId = this.goodsData.map(v => v.productId);
            //获取配赠方案
            this.fetchPresentScheme().then(() => {
                //获取配额价格
                this.fetchQuotaPrice();
            });
        } else {
            //获取配额价格
            // this.fetchQuotaPrice();
            this.reCalcPrice()
            //返回修改
        }
    },
    deactivated() {
        //unmounted
    }
}
</script>
<style lang="scss">
@import "./GoPickGoodsEdit.scss";
</style>
