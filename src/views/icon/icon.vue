<template>
    <div class="iconWrap">
        <el-card class="box-card">
            <i class="el-icon-edit icon-item"></i>
            <i class="el-icon-share icon-item"></i>
            <i class="el-icon-delete icon-item"></i>
            <el-button type="primary" icon="el-icon-search" class="icon-item">搜索</el-button>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "icon"
}
</script>

<style scoped lang="scss">
.iconWrap {
    .icon-item {
        margin: 10px 20px;
    }
}
</style>