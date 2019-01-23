<template>
    <div class="content">
        <h1 class="content__title">{{$t('pwreset.title')}}</h1>
        <div class="content__form">
            <p v-if="user">{{$t('pwreset.already')}}</p>
            <Confirm v-else-if="confirm"></Confirm>
            <Reset v-else></Reset>
            <br>
            <router-link
                :to="'/'+this.$i18n.locale+'/account/'"
                class="form__control button button--link"
            >{{$t('pwreset.login')}}</router-link>
        </div>
    </div>
</template>
<script>
import PwResetReset from "./PwResetReset.vue";
import PwResetConfirm from "./PwResetConfirm.vue";

import { mapState } from "vuex";

export default {
    data() {
        let confirm = false;
        if (typeof this.$route.params.pwresetkey !== "undefined") {
            confirm = this.$route.params.pwresetkey;
        }
        return {
            confirm
        };
    },
    mounted() {},
    computed: mapState(["user"]),
    components: {
        Reset: PwResetReset,
        Confirm: PwResetConfirm
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