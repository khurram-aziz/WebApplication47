<template>
    <v-app>
        <v-content>
            <v-container>Hello world</v-container>
            <v-alert color="success" icon="check_circle" value="true">
                This is a success alert.
            </v-alert>
            <div class="text-xs-center">
                <v-badge overlay left color="purple" overlap>
                    <v-icon slot="badge" dark>done</v-icon>
                    <v-icon large color="grey lighten-1">account_circle</v-icon>
                </v-badge>
                <v-badge overlap color="orange">
                    <v-icon slot="badge" dark>notifications</v-icon>
                    <v-icon large color="grey darken-1">account_box</v-icon>
                </v-badge>
            </div>
            <v-form v-model="valid">
                <v-text-field label="Name" v-model="name" :rules="nameRules" :counter="10" required></v-text-field>
                <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
            </v-form>
        </v-content>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                valid: false,
                name: '',
                nameRules: [
                    (v) => !!v || 'Name is required',
                    (v) => v.length <= 10 || 'Name must be less than 10 characters'
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'E-mail is required',
                    (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ]
            }
        }
    }
</script>
