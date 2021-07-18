<template>
    <div class="article-wrap">
        <el-card class="box-card">
            <div class="search-unit">
                <el-input class="search-item" v-model="searchKey" >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="primary" @click="handleAddArticle" class="add-article-btn">添加文章</el-button>
            </div>
            <div class="article-list-wrap">
                <el-card v-for="article in articleList" :key="article.id">
                    <div class="article-item">
                        <div class="article-title">
                            <span class="txt">{{article.title}}</span>
                            <div class="tag-wrap">
                                <el-tag v-for="tag in article.tags" :key="tag" type="success">{{tag}}</el-tag>
                            </div>
                        </div>
                        <img v-if="article.picture" :src="article.picture" width="340" height="400" alt="" class="article-img">
                        <div class="desc-content" v-text="article.contentDesc"></div>
                    </div>
                </el-card>

            </div>
        </el-card>
    </div>
</template>

<script>
import jpg1 from '@/assets/1.jpg'
export default {
    name: "articleList",
    data() {
        return {
            searchKey: '',
            articleList: [
                {
                    id: 0,
                    title: '文章名',
                    picture: jpg1,//'/src/assets/1.jpg', // jpg1,
                    contentDesc: '您正在浏览基于 Vue 2.x 的 Element UI 文档; 点击这里 查看Vue 3.x 的升级版本 指南 组件 主题 资源 中文 网站快速成型工具 Element,一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端...',
                    tags: ['js', 'css', 'cosplay']
                }
            ]
        }
    },
    methods: {
        handleAddArticle() {
            this.$router.push({name: 'uploadArticle'})
        }
    }
}
</script>

<style scoped>
.add-article-btn {
    margin-left: 10px;
}
</style>