<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HelloModule.aspx.cs" Inherits="WebApplication.Vue.HelloModule" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="app">
        Your Name: <input type="text" v-model="boundName" /><br />
        <button v-on:click="toggle($event)">Toggle</button>{{ message }}
    </div>
    <script src="/Scripts/hello-module.js"></script>
</asp:Content>
