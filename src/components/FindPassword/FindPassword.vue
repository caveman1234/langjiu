<template>
    <div class="FindPassword">
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
                        <div class="loginTitle">找回密码</div>
                        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="120px" size="small" style="width:100%;" class="loginForm">
                            <el-form-item prop="username" label="用户名：">
                                <el-input v-model="loginForm.username" disabled>
                                    <i class="icon iconfont lj-account" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="phoneNum" label="电话号码：">
                                <el-input v-model="loginForm.phoneNum" disabled>
                                    <i class="el-icon-phone" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="securityCode" label="验证码：">
                                <el-input v-model="loginForm.securityCode">
                                    <i class="icon iconfont lj-password securityCode" slot="prefix"></i>
                                    <template slot="append">
                                        <div v-if="securityCodeIng" >{{securitySeconds}}s</div>
                                        <div v-else @click="fetchSecurityCode" style="cursor:pointer;">获取验证码</div>
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="新密码：" prop="password">
                                <el-input :disabled="!securityCodeIng"  type="password" v-model="loginForm.password">
                                    <i class="icon iconfont lj-password" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码：" prop="rePassword">
                                <el-input :disabled="!securityCodeIng"  type="password" v-model="loginForm.rePassword">
                                    <i class="icon iconfont lj-password" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="formBottom">
                                <el-button :disabled="!securityCodeIng" type="primary" @click="changePwd('ruleForm2')">确认</el-button>
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
//配置验证码失效时间（秒）
let securitySecondsConfig = 300;
export default {
    name: 'FindPassword',
    data() {
        let _this = this;
        let userNameV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            } else {
                callback();
            }
        }
        let phoneNumV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('电话号码不能为空'));
            } else {
                callback();
            }
        }
        let securityCodeV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('验证码不能为空'));
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
                rePassword: '',
                phoneNum: '',//电话号码
                securityCode: '',//验证码
                code: '',//验证码
                hash: '',
                tamp: ''
            },
            rules: {
                phoneNum: [
                    { validator: phoneNumV },
                ],
                username: [
                    { validator: userNameV },
                ],
                securityCode: [
                    { validator: securityCodeV },
                ],
                password: [
                    { validator: pawsswordV }
                ],
                rePassword: [
                    { validator: rePawsswordV }
                ]
            },
            imgUrl: require('../../assets/images/login-bg.jpg'),
            securityCodeIng: false,//正在输入验证码
            securitySeconds: securitySecondsConfig,//验证秒数
            timer: null
        }
    },
    methods: {
        changePwd(formName = 'ruleForm2') {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    //校验验证码
                    let _this = this;
                    let url = "/ocm-web/api/account/validateNum";
                    let params = {
                        code: _this.loginForm.securityCode,
                        hash: _this.loginForm.hash,
                        tamp: _this.loginForm.tamp,
                    };
                    _this.$http.post(url, params)
                        .then(res => {

                            debugger
                            let result = res.headers["x-ocm-code"];
                            res = res.data;
                            switch (result) {
                                case '0':
                                    // _this.$Notify({ title: "验证不通过", type: "warning" });
                                    break;
                                case '2':
                                    // _this.$Notify({ title: "验证超时", type: "warning" });
                                    break;
                                case '1':
                                    //重置密码
                                    let url = "/ocm-web/api/account/resetPassword";
                                    let params = {
                                        username: _this.loginForm.username,
                                        password: _this.loginForm.password
                                    };
                                    let formData = new FormData();
                                    formData.append('username', _this.loginForm.username);
                                    formData.append('password', _this.loginForm.password);
                                    let headersWrap = {
                                        headers: {
                                            'Content-Type': 'multipart/form-data'
                                        }
                                    };
                                    debugger
                                    _this.$http.post(url, formData, headersWrap)
                                        .then(res=>{
                                            if (res.headers["x-ocm-code"] == 1) {
                                                _this.$Notify({ title: "修改密码成功,请重新登陆", type: "success" });
                                                clearInterval(_this.timer);
                                                _this.$router.push({ name: 'Login' });
                                            }
                                        })
                                    break;
                            }
                        })
                    // $.ajax({
                    //     type: "POST",
                    //     url: url,
                    //     data: JSON.stringify(params),
                    //     contentType: 'application/json',
                    //     success(res, status, xhr) {
                    //         debugger
                    //         let result = xhr.getResponseHeader('x-ocm-code');
                    //         switch (result) {
                    //             case '0':
                    //                 // _this.$Notify({ title: "验证不通过", type: "warning" });
                    //                 break;
                    //             case '2':
                    //                 // _this.$Notify({ title: "验证超时", type: "warning" });
                    //                 break;
                    //             case '1':
                    //                 //重置密码
                    //                 let url = "/ocm-web/api/account/resetPassword";
                    //                 let params = {
                    //                     username: _this.loginForm.username,
                    //                     password: _this.loginForm.password
                    //                 };
                    //                 let formData = new FormData();
                    //                 formData.append('username', _this.loginForm.username);
                    //                 formData.append('password', _this.loginForm.password);
                    //                 $.ajax({
                    //                     type: "POST",
                    //                     url: url,
                    //                     data: formData,
                    //                     processData: false,
                    //                     contentType: false,

                    //                     success(res, status, xhr) {
                    //                         debugger
                    //                         if (xhr.getResponseHeader('x-ocm-code') == 1) {
                    //                             _this.$Notify({ title: "修改密码成功,请重新登陆", type: "success" });
                    //                             clearInterval(_this.timer);
                    //                             _this.$router.push({ name: 'Login' });
                    //                         }

                    //                     }
                    //                 })
                    //                 break;
                    //         }
                    //     }
                    // })
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
                                title: decodeURIComponent(res.headers["x-ocm-message"]),
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
            // this.$refs[formName].resetFields();
            this.loginForm.password = '';
            this.loginForm.rePassword = '';
            this.loginForm.securityCode = '';
        },
        //获取验证码
        fetchSecurityCode() {
            let _this = this;
            let url = "/ocm-web/api/account/sendVerificationCode";
            let formData = new FormData();
            formData.append('phoneNum', _this.loginForm.phoneNum);
            let headersWrap = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            debugger
            _this.$http.post(url, formData, headersWrap)
                .then(res => {
                    res = res.data;
                    if (res.result == 1) {
                        debugger
                        _this.loginForm.code = res.code;
                        _this.loginForm.hash = res.hash;
                        _this.loginForm.tamp = res.tamp;
                        _this.securityCodeIng = true;//正在输入验证码状态
                        _this.timer = setInterval(() => {
                            if (_this.securitySeconds == 1) {
                                clearInterval(_this.timer);
                                _this.securityCodeIng = false;
                                _this.securitySeconds = securitySecondsConfig;
                                _this.$refs['ruleForm2'].resetFields();
                            } else {
                                _this.securitySeconds--;
                            }
                        }, 1000);
                    } else {
                        _this.$Notify({ title: `发送验证码失败`, type: "warning" });
                    }
                })
            // $.ajax({
            //     type: "POST",
            //     url: url,
            //     data: formData,
            //     processData: false,
            //     contentType: false,
            //     success(res) {
            //         if (res.result == 1) {
            //             debugger
            //             _this.loginForm.code = res.code;
            //             _this.loginForm.hash = res.hash;
            //             _this.loginForm.tamp = res.tamp;
            //             _this.securityCodeIng = true;//正在输入验证码状态
            //             _this.timer = setInterval(() => {
            //                 if (_this.securitySeconds == 1) {
            //                     clearInterval(_this.timer);
            //                     _this.securityCodeIng = false;
            //                     _this.securitySeconds = securitySecondsConfig;
            //                     _this.$refs['ruleForm2'].resetFields();
            //                 } else {
            //                     _this.securitySeconds--;
            //                 }
            //             }, 1000);
            //         } else {
            //             _this.$Notify({ title: `发送验证码失败`, type: "warning" });
            //         }
            //     }
            // });
            //==============================
            // 


            //==============================
        },
    },
    mounted() {
        let username = this.$route.params.username;
        let phoneNum = this.$route.params.phoneNum;
        this.loginForm.username = username;
        this.loginForm.phoneNum = phoneNum;
    }
}
</script>
<style lang="scss">
@import "./FindPassword.scss";
</style>
