<template>
    <div class="favorites">
        <div class="favorites__content">
            <h1>{{$t('favorites.title')}}</h1>
            <p>{{$t('favorites.description')}}</p>
            <ul class="favorites__parks">
                <li v-for="park in parks" class="favorites-park" v-bind:key="park.slug">
                    <img class="favorites-park__image" :src="park.image['3x2'].sizes.medium.url">
                    <div class="favorites-park__content">
                        <h2>{{park.title}}</h2>
                        <router-link
                            :to="'/'+$i18n.locale+'/parks/'+park.slug+'/'"
                            class="favorites-park__link"
                        >{{$t('readMore')}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { lovedDB } from "../store/storeDB";

export default {
    data() {
        return {
            parks: []
        };
    },
    mounted() {
        lovedDB.getAll().then(resp => {
            this.parks = resp;
        });
    }
};
</script>
