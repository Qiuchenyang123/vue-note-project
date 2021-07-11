<template>
    <div class="login-container">
        <div class="login-wrapper">
            <div class="header">Login</div>
            <div class="form-wrapper">
                <el-input type="text" name="email" placeholder="email" v-model="userInfo.email" class="input-item"></el-input>
                <el-input type="password" name="password" placeholder="password" v-model="userInfo.password" class="input-item"></el-input>
                <button @click="handleLogin" class="btn">Login</button>
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
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            handleLogin() {
                this.$store.dispatch('user/login', this.userInfo)
                .then(res => {
                    console.log(33, res);
                    if (res.code === 1) {
                        this.$router.push({name: 'home'})
                    }
                })
            },
            toRegisterPage() {
                this.$router.push({name: 'register'})
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
</style>