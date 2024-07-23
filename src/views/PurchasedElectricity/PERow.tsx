import { Flex, Grid, Text } from '@mantine/core';
import type { RowComponentProps, PurchasedElectricity } from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconPlugConnected } from '@tabler/icons-react';
import { calculate } from '@/util';
import { workbook } from '@/stores/app';
import WorkbookRowMenu from '@/components/WorkbookRowMenu';
import { useUpdatePurchasedElectricity } from '@/api/workbook/purchasedElectricity.api';
import { notifications } from '@mantine/notifications';

const PERow = ({ item }: RowComponentProps<PurchasedElectricity>) => {
	const { mutate: updatePurchasedElectricity } =
		useUpdatePurchasedElectricity({
			onSuccess: () => {
				notifications.show({
					title: 'Success',
					message: 'Mobile Combustion data updated successfully',
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
		amountOfElectricityConsumption = item.electricity_amount || 0,
		units = item.electricity_units || '',
	}: {
		amountOfElectricityConsumption?: number;
		units?: string;
	}) => {
		try {
			const updateValues = calculate.PurchasedElectricity(
				amountOfElectricityConsumption,
				units,
			);
			updatePurchasedElectricity({
				operation: 'update',
				purchasedElectricity: {
					...item,
					electricity_amount: amountOfElectricityConsumption,
					electricity_units: units,
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
				electricity_amount: amountOfElectricityConsumption,
				electricity_units: units,
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
		updatePurchasedElectricity({
			operation: 'delete',
			purchasedElectricity: item,
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
			<Grid.Col span={8}>
				<Selector
					type="ENERGY_UNITS"
					dropdownValue={item.electricity_units || ''}
					numberValue={item.electricity_amount || 0}
					onNumberValueChange={(value) =>
						handleUpdate({ amountOfElectricityConsumption: value })
					}
					onDropdownValueChange={(value) =>
						handleUpdate({ units: value })
					}
					withNumerable
					label="Electricity Consumption"
					Icon={IconPlugConnected}
				/>
			</Grid.Col>
		</>
	);
};

export default PERow;
