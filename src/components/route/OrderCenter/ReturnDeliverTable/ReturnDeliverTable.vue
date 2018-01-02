<template>
    <div class="ReturnDeliverTable">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单时间:</el-col>
                        <el-col :span="2">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="2">订单编号:</el-col>
                        <el-col :span="2">{{item.poTypeCode}}</el-col>
                    </el-row>
                </div>
                <el-table :data="item.purchaseOrderItems" border style="width: 100%">
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
                    <el-table-column prop="applyNum" label="数量">
                        <template slot-scope="scope">
                            <div>
                                <div>箱数：{{scope.row.baleQuantity}} 箱</div>
                                <div>瓶数：{{scope.row.baseQuantity}} 瓶</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalAmount" label="金额">
                        <template slot-scope="scope">
                            <div v-red>{{scope.row.totalAmount | formatPrice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="billStatusName" label="状态"></el-table-column>
                </el-table>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'ReturnDeliverTable',
    props: {
        orderData: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            defaultImg: require('../../../../assets/defaultimg.png'),
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
@import './ReturnDeliverTable.scss';
</style>
