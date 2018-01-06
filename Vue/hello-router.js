import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './hello-router.vue';

Vue.use(VueRouter);

const Home = { template: '<div>home</div>' }
const User = { template: '<div>User {{ $route.params.id }}</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const routes = [
    { path: '/', component: Home },
    { path: '/user/:id', component: User },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

const router = new VueRouter({ routes }); 

new Vue({
    el: '#app',
    router: router,
    render: function (createElement) {
        return createElement(App)
    }
})