<template>
    <button v-if="show" class="button button--has-icon button--transparent" @click="share();">
        <Icon icon="share"></Icon>
        {{title}}
    </button>
</template>

<script>
import Icon from "./Icon.vue";

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
            default: location.href
        }
    },
    data() {
        return {
            show: navigator.share
        };
    },
    components: {
        Icon
    },
    methods: {
        share: function() {
            navigator
                .share({
                    title: this.title,
                    text: this.text,
                    url: this.url
                })
                .then(() => console.log("Successful share"))
                .catch(error => console.log("Error sharing", error));
        }
    }
};
</script>