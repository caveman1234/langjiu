<template>
    <div class="ApplyReturn">
        <div class="ApplySendTitle">
            <el-row>
                <div class="sendTitleTitle">收件人信息</div>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="2">
                    <div class="name">单据名称：</div>
                </el-col>
                <el-col :span="4">
                    <!-- <div class="desc">{{infoData.poTypeName}}</div> -->
                    <el-select size="mini" v-model="carriageMethod" placeholder="请选择" style="width:100%;" disabled>
                        <el-option v-for="item in carriageMethodCombo" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <div class="name">单据编码：</div>
                </el-col>
                <el-col :span="3">
                    <div class="desc">{{infoData.orderCode}}</div>
                </el-col>
                <el-col :span="2">
                    <div class="name">送货地址：</div>
                </el-col>
                <el-col :span="11">
                    <div class="desc">{{infoData.addressDetail}}</div>
                </el-col>
            </el-row>
        </div>
        <div class="ApplySendBody">
            <el-table :data="infoData.purchaseOrderItems" style="width: 100%" border>
                <el-table-column prop="productDesc" label="商品详情" width="300">
                    <template slot-scope="scope">
                        <div class="detailContainer">
                            <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}' class="goodsImg"></div>
                            <div class="desc">{{scope.row.productDesc}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="volume" label="规格">
                    <template slot-scope="scope">
                        <p>容量: {{ scope.row.standard }}ml</p>
                        <p>度数: {{ scope.row.productModel }}度</p>
                    </template>
                </el-table-column>
                <el-table-column prop="originOrderNum" label="订单数量">
                    <template slot-scope="scope">
                        <p>{{ scope.row.originOrderNum }}件</p>
                    </template>
                </el-table-column>
                <el-table-column prop="baleQuantity" label="可退订数量">
                    <template slot-scope="scope">
                        <p>{{ Math.abs(scope.row.baleQuantity) }}件</p>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <div class="handle">
                            <i @click="delOneRow(scope.row)" class="el-icon-delete"></i>
                        </div>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="ApplySendFooter">
            <el-row>
                <el-button @click="submitApply" size="mini" type="primary">申请退订</el-button>
            </el-row>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ApplyReturn',
    data() {
        return {
            infoData: {
                purchaseOrderItems: []
            },
            defaultImg: require('../../../../../assets/defaultimg.png'),
            carriageMethodCombo: [],//订单类型下拉框
            carriageMethod: ''//订单类型值
        }
    },
    methods: {

        //申请发货数量change
        handleChange(row) {
            let _this = this;
            _this.$nextTick(() => {
                row.realAmount = row.baleQuantity * (row.basePrice + row.fundPrice) * row.packageNum
            });
        },
        //删除一行
        delOneRow({ id }) {
            let _this = this;
            _this.infoData.purchaseOrderItems = _this.infoData.purchaseOrderItems.filter(v => v.id !== id);
        },
        submitApply() {
            let _this = this;
            if (_this.infoData.purchaseOrderItems.length == 0) {
                _this.$Notify({ title: '产品不能为空', type: 'warning' });
                return;
            }
            let params = _this.infoData;
            params.persistStatus = "new";
            params.purchaseOrderItems.forEach(v => {
                v.srcBillType = params.poTypeId;
                v.srcBillId = params.id;
                v.srcBillCode = params.orderCode;
                v.srcBillRowId = v.id;
                v.srcBillRowNum = v.rowNum;
                v.baseQuantity = v.baleQuantity * v.packageNum
            });
            params.poTypeId = _this.carriageMethod;
            let url = '/ocm-web/api/b2b/purchase-orders/returnChange-submit';
            let defaultMsg = '<div>此操作不可逆，是否提交？</div>';
            if (_this.calcTotalMoney() < 200000) {
                // defaultMsg = '<div>此操作不可逆，是否提交？</div><div>200000元不承担运费</div>';
            }
            _this.$confirm(defaultMsg, '提交', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                _this.$http.post(url, params)
                    .then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.$router.push({ name: 'ReturnTotal', params: { from: 'ApplyReturn' } });
                        }
                    });
            }).catch(() => { });

        },
        /* 获取订单类型  */
        fetchOrderType() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            _this.$http.get('/ocm-web/api/b2b/po-types/get-ruturnchange', paramsWrap)
                .then(res => {
                    let carriageMethodCombo = res.data.map(v => ({
                        label: v.name,
                        value: v.id,
                        code: v.code
                    }));
                    _this.carriageMethodCombo = carriageMethodCombo;
                    _this.carriageMethod = _this.carriageMethodCombo.find(v => v.code == '02').value;
                })
        },
        //计算总金额
        calcTotalMoney() {
            return this.infoData.purchaseOrderItems.reduce((acc, v) => {
                return acc + v.realAmount;
            }, 0);
        }
    },
    computed: {
        totalMoney() {
            let total = 0;
            this.infoData.goodsList.forEach(v => {
                total += (v.applyNum * v.price);
            });
            return total;
        },

    },
    mounted() {
        let _this = this;
        //获取订单类型
        _this.fetchOrderType();
        //计算原单数量
        _this.$route.params.infoData.purchaseOrderItems.forEach(v => {
            // v.originOrderNum = (v.applyedQuantity / v.packageNum) + v.baleQuantity
            //（累计发货数量+ 累计退货数量 + 本次退订数量）/包装数量
            v.originOrderNum = (v.sendedQuantity + v.backedQuantity - v.baseQuantity) / v.packageNum;
        });
        _this.infoData = _this.$route.params.infoData;
    }
}
</script>
<style lang="scss" scoped>
@import './ApplyReturn.scss';
</style>
