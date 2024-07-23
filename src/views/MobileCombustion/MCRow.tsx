import { Flex, Grid, Text, Tooltip } from '@mantine/core';
import type {
	ActivityType,
	MobileCombustion,
	RowComponentProps,
} from '@/types';
import ActivitySelector from './ActivitySelector';
import Selector from '@/components/Editables/Selector';
import {
	IconFlame,
	IconGasStation,
} from '@tabler/icons-react';
import { calculate } from '@/util';
import { workbook } from '@/stores/app';
import { notifications } from '@mantine/notifications';
import { fuel_units, distance_units } from '@/constants';
import WorkbookRowMenu from '@/components/WorkbookRowMenu';
import { useUpdateMobileCombustion } from '@/api/workbook/mobileCombustion.api';

const MBRow = ({ item }: RowComponentProps<MobileCombustion>) => {
	const { mutate: updateMobileCombustion } =
		useUpdateMobileCombustion({
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
		fuel = item.fuel_type || '',
		amountOfFuel = item.fuel_amount || 0,
		units = item.fuel_units || '',
		activityType = item.activity_type as ActivityType,
		description = item.note || '',
	}: {
		fuel?: string;
		amountOfFuel?: number;
		units?: string;
		activityType?: ActivityType;
		description?: string;
	}) => {
		try {
			const updateValues = calculate.MobileCombustion(
				activityType,
				fuel,
				amountOfFuel,
				units,
			);
			updateMobileCombustion({
				operation: 'update',
				mobileCombustion: {
					...item,
					fuel_type: fuel,
					fuel_amount: amountOfFuel,
					fuel_units: units,
					activity_type: activityType,
					note: description,
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
				activity_type: activityType,
				note: description,
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
		updateMobileCombustion({
			operation: 'delete',
			mobileCombustion: item,
			results: {
				id: item.results_id,
				workbook_id: item.workbook_id,
			},
		});
	};

	return (
		<>
			<Grid.Col span={2}>
				<Flex gap="xs">
					<WorkbookRowMenu deleteAction={handleDelete} />
					<Text size="md" fw={500} lineClamp={3}>
						{item.facility?.name}
						{item.facility?.note && (
							<Tooltip
								multiline
								maw={220}
								withArrow
								label={item.facility?.note}
							>
								<Text
									c="dimmed"
									size="sm"
									span
									style={{
										whiteSpace: 'normal',
										wordWrap: 'break-word',
									}}
								>
									- {item.facility?.note}
								</Text>
							</Tooltip>
						)}
					</Text>
				</Flex>
			</Grid.Col>
			<Grid.Col span={2}>
				<ActivitySelector
					value={item.activity_type as ActivityType}
					onChange={(value) => {
						handleUpdate({
							activityType: value as ActivityType,
							// switch units over
							units:
								value === 'fuel'
									? fuel_units[0].value
									: distance_units[0].value,
						});
					}}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					Icon={IconGasStation}
					type="VEHICLE"
					dropdownValue={item.fuel_type || ''}
					onDropdownValueChange={(value) => {
						handleUpdate({ fuel: value });
					}}
					label="Fuel Source"
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					Icon={IconFlame}
					type={
						item.activity_type === 'fuel'
							? 'FUEL_UNITS'
							: 'DISTANCE_UNITS'
					}
					numberValue={item.fuel_amount || 0}
					onNumberValueChange={(value) => {
						handleUpdate({ amountOfFuel: value });
					}}
					dropdownValue={item.fuel_units || ''}
					onDropdownValueChange={(value) => {
						handleUpdate({ units: value });
					}}
					withNumerable
					label="Fuel Amount"
				/>
			</Grid.Col>
		</>
	);
};

export default MBRow;
