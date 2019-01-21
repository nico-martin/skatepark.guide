<template>
    <div class="content">
        <h1 class="content__title">{{$t('pwreset.title')}}</h1>
        <div class="content__form">
            <p v-if="user">{{$t('pwreset.already')}}</p>
            <Reset v-else></Reset>
            <p>Test</p>
        </div>
    </div>
</template>
<script>
import PwResetReset from "./PwResetReset.vue";

import { mapState } from "vuex";

export default {
    data() {
        return {
            confirm: false
        };
    },
    mounted() {},
    computed: mapState(["user"]),
    components: {
        Reset: PwResetReset
    },
    watch: {
        signup: function() {
            if (this.signup) {
                window.location.hash = "signup";
            } else {
                window.location.hash = "";
            }
        }
    }
};
</script>