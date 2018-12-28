<template>
    <div class="content">
        <nav class="content__navigation">
            <router-link
                active-class="content__link--active"
                :to="'/'+this.$i18n.locale+'/about/'"
                class="content__link"
            >{{$t('menu.about.title')}}</router-link>
            <router-link
                active-class="content__link--active"
                :to="'/'+this.$i18n.locale+'/impressum/'"
                class="content__link"
            >{{$t('menu.impressum.title')}}</router-link>
            <router-link
                active-class="content__link--active"
                :to="'/'+this.$i18n.locale+'/privacy/'"
                class="content__link"
            >{{$t('menu.privacy.title')}}</router-link>
        </nav>
        <h1 class="content__title">{{page.title}}</h1>
        <div class="content__loader" v-if="page.loading"></div>
        <div class="content__content" v-else v-html="page.content"></div>
    </div>
</template>

<script>
import { i18n } from "../i18n";
import { mapState } from "vuex";

export default {
    metaInfo: function() {
        return {
            title: this.page.title
        };
    },
    mounted: function() {
        this.$store.dispatch("loadPage", [this.$route.params.page]);
    },
    beforeRouteUpdate(to, from, next) {
        this.$store.dispatch("loadPage", [to.params.page]);
        next();
    },
    computed: mapState(["page"])
};
</script>