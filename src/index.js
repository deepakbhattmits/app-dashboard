/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
// import App from './components/App';
import ReactRouter from './router/ReactRouter';
import { store } from './helpers';
import './assets/styles/index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeDefault = createStore(
	store,
	composeEnhancers(applyMiddleware(reduxThunk))
);
const rootElement = document.querySelector('#root'); //    main entry point.
ReactDOM.render(
	<Provider store={storeDefault}>
		{/* <App /> */}
		<ReactRouter />
	</Provider>,
	rootElement
);
