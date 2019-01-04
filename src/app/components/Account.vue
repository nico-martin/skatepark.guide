<template>
    <div class="content">
        <h1 class="content__title">Account</h1>
        <p v-if="user">Hello {{user.user_display_name}}</p>
        <Login v-else></Login>
    </div>
</template>

<script>
import Login from "./AuthLogin.vue";
import { mapState } from "vuex";

export default {
    mounted() {},
    computed: mapState(["user"]),
    components: {
        Login
    }
};
</script>