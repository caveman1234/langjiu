<template>
    <div class="MyInfo">
        <el-row :gutter="15">
            <el-col :span="12">
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>经销商名称：</span>
                    </div>
                    <div>
                        {{customerName || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>开户银行：</span>
                    </div>
                    <div>
                        {{bank || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>账户名称：</span>
                    </div>
                    <div>
                        {{accountName || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>银行账号：</span>
                    </div>
                    <div>
                        {{bankAccount || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>联系电话：</span>
                    </div>
                    <div>
                        {{telephone || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>收货地址：</span>
                    </div>
                    <div v-for="(item,index) in receiveAddresslist"
                        :key="index"
                        style="margin-top:5px;">
                        {{index+1}}: {{item || '暂无'}}
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>绑定开户名：</span>
                    </div>
                    <div>
                        {{bindAccountName || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>绑定银行卡：</span>
                    </div>
                    <div>
                        {{bindBankCard || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>专属账号开户行：</span>
                    </div>
                    <div>
                        {{personalAccountBank || '暂无'}}
                    </div>
                </el-card>

                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>专属账号名称：</span>
                    </div>
                    <div>
                        {{personalAccountName || '暂无'}}
                    </div>
                </el-card>
                <el-card class="box-card"
                    :body-style="{    padding:'10px'}">
                    <div slot="header">
                        <span>专属账号编码：</span>
                    </div>
                    <div>
                        {{personalAccountCode || '暂无'}}
                    </div>
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
            receiveAddresslist: '',//收货地址
            personalAccountName: '',//专属账号名称
            personalAccountCode: '',//编码
            personalAccountBank: '',//银行
            bindAccountName: '',//绑定开户名
            bindBankCard: '',//绑定银行卡
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
                    _this.receiveAddresslist = res.data.receiveAddresslist;
                    _this.personalAccountName = res.data.personalAccountName;
                    _this.personalAccountCode = res.data.personalAccountCode;
                    _this.personalAccountBank = res.data.personalAccountBank;
                    _this.bindAccountName = res.data.bindAccountName;
                    _this.bindBankCard = res.data.bindBankCard;
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