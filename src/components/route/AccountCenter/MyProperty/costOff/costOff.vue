<template>
    <div class="costOff">
        <div class="title">费用余额明细</div>
        <el-table>
            <el-table-column :data="tableData" label="产品线"></el-table-column>
            <el-table-column prop="E" label="E"></el-table-column>
            <el-table-column prop="E" label="Q"></el-table-column>
            <el-table-column prop="E" label="F"></el-table-column>
            <el-table-column prop="E" label="合计"></el-table-column>
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
