<template>
    <main class="park">
        <header class="park__header">
            <div class="park__image">
                <LazyImage v-if="park.image" :image="park.image" ratio="3x1"></LazyImage>
            </div>
            <div class="park__heading">
                <span class="park__float-title">{{park.title}}</span>
                <button class="park__love" @click="lovePark()">
                    <Icon icon="heart-empty"></Icon>
                </button>
            </div>
        </header>
        <h1 class="park__title">{{park.title}}</h1>
        <div class="park__loader" v-if="park.loading"></div>
        <div class="park__body" v-else>
            <ParkVideo class="park__video" v-if="park.video" :link="park.video"></ParkVideo>
            <ParkGallery class="park__gallery" v-if="park.gallery" :images="park.gallery"></ParkGallery>
            <div class="park__content post-content" v-html="park.content"></div>
            <div class="park__contact">
                <a
                    class="park__contact-link"
                    target="_blank"
                    v-if="park.homepage"
                    v-bind:href="park.homepage"
                >
                    <Icon icon="link" class="hello-icon--button hello-icon--round"></Icon>
                    <span v-html="displayUrl(park.homepage)"></span>
                </a>
                <a class="park__contact-link" v-if="park.email" v-bind:href="'mailto:'+park.email">
                    <Icon icon="at" class="hello-icon--button hello-icon--round"></Icon>
                    {{park.email}}
                </a>
                <a class="park__contact-link" v-if="park.phone" v-bind:href="park.phone">
                    <Icon icon="phone" class="hello-icon--button hello-icon--round"></Icon>
                    {{park.phone}}
                </a>
                <a
                    class="park__contact-link"
                    v-if="park.address"
                    v-bind:href="'https://www.google.com/maps?q='+park.address"
                    target="_blank"
                >
                    <Icon icon="home" class="hello-icon--button hello-icon--round"></Icon>
                    <span v-html="nl2br(park.address)"></span>
                </a>
                <a
                    class="park__contact-link"
                    v-if="park.facebook"
                    v-bind:href="park.facebook"
                    target="_blank"
                >
                    <Icon icon="facebook" class="hello-icon--button hello-icon--round"></Icon>
                    <span v-html="displayUrl(park.facebook)"></span>
                </a>
            </div>
            <ParkWeather class="park__weather" :slug="park.slug"></ParkWeather>
            <Share
                class="park__share"
                :title="$t('share.park.title')"
                :text="$t('share.park.text', {'parkTitle': park.title})"
            ></Share>
        </div>
    </main>
</template>

<script>
import Icon from "./globals/Icon.vue";
import LazyImage from "./globals/LazyImage.vue";
import ParkGallery from "./ParkGallery.vue";
import ParkVideo from "./ParkVideo.vue";
import ParkWeather from "./ParkWeather.vue";
import Share from "./globals/Share.vue";
import { mapState } from "vuex";

let offset = false;

function setHeadingPosition() {
    const $heading = document.querySelector(".park__heading");
    const $header = document.querySelector(".park__header");
    if ($heading && $header) {
        offset = $header.offsetHeight - $heading.offsetHeight;
        $header.style.top = `-${offset}px`;
    }
}

function nl2br(str = "") {
    return str === "" ? "" : (str + "").replace(/(\r\n|\n\r|\r|\n)/g, "<br>$1");
}

function displayUrl(url = "") {
    return url
        .replace(/http:\/\//g, "")
        .replace(/https:\/\//g, "")
        .replace(/www./g, "")
        .replace(/facebook.com/g, "");
}

window.addEventListener("resize", () => {
    setHeadingPosition();
});

export default {
    metaInfo: function() {
        return {
            title: this.park.title
        };
    },
    mounted() {
        this.$store.dispatch("loadPark", this.$route.params.slug);

        setHeadingPosition();
        const $image = this.$el.querySelector(".park__image");
        const $title = this.$el.querySelector(".park__float-title");

        document.querySelector("#content").addEventListener("scroll", () => {
            if (!offset) {
                return;
            }

            let scroll = document.querySelector("#content").scrollTop;
            if (scroll >= offset) {
                scroll = offset;
            }

            $image.style.opacity = 1 - (1 / offset) * scroll;
            $title.style.opacity = (1 / offset) * scroll;
        });
    },
    beforeDestroy() {
        this.$store.dispatch("loadPark", false);
    },
    updated() {
        setHeadingPosition();
    },
    components: {
        Icon,
        LazyImage,
        ParkGallery,
        ParkVideo,
        ParkWeather,
        Share
    },
    computed: mapState(["park"]),
    methods: {
        nl2br,
        displayUrl,
        lovePark: function() {
            this.$snack.danger({
                text: this.$t("comingsoon"),
                button: "OK"
            });
        }
    }
};
</script>