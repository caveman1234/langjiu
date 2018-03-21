<template>
    <div class="Login1">
        <div class="wrap-box">
            <div class="login-top-bg">
                <div class="login-top-con clearfix">
                    <a href="#" class="logo-img" :style="{backgroundImage:`url(${logoImg})`}"></a>
                    <div class="logo-txt">郎酒CRM数字营销系统</div>
                </div>
            </div>
            <div class="login-con-box">
                <div :style='{backgroundImage:`url(${imgUrl})`}' class="login-bg">
                    <div class="logContainer">
                        <div class="loginTitle">欢迎登陆</div>
                        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm2" label-width="120px" size="small" style="width:100%;" class="loginForm">
                            <el-form-item label="用户名：" prop="username">
                                <el-input v-model="loginForm.username">
                                    <i class="icon iconfont lj-account" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码：" prop="password">
                                <el-input @keyup.native.enter="submitForm('ruleForm2')" type="password" v-model="loginForm.password">
                                    <i class="icon iconfont lj-password" slot="prefix"></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox @change="remenberPwdChange" v-model="remenberPwd">记住密码</el-checkbox>
                                <span @click="findPassword" class="findPassword">找回密码</span>
                            </el-form-item>
                            <el-form-item class="formBottom">
                                <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
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
    name: "Login",
    data() {
        let userNameV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else {
                callback();
            }
        };
        let pawsswordV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("密码不能为空"));
            } else {
                callback();
            }
        };
        return {
            remenberPwd: false,
            loginForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [{ validator: userNameV, message: "用户名不能为空" }],
                password: [{ validator: pawsswordV, message: "密码不能为空" }]
            },
            imgUrl: require("../../assets/images/login-bg.jpg"),
            logoImg: require("../../assets/images/logo-img.png"),
            phoneNum: "" //经销商电话号码
        };
    },
    methods: {
        submitForm(formName) {
            let _this = this;
            _this.$refs[formName].validate(valid => {
                if (valid) {
                    _this
                        .$http({
                            method: "post",
                            url: "/ocm-web/api/account/login",
                            data: _this.loginForm
                        })
                        .then(res => {
                            //首次登陆，没改密码

                            if (res.headers["x-ocm-code"] == "1") {
                                _this.$store.commit("userloginName", res.data.userloginName);
                                _this.$store.commit("setCustomerId", res.data.customerId);
                                _this.$store.commit("changeUsername", res.data.username);
                                _this.$router.push({ name: "Home" });
                                _this.$Notification.success({
                                    title: decodeURIComponent(res.headers["x-ocm-message"]),
                                    offset: 90,
                                    duration: 3000
                                });
                                if (res.data.isPwdModify == 0) {
                                    _this.$router.push({ name: "ChangePassword" });
                                }
                                //记住密码
                                _this.setLocalStorage();
                            }
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        //记住密码
        setLocalStorage() {
            window.localStorage.setItem("username", this.loginForm.username);
            window.localStorage.setItem("password", this.loginForm.password);
        },
        remenberPwdChange(v) {
            if (v) {
                localStorage.setItem("remenberPwd", "1");
                this.setLocalStorage();
            } else {
                window.localStorage.setItem("remenberPwd", "0");
            }
        },
        //获取验证码
        fetchSecurityCode() {
            let _this = this;
            let paramsWrap = {
                params: {
                    username: _this.loginForm.username
                }
            };
            let url = "";
            return _this.$http.get(url, paramsWrap).then(res => res);
        },
        //找回密码
        findPassword() {
            let _this = this;
            _this.$refs["ruleForm2"].validateField("username", function (e) {
                if (e) {
                    //检查不通过
                    _this.$Notify({ title: e, type: "warning" });
                } else {
                    //检查通过
                    let url = "/ocm-web/api/account/getPhoneNum";
                    let params = {
                        username: _this.loginForm.username
                    };
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: JSON.stringify(params),
                        contentType: "application/json",
                        success(res) {
                            let phoneNum = res;
                            let reg = /^\d{11}$/;
                            if (reg.test(phoneNum)) {
                                _this.phoneNum = phoneNum;
                                let username = _this.loginForm.username;
                                _this.$router.push({
                                    name: "FindPassword",
                                    params: { username: username, phoneNum: _this.phoneNum }
                                });
                            } else {
                                _this.$Notify({ title: `手机号码号码：${_this.phoneNum}不正确,请联系客服修改`, type: "warning" });
                            }
                        }
                    });
                }
            });
        }
    },
    mounted() {
        if (localStorage.getItem("remenberPwd") == "1") {
            this.loginForm.password = localStorage.getItem("password");
            this.remenberPwd = true;
        }
        this.loginForm.username = localStorage.getItem("username");
    }
};
</script>
<style lang="scss">
@import "./Login.scss";
</style>
