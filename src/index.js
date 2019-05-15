import './polyfill'
import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-dom';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';

import './index.css';
import App from './App';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));