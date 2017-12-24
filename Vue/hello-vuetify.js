import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './hello-vuetify.vue';

Vue.use(Vuetify);

new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
});