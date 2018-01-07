import DeliveryInfo from './DeliveryInfo/DeliveryInfo.vue';
import AddNewGoods from './AddNewGoods/AddNewGoods';
import CostOff from './CostOff/CostOff';

export default {
    name: 'GenerateBills',
    components: { DeliveryInfo, AddNewGoods, CostOff },
    data() {
        return {
            /* 产品线 */
            prodGroupId: '',
            /* 发货通知 */
            isNotice: 1,
            /* 运输方式 */
            carriageMethod: "",
            /* 期望到货日期 */
            arriveDate: '',
            address: '',
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
            isNoticeDisable: false,
            billFooger: {
                xType: 0, //计提X类共建基金：
                notXtype: 0, //计提非X类共建基金：
                deductionMoney: 0, //费用抵扣金额：
                cashRest: 0, //现金余额：
                currentPay: 0, //本次应付金额：
                dealAmount: 0, //货款金额
            },
            /* 订单类型，融资订单是否被选中 */
            financingChecked: true
        }
    },
    methods: {
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
        delOneItem({ productId }) {
            this.goodsData = this.goodsData.filter(v => v.productId != productId);
        },
        /* 接收搜索数据 */
        receiveData(data) {
            let allProductId = this.goodsData.map(v => v.productId);
            let willAppendData = data.filter(v => !allProductId.includes(v.productId));
            this.goodsData = this.goodsData.concat(willAppendData);
        },
        /* 使用折扣金额 */
        CostOffEvent(calcMoney, useOffMoney, calcDataTable) {
            let _this = this;
            _this.calcMoney = calcMoney;
            _this.calcDataTable = calcDataTable;
            /* 
            calcMoney :[]每行的折扣
            useOffMoney 输入的金额
            calcDataTable 费用类型表格

            ------billFooger
            xType 计提X类共建基金：
            notXtype  计提非X类共建基金：
            deductionMoney 抵扣货款金额：
            cashRest  现金余额：
            */
            this.useOffMoney = Number(useOffMoney).toFixed(2);

            /* 写订单footer */
            _this.billFooger.dealAmount = calcMoney.reduce((acc, v) => (acc + v.dealAmount), 0).toFixed(2);
            _this.billFooger.xType = calcMoney.reduce((acc, v) => (acc + v.fundCash), 0).toFixed(2);
            _this.billFooger.notXtype = calcMoney.reduce((acc, v) => (acc + v.fundFee), 0).toFixed(2);
            _this.billFooger.deductionMoney = calcMoney.reduce((acc, v) => (acc + v.discountAmount), 0).toFixed(2);
            _this.fetchCashRest().then(cashRest => _this.billFooger.cashRest = Number(cashRest).toFixed(2));
        },
        /* 在线支付(去融资) */
        payOnline() {


        },
        //去融资
        goFinancing() {},

        /* 修改 */
        edit() {
            this.$router.push({ name: 'GenerateBillsEdit' });
        },
        /* 提交 */
        submit() {
            let _this = this;
            let businessTypeCode = _this.carriageMethodCombo.find(v => v.value == _this.carriageMethod).businessTypeCode;
            if (businessTypeCode == '03') {
                //融资订单
                _this.submigFinancing();
            } else {
                _this.submitNormal();
            }
        },
        //日胶普通销售订单
        submitNormal() {
            let _this = this;
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
            /* 使用费用表格 */
            let calcDataTable = this.calcDataTable.map(v => v.currentMoney);
            let purchaseOrderItems = this.goodsData.map(v => {
                var discountAmount = '';
                var dealAmount = '';
                var fundAmount = '';
                var fundFee = '';
                var fundCash = '';
                var realAmount = '';
                if (Array.isArray(this.calcMoney)) {
                    var currentObj = this.calcMoney.find(aObj => aObj.productId == v.productId);
                    var { discountAmount, dealAmount, fundAmount, fundFee, fundCash, realAmount } = currentObj;
                }
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
                    basePrice: v.basicPrice,
                    // fundAmount: v.fundAmount,
                    // realAmount: v.realAmount,
                    // dealAmount: v.dealAmount,
                    // discountAmount: v.discountAmount,
                    // fundFee: v.fundFee,
                    // fundCash: v.fundCash,
                    /* 使用费用 */
                    discountAmount: discountAmount,
                    dealAmount: dealAmount,
                    fundAmount: fundAmount,
                    fundFee: fundFee,
                    fundCash: fundCash,
                    realAmount: realAmount,
                }



            });

            let receiveAddressId = _this.infoData.find(v => v.isSelected).id;
            let params = {
                saleChannelCode: '00',
                distributorId: _this.$store.state.customerId, //经销商id
                receiveAddressId: receiveAddressId, //收获地址
                isNoticeSend: this.isNotice, //是否通知
                sendDate: this.arriveDate && this.arriveDate.getTime(), //期望发货日期
                remark: _this.remark, //备注
                poTypeId: this.carriageMethod,
                eFeeUsedAmount: calcDataTable[0],
                qFeeUsedAmount: calcDataTable[1],
                fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            };
            debugger
            //销售订单请求地址
            let sreverUrl = '/ocm-web/api/b2b/purchase-orders/submit';
            _this.$confirm('此操作不可逆，是否提交？', '提交', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                _this.$http.post(sreverUrl, params)
                    .then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.$router.push({ name: 'TotalOrder' });
                        }
                    });
            }).catch(() => {});
        },
        //提交融资订单
        submigFinancing() {
            let _this = this;
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
            /* 使用费用表格 */
            let calcDataTable = this.calcDataTable.map(v => v.currentMoney);
            let purchaseOrderItems = this.goodsData.map(v => {
                var discountAmount = '';
                var dealAmount = '';
                var fundAmount = '';
                var fundFee = '';
                var fundCash = '';
                var realAmount = '';
                if (Array.isArray(this.calcMoney)) {
                    var currentObj = this.calcMoney.find(aObj => aObj.productId == v.productId);
                    var { discountAmount, dealAmount, fundAmount, fundFee, fundCash, realAmount } = currentObj;
                }
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
                    basePrice: v.basicPrice,
                    // fundAmount: v.fundAmount,
                    // realAmount: v.realAmount,
                    // dealAmount: v.dealAmount,
                    // discountAmount: v.discountAmount,
                    // fundFee: v.fundFee,
                    // fundCash: v.fundCash,
                    /* 使用费用 */
                    // discountAmount: discountAmount,
                    // dealAmount: dealAmount,
                    // fundAmount: fundAmount,
                    // fundFee: fundFee,
                    // fundCash: fundCash,
                    // realAmount: realAmount,
                }



            });

            let receiveAddressId = _this.infoData.find(v => v.isSelected).id;
            let params = {
                saleChannelCode: '00',
                distributorId: _this.$store.state.customerId, //经销商id
                receiveAddressId: receiveAddressId, //收获地址
                isNoticeSend: this.isNotice, //是否通知
                sendDate: this.arriveDate && this.arriveDate.getTime(), //期望发货日期
                remark: _this.remark, //备注
                poTypeId: this.carriageMethod,
                // eFeeUsedAmount: calcDataTable[0],
                // qFeeUsedAmount: calcDataTable[1],
                // fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            };
            //融资订单请求地址
            let sreverUrl = '/ocm-web/api/b2b/purchase-orders/financing-submit';
            _this.$confirm('此操作不可逆，是否提交？', '提交', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                _this.$http.post(sreverUrl, params)
                    .then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.$router.push({ name: 'TotalOrder' });
                        }
                    });
            }).catch(() => {});
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
            _this.$http.get('/ocm-web//api/b2b/po-types/get-common-add', paramsWrap)
                .then(res => {
                    let carriageMethodCombo = res.data.map(v => ({ label: v.name, value: v.id, businessTypeCode: v.businessTypeCode }));
                    this.carriageMethodCombo = carriageMethodCombo;
                    //设置订单类型默认选中
                    this.carriageMethod = carriageMethodCombo.find(v => v.businessTypeCode == '01').value;
                })
        },
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
            });
        },
        /* 订单类型改变，事件 */
        noticeChange(value) {
            let obj = this.carriageMethodCombo.find(v => v.value == value);
            if (obj.businessTypeCode == "01") { //融资受控订单 03 销售订单01
                this.isNoticeDisable = false;
                this.isNotice = 1;
                /* 融资订单状态 */
                this.financingChecked = true;
            } else {
                this.isNoticeDisable = true;
                this.isNotice = 1;
                /* 融资订单状态 */
                this.financingChecked = false;
            }
        },
        /* 合计 */
        getSummaries(params) {
            let _this = this;
            const { columns, data } = params;
            let arr = [];
            columns.forEach((column, i) => {
                switch (column.property) {
                    case 'paymentTotalMoney':
                        let totalArr = data.map(v => v[column.property]);
                        let total = totalArr.reduce((acc, a) => (acc + a), 0)
                        arr[i] = `货款总金额:¥${Number(total).toFixed(2)}`;
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
                    customerId: this.$store.state.customerId
                }
            }; ///api/b2b/query-balance/getCashReserve
            return _this.$http.get('/ocm-web/api/b2b/query-balance/getCashReserve', paramsWrap)
                .then(res => res.data);
        }
    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 箱数*单价
                total = total + (v.baseQuantity * (v.basicPrice || 0))
            });
            return total.toFixed(2);
        },
        orderPayMoney() {
            return this.totalMoney - this.useOffMoney;
        },
        currentPay() {
            // xType 计提X类共建基金：
            // notXtype  计提非X类共建基金：
            // deductionMoney 费用抵扣金额：
            // cashRest  现金余额：
            debugger
            let currentPay = Number(this.totalMoney) + Number(this.billFooger.xType) + Number(this.billFooger.notXtype) - Number(this.useOffMoney);
            return currentPay.toFixed(2);
        }
    },
    mounted() {
        let _this = this;
        _this.goodsData = this.$route.params.selectedData;
        _this.fetchAddress(); /* 获取收货地址 */
        _this.fetchOrderType(); /* 获取订单类型 */
        //设置产品线
        _this.prodGroupId = _this.$store.state.prodGroupId;
        //页面加载使用费用0
        _this.$nextTick(() => {
            _this.$refs.costOffRef.confirm(true);
        });
    }
}