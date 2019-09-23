import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();

import { Provider } from 'react-redux';
import { store, history } from './_helpers';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';


// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
, document.getElementById('root'));