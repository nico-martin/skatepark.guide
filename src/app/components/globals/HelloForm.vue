<template>
    <div class="form__feedback form__feedback--success" v-if="formSuccess">
        <p>{{formSuccess}}</p>
    </div>
    <form v-else :id="formKey" class="form" @submit.prevent="onSubmit">
        <div class="form__feedback form__feedback--error" v-if="formError">
            <p>{{formError}}</p>
        </div>
        <slot></slot>
        <div class="form__element form__element--controls">
            <button
                class="button form__control"
                type="submit"
                :disabled="formLoading"
            >{{submitButton}}</button>
        </div>
    </form>
</template>
<script>
export default {
    props: {
        formKey: {
            type: String,
            required: true
        },
        formLoading: {
            type: Boolean,
            required: true
        },
        formError: {
            type: Boolean | String,
            required: true
        },
        formSuccess: {
            type: Boolean | String,
            required: false
        },
        formSubmit: {
            type: Function,
            required: true
        },
        submit: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            submitButton: this.submit != "" ? this.submit : this.$t("form.send")
        };
    },
    methods: {
        onSubmit: function($form) {
            const $fields = $form.target.querySelectorAll(
                "input, select, textarea"
            );

            const data = {};
            $fields.forEach(function($field) {
                data[$field.getAttribute("name")] = $field.value;
            });

            this.formSubmit(data);
        }
    }
};
</script>
