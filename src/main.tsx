import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import mantineModals from '@/components/modals';
import { mantineTheme } from './mantine/theme.ts';
import { router } from './router/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import { CustomSpotlight } from './mantine/spotlight.tsx';
import UtilityBar from '@/components/UtilityBar.tsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ColorSchemeScript defaultColorScheme="auto" />
		<MantineProvider theme={mantineTheme} defaultColorScheme="dark">
			<QueryClientProvider client={queryClient}>
				<Notifications />
				<CustomSpotlight />
				<ModalsProvider modals={mantineModals}>
					<UtilityBar />
					<Box w="100%" h="100%">
						<RouterProvider router={router} />
					</Box>
				</ModalsProvider>
			</QueryClientProvider>
		</MantineProvider>
	</React.StrictMode>,
);
