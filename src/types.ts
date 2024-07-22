import type { Icon } from '@tabler/icons-react';
import type { Database } from './supabase/supabase';

export type UserWorkbooksType = {
	workbook_id: string;
	workbook_name: string;
	owner_id: string;
	owner_email: string;
};

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

export type Workbook = Database['public']['Tables']['workbook']['Row'];
export type Facility = Database['public']['Tables']['facilities']['Row'];
export type InventoryYear =
	Database['public']['Tables']['inventory_years']['Row'];

export type MutationOperation = 'add' | 'update' | 'delete';

export type AppState = {
	inventoryYears: InventoryYear[];
	facilities: Facility[];
	workbook: Workbook;
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
	activityAmount: number;
	units: string;
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
	co2Tonnes: number;
	ch4Tonnes: number;
	n2oTonnes: number;
	co2eTonnes: number;
	efKgCo2ePerKwh: number;
}

export type WorkbookItem =
	| StationaryCombustionData
	| MobileCombustionData
	| PurchasedElectricityData;

export type FuelLabel =
	| 'Motor Gasoline'
	| 'Diesel Fuel'
	| 'Biodiesel (100%)'
	| 'Compressed Natural Gas'
	| 'Ethanol (100%)'
	| 'Jet Fuel'
	| 'Aviation Gasoline';

export type ActivityType = 'fuel' | 'distance';

export type SelectorValue = {
	dropdownValue: string;
	numberValue: number;
};

export interface RowComponentProps<T> {
	item: T;
}

export type Conversion = {
	value: number;
	units: string;
};

export interface StationaryCombustionTableProps {
	'Fuel Type': string;
	'Heat Content (HHV)'?: string | number;
	'CO2 Factor (kg CO2 per mmBtu)'?: number;
	'CH4 Factor (g CH4 per mmBtu)'?: number;
	'N2O Factor (g N2O per mmBtu)'?: number;
	'AR4 (kgCO2e)'?: number;
	'AR5 (kgCO2e)'?: number;
	Units?: string;
	'Biogenic CO2 Factor (kg Biogenic CO2 per mmBtu)'?: number;
}

export interface MobileCombustionTableProps {
	'Mobile Fuel': string;
	'CO2 Factor (kg unit)'?: number;
	'CH4 Factor (kg unit)'?: number;
	'N2O Factor (kg unit)'?: number;
	'Biogenic CO2 (kg Biogenic CO2 per mmBtu)'?: number;
	'AR4 (kgCO2e)'?: number;
	'AR5 (kgCO2e)'?: number;
	'Standardized unit': string;
	'Default Average Fuel Efficiency (mpgmpge)'?: string | number;
	'MPG Units'?: string;
	'kg CO4'?: number;
	'kg NO2'?: number;
}

export interface GridRegionLocationBasedProps {
	'Grid Region Location Based'?: string;
	'CO2 Factor (kgkWh)'?: number;
	'CH4 Factor (kgkWh)'?: number;
	'N2O Factor (kgkWh)'?: number;
	'AR4 (kgCO2e)'?: number;
	'AR5 (kgCO2e)'?: number;
	Units?: string;
}

export type WorkbookType =
	| 'StationaryCombustion'
	| 'MobileCombustion'
	| 'PurchasedElectricity';