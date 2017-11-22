<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HelloVue.aspx.cs" Inherits="WebApplication.Vue.HelloVue" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="app">
        Your Name: <input type="text" v-model="boundName" /><br />
        <button v-on:click="toggle($event)">Toggle</button>{{ message }}
    </div>
    <script src="/Scripts/vue.js"></script>
    <script type="text/javascript">
        var app = new Vue({
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
    </script>
</asp:Content>
