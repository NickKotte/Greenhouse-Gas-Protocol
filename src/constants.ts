import { type ComboboxItem, type ComboboxItemGroup } from '@mantine/core';
import type {
	MobileCombustionData,
	NaicsCode,
	PurchasedElectricityData,
	StationaryCombustionData,
} from './types';

export const emissionsColors: Record<string, string> = {
	co2: 'red',
	ch4: 'blue',
	n2o: 'orange',
	co2e: 'purple',
	bio: 'green',
	ef: 'yellow',
};

export const fuelTypes_SC: ComboboxItem[] = [
	{
		label: 'Agricultural Byproducts',

		value: 'agByprod',
	},
	{
		label: 'Anthracite Coal',
		value: 'anthCoal',
	},
	{
		label: 'Asphalt and Road Oil',
		value: 'asphalt',
	},
	{
		label: 'Aviation Gasoline',
		value: 'avGas',
	},
	{
		label: 'Biodiesel (100%)',
		value: 'biodiesel',
	},
	{
		label: 'Bituminous Coal',
		value: 'bitCoal',
	},
	{
		label: 'Blast Furnace Gas',
		value: 'blastFurnGas',
	},
	{
		label: 'Butane',
		value: 'butane',
	},
	{
		label: 'Butylene',
		value: 'butylene',
	},
	{
		label: 'Coal Coke',
		value: 'coalCoke',
	},
	{
		label: 'Coke Oven Gas',
		value: 'cokeOvenGas',
	},
	{
		label: 'Crude Oil',
		value: 'crudeOil',
	},
	{
		label: 'Distillate Fuel Oil No. 1',
		value: 'dfo1',
	},
	{
		label: 'Distillate Fuel Oil No. 2',
		value: 'dfo2',
	},
	{
		label: 'Distillate Fuel Oil No. 4',
		value: 'dfo4',
	},
	{
		label: 'Ethane',
		value: 'ethane',
	},
	{
		label: 'Ethanol (100%)',
		value: 'ethanol',
	},
	{
		label: 'Ethylene',
		value: 'ethylene',
	},
	{
		label: 'Fuel Gas',
		value: 'fuelGas',
	},
	{
		label: 'Heavy Gas Oils',
		value: 'hgo',
	},
	{
		label: 'Isobutane',
		value: 'isobutane',
	},
	{
		label: 'Isobutylene',
		value: 'isobutylene',
	},
	{
		label: 'Kerosene',
		value: 'kerosene',
	},
	{
		label: 'Kerosene-Type Jet Fuel',
		value: 'jetFuel',
	},
	{
		label: 'Landfill Gas',
		value: 'landfillGas',
	},
	{
		label: 'Lignite Coal',
		value: 'ligCoal',
	},
	{
		label: 'Liquefied Petroleum Gases (LPG)',
		value: 'lpg',
	},
	{
		label: 'Lubricants',
		value: 'lubricants',
	},
	{
		label: 'Mixed (Commercial Sector)',
		value: 'mixedComm',
	},
	{
		label: 'Mixed (Electric Power Sector)',
		value: 'mixedElec',
	},
	{
		label: 'Mixed (Industrial Coking)',
		value: 'mixedIndCoke',
	},
	{
		label: 'Mixed (Industrial Sector)',
		value: 'mixedInd',
	},
	{
		label: 'Motor Gasoline',
		value: 'mogas',
	},
	{
		label: 'Municipal Solid Waste',
		value: 'msw',
	},
	{
		label: 'Naphtha (<401 deg F)',
		value: 'naphtha',
	},
	{
		label: 'Natural Gas',
		value: 'natGas',
	},
	{
		label: 'Natural Gasoline',
		value: 'natGasoline',
	},
	{
		label: 'Other Biomass Gases',
		value: 'otherBioGas',
	},
	{
		label: 'Other Oil (>401 deg F)',
		value: 'otherOil',
	},
	{
		label: 'Peat',
		value: 'peat',
	},
	{
		label: 'Pentanes Plus',
		value: 'pentanes',
	},
	{
		label: 'Petrochemical Feedstocks',
		value: 'petFeedstocks',
	},
	{
		label: 'Petroleum Coke',
		value: 'petCoke',
	},
	{
		label: 'Petroleum Coke (Solid)',
		value: 'petCokeSolid',
	},
	{
		label: 'Plastics',
		value: 'plastics',
	},
	{
		label: 'Propane',
		value: 'propane',
	},
	{
		label: 'Propane Gas',
		value: 'propaneGas',
	},
	{
		label: 'Propylene',
		value: 'propylene',
	},
	{
		label: 'Rendered Animal Fat',
		value: 'animalFat',
	},
	{
		label: 'Residual Fuel Oil No. 5',
		value: 'rfo5',
	},
	{
		label: 'Residual Fuel Oil No. 6',
		value: 'rfo6',
	},
	{
		label: 'Solid Byproducts',
		value: 'solidByprod',
	},
	{
		label: 'Special Naphtha',
		value: 'specialNaphtha',
	},
	{
		label: 'Sub-bituminous Coal',
		value: 'subBitCoal',
	},
	{
		label: 'Tires',
		value: 'tires',
	},
	{
		label: 'Unfinished Oils',
		value: 'unfinishedOils',
	},
	{
		label: 'Used Oil',
		value: 'usedOil',
	},
	{
		label: 'Vegetable Oil',
		value: 'vegOil',
	},
	{
		label: 'Wood and Wood Residuals',
		value: 'wood',
	},
];

export const fuelTypes_MC: ComboboxItem[] = [
	{ label: 'Motor Gasoline', value: 'motorGasoline' },
	{ label: 'Diesel Fuel', value: 'dieselFuel' },
	{ label: 'Biodiesel (100%)', value: 'biodiesel100' },
	{ label: 'Compressed Natural Gas', value: 'compressedNaturalGas' },
	{ label: 'Ethanol (100%)', value: 'ethanol100' },
	{ label: 'Jet Fuel', value: 'jetFuel' },
	{ label: 'Aviation Gasoline', value: 'aviationGasoline' },
];

export const vehicles: ComboboxItemGroup<ComboboxItem>[] = [
	{
		group: 'Motor Gasoline',

		items: [
			{
				label: 'Gasoline Passenger Cars',
				value: 'gasoline_passenger_cars',
			},
			{
				label: 'Gasoline Light-duty Trucks (Vans, Pickup Trucks, SUVs)',
				value: 'gasoline_light_duty_trucks',
			},
			{
				label: 'Gasoline Heavy-duty Vehicles',
				value: 'gasoline_heavy_duty_vehicles',
			},
			{
				label: 'Hybrid (Gasoline) Passenger Cars',
				value: 'hybrid_gasoline_passenger_cars',
			},
			{
				label: 'Gasoline Agricultural Equipment',
				value: 'gasoline_agricultural_equipment',
			},
			{
				label: 'Gasoline Ships and Boats',
				value: 'gasoline_ships_and_boats',
			},
			{ label: 'Gasoline Motorcycles', value: 'gasoline_motorcycles' },
			{
				label: 'Other Gasoline Non-Road Vehicles',
				value: 'other_gasoline_non_road_vehicles',
			},
		],
	},
	{
		group: 'Diesel Fuel',
		items: [
			{ label: 'Diesel Passenger Cars', value: 'diesel_passenger_cars' },
			{
				label: 'Diesel Light-duty Trucks',
				value: 'diesel_light_duty_trucks',
			},
			{
				label: 'Diesel Medium- and Heavy-duty Vehicles',
				value: 'diesel_medium_and_heavy_duty_vehicles',
			},
			{
				label: 'Diesel Agricultural Equipment',
				value: 'diesel_agricultural_equipment',
			},
			{
				label: 'Diesel Ships and Boats',
				value: 'diesel_ships_and_boats',
			},
			{
				label: 'Other Diesel Non-Road Vehicles',
				value: 'other_diesel_non_road_vehicles',
			},
		],
	},
	{
		group: 'Biodiesel (100%)',
		items: [
			{
				label: 'Biodiesel Passenger Cars',
				value: 'biodiesel_passenger_cars',
			},
			{
				label: 'Biodiesel Light-duty Vehicles',
				value: 'biodiesel_light_duty_vehicles',
			},
			{
				label: 'Biodiesel Medium- and Heavy-duty Vehicles',
				value: 'biodiesel_medium_and_heavy_duty_vehicles',
			},
		],
	},
	{
		group: 'Compressed Natural Gas',
		items: [
			{
				label: 'CNG Light-duty Vehicles',
				value: 'cng_light_duty_vehicles',
			},
			{
				label: 'CNG Medium- and Heavy-duty Vehicles',
				value: 'cng_medium_and_heavy_duty_vehicles',
			},
		],
	},
	{
		group: 'Ethanol (100%)',
		items: [
			{
				label: 'Ethanol Light-duty Vehicles',
				value: 'ethanol_light_duty_vehicles',
			},
			{
				label: 'Ethanol Medium- and Heavy-duty Vehicles',
				value: 'ethanol_medium_and_heavy_duty_vehicles',
			},
		],
	},
	{
		group: 'Jet Fuel',
		items: [{ label: 'Jet Fuel Aircraft', value: 'jet_fuel_aircraft' }],
	},
	{
		group: 'Aviation Gasoline',
		items: [
			{
				label: 'Aviation Gasoline Aircraft',
				value: 'aviation_gasoline_aircraft',
			},
		],
	},
];

export const fuel_units: ComboboxItem[] = [
	{ label: 'Gallons (US)', value: 'gal (US)' },
	{ label: 'Liters', value: 'L' },
	{ label: 'Barrels', value: 'bbl' },
	{ label: 'Scf', value: 'scf' },
	{ label: 'Ccf', value: 'ccf' },
	{ label: 'M3', value: 'm3' },
];

export const cost_energy_units: ComboboxItem[] = [
	{ label: 'Btu', value: 'Btu' },
	{ label: 'mmBtu', value: 'mmBtu' },
	{ label: 'Therm', value: 'therm' },
	{ label: 'kWh', value: 'kWh' },
	{ label: 'MWh', value: 'MWh' },
	{ label: 'MJ', value: 'MJ' },
	{ label: 'GJ', value: 'GJ' },
];

export const distance_units: ComboboxItem[] = [
	{ label: 'Miles', value: 'mi' },
	{ label: 'Kilometers', value: 'km' },
	{ label: 'Nautical Miles', value: 'nm' },
];

export const dropdownOptions = {
	MC: fuelTypes_MC,
	SC: fuelTypes_SC,
	VEHICLE: vehicles,
	FUEL_UNITS: fuel_units,
	ENERGY_UNITS: cost_energy_units,
	DISTANCE_UNITS: distance_units,
};

export const gasData = {
	CO2: { AR4: 1, AR5: 1 },
	CH4: { AR4: 25, AR5: 28 },
	N2O: { AR4: 298, AR5: 265 },
	NF3: { AR4: 17200, AR5: 16100 },
	SF6: { AR4: 22800, AR5: 23500 },
};

export const mockData: {
	PurchasedElectricity: PurchasedElectricityData[];
	MobileCombustion: MobileCombustionData[];
	StationaryCombustion: StationaryCombustionData[];
} = {
	PurchasedElectricity: [
		{
			year: 2020,
			facilityId: 'Warehouse 1',
			amountOfElectricityConsumption: 1580.664,
			units: 'kWh',
			co2Tonnes: 0.35775,
			ch4Tonnes: 6.74181e-6,
			n2oTonnes: 6.74181e-7,
			co2eTonnes: 0.35811493,
			efKgCo2ePerKwh: 66.398125,
		},
		{
			year: 2020,
			facilityId: 'Warehouse 2',
			amountOfElectricityConsumption: 1580.664,
			units: 'kWh',
			co2Tonnes: 0,
			ch4Tonnes: 0,
			n2oTonnes: 0,
			co2eTonnes: 0,
			efKgCo2ePerKwh: 0,
		},
		{
			year: 2021,
			facilityId: 'Warehouse 3',
			amountOfElectricityConsumption: 1580.664,
			units: 'kWh',
			co2Tonnes: 0,
			ch4Tonnes: 0,
			n2oTonnes: 0,
			co2eTonnes: 0,
			efKgCo2ePerKwh: 0,
		},
		{
			year: 2022,
			facilityId: 'Warehouse 4',
			amountOfElectricityConsumption: 1580.664,
			units: 'kWh',
			co2Tonnes: 0,
			ch4Tonnes: 0,
			n2oTonnes: 0,
			co2eTonnes: 0,
			efKgCo2ePerKwh: 0,
		},
		{
			year: 2023,
			facilityId: 'Warehouse 5',
			amountOfElectricityConsumption: 1580.664,
			units: 'kWh',
			co2Tonnes: 0,
			ch4Tonnes: 0,
			n2oTonnes: 0,
			co2eTonnes: 0,
			efKgCo2ePerKwh: 0,
		},
	],
	MobileCombustion: [
		{
			year: 2022,
			description: '10 delivery trucks',
			facilityId: 'warehouse 1',
			activityType: 'fuel',
			fuelSource: 'gasoline_passenger_cars',
			activityAmount: 100,
			units: 'scf',
			co2Tonnes: 6.568,
			ch4Tonnes: 0.000291,
			n2oTonnes: 0.000061,
			co2eTonnes: 6.592,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 8.812,
		},
		{
			year: 2022,
			description: 'sales cars, 5',
			facilityId: 'warehouse 2',
			activityType: 'fuel',
			fuelSource: 'ethanol_light_duty_vehicles',
			activityAmount: 10,
			units: 'gal (US)',
			co2Tonnes: 0.0,
			ch4Tonnes: 0.000009,
			n2oTonnes: 0.000011,
			co2eTonnes: 0.003,
			biofuelCo2Tonnes: 0.058,
			efKgCo2e: 0.313,
		},
		{
			year: 2022,
			description: '',
			facilityId: 'warehouse 3',
			activityType: 'distance',
			fuelSource: 'gasoline_passenger_cars',
			activityAmount: 2250,
			units: 'mile',
			co2Tonnes: 0.878,
			ch4Tonnes: 0.000039,
			n2oTonnes: 0.000008,
			co2eTonnes: 0.881,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 8.812,
		},
	],
	StationaryCombustion: [
		{
			facilityId: 'Warehouse 0',
			year: 2022,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 6.477,
			ch4Tonnes: 0.0003,
			n2oTonnes: 0.00006,
			co2eTonnes: 6.501,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 65.013,
		},
		{
			facilityId: 'Warehouse 1',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 9.427,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 9.5,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 95.002,
		},
		{
			facilityId: 'Warehouse 3',
			year: 2022,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 9.772,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 9.845,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 98.452,
		},
		{
			facilityId: 'Warehouse 4',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 9.772,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 9.845,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 98.452,
		},
		{
			facilityId: 'Warehouse 5',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 9.772,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 9.845,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 98.452,
		},
		{
			facilityId: 'Warehouse 6',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 9.772,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 9.845,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 98.452,
		},
		{
			facilityId: 'Warehouse 7',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 100,
			units: 'mmBtu',
			co2Tonnes: 10.369,
			ch4Tonnes: 0.0011,
			n2oTonnes: 0.00016,
			co2eTonnes: 10.442,
			biofuelCo2Tonnes: 0.0,
			efKgCo2e: 104.422,
		},
		{
			facilityId: 'Warehouse 8',
			year: 2019,
			fuel: 'anthCoal',
			amountOfFuel: 0,
			units: '',
			co2Tonnes: 0,
			ch4Tonnes: 0,
			n2oTonnes: 0,
			co2eTonnes: 0,
			biofuelCo2Tonnes: 0,
			efKgCo2e: 0,
		},
	],
};

export const naicsCodes: NaicsCode[] = [
	{ label: 'Food Manufacturing', code: 311 },
	{ label: 'Beverage and Tobacco Product Manufacturing', code: 312 },
	{ label: 'Textile Mills', code: 313 },
	{ label: 'Textile Product Mills', code: 314 },
	{ label: 'Apparel Manufacturing', code: 315 },
	{ label: 'Leather and Allied Product Manufacturing', code: 316 },
	{ label: 'Wood Product Manufacturing', code: 321 },
	{ label: 'Paper Manufacturing', code: 322 },
	{ label: 'Printing and Related Support Activities', code: 323 },
	{ label: 'Petroleum and Coal Products Manufacturing', code: 324 },
	{ label: 'Chemical Manufacturing', code: 325 },
	{ label: 'Plastics and Rubber Products Manufacturing', code: 326 },
	{ label: 'Nonmetallic Mineral Product Manufacturing', code: 327 },
	{ label: 'Primary Metal Manufacturing', code: 331 },
	{ label: 'Fabricated Metal Product Manufacturing', code: 332 },
	{ label: 'Machinery Manufacturing', code: 333 },
	{ label: 'Computer and Electronic Product Manufacturing', code: 334 },
	{
		label: 'Electrical Equipment, Appliance, and Component Manufacturing',
		code: 335,
	},
	{ label: 'Transportation Equipment Manufacturing', code: 336 },
	{ label: 'Furniture and Related Product Manufacturing', code: 337 },
	{ label: 'Miscellaneous Manufacturing', code: 339 },
];