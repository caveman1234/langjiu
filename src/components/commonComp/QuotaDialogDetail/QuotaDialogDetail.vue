<template>
    <div class="QuotaDialogDetail">
        <el-dialog title="配额明细" @close="close" @open="open" :visible.sync="dialogVisible1" width="900px">
            <el-table :data="tableData" border>
                <el-table-column prop="rangeName" label="产品范围"></el-table-column>
                <el-table-column prop="quotaType" label="配额类型"></el-table-column>
                <el-table-column prop="totalInside" label="计划内配额合计"></el-table-column>
                <el-table-column prop="balanceInside" label="计划内配额剩余"></el-table-column>
                <el-table-column prop="totalOut" label="计划外配额合计"></el-table-column>
                <el-table-column prop="balanceOut" label="计划外配额剩余"></el-table-column>
                <el-table-column prop="limitExcess" label="超额上限（万元）"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
var tableData = [
    {
        rangeName: '11',
        quotaType: '11',
        totalInside: '11',
        balanceInside: '11',
        totalOut: '11',
        balanceOut: '11',
        limitExcess: '11',
    }
];
export default {
    name: 'QuotaDialogDetail',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        },
        bankDataSource1: {
            default() {
                return [];

            }
        }
    },
    data() {
        return {
            dialogVisible1: this.dialogVisible,
            tableData: tableData
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
            this.selectedBank = '';
        },
        open() {
            //请求配额详情
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            this.$http.get('/ocm-web/api/base/prod/search-for-purchase-order', paramsWrap)
                .then(res => {
                    let tableData = res.data;
                    this.tableData = tableData;
                });
        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
        confirm() {
            if (this.selectedBank === '') {
                this.$Notify({ title: '请选择一个银行', type: 'warning' });
                return;
            }
            //关闭弹窗
            this.$emit('update:dialogVisible', false);
            //抛出选中的银行
            this.$emit('receiveSelectedBank', this.selectedBank);
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

