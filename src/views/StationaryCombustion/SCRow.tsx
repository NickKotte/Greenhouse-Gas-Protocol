import { Grid, Text } from '@mantine/core';
import type { RowComponentProps, StationaryCombustionData } from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconFlame, IconGasStation } from '@tabler/icons-react';
import { workbook } from '@/stores/app';
import { calculate } from '@/util';
import { notifications } from '@mantine/notifications';

const SCRow = ({ item }: RowComponentProps<StationaryCombustionData>) => {
	const handleUpdate = ({
		fuel = item.fuel,
		amountOfFuel = item.amountOfFuel,
		units = item.units,
	}: {
		fuel?: string;
		amountOfFuel?: number;
		units?: string;
	}) => {
		try {
			const updateValues = calculate.StationaryCombustion(
				fuel,
				amountOfFuel,
				units,
			);
			workbook.updateItem({
				facilityId: item.facilityId,
				fuel,
				amountOfFuel,
				units,
				co2Tonnes: updateValues.CO2,
				ch4Tonnes: updateValues.CH4,
				n2oTonnes: updateValues.N2O,
				co2eTonnes: updateValues.CO2e,
				efKgCo2e: updateValues.EF,
				biofuelCo2Tonnes: updateValues.BIO,
			});
		} catch (error: unknown) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			notifications.show({
				title: 'Oops!',
				message: `There was an error: ${errorMessage}`,
				color: 'red',
				autoClose: 8000,
			});
		}
	};
	return (
		<>
			<Grid.Col span={4}>
				<Text size="md" fw={500}>
					{item.facilityId}
				</Text>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					label="Fuel Type"
					type="SC"
					dropdownValue={item.fuel}
					onDropdownValueChange={(value) =>
						handleUpdate({ fuel: value })
					}
					Icon={IconGasStation}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					label="Amount of Fuel"
					type="ENERGY_UNITS"
					numberValue={item.amountOfFuel}
					dropdownValue={item.units}
					onNumberValueChange={(value) =>
						handleUpdate({ amountOfFuel: value })
					}
					onDropdownValueChange={(value) =>
						handleUpdate({ units: value })
					}
					Icon={IconFlame}
					withNumerable
				/>
			</Grid.Col>
		</>
	);
};

export default SCRow;
