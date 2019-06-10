<template>
    <button v-if="show" class="button button--has-icon button--transparent" @click="share();">
        <icon icon="share"></icon>
        {{title}}
    </button>
</template>

<script>
import Icon from "./Icon.vue";
import router from "../../router";

export default {
    props: {
        title: {
            type: String,
            default: "Share this content"
        },
        text: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            show: "share" in navigator
        };
    },
    components: {
        Icon
    },
    methods: {
        share: function() {
            let url = this.url;
            if ("" === url) {
                url = location.origin + this.$router.currentRoute.fullPath;
            }
            navigator
                .share({
                    title: this.title,
                    text: this.text,
                    url
                })
                .then(() => console.log("Successful share"))
                .catch(error => console.log("Error sharing", error));
        }
    }
};
</script>