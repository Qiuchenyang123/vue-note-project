<template>
    <div class="base-img-cmp-wrap">
        <img class="base-img" :src="baseImageUrl" alt="" v-show="activeIndex === -1">
        <img v-for="(url, index) in activeImgUrlArr" v-show="activeIndex === index" class="base-img" :src="url" alt="" :key="url">
        <div v-for="(url, index) in activeImgUrlArr" :class="`box box${index}`" :key="`div${url}`" @click="handleClick(index)"></div>
<!--        <div class="box-wrap">
        </div>-->
    </div>
</template>

<script>
export default {
    name: "baseImageCmp",
    props: {
        baseImageUrl: {
            type: String,
            required: true
        },
        activeImgUrlArr: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeIndex: -1
        }
    },
    methods: {
        handleClick(index) {
            this.activeIndex = index
        }
    }
}
</script>

<style scoped>
.base-img-cmp-wrap {
    position: relative;
    width: 549px;
    height: 384px;
    margin: 10px 10px 10px 20px;
}
.base-img-cmp-wrap .box {
    position: absolute;
    width: 62px;
    height: 62px;
    background-color: rgba(255, 255, 255, 0.3);
}
.base-img-cmp-wrap .box0 {
    left: 56px;
    top: 70px;
}
.base-img-cmp-wrap .box1 {
    left: 146px;
    top: 95px;
}
.base-img-cmp-wrap .box2 {
    left: 246px;
    top: 112px;
    height: 70px;
}
.base-img-cmp-wrap .box3 {
    left: 346px;
    top: 132px;
    width: 50px;
    height: 70px;
}
.base-img-cmp-wrap .box4 {
    left: 466px;
    top: 146px;
    width: 50px;
    height: 70px;
}
.base-img-cmp-wrap .base-img {
    width: 549px;
    height: 384px;
}
</style>