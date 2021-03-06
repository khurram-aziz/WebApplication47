﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Material.aspx.cs" Inherits="WebApplication.AngularJs.Material" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no" />

    <title>Angular Material - Starter App</title>
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto:400,700' />
    <link rel="stylesheet" href="/Content/angular-material.css" />
    <link rel="stylesheet" href="app.css" />
</head>

<body ng-cloak layout="column" ng-controller="AppController as app">

    <!-- Container #1 (see wireframe) -->
    <md-toolbar layout="row" class="md-toolbar-tools">
        <md-button class="menu md-icon-button" hide-gt-sm ng-click="app.toggleList()" aria-label="Show User List">
            <md-icon md-svg-icon="menu"></md-icon>
        </md-button>
        <h1>Angular Material - Starter App</h1>
    </md-toolbar>

    <!-- Container #2 -->
    <div flex layout="row">

        <!-- Container #3 -->
        <md-sidenav class="md-whiteframe-4dp" md-is-locked-open="$mdMedia('gt-sm')" md-component-id="left" ng-click="app.toggleList()">
            <!-- Custom UsersList component -->
            <users-list users="app.users" selected="app.selected" on-selected="app.selectUser(user)"></users-list>
        </md-sidenav>

        <!-- Container #4 -->
        <md-content flex id="content">
            <!-- Custom UserDetails component -->
            <user-details selected="app.selected"></user-details>
        </md-content>
    </div>

    <script src="/Scripts/angularjs-bundle.js"></script>
    <script src="/Scripts/material-app.js"></script>
</body>
</html>
