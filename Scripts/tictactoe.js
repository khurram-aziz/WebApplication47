(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Square(props) {
    return React.createElement(
        "button",
        { className: "square", onClick: props.onClick },
        props.value
    );
}

var Board = function (_React$Component) {
    _inherits(Board, _React$Component);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: "renderSquare",
        value: function renderSquare(i) {
            var _this2 = this;

            return React.createElement(Square, {
                value: this.props.squares[i],
                onClick: function onClick() {
                    return _this2.props.onClick(i);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(0),
                    this.renderSquare(1),
                    this.renderSquare(2)
                ),
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(3),
                    this.renderSquare(4),
                    this.renderSquare(5)
                ),
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(6),
                    this.renderSquare(7),
                    this.renderSquare(8)
                )
            );
        }
    }]);

    return Board;
}(React.Component);

var Game = function (_React$Component2) {
    _inherits(Game, _React$Component2);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this3 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this3.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
        return _this3;
    }

    _createClass(Game, [{
        key: "handleClick",
        value: function handleClick(i) {
            var history = this.state.history.slice(0, this.state.stepNumber + 1);
            var current = history[history.length - 1];
            var squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext ? "X" : "O";
            this.setState({
                history: history.concat([{
                    squares: squares
                }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            });
        }
    }, {
        key: "jumpTo",
        value: function jumpTo(step) {
            this.setState({
                stepNumber: step,
                xIsNext: step % 2 === 0
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var history = this.state.history;
            var current = history[this.state.stepNumber];
            var winner = calculateWinner(current.squares);

            var moves = history.map(function (step, move) {
                var desc = move ? 'Go to move #' + move : 'Go to game start';
                return React.createElement(
                    "li",
                    { key: move },
                    React.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this4.jumpTo(move);
                            } },
                        desc
                    )
                );
            });

            var status = void 0;
            if (winner) {
                status = "Winner: " + winner;
            } else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }

            return React.createElement(
                "div",
                { className: "game" },
                React.createElement(
                    "div",
                    { className: "game-board" },
                    React.createElement(Board, {
                        squares: current.squares,
                        onClick: function onClick(i) {
                            return _this4.handleClick(i);
                        }
                    })
                ),
                React.createElement(
                    "div",
                    { className: "game-info" },
                    React.createElement(
                        "div",
                        null,
                        status
                    ),
                    React.createElement(
                        "ol",
                        null,
                        moves
                    )
                )
            );
        }
    }]);

    return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
    var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i = 0; i < lines.length; i++) {
        var _lines$i = _slicedToArray(lines[i], 3),
            a = _lines$i[0],
            b = _lines$i[1],
            c = _lines$i[2];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJSZWFjdFxcdGljdGFjdG9lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUMsU0FBUyxNQUFULENBQWdCLEtBQWhCLEVBQXVCO0FBQ3BCLFdBQ0k7QUFBQTtBQUFBLFVBQVEsV0FBVSxRQUFsQixFQUEyQixTQUFTLE1BQU0sT0FBMUM7QUFDSyxjQUFNO0FBRFgsS0FESjtBQUtIOztJQUVLLEs7Ozs7Ozs7Ozs7O3FDQUNXLEMsRUFBRztBQUFBOztBQUNaLG1CQUNJLG9CQUFDLE1BQUQ7QUFDSSx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLENBQW5CLENBRFg7QUFFSSx5QkFBUztBQUFBLDJCQUFNLE9BQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBTjtBQUFBO0FBRmIsY0FESjtBQU1IOzs7aUNBRVE7QUFDTCxtQkFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsc0JBQUssV0FBVSxXQUFmO0FBQ0sseUJBQUssWUFBTCxDQUFrQixDQUFsQixDQURMO0FBRUsseUJBQUssWUFBTCxDQUFrQixDQUFsQixDQUZMO0FBR0sseUJBQUssWUFBTCxDQUFrQixDQUFsQjtBQUhMLGlCQURKO0FBTUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUNLLHlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsQ0FETDtBQUVLLHlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsQ0FGTDtBQUdLLHlCQUFLLFlBQUwsQ0FBa0IsQ0FBbEI7QUFITCxpQkFOSjtBQVdJO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFdBQWY7QUFDSyx5QkFBSyxZQUFMLENBQWtCLENBQWxCLENBREw7QUFFSyx5QkFBSyxZQUFMLENBQWtCLENBQWxCLENBRkw7QUFHSyx5QkFBSyxZQUFMLENBQWtCLENBQWxCO0FBSEw7QUFYSixhQURKO0FBbUJIOzs7O0VBOUJlLE1BQU0sUzs7SUFpQ3BC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QUFKLEVBQU8sQ0FBUCxDQUZVLEVBR1YsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FIVSxFQUlWLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBSlUsRUFLVixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUxVLEVBTVYsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsQ0FOVSxFQU9WLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBUFUsRUFRVixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQVJVLENBQWQ7QUFVQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUFBLHNDQUNqQixNQUFNLENBQU4sQ0FEaUI7QUFBQSxZQUM1QixDQUQ0QjtBQUFBLFlBQ3pCLENBRHlCO0FBQUEsWUFDdEIsQ0FEc0I7O0FBRW5DLFlBQUksUUFBUSxDQUFSLEtBQWMsUUFBUSxDQUFSLE1BQWUsUUFBUSxDQUFSLENBQTdCLElBQTJDLFFBQVEsQ0FBUixNQUFlLFFBQVEsQ0FBUixDQUE5RCxFQUEwRTtBQUN0RSxtQkFBTyxRQUFRLENBQVIsQ0FBUDtBQUNIO0FBQ0o7QUFDRCxXQUFPLElBQVA7QUFDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCLvu79mdW5jdGlvbiBTcXVhcmUocHJvcHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzcXVhcmVcIiBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrfT5cclxuICAgICAgICAgICAge3Byb3BzLnZhbHVlfVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgKTtcclxufVxyXG5cclxuY2xhc3MgQm9hcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyU3F1YXJlKGkpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U3F1YXJlXHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5zcXVhcmVzW2ldfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy5vbkNsaWNrKGkpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvYXJkLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNxdWFyZSgwKX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcXVhcmUoMSl9XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3F1YXJlKDIpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvYXJkLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNxdWFyZSgzKX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcXVhcmUoNCl9XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3F1YXJlKDUpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvYXJkLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclNxdWFyZSg2KX1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTcXVhcmUoNyl9XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3F1YXJlKDgpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaGlzdG9yeTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZXM6IEFycmF5KDkpLmZpbGwobnVsbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgc3RlcE51bWJlcjogMCxcclxuICAgICAgICAgICAgeElzTmV4dDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2xpY2soaSkge1xyXG4gICAgICAgIGNvbnN0IGhpc3RvcnkgPSB0aGlzLnN0YXRlLmhpc3Rvcnkuc2xpY2UoMCwgdGhpcy5zdGF0ZS5zdGVwTnVtYmVyICsgMSk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudCA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXTtcclxuICAgICAgICBjb25zdCBzcXVhcmVzID0gY3VycmVudC5zcXVhcmVzLnNsaWNlKCk7XHJcbiAgICAgICAgaWYgKGNhbGN1bGF0ZVdpbm5lcihzcXVhcmVzKSB8fCBzcXVhcmVzW2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3F1YXJlc1tpXSA9IHRoaXMuc3RhdGUueElzTmV4dCA/IFwiWFwiIDogXCJPXCI7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnkuY29uY2F0KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmVzOiBzcXVhcmVzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBzdGVwTnVtYmVyOiBoaXN0b3J5Lmxlbmd0aCxcclxuICAgICAgICAgICAgeElzTmV4dDogIXRoaXMuc3RhdGUueElzTmV4dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXBUbyhzdGVwKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHN0ZXBOdW1iZXI6IHN0ZXAsXHJcbiAgICAgICAgICAgIHhJc05leHQ6IChzdGVwICUgMikgPT09IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgaGlzdG9yeSA9IHRoaXMuc3RhdGUuaGlzdG9yeTtcclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gaGlzdG9yeVt0aGlzLnN0YXRlLnN0ZXBOdW1iZXJdO1xyXG4gICAgICAgIGNvbnN0IHdpbm5lciA9IGNhbGN1bGF0ZVdpbm5lcihjdXJyZW50LnNxdWFyZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBtb3ZlcyA9IGhpc3RvcnkubWFwKChzdGVwLCBtb3ZlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2MgPSBtb3ZlID9cclxuICAgICAgICAgICAgICAgICdHbyB0byBtb3ZlICMnICsgbW92ZSA6XHJcbiAgICAgICAgICAgICAgICAnR28gdG8gZ2FtZSBzdGFydCc7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkga2V5PXttb3ZlfT5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMuanVtcFRvKG1vdmUpfT57ZGVzY308L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzdGF0dXM7XHJcbiAgICAgICAgaWYgKHdpbm5lcikge1xyXG4gICAgICAgICAgICBzdGF0dXMgPSBcIldpbm5lcjogXCIgKyB3aW5uZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RhdHVzID0gXCJOZXh0IHBsYXllcjogXCIgKyAodGhpcy5zdGF0ZS54SXNOZXh0ID8gXCJYXCIgOiBcIk9cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdhbWVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2FtZS1ib2FyZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxCb2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVzPXtjdXJyZW50LnNxdWFyZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2kgPT4gdGhpcy5oYW5kbGVDbGljayhpKX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdhbWUtaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3N0YXR1c308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8b2w+e21vdmVzfTwvb2w+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuUmVhY3RET00ucmVuZGVyKDxHYW1lIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikpO1xyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlV2lubmVyKHNxdWFyZXMpIHtcclxuICAgIGNvbnN0IGxpbmVzID0gW1xyXG4gICAgICAgIFswLCAxLCAyXSxcclxuICAgICAgICBbMywgNCwgNV0sXHJcbiAgICAgICAgWzYsIDcsIDhdLFxyXG4gICAgICAgIFswLCAzLCA2XSxcclxuICAgICAgICBbMSwgNCwgN10sXHJcbiAgICAgICAgWzIsIDUsIDhdLFxyXG4gICAgICAgIFswLCA0LCA4XSxcclxuICAgICAgICBbMiwgNCwgNl1cclxuICAgIF07XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgW2EsIGIsIGNdID0gbGluZXNbaV07XHJcbiAgICAgICAgaWYgKHNxdWFyZXNbYV0gJiYgc3F1YXJlc1thXSA9PT0gc3F1YXJlc1tiXSAmJiBzcXVhcmVzW2FdID09PSBzcXVhcmVzW2NdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcXVhcmVzW2FdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcbiJdfQ==
