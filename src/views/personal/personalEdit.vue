<template>
    <div class="registerPageWrap">
        <div class="registerFormWrap">
            <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px" class="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input class="registerFormItem" v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <myUploader @handleAvatarSuccess="handleAvatarSuccess" :picture="registerForm.avatar" ></myUploader>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input class="registerFormItem" v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input class="registerFormItem" type="password" v-model="registerForm.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input class="registerFormItem" type="password" v-model="registerForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item label="密码提示" prop="passTip">
                    <el-input class="registerFormItem" type="text" v-model="registerForm.passTip"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input class="registerFormItem" v-model="registerForm.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input class="registerFormItem" v-model="registerForm.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')">保存</el-button>
                    <el-button @click="toHome">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import myUploader from "@/components/myUploader";
export default {
    name: "personalEdit",
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
                username: '',
                avatar: '',
                email: '',
                pass: '',
                checkPass: '',
                passTip: '',
                nickname: '',
                phone: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' },
                ],
                avatar: [
                    { required: true, message: '请添加头像', trigger: 'submit' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
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
                passTip: [
                ],
                nickname: [
                    // { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
                phone: [
                    // { required: true, message: '请输入手机号', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        getUserInfo() {
            Object.keys(this.registerForm).forEach((key) => {
                this.registerForm[key] = this.$store.state.user[`${key}`]
            })
            this.registerForm.pass = ''
            this.registerForm.checkPass = ''
        },
        submitForm() {
            this.$store.dispatch('user/update', this.registerForm)
                .then(res => {
                    if (res.code === 1) {
                        this.$message('修改成功！')
                        setTimeout(() => {
                            this.$router.push({name: 'home'})
                        }, 3000)

                    } else {
                        this.$message.error(res.msg)
                    }
                })
        },
        resetForm(form) {
            this.$refs[form].resetFields()
        },
        toHome() {
            this.$router.push({name: 'home'})
        },
        handleAvatarSuccess(data) {
            this.registerForm.avatar = data;
        },
    },
    mounted() {
        this.getUserInfo()
    },
    components: {
        myUploader
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
        width: 470px;
        padding: 60px 20px 20px;
        background-color: #fff;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-sizing: border-box;
        .registerFormItem {
            width: 260px;
        }
    }
}
</style>