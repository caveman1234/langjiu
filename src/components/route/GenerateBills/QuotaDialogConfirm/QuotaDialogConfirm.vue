<template>
  <div class="QuotaDialogConfirm">
    <el-button size="mini" @click="checkInner" type="primary">{{isBillEditPage ? "确定" : "提交"}}</el-button>
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="800px"
      title="计划内" 
      @close="close"
      :visible.sync="visiableInner">
        <div class="quotadialogInnerContainer">
          <el-row>
            {{innerMessage}}
          </el-row>
        </div>
      <el-dialog
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        width="800px"
        title="计划外" 
        :visible.sync="visiableOuter"
        append-to-body>
        <div class="quotadialogOuterContainer">
          <el-row>
            {{outterMessage}}
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outterCancel" size="mini">关 闭</el-button>
          <el-button @click="returnEdit" size="mini" type="primary">返回修改</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lookQuotaDetail" size="mini">查看配额明细</el-button>
        <el-button @click="innerCancel" size="mini">取 消</el-button>
        <el-button @click="checkOutter" size="mini" type="primary">继续提交</el-button>
      </div>
    </el-dialog>



      <el-dialog
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        width="800px"
        title="无配额" 
        :visible.sync="visiableCanNotSubmit">
          <div class="quotadialogOuterContainer">
            <el-row>
              {{canNotSubmitMsg}}
            </el-row>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outterCancel" size="mini">关 闭</el-button>
            <el-button @click="returnEdit" size="mini" type="primary">返回修改</el-button>
          </div>
      </el-dialog>



    <QuotaDialogDetail
      :dialogVisible.sync="dialogVisible"
    />
  </div>
</template>
<script>
import QuotaDialogDetail from "./QuotaDialogDetail/QuotaDialogDetail";
export default {
  name: 'QuotaDialogConfirm',
  components: { QuotaDialogDetail },
  props: {
    goodsData: {
      default() {
        return [];
      }
    },
    poTypeCode: {
      default() {
        return '';
      }
    },
    //是否是编辑页面检查配额
    isBillEditPage: {
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      isQuota: 1,//1计划内价格 0计划外价格
      visiableInner: false,//计划内弹框
      visiableOuter: false,//计划外
      visiableCanNotSubmit: false,//不能提交
      innerMessage: '',
      outterMessage: '',
      canNotSubmitMsg: '',
    }
  },
  methods: {
    close() {
      this.isQuota = 1;
    },
    //检查计划内外配额
    checkQuotaInnerOuter(isQuota) {

      //检查配额
      let params = {
        isQuota: isQuota,
        // poTypeCode: this.poTypeCode,
        distributorId: this.$store.state.customerId,
        purchaseOrderItems: this.goodsData.map(v => ({ ...v, basePrice: v.basicPrice || v.basePrice }))
      }
      debugger
      return this.$http.post('/ocm-web/api/b2b/purchase-orders/checkQuota', params)
        .then(res => {
          if (res.headers["x-ocm-code"] == '1') {
            if (res.data.state == "1") {
              return "1";
            } else if (res.data.state == "2") {
              isQuota == 1 ? this.innerMessage = res.data.mesage : this.outterMessage = res.data.mesage;
              return "2";
            } else if (res.data.state == "3") {
              this.canNotSubmitMsg = res.data.mesage;
              return "3";
            }
          }
        });
    },
    //配额检查计划内
    async checkInner() {
      // if (this.poTypeCode == '') {
      //   this.$Notify({ title: '订单类型不能为空', type: 'warning' });
      //   return;
      // }
      let resultInner = await this.checkQuotaInnerOuter(1);
      if (resultInner == "1") {
        //计划内提交
        // this.$confirm('此操作不可逆，是否提交？', '提交', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
          this.closeAllMask();
          this.$emit("plainInnerSubmit");
        // }).catch(() => { });
      } else if (resultInner == "2") {
        this.visiableInner = true;
      } else if (resultInner == "3") {
        this.visiableCanNotSubmit = true;
        return "3";
      }
    },
    //配额检查计划外
    async checkOutter() {
      let resultOutter = await this.checkQuotaInnerOuter(0);
      if (resultOutter == "1") {
        //计划外提交
        // this.$confirm('此操作不可逆，是否提交？', '提交', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
          this.closeAllMask();
          this.$emit("plainOutterSubmit");
        // }).catch(() => { });

      } else if (resultOutter == "2") {
        //不能下订单
        this.visiableOuter = true;
        // this.$Notify({ title: '计划外额度不够不能下单', type: 'warning' });
      }
    },

    //计划外提交
    submitOutter() {

    },
    closeAllMask(){
      this.visiableOuter = false;
      this.visiableInner = false;
      this.visiableCanNotSubmit = false;
    },
    //计划外取消
    outterCancel() {
      this.visiableOuter = false;
      this.visiableInner = false;
      this.visiableCanNotSubmit = false;
    },
    //计划内取消
    innerCancel() {
      this.visiableInner = false;
    },
    returnEdit() {
      if (this.isBillEditPage) {
        this.visiableOuter = false;
        this.visiableInner = false;
        this.visiableCanNotSubmit = false;
        //如果是编辑页面
      } else {
        this.$router.go(-1);
      }
    },
    lookQuotaDetail() {
      this.dialogVisible = true;
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss">
@import "./QuotaDialogConfirm.scss";
</style>

