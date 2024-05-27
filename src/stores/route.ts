import { atom, map } from 'nanostores';
import { Route } from '@/types';
import {
	IconBuilding,
	IconBuildingFactory2,
	IconDeviceDesktopAnalytics,
	IconNotebook,
	IconSitemap,
	IconSettings,
	IconTruckDelivery,
	IconBuildingWarehouse,
} from '@tabler/icons-react';
import Settings from '@/views/Settings';
import { Workbook } from '@/views/Workbook';
import { StationaryCombustion } from '@/views/StationaryCombustion';

export const routes: Record<string, Route> = {
	company: {
		label: 'My Company',
		icon: IconBuilding,
		path: 'company',
		links: [
			{
				label: 'Create Report',
			},
			{
				label: 'Workbook',
				path: 'workbook',
				icon: IconNotebook,
				element: Workbook,
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
			},
			{
				label: 'Purchased Electricity',
				path: 'purchased-electricity',
				icon: IconSitemap,
			},
		],
	},
	facilities: {
		label: 'Facilities',
		icon: IconBuildingWarehouse,
		path: 'facilities',
		links: [
			{ label: 'Locations', path: 'locations' },
			{ label: 'Maintenance', path: 'maintenance' },
			{ label: 'Equipment', path: 'equipment' },
		],
	},
	administration: {
		label: 'Administration',
		icon: IconDeviceDesktopAnalytics,
		path: 'administration',
		links: [
			{
				label: 'User Management',
				path: 'user-management',
			},
			{
				label: 'Roles & Permissions',
				path: 'roles-permissions',
			},
			{ label: 'Audit Logs', path: 'audit-logs' },
		],
	},
	settings: {
		label: 'Settings',
		icon: IconSettings,
		path: 'settings',
		element: Settings,
		links: [],
	},
};

const path = window.location.pathname;
const route =
	Object.values(routes).find((r) => r.path === path.split('/')[1]) ||
	routes.company;
export const $routing = map<Route>(route);
export const $activeLink = atom();