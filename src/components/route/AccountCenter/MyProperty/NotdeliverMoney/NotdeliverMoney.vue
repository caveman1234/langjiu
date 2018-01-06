<template>
    <div class="NotdeliverMoney">
        <div class="title">未发货金额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="orderDate"
                label="订单日期" width="100px">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.orderDate|formatDate}}</div>
                    </div>
                </template></el-table-column>
            <el-table-column prop="orderCode"
                label="订单号" width="100px"></el-table-column>
            <el-table-column prop="productDesc"
                label="产品名称"></el-table-column>
            <el-table-column prop="baseQuantity"
                label="订单数量"></el-table-column>
            <el-table-column prop="sendedQuantity"
                label="已发货数量"></el-table-column>
            <el-table-column prop="unSendQuantity"
                label="未发货数量"> </el-table-column>
            <el-table-column prop="unSendAmount"
                label="未发货金额" width="100px">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.unSendAmount|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'NotdeliverMoney',
    props: ['tableDataArr']
}
</script>
<style lang="scss" scoped>
@import './NotdeliverMoney.scss';
</style>

