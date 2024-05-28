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
	companyName: string;
	inventoryYears: InventoryYear[];
	facilities: Facility[];
};

export interface StationaryCombustionData {
	facilityId: string;
	year: number;
	fuel: string;
	amountOfFuel: number;
	units: string;
	co2Tonnes: number;
	ch4Tonnes: number;
	n2oTonnes: number;
	co2eTonnes: number;
	biofuelCo2Tonnes: number;
	efKgCo2e: number;
}

export interface MobileCombustionData {
	year: number;
	description: string;
	facilityId: string;
	activityType: string;
	fuelSource: string;
	vehicleType: string;
	activityAmount: number;
	unitOfFuelAmount: string;
	co2Tonnes: number;
	ch4Tonnes: number;
	n2oTonnes: number;
	co2eTonnes: number;
	biofuelCo2Tonnes: number;
	efKgCo2e: number;
}

export interface PurchasedElectricityData {
	year: number;
	facilityId: string;
	amountOfElectricityConsumption: number;
	units: string;
	calculationApproach: string;
	typeOfEmissionFactor: string;
	co2Tonnes: number;
	ch4Tonnes: number;
	n2oTonnes: number;
	co2eTonnes: number;
	efKgCo2ePerKwh: number;
}