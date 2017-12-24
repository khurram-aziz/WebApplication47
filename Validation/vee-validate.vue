<style>
    label {
        display: block;
    }
</style>
<template>
    <div>
        <ul>
            <li v-for="error in modelErrors">{{error}}</li>
            <li v-for="error in errors.items">{{error.msg}}</li>
        </ul>

        <fieldset>
            <legend>User: {{ totalErrors }} errors</legend>
            <label>First name: <input name="firstName" type="text" v-model="firstName" v-validate="'min:3|max:10'" /></label>
            <label>Last name: <input name="lastName" type="text" v-model="lastName" v-validate="'required'" />
                <span v-if="errors.has('lastName')">{{ errors.first('lastName') }}</span>
            </label>
            <label>Email: <input name="emailAddress" type="email" v-model="emailAddress" v-validate="'required|email'" data-vv-as="Email Address" /></label>
            <label>Location: <input name="location" type="text" v-model="location" /></label>
            <label>Age: <input name="age" type="number" v-model="age" v-validate="'required|min_value:1|max_value:100'" /></label>
            <label>
                Subscription:
                <select name="subscription" v-model="subscription" v-validate="'required'">
                    <option value="">Choose one...</option>
                    <option v-for="subscription in subscriptions" v-bind:value="subscription.value">{{ subscription.text }}</option>
                </select>
            </label>
            <label>Password: <input name="password" type="password" v-model="password" v-validate="'required'" /></label>
            <label>Retype password: <input name="confirmPassword" type="password" v-validate="'required|confirmed:password'" /></label>
            <label>10 + 1 = <input name="captcha" type="number" v-validate="'required'" /></label>
        </fieldset>
        <button type="button" v-on:click="submit">Submit</button>
        <div>{{ message }}</div>
    </div>
</template>
<script>
    //import jQuery from 'jQuery';

    export default {
	    data () {
		    return {
                firstName: '', lastName: '',
                emailAddress: '',
                location: '', age: 20,
                subscription: '',
                subscriptions: [{ text: 'Technology', value: 'Technology' }, { text: 'Music', value: 'Music' }],
                password: '',

                message: '', modelErrors: [],
		    }
	    },
	    computed: {
            totalErrors() {
                return this.errors.items.length + this.modelErrors.length;
            }
	    },
	    methods: {
            submit: function () {
                var self = this;
                //e.preventDefault();
                this.$validator.validateAll().then(function (result) {
                    if (result) {
                        self.modelErrors = [];
                        //notice we dont need to do anything special for jQuery; we can use its global $
                        $.ajax('/api/Ajax/Signup', {
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(self.$data),
                            success: function (result) {
                                self.message = 'Successfully updated!';
                            },
                            error: function (result) {
                                self.message = 'Please correct the errors!';

                                if (null !== result.responseJSON && null !== result.responseJSON.modelState) {
                                    var modelState = result.responseJSON.modelState;
                                    var errors = [];
                                    for (var key in modelState) {
                                        for (var i = 0; i < modelState[key].length; i++) {
                                            errors.push(modelState[key][i]);
                                        }
                                    }
                                    self.modelErrors = errors;
                                }
                            }
                        });
                    }
                });
            }
	    }
    }
</script>
