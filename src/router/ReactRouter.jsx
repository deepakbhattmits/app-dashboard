/** @format */

import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from '../helpers/history';
import { LoadingSpinner } from '../components/reusable/LoadingSpinner';
import { NotFound } from '../components/reusable/NotFound';
const App = lazy(() => import('../components/App'));
const SpecificMain = lazy(() => import('../components/SpecificMain'));

const ReactRouter = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Router history={createBrowserHistory}>
				<Switch>
					<Route exact path='/'>
						<App />
					</Route>
					<Route path='/product-details/:id'>
						<SpecificMain SpecificMain />
					</Route>
					<Route path='*'>
						<NotFound />
					</Route>
				</Switch>
			</Router>
		</Suspense>
	);
};
export default ReactRouter;
