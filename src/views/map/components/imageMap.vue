<template>
    <div id="myMap" style="width: 100%;height: calc(100% - 20px);margin-top: 10px"></div>
</template>

<script>
import L from 'leaflet'
import berserk from "@/assets/bg.jpg"
export default {
    name: "imageMap",
    data() {
        return {
            myMap: null,
            imageLayer: null,
            bounds: [L.latLng([43.1311194006926, 1.2369275093078613]), L.latLng([43.11859042387546, 1.2711310386657717])],
            markers: [
                L.latLng({
                    lat: 43.122599975640426,
                    lng: 1.249544620513916
                }),
                L.latLng({
                    lat: 43.12296019594267,
                    lng: 1.2592220306396487
                }),
                L.latLng({
                    lat: 43.1227879169323,
                    lng: 1.263535022735596
                }),
            ],
            markersGroup: [],

        }
    },
    methods: {
        initMap() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const _this = this;
            if (!this.myMap) {
                // this.myMap = L.map('myMap', {editable: true});
                const startPoint = [43.1249, 1.254];
                this.myMap = L.map('myMap', {
                    editable: true,
                    zoomControl: false,
                    dragging: false,
                    minZoom: 16,
                    maxZoom: 16,
                }).setView(startPoint, 16);
                const tilelayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {maxZoom: 20,
                    attribution: ''}).addTo(this.myMap);
                this.myMap.on('click', (e) => {
                    console.log(e);
                })
            }
            this.addImageLayer(berserk)
            this.markers.forEach(markerLatLng => this.addDeviceMarker(markerLatLng))
        },
        addImageLayer(url) {
            if (this.imageLayer) {
                this.myMap.removeLayer(this.imageLayer)
            }
            this.imageLayer = L.imageOverlay(url, this.bounds)
            this.myMap.addLayer(this.imageLayer)
        },
        addDeviceMarker(latLng) {
            const marker = L.marker(latLng, {
                // icon: L.icon({
                    // iconUrl: ''
                // })
            }).addTo(this.myMap)
        }
    },
    mounted() {
        this.initMap()
    }
}
</script>

<style scoped>

</style>