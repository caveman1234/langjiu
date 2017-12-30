<template>
    <div class="costOff">
        <div class="title">费用余额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="syb" label="产品线"></el-table-column>
            <el-table-column prop="eReserve" label="E">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.standard}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="qReserve" label="Q">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.qReserve|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="fReserve" label="F">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.fReserve|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="total" label="合计">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.total|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
//formatPrice
export default {
    name: 'costOff',
    props: ['tableDataArr'],
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
@import './costOff.scss';
</style>
