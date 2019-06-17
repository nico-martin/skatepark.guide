<template>
    <div>
        <p v-if="user">{{$t('auth.already', { userName: user.user_display_name })}}</p>
        <template v-else>
            <template v-if="signup">
                <AuthSignup></AuthSignup>
                <br>
                <button class="button button--link" @click="signup = false;">{{$t('auth_dologin')}}</button>
            </template>
            <template v-else>
                <AuthLogin></AuthLogin>
                <br>
                <button class="button button--link" @click="signup = true">{{$t('auth_dosignup')}}</button>
            </template>
        </template>
    </div>
</template>

<script>
import AuthLogin from './AuthLogin.vue';
import AuthSignup from './AuthSignup.vue';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            signup: false
        };
    },
    mounted() {
        if (window.location.hash === '#signup') {
            this.signup = true;
        }
    },
    computed: mapState(['user']),
    components: {
        AuthLogin,
        AuthSignup
    },
    watch: {
        signup: function() {
            if (this.signup) {
                window.location.hash = 'signup';
            } else {
                window.location.hash = '';
            }
        }
    }
};
</script>