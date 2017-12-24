//import Vue from 'vue';
import Vue from 'vue/dist/vue.js';
//https://stackoverflow.com/questions/39488660/vue-js-2-0-not-rendering-anything

new Vue({
    el: '#app',
    data: {
        boundName: '',
        name: 'World'
    },
    computed: {
        message: function () {
            return 'Hello ' + this.name;
        }
    },
    methods: {
        toggle: function (e) {
            e.preventDefault(); //so aspx doesnt postback
            this.name = this.name === 'World' ? this.boundName : 'World';
        }
    }
});
