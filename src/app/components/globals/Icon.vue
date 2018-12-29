<template>
    <i class="hello-icon" v-html="i"></i>
</template>

<script>
export default {
    props: ["icon"],
    data() {
        return {
            i: require(`../../../icons/mdi/${this.icon}.svg`)
        };
    }
};
</script>