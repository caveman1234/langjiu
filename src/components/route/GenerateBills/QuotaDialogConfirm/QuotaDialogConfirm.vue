<template>
  <div class="QuotaDialogConfirm">
    <el-button size="mini" @click="check" type="primary">提交(验证配额)</el-button>
    <el-dialog title="外层 Dialog" :visible.sync="visiableInner">
      <el-dialog title="外层 Dialog" :visible.sync="visiableOuter">
        <div slot="footer" class="dialog-footer">
          <el-button size="mini">取 消</el-button>
          <el-button size="mini" type="primary">计划外</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini">取 消</el-button>
        <el-button size="mini" type="primary">计划内</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'QuotaDialogConfirm',
  props: {
    goodsData: {
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isQuato: 1,//1计划内价格 0计划外价格
      visiableInner:false,//计划内弹框
      visiableOuter:false,//计划外
    }
  },
  methods: {
    //检查配额
    checkQuota() {
      //检查配额
      let params = {
        distributorId: this.$store.state.customerId,
        purchaseOrderItems: this.goodsData.map(v => ({ ...v, basePrice: v.basicPrice }))
      }
      return this.$http.post('/ocm-web/api/b2b/purchase-orders/checkQuota', params)
        .then(res => {
          debugger
          if (res.headers["x-ocm-code"] == '1') {
            return true;
          } else {
            return false;
          }
        });
    },
    check(){
      this.visiableInner = true;
    }
  },
  mounted() { }
}
</script>
<style lang="scss">
@import "./QuotaDialogConfirm.scss";
</style>

