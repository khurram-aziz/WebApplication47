<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReduxTodo.aspx.cs" Inherits="WebApplication.React.ReduxTodo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="app"></div>
    <script src="/Scripts/react-bundle.js"></script>
    <script src="/Scripts/redux-todo.js"></script>
</asp:Content>
