<template>
    <div class="ReturnWineOrder">
        <el-row>
            <div class="itemTitle">请选择收货地址：</div>
            <div>
                <DeliveryInfo @addressClick="addressClick" v-for="(item,index) in infoData" :key="index" :infoData="item" class="accountItem"></DeliveryInfo>
            </div>
        </el-row>
        <el-row>
            <div class="itemTitle">订单备注：</div>
            <el-input size="mini" v-model="remark"></el-input>
        </el-row>
        <div class="itemTitle">商品信息：</div>
        <el-table :data="goodsData" :summary-method="getSummaries" show-summary border style="width: 100%">
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
            <el-table-column prop="baleQuantity" label="箱数"></el-table-column>
            <el-table-column prop="baseQuantity" label="瓶数"></el-table-column>
            <el-table-column prop="paymentTotalMoney" label="还酒金额" width="180px">
                <template slot-scope="scope">
                    <div>{{scope.row.paymentTotalMoney|formatPrice}}</div>
                </template>
            </el-table-column>
        </el-table>

        
        <el-row style="line-height:25px;">
            <div class="itemTitle">订单结算：</div>
            <el-row>
                <el-col :span="3">
                    <div class="opacity0">1</div>
                </el-col>
                <el-col :span="3" class="gray">还酒总金额：</el-col>
                <el-col :span="3" class="gray">{{totalMoney | formatInOut}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <div class="opacity0">1</div>
                </el-col>
                <el-col :span="3" class="gray">T类费用余额：</el-col>
                <el-col :span="3" class="gray">{{tFee | formatInOut}}</el-col>
            </el-row>
            <el-row class="realTotal">
                <el-col :span="3">
                    <div class="opacity0">1</div>
                </el-col>
                <el-col :span="3">本次使用费用金额：</el-col>
                <el-col :span="3" v-red style="font-size:20px;">{{totalMoney | formatInOut}}</el-col>
            </el-row>
        </el-row>
        <el-row type="flex" justify="end" style="margin-top:15px;">
            <el-button @click="$router.go(-1)" type="plain" size="mini">修改</el-button>
            <el-button @click="submit" type="primary" size="mini">提交</el-button>
        </el-row>
    </div>
</template>
<script>
import DeliveryInfo from '@/components/route/GenerateBills/DeliveryInfo/DeliveryInfo.vue';

export default {
    name: 'ReturnWineOrder',
    components: { DeliveryInfo },
    data() {
        return {
            goodsData: [],
            tFee: 0,
            defaultImg: require('../../../../../assets/defaultimg.png'),
            infoData: [],
            remark: '',//备注
            totalMoney: 0,//货款总金额
        }
    },
    methods: {
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
                        arr[i] = `还酒总金额:¥${str}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        },
        addressClick(item) {
            let index = this.infoData.findIndex(v => v == item);
            this.infoData.forEach((obj, i) => {
                if (index == i) {
                    obj.isSelected = true;
                } else {
                    obj.isSelected = false;
                }
                return obj;
            });
        },
        /* 获取收货地址 */
        fetchAddress() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get('/ocm-web//api/base/customer/get-addr-List', paramsWrap)
                .then(res => {
                    let infoData = res.data.map((v, i) => {
                        let obj = {
                            firstReceiver: v.firstReceiver,
                            firstReceiverPhone: v.firstReceiverPhone,
                            addressDetail: v.addressDetail,
                            id: v.id,
                        }
                        if (i == 0) {
                            obj.isSelected = true;
                        } else {
                            obj.isSelected = false;
                        }
                        return obj;
                    });
                    _this.infoData = infoData;
                })
        },
        //提交
        submit() {
            let _this = this;
            //校验
            /* 验证收获地址为空 */
            if (_this.infoData.length == 0) {
                _this.$Notify({ title: '收货地址不能为空', type: 'warning' });
                return;
            }
            /* 验证 商品为空 */
            if (_this.goodsData.length == 0) {
                _this.$Notify({ title: '商品不能为空', type: 'warning' });
                return;
            }
            let remark = _this.remark;
            let receiveAddressId = _this.infoData.find(v => v.isSelected).id;
            let returnWineBillItems = _this.goodsData.map(v => ({
                productId: v.productId,
                productCode: v.productCode,
                productName: v.productName,
                productDesc: v.productDesc,
                standard: v.standard,
                productModel: v.productModel,
                materialGroupId: v.materialGroupId,
                materialGroupCode: v.materialGroupCode,
                materialGroupName: v.materialGroupName,
                productGroupId: v.productGroupId,
                productGroupCode: v.productGroupCode,
                productGroupName: v.productGroupName,
                baseUnitId: v.baseUnitId,
                baseUnitCode: v.baseUnitCode,
                baseUnitName: v.baseUnitName,
                baseQuantity: v.baseQuantity,
                baleUnitId: v.baleUnitId,
                basePrice: v.basicPrice,
                baleUnitCode: v.baleUnitCode,
                baleUnitName: v.baleUnitName,
                baleQuantity: v.baleQuantity,
                packageNum: v.packageNum,
                discountAmount: v.discountAmount,
                dealAmount: v.paymentTotalMoney,
                fundAmount: v.fundAmount,
                fundFee: v.fundFee,
                fundCash: v.fundCash,
                realAmount: v.realAmount,
                fundPrice: v.fundPrice,
                //折后价
                dealPrice:v.basicPrice

            }));
            let totalAmount = _this.totalMoney;
            let params = {
                isNoticeSend:0,
                remark: remark,
                distributorId: this.$store.state.customerId,
                receiveAddressId: receiveAddressId,
                totalAmount: totalAmount,
                saleChannelCode: '00',
                productGroupId: _this.goodsData[0].productGroupId,
                returnWineBillItems: returnWineBillItems,
            };
            let serverUrl = '/ocm-web/api/b2b/returnwine-bills/submit';
            debugger
            _this.$http.post(serverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        debugger
                        _this.$router.push({ name: 'ReturnWineList' });
                    }
                });
        }
    },
    mounted() {
        let _this = this;
        _this.goodsData = _this.$route.params.selectedData;
        _this.tFee = _this.$route.params.tFee;
        //收货地址
        _this.fetchAddress();
        _this.totalMoney = _this.goodsData.reduce((acc, v) => acc + v.paymentTotalMoney, 0);
    }
}
</script>
<style lang="scss">
@import "./ReturnWineOrder.scss";
</style>
