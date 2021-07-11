<template>
    <div class="registerPageWrap">
        <div class="registerFormWrap">
            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="registerForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="registerForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="registerForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="registerForm.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    <el-button @click="resetForm('registerForm')">重置</el-button>
                    <el-button @click="toLogin">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "registerPage",
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.registerForm.checkPass !== '') {
                        this.$refs.registerForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerForm: {
                    email: '',
                    pass: '',
                    checkPass: '',
                    nickname: '',
                    phone: ''
                },
                rules: {
                    email: [
                        { required: true, message: '请输入用户名称', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur' },
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$store.dispatch('user/register', this.registerForm)
                .then(res => {
                    if (res.code === 1) {
                        this.$router.push({name: 'login'})
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            resetForm(form) {
                this.$refs[form].resetFields()
            },
            toLogin() {
                this.$router.push({name: 'login'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .registerPageWrap {
        position: relative;
        width: 100%;
        min-height: 100vh;
        background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
        .registerFormWrap {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 370px;
            padding: 60px 20px 20px;
            background-color: #fff;
            transform: translate(-50%, -60%);
            border-radius: 10px;
            box-sizing: border-box;
        }
    }
</style>