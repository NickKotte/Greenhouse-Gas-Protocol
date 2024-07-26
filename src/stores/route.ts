import { atom, deepMap } from 'nanostores';
import { Route } from '@/types';
import {
	IconBuilding,
	IconBuildingFactory2,
	IconDeviceDesktopAnalytics,
	IconNotebook,
	IconSitemap,
	IconTruckDelivery,
	IconFileAnalytics,
} from '@tabler/icons-react';
import { lazy } from 'react';
const Workbook = lazy(() =>
	import('@/views/Workbook').then((module) => ({
		default: module.Workbook,
	})),
);
const StationaryCombustion = lazy(() =>
	import('@/views/StationaryCombustion').then((module) => ({
		default: module.StationaryCombustion,
	})),
);
const MobileCombustion = lazy(() =>
	import('@/views/MobileCombustion').then((module) => ({
		default: module.MobileCombustion,
	})),
);
const PurchasedElectricity = lazy(() =>
	import('@/views/PurchasedElectricity').then((module) => ({
		default: module.PurchasedElectricity,
	})),
);
const UserManagement = lazy(
	() => import('@/views/Administration/UserManagement'),
);
const Results = lazy(() =>
	import('@/views/Results').then((module) => ({ default: module.Results })),
);

export const routes: Record<string, Route> = {
	company: {
		label: 'GREENHOUSE GAS PROTOCOL',
		icon: IconBuilding,
		path: 'company',
		links: [
			{
				label: 'Create Report',
			},
			{
				label: 'Workbook Data',
				path: 'workbook',
				icon: IconNotebook,
				element: Workbook,
			},
			{
				label: 'Scope 1',
			},
			{
				label: 'Stationary Combustion',
				path: 'stationary-combustion',
				icon: IconBuildingFactory2,
				element: StationaryCombustion,
			},
			{
				label: 'Mobile Combustion',
				path: 'mobile-combustion',
				icon: IconTruckDelivery,
				element: MobileCombustion,
			},
			{
				label: 'Scope 2',
			},
			{
				label: 'Purchased Electricity',
				path: 'purchased-electricity',
				icon: IconSitemap,
				element: PurchasedElectricity,
			},
			{
				label: 'Results',
			},
			{
				label: 'View Report',
				path: 'results',
				element: Results,
				icon: IconFileAnalytics,
			},
		],
	},
	administration: {
		label: 'Administration',
		icon: IconDeviceDesktopAnalytics,
		path: 'administration',
		element: UserManagement,
		links: [],
	},
};

const path = window.location.pathname;
const route =
	Object.values(routes).find((r) => r.path === path.split('/')[1]) ||
	routes.company;
export const $routing = deepMap<Route>(route);
export const $activeLink = atom();
