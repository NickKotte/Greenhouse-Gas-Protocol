import { Grid, Text } from '@mantine/core';
import type {
	MobileCombustionData,
	RowComponentProps,
	SelectorValue,
} from '@/types';
import ActivitySelector from './ActivitySelector';
import Selector from '@/components/Editables/Selector';
import { IconFlame, IconGasStation } from '@tabler/icons-react';

const MBRow = ({
	item,
	triggerAnimation = () => {},
}: RowComponentProps<MobileCombustionData>) => {
	const handleUpdate = (value: SelectorValue) => {
		triggerAnimation();
		console.log(value);
	};

	return (
		<>
			<Grid.Col span={2}>
				<Text size="md" fw={500}>
					{item.facilityId}
				</Text>
				<Text c="dimmed">{item.description}</Text>
			</Grid.Col>
			<Grid.Col span={2}>
				<ActivitySelector />
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					Icon={IconGasStation}
					type="VEHICLE"
					defaultDropdownValue={item.fuelSource}
					onDoneEditing={handleUpdate}
					label="Fuel Source"
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					Icon={IconFlame}
					type="FUEL_UNITS"
					defaultNumberValue={item.activityAmount}
					defaultDropdownValue={item.unitOfFuelAmount}
					withNumerable
					onDoneEditing={handleUpdate}
					label="Fuel Amount"
				/>
			</Grid.Col>
		</>
	);
};

export default MBRow;
