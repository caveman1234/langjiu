<template>
    <div class="promiseRest">
        <div class="title">保证金余额明细</div>
        <el-table :data="tableDataArr" border>
            <el-table-column prop="sybName" label="事业部">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.sybName}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="deposit" label="余额">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.deposit|formatPrice}}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'promiseRest',
    props:['tableDataArr'],
    data(){
        return {
            tableData:[]
        }
    },
    mounted(){
    }
}
</script>
<style lang="scss" scoped>
@import './promiseRest.scss';
</style>