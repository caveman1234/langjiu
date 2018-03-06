<template>
    <div class="AccountMgr">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>我的信息：</span>
            </div>
            <el-row class="rowItem">
                <el-col :span="2">经销商名称：</el-col>
                <el-col :span="10">{{customerName || '暂无'}}</el-col>
                <el-col :span="2">开户银行：</el-col>
                <el-col :span="10">{{bank || '暂无'}}</el-col>
            </el-row>
            <el-row class="rowItem">
                <el-col :span="2">账户名称：</el-col>
                <el-col :span="10">{{accountName || '暂无'}}</el-col>
                <el-col :span="2">银行账号：</el-col>
                <el-col :span="10">{{bankAccount || '暂无'}}</el-col>
            </el-row>
            <el-row class="rowItem">
                <el-col :span="2">联系电话：</el-col>
                <el-col :span="10">{{telephone || '暂无'}}</el-col>
                <el-col :span="2">收货地址：</el-col>
                <el-col :span="10">
                    <div v-for="(item,index) in receiveAddresslist" :key="index" style="margin-top:5px;">
                        {{index+1}}: {{item || '暂无'}}
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>签约账户：</span>
            </div>
            <el-table :data="tableData">
                <el-table-column prop="bindAccountName" label="绑定开户名"></el-table-column>
                <el-table-column prop="bindBankCard" label="绑定银行卡"></el-table-column>
                <el-table-column prop="personalAccountBank" label="专属账号开户行"></el-table-column>
                <el-table-column prop="personalAccountName" label="专属账号名称"></el-table-column>
                <el-table-column prop="personalAccountCode" label="专属账号编码"></el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>账户管理：</span>
            </div>
            <div>
                <el-button @click="goMgr" size="small" type="primary">民生银行账户管理</el-button>
                <el-button size="small" type="primary">农业银行账户管理</el-button>
            </div>
        </el-card>
        <el-card>
            <div slot="header" class="clearfix">
                <span>在线充值：</span>
            </div>
            <div>
                <el-button @click="recharge" size="small" type="primary">去充值</el-button>
            </div>
        </el-card>
        <BankList @receiveSelectedBank="receiveSelectedBank" :dialogVisible.sync="dialogVisible"></BankList>


    </div>
</template>
<script>
import BankList from '@/components/commonComp/BankList/BankList';
export default {
    name: 'AccountMgr',
    components:{BankList},
    data() {
        return {
            bankImg: require('../../../../assets/bank.png'),
            langImg: require('../../../../assets/lang.jpeg'),
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
            tableData: [],
            dialogVisible:false
        }
    },
    methods: {
        goMgr() {
            let isSign = this.$store.state.isSign;
            if (!isSign) {
                this.$store.commit('CheckCustomerInfoIsVisiable', true);
            } else {
                this.goAssign();
            }
        },
        goAssign() {
            //去管理
            let _this = this;
            let params = {
                clientId: this.$store.state.customerId
            };
            debugger
            _this.$http.post('/ocm-web/api/cmbc/queryCustomerInfo', params)
                .then(res => {
                    if (res.headers['x-ocm-code'] == '1') {
                        let bankForm = document.querySelector('#bankForm');
                        let bankFormSubmit = document.querySelector('#bankFormSubmit');
                        let params = res.data.reduce((acc, v) => {
                            acc[v.name] = v.value;
                            return acc;
                        }, {});
                        Object.keys(params).forEach(key => {
                            if (key != 'forwardUrl') {
                                let input = document.createElement('input');
                                input.setAttribute('name', key);
                                input.value = params[key];
                                bankForm.appendChild(input);
                            }
                        });
                        //url  地址
                        let forwardUrl = params.forwardUrl;
                        bankForm.setAttribute('action', forwardUrl);
                        document.forms.bankForm.submit();
                        // bankFormSubmit.click();
                    }

                });
        },
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
        },
        //在线充值
        recharge(){
            this.dialogVisible = true;
        },
        //选中的银行
        receiveSelectedBank(selectedBank){}
    },
    mounted() {
        // this.$store.commit('changeCurrentNav', { hash: '/AccountMgr' });
        let _this = this;
        _this.fetchData();
    }
}
</script>
<style lang="scss">
@import "./AccountMgr.scss";
</style>

