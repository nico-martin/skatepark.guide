<template>
    <div>
        <div class="settings__element settings__element--filter">
            <h2 class="settings__heading">{{$t('filter')}}</h2>
            <div class="settings-filter">
                <div v-for="facility in facilities" class="settings-filter__element">
                    <input
                        @change="updateCheckedFacilities"
                        :id="'facility-'+facility"
                        :value="facility"
                        type="checkbox"
                        class="settings-filter__checkbox js-park-facilities input-checkbox"
                        checked
                    >
                    <label
                        :for="'facility-'+facility"
                        class="settings-filter__label"
                    >{{$t('facilities.'+facility)}}</label>
                </div>
            </div>
        </div>
        <div v-if="geolocation" class="settings__element settings__element--geolocation">
            <h2 class="settings__heading">{{$t('location')}}</h2>
            <div class="settings-location">
                <button
                    v-on:click="setGeoPosition"
                    :class="'button button--round button--white settings-location__set '+(geolocationPerm?'settings-location__set--permit ':'')+(geolocationActive?'settings-location__set--active ':'')"
                >
                    <Icon icon="location-full"></Icon>
                    <span v-if="geolocationActive">{{$t('geolocation.active')}}</span>
                    <span v-else>{{$t('geolocation.action')}}</span>
                </button>
            </div>
        </div>
        <div class="settings__element settings__element--config">
            <h2 class="settings__heading">{{$t('settings')}}</h2>
            <div class="settings-config settings-config--language">
                <label for="language">{{$t('languages.title')}}:</label>
                <select class="input-select" name="language" id="language" @change="setLanguage">
                    <option
                        v-for="lang in languages"
                        :value="lang"
                        v-bind:selected="$i18n.locale === lang"
                    >{{$t('languages.'+lang)}}</option>
                </select>
            </div>
            <div v-if="a2h" class="settings-config settings-config--a2h">
                <button class="settings-config__a2h" @click="a2hPrompt();">{{$t('pwa.a2h')}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { setI18nLanguage, i18n } from "../i18n";
import { store } from "../store/store";
import Icon from "../components/globals/Icon.vue";
import { maps } from "../modules/settings";

let userMarker = false;
let watchID = false;

function setUserMarker(position) {
    if (!window.map) {
        return;
    }
    if (!userMarker) {
        userMarker = new google.maps.Marker({
            position: position,
            map: window.map,
            icon: {
                url: maps.markerUser,
                scaledSize: new google.maps.Size(30, 30),
                anchor: new google.maps.Point(15, 15)
            }
        });
        window.map.setCenter(position);
        if (window.map.getZoom() <= 13) {
            window.map.setZoom(13);
        }
    }
    userMarker.setPosition(position);
}

export default {
    data: () => {
        return {
            facilities: ["bowl", "mini", "pumptrack", "street"],
            languages: Object.keys(i18n.messages),
            geolocation: "geolocation" in navigator,
            geolocationPerm: false,
            geolocationActive: false,
            a2h: false
        };
    },
    methods: {
        setLanguage: function(event) {
            setI18nLanguage(event.target.value);
        },
        updateCheckedFacilities: function(e) {
            const facilities = {};
            this.$el.querySelectorAll(".js-park-facilities").forEach($el => {
                facilities[$el.getAttribute("value")] = $el.checked;
            });

            store.dispatch("changeMapFilter", facilities);
        },
        setGeoPosition: function() {
            if (this.geolocationActive) {
                this.geolocationActive = false;
                navigator.geolocation.clearWatch(watchID);
                userMarker.setMap(null);
                userMarker = false;
            } else {
                watchID = navigator.geolocation.watchPosition(
                    position => {
                        this.geolocationActive = true;
                        this.geolocationPerm = true;
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        setUserMarker({ lat, lng });
                    },
                    () => {
                        this.$snack.danger({
                            text: this.$t("geolocation.error"),
                            button: "OK"
                        });
                    }
                );
            }
            this.$el.setAttribute("aria-hidden", "true");
        },
        a2hPrompt() {
            this.a2h.prompt();
            // Wait for the user to respond to the prompt
            this.a2h.userChoice.then(choiceResult => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                this.a2h = false;
            });
        }
    },
    components: {
        Icon
    },
    mounted: function() {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(permission => {
                if ("granted" === permission.state) {
                    this.geolocationPerm = true;
                }
            });

        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault();
            window.deferredPrompt = e;
            this.a2h = e;
        });
    }
};
</script>