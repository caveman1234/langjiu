<template>
    <div class="QuotaDialogDetail">
        <el-dialog title="配额明细" @close="close" @open="open" :visible.sync="dialogVisible1" width="1000px">
            <el-table :data="tableData" border>
                <el-table-column prop="rangeName" label="产品范围"  width="130px"></el-table-column>
                <el-table-column prop="quotaName" label="配额类型"  width="130px"></el-table-column>
                <el-table-column prop="totalInside" label="计划内配额合计"  width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.totalInside  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="accumulativeTotal" label="计划内累计执行数量" width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.accumulativeTotal  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="accumulativeAmount" label="计划内累计执行金额" width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.accumulativeAmount  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="residueInside" label="计划内配额剩余" width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.residueInside  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalOut" label="计划外配额合计"  width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.totalOut  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="accumulativeTotal_out" label="计划外累计执行数量" width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.accumulativeTotal_out  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="accumulativeAmount_out" label="计划外累计执行金额" width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.accumulativeAmount_out  }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="residueOut" label="计划外配额剩余" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.residueOut  }}</div>
                </template>
                </el-table-column>
                
                <el-table-column prop="limitExcess" label="超额上限（万元）"  width="130px">
                    <template slot-scope="scope">
                        <div>{{scope.row.limitExcess  }}</div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'QuotaDialogDetail',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            dialogVisible1: this.dialogVisible,
            tableData: []
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
        },
        open() {
            //请求配额详情
            let params = {
                customerId: this.$store.state.customerId
            }
            this.$http.post('/ocm-web/api/base/quota-customer-excel/getList', params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        let tableData = res.data;
                        this.tableData = tableData;
                    }
                });
        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
    },
    watch: {
        dialogVisible(val) {
            this.dialogVisible1 = val;
        }
    },
    mounted() { }
}
</script>
<style lang="scss">
@import "./QuotaDialogDetail.scss";
</style>

