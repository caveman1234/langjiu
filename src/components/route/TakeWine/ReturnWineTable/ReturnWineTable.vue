<template>
    <div class="ReturnWineTable">
        <template v-for="(item,index) in tableData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">还酒日期:</el-col>
                        <el-col :span="3">{{item.orderDate | formatDate}}</el-col>
                        <el-col :span="2">还酒单号:</el-col>
                        <el-col :span="3">{{item.orderCode}}</el-col>
                        <el-col :span="2">还酒金额:</el-col>
                        <el-col v-red :span="3">{{item.totalAmount | formatPrice}}</el-col>
                        <el-col :span="2">单据状态:</el-col>
                        <el-col v-red :span="3"> {{item.billStatusCode | formatReturnWineStatus }}</el-col>
                    </el-row>
                </div>

                <div class="orderBody">
                    <el-table :data="item.returnWineBillItems" border>
                        <el-table-column prop="productDesc" label="商品详情" width="300">
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
                                <div>{{scope.row.basePrice|formatInOut}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="boxCount" label="数量" min-width="110">
                            <template slot-scope="scope">
                                <div>
                                    <div>件数：{{scope.row.baleQuantity||0}} 件</div>
                                    <div>瓶数：{{scope.row.baseQuantity||0}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sendedQuantity" label="累计发货数量" min-width="110">
                            <template slot-scope="scope">
                                <div>
                                    <div>件数：{{scope.row.sendedQuantity/(scope.row.packageNum||6)}} 件</div>
                                    <div>瓶数：{{scope.row.sendedQuantity}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </template>
    </div>
</template>
<script>
export default {
    name: 'ReturnWineTable',
    props: {
        tableData: {
            default() {
                return [
                    {
                        "id": "5966f2f1-32e8-4767-9dbb-07010fbbf136",
                        "dr": 0,
                        "ts": 1520378263166,
                        "creator": "langjiu",
                        "creationTime": 1520378274000,
                        "modifier": null,
                        "modifiedTime": null,
                        "persistStatus": "nrm",
                        "receiveOrgId": "859f4d01-000d-492e-be78-b24c3632df45",
                        "receiveOrgCode": "0202",
                        "receiveOrgName": "四川古蔺郎酒销售有限公司",
                        "orderCode": "HJ180305011",
                        "orderDate": 1520205343000,
                        "distributorId": "88aff423-a060-4c0e-9d6f-bcf10c6018e1",
                        "distributorCode": "270122",
                        "distributorName": "成都红旗连锁批发有限公司",
                        "saleChannelId": "2f497961-074e-4165-a566-6cb44d22d920",
                        "saleChannelCode": "00",
                        "saleChannelName": "通用",
                        "saleOrgId": "de810a5a-98c0-4c23-9fd3-31e4b5df0778",
                        "saleOrgCode": "0216",
                        "saleOrgName": "郎牌特曲事业部",
                        "agencyId": "04148014-a97f-4c90-bf93-85fea3ea00e2",
                        "agencyCode": "02160313",
                        "agencyName": "郎特豫东办事处",
                        "cityUintId": "300f7f0a-7777-4be6-8fff-7eb915c83738",
                        "cityUintCode": "0216031334",
                        "cityUintName": "郎特许昌",
                        "customerManagerId": "8fd55705-a8b1-4aec-b515-aec9ab57aba1",
                        "customerManagerCode": "70122",
                        "customerManagerName": "杨俊超",
                        "isNoticeSend": null,
                        "isNoticeSendName": null,
                        "isApplySendOver": 0,
                        "isSendOver": 0,
                        "sendDate": null,
                        "isNcConfirm": 0,
                        "isNcConfirmName": "否",
                        "financingOrg": null,
                        "financingOrgName": null,
                        "financingStatus": "10",
                        "financingStatusName": "未融资",
                        "orderYear": null,
                        "receiveAddressId": "9671193f-3d2c-4ee4-8391-5e188d34efd5",
                        "receiveAddressCode": "6000306",
                        "receiveAddressName": "aaa",
                        "addressDetail": "宁夏回族自治区 固原市 泾源县 111",
                        "firstReceiver": "11",
                        "firstReceiverTel": "11",
                        "firstReceiverPhone": "11",
                        "receiveDistributorId": null,
                        "receiveDistributorCode": null,
                        "receiveDistributorName": null,
                        "poTypeId": "117437c5-c322-41d9-aaa3-6b8558f8119d",
                        "poTypeCode": "08",
                        "poTypeName": "还酒订单",
                        "poTypeBusinessType": "07",
                        "productGroupId": "77986245-23dd-4be1-85d2-395a5ef295e1",
                        "productGroupCode": "021502",
                        "productGroupName": "郎牌特曲",
                        "remark": null,
                        "billStatusId": "85911391-be50-4fb0-0b2b-004800000002",
                        "billStatusCode": "02",
                        "billStatusName": "已提交",
                        "billMakerId": null,
                        "billMakerName": null,
                        "approverId": null,
                        "approveTime": null,
                        "approveOpinion": null,
                        "closeReasonId": null,
                        "closeReasonCode": null,
                        "closeReasonName": null,
                        "closedBy": null,
                        "closeTime": null,
                        "sourceSystemId": "85911391-be50-4fb0-0b2b-007400000004",
                        "sourceSystemCode": "04",
                        "sourceSystemName": "中台系统",
                        "eFeeGoodsAmount": 0,
                        "qFeeGoodsAmount": 0,
                        "fFeeGoodsAmount": 0,
                        "eFeeFundAmount": 0,
                        "qFeeFundAmount": 0,
                        "fFeeFundAmount": 0,
                        "eFeeUsedAmount": 0,
                        "qFeeUsedAmount": 0,
                        "fFeeUsedAmount": 0,
                        "totalQuantity": 60,
                        "totalBaleQuantity": 2,
                        "totalVolume": 2.64,
                        "totalWeight": 614,
                        "totalAmount": 14000,
                        "totalRepayAmount": 0,
                        "totalRepaidAmount": 0,
                        "totalDelierAmount": 0,
                        "tenant": null,
                        "returnWineBillItems": [{
                            "id": "8e54ad5f-f28d-4ca6-9113-c8a1826bbba10",
                            "dr": 0,
                            "ts": 1520378492298,
                            "creator": "langjiu",
                            "creationTime": 1520378500000,
                            "modifier": "langjiu",
                            "modifiedTime": 1520378505000,
                            "persistStatus": "nrm",
                            "imageUrl": null,
                            "returnWineBillId": "5966f2f1-32e8-4767-9dbb-07010fbbf136",
                            "returnWineBillCode": "HJ180305011",
                            "returnWineBillType": "还酒订单",
                            "returnWineBillDate": 1520205343000,
                            "agencyCode": "02160313",
                            "agencyName": "郎特豫东办事处",
                            "isNoticeSend": null,
                            "isNoticeSendName": null,
                            "rowNum": 10,
                            "productId": "1e4ff861-bb35-4826-9456-e44ef2a8d3f4",
                            "productCode": "2",
                            "productName": "2",
                            "productDesc": "2",
                            "standard": "500",
                            "productModel": null,
                            "baseUnitId": "3ec10dc3-5b1f-4659-8496-686d13acdde3",
                            "baseUnitCode": "0119",
                            "baseUnitName": "瓶",
                            "baseQuantity": 20,
                            "baleUnitId": "2e5b0589-e5ef-4984-ab82-15de31c25f69",
                            "baleUnitCode": "0115",
                            "baleUnitName": "件",
                            "baleQuantity": 2,
                            "productCategoryName": null,
                            "productProStateName": null,
                            "materialGroupId": "2b1e2c31-2f9f-4b3b-b7da-918df64c2bb4",
                            "materialGroupCode": "0301",
                            "materialGroupName": "郎牌特曲/T3",
                            "proTypeCode": null,
                            "proTypeId": null,
                            "proTypeName": null,
                            "basePrice": 200,
                            "packageNum": null,
                            "dealPrice": 200,
                            "fundPrice": 0,
                            "dealAmount": 2000,
                            "discountAmount": 0,
                            "fundAmount": 0,
                            "fundFee": null,
                            "fundCash": null,
                            "realAmount": 4000,
                            "returnChangeType": null,
                            "srcBillType": null,
                            "srcBillId": "aaaaaa",
                            "srcBillCode": null,
                            "srcBillRowId": null,
                            "srcBillRowNum": null,
                            "firstBillType": null,
                            "firstBillId": null,
                            "firstBillCode": null,
                            "firstBillRowId": null,
                            "firstBillRowNum": null,
                            "volume": 0.84,
                            "weight": 198,
                            "volumeUnit": 0.042,
                            "weightUnit": 9.9,
                            "poPoQuantity": 0,
                            "applyedQuantity": 0,
                            "sendedQuantity": 0,
                            "signedQuantity": 0,
                            "backedQuantity": 0,
                            "notClearAmount": null,
                            "productGroupId": "77986245-23dd-4be1-85d2-395a5ef295e1",
                            "productGroupCode": "021502",
                            "productGroupName": "郎牌特曲",
                            "isClose": 0,
                            "closeReasonId": null,
                            "closeReasonCode": null,
                            "closeReasonName": null,
                            "closedBy": null,
                            "closeTime": null,
                            "distributorId": null,
                            "distributorCode": "270122",
                            "distributorName": "成都红旗连锁批发有限公司",
                            "remark": null,
                            "billItemStatusId": "85911391-be50-4fb0-0b2b-004800000009",
                            "billItemStatusCode": "09",
                            "billItemStatusName": "审核不通过",
                            "transTime": null,
                            "transSuccess": null,
                            "transFailedReason": null,
                            "tenant": null,
                            "thisQuantity": null,
                            "destSoCode": null,
                            "changeRow": false,
                            "returnRow": false
                        }],
                        "totalGoodsAmount": 2000
                    },
                    {
                        "id": "5966f2f1-32e8-4767-9dbb-07010fbbf135",
                        "dr": 0,
                        "ts": 1520378263166,
                        "creator": "langjiu",
                        "creationTime": 1520378274000,
                        "modifier": null,
                        "modifiedTime": null,
                        "persistStatus": "nrm",
                        "receiveOrgId": "859f4d01-000d-492e-be78-b24c3632df45",
                        "receiveOrgCode": "0202",
                        "receiveOrgName": "四川古蔺郎酒销售有限公司",
                        "orderCode": "HJ180305010",
                        "orderDate": 1520205343000,
                        "distributorId": "88aff423-a060-4c0e-9d6f-bcf10c6018e1",
                        "distributorCode": "270122",
                        "distributorName": "成都红旗连锁批发有限公司",
                        "saleChannelId": "2f497961-074e-4165-a566-6cb44d22d920",
                        "saleChannelCode": "00",
                        "saleChannelName": "通用",
                        "saleOrgId": "de810a5a-98c0-4c23-9fd3-31e4b5df0778",
                        "saleOrgCode": "0216",
                        "saleOrgName": "郎牌特曲事业部",
                        "agencyId": "04148014-a97f-4c90-bf93-85fea3ea00e2",
                        "agencyCode": "02160313",
                        "agencyName": "郎特豫东办事处",
                        "cityUintId": "300f7f0a-7777-4be6-8fff-7eb915c83738",
                        "cityUintCode": "0216031334",
                        "cityUintName": "郎特许昌",
                        "customerManagerId": "8fd55705-a8b1-4aec-b515-aec9ab57aba1",
                        "customerManagerCode": "70122",
                        "customerManagerName": "杨俊超",
                        "isNoticeSend": null,
                        "isNoticeSendName": null,
                        "isApplySendOver": 0,
                        "isSendOver": 0,
                        "sendDate": null,
                        "isNcConfirm": 0,
                        "isNcConfirmName": "否",
                        "financingOrg": null,
                        "financingOrgName": null,
                        "financingStatus": "10",
                        "financingStatusName": "未融资",
                        "orderYear": null,
                        "receiveAddressId": "9671193f-3d2c-4ee4-8391-5e188d34efd5",
                        "receiveAddressCode": "6000306",
                        "receiveAddressName": "aaa",
                        "addressDetail": "宁夏回族自治区 固原市 泾源县 111",
                        "firstReceiver": "11",
                        "firstReceiverTel": "11",
                        "firstReceiverPhone": "11",
                        "receiveDistributorId": null,
                        "receiveDistributorCode": null,
                        "receiveDistributorName": null,
                        "poTypeId": "117437c5-c322-41d9-aaa3-6b8558f8119d",
                        "poTypeCode": "08",
                        "poTypeName": "还酒订单",
                        "poTypeBusinessType": "07",
                        "productGroupId": "77986245-23dd-4be1-85d2-395a5ef295e1",
                        "productGroupCode": "021502",
                        "productGroupName": "郎牌特曲",
                        "remark": null,
                        "billStatusId": "85911391-be50-4fb0-0b2b-004800000002",
                        "billStatusCode": "02",
                        "billStatusName": "已提交",
                        "billMakerId": null,
                        "billMakerName": null,
                        "approverId": null,
                        "approveTime": null,
                        "approveOpinion": null,
                        "closeReasonId": null,
                        "closeReasonCode": null,
                        "closeReasonName": null,
                        "closedBy": null,
                        "closeTime": null,
                        "sourceSystemId": "85911391-be50-4fb0-0b2b-007400000004",
                        "sourceSystemCode": "04",
                        "sourceSystemName": "中台系统",
                        "eFeeGoodsAmount": 0,
                        "qFeeGoodsAmount": 0,
                        "fFeeGoodsAmount": 0,
                        "eFeeFundAmount": 0,
                        "qFeeFundAmount": 0,
                        "fFeeFundAmount": 0,
                        "eFeeUsedAmount": 0,
                        "qFeeUsedAmount": 0,
                        "fFeeUsedAmount": 0,
                        "totalQuantity": 60,
                        "totalBaleQuantity": 2,
                        "totalVolume": 2.64,
                        "totalWeight": 614,
                        "totalAmount": 14000,
                        "totalRepayAmount": 0,
                        "totalRepaidAmount": 0,
                        "totalDelierAmount": 0,
                        "tenant": null,
                        "returnWineBillItems": [{
                            "id": "8e54ad5f-f28d-4ca6-9113-c8a1826bbba9",
                            "dr": 0,
                            "ts": 1520378492298,
                            "creator": "langjiu",
                            "creationTime": 1520378500000,
                            "modifier": "langjiu",
                            "modifiedTime": 1520378505000,
                            "persistStatus": "nrm",
                            "imageUrl": null,
                            "returnWineBillId": "5966f2f1-32e8-4767-9dbb-07010fbbf135",
                            "returnWineBillCode": "HJ180305010",
                            "returnWineBillType": "还酒订单",
                            "returnWineBillDate": 1520205343000,
                            "agencyCode": "02160313",
                            "agencyName": "郎特豫东办事处",
                            "isNoticeSend": null,
                            "isNoticeSendName": null,
                            "rowNum": 10,
                            "productId": "1e4ff861-bb35-4826-9456-e44ef2a8d3f4",
                            "productCode": "2",
                            "productName": "2",
                            "productDesc": "2",
                            "standard": "500",
                            "productModel": null,
                            "baseUnitId": "3ec10dc3-5b1f-4659-8496-686d13acdde3",
                            "baseUnitCode": "0119",
                            "baseUnitName": "瓶",
                            "baseQuantity": 20,
                            "baleUnitId": "2e5b0589-e5ef-4984-ab82-15de31c25f69",
                            "baleUnitCode": "0115",
                            "baleUnitName": "件",
                            "baleQuantity": 2,
                            "productCategoryName": null,
                            "productProStateName": null,
                            "materialGroupId": "2b1e2c31-2f9f-4b3b-b7da-918df64c2bb4",
                            "materialGroupCode": "0301",
                            "materialGroupName": "郎牌特曲/T3",
                            "proTypeCode": null,
                            "proTypeId": null,
                            "proTypeName": null,
                            "basePrice": 200,
                            "packageNum": null,
                            "dealPrice": 200,
                            "fundPrice": 0,
                            "dealAmount": 2000,
                            "discountAmount": 0,
                            "fundAmount": 0,
                            "fundFee": null,
                            "fundCash": null,
                            "realAmount": 4000,
                            "returnChangeType": null,
                            "srcBillType": null,
                            "srcBillId": "aaaaaa",
                            "srcBillCode": null,
                            "srcBillRowId": null,
                            "srcBillRowNum": null,
                            "firstBillType": null,
                            "firstBillId": null,
                            "firstBillCode": null,
                            "firstBillRowId": null,
                            "firstBillRowNum": null,
                            "volume": 0.84,
                            "weight": 198,
                            "volumeUnit": 0.042,
                            "weightUnit": 9.9,
                            "poPoQuantity": 0,
                            "applyedQuantity": 0,
                            "sendedQuantity": 0,
                            "signedQuantity": 0,
                            "backedQuantity": 0,
                            "notClearAmount": null,
                            "productGroupId": "77986245-23dd-4be1-85d2-395a5ef295e1",
                            "productGroupCode": "021502",
                            "productGroupName": "郎牌特曲",
                            "isClose": 0,
                            "closeReasonId": null,
                            "closeReasonCode": null,
                            "closeReasonName": null,
                            "closedBy": null,
                            "closeTime": null,
                            "distributorId": null,
                            "distributorCode": "270122",
                            "distributorName": "成都红旗连锁批发有限公司",
                            "remark": null,
                            "billItemStatusId": "85911391-be50-4fb0-0b2b-004800000009",
                            "billItemStatusCode": "09",
                            "billItemStatusName": "审核不通过",
                            "transTime": null,
                            "transSuccess": null,
                            "transFailedReason": null,
                            "tenant": null,
                            "thisQuantity": null,
                            "destSoCode": null,
                            "changeRow": false,
                            "returnRow": false
                        }],
                        "totalGoodsAmount": 2000
                    }
                ]
            }
        }
    },
    data() {
        return {
            defaultImg: require('../../../../assets/defaultimg.png'),
        }
    },
    methods: {
        
    },
    filters: {
        //格式化还酒状态
        formatReturnWineStatus(value) {
            let obj = {
                '01': '未提交',
                '02': '已提交',
                '03': '审核通过',
                '04': '审核不通过',
                '05': '已完成'
            }
            return obj[value];
        },
    }
}
</script>
<style lang="scss">
@import './ReturnWineTable.scss';
</style>

