<template>
    <div class="ChangePassword">
        <div class="wrap-box">
            <div class="login-top-bg">
                <div class="login-top-con clearfix">
                    <a href="#" class="logo-img"></a>
                    <div class="logo-txt">郎酒CRM数字营销系统</div>
                </div>
            </div>
            <div class="login-con-box">
                <div :style='{backgroundImage:`url(${imgUrl})`}' class="login-bg">
                    <div class="logContainer">
                        <div class="loginTitle">修改密码</div>
                        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="120px" size="small" style="width:100%;" class="loginForm">
                            <el-form-item label="用户名：">
                                <el-input v-model="loginForm.username" disabled>
                                    <i class="icon iconfont lj-account" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="password">
                                <el-input type="password" v-model="loginForm.password">
                                    <i class="icon iconfont lj-password" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码：" prop="rePassword">
                                <el-input type="password" v-model="loginForm.rePassword">
                                    <i class="icon iconfont lj-password" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="formBottom">
                                <el-button type="primary" @click="changePwd('ruleForm2')">确认修改</el-button>
                                <el-button @click="resetForm('ruleForm2')">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChangePassword',
    data() {
        let _this = this;
        let userNameV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } else {
                callback();
            }
        }
        let pawsswordV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            } else {
                callback();
            }
        }
        let rePawsswordV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
            let pass = _this.loginForm.password == value;
            if (!pass) {
                return callback(new Error('两次密码不一样'));
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                username: '',
                password: '',
                rePassword: ''
            },
            rules: {
                username: [
                    { validator: userNameV },
                ],
                password: [
                    { validator: pawsswordV }
                ],
                rePassword: [
                    { validator: rePawsswordV }
                ]
            },
            imgUrl: require('../../assets/images/login-bg.jpg')
        }
    },
    methods: {
        changePwd(formName = 'ruleForm2') {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        username: _this.loginForm.username,
                        newPassword: _this.loginForm.password,
                        customerId: _this.$store.state.customerId
                    };
                    _this.$http({
                        method: 'post',
                        url: '/ocm-web/api/account/modify-password',
                        data: params
                    }).then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.$router.push({ name: 'Home' });
                            _this.$Notification.success({
                                title: decodeURI(res.headers["x-ocm-message"]),
                                offset: 90,
                                duration: 3000
                            });
                        }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login(formName = 'ruleForm2') {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        username: _this.loginForm.username,
                        password: _this.loginForm.password
                    };
                    _this.$http({
                        method: 'post',
                        url: '/ocm-web/api/account/login',
                        data: params
                    }).then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
                            _this.$store.commit('userloginName', res.data.userloginName);
                            _this.$store.commit('setCustomerId', res.data.customerId);
                            _this.$router.push({ name: 'Home' });
                            _this.$Notification.success({
                                title: decodeURI(res.headers["x-ocm-message"]),
                                offset: 90,
                                duration: 3000
                            });
                        }

                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    mounted() {
        this.loginForm.username = this.$store.state.username;
    }
}
</script>
<style lang="scss">
@import './ChangePassword.scss';
</style>
