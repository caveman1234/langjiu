<template>
    <div class="TakeWineTable">

        <template v-for="(item,index) in tableData">
            <div class="orderWrap" :key="index">
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">借酒日期:</el-col>
                        <el-col :span="3">{{item.billDate | formatDate}}</el-col>
                        <el-col :span="2">借酒单号:</el-col>
                        <el-col :span="3">{{item.code}}</el-col>
                        <el-col :span="2">借酒金额:</el-col>
                        <el-col v-red :span="3">{{item.totalMoney | formatPrice}}</el-col>
                        <el-col :span="2">借酒状态:</el-col>
                        <el-col v-red :span="3"> {{item.billStatus | formatTakeWineStatus }}</el-col>
                    </el-row>
                </div>
                <div class="orderHeader">
                    <el-row>
                        <el-col :span="2">借酒用途:</el-col>
                        <el-col :span="20">{{item.remark}}</el-col>
                    </el-row>
                </div>
                <div class="orderHeader">
                    <el-row type="flex" justify="end">
                        <template v-if="item.billStatus == 0">
                            <el-button @click="checkPass(item)" size="mini" type="primary">通过</el-button>
                            <div style="opacity:0;">1</div>
                            <el-button @click="checkNotPass(item)" size="mini" type="primary">驳回</el-button>
                        </template>

                    </el-row>
                </div>
                <div class="orderBody">
                    <el-table :data="item.borrowWineBillItems" border>
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
                                    <div>箱数：{{scope.row.baleQuantity||0}} 箱</div>
                                    <div>瓶数：{{scope.row.baseQuantity||0}} 瓶</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="boxCount" label="累计还酒数量" min-width="110">
                            <template slot-scope="scope">
                                <div>
                                    <div>箱数：{{scope.row.returnBaleQuantity||0}} 箱</div>
                                    <div>瓶数：{{scope.row.returnBaseQuantity||0}} 瓶</div>
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
    name: 'TakeWineTable',
    props: {
        tableData: {
            default() {
                return [
                    {
                        date: 1519975994796,
                        code: 'po012345678',
                        totalMoney: 200000.00,
                        status: 0,
                        remark: '备注，借酒用途',
                        id: 1,
                        list: [
                            {
                                imageUrl: 'url',
                                productDesc: '42度郎牌特曲鉴赏12 1*4',
                                standard: '500ml',
                                productModel: '53',
                                basePrice: 2000.11,
                                baleQuantity: '1',
                                baseQuantity: '4',
                                totalReturn: 20
                            },
                            {
                                imageUrl: 'url',
                                productDesc: '42度郎牌特曲鉴赏12 1*4',
                                standard: '600ml',
                                productModel: '53',
                                basePrice: 3000.11,
                                baleQuantity: '1',
                                baseQuantity: '4',
                                totalReturn: 20
                            }
                        ]
                    },
                    {
                        date: 1519975994796,
                        code: 'po012345678',
                        totalMoney: 200000.00,
                        status: 1,
                        remark: '备注，借酒用途',
                        id: 2,
                        list: [
                            {
                                imageUrl: 'url',
                                productDesc: '42度郎牌特曲鉴赏12 1*4',
                                standard: '500ml',
                                productModel: '53',
                                basePrice: 2000.11,
                                baleQuantity: '1',
                                baseQuantity: '4',
                                totalReturn: 20
                            },
                            {
                                imageUrl: 'url',
                                productDesc: '42度郎牌特曲鉴赏12 1*4',
                                standard: '600ml',
                                productModel: '53',
                                basePrice: 3000.11,
                                baleQuantity: '1',
                                baseQuantity: '4',
                                totalReturn: 20
                            }
                        ]
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
        checkPass(item) {
            this.$emit('checkPass', item);
        },
        checkNotPass(item) {
            this.$emit('checkNotPass', item);
        }
    },
    filters: {
        //格式化借酒状态
        formatTakeWineStatus(value) {
            let obj = {
                '0': '已提交',
                '1': '已审核',
                '2': '已完成',
                '3': '已作废',
                '4': '审核不通过'
            }
            return obj[value];
        },
    }
}
</script>
<style lang="scss">
@import './TakeWineTable.scss';
</style>

