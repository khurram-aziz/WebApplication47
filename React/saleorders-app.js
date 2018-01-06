import React from 'react';
import ReactDOM from 'react-dom';
import saleOrderService from './saleOrderService';
import HomePage from './components/saleOrder-components';

const render = () => ReactDOM.render(
    <HomePage service={saleOrderService} />,
    document.getElementById('app')
);

render();
saleOrderService.load('appName', 'packageName', 'appVersion', 'login', 'password');