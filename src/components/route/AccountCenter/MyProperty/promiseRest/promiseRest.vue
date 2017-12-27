<template>
    <div class="promiseRest">
        <div class="title">保证金余额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="syb" label="事业部"></el-table-column>
            <el-table-column prop="deposit" label="余额"></el-table-column>
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