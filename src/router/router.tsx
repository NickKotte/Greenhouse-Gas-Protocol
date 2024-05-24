import { createBrowserRouter } from "react-router-dom";
import App from "../views/Hello";
import { Authentication } from "../views/Auth";
import { ProtectedPath } from '../components/ProtectedPath';
import Layout from '@/views/AppLayout';

export const router = createBrowserRouter([
	{
		path: '/auth',
		element: <Authentication />,
	},
	{
		path: '/',
		element: (
			<ProtectedPath redirectUrl="/auth">
				<Layout />
			</ProtectedPath>
		),
		children: [
			{
				path: '',
				element: <App />,
			},
			// Add more protected routes here
		],
	},
]);