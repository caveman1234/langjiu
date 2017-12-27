<template>
    <div class="promiseRest">
        <div class="title">保证金余额明细</div>
        <el-table>
            <el-table-column :data="tableData" label="产品线"></el-table-column>
            <el-table-column prop="E" label="余额"></el-table-column>
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