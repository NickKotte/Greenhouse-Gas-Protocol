import { EF_Stationary_Combustion } from '../../public/tables.json';
import { conversions } from './tables/conversions';
import { StationaryCombustionTableProps } from '@/types';
import { gasData, fuelTypes_SC } from '@/constants';

export default function calculateEmissionFactor(
	fuel: string,
	amountOfFuel: number,
	units: string,
): Record<string, number> {
	const types: Record<
		string,
		{ columnName: keyof StationaryCombustionTableProps; factor: number }
	> = {
		CH4: {
			columnName: 'CH4 Factor (g CH4 per mmBtu)',
			factor: 1000000,
		},
		CO2: {
			columnName: 'CO2 Factor (kg CO2 per mmBtu)',
			factor: 1000,
		},
		N2O: {
			columnName: 'N2O Factor (g N2O per mmBtu)',
			factor: 1000000,
		},
		BIO: {
			columnName: 'Biogenic CO2 Factor (kg Biogenic CO2 per mmBtu)',
			factor: 1000,
		},
	};
	if (!EF_Stationary_Combustion) {
		throw new Error('Could not find EF stationary combustion table');
	}

	// get the corresponding fuel label since we recieve the value and the table needs the label
	const fuelLabel = fuelTypes_SC.find((row) => row.value === fuel)?.label;

	const EF = EF_Stationary_Combustion.find(
		(row: StationaryCombustionTableProps) => row['Fuel Type'] === fuelLabel,
	);
	if (!EF) {
		throw new Error(`No emission factor found for ${fuel}->${fuelLabel}`);
	}

	const EF_UNITS = EF?.Units;
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
				(amountOfFuel / types[type].factor);
		}
		result.EF = (EF?.['AR5 (kgCO2e)'] as number) ?? 0;
	}
	result.CO2e =
		result.CO2 * gasData.CO2.AR4 +
		result.CH4 * gasData.CH4.AR4 +
		result.N2O * gasData.N2O.AR4;

	return result;
}
