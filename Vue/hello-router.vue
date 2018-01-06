<style>
    .router-link-active {
        color: red;
    }
</style>
<template>
    <div>
        <h1>Hello App</h1>
        <p>
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link><br />
            <router-link to="/user/foo">/user/foo</router-link>
            <router-link to="/user/bar">/user/bar</router-link>
        </p>
        <router-view></router-view>
        <p><button v-on:click="goBack($event)">Toggle</button>Back</p>
    </div>
</template>
<script>
    export default {
        created() {
            console.log('hello-router.vue is created');
        },
        data() {
            return {
                'something': 0
            }
        },
        computed: {
            username() {
                return this.$route.params.username
            }
        },
        methods: {
            goBack(e) {
                e.preventDefault(); //so aspx doesnt postback
                window.history.length > 1 ? this.$router.go(-1)
                    : this.$router.push('/') //router.push({ name: 'user', params: { userId }}) // -> /user/123
                //router.go(1)  history.forward()
                //router.go(-1) history.back()
            }
        }
    }
</script>
