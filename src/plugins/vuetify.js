import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/lib/locale/ru';

Vue.use(Vuetify);
const vuetify = new Vuetify({
    lang: {
        locales: {ru},
        current: 'ru',
    },
});


export default new Vuetify({
    vuetify
});
