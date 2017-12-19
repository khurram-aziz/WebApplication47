<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HelloReact.aspx.cs" Inherits="WebApplication.React.HelloReact" %>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <div id="root"></div>
    <script src="/Scripts/react.js"></script> 
    <script src="/Scripts/react-dom.js"></script> 
    <script src="/Scripts/clock.js"></script>
</asp:Content>
