import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './vee-validate.vue';

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
    //render: h => h(app)
})