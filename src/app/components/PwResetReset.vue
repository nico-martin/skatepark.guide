<template>
    <HelloForm
        formKey="PwReset"
        :formSubmit="onSubmit"
        :formError="form.error"
        :formLoading="form.loading"
    >
        <HelloInput :title="$t('pwreset.email')" name="email" type="email"></HelloInput>
    </HelloForm>
</template>
<script>
import HelloForm from "./globals/HelloForm.vue";
import HelloInput from "./globals/HelloInput.vue";

export default {
    data() {
        return {
            form: {
                loading: false,
                error: false
            }
        };
    },
    mounted() {},
    components: {
        HelloForm,
        HelloInput
    },
    methods: {
        onSubmit: function($form) {
            this.form.loading = true;
        }
    }
};
</script>