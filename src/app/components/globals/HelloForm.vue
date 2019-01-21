<template>
    <form :id="formKey" class="form" @submit.prevent="onSubmit">
        <div class="form__feedback form__feedback--error" v-if="formError">
            <p>{{formError}}</p>
        </div>
        <slot></slot>
        <div class="form__element form__element--controls">
            <button
                class="button form__control"
                type="submit"
                :disabled="formLoading"
            >{{$t('auth.login')}}</button>
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
        formSubmit: {
            type: Function,
            required: true
        }
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
