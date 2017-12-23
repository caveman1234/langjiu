<template>
    <div class="Login">
        <div class="LoginContainer">
            <div class="title">用户登陆</div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px" size="small" style="width:100%;" class="loginForm">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm2')">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Login',
    data() {
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
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { validator: userNameV, message: '用户名不能为空' },
                ],
                password: [
                    { validator: pawsswordV, message: '密码不能为空' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$http({
                        method: 'post',
                        url: '/ocm-web/api/account/login',
                        data: _this.loginForm
                    }).then(res => {
                        if (res.headers["x-ocm-code"] == '1') {
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
    }
}
</script>
<style lang="scss" scoped>
@import "./Login.scss";
</style>

