<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HelloVuetify.aspx.cs" Inherits="WebApplication.Vue.HelloVuetify" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link href="/Content/vuetify.css" rel="stylesheet" />

    <div id="app"></div>

    <script src="/Scripts/vue-bundle.js"></script>
    <script src="/Scripts/hello-vuetify.js"></script>
</asp:Content>
