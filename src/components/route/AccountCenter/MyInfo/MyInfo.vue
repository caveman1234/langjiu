<template>
    <div class="MyInfo">
        <el-row :gutter="15">
            <el-col :span="12">
                <el-alert title="经销商名称："
                    type="info"
                    :closable="false"
                    :description="customerName || '暂无'">
                </el-alert>
                <el-alert title="开户银行："
                    type="info"
                    :closable="false"
                    :description="bank || '暂无'">
                </el-alert>
                <el-alert title="账户名称："
                    type="info"
                    :closable="false"
                    :description="accountName || '暂无'">
                </el-alert>
                <el-alert title="银行账号："
                    type="info"
                    :closable="false"
                    :description="bankAccount || '暂无'">
                </el-alert>
                <el-alert title="联系电话："
                    type="info"
                    :closable="false"
                    :description="telephone || '暂无'">
                </el-alert>
                <el-alert title="收货地址："
                    type="info"
                    :closable="false"
                    :description="receiveAddress || '暂无'">
                </el-alert>
            </el-col>
            <el-col :span="12">
                <el-alert title="专属账号名称："
                    type="info"
                    :closable="false"
                    :description="personalAccountName || '暂无'">
                </el-alert>
                <el-alert title="专属账号编码："
                    type="info"
                    :closable="false"
                    :description="personalAccountCode || '暂无'">
                </el-alert>
                <el-alert title="专属账号开户行："
                    type="info"
                    :closable="false"
                    :description="personalAccountBank || '暂无'">
                </el-alert>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    name: 'MyInfo',
    data() {
        return {
            customerName: '',//经销商名称
            bank: '',//银行名称
            accountName: '',//账户名称
            bankAccount: '',//银行账号
            telephone: '',//联系电话
            receiveAddress: '',//收货地址
            personalAccountName: '',//专属账号名称
            personalAccountCode: '',//编码
            personalAccountBank: '',//银行
        }
    },
    methods: {
        fetchData() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId
                }
            };
            let url = '/ocm-web/api/base/customer/getMyCustomerInfo'
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.customerName = res.data.customerName;
                    _this.bank = res.data.bank;
                    _this.accountName = res.data.accountName;
                    _this.bankAccount = res.data.bankAccount;
                    _this.telephone = res.data.telephone;
                    _this.receiveAddress = res.data.receiveAddress;
                    _this.personalAccountName = res.data.personalAccountName;
                    _this.personalAccountCode = res.data.personalAccountCode;
                    _this.personalAccountBank = res.data.personalAccountBank;
                });
        }
    },
    mounted() {
        let _this = this;
        _this.fetchData();
    }
}
</script>
<style lang="scss">
@import './MyInfo.scss';
</style>