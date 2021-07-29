<template>
    <div class="myMap-wrap">
        <LMap style="width: 100%;height: 100%;"
              :bounds="bounds"
              :max-bounds="maxBounds"
              ref="map"
              :min-zoom="minZoom">
            <l-draw-toolbar position="topleft"/>
            <l-control position="topleft">
                <button @click="flipActive">
                    {{ isActive ? 'Deactivate' : 'Activate' }}
                </button>
            </l-control>
            <l-image-overlay
                :url="url"
                :bounds="bounds"
            />
            <l-marker
                v-for="star in stars"
                :key="star.name"
                :lat-lng="star"
            >
            </l-marker>
            <l-polyline :lat-lngs="travel" />
            <LFreeDraw v-model="polygons" :mode="mode" />
        </LMap>
    </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LImageOverlay, LPopup, } from 'vue2-leaflet';
import LFreeDraw from 'vue2-leaflet-freedraw';
import { NONE, ALL } from 'leaflet-freedraw';
import jpg1 from'@/assets/1.jpg'
import LDrawToolbar from 'vue2-leaflet-draw-toolbar';
import 'leaflet/dist/leaflet.css';
export default {
    name: "myMap",
    data() {
        return {
            url: jpg1,
            bounds: [[-26.5, -25], [1021.5, 1023]],
            maxBounds: [[-26.5, -25], [1021.5, 1023]],
            minZoom: -2,
            stars: [
                { name: "Sol", lng: 175.2, lat: 145.0 },
                { name: "Mizar", lng: 41.6, lat: 130.1 },
                { name: "Krueger-Z", lng: 13.4, lat: 56.5 },
                { name: "Deneb", lng: 218.7, lat: 8.3 }
            ],
            travel: [[145.0, 175.2], [8.3, 218.7]],
            polygons: [],
            isActive: false,
        }
    },
    computed: {
        mode() {
            return this.isActive ? ALL: NONE;
        }
    },
    methods: {
        flipActive() {
            this.isActive = !this.isActive;
        }
    },
    components: {
        LMap,
        LDrawToolbar,
        LImageOverlay,
        LFreeDraw
        // LTileLayer,
        // LMarker
    }
}
</script>

<style scoped>
.myMap-wrap {
    height: 100%;
}
</style>