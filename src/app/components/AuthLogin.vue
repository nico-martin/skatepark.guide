<template>
    <HelloForm formKey="login" :formSubmit="login" :formError="error" :formLoading="loading">
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
                this.form.error = this.$t("auth.form.login.empty");
                return;
            }
            this.form.loading = true;
            this.$store
                .dispatch("userValidate", {
                    email: data.email,
                    password: data.password
                })
                .catch(respData => {
                    this.form.error = this.$t("auth.form.login.error");
                    this.form.loading = false;
                })
                .then(respData => {
                    this.form.loading = false;
                });
        }
    },
    components: {
        HelloForm,
        HelloInput
    }
};
</script>