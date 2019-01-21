<template>
    <div class="form__element">
        <input :type="type" :name="name" :id="name" v-on:change="isEmpty" class="form__input">
        <label :for="name" class="form__label">{{title}}</label>
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
            required: true
        },
        type: {
            type: String,
            default: "text"
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
