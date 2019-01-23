<template>
    <div class="form__element">
        <input
            :type="type"
            :name="name"
            :id="name"
            v-on:change="isEmpty"
            :value="value"
            class="form__input"
            :required="required"
        >
        <label :for="name" class="form__label">{{title}}{{(required?'*':'')}}</label>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        value: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        isEmpty: function(evt) {
            const $e = evt.target;
            const value = $e.value;
            if (value === "") {
                $e.setAttribute("has-value", false);
            } else {
                $e.setAttribute("has-value", true);
            }
        }
    }
};
</script>
