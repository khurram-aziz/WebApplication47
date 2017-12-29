<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HelloVueComponent.aspx.cs" Inherits="WebApplication.Vue.HelloVueComponent" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="app"></div>
    <script src="/Scripts/vue-bundle.js"></script>
    <script src="/Scripts/hello-vue-component.js"></script>
</asp:Content>
