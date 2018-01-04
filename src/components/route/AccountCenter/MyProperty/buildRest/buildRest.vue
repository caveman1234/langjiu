<template>
    <div class="buildRest">
        <div class="title">共建基金余额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="sybName" label="事业部">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.sybName}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="reserve" label="余额">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.reserve|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="E" label="X类"></el-table-column>
                <el-table-column prop="E" label="非X类"></el-table-column>
                <el-table-column prop="E" label="合计"></el-table-column> -->
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'buildRest',
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
@import './buildRest.scss';
</style>