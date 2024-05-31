import type { Conversion } from '@/types';

export const conversions: Record<string, Conversion> = {
	//mass
	lb_to_g: { value: 453.59237, units: 'gram per pound' },
	lb_to_kg: { value: 0.45359237, units: 'kilogram per pound' },
	'lb_to_metric ton': {
		value: 0.000453592,
		units: 'metric ton / pound',
	},
	kg_to_lb: { value: 2.20462262, units: 'pound per kilogram' },
	'kg_to_metric ton': { value: 0.001, units: 'kilogram per metric ton' },
	'short ton_to_lb': { value: 2000, units: 'lb / short ton' },
	'short ton_to_kg': { value: 907.18474, units: 'kg / short ton' },
	'metric ton_to_lb': { value: 2204.62262, units: 'lb / metric ton' },
	'metric ton_to_kg': { value: 1000, units: 'kg / metric ton' },
	'metric ton_to_short ton': {
		value: 1.10231131,
		units: 'short ton / metric ton',
	},
	'lbCO2e/MWh_to_kgCO2e/kWh': {
		value: 0.000453592,
		units: 'kgCO2e / kWh',
	},

	//volume
	'scf_to_gal (US)': {
		value: 7.48051948,
		units: 'US gallon per standard cubic foot',
	},
	scf_to_bbl: {
		value: 0.178107607,
		units: 'barrel per standard cubic foot',
	},
	scf_to_L: {
		value: 28.3168466,
		units: 'liter per standard cubic foot',
	},
	scf_to_m3: {
		value: 0.028316847,
		units: 'cubic meter per standard cubic foot',
	},
	'gal (US)_to_bbl': { value: 0.0238, units: 'barrel per US gallon' },
	'gal (US)_to_L': { value: 3.78541178, units: 'liter per US gallon' },
	'gal (US)_to_m3': {
		value: 0.003785412,
		units: 'cubic meter per US gallon',
	},
	'bbl_to_gal (US)': { value: 42, units: 'US gallon per barrel' },
	bbl_to_L: { value: 158.987295, units: 'liter per barrel' },
	bbl_to_m3: { value: 0.158987295, units: 'cubic meter per barrel' },
	L_to_m3: { value: 0.001, units: 'cubic meter per liter' },
	'L_to_gal (US)': { value: 0.264172052, units: 'US gallon per liter' },
	m3_to_bbl: { value: 6.28981077, units: 'barrel per cubic meter' },
	'm3_to_gal (US)': {
		value: 264.172052,
		units: 'US gallon per cubic meter',
	},
	m3_to_L: { value: 1000, units: 'liter per cubic meter' },
	'gal (US)_to_gal (US)': { value: 1, units: '' },
	m3_to_m3: { value: 1, units: '' },
	L_to_L: { value: 1, units: '' },
	'gal (US)_to_scf': { value: 0.133680556, units: '' },
	L_to_scf: { value: 0.035314667, units: '' },
	ccf_to_scf: { value: 100, units: '' },
	m3_to_scf: { value: 35.31466671, units: '' },
	'gal (US)_to_ccf': { value: 0.001336806, units: '' },
	scf_to_ccf: { value: 0.01, units: '' },

	//energy
	kWh_to_Btu: { value: 3412.14163, units: 'Btu per kWh' },
	kWh_to_KJ: { value: 3600, units: 'KJ per kWh' },
	MJ_to_GJ: { value: 0.001, units: 'GJ per MJ' },
	MJ_to_mmBtu: { value: 0.000947817, units: 'mmBtu per MJ' },
	GJ_to_mmBtu: { value: 0.94781712, units: 'mmBtu per GJ' },
	kWh_to_mmBtu: { value: 0.003412142, units: 'mmBtu per kWh' },
	MWh_to_mmBtu: { value: 3.41214163, units: 'mmBtu per MWh' },
	Btu_to_mmBtu: { value: 0.000001, units: 'mmBtu per Btu' },
	MJ_to_kWh: { value: 0.277777778, units: 'kWh per MJ' },
	GJ_to_kWh: { value: 277.777778, units: 'kWh per GJ' },
	mmBtu_to_GJ: { value: 1.05505585, units: 'GJ per mmBtu' },
	mmBtu_to_kWh: { value: 293.07107, units: 'kWh per mmBtu' },
	MWh_to_kWh: { value: 1000, units: 'kWh per MWh' },
	therm_to_Btu: { value: 100000, units: 'Btu per therm' },
	therm_to_GJ: { value: 0.105505585, units: 'GJ per therm' },
	therm_to_kWh: { value: 29.307107, units: 'kWh per therm' },
	kWh_to_MWh: { value: 0.001, units: 'MWh per kWh' },
	MWh_to_MWh: { value: 1, units: '' },
	Btu_to_MWh: { value: 2.93071e-7, units: 'MWh per Btu' },
	Btu_to_kWh: { value: 0.000293071, units: 'kWh per Btu' },
	mmBtu_to_MWh: { value: 0.29307107, units: 'MWh per mmBtu' },
	GJ_to_MWh: { value: 0.277777778, units: 'MWh per GJ' },
	therm_to_MWh: { value: 0.029307107, units: 'MWh per therm' },
	kWh_to_therm: { value: 0.034121416, units: 'therm per kWh' },
	MWh_to_therm: { value: 34.12141635, units: 'therm per MWh' },
	Btu_to_therm: { value: 0.00001, units: 'therm per Btu' },
	mmBtu_to_therm: { value: 10, units: 'therm per mmBtu' },
	MJ_to_therm: { value: 0.009478171, units: 'therm per MJ' },
	GJ_to_therm: { value: 9.4781712, units: 'therm per GJ' },
	therm_to_therm: { value: 1, units: '' },
	mmBtu_to_mmBtu: { value: 1, units: '' },
	kWh_to_kWh: { value: 1, units: '' },
	GJ_to_GJ: { value: 1, units: '' },
	MJ_to_MJ: { value: 1, units: '' },
	mmBtu_to_Btu: { value: 1000000, units: 'Btu per mmBtu' },
	kWh_to_MJ: { value: 3.6, units: 'MJ per kWh' },
	kWh_to_GJ: { value: 0.0036, units: 'GJ per kWh' },
	mmBtu_to_MJ: { value: 1000, units: 'MJ per mmBtu' },
	therm_to_mmBtu: { value: 0.1, units: 'mmBtu / therm' },

	//distance
	mile_to_km: { value: 1.609344, units: 'km per mile' },
	'nautical mile_to_mile': {
		value: 1.150779,
		units: 'mile per nautical mile',
	},
	km_to_mile: { value: 0.621371192, units: 'mile per km' },
	'mile_to_passenger-mile': {
		value: 1,
		units: 'passenger-mile per mile',
	},
	'km_to_passenger-mile': {
		value: 0.621371192,
		units: 'passenger-mile per km',
	},
	'mile_to_vehicle-mile': { value: 1, units: 'vehicle-mile per mile' },
	'km_to_vehicle-mile': {
		value: 0.621371192,
		units: 'vehicle-mile per km',
	},
	'passenger-km_to_passenger-mile': {
		value: 0.621371192,
		units: 'vehicle-mile per km',
	},
	'vehicle-km_to_vehicle-mile': {
		value: 0.621371192,
		units: 'vehicle-mile per km',
	},
	'passenger-mile_to_passenger-km': {
		value: 1.609344,
		units: 'vehicle-km per mile',
	},
	'vehicle-mile_to_vehicle-km': {
		value: 1.609344,
		units: 'vehicle-km per mile',
	},
	'passenger-mile_to_mile': {
		value: 1,
		units: 'mile per passenger-mile',
	},
	'passenger-km_to_mile': {
		value: 0.621371192,
		units: 'mile per passenger-km',
	},
	'mile_to_vehicle-km': {
		value: 1.609344,
		units: 'vehicle-km per mile',
	},
	'passenger-mile_to_km': {
		value: 1.609344,
		units: 'km per passenger-mile',
	},
	'ton-mile_to_tonne-km': {
		value: 1.459972,
		units: 'tonne-km per ton-mile',
	},
	'tonne-km_to_ton-mile': {
		value: 0.684944643,
		units: 'tonne-km per ton-mile',
	},
	'passenger-mile_to_vehicle-mile': {
		value: 1,
		units: 'vehicle-mile per passenger-mile',
	},
	'vehicle-mile_to_passenger-mile': {
		value: 1,
		units: 'passenger-mile per vehicle-mile',
	},
	'passenger-km_to_vehicle-km': {
		value: 1,
		units: 'vehicle-km per passenger-km',
	},
	'vehicle-km_to_passenger-km': {
		value: 1,
		units: 'passenger-km per vehicle-km',
	},
	'passenger-mile_to_vehicle-km': {
		value: 1.609344,
		units: 'vehicle-km per passenger-mile',
	},
	'vehicle-mile_to_passenger-km': {
		value: 1.609344,
		units: 'passenger-km per vehicle-mile',
	},
	'passenger-km_to_vehicle-mile': {
		value: 0.621371192,
		units: 'vehicle-mile per passenger-km',
	},
	'vehicle-km_to_passenger-mile': {
		value: 0.621371192,
		units: 'passenger-mile per vehicle-km',
	},
};
