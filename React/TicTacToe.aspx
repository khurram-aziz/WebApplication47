﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="TicTacToe.aspx.cs" Inherits="WebApplication.React.TicTacToe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        body {
            font: 14px "Century Gothic", Futura, sans-serif;
            margin: 20px;
        }

        ol, ul {
            padding-left: 30px;
        }

        .board-row:after {
            clear: both;
            content: "";
            display: table;
        }

        .status {
            margin-bottom: 10px;
        }

        .square {
            background: #fff;
            border: 1px solid #999;
            float: left;
            font-size: 24px;
            font-weight: bold;
            line-height: 34px;
            height: 34px;
            margin-right: -1px;
            margin-top: -1px;
            padding: 0;
            text-align: center;
            width: 34px;
        }

            .square:focus {
                outline: none;
            }

        .kbd-navigation .square:focus {
            background: #ddd;
        }

        .game {
            display: flex;
            flex-direction: row;
        }

        .game-info {
            margin-left: 20px;
        }
    </style>
    <div id="errors" style="background: #c00; color: #fff; display: none; margin: -20px -20px 20px; padding: 20px; white-space: pre-wrap;">
    </div>
    <div id="root"></div>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    <script src="/Scripts/react-bundle.js"></script>
    <script src="/Scripts/tictactoe.js"></script>
    <script>
        window.addEventListener('mousedown', function (e) {
            e.preventDefault();
            document.body.classList.add('mouse-navigation');
            document.body.classList.remove('kbd-navigation');
        });
        window.addEventListener('keydown', function (e) {
            if (e.keyCode === 9) {
                document.body.classList.add('kbd-navigation');
                document.body.classList.remove('mouse-navigation');
            }
        });
        window.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
        window.onerror = function (message, source, line, col, error) {
            var text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
            errors.textContent += text + '\n';
            errors.style.display = '';
        };
        console.error = (function (old) {
            return function error() {
                errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
                errors.style.display = '';
                old.apply(this, arguments);
            }
        })(console.error);
    </script>
</asp:Content>
