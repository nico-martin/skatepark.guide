<template>
    <HelloForm
        formKey="signup"
        :formSubmit="signup"
        :formError="error"
        :formLoading="loading"
        :submit="$t('auth.signup')"
    >
        <HelloInput :title="$t('auth.email')" name="email" type="email"></HelloInput>
        <HelloInput :title="$t('auth.password')" name="password" type="password"></HelloInput>
        <HelloInput :title="$t('auth.password2')" name="password2" type="password"></HelloInput>
        <div class="form__element">
            <p class="form__privacy-info">{{$t('auth.privacyinfo')}}</p>
        </div>
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
        signup: function(data) {
            this.form.loading = true;
            this.$store
                .dispatch("userSignup", {
                    email: data.email,
                    password: data.password,
                    password2: data.password2
                })
                .catch(error => {
                    this.form.loading = false;
                    this.form.error = error;
                });
        }
    },
    components: {
        HelloForm,
        HelloInput
    }
};
</script>