import { type ComboboxItem } from '@mantine/core';
import type { FuelLabel } from './types';

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

export const fuelTypes_MC: { label: FuelLabel; value: string }[] = [
	{ label: 'Motor Gasoline', value: 'motorGasoline' },
	{ label: 'Diesel Fuel', value: 'dieselFuel' },
	{ label: 'Biodiesel (100%)', value: 'biodiesel100' },
	{ label: 'Compressed Natural Gas', value: 'compressedNaturalGas' },
	{ label: 'Ethanol (100%)', value: 'ethanol100' },
	{ label: 'Jet Fuel', value: 'jetFuel' },
	{ label: 'Aviation Gasoline', value: 'aviationGasoline' },
];

export const vehicles: {
	group: FuelLabel;
	items: { label: string; value: string }[];
}[] = [
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

export const fuel_units: { label: string; value: string }[] = [
	{ label: 'Gallons (US)', value: 'gal (US)' },
	{ label: 'Liters', value: 'L' },
	{ label: 'Barrels', value: 'bbl' },
	{ label: 'Scf', value: 'scf' },
	{ label: 'Ccf', value: 'ccf' },
	{ label: 'M3', value: 'm3' },
];

export const cost_energy_units: { label: string; value: string }[] = [
	{ label: 'Btu', value: 'btu' },
	{ label: 'mmBtu', value: 'mmbtu' },
	{ label: 'Therm', value: 'therm' },
	{ label: 'kWh', value: 'kwh' },
	{ label: 'MWh', value: 'mwh' },
	{ label: 'MJ', value: 'mj' },
	{ label: 'GJ', value: 'gj' },
];

export const dropdownOptions = {
	MC: fuelTypes_MC,
	SC: fuelTypes_SC,
	VEHICLE: vehicles,
	FUEL_UNITS: fuel_units,
	ENERGY_UNITS: cost_energy_units,
};

export const gasData = {
	CO2: { AR4: 1, AR5: 1 },
	CH4: { AR4: 25, AR5: 28 },
	N2O: { AR4: 298, AR5: 265 },
	NF3: { AR4: 17200, AR5: 16100 },
	SF6: { AR4: 22800, AR5: 23500 },
};
