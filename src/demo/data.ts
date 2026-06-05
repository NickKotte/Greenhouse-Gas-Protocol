import type { User } from '@supabase/supabase-js';
import type {
	Egrid,
	Facility,
	InventoryYear,
	MobileCombustion,
	MutationOperation,
	PurchasedElectricity,
	Results,
	StationaryCombustion,
	Workbook,
} from '@/types';

export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false';
export const DEMO_WORKBOOK_ID = 'demo-green-manufacturing';
export const DEMO_USER_ID = 'demo-user';

const now = '2024-10-08T12:00:00.000Z';

export const demoUser = {
	id: DEMO_USER_ID,
	aud: 'authenticated',
	role: 'authenticated',
	email: 'demo@cleanenergy.example',
	created_at: now,
	updated_at: now,
	app_metadata: {
		provider: 'demo',
		providers: ['demo'],
		owned_workbook_id: DEMO_WORKBOOK_ID,
		roles: [],
	},
	user_metadata: {
		name: 'Portfolio Demo',
	},
} as User;

let demoWorkbook: Workbook = {
	workbook_id: DEMO_WORKBOOK_ID,
	name: 'Evergreen Components Demo',
	owner_id: DEMO_USER_ID,
	created_at: now,
	naics_code: '332710',
};

let demoFacilities: Facility[] = [
	{
		id: 'facility-detroit',
		workbook_id: DEMO_WORKBOOK_ID,
		name: 'Detroit Assembly',
		note: 'Primary fabrication and assembly floor.',
		street: '2200 Industrial Ave',
		city: 'Detroit',
		state: 'MI',
		zip: '48226',
		egrid_subregion: 'RFCM',
		square_footage: 185000,
		deleted_at: null,
	},
	{
		id: 'facility-pittsburgh',
		workbook_id: DEMO_WORKBOOK_ID,
		name: 'Pittsburgh Finishing',
		note: 'Finishing, packaging, and outbound logistics.',
		street: '14 Riverfront Dr',
		city: 'Pittsburgh',
		state: 'PA',
		zip: '15222',
		egrid_subregion: 'RFCW',
		square_footage: 92000,
		deleted_at: null,
	},
];

let demoInventoryYears: InventoryYear[] = [
	{
		id: 'inventory-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		year: 2024,
		note: 'Current operating baseline.',
		deleted_at: null,
	},
	{
		id: 'inventory-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		year: 2023,
		note: 'Prior year comparison.',
		deleted_at: null,
	},
];

let demoResults: Results[] = [
	{
		id: 'results-sc-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 423.1,
		ch4: 0.018,
		n2o: 0.004,
		co2e: 424.2,
		bio: 0,
		ef: 53.06,
	},
	{
		id: 'results-sc-detroit-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 456.7,
		ch4: 0.021,
		n2o: 0.004,
		co2e: 457.9,
		bio: 0,
		ef: 53.06,
	},
	{
		id: 'results-sc-pittsburgh-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 191.4,
		ch4: 0.009,
		n2o: 0.002,
		co2e: 192.0,
		bio: 0,
		ef: 53.06,
	},
	{
		id: 'results-mc-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 88.6,
		ch4: 0.006,
		n2o: 0.003,
		co2e: 89.6,
		bio: 0,
		ef: 10.21,
	},
	{
		id: 'results-mc-pittsburgh-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 72.3,
		ch4: 0.004,
		n2o: 0.002,
		co2e: 73.0,
		bio: 0,
		ef: 10.21,
	},
	{
		id: 'results-pe-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 248.8,
		ch4: 0.004,
		n2o: 0.001,
		co2e: 249.1,
		bio: 0,
		ef: 66.4,
	},
	{
		id: 'results-pe-pittsburgh-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 117.2,
		ch4: 0.002,
		n2o: 0.001,
		co2e: 117.4,
		bio: 0,
		ef: 66.4,
	},
	{
		id: 'results-pe-pittsburgh-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		co2: 132.9,
		ch4: 0.003,
		n2o: 0.001,
		co2e: 133.2,
		bio: 0,
		ef: 66.4,
	},
];

let demoStationaryCombustion: StationaryCombustion[] = [
	{
		id: 'sc-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-detroit',
		year: 2024,
		fuel_type: 'natGas',
		fuel_amount: 7900,
		fuel_units: 'mmBtu',
		results_id: 'results-sc-detroit-2024',
		note: 'Natural gas boilers and process heat.',
	},
	{
		id: 'sc-detroit-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-detroit',
		year: 2023,
		fuel_type: 'natGas',
		fuel_amount: 8500,
		fuel_units: 'mmBtu',
		results_id: 'results-sc-detroit-2023',
		note: 'Prior year boiler baseline.',
	},
	{
		id: 'sc-pittsburgh-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-pittsburgh',
		year: 2024,
		fuel_type: 'propane',
		fuel_amount: 3150,
		fuel_units: 'mmBtu',
		results_id: 'results-sc-pittsburgh-2024',
		note: 'Backup heat and curing ovens.',
	},
];

let demoMobileCombustion: MobileCombustion[] = [
	{
		id: 'mc-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-detroit',
		year: 2024,
		activity_type: 'fuel',
		fuel_type: 'gasoline_passenger_cars',
		fuel_amount: 8700,
		fuel_units: 'gal (US)',
		results_id: 'results-mc-detroit-2024',
		note: 'Sales and maintenance fleet.',
	},
	{
		id: 'mc-pittsburgh-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-pittsburgh',
		year: 2023,
		activity_type: 'distance',
		fuel_type: 'gasoline_light_duty_trucks',
		fuel_amount: 16400,
		fuel_units: 'mi',
		results_id: 'results-mc-pittsburgh-2023',
		note: 'Local delivery route mileage.',
	},
];

let demoPurchasedElectricity: PurchasedElectricity[] = [
	{
		id: 'pe-detroit-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-detroit',
		year: 2024,
		electricity_amount: 3750,
		electricity_units: 'mmBtu',
		results_id: 'results-pe-detroit-2024',
		note: 'Purchased electricity equivalent.',
	},
	{
		id: 'pe-pittsburgh-2024',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-pittsburgh',
		year: 2024,
		electricity_amount: 1765,
		electricity_units: 'mmBtu',
		results_id: 'results-pe-pittsburgh-2024',
		note: 'Purchased electricity equivalent.',
	},
	{
		id: 'pe-pittsburgh-2023',
		workbook_id: DEMO_WORKBOOK_ID,
		facility_id: 'facility-pittsburgh',
		year: 2023,
		electricity_amount: 2000,
		electricity_units: 'mmBtu',
		results_id: 'results-pe-pittsburgh-2023',
		note: 'Prior year purchased electricity.',
	},
];

const demoEgridByZip: Record<string, Egrid> = {
	'48226': {
		zip_code: '48226',
		subregion_1: 'RFCM',
		subregion_2: 'RFC Michigan',
		subregion_3: null,
	},
	'15222': {
		zip_code: '15222',
		subregion_1: 'RFCW',
		subregion_2: 'RFC West',
		subregion_3: null,
	},
	'60606': {
		zip_code: '60606',
		subregion_1: 'RFCW',
		subregion_2: 'RFC West',
		subregion_3: null,
	},
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const nextId = (prefix: string) => {
	const randomValue = globalThis.crypto?.randomUUID?.() ?? Date.now();
	return `${prefix}-${randomValue}`;
};

const requireResult = (resultsId: string) => {
	const result = demoResults.find((row) => row.id === resultsId);
	if (!result) throw new Error(`Missing demo results row: ${resultsId}`);
	return result;
};

const requireFacility = (facilityId: string) => {
	const facility = demoFacilities.find(
		(row) => row.id === facilityId && !row.deleted_at,
	);
	if (!facility) throw new Error(`Missing demo facility row: ${facilityId}`);
	return facility;
};

const withCombustionRelationships = <
	T extends StationaryCombustion | MobileCombustion | PurchasedElectricity,
>(
	row: T,
): T => ({
	...clone(row),
	results: clone(requireResult(row.results_id)),
	facility: clone(requireFacility(row.facility_id)),
});

export const getDemoWorkbook = () => clone(demoWorkbook);

export const updateDemoWorkbook = ({
	name,
	naicsCode,
}: {
	name?: string;
	naicsCode?: string;
}) => {
	demoWorkbook = {
		...demoWorkbook,
		name: name ?? demoWorkbook.name,
		naics_code: naicsCode ?? demoWorkbook.naics_code,
	};
	return getDemoWorkbook();
};

export const getDemoWorkbooks = () => [
	{
		workbook: getDemoWorkbook(),
	},
];

export const getDemoFacilities = () =>
	clone(demoFacilities.filter((facility) => !facility.deleted_at));

export const updateDemoFacility = ({
	operation,
	facility,
	appId,
}: {
	operation: MutationOperation;
	facility: Partial<Facility>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			if (!facility.name) throw new Error('Name is required');
			const row: Facility = {
				id: nextId('facility'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				name: facility.name,
				note: facility.note ?? null,
				street: facility.street ?? null,
				city: facility.city ?? null,
				state: facility.state ?? null,
				zip: facility.zip ?? null,
				egrid_subregion: facility.egrid_subregion ?? null,
				square_footage: facility.square_footage ?? null,
				deleted_at: null,
			};
			demoFacilities = [...demoFacilities, row];
			return clone(row);
		}
		case 'update': {
			if (!facility.id) throw new Error('ID is required');
			const row = demoFacilities.find((item) => item.id === facility.id);
			if (!row) throw new Error('Facility not found');
			Object.assign(row, facility);
			return clone(row);
		}
		case 'delete': {
			if (!facility.id) throw new Error('ID is required');
			const row = demoFacilities.find((item) => item.id === facility.id);
			if (!row) return null;
			row.deleted_at = new Date().toISOString();
			return clone(row);
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoInventoryYears = () =>
	clone(demoInventoryYears.filter((year) => !year.deleted_at));

export const updateDemoInventoryYear = ({
	operation,
	inventoryYear,
	appId,
}: {
	operation: MutationOperation;
	inventoryYear: Partial<InventoryYear>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			if (!inventoryYear.year) throw new Error('Year is required');
			const existing = demoInventoryYears.find(
				(item) => item.year === inventoryYear.year,
			);
			if (existing) {
				existing.note = inventoryYear.note ?? existing.note;
				existing.deleted_at = null;
				return clone(existing);
			}
			const row: InventoryYear = {
				id: nextId('inventory'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				year: inventoryYear.year,
				note: inventoryYear.note ?? null,
				deleted_at: null,
			};
			demoInventoryYears = [...demoInventoryYears, row];
			return clone(row);
		}
		case 'update': {
			if (!inventoryYear.id) throw new Error('ID is required');
			const row = demoInventoryYears.find(
				(item) => item.id === inventoryYear.id,
			);
			if (!row) throw new Error('Inventory year not found');
			Object.assign(row, inventoryYear);
			return clone(row);
		}
		case 'delete': {
			if (!inventoryYear.id) throw new Error('ID is required');
			const row = demoInventoryYears.find(
				(item) => item.id === inventoryYear.id,
			);
			if (!row) return null;
			row.deleted_at = new Date().toISOString();
			return clone(row);
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoResults = () => clone(demoResults);

export const updateDemoResults = ({
	operation,
	results,
	appId,
}: {
	operation: MutationOperation;
	results: Partial<Results>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			const row: Results = {
				id: nextId('results'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				co2: results.co2 ?? 0,
				ch4: results.ch4 ?? 0,
				n2o: results.n2o ?? 0,
				co2e: results.co2e ?? 0,
				ef: results.ef ?? 0,
				bio: results.bio ?? 0,
			};
			demoResults = [...demoResults, row];
			return clone(row);
		}
		case 'update': {
			if (!results.id) throw new Error('Results ID is required');
			const row = demoResults.find((item) => item.id === results.id);
			if (!row) throw new Error('Results row not found');
			Object.assign(row, results);
			return clone(row);
		}
		case 'delete': {
			if (!results.id) throw new Error('Results ID is required');
			const row = demoResults.find((item) => item.id === results.id);
			demoResults = demoResults.filter((item) => item.id !== results.id);
			return row ? clone(row) : null;
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoStationaryCombustion = () =>
	demoStationaryCombustion.map(withCombustionRelationships);

export const updateDemoStationaryCombustion = ({
	operation,
	stationaryCombustion,
	results,
	appId,
}: {
	operation: MutationOperation;
	stationaryCombustion: Partial<StationaryCombustion>;
	results: Partial<Results>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			const result = updateDemoResults({ operation: 'add', results, appId });
			if (!result?.id) throw new Error('Results ID could not be created');
			const row: StationaryCombustion = {
				id: nextId('sc'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				facility_id: stationaryCombustion.facility_id || '',
				year: stationaryCombustion.year || new Date().getFullYear(),
				fuel_type: stationaryCombustion.fuel_type ?? null,
				fuel_amount: stationaryCombustion.fuel_amount ?? null,
				fuel_units: stationaryCombustion.fuel_units ?? null,
				results_id: result.id,
				note: stationaryCombustion.note ?? null,
			};
			demoStationaryCombustion = [...demoStationaryCombustion, row];
			return withCombustionRelationships(row);
		}
		case 'update': {
			if (!stationaryCombustion.id) throw new Error('ID is required');
			updateDemoResults({ operation: 'update', results, appId });
			const row = demoStationaryCombustion.find(
				(item) => item.id === stationaryCombustion.id,
			);
			if (!row) throw new Error('Stationary combustion row not found');
			Object.assign(row, stationaryCombustion);
			return withCombustionRelationships(row);
		}
		case 'delete': {
			if (!stationaryCombustion.id) throw new Error('ID is required');
			const row = demoStationaryCombustion.find(
				(item) => item.id === stationaryCombustion.id,
			);
			const deletedRow = row ? withCombustionRelationships(row) : null;
			demoStationaryCombustion = demoStationaryCombustion.filter(
				(item) => item.id !== stationaryCombustion.id,
			);
			if (row) {
				updateDemoResults({
					operation: 'delete',
					results: { id: row.results_id },
					appId,
				});
			}
			return deletedRow;
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoMobileCombustion = () =>
	demoMobileCombustion.map(withCombustionRelationships);

export const updateDemoMobileCombustion = ({
	operation,
	mobileCombustion,
	results,
	appId,
}: {
	operation: MutationOperation;
	mobileCombustion: Partial<MobileCombustion>;
	results: Partial<Results>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			const result = updateDemoResults({ operation: 'add', results, appId });
			if (!result?.id) throw new Error('Results ID could not be created');
			const row: MobileCombustion = {
				id: nextId('mc'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				facility_id: mobileCombustion.facility_id || '',
				year: mobileCombustion.year || new Date().getFullYear(),
				activity_type: mobileCombustion.activity_type ?? 'fuel',
				fuel_type: mobileCombustion.fuel_type ?? null,
				fuel_amount: mobileCombustion.fuel_amount ?? null,
				fuel_units: mobileCombustion.fuel_units ?? null,
				results_id: result.id,
				note: mobileCombustion.note ?? null,
			};
			demoMobileCombustion = [...demoMobileCombustion, row];
			return withCombustionRelationships(row);
		}
		case 'update': {
			if (!mobileCombustion.id) throw new Error('ID is required');
			updateDemoResults({ operation: 'update', results, appId });
			const row = demoMobileCombustion.find(
				(item) => item.id === mobileCombustion.id,
			);
			if (!row) throw new Error('Mobile combustion row not found');
			Object.assign(row, mobileCombustion);
			return withCombustionRelationships(row);
		}
		case 'delete': {
			if (!mobileCombustion.id) throw new Error('ID is required');
			const row = demoMobileCombustion.find(
				(item) => item.id === mobileCombustion.id,
			);
			const deletedRow = row ? withCombustionRelationships(row) : null;
			demoMobileCombustion = demoMobileCombustion.filter(
				(item) => item.id !== mobileCombustion.id,
			);
			if (row) {
				updateDemoResults({
					operation: 'delete',
					results: { id: row.results_id },
					appId,
				});
			}
			return deletedRow;
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoPurchasedElectricity = () =>
	demoPurchasedElectricity.map(withCombustionRelationships);

export const updateDemoPurchasedElectricity = ({
	operation,
	purchasedElectricity,
	results,
	appId,
}: {
	operation: MutationOperation;
	purchasedElectricity: Partial<PurchasedElectricity>;
	results: Partial<Results>;
	appId?: string;
}) => {
	switch (operation) {
		case 'add': {
			const result = updateDemoResults({ operation: 'add', results, appId });
			if (!result?.id) throw new Error('Results ID could not be created');
			const row: PurchasedElectricity = {
				id: nextId('pe'),
				workbook_id: appId || DEMO_WORKBOOK_ID,
				facility_id: purchasedElectricity.facility_id || '',
				year: purchasedElectricity.year || new Date().getFullYear(),
				electricity_amount:
					purchasedElectricity.electricity_amount ?? null,
				electricity_units:
					purchasedElectricity.electricity_units ?? null,
				results_id: result.id,
				note: purchasedElectricity.note ?? null,
			};
			demoPurchasedElectricity = [...demoPurchasedElectricity, row];
			return withCombustionRelationships(row);
		}
		case 'update': {
			if (!purchasedElectricity.id) throw new Error('ID is required');
			updateDemoResults({ operation: 'update', results, appId });
			const row = demoPurchasedElectricity.find(
				(item) => item.id === purchasedElectricity.id,
			);
			if (!row) throw new Error('Purchased electricity row not found');
			Object.assign(row, purchasedElectricity);
			return withCombustionRelationships(row);
		}
		case 'delete': {
			if (!purchasedElectricity.id) throw new Error('ID is required');
			const row = demoPurchasedElectricity.find(
				(item) => item.id === purchasedElectricity.id,
			);
			const deletedRow = row ? withCombustionRelationships(row) : null;
			demoPurchasedElectricity = demoPurchasedElectricity.filter(
				(item) => item.id !== purchasedElectricity.id,
			);
			if (row) {
				updateDemoResults({
					operation: 'delete',
					results: { id: row.results_id },
					appId,
				});
			}
			return deletedRow;
		}
		default:
			throw new Error('Invalid operation');
	}
};

export const getDemoEgridSubregion = (zipCode: string) =>
	clone(demoEgridByZip[zipCode] ?? null);

export const getDemoWorkbookUsers = () => [
	{
		user_id: DEMO_USER_ID,
		email: demoUser.email,
		role: 'owner',
	},
	{
		user_id: 'demo-collaborator',
		email: 'ops.manager@example.com',
		role: 'viewer',
	},
];
