<template>
    <div class="map-wrap">
        <leftXAxis></leftXAxis>
        <imageMap></imageMap>
        <baseImageCmp :baseImageUrl="baseImg" :activeImgUrlArr="activeImgArr"></baseImageCmp>
    </div>
</template>

<script>
import imageMap from "./components/imageMap";
import leftXAxis from "./components/leftXAxis";
import baseImageCmp from "./components/baseImageCmp";
import baseImg from '@/assets/image/baseImg.jpg'
import activeImg0 from '@/assets/image/activeImg0.jpg'
import activeImg1 from '@/assets/image/activeImg1.jpg'
import activeImg2 from '@/assets/image/activeImg2.jpg'
import activeImg3 from '@/assets/image/activeImg3.jpg'
import activeImg4 from '@/assets/image/activeImg4.jpg'
export default {
    name: "normalLeafletMap",
    components: {
        imageMap,
        leftXAxis,
        baseImageCmp,
    },
    data() {
        return {
            baseImg,
            activeImgArr: [activeImg0, activeImg1, activeImg2, activeImg3, activeImg4]
        }
    }
}
</script>

<style scoped>
.map-wrap {
    display: flex;
    width: 100%;
    height: 50%;
}
</style>