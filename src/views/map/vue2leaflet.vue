<template>
    <div class="map-wrap">
        <myMap></myMap>
    </div>
</template>

<script>
import myMap from "./components/myMap";
export default {
    name: "vue2leaflet",
    components: {
        myMap
    }
}
</script>

<style scoped>
.map-wrap{
    height: 100%;
}
</style>