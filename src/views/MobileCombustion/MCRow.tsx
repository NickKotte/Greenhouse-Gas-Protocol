import { Grid, Text, Tooltip } from '@mantine/core';
import type {
	ActivityType,
	MobileCombustionData,
	RowComponentProps,
} from '@/types';
import ActivitySelector from './ActivitySelector';
import Selector from '@/components/Editables/Selector';
import { IconFlame, IconGasStation } from '@tabler/icons-react';
import { calculate } from '@/util';
import { workbook } from '@/stores/app';
import { notifications } from '@mantine/notifications';
import { fuel_units, distance_units } from '@/constants';

const MBRow = ({ item }: RowComponentProps<MobileCombustionData>) => {
	const handleUpdate = ({
		activity = item.activityType as ActivityType,
		units = item.unitOfFuelAmount,
		fuel = item.fuelSource,
		activityAmount = item.activityAmount,
	}: {
		activity?: ActivityType;
		units?: string;
		fuel?: string;
		activityAmount?: number;
	}) => {
		console.log(activity, units, fuel, activityAmount);
		try {
			const values = calculate.MobileCombustion(
				activity,
				fuel,
				activityAmount,
				units,
			);
			workbook.updateItem({
				facilityId: item.facilityId,
				activityType: activity,
				fuelSource: fuel,
				activityAmount: activityAmount,
				unitOfFuelAmount: units,
				co2Tonnes: values.CO2,
				ch4Tonnes: values.CH4,
				n2oTonnes: values.N2O,
				co2eTonnes: values.CO2e,
				efKgCo2ePerKwh: values.EF,
				biofuelCo2Tonnes: values.BIO,
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
			<Grid.Col span={2}>
				<Text size="md" fw={500} lineClamp={3}>
					{item.facilityId}
					{item.description && (
						<Tooltip
							multiline
							maw={220}
							withArrow
							label={item.description}
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
								- {item.description}
							</Text>
						</Tooltip>
					)}
				</Text>
			</Grid.Col>
			<Grid.Col span={2}>
				<ActivitySelector
					value={item.activityType as ActivityType}
					onChange={(value) => {
						handleUpdate({
							activity: value as ActivityType,
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
					dropdownValue={item.fuelSource}
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
						item.activityType === 'fuel'
							? 'FUEL_UNITS'
							: 'DISTANCE_UNITS'
					}
					numberValue={item.activityAmount}
					onNumberValueChange={(value) => {
						handleUpdate({ activityAmount: value });
					}}
					dropdownValue={item.unitOfFuelAmount}
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
