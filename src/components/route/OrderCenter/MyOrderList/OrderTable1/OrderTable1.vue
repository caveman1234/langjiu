<template>
    <div class="OrderTable1">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap" :key="index">

                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单日期:</el-col>
                        <el-col :span="3">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="3">订单编号:</el-col>
                        <el-col :span="3">{{item.orderCode}}</el-col>
                        
                        <el-col :span="3">订单状态:</el-col>
                        <el-col v-red :span="2">{{item.billStatusName}}</el-col>
                        <el-col :span="2" :push="2">
                            <div @click="lookMore(item)" class="lookMore">
                                <span class="text">{{ item.isMoreShow ? '收起' : '更多'}}</span>
                                <i class="icon iconfont" :class="[item.isMoreShow ? 'lj-up' :'lj-down-']"></i>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单箱数：</el-col>
                        <el-col :span="2" v-red>{{item.baleQuantity}}箱</el-col>
                        <el-col :span="2">订单金额：</el-col>
                        <el-col :span="3" v-red>{{item.orderAmount|formatPrice}}</el-col>
                        <el-col :span="3">费用抵货款金额：</el-col>
                        <el-col :span="3" v-red>{{item.discountAmount|formatPrice}}</el-col>
                        <el-col :span="3">X类共建基金：</el-col>
                        <el-col :span="2" v-red>{{item.fundCash|formatPrice}}</el-col>
                        <el-col :span="2">支付金额:</el-col>
                        <el-col v-red :span="2">{{item.totalAmount | formatPrice}}</el-col>
                    </el-row>
                </div>
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">审核意见：</el-col>
                        <el-col :span="22">{{item.approveOpinion}}</el-col>
                    </el-row>
                </div>

                <div v-show="item.isMoreShow">
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">发货要求：</el-col>
                            <el-col :span="3">{{item.isNoticeSend|formatIsNoticeSend}}</el-col>
                            <el-col :span="2">发货地址：</el-col>
                            <el-col :span="17">{{item.addressDetail}}</el-col>
                        </el-row>
                    </div>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="2">备注：</el-col>
                            <el-col :span="22">{{item.remark}}</el-col>
                        </el-row>
                    </div>
                    
                    <div v-if="item.poTypeBusinessType == '03'" class="orderHeader">
                        <el-row>
                            <el-col :span="3">融资审批状态:</el-col>
                            <el-col :span="3">{{(item.financingStatus) | formatBillStatus}}</el-col>
                            <el-col :span="2">融资金额:</el-col>
                            <el-col :span="3">{{item.totalAmount | formatPrice}}</el-col>
                            <el-col :span="3">累计已还款金额:</el-col>
                            <el-col :span="3">{{item.totalRepayAmount | formatPrice}}</el-col>
                            <el-col :span="3">累计已提货金额:</el-col>
                            <el-col :span="3">{{item.totalRepaidAmount | formatPrice}}</el-col>
                        </el-row>
                    </div>
                    <div class="orderHeader">
                        <el-row>
                            <el-col :span="3">费用使用明细：</el-col>
                            <el-col :span="1">E类：</el-col>
                            <el-col :span="3">{{item.eFeeUsedAmount | formatPrice}}</el-col>
                            <el-col :span="1">Q类：</el-col>
                            <el-col :span="3">{{item.qFeeUsedAmount | formatPrice}}</el-col>
                            <el-col :span="1">F类：</el-col>
                            <el-col :span="3">{{item.fFeeUsedAmount | formatPrice}}</el-col>
                        </el-row>
                    </div>
                </div>
                <div class="orderHeader">
                    <el-row type="flex" justify="end">
                        <el-button-group>
                            <template v-if="item.poTypeBusinessType =='03' && item.billStatusCode == '03' && item.totalRepaidAmount < item.totalRepayAmount">
                                <el-button size="mini" @click="goPickGoods(item)" type="primary">去提货
                                </el-button>
                            </template>
                            <template v-if="item.isNoticeSend == 1 && item.isApplySendOver == 0 && item.billStatusCode == '03' && item.poTypeBusinessType !=='03' && item.isNcConfirm ==1 ">
                                <el-button @click="applySend(item)" size="mini" type="primary">申请发货
                                </el-button>
                            </template>

                            <template v-if="item.isSendOver == 0 && item.isNcConfirm == 1 && item.billStatusCode == '03' ">
                                <el-button @click="applyReturn(item)" size="mini" type="primary">申请退订
                                </el-button>
                            </template>
                            <template v-if="item.poTypeBusinessType == '03' && item.billStatusCode == '03' && item.financingStatus == '10' ">
                                <el-button @click="goFinancing(item)" size="mini" type="primary">去融资
                                </el-button>
                            </template>
                            <!-- <template  v-if="item.billStatusCode == '01' && item.poTypeBusinessType == '01'  " >
                                <el-button v-show="true" @click="payOnline(item)" size="mini" type="primary" :loading="item.isPayOnlineLoading">在线支付
                                </el-button>
                            </template> -->
                        </el-button-group>
                    </el-row>
                </div>
                <el-table :data="item.purchaseOrderItems" border style="width: 100%">
                    <el-table-column prop="srcBillCode" label="来源单据号" v-if="item.poTypeCode == '04'"></el-table-column>
                    <el-table-column prop="productDesc" label="商品详情" width="200">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="规格" min-width="90">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.standard}}ml</div>
                                <div>度数：{{scope.row.productModel}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="basePrice" label="单价">
                        <template slot-scope="scope">
                            <div>{{scope.row.basePrice|formatPrice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="boxCount" label="数量" min-width="110">
                        <template slot-scope="scope">
                            <div>
                                <div>箱数：{{scope.row.baleQuantity}} 箱</div>
                                <div>瓶数：{{scope.row.baseQuantity}} 瓶</div>
                            </div>
                        </template>
                    </el-table-column>
                    <template v-if="item.poTypeCode !== '03'">
                        <el-table-column prop="applyedQuantity" label="累计申请发货数量" min-width="120">
                            <template slot-scope="scope">
                                <div v-if="item.isNoticeSend == 1">
                                    <!-- 待通知发货 -->
                                    <div>箱数：{{scope.row.applyedQuantity/scope.row.packageNum}} 箱</div>
                                    <div>瓶数：{{scope.row.applyedQuantity}} 瓶</div>
                                </div>
                                <div v-else>
                                    <!-- 立即发货 -->
                                    <div>箱数：{{scope.row.baleQuantity}} 箱</div>
                                    <div>瓶数：{{scope.row.baseQuantity}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sendedQuantity" label="累计发货数量" min-width="110">
                            <template slot-scope="scope">
                                <div>
                                    <div>箱数：{{scope.row.sendedQuantity/scope.row.packageNum}} 箱</div>
                                    <div>瓶数：{{scope.row.sendedQuantity}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="backedQuantity" label="累计退货数量" min-width="110">
                            <template slot-scope="scope">
                                <div>
                                    <div>箱数：{{scope.row.backedQuantity/scope.row.packageNum}} 箱</div>
                                    <div>瓶数：{{scope.row.backedQuantity}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
            </div>
        </template>
        <!-- 在线支付 -->
        <BankList :bankDataSource1="bankDataSource1" @receiveSelectedBank="receiveSelectedBank" :dialogVisible.sync="dialogVisible"></BankList>
        <!-- 融资 -->
        <BankList1 :bankDataSource1="bankDataSource2" @receiveSelectedBank="receiveSelectedBank2" :dialogVisible.sync="dialogVisible2"></BankList1>
    </div>
</template>
<script>
/* 
单据类型 poTypeBusinessType
订单状态 billStatusCode

融资订单：poTypeBusinessType == '03'
累计已填仓金额 totalRepaidAmount
累计已还款金额 totalRepayAmount
1. billStatusCode == '03' totalRepaidAmount < totalRepayAmoun 已审核(审核通过) -> 去提货 
isNoticeSend  是  1 ， 否   0
isApplySendOver 申请发货完成 0 1，
2. isNoticeSend == 1 && isApplySendOver == 0   => 申请发货
填仓订单：

3 去融资 -》融资订单&&订单状态已审核&&融资状态未审核
item.poTypeBusinessType == '03' && item.billStatusCode == '03' && item.financingStatus=='0'
isSendOver 发货未完成

*/
//-----------------------------------------billStatusCode订单状态
// Uncommitted("01", "未提交", "整单状态"),
// Committed("02", "已提交", "整单状态"),
// Approved("03", "已审核", "整单状态"),
// Disapproved("04", "审核不通过", "整单状态"),
// Finished("05", "已完成", "整单状态"),

// RowUncommitted("06", "未提交", "行状态"),
// RowCommitted("07", "已提交", "行状态"),
// RowApproved("08", "已审核", "行状态"),
// RowDisapproved("09", "审核不通过", "行状态"),
// RowArranged("10", "已安排", "行状态"),
// RowClosed("11", "已关闭", "行状态");
//--------------------------------------poTypeBusinessType单据类型
// Common("01", "普通采购订单", null),
// RuturnChange("02", "退换货订单", null),
// Financing("03", "融资订单", null),
// Repaid("04", "填仓订单", null),
// SendApply("05", "发货申请订单", null);
import BankList from '@/components/commonComp/BankList/BankList';
import BankList1 from '@/components/commonComp/BankList/BankList';
export default {
    name: 'OrderTable1',
    components: { BankList, BankList1 },
    props: {
        orderData: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            defaultImg: require('../../../../../assets/defaultimg.png'),
            dialogVisible: false,
            //去支付 选中的订单数据
            selectedItem: {},
            //去融资 选中的订单信息
            goFinancingItem: {},
            bankDataSource1: [
                {
                    name: "中国农业银行",
                    label: 'abc',
                    disabled: false,
                    imgUrl: require('../../../../commonComp/BankList/bankImg/bank_nong.png')
                },
                // {
                //     name: "中国民生银行",
                //     label: 'cmbc',
                //     disabled: true,
                //     imgUrl: require('../../../../commonComp/BankList/bankImg/bank_min.png')
                // }
                // {
                //     name: "中国建设银行",
                //     label: 'ccb'
                // }
            ],
            bankDataSource2: [
                // {
                //     name: "中国农业银行",
                //     label: 'abc',
                //     disabled: true,
                //     imgUrl: require('../../../../commonComp/BankList/bankImg/bank_nong.png')
                // },
                {
                    name: "中国民生银行",
                    label: 'cmbc',
                    disabled: false,
                    imgUrl: require('../../../../commonComp/BankList/bankImg/bank_min.png')
                },
                // {
                //     name: "中国建设银行",
                //     label: 'ccb',
                //     disabled: false,
                //     imgUrl: require('../../../../commonComp/BankList/bankImg/bank_jian.png')
                // }
            ],
            //融资银行弹窗
            dialogVisible2: false
        }
    },
    methods: {
        /* 去提货 */
        goPickGoods(data) {
            let _this = this;
            debugger
            _this.$router.push({ name: 'GoPickGoodsEdit', params: { selectedData: data } });
        },
        /* table合并列 */
        spanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 4) {
                if (rowIndex == 0) {
                    return {
                        rowspan: 1000,
                        colspan: 1
                    }
                } else {
                    return {
                        rowSpan: 1,
                        colspan: 1
                    }
                }
            }
            if (columnIndex == 5) {
                if (rowIndex == 0) {
                    return {
                        rowspan: 1000,
                        colspan: 1
                    }
                } else {
                    return {
                        rowSpan: 1,
                        colspan: 1
                    }
                }
            }
        },
        //去融资
        goFinancing(item) {
            //缓存当前订单数据
            this.goFinancingItem = item;
            this.dialogVisible2 = true;
        },
        //去融资 民生银行
        goFinancingMin(item) {
            let _this = this;
            //请确认是否与民生银行签署融资协议，如签署请点击去融资，否则点击取消，走线下融资流程
            // _this.$confirm('请确认是否与民生银行签署融资协议，如签署请点击确认，否则点击取消，走线下融资流程。', '去融资', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning',
            //     center: true
            // }).then(() => {

            //     let params = {
            //         mastContCode: item.id,//订单id
            //         clientId: _this.$store.state.customerId//客户id
            //     };
            //     let url = '/ocm-web/api/cmbc/pushOrderInfoToCmbc';
            //     _this.$http.post(url, params)
            //         .then(res => {
            //             if (res.headers["x-ocm-code"] == '1') {
            //                 //改变状态
            //                 item.financingStatus = '0';
            //                 _this.$Notify({ title: '融资成功', type: 'success' });
            //             }

            //         })
            // }).catch(() => { });
            let params = {
                mastContCode: item.id,//订单id
                clientId: _this.$store.state.customerId//客户id
            };
            let url = '/ocm-web/api/cmbc/pushOrderInfoToCmbc';
            _this.$http.post(url, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        //改变状态
                        item.financingStatus = '0';
                        _this.$Notify({ title: '已经将融资申请提交银行！', type: 'success' });
                    }

                })

        },
        //去融资 建设银行
        goFinancingJian(item) {
            //待开发
            let _this = this;
            let params = {
                orderid: item.id
            };
            let url = '/ocm-web/api/ccb/pushOrderInfoToCcb';
            _this.$http.post(url, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        //改变状态
                        item.financingStatus = '0';
                        _this.$Notify({ title: '已经将融资申请提交银行！', type: 'success' });
                    }
                })
        },
        //查看更多
        lookMore(item) {
            debugger
            item.isMoreShow = !item.isMoreShow;
        },
        //申请发货
        applySend(item) {
            let _this = this;
            let paramsWrap = {
                params: {
                    id: item.id,//订单id
                }
            }
            let url = decodeURI('/ocm-web/api/b2b/purchase-orders/get-sendapply-order-push-detail');
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        debugger
                        _this.$router.push({ name: 'ApplySend', params: { infoData: res.data } });
                    }
                })

        },
        //申请退货
        applyReturn(item) {
            let _this = this;
            let paramsWrap = {
                params: {
                    id: item.id,//订单id
                }
            }
            let url = '/ocm-web/api/b2b/purchase-orders/get-returnchange-order-push-detail';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    debugger
                    if (res.headers["x-ocm-code"] == '1') {
                        let purchaseOrderItems = res.data.purchaseOrderItems.map(v => {
                            //可退货数量=订单数量-累计申请发货数量-累计退货数量
                            debugger
                            return {
                                ...v,
                                baleQuantity: -(Math.abs(v.baleQuantity) - Math.abs(v.applyedQuantity) / v.packageNum - Math.abs(v.backedQuantity) / v.packageNum)
                            }
                        }).filter(v => v.baleQuantity)
                        res.data.purchaseOrderItems = purchaseOrderItems;
                        if (purchaseOrderItems.length > 0) {
                            _this.$router.push({ name: 'ApplyReturn', params: { infoData: res.data } });
                        } else {
                            this.$Notify({ title: '没有可退订的商品', type: 'warning' });
                        }
                    }
                })
        },
        //在线支付
        payOnline(item) {
            this.dialogVisible = true;
            this.selectedItem = item;
        },
        receiveSelectedBank(selectedBank) {
            let _this = this;
            //支付loading
            _this.selectedItem.isPayOnlineLoading = true;
            switch (selectedBank) {
                // 农业银行
                case 'abc':
                    _this.payOnlineAbc();
                    break;
                //民生银行
                case 'cmbc':
                    _this.payOnlineCmbc();
                    break;
            }
        },
        //农行在线支付
        payOnlineAbc() {

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

            //获取现金余额
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            _this.$http.get('/ocm-web/api/b2b/query-balance/getCashReserve', paramsWrap)
                .then(res => {
                    let item = _this.selectedItem;
                    let billNO = item.orderCode;
                    let dealerNO = _this.$store.state.username;
                    let dealerName = _this.$store.state.userloginName;
                    //总金额
                    let currentPay = item.totalAmount;
                    let cashRest = res.data;//现金余额
                    let totalAmount = 0;
                    if (cashRest < 0) {
                        totalAmount = currentPay - cashRest;
                    } else {
                        totalAmount = currentPay - cashRest;
                    }
                    //获取联系人电话
                    let contactTel = item.firstReceiverPhone;
                    let contact = item.firstReceiver;
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
                    debugger
                    _this.$http.post(sreverUrl, params)
                        .then(res => {
                            if (res.headers["x-ocm-code"] == '1') {
                                window.location.href = res.data.value.payUrl;
                            }
                        });
                });


        },
        //民生在线支付
        payOnlineCmbc() { },
        //融资弹窗确定按钮
        receiveSelectedBank2(selectedBank) {
            let _this = this;
            switch (selectedBank) {
                // 建设银行
                case 'ccb':
                    _this.goFinancingJian(_this.goFinancingItem);
                    break;
                //民生银行
                case 'cmbc':
                    _this.goFinancingMin(_this.goFinancingItem);
                    break;
            }
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
@import "./OrderTable1.scss";
</style>
