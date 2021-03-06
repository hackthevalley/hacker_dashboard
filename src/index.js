import React        from 'react';
import ReactDOM     from 'react-dom';
import {unregister} from './registerServiceWorker';
import * as Sentry  from '@sentry/browser';
import 'noty/lib/noty.css';
import 'noty/lib/themes/metroui.css';

// Router Stuff
import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import {connectRouter, routerMiddleware, ConnectedRouter}       from 'connected-react-router';
import {createBrowserHistory}                                   from 'history';
import {Provider}                                               from 'react-redux';
import thunk                                                    from 'redux-thunk';

import * as Reducers from './redux/reducers';
import './scss/index.scss';
import {ApplicationClosed} from "./pages/ApplicationClosed";

console.log(`Running version ${process.env.REACT_APP_VERSION} [${process.env.NODE_ENV}]`); // Just so we know the version

// Only register Sentry if not in development
if (process.env.NODE_ENV !== 'development') {
    Sentry.init({
        dsn: 'https://0ebb44791ea44d37b77c7a0d3381c047@sentry.io/1324972',
        environment: process.env.NODE_ENV,
        release: `hacker-dashboard@${process.env.REACT_APP_VERSION}`
    });
}

const history         = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store           = createStore(
    connectRouter(history)(
        combineReducers(Reducers)
    ),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ApplicationClosed/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

unregister();
