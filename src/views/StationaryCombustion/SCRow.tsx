import { Flex, Grid, Text } from '@mantine/core';
import type { RowComponentProps, StationaryCombustion } from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconFlame, IconGasStation } from '@tabler/icons-react';
import { workbook } from '@/stores/app';
import { calculate } from '@/util';
import { notifications } from '@mantine/notifications';
import WorkbookRowMenu from '@/components/WorkbookRowMenu';
import { useUpdateStationaryCombustion } from '@/api/workbook/stationaryCombution.api';

const SCRow = ({ item }: RowComponentProps<StationaryCombustion>) => {
	const { mutate: updateStationaryCombustion } =
		useUpdateStationaryCombustion({
			onSuccess: () => {
				notifications.show({
					title: 'Success',
					message: 'Stationary Combustion data updated successfully',
				});
			},
			onError: (err) => {
				notifications.show({
					title: 'Error',
					message: err.message,
					color: 'red',
				});
			},
		});

	const handleUpdate = ({
		fuel = item.fuel_type || '',
		amountOfFuel = item.fuel_amount || 0,
		units = item.fuel_units || '',
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
			updateStationaryCombustion({
				operation: 'update',
				stationaryCombustion: {
					...item,
					fuel_type: fuel,
					fuel_amount: amountOfFuel,
					fuel_units: units,
				},
				results: {
					id: item.results_id,
					workbook_id: item.workbook_id,
					co2: updateValues.CO2,
					ch4: updateValues.CH4,
					n2o: updateValues.N2O,
					co2e: updateValues.CO2e,
					ef: updateValues.EF,
					bio: updateValues.BIO,
				},
			});
			workbook.updateItem({
				...item,
				fuel_type: fuel,
				fuel_amount: amountOfFuel,
				fuel_units: units,
				results: {
					id: item.results_id,
					workbook_id: item.workbook_id,
					co2: updateValues.CO2,
					ch4: updateValues.CH4,
					n2o: updateValues.N2O,
					co2e: updateValues.CO2e,
					ef: updateValues.EF,
					bio: updateValues.BIO,
				},
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

	const handleDelete = () => {
		updateStationaryCombustion({
			operation: 'delete',
			stationaryCombustion: item,
			results: {
				id: item.results_id,
				workbook_id: item.workbook_id,
			},
		});
	};
	return (
		<>
			<Grid.Col span={4}>
				<Flex gap="xs">
					<WorkbookRowMenu deleteAction={handleDelete} />
					<Text size="md" fw={500}>
						{item.facility?.name}
					</Text>
				</Flex>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					label="Fuel Type"
					type="SC"
					dropdownValue={item.fuel_type || ''}
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
					numberValue={item.fuel_amount || 0}
					dropdownValue={item.fuel_units || ''}
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
