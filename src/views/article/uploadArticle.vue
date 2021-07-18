<template>
    <div class="article-wrap">
        <el-form ref="articleForm" :model="articleForm" :rules="articleFormRules" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="articleForm.title" class="form-short-item"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <el-tag type="success" v-for="tag in articleForm.tags" :key="tag">{{tag}}</el-tag>
                <el-input v-model="articleForm.title" class="form-short-item">
                    <el-button slot="append" icon="el-icon-plus"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="articleForm.picture" :src="articleForm.picture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章描述">
                <el-input type="textarea" rows="8" v-model="articleForm.contentDesc" class="form-short-item"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input type="textarea" rows="8" v-model="articleForm.contentDesc" class="form-half-item"></el-input>
                <div class="form-half-item article-content-preview">111</div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "articleUpload",
    data() {
        return {
            tag: '',
            articleForm: {
                title: '',
                tags: [],
                content: '',
                contentDesc: '',
                picture: ''
            },
            articleFormRules: {
                title: [
                    {required: true, message: '文章标题是必须的', trigger: 'blur'},
                ],
                tags: [
                    // {required: true, message: '文章标题是必须的', trigger: 'blur'},
                ],
                content: [
                    {required: true, message: '文章内容是必须的', trigger: 'blur'},
                ],
                contentDesc: [
                    // {required: true, message: '文章标题是必须的', trigger: 'blur'},
                ],
                picture: [
                    // {required: true, message: '文章标题是必须的', trigger: 'blur'},
                ],
            }
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.articleForm.picture = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>

<style scoped>
.form-short-item {
    width: 340px;
}
.form-half-item {
    display: inline-block;
    width: 48%;
    vertical-align: top;
}
.form-half-item + .form-half-item {
    margin-left: 1%;
}
.article-content-preview {
    padding: 0 16px;
    border: 1px solid #ddd;
    min-height: 180px;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>