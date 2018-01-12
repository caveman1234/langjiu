<template>
    <div>
        <el-dialog title="签约前完善信息"
            :visible.sync="$store.state.CheckCustomerInfoIsVisiable"
            @close="handleClose"
            @open="handleOpen"
            width="500px">

            <el-form :model="formData"
                ref="formData1"
                :rules="rules"
                size="mini"
                label-width="150px">
                <el-form-item label="备案证件类型:"
                    prop="credentialsType">
                    <div>{{formData.credentialsType}}</div>
                </el-form-item>
                <el-form-item label="证件号码:"
                    prop="credentialNo">
                    <div>{{formData.credentialNo}}</div>
                </el-form-item>
                <el-form-item label="财务联系人姓名:"
                    prop="contactName">
                    <el-input v-model="formData.contactName"></el-input>
                </el-form-item>
                <el-form-item label="财务联系人身份证号:"
                    prop="contactIdCard">
                    <el-input v-model="formData.contactIdCard"></el-input>
                </el-form-item>
                <el-form-item label="财务联系人电话:"
                    prop="contactPhone">
                    <el-input v-model="formData.contactPhone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer"
                class="dialog-footer">
                <el-button @click="cancle"
                    size="mini">取 消</el-button>
                <el-button type="primary"
                    @click="confirm"
                    size="mini">确 定</el-button>
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
            if (value.trim() == '') {
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
                customerId: this.$store.state.customerId
            },
            rules: {
                contactIdCard: [
                    { validator: checkIdCard, trigger: 'blur' }
                ],
                contactPhone: [
                    { validator: checkPhone, trigger: 'blur' }
                ],
                contactName: [
                    { validator: checkName, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleClose() {
            //debugger
            this.$refs.formData1.resetFields();
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
                    _this.submitCustomerInfo();
                }
            });
        },
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
                    debugger
                    _this.formData.credentialsType = res.data.credentialsType;
                    _this.formData.credentialNo = res.data.credentialNo;
                    _this.formData.contactName = res.data.contactName;
                    _this.formData.contactIdCard = res.data.contactIdCard;
                    _this.formData.contactPhone = res.data.contactPhone;
                });
        },
        //提交信息
        submitCustomerInfo() {
            let _this = this;
            let params = _this.formData;
            let url = '/ocm-web/api/base/customer/updateContactInfo';
            return _this.$http.post(url, params)
                .then(res => {
                    if (res.headers['x-ocm-code'] == '1') {
                        //提交成功后签约
                        _this.goMgr();
                    }
                });
        }
    },
    mounted() {
        let _this = this;
        
    }
}
</script>
<style lang="scss">
@import './CheckCustomerInfo.scss';
</style>
