import DeliveryInfo from '@/components/route/GenerateBills/DeliveryInfo/DeliveryInfo.vue';
import AddNewGoods from '@/components/route/GenerateBills/AddNewGoods/AddNewGoods';
import CostOff from '@/components/route/GenerateBills/CostOff/CostOff';

export default {
    name: 'GoPickGoods',
    components: {
        DeliveryInfo,
        AddNewGoods,
        CostOff
    },
    data() {
        return {
            billHeader: {},
            addressObj: {
                firstReceiver: '', //收货人
                firstReceiverPhone: '', //收货人电话
                addressDetail: '' //地址
            },
            /* 发货通知 */
            isNotice: 1,
            /* 运输方式 */
            carriageMethod: "",
            /* 期望到货日期 */
            arriveDate: '',
            address: '',
            /* 备注 */
            remark: '',
            /* 订单类型 */
            carriageMethodCombo: [],
            /* 地址信息 */
            infoData: [],
            /* 表格数据 */
            goodsData: [],
            //折扣金额
            useOffMoney: 0,
            /* 订单支付金额 */
            realAmount: 0,
            /* 其中共建基金 */
            fundCash: 0,
            /* 使用费用表格 */
            calcDataTable: [],
            /* 费用计算后返回值 */
            calcMoney: {},
            /* 是否通知发货 disable */
            isNoticeDisable: true,
            billFooger: {
                xType: 0, //计提X类共建基金：
                notXtype: 0, //计提非X类共建基金：
                deductionMoney: 0, //费用抵扣金额：
                cashRest: 0, //现金余额：
                currentPay: 0, //本次应付金额：
            }
        }
    },
    methods: {
        /* 接收搜索数据 */
        receiveData(data) {
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));
            this.goodsData = this.goodsData.concat(willAppendData);
        },
        /* 使用折扣金额 */
        CostOffEvent(calcMoney, useOffMoney, calcDataTable) {
            let _this = this;
            /* 
            calcMoney :[]每行的折扣
            useOffMoney 输入的金额
            calcDataTable 费用类型表格

            ------billFooger
            xType 计提X类共建基金：
            notXtype  计提非X类共建基金：
            deductionMoney 费用抵扣金额：
            cashRest  现金余额：
            */

            /* 写订单footer */
            _this.billFooger.xType = calcMoney.reduce((acc, v) => (acc + v.fundCash), 0);
            _this.billFooger.notXtype = calcMoney.reduce((acc, v) => (acc + v.fundFee), 0);
            _this.billFooger.deductionMoney = calcMoney.reduce((acc, v) => (acc + v.discountAmount), 0);
            _this.fetchCashRest().then(cashRest => _this.billFooger.cashRest = cashRest);
        },

        /* 修改 */
        edit() {
            this.$router.push({
                name: 'GoPickGoodsEdit'
            });
        },
        /* 提交 */
        submit() {
            let _this = this;
            /* 验证 */
            if (_this.goodsData.length == 0) {
                _this.$Notify({
                    title: '商品不能为空',
                    type: 'warning'
                });
                return;
            }
            /* 使用费用表格 */
            let calcDataTable = _this.calcDataTable.map(v => v.currentMoney);
            let purchaseOrderItems = _this.goodsData.map((v, i) => {
                return {
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
                    baleUnitCode: v.baleUnitCode,
                    baleUnitName: v.baleUnitName,
                    baleQuantity: v.baleQuantity,
                    packageNum: v.packageNum,
                    basePrice: v.basePrice,
                    fundPrice: v.fundPrice,
                    dealPrice: v.dealPrice,
                    basePrice: v.basePrice,
                    /* 使用费用 */
                    discountAmount: v.discountAmount,
                    dealAmount: this.calcMoney.dealAmount,
                    fundAmount: this.calcMoney.fundAmount,
                    fundFee: this.calcMoney.fundFee,
                    fundCash: this.calcMoney.fundCash,
                    realAmount: this.calcMoney.realAmount,
                    //新增字段
                    srcBillType: this.billHeader.poTypeCode,
                    srcBillId: this.billHeader.id,
                    srcBillCode: this.billHeader.orderCode,

                    srcBillRowId: v.id,
                    srcBillRowNum: v.rowNum,

                }
            });
            let receiveAddressId = _this.addressObj.receiveAddressId;
            let params = {

                distributorId: _this.$store.state.customerId, //经销商id
                receiveAddressId: receiveAddressId, //收获地址
                isNoticeSend: _this.isNotice, //是否通知
                sendDate: _this.arriveDate && _this.arriveDate.getTime(), //期望发货日期
                remark: _this.remark, //备注
                poTypeId: _this.carriageMethod, //订单类型
                eFeeUsedAmount: calcDataTable[0],
                qFeeUsedAmount: calcDataTable[1],
                fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems,
                //新增字段 _this.billHeader
                saleChannelCode: _this.billHeader.saleChannelCode,
                receiveOrgId: _this.billHeader.receiveOrgId,
                saleOrgId: _this.billHeader.saleOrgId,
                agencyId: _this.billHeader.agencyId,
                cityUintId: _this.billHeader.cityUintId,
                customerManagerId: _this.billHeader.customerManagerId,
                productGroupId: _this.billHeader.productGroupId,
            };
            _this.$http.post('/ocm-web/api/b2b/purchase-orders/repaid-submit', params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$router.push({
                            name: 'TotalOrder'
                        });
                    }
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
        /* 获取订单类型  */
        fetchOrderType() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            _this.$http.get('/ocm-web/api/b2b/po-types/get-repaid', paramsWrap)
                .then(res => {
                    let carriageMethodCombo = res.data.map(v => ({
                        label: v.name,
                        value: v.id,
                        businessTypeCode: v.businessTypeCode
                    }));
                    this.carriageMethodCombo = carriageMethodCombo;
                    this.carriageMethod = this.carriageMethodCombo.find(v => v.businessTypeCode == '04').value;
                })
        },
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
            });
        },

        /* 合计 */
        getSummaries(params) {
            let _this = this;
            const {
                columns,
                data
            } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a))
                        arr[i] = `货款总金额:${total}`;
                        break;
                    default:
                        arr[i] = null;
                }
            })
            return arr;
        },
        /* 获取现金余额 */
        fetchCashRest() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    productGroupId: this.$store.state.prodGroupId
                }
            };
            return _this.$http.get('/ocm-web/api/b2b/query-balance/getCashReserve', paramsWrap)
                .then(res => res.data);
        },
        /* 提交前，获取id */
        fetchPoTypeId() {
            let _this = this;
            return _this.$http.get('/ocm-web/api/b2b/po-types/get-repaid').then(res => {
                return res.data[0].id
            })
        }
    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 箱数*单价
                total = total + (v.baseQuantity * (v.basePrice || 0))
            });
            return total;
        },
        orderPayMoney() {
            return this.totalMoney - this.useOffMoney;
        },
        currentPay() {
            // xType 计提X类共建基金：
            // notXtype  计提非X类共建基金：
            // deductionMoney 费用抵扣金额：
            // cashRest  现金余额：

            return this.totalMoney + this.billFooger.xType + this.billFooger.notXtype - this.billFooger.deductionMoney - this.billFooger.cashRest;
        }
    },
    mounted() {
        this.goodsData = this.$route.params.selectedData;
        this.fetchAddress(); /* 获取收货地址 */
        this.fetchOrderType(); /* 获取订单类型 */
        let billHeader = this.$route.params.billHeader;
        this.addressObj = {
            firstReceiver: billHeader.firstReceiver,
            firstReceiverPhone: billHeader.firstReceiverPhone,
            addressDetail: billHeader.addressDetail,
            receiveAddressId: billHeader.receiveAddressId,
            isSelected: true
        }
        this.billHeader = billHeader;
    }
}