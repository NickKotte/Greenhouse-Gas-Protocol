import { createBrowserRouter } from "react-router-dom";
import App from '../views/App';
import { Authentication } from '../views/Auth';
import { ProtectedPath } from '../components/ProtectedPath';
import Layout from '@/views/AppLayout';
import NotFound from '@/views/NotFound';
import { routes } from '@/stores/route';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import GlobalError from '@/views/GlobalError'; // Assuming you have a GlobalError component

// eslint-disable-next-line react-refresh/only-export-components
const ErrorBoundaryLayout = () => (
	<ErrorBoundary FallbackComponent={GlobalError}>
		<Outlet />
	</ErrorBoundary>
);

export const router = createBrowserRouter([
	{
		path: '/',
		element: <ErrorBoundaryLayout />,
		children: [
			{
				path: '/',
				element: <App />,
			},
			{
				path: ':appId',
				element: (
					<ProtectedPath redirectUrl="/login">
						<Layout />
					</ProtectedPath>
				),
				children: [
					...Object.values(routes).map((route) => ({
						path: route.path,
						element: route.links.length ? (
							<Outlet />
						) : route.element ? (
							<route.element />
						) : (
							<div>{route.label}</div>
						),
						children: route.links.map((link) => ({
							path: link.path,
							element: link.element ? (
								<link.element />
							) : (
								<div>{link.path}</div>
							),
						})),
					})),
				],
			},
			{
				path: 'login',
				element: <Authentication />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

