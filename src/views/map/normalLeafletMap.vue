<template>
    <div class="map-wrap">
        <normalMap></normalMap>
    </div>
</template>

<script>
import normalMap from "./components/normalMap";
export default {
    name: "normalLeafletMap",
    components: {
        normalMap
    }
}
</script>

<style scoped>
.map-wrap {
    width: 100%;
    height: 100%;
}
</style>