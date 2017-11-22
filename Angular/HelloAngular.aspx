<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HelloAngular.aspx.cs" Inherits="WebApplication.Angular.HelloAngular" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <app-root></app-root>
        <script type="text/javascript" src="/Scripts/inline.bundle.js"></script>
        <script type="text/javascript" src="/Scripts/polyfills.bundle.js"></script>
        <script type="text/javascript" src="/Scripts/styles.bundle.js"></script>
        <script type="text/javascript" src="/Scripts/vendor.bundle.js"></script>
        <script type="text/javascript" src="/Scripts/main.bundle.js"></script>
    </form>
</body>
</html>
