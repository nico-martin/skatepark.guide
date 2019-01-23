<template>
    <HelloForm
        formKey="PwConfirm"
        :formSubmit="onSubmit"
        :formError="form.error"
        :formLoading="form.loading"
        :formSuccess="form.success"
    >
        <HelloInput
            :title="$t('pwreset.password')"
            name="password"
            type="password"
            :required="true"
        ></HelloInput>
        <HelloInput
            :title="$t('pwreset.password2')"
            name="password2"
            type="password"
            :required="true"
        ></HelloInput>
        <HelloInput name="pwkey" type="hidden" :value="key"></HelloInput>
    </HelloForm>
</template>
<script>
import HelloForm from "./globals/HelloForm.vue";
import HelloInput from "./globals/HelloInput.vue";
import { api } from "../modules/settings";
import axios from "axios";

export default {
    data() {
        return {
            key: this.$route.params.pwresetkey,
            form: {
                loading: false,
                error: false,
                success: false
            }
        };
    },
    mounted() {},
    components: {
        HelloForm,
        HelloInput
    },
    methods: {
        onSubmit: function(data) {
            this.form.loading = true;
            axios
                .post(`${api.base}skateparkguide/v1/password/confirm/`, data)
                .catch(error => {
                    this.form.loading = false;
                    this.form.error = error.response.data.message;
                })
                .then(r => {
                    this.form.loading = false;
                    this.form.success = r.data.message;
                });
        }
    }
};
</script>