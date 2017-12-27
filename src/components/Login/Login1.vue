<template>
    <div class="Login1">
        <div class="wrap-box" id="loginBox">
            <div class="login-top-bg">
                <div class="login-top-con clearfix">
                    <a href="#" class="logo-img"></a>
                    <div class="logo-txt">郎酒经销商门户</div>
                </div>
            </div>
            <div class="login-con-box">
                <div :style='{backgroundImage:`url(${imgUrl})`}' class="login-bg">
                    <div class="logContainer">
                        <div class="loginTitle">欢迎登陆</div>
                        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="100px" size="small" style="width:100%;" class="loginForm">
                            <el-form-item label="用户名：" prop="username">
                                <el-input v-model="loginForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码：" prop="password">
                                <el-input type="password" v-model="loginForm.password"></el-input>
                            </el-form-item>
                            <el-form-item class="formBottom">
                                <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
                                <el-button @click="resetForm('ruleForm2')">清空</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <!-- <div class="login-index-footer">
        				<p class="font-class"><a href="javascript:;">简体</a><a href="javascript:;" class="two">繁体</a><a href="javascript:;">English</a></p>
        				<p class="publish-info">版权所有：用友网络科技股份有限公司 Yonyou 2015 &nbsp; &nbsp;  服务电话： 800-400-566</p>
        			</div> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login1',
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
            },
            imgUrl: require('../../assets/images/login-bg.jpg')
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
    }
}
</script>
<style lang="scss">
@import './Login1.scss';
</style>
