import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers/todo-reducers';
import App from './components/todo-components';

const store = createStore(todoApp);

const render = () => ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

render();
store.subscribe(render);