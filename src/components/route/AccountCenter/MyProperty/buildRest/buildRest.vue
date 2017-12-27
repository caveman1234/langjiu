<template>
    <div class="buildRest">
        <div class="title">共建基金余额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="syb" label="事业部"></el-table-column>
            <el-table-column prop="reserve" label="余额"></el-table-column>
            <!-- <el-table-column prop="E" label="X类"></el-table-column>
            <el-table-column prop="E" label="非X类"></el-table-column>
            <el-table-column prop="E" label="合计"></el-table-column> -->
        </el-table>
    </div>
</template>
<script>
export default {
    name:'buildRest',
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
@import './buildRest.scss';
</style>