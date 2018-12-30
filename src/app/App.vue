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
        <button class="controls controls--settings button button--icon" @click="toggleSettings();">
            <Icon icon="close"></Icon>
            <Icon icon="settings"></Icon>
        </button>
        <p>
            <Settings class="app__settings settings" aria-hidden="true"></Settings>
        </p>
    </div>
</template>

<script>
import logo from "./../icons/logo-portrait.svg";
import content from "./modules/content";
import Map from "./components/Map.vue";
import Icon from "./components/globals/Icon.vue";
import Settings from "./components/Settings.vue";
import ServiceWorker from "./modules/serviceworker";
import { IsDev } from "./modules/settings";
import { setI18nLanguage } from "./i18n";

export default {
    data() {
        return {
            logo
        };
    },
    metaInfo() {
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
        toggleSettings() {
            const $settings = this.$el.querySelector(".app__settings");
            const $button = this.$el.querySelector(".controls--settings");
            const hide = $settings.getAttribute("aria-hidden") === "false";
            $settings.setAttribute("aria-hidden", hide ? "true" : "false");
            $button.setAttribute("data-close", hide ? "false" : "true");
        },
        newPark: function() {
            this.$snack.danger({
                text: this.$t("comingsoon"),
                button: "OK"
            });
        }
    },
    mounted() {
        window.setTimeout(() => {
            document.getElementById("app").classList.add("app--loaded");
        }, 100);

        setI18nLanguage();
        if (this.$router.history.current.path !== `/${this.$i18n.locale}/`) {
            content.show();
        }

        swUserAgent = true;
        if (
            navigator.userAgent.indexOf("facebookexternalhit/") !== -1 ||
            navigator.userAgent.indexOf("Facebot") !== -1
        ) {
            // Facebook
            swUserAgent = false;
        }

        if (!IsDev && swUserAgent) {
            ServiceWorker().then(controller => {
                if (controller) {
                    console.log("New content is available.");
                    if (IsDev) location.reload();
                } else {
                    this.$snack.success({
                        text: this.$t("pwa.installed"),
                        button: "OK"
                    });
                }
            });
        }
    }
};
</script>