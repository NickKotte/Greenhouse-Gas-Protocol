import { gasData, vehicles } from '@/constants';
import { conversions } from './tables/conversions';
import { Mobile_S1_EF } from '../../public/tables.json';
import type { ActivityType, MobileCombustionTableProps } from '@/types';
import type { ComboboxItemGroup } from '@mantine/core';

export default function calculateScope2EmissionFactor(
	activityType: ActivityType,
	fuelSource: string,
	amount: number,
	units: string,
): Record<string, number> {
	const types: Record<
		string,
		{ columnName: keyof MobileCombustionTableProps; factor: number }
	> = {
		CH4: {
			columnName: 'CH4 Factor (kg unit)',
			factor: 1000,
		},
		CO2: {
			columnName: 'CO2 Factor (kg unit)',
			factor: 1000,
		},
		N2O: {
			columnName: 'N2O Factor (kg unit)',
			factor: 1000,
		},
		BIO: {
			columnName: 'Biogenic CO2 (kg Biogenic CO2 per mmBtu)',
			factor: 1000,
		},
	};

	// get the corresponding vehicle label since we recieve the value and the table needs the label
	const group = vehicles.find((option) =>
		(option as ComboboxItemGroup).items.find(
			(item) => typeof item !== 'string' && item.value === fuelSource,
		),
	);
	const fuelLabel = group?.items.find((item) => item.value === fuelSource);
	const key = `${group?.group} - ${fuelLabel?.label}`;

	const EF = (Mobile_S1_EF as MobileCombustionTableProps[]).find(
		(row) => row['Mobile Fuel'] === key,
	);

	if (!EF) {
		throw new Error(`No emission factor found for ${key}`);
	}

	const result: Record<string, number> = {};
	for (const type of Object.keys(types)) {
		const emissionFactor = Number(EF?.[types[type].columnName]);
		if (isNaN(emissionFactor)) {
			result[type] = 0;
		} else {
			if (activityType === 'fuel') {
				const EF_UNITS: string = EF?.['Standardized unit'];
				const conversionKey = `${EF_UNITS}_to_${units}`;
				const conversionFactor =
					EF_UNITS === units ? 1 : conversions[conversionKey]?.value;

				if (!conversionFactor) {
					throw new Error(
						`No conversion factor found for ${conversionKey}`,
					);
				}

				result[type] =
					(emissionFactor / conversionFactor) *
					(amount / types[type].factor);
			} else if (activityType === 'distance') {
				result[type] = emissionFactor * (amount / types[type].factor);
			}
		}
		result.EF = (EF?.['AR5 (kgCO2e)'] as number) ?? 0;
	}

	result.CO2e =
		result.CO2 * gasData.CO2.AR5 +
		result.CH4 * gasData.CH4.AR5 +
		result.N2O * gasData.N2O.AR5;
	return result;
}
