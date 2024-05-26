import type { AppState } from '@/types';
import { map } from 'nanostores';

export const $appState = map<AppState>({
	inventoryYears: [
		{
			year: '2022',
			description: 'New factory, partially closed due to covid',
		},
		{
			year: '2023',
			description: 'New factory, partially closed due to covid',
		},
	],
	facilities: [
		{
			name: 'Main',
			streetAddress: '123 Main St',
			city: 'New York',
			state: 'NY',
			zip: '10002',
			eGrid: 'RFCW',
			squareFootage: 10000,
		},
		{
			name: 'Storage',
			streetAddress: '456 Storage St',
			city: 'New York',
			state: 'NY',
			zip: '10002',
			eGrid: 'MROW',
			squareFootage: 10000,
		},
	],
});
