/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import { routes } from '@/stores/route';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import GlobalError from '@/views/GlobalError'; // Assuming you have a GlobalError component
import { lazy, Suspense } from 'react';
import { Center, Loader } from '@mantine/core';
import type { RouteElement } from '@/types';
const App = lazy(() => import('../views/App'));
const Authentication = lazy(() => import('../views/Auth'));
const NotFound = lazy(() => import('../views/NotFound'));
const Layout = lazy(() => import('../views/AppLayout'));
const ResetPassword = lazy(() => import('../views/ResetPassword'));

const ErrorBoundaryLayout = () => (
	<ErrorBoundary FallbackComponent={GlobalError}>
		<Outlet />
	</ErrorBoundary>
);

const LazyWrapper = (Component: RouteElement) => (
	<Suspense
		fallback={
			<Center h="100vh">
				<Loader />
			</Center>
		}
	>
		<Component />
	</Suspense>
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: <ErrorBoundaryLayout />,
		children: [
			{
				path: '/',
				element: LazyWrapper(App),
			},
			{
				path: ':appId',
				element: LazyWrapper(Layout),
				children: [
					...Object.values(routes).map((route) => ({
						path: route.path,
						element: route.links.length ? (
							<Outlet />
						) : route.element ? (
							LazyWrapper(route.element)
						) : (
							<div>{route.label}</div>
						),
						children: route.links.map((link) => ({
							path: link.path,
							element: link.element ? (
								LazyWrapper(link.element)
							) : (
								<div>{link.path}</div>
							),
						})),
					})),
				],
			},
			{
				path: 'login',
				element: LazyWrapper(Authentication),
			},
			{
				path: 'reset-password',
				element: LazyWrapper(ResetPassword),
			},
			{
				path: '*',
				element: LazyWrapper(NotFound),
			},
		],
	},
]);
