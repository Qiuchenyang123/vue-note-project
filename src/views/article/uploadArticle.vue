<template>
    <div class="article-wrap">
        <el-form ref="articleForm" :model="articleForm" :rules="articleFormRules" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="articleForm.title" class="form-short-item"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
                <el-input v-model="tag" class="form-short-item">
                    <el-button slot="append" icon="el-icon-plus" @click="handleAddTag"></el-button>
                </el-input>
                <div class="tag-wrap">
                    <el-tag class="tag-item" type="success" v-for="tag in articleForm.tags" :key="tag">{{ tag }}
                    </el-tag>
                </div>
            </el-form-item>
            <el-form-item label="图片">
                <div class="home-tab-body-img">
                    <el-upload
                        class="avatar-uploader"
                        action
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="changeUpload">
                        <img v-if="saleAfterForm.imageUrl" :src="saleAfterForm.imageUrl"
                             class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <myUploader v-if="false" @handleAvatarSuccess="handleAvatarSuccess" :picture="articleForm.picture"/>
            </el-form-item>
            <el-form-item label="文章描述">
                <el-input type="textarea" rows="8" v-model="articleForm.contentDesc" class="form-short-item"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <el-input :style="{height: `${editorHeight}px`}" type="textarea" rows="8" v-model="articleForm.content"
                          class="form-half-item"></el-input>
                <div ref="editorPreview" class="form-half-item article-content-preview" v-html="compiledMarkdown"></div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleAddArticle">保存</el-button>
                <el-button type="default" @click="toArticleList">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="60%">
            <div class="dialog-content">
                <div class="cropper-wrap">
<!--                    <vue-cropper
                        ref="cropper"
                        :img="option.img"
                        :output-size="option.size"
                        :output-type="option.outputType"
                        :info="true"
                        :full="option.full"
                        :fixed="option.fixed"
                        :can-move="option.canMove"
                        :can-move-box="option.canMoveBox"
                        :fixed-box="option.fixedBox"
                        :original="option.original"
                        :auto-crop="option.autoCrop"
                        :auto-crop-width="option.autoCropWidth"
                        :auto-crop-height="option.autoCropHeight"
                        @real-time="realTime"
                        :high="option.high"
                        @img-load="imgLoad"
                        mode="cover"
                        :max-img-size="option.max"
                        @crop-moving="cropMoving"
                    ></vue-cropper>-->
                    <vueCropper
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                        @realTime="realTime"
                        @imgLoad="imgLoad"
                    ></vueCropper>
                    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                        <div :style="previews.div" class="preview">
                            <img :src="previews.url" :style="previews.img">
                        </div>
                    </div>
<!--
:center-box="option.centerBox"
     :fixed-number="option.fixedNumber"
-->
                </div>
                <div class="operate-wrap">
<!--                    <div class="lf">
                        <el-button type="primary" plain @click="turnLeft">左旋转</el-button>
                        <el-button type="primary" plain @click="turnRight">右旋转</el-button>
                        <el-button type="primary" plain @click="changeScale(1)">放大</el-button>
                        <el-button type="primary" plain @click="changeScale(-1)">缩小</el-button>
                        <el-button type="primary" @click="onCubeImg">上传</el-button>
                    </div>
                    <div class="rt">
                        <el-button type="primary" @click="cancleCropper">取消</el-button>
                    </div>-->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import myUploader from "../../components/myUploader";
import { VueCropper }  from 'vue-cropper'

export default {
    name: "articleUpload",
    data() {
        return {
            editorHeight: 182,
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
            },
            dialogVisible: false,
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 1, // 剪切后的图片质量（0.1-1）
                full: true, // 输出原图比例截图 props名full
                outputType: 'png', // 裁剪生成额图片的格式
                canMove: true,  // 能否拖动图片
                original: false,  // 上传图片是否显示原始宽高
                canMoveBox: true,  // 能否拖动截图框
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 740, // 默认生成截图框宽度
                autoCropHeight: 400, // 默认生成截图框高度
                fixedBox: true // 截图框固定大小
            },
            saleAfterForm: {
                imageUrl: ''
            },
            previews: {
                w: '',
                h: '',
                div: '',
                url: '',
                img: '',
            }
        }
    },
    computed: {
        compiledMarkdown() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const self = this;
            this.marked.setOptions({
                renderer: new self.marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            })
            return this.marked(this.articleForm.content, {sanitize: true});
        }
    },
    methods: {
        handleAvatarSuccess(data) {
            console.log(62, data);
            this.articleForm.picture = data;
        },
        handleAddTag() {
            this.articleForm.tags.push(this.tag)
            this.tag = ''
        },
        toArticleList() {
            this.$router.push({name: 'articleList'})
        },
        handleAddArticle() {
            this.$router.push({name: 'articleList'})
        },
        /*beforeAvatarUploadPS(file) {
            this.option.img = URL.createObjectURL(file);
            this.dialogVisible = true;
            // const dialog = new Promise((resolve,reject)=>{

            // });

            // return dialog
        },
        turnLeft() {
            this.$refs.cropper.rotateLeft();
        },
        turnRight() {
            this.$refs.cropper.rotateRight();
        },
        cancleCropper() {//取消截图
            this.isShowCropper = false;
        },
        changeScale(num) {
            num = num || 1;
            this.$refs.cropper.changeScale(num);
        },
        imgLoad(msg) {
            console.log('imgLoad')
            console.log(msg)
        },
        // 实时预览函数
        realTime(data) {
            console.log('realTime')
            this.previews = data
        },
        onCubeImg() {
            //剪切上传
            // 获取cropper的截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                // this.fileinfo.url = data;

                //先将显示图片地址清空，防止重复显示
                this.option.img = "";
                //将剪裁后base64的图片转化为file格式
                let file = this.convertBase64UrlToBlob(data);
                // this.fileImg=URL.createObjectURL(file);
                var formData = new FormData();
                formData.append("file", file);
                formData.append("isFile", '1');
                /!*projectResource.uploadImg(this.prjID, formData).then(res => {
                    if (res.result == "0") {
                        this.$message({
                            type: "success",
                            message: "上传成功"
                        });
                        this.fileTypeSearch();
                        this.isShowCropper = false;
                        // this.fileList=[{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                    }
                });*!/
            });
        },
        // 将base64的图片转换为file文件
        convertBase64UrlToBlob(urlData) {
            let bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte
            //处理异常,将ascii码小于0的转换为大于0
            let ab = new ArrayBuffer(bytes.length);
            let ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {type: "image/jpeg"});
        },*/
        //上传图片
        changeUpload(file, fileList) {
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(file.raw.name)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            const isLt5M = file.size / 1024 / 1024 < 5
            if (!isLt5M) {
                this.$message.error('上传文件大小不能超过 5MB!')
                return false
            }
            //URL.createObjectURL的参数只能是blob或者file类型
            //第一种方法用FileReader，URL.createObjectURL接收blob类型
            let reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.option.img = data
            }
            // 转化为base64
            this.dialogVisible = true
            reader.readAsArrayBuffer(file.raw)

            //第二种方法，URL.createObjectURL接收file类型
            this.$nextTick(() => {
                this.option.img = URL.createObjectURL(file.raw)
                this.dialogVisible = true
            })
        },

//点击剪裁弹框的确定按钮
        cropperFinish() {
            // 获取截图的base64 数据
            this.$refs.cropper.getCropBlob((data) => {
                let form = new FormData()
                let file = this.blobToFile(data, 'filename.jpg')
                form.append('img_file', file)
                /*this.$axios({
                    method: 'POST',
                    url: '/api/api_gateway?method=base.bases.base_photo',
                    data: form
                }).then((res) => {})*/
                this.saleAfterForm.imageUrl = data
                this.dialogVisible = false
            })
        },
        //转成blob
        blobToFile(Blob, fileName) {  //兼容IE
            Blob.lastModifiedDate = new Date()
            Blob.name = fileName
            return Blob
        },
        imgLoad(msg) {
            console.log('imgLoad')
            console.log(msg)
        },

        realTime(data) {
            console.log(data)
        },
        cropMoving(data) {
            console.log(99899)
            console.log(data, '截图框当前坐标')
        },
    },
    updated() {
        console.log(82, this.$refs.editorPreview.offsetHeight);
        this.editorHeight = this.$refs.editorPreview.offsetHeight
    },
    components: {
        myUploader,
        VueCropper
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

.form-half-item /deep/ .el-textarea__inner {
    height: 100%;
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

.tag-wrap {
    position: absolute;
    left: 350px;
    top: 0;

}

.tag-item {
    margin-left: 10px;
}
</style>