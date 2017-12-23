import DeliveryInfo from './DeliveryInfo/DeliveryInfo.vue';
import AddNewGoods from './AddNewGoods/AddNewGoods';
import CostOff from './CostOff/CostOff';

export default {
    name: 'GenerateBills',
    components: { DeliveryInfo, AddNewGoods, CostOff },
    data() {
        return {
            /* 发货通知 */
            isNotice: 1,
            /* 运输方式 */
            carriageMethod: '',
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
            let index = this.goodsData.findIndex(v => v.productId === productId);
            this.goodsData.splice(index, 1);
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
            /* 写入共建基金 */
            calcMoney.forEach(v => {
                let productId = v.productId;
                let rowObj = _this.goodsData.find(x => x.productId == productId);
                rowObj.discountAmount = v.discountAmount;
            });
            /* 使用费用表格 */
            this.calcDataTable = calcDataTable;
            this.calcMoney = calcMoney;
            /* 订单支付金额 */
            let realAmount = 0;
            /* 其中共建基金 */
            let fundCash = 0;
            calcMoney.forEach(v => {
                realAmount += v.realAmount;
                fundCash += v.fundCash;
            });
            this.realAmount = realAmount;
            this.fundCash = fundCash;
            this.useOffMoney = useOffMoney;
        },
        /* 在线支付 */
        payOnline() {

        },
        /* 修改 */
        edit() {},
        /* 提交 */
        submit() {
            // this.verification();
            let _this = this;
            /* 使用费用表格 */
            let calcDataTable = this.calcDataTable.map(v => v.currentMoney);
            let purchaseOrderItems = this.goodsData.map(v => {
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
                    discountAmount: v.discountAmount,
                    dealAmount: this.calcMoney.dealAmount,
                    fundAmount: this.calcMoney.fundAmount,
                    fundFee: this.calcMoney.fundFee,
                    fundCash: this.calcMoney.fundCash,
                    realAmount: this.calcMoney.realAmount,

                }
            });

            let receiveAddressId = _this.infoData.find(v => v.isSelected).id;
            let params = {
                saleChannelCode: '00',
                distributorId: _this.$store.state.customerId, //经销商id
                receiveAddressId: receiveAddressId, //收获地址
                isNoticeSend: this.isNotice, //是否通知
                sendDate: this.arriveDate && this.arriveDate.getTime(), //期望发货日期
                remark: '', //备注
                poTypeId: this.carriageMethod,
                eFeeUsedAmount: calcDataTable[0],
                qFeeUsedAmount: calcDataTable[1],
                fFeeUsedAmount: calcDataTable[2],
                purchaseOrderItems: purchaseOrderItems
            }
            _this.$http.post('/ocm-web//api/b2b/purchase-orders/submit', params)
                .then(res => {
                    console.log(res, '---res---');
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$router.push({ name: 'TotalOrder' });
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
                            userName: v.firstReceiver,
                            userPhone: v.firstReceiverPhone,
                            userAddress: v.addressDetail,
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
                    let carriageMethodCombo = res.data.map(v => ({ label: v.name, value: v.id }));
                    this.carriageMethodCombo = carriageMethodCombo;
                })
        },
        baleQuantityChange(row) {
            this.$nextTick(() => {
                row.baseQuantity = (row.baleQuantity) * row.packageNum;
            });
        },
        /* 验证 */
        verification() {
            this.$Notification1({
                type: 'error',
                title: '不能为空'
            });
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
        },
        orderPayMoney() {
            return this.totalMoney - this.useOffMoney;
        },
    },
    mounted() {
        this.goodsData = this.$route.params.selectedData.map(v => {
            //baleQuantity 箱数
            //discountAmount 费用折扣金额
            //baseQuantity 瓶数
            return Object.assign({},
                v, {
                    discountAmount: 0,
                    baleQuantity: 1,
                    baseQuantity: v.packageNum
                }
            );
        });
        console.log('GenerateBills------', this.goodsData);
        this.fetchAddress(); /* 获取收货地址 */
        this.fetchOrderType(); /* 获取订单类型 */
    }
}