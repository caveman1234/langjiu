<template>
    <div class="costOff">
        <div class="title">费用余额明细</div>
        <el-table :data="tableDataArr">
            <el-table-column prop="syb" label="产品线"></el-table-column>
            <el-table-column prop="eReserve" label="E"></el-table-column>
            <el-table-column prop="qReserve" label="Q"></el-table-column>
            <el-table-column prop="fReserve" label="F"></el-table-column>
            <el-table-column prop="total" label="合计"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'costOff',
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
@import './costOff.scss';
</style>
