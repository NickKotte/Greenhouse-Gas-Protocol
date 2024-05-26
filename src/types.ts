import type { Icon } from '@tabler/icons-react';

export type RouteLink = {
	label: string;
	path?: string;
	icon?: Icon;
	element?: React.ComponentType;
};
export type Route = {
	label: string;
	icon: Icon;
	path: string;
	links: RouteLink[];
	element?: React.ComponentType;
};

export type InventoryYear = {
	year: string;
	description: string;
};

export type Facility = {
	name: string;
	streetAddress: string;
	city: string;
	state: string;
	zip: string;
	eGrid: string;
	squareFootage: number;
};

export type AppState = {
	inventoryYears: InventoryYear[];
	facilities: Facility[];
};
