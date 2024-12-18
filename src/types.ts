import type { Icon } from '@tabler/icons-react';
import type { Database } from './supabase/supabase';

export type UserWorkbooksType = {
	workbook_id: string;
	workbook_name: string;
	owner_id: string;
	owner_email: string;
};
export type RouteElement = React.LazyExoticComponent<React.ComponentType>;
export type RouteLink = {
	label: string;
	path?: string;
	icon?: Icon;
	element?: RouteElement;
};
export type Route = {
	label: string;
	icon: Icon;
	path: string;
	links: RouteLink[];
	element?: React.LazyExoticComponent<() => JSX.Element>;
};

export type Workbook = Database['public']['Tables']['workbook']['Row'];
export type Facility = Database['public']['Tables']['facilities']['Row'];
export type Egrid = Database['public']['Tables']['egrid']['Row'];

export interface EmissionResults {
	co2: number;
	co2e: number;
	ch4: number;
	bio: number;
	n2o: number;
	ef: number;
	total: number;
}

export interface Scope1Results {
	total: number;
	stationaryResults: EmissionResults;
	combustionResults: EmissionResults;
}

export interface Scope2Results {
	total: number;
	electricityResults: EmissionResults;
}

export interface YearlyEmissions {
	year: number;
	emissions: EmissionResults;
	scope1: Scope1Results;
	scope2: Scope2Results;
}
export interface FacilityEmissions {
	facility_name: string;
	results: {
		co2: number;
		co2e: number;
		ch4: number;
		bio: number;
		n2o: number;
		ef: number;
		total: number;
	};
	total_emissions: number;
	facility_id: string;
	yearly_emissions: YearlyEmissions[];
}
export interface AggregatedEmissions {
	[facilityId: string]: FacilityEmissions;
}

type BaseTable<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];
type WithResultsAndFacility<T> = T & {
	results?: Results;
	facility?: Facility;
};
export type InventoryYear =
	Database['public']['Tables']['inventory_years']['Row'];
export type StationaryCombustion = WithResultsAndFacility<
	BaseTable<'stationary_combustion'>
>;
export type MobileCombustion = WithResultsAndFacility<
	BaseTable<'mobile_combustion'>
>;
export type PurchasedElectricity = WithResultsAndFacility<
	BaseTable<'purchased_electricity'>
>;
export type Results = BaseTable<'results'>;

export type WorkbookItem =
	| StationaryCombustion
	| MobileCombustion
	| PurchasedElectricity;

export type AddEmissionArgType =
	Database['public']['Functions']['add_emission_data']['Args'];

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

export type NaicsCode = {
	label: string;
	code: number;
};