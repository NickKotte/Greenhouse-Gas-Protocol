import { gasData } from '@/constants';
import { conversions } from './tables/conversions';

const Table8: Record<string, number | string> = {
	Name: 'Steam and Heat',
	'CO2 Factor (kgCO2e)': 66.33,
	'CH4 Factor (kgCO2e)': 0.00125,
	'N2O Factor (kgCO2e)': 0.000125,
	'AR4 (kgCO2e)': 66.3985,
	'AR5 (kgCO2e)': 66.398125,
	Units: 'mmBtu',
};

export default function calculateScope2EmissionFactor(
	amount: number,
	units: string,
): Record<string, number> {
	const types: Record<
		string,
		{ columnName: keyof typeof Table8; factor: number }
	> = {
		CH4: {
			columnName: 'CH4 Factor (kgCO2e)',
			factor: 1000,
		},
		CO2: {
			columnName: 'CO2 Factor (kgCO2e)',
			factor: 1000,
		},
		N2O: {
			columnName: 'N2O Factor (kgCO2e)',
			factor: 1000,
		},
		BIO: {
			columnName: 'Biogenic CO2 (kg Biogenic CO2 per mmBtu)',
			factor: 1000,
		},
	};

	const EF = Table8;
	const EF_UNITS: string = EF?.['Units'] as string;
	const conversionKey = `${EF_UNITS}_to_${units}`;
	const conversionFactor =
		EF_UNITS === units ? 1 : conversions[conversionKey]?.value;

	if (!conversionFactor) {
		throw new Error(`No conversion factor found for ${conversionKey}`);
	}
	const result: Record<string, number> = {};
	for (const type of Object.keys(types)) {
		const emissionFactor = Number(EF?.[types[type].columnName]);
		if (isNaN(emissionFactor)) {
			result[type] = 0;
		} else {
			result[type] =
				(emissionFactor / conversionFactor) *
				(amount / types[type].factor);
		}
		result.EF = (EF?.['AR5 (kgCO2e)'] as number) ?? 0;
	}

	result.CO2e =
		result.CO2 * gasData.CO2.AR5 +
		result.CH4 * gasData.CH4.AR5 +
		result.N2O * gasData.N2O.AR5;

	return result;
}
