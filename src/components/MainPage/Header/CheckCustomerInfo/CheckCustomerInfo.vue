<template>
    <div class="CheckCustomerInfo">
        <el-dialog title="请确认以下信息，以便成功签约。"
            :visible.sync="$store.state.CheckCustomerInfoIsVisiable"
            @close="handleClose"
            @open="handleOpen"
            width="800px">

            <el-form :model="formData"
                ref="formData1"
                :rules="rules"
                size="mini"
                label-width="160px"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备案证件类型:"
                            prop="credentialsType">
                            <el-select :disabled="!canEditable"
                                v-model="formData.credentialsType"
                                placeholder="请选择"
                                style="width:100%;">
                                <el-option v-for="item in credentialsTypeSource"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>
                        <el-form-item label="证件号码:"
                            prop="credentialNo">

                            <div v-if="!canEditable">{{formData.credentialNo}}</div>
                            <el-input v-else
                                v-model="formData.credentialNo"></el-input>

                        </el-form-item>
                        <el-form-item label="开户银行:"
                            prop="bank">
                            <div v-if="!canEditable">{{formData.bank}}</div>
                            <el-input v-else
                                v-model="formData.bank"></el-input>

                        </el-form-item>
                        <el-form-item label="开户名:"
                            prop="accountName">
                            <div v-if="!canEditable">{{formData.accountName}}</div>
                            <el-input v-else
                                v-model="formData.accountName"></el-input>

                        </el-form-item>
                        
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="银行账号:"
                            prop="bankAccount">
                            <div v-if="!canEditable">{{formData.bankAccount }}</div>
                            <el-input v-else
                                v-model="formData.bankAccount"></el-input>

                        </el-form-item>
                        
                        <el-form-item label="经办人姓名:"
                            prop="contactName">

                            <div v-if="!canEditable">{{formData.contactName}}</div>
                            <el-input v-else
                                v-model="formData.contactName"></el-input>

                        </el-form-item>
                        <el-form-item label="经办人身份证号:"
                            prop="contactIdCard">
                            <div v-if="!canEditable">{{formData.contactIdCard}}</div>
                            <el-input v-else
                                v-model="formData.contactIdCard"></el-input>

                        </el-form-item>
                        <el-form-item label="经办人电话:"
                            prop="contactPhone">
                            <div v-if="!canEditable">{{formData.contactPhone}}</div>
                            <el-input v-else
                                v-model="formData.contactPhone"></el-input>

                        </el-form-item>
                        
                        
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer"
                class="dialog-footer">

                <el-button v-if="!canEditable"
                    size="mini"
                    @click="edit">修改</el-button>
                <el-button v-if="canEditable"
                    @click="save"
                    size="mini"
                    type="primary">保存</el-button>

                <el-button v-if="canSingn"
                    type="primary"
                    @click="confirm"
                    size="mini">签约</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default {
    name: 'CheckCustomerInfo',
    components: {},
    data() {
        let checkIdCard = (rule, value, callback) => {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (reg.test(value) === false) {
                callback(new Error('请输入正确身份证'));
            } else {
                callback();
            }
        };
        let checkPhone = (rule, value, callback) => {
            let reg = /^\d{11}$/;
            if (reg.test(value) === false) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        let checkName = (rule, value, callback) => {
            if (value == '' || value == null) {
                callback(new Error('姓名不能为空'));
            } else {
                callback();
            }
        };
        return {
            formData: {
                credentialsType: '',
                credentialNo: '',
                contactName: '',
                contactIdCard: '',
                contactPhone: '',
                bank: '',
                accountName: '',
                bankAccount: '',
                customerId: this.$store.state.customerId
            },
            rules: {
                contactIdCard: [
                    { validator: checkIdCard, required: true, trigger: 'blur' }
                ],
                contactPhone: [
                    { validator: checkPhone, required: true, trigger: 'blur' }
                ],
                contactName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                bankAccount: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                credentialsType: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                credentialNo: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                bank: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ],
                accountName: [
                    { required: true, message: '不能为空', trigger: 'blur' },
                ]
            },
            //能否编辑
            canEditable: false,
            //能否去签约
            canSingn: false,
            //证件类型
            credentialsTypeSource: [
                {
                    label: '1',
                    value: 1
                }
            ]
        }
    },
    methods: {
        handleClose() {
            //debugger
            this.$refs.formData1.resetFields();
            this.canEditable = false;
        },
        handleOpen() {
            //debugger
            let _this = this;
            _this.fetchCustomerInfo();
        },
        cancle() {
            this.$refs.formData1.resetFields();
            this.$store.commit('CheckCustomerInfoIsVisiable', false);
        },
        confirm() {
            let _this = this;
            _this.$refs.formData1.validate(valide => {
                if (valide) {
                    _this.goMgr();
                }
            });
        },
        //签约
        goMgr() {
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
        //获取用户信息
        fetchCustomerInfo() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            };
            let url = '/ocm-web/api/base/customer/getContactInfo';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.formData.credentialsType = res.data.credentialsType;
                    _this.formData.credentialNo = res.data.credentialNo;
                    _this.formData.contactName = res.data.contactName;
                    _this.formData.contactIdCard = res.data.contactIdCard;
                    _this.formData.contactPhone = res.data.contactPhone;
                    _this.formData.bank = res.data.bank;
                    _this.formData.accountName = res.data.accountName;
                    _this.formData.bankAccount = res.data.bankAccount;
                });
        },
        //提交信息/保存
        submitCustomerInfo() {
            let _this = this;
            let params = {
                ..._this.formData,
                customerId: this.$store.state.customerId
            };
            let url = '/ocm-web/api/base/customer/updateContactInfo';
            _this.$refs.formData1.validate(valide => {
                if (valide) {
                    _this.$http.post(url, params)
                        .then(res => {
                            if (res.headers['x-ocm-code'] == '1') {
                                _this.$Notify({ title: '保存数据成功', type: 'success' });
                            }
                        });
                }
            });

        },
        edit() {
            let _this = this;
            _this.canEditable = true;
            _this.canSingn = false;
        },
        save() {
            let _this = this;
            let params = _this.formData;
            let url = '/ocm-web/api/base/customer/updateContactInfo';
            _this.$refs.formData1.validate(valide => {
                if (valide) {
                    _this.$http.post(url, params)
                        .then(res => {
                            if (res.headers['x-ocm-code'] == '1') {
                                _this.$Notify({ title: '保存数据成功', type: 'success' });
                                _this.canEditable = false;
                                _this.canSingn = true;
                            }
                        });
                }
            });
        },
        //获取账户类型
        fetchAccountType() {
            let _this = this;
            let url = '/ocm-web/api/base/customer/getCredentialsType';
            _this.$http.get(url)
                .then(res => {
                    _this.credentialsTypeSource = res.data.map(v => {
                        return {
                            label: v.name,
                            value: v.id,
                            code: v.code
                        }
                    })
                });
        }
    },
    mounted() {
        let _this = this;
        _this.canSingn = true;
        //获取账户类型
        _this.fetchAccountType();
    }
}
</script>
<style lang="scss">
@import './CheckCustomerInfo.scss';
</style>
