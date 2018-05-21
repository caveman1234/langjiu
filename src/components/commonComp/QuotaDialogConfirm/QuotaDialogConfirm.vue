<template>
    <div class="QuotaDialogConfirm">
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
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
  name: 'QuotaDialogConfirm',
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
@import "./QuotaDialogConfirm.scss";
</style>

