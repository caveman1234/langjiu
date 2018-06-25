import DeliveryInfo from './DeliveryInfo/DeliveryInfo.vue';
import AddNewGoods from './AddNewGoods/AddNewGoods';
import CostOff from './CostOff/CostOff';
import BankList from '@/components/commonComp/BankList/BankList';
import QuotaDialogConfirm from './QuotaDialogConfirm/QuotaDialogConfirm';
export default {
    name: 'GenerateBills',
    components: { DeliveryInfo, AddNewGoods, CostOff, BankList, QuotaDialogConfirm },
    data() {
        return {
            //地址不显示
            isAddressShow: false,
            /* 产品线 */
            prodGroupId: '',
            /* 发货通知 */
            isNotice: '',
            /* 运输方式 */
            carriageMethod: "",
            /* 期望到货日期 */
            arriveDate: '',
            address: '',
            remark: '',
            /* 订单类型 */
            carriageMethodCombo: [],
            businessTypeCode: '',//'01'销售订单, '03'融资订单
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
            financingChecked: true,
            //选择银行弹框
            dialogVisible: false,
            //在线支付loading状态
            isPayOnlineLoading: false,
            bankDataSource1: [
                {
                    name: "中国农业银行",
                    label: 'abc',
                    disabled: false,
                    imgUrl: require('../../commonComp/BankList/bankImg/bank_nong.png')
                },
                // {
                //     name: "中国民生银行",
                //     label: 'cmbc',
                //     disabled: true,
                //     imgUrl: require('../../commonComp/BankList/bankImg/bank_min.png')
                // }
                // {
                //     name: "中国建设银行",
                //     label: 'ccb'
                // }
            ],
            isQuota: 1,
            isGiftBills: false,//是否是赠品组合
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
        CostOffEvent(calcMoney, useOffMoney, calcDataTable, cashSettlementNumBottle) {
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
            //使用费用后计算现金结算金额
            calcMoney.forEach(v => {
                let productId = v.productId;
                var goodsCurObj = this.goodsData.find(v => v.productId === productId);
                var packageNum = goodsCurObj.packageNum;
                var cashSettlementNum = (v.dealAmount / (v.basePrice * goodsCurObj.packageNum)).toFixed(2);
                goodsCurObj.cashSettlementNum = cashSettlementNum;
            })
            //使用费用后重新计算配赠
            _this.fetchPresentScheme();
        },
        /* 在线支付 */
        payOnline() {
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
            //检查发货要求
            if (_this.isNotice === '') {
                _this.$Notify({ title: '发货要求不能为空', type: 'warning' });
                return;
            }
            _this.dialogVisible = true;
        },
        //支付前保存
        saveOrderPrePay() {
            let _this = this;
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
                poTypeCode: this.businessTypeCode,
                poTypeId: this.carriageMethod,
                eFeeUsedAmount: calcDataTable[0],
                qFeeUsedAmount: calcDataTable[1],
                fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            };
            params.persistStatus = "new";
            //销售订单请求地址
            let sreverUrl = '/ocm-web/api/b2b/purchase-orders';
            return _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        return res.data.orderCode;
                    }
                });
        },
        //调用农行接口支付
        payOnlineAbc(billNO) {
            /* 
                {
                    "billNO": "2017122712214",//订单号       (非空)
                    "dealerNO": "614391",//经销商编号         (非空)
                    "dealerName": "测试",//经销商名称         (非空)
                    "totalAmount": 100,//总金额              (非空)
                    "settlementAmount": 100,//订单金额       (可空)
                    "contactTel": "15893712779",//联系电话   (非空)
                    "contact": "测试",//联系人               (非空)
                    "productData": [//                      (可空)
                        {
                            "price": 100,//价格
                            "no": "20171221008",//商品编号
                            "name": "测试",//商品名称
                            "totalAmount": 1001,//商品总价
                            "quantity": 1,//商品数量
                            "uomName": "测试"//商品单位
                        }
                    ]
                }
            */
            let _this = this;
            let dealerNO = _this.$store.state.username;
            let dealerName = _this.$store.state.userloginName;
            //总金额
            let currentPay = parseFloat(_this.currentPay).toFixed(2);
            let cashRest = parseFloat(_this.billFooger.cashRest).toFixed(2);
            let totalAmount = 0;
            if (cashRest < 0) {
                totalAmount = currentPay - cashRest;
            } else {
                totalAmount = currentPay - cashRest;
            }
            //获取联系人电话
            let addressObj = _this.infoData.find(v => v.isSelected);
            let contactTel = addressObj.firstReceiverPhone;
            let contact = addressObj.firstReceiver;
            let params = {
                "billNO": billNO,//订单号       (非空)
                "dealerNO": dealerNO,//经销商编号         (非空)
                "dealerName": dealerName,//经销商名称         (非空)
                "totalAmount": parseFloat(totalAmount),//总金额              (非空)
                "settlementAmount": '',//订单金额       (可空)
                "contactTel": contactTel,//联系电话   (非空)
                "contact": contact,//联系人               (非空)
                // "productData": [//                      (可空)
                //     {
                //         "price": '',//价格
                //         "no": "",//商品编号
                //         "name": "",//商品名称
                //         "totalAmount": '',//商品总价
                //         "quantity": '',//商品数量
                //         "uomName": ""//商品单位
                //     }
                // ]
            };
            let sreverUrl = '/ocm-web/api/abc/quickPay';
            _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        window.location.href = res.data.value.payUrl;
                    }
                });
        },
        //调用民生银行接口支付
        payOnlineCmbc() { },
        //接收选中的银行
        async receiveSelectedBank(selectedBank) {
            let _this = this;
            let billNO = await _this.saveOrderPrePay();
            _this.isPayOnlineLoading = true;
            switch (selectedBank) {
                // 农行
                case 'abc':
                    await _this.payOnlineAbc(billNO);
                    break;
                //民生银行
                case 'cmbc':
                    await _this.payOnlineCmbc(billNO);
                    break;
            }
        },
        //去融资
        goFinancing() { },

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
        //根据id获取产品
        fetchProductById(productId) {
            var paramsWrap = {
                params: { productId }
            }
            var url = "/ocm-web/api/base/products/getProdDetailNew"
            return this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        return res.data;
                    } else {
                        return {};
                    }
                })
        },
        //提交普通销售订单
        async submitNormal() {
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
            //检查发货要求
            if (_this.isNotice === '') {
                _this.$Notify({ title: '发货要求不能为空', type: 'warning' });
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
                    isGift: 0,//是否赠品
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
            //如果是有赠品
            if (this.isGiftBills) {
                let giftItems = [];
                for (let i = 0; i < this.goodsData.length; i++) {
                    let v = this.goodsData[i];
                    //如果没有赠品，或数量为0，不生成订单
                    debugger
                    if (!v.giftId || v.giftAmout === 0) {
                        continue;
                    }
                    let productInfo = await this.fetchProductById(v.giftId);
                    let obj = {
                        isGift: this.isGiftBills ? 1 : 0,//是否赠品

                        // promotionPrice: productInfo.basePrice ,//赠品价格？？
                        promotionProducId:v.promotionProducId,
                        promotionProducName:v.promotionProducName,
                        promotionProducCode:v.promotionProducCode,

                        productId: v.giftId,
                        promotionNum: v.promotionNum,
                        productName: v.giftName,
                        baleQuantity: v.giftAmout,

                        productCode: productInfo.productCode,
                        productDesc: productInfo.productDesc,
                        standard: productInfo.standard,
                        productModel: productInfo.productModel,
                        materialGroupId: productInfo.materialGroupId,
                        materialGroupCode: productInfo.materialGroupCode,
                        materialGroupName: productInfo.materialGroupName,
                        productGroupId: productInfo.productGroupId,
                        productGroupCode: productInfo.productGroupCode,
                        productGroupName: productInfo.productGroupName,
                        baseUnitId: productInfo.baseUnitId,
                        baseUnitCode: productInfo.baseUnitCode,
                        baseUnitName: productInfo.baseUnitName,

                        baseQuantity: productInfo.packageNum * v.giftAmout,

                        baleUnitId: productInfo.baleUnitId,
                        baleUnitCode: productInfo.baleUnitCode,
                        baleUnitName: productInfo.baleUnitName,
                        packageNum: productInfo.packageNum,
                        basePrice: 0,
                        fundPrice: 0,
                        dealPrice: 0,
                        basePrice: 0,
                        discountAmount: 0,
                        dealAmount: 0,
                        fundAmount: 0,
                        fundFee: 0,
                        fundCash: 0,
                        realAmount: 0,
                    };
                    giftItems.push(obj);
                }
                purchaseOrderItems = [...purchaseOrderItems, ...giftItems];
            }

            let receiveAddressId = _this.infoData.find(v => v.isSelected).id;
            let params = {
                saleChannelCode: '00',
                distributorId: _this.$store.state.customerId, //经销商id
                receiveAddressId: receiveAddressId, //收获地址
                isNoticeSend: this.isNotice, //是否通知
                sendDate: this.arriveDate && this.arriveDate.getTime(), //期望发货日期
                remark: _this.remark, //备注
                poTypeId: this.carriageMethod,
                poTypeCode: this.businessTypeCode,
                eFeeUsedAmount: calcDataTable[0],
                qFeeUsedAmount: calcDataTable[1],
                fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            };
            params.persistStatus = "new";
            params.isQuota = this.isQuota;

            //销售订单请求地址
            let sreverUrl = '/ocm-web/api/b2b/purchase-orders/submit';
            _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$router.push({ name: 'TotalOrder' });
                    }
                });
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
            //检查发货要求
            if (_this.isNotice == '') {
                _this.$Notify({ title: '发货要求不能为空', type: 'warning' });
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
                poTypeCode: this.businessTypeCode,
                // eFeeUsedAmount: calcDataTable[0],
                // qFeeUsedAmount: calcDataTable[1],
                // fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            };
            params.isQuota = this.isQuota;
            params.persistStatus = "new";
            //融资订单请求地址
            let sreverUrl = '/ocm-web/api/b2b/purchase-orders/financing-submit';
            _this.$http.post(sreverUrl, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$router.push({ name: 'TotalOrder' });
                    }
                });
            // _this.$confirm('此操作不可逆，是否提交？', '提交', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning',
            //     center: true
            // }).then(() => {
            //     _this.$http.post(sreverUrl, params)
            //         .then(res => {
            //             if (res.headers["x-ocm-code"] == '1') {
            //                 _this.$router.push({ name: 'TotalOrder' });
            //             }
            //         });
            // }).catch(() => { });
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
            let businessTypeCode = this.carriageMethodCombo.find(v => v.value == value).businessTypeCode;
            this.businessTypeCode = businessTypeCode;
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
        },
        //待通知发货change
        isNoticeChange(value) {
            let _this = this;
            if (value == 1) {
                // _this.$Notify({ title: '待通知发货', type: 'warning' });
            }
        },
        //改变价格
        changePrice() {
            this.goodsData = this.goodsData.map(v => ({ ...v, basicPrice: v.outPrice }));
        },
        //计划内提交事件
        plainInnerSubmit() {
            this.isQuota = 1;//计划内
            this.submit();
        },
        //计划外提交事件
        plainOutterSubmit() {
            this.isQuota = 0;
            this.changePrice();//计划外
            this.submit();
        },
        //获取配赠明细
        fetchPresentScheme() {
            var goodsInfos = this.goodsData.map(v => ({
                goodsId: v.productId,
                goodsNum: Number(v.cashSettlementNum),//计算费用后，现金结算数量
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
                                        promotionId: rule.ruleId,//促销id
                                        promotionProducId: rule.goodId,//促销产品id
                                        promotionProducName: rule.ruleName,//
                                        promotionProducCode: rule.ruleCode,//

                                        giftId: product.giftId,//赠品id
                                        giftAmout: product.giftAmout,//赠品数量
                                        giftName: product.giftName,//赠品名称
                                        promotionNum: product.promotionNum,//理论件数
                                    }
                                });
                                return [...acc, ...dataSourceItem];
                            }, []);
                            //当前行数据
                            var currentObj = goodsData.find(v => v.productId == productId);
                            var giftId = currentObj.giftId;
                            if (giftId) {
                                var currentRowGiftObj = dataSource.find(v => v.giftId == giftId);
                                var giftId = currentRowGiftObj.giftId;
                                var giftName = currentRowGiftObj.giftName;
                                var giftAmout = currentRowGiftObj.giftAmout;
                                var promotionNum = currentRowGiftObj.promotionNum;
                                var promotionProducId = currentRowGiftObj.promotionProducId;
                                var promotionProducName = currentRowGiftObj.promotionProducName;
                                var promotionProducCode = currentRowGiftObj.promotionProducCode;
                                //展示明细
                                currentObj.giftId = giftId;
                                currentObj.giftName = giftName;
                                currentObj.giftAmout = giftAmout;
                                currentObj.promotionProducId = promotionProducId;
                                currentObj.promotionProducName = promotionProducName;
                                currentObj.promotionProducCode = promotionProducCode;

                                currentObj.promotionNum = promotionNum;
                            }

                        });
                        var goodsDataDeepCopy = JSON.parse(JSON.stringify(goodsData));
                        this.goodsData = goodsDataDeepCopy;
                    }
                });
        },



    },
    computed: {
        /* 订单总金额 */
        totalMoney() {
            let _this = this;
            let total = 0;
            _this.goodsData.forEach(v => {
                //总价 件数*单价
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
            let currentPay = Number(this.totalMoney) + Number(this.billFooger.xType) + Number(this.billFooger.notXtype) - Number(this.useOffMoney);
            return currentPay.toFixed(2);
        }
    },
    watch: {
        carriageMethod(value) {
            let obj = this.carriageMethodCombo.find(v => v.value == value);
            if (obj.businessTypeCode == "01") { //融资受控订单 03 销售订单01
                this.isNoticeDisable = false;
                // this.isNotice = 1;
                /* 销售订单 */
                this.financingChecked = true;
            } else {
                this.isNoticeDisable = true;
                this.isNotice = 1;
                /* 融资订单状态 */
                this.financingChecked = false;
            }
            let businessTypeCode = this.carriageMethodCombo.find(v => v.value == value).businessTypeCode;
            this.businessTypeCode = businessTypeCode;
        }
    },
    mounted() {
        let _this = this;
        _this.isGiftBills = this.$route.params.isGiftBills;
        _this.goodsData = this.$route.params.selectedData.map(v => {
            return {
                ...v,
                cashSettlementNum: v.baleQuantity,//现金结算金额,使用费用后产生
            }
        });

        _this.fetchAddress(); /* 获取收货地址 */
        _this.fetchOrderType(); /* 获取订单类型 */
        //设置产品线
        _this.prodGroupId = _this.$store.state.prodGroupId;
        //页面加载使用费用0
        _this.$nextTick(() => {
            //藏品产品线为空，不计算费用
            // if (_this.$store.state.prodGroupId) {
            //     _this.$refs.costOffRef.confirm(true);
            // } else {
            //     _this.$refs.costOffRef.confirm(true);
            // }
            //用使用费用0 初始化计算配赠
            _this.$refs.costOffRef.confirm(true);
            //如果是赠品，获取赠品数量
            if (_this.isGiftBills) {
                _this.fetchPresentScheme();
            }
        });
    }
}