<template>
    <div id="myMap" style="width: 100%;height: 100%;"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet-path-drag/dist/L.Path.Drag'
import 'leaflet-editable/src/Leaflet.Editable'
export default {
    name: "normalMap",
    data() {
        return {
            myMap: null
        }
    },
    methods: {
        initMap() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const _this = this;
            if (!this.myMap) {
                // this.myMap = L.map('myMap', {editable: true});
                const startPoint = [43.1249, 1.254];
                this.myMap = L.map('myMap', {editable: true}).setView(startPoint, 16);
                const tilelayer = L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {maxZoom: 20, attribution: 'Data \u00a9 <a href="http://www.openstreetmap.org/copyright"> OpenStreetMap Contributors </a> Tiles \u00a9 HOT'}).addTo(this.myMap);

                L.EditControl = L.Control.extend({

                    options: {
                        position: 'topleft',
                        callback: null,
                        kind: '',
                        html: ''
                    },

                    onAdd: function (map) {
                        var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
                            link = L.DomUtil.create('a', '', container);

                        link.href = '#';
                        link.title = 'Create a new ' + this.options.kind;
                        link.innerHTML = this.options.html;
                        L.DomEvent.on(link, 'click', L.DomEvent.stop)
                            .on(link, 'click', function () {
                                window.LAYER = this.options.callback.call(map.editTools);
                            }, this);

                        return container;
                    }

                });

                L.NewLineControl = L.EditControl.extend({

                    options: {
                        position: 'topleft',
                        callback: _this.myMap.editTools.startPolyline,
                        kind: 'line',
                        html: '\\/\\'
                    }

                });

                L.NewPolygonControl = L.EditControl.extend({

                    options: {
                        position: 'topleft',
                        callback: _this.myMap.editTools.startPolygon,
                        kind: 'polygon',
                        html: '▰'
                    }

                });

                L.NewMarkerControl = L.EditControl.extend({

                    options: {
                        position: 'topleft',
                        callback: _this.myMap.editTools.startMarker,
                        kind: 'marker',
                        html: '🖈'
                    }

                });

                L.NewRectangleControl = L.EditControl.extend({

                    options: {
                        position: 'topleft',
                        callback: _this.myMap.editTools.startRectangle,
                        kind: 'rectangle',
                        html: '⬛'
                    }

                });

                L.NewCircleControl = L.EditControl.extend({

                    options: {
                        position: 'topleft',
                        callback: _this.myMap.editTools.startCircle,
                        kind: 'circle',
                        html: '⬤'
                    }

                });

                this.myMap.addControl(new L.NewMarkerControl());
                this.myMap.addControl(new L.NewLineControl());
                this.myMap.addControl(new L.NewPolygonControl());
                this.myMap.addControl(new L.NewRectangleControl());
                this.myMap.addControl(new L.NewCircleControl());
            }
        }
    },
    mounted() {
        this.initMap()
    }
}
</script>

<style scoped>

</style>