<template>
    <div class="login-container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <el-form :model="userInfo" :rules="userInfoRules" ref="loginForm" @submit="handleLogin">
                    <el-form-item prop="username">
                        <el-input type="text" name="username" placeholder="username" v-model="userInfo.username" class="input-item"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" name="password" placeholder="password" v-model="userInfo.password" class="input-item"></el-input>
                    </el-form-item>
                    <el-link type="primary" class="forgetPassBtn" @click="handleForgetPass">忘记密码</el-link>
                    <button @click="handleLogin" class="btn" type="button">Login</button>
                </el-form>

            </div>
            <div class="msg">
                Don't have account?
                <a @click="toRegisterPage" href="javascript: void 0">Sign up</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                userInfo: {
                    username: '',
                    password: ''
                },
                userInfoRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            handleLogin(e) {
                console.log(47, arguments)
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const _this = this;
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        _this.$store.dispatch('user/login', _this.userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.code === 1) {
                                    _this.$router.push({name: 'home'})
                                } else {
                                    _this.$message.error(res.errMsg)
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            toRegisterPage() {
                this.$router.push({name: 'register'})
            },
            handleForgetPass() {
                this.$message.info('123')
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    html {
        height: 100%;
    }
    body {
        height: 100%;
    }
    .login-container {
        height: 100vh;
        background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
    }
    .login-wrapper {
        background-color: #fff;
        width: 358px;
        height: 588px;
        border-radius: 15px;
        padding: 0 50px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

    }
    .header {
        font-size: 38px;
        font-weight: bold;
        text-align: center;
        line-height: 200px;
    }
    .input-item {
        display: block;
        width: 100%;
        margin-bottom: 20px;
        border: 0;
        padding: 10px;
        border-bottom: 1px solid rgb(128, 125, 125);
        font-size: 15px;
        outline: none;
        box-sizing: border-box;
    }
    .input-item /deep/ .el-input__inner {
        border: 1px solid transparent;
    }
    .input-item::placeholder {
        text-transform: uppercase;
    }
    .btn {
        text-align: center;
        padding: 10px;
        width: 100%;
        margin-top: 40px;
        background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
        color: #fff;
        border: 1px solid transparent;
    }
    .msg {
        text-align: center;
        line-height: 88px;
    }
    a {
        text-decoration-line: none;
        color: #abc1ee;
    }
    .forgetPassBtn {
        float: right;
    }
</style>