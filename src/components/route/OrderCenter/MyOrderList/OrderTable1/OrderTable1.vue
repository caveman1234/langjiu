<template>
    <div class="OrderTable1">
        <template v-for="(item,index) in orderData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">订单类型:</el-col>
                        <el-col v-red :span="2">{{item.poTypeName}}</el-col>
                        <el-col :span="2">订单金额:</el-col>
                        <el-col v-red :span="2">{{item.totalAmount | formatPrice}}</el-col>
                        <el-col :span="2">订单时间:</el-col>
                        <el-col :span="2">{{item.orderDate|formatDate}}</el-col>
                        <el-col :span="2">订单编号:</el-col>
                        <el-col :span="2">{{item.poTypeCode}}</el-col>
                        <el-col :span="2">订单状态:</el-col>
                        <el-col v-red :span="2">{{item.billStatusName}}</el-col>
                        <el-col :span="2">
                            <el-button @click="goFinancing(item)" size="mini" type="primary">去融资</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table :data="item.purchaseOrderItems" :span-method="spanMethod" border style="width: 100%">
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
                    <el-table-column prop="basePrice" label="单价"> </el-table-column>
                    <el-table-column prop="boxCount" label="数量(箱)"> </el-table-column>
                    <el-table-column prop="" label="金额">
                        <template slot-scope="scope">
                            <div v-red>{{item.totalAmount | formatPrice}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button size="mini" type="primary">去融资</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'OrderTable1',
    props: {
        orderData: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            defaultImg: require('../../../../../assets/defaultimg.png')
        }
    },
    methods: {
        /* 去融资 */
        goFinancing(data) {
            var params = {
                selectedData: data.purchaseOrderItems
            };
            this.$router.push({ name: 'GenerateBillsEdit', params });
        },
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
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
@import './OrderTable1.scss';
</style>
