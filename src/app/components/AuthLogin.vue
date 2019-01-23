<template>
    <HelloForm
        formKey="login"
        :formSubmit="login"
        :formError="error"
        :formLoading="loading"
        :submit="$t('auth.login')"
    >
        <HelloInput :title="$t('auth.email')" name="email" type="email"></HelloInput>
        <HelloInput :title="$t('auth.password')" name="password" type="password"></HelloInput>
        <router-link
            :to="'/'+this.$i18n.locale+'/account/password-reset/'"
            class="form__control form__control--pwreset"
        >{{$t('auth.pwreset')}}</router-link>
    </HelloForm>
</template>

<script>
import HelloForm from "./globals/HelloForm.vue";
import HelloInput from "./globals/HelloInput.vue";

export default {
    data() {
        return {
            error: false,
            loading: false
        };
    },
    methods: {
        login: function(data) {
            if (data.email === "" || data.password === "") {
                this.error = this.$t("auth.form.login.empty");
                return;
            }
            this.loading = true;
            this.$store
                .dispatch("userValidate", {
                    email: data.email,
                    password: data.password
                })
                .catch(respData => {
                    this.error = this.$t("auth.form.login.error");
                    this.loading = false;
                })
                .then(respData => {
                    this.loading = false;
                });
        }
    },
    components: {
        HelloForm,
        HelloInput
    }
};
</script>