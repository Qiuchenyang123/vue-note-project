<template>
    <div class="left-xAxis-wrap">
        <div class="splitItem"><span class="splitNumber">{{max}}</span></div>
        <div class="splitItem" v-for="n in splitNumber" :key="n"><span class="splitNumber">{{getSplitNumber(splitNumber + 1 - n)}}</span></div>
        <div class="splitItem"><span class="splitNumber">{{min}}</span></div>
    </div>
</template>

<script>
export default {
    name: "leftXAxis",
    props: {
        max: {
            type: Number,
            default: 60,
        },
        min: {
            type: Number,
            default: 0
        },
        splitNumber: {
            type: Number,
            default: 5
        }
    },
    methods: {
        getSplitNumber(n) {
            return (this.max - this.min) / (this.splitNumber + 1) * n
        }
    }
}
</script>

<style scoped>
.left-xAxis-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 60px;
    height: 100%;
}
.left-xAxis-wrap::after {
    position: absolute;
    right: 10px;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: #aaa;
    content: "";
}
.left-xAxis-wrap .splitItem {
    position: relative;
}
.left-xAxis-wrap .splitItem::after {
    position: absolute;
    right: 10px;
    top: 50%;
    height: 2px;
    width: 10px;
    background-color: #aaa;
    transform: translateY(-50%);
    content: "";
}
.left-xAxis-wrap .splitNumber {
    color: #aaa;
}
</style>