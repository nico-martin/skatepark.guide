<template>
    <div class="app" id="app">
        <router-link
            :to="'/'+this.$i18n.locale+'/'"
            class="controls controls--logo logo"
            v-html="logo"
        ></router-link>
        <Map></Map>
        <div id="content" class="app__content" aria-hidden="true">
            <router-view></router-view>
        </div>
        <router-link :to="'/'+this.$i18n.locale+'/'" class="app__overlay"></router-link>
        <div class="controls controls--menu menu" data-state="closed" id="menu">
            <button class="menu__toggler menutoggler button button--icon" v-on:click="toggleMenu">
                <span class="menutoggler__line menutoggler__line--1"></span>
                <span class="menutoggler__line menutoggler__line--2"></span>
                <span class="menutoggler__line menutoggler__line--3"></span>
            </button>
            <router-link
                :to="'/'+this.$i18n.locale+'/about/'"
                class="menu__links menu__links--information button button--icon button--small"
            >
                <Icon icon="information"></Icon>
            </router-link>
            <button
                @click="newPark()"
                class="menu__links menu__links--markerplus button button--icon button--small"
            >
                <Icon icon="markerplus"></Icon>
            </button>
            <router-link
                :to="'/'+this.$i18n.locale+/account/"
                class="menu__links menu__links--account button button--icon button--small"
            >
                <Icon icon="account"></Icon>
            </router-link>
        </div>
        <button class="controls controls--settings button button--icon" v-on:click="toggleSettings">
            <Icon icon="settings"></Icon>
        </button>
        <Settings class="app__settings settings" aria-hidden="true"></Settings>
    </div>
</template>

<script>
import logo from "./../icons/logo-portrait.svg";
import content from "./modules/content";
import Map from "./components/Map.vue";
import Icon from "./components/globals/Icon.vue";
import Settings from "./components/Settings.vue";
import ServiceWorker from "./modules/serviceworker";

import { setI18nLanguage } from "./i18n";

export default {
    data() {
        return {
            logo
        };
    },
    metaInfo: function() {
        return {
            title: false,
            titleTemplate: title => {
                return title
                    ? `${title} 💗 Skatepark.guide`
                    : "Skatepark.guide";
            }
        };
    },
    components: {
        Map,
        Icon,
        Settings
    },
    methods: {
        toggleMenu: function() {
            const $menu = document.getElementById("menu");
            const state = $menu.getAttribute("data-state");
            if (state === "open") {
                content.hide();
            } else if (state === "closed") {
                $menu.setAttribute("data-state", "open");
            } else if (state === "back") {
                this.$router.push({
                    path: `/${this.$i18n.locale}/`
                });
            }
        },
        toggleSettings: function() {
            const $settings = this.$el.querySelector(".app__settings");
            if ($settings.getAttribute("aria-hidden") === "false") {
                $settings.setAttribute("aria-hidden", "true");
            } else {
                $settings.setAttribute("aria-hidden", "false");
            }
        },
        newPark: function() {
            this.$snack.danger({
                text: this.$t("comingsoon"),
                button: "OK"
            });
        }
    },
    mounted: function() {
        window.setTimeout(() => {
            document.getElementById("app").classList.add("app--loaded");
        }, 100);

        setI18nLanguage();
        if (this.$router.history.current.path !== `/${this.$i18n.locale}/`) {
            content.show();
        }

        //const VueContext = this;
        ServiceWorker().then(controller => {
            if (controller) {
                console.log("New content is available.");
                location.reload();
            } else {
                this.$snack.success({
                    text: this.$t("pwa.installed"),
                    button: "OK"
                });
            }
        });
    }
};
</script>