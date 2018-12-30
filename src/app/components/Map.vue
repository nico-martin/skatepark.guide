<template>
    <div class="app__map parks-map">
        <div class="parks-map__loader"></div>
        <div id="map" class="parks-map__map"></div>
    </div>
</template>

<script>
import axios from "axios";
import { store } from "../store/store";
import { mapState } from "vuex";
import { settingsDB } from "../store/storeDB";
import loadGoogleMapsApi from "load-google-maps-api";
import MarkerClusterer from "@google/markerclusterer";
import { maps } from "../modules/settings";
import fade from "../modules/fade";
import router from "../router";
import { i18n } from "../i18n";

let map = false;
window.map = map;
let loadParksTimer = "init";
let markers = [];
let markerCluster = false;

export default {
    mounted() {
        loadGoogleMapsApi({
            key: maps.key
        }).then(async function(googleMaps) {
            const center = await getCenter();
            const zoom = await getZoom();

            /**
             * Prevent roboto from loading
             */
            const head = document.getElementsByTagName("head")[0];
            const insertBefore = head.insertBefore;
            head.insertBefore = function(newElement, referenceElement) {
                if (
                    newElement.href &&
                    newElement.href.indexOf(
                        "https://fonts.googleapis.com/css?family=Roboto"
                    ) === 0
                ) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };
            map = new googleMaps.Map(document.getElementById("map"), {
                zoom: zoom,
                center: {
                    lat: center.lat,
                    lng: center.lng
                },
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: maps.styles
            });
            window.map = map;

            store.subscribe((mutation, state) => {
                if (
                    mutation.type === "SET_PARKS" ||
                    mutation.type === "SET_MAP_FILTER"
                ) {
                    // set Filter
                    const filters = [];
                    for (let filter in state.mapFilter) {
                        if (
                            state.mapFilter.hasOwnProperty(filter) &&
                            state.mapFilter[filter]
                        ) {
                            filters.push(filter);
                        }
                    }

                    // reset Markers
                    for (let i = 0; i < markers.length; i++) {
                        markers[i].setMap(null);
                    }
                    markers = [];

                    for (let park in state.map) {
                        if (state.map.hasOwnProperty(park)) {
                            if (filters.length) {
                                let valid = false;
                                for (let parkFacility in state.map[park]
                                    .facilities) {
                                    if (
                                        state.map[
                                            park
                                        ].facilities.hasOwnProperty(
                                            parkFacility
                                        )
                                    ) {
                                        if (
                                            state.map[park].facilities[
                                                parkFacility
                                            ] === "1" &&
                                            filters.indexOf(parkFacility) !== -1
                                        ) {
                                            valid = true;
                                        }
                                    }
                                }
                                if (!valid) {
                                    continue;
                                }
                            }

                            const marker = new google.maps.Marker({
                                position: {
                                    lat: state.map[park].map.lat,
                                    lng: state.map[park].map.lng
                                },
                                icon: maps.marker,
                                map: map,
                                title: state.map[park].title
                            });

                            google.maps.event.addListener(
                                marker,
                                "click",
                                function() {
                                    router.push({
                                        path: `/${i18n.locale}/parks/${
                                            state.map[park].slug
                                        }/`
                                    });
                                }
                            );

                            markers.push(marker);
                        }
                    }

                    if (markerCluster) {
                        markerCluster.clearMarkers();
                    }
                    if (markers.length) {
                        markerCluster = new MarkerClusterer(map, markers, {
                            styles: maps.clusterStyles
                        });
                    } else {
                        markerCluster = false;
                    }

                    fade.out(".parks-map__loader");
                }
            });

            map.addListener("bounds_changed", function() {
                clearTimeout(loadParksTimer);
                if (loadParksTimer === "init") {
                    // load on init
                    loadParks(map.getBounds());
                    loadParksTimer = false;
                } else {
                    // wait for 500ms on move
                    loadParksTimer = setTimeout(() => {
                        loadParks(map.getBounds());
                    }, 500);
                }
            });

            map.addListener("center_changed", function() {
                settingsDB.set("mapCenter", {
                    lat: map.getCenter().lat(),
                    lng: map.getCenter().lng()
                });
            });

            map.addListener("zoom_changed", function() {
                settingsDB.set("mapZoom", map.getZoom());
            });
        });
    }
};

function loadParks() {
    if (!map) {
        return;
    }

    fade.in(".parks-map__loader");
    const bounds = [
        map
            .getBounds()
            .getSouthWest()
            .lat(), // min-lat
        map
            .getBounds()
            .getNorthEast()
            .lat(), // max-lat
        map
            .getBounds()
            .getSouthWest()
            .lng(), // min-lng
        map
            .getBounds()
            .getNorthEast()
            .lng() // max-lng
    ];

    store.dispatch("loadMapParks", bounds.join("|"));
}

function resetParks() {}

function getCenter() {
    return new Promise(resolve => {
        settingsDB.get("mapCenter").then(resp => {
            if (typeof resp !== "undefined") {
                resolve(resp);
            } else {
                axios.get("https://ipapi.co/json").then(function(response) {
                    const data = {
                        lat: response.data.latitude,
                        lng: response.data.longitude
                    };
                    settingsDB.set("mapCenter", data);
                    resolve(data);
                });
            }
        });
    });
}

function getZoom() {
    return new Promise(resolve => {
        settingsDB.get("mapZoom").then(resp => {
            if (typeof resp !== "undefined") {
                resolve(resp);
            } else {
                settingsDB.set("mapZoom", 9);
                resolve(9);
            }
        });
    });
}
</script>