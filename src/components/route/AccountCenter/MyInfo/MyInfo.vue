<template>
    <div class="MyInfo">
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>经销商名称：</span>
                    </div>
                    <div>{{customerName}}</div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>开户银行：</span>
                    </div>
                    <div>{{bank}}</div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>账户名称：</span>
                    </div>
                    <div>{{accountName}}</div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>银行账号：</span>
                    </div>
                    <div>{{bankAccount}}</div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>联系电话：</span>
                    </div>
                    <div>{{telephone}}</div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{padding:'10px'}">
                    <div slot="header">
                        <span>收货地址：</span>
                    </div>
                    <div>{{receiveAddress}}</div>
                </el-card>
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
            receiveAddress: ''//收货地址
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