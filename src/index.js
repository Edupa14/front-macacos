import React from 'react';

import ReactDOM from 'react-dom';


import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Provider } from "react-redux"
import Routes from './routes';
import generateStore from './store/store'
import './css/global.css'

ReactDOM.render(
    <Provider store={generateStore()}>
        <Routes />
    </Provider>
    ,
    document.getElementById('general-container')
);
reportWebVitals();
