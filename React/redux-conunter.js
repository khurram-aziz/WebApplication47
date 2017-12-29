import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <p>
                Clicked: {value} times
                {' '}
                <button onClick={(e) => { e.preventDefault(); onIncrement(e); }}>+</button>
                {' '}
                <button onClick={(e) => { e.preventDefault(); onDecrement(e); }}>-</button>
                {' '}
                <button onClick={(e) => { e.preventDefault(); this.incrementIfOdd(); }}>Increment if odd</button>
                {' '}
                <button onClick={(e) => { e.preventDefault(); this.incrementAsync(); }}>Increment async</button>
            </p>
        )
    }
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

const store = createStore(counter);

const render = () => ReactDOM.render(
    <Counter
        value={store.getState()}
        onIncrement={() => { store.dispatch({ type: 'INCREMENT' }); }}
        onDecrement={() => { store.dispatch({ type: 'DECREMENT' }); }}
    />,
    document.getElementById('app')
);

render();
store.subscribe(render);