<template>
	<div>
		Your Name: <input type="text" v-model="boundName" /><br />
		<button v-on:click="toggle($event)">Toggle</button>{{ message }}
	</div>
</template>
<script>
export default {
	data () {
		return {
			boundName: '',
			name: 'World'
		}
	},
	computed: {
        message() {

            return 'Hello ' + this.name
        }
	},
	methods: {
        toggle(e) {
			e.preventDefault(); //so aspx doesnt postback
			this.name = this.name === 'World' ? this.boundName : 'World';
        }
	}
}
</script>
