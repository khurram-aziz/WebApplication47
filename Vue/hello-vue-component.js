import Vue from 'vue';
import App from './hello.vue';

new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
})