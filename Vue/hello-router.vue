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
            <router-link to="/bar">Go to Bar</router-link>
        </p>
        <router-view></router-view>
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
            goBack() {
                window.history.length > 1 ? this.$router.go(-1)
                    : this.$router.push('/')
            }
        }
    }
</script>
