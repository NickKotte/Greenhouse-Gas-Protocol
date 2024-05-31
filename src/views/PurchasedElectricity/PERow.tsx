import { Grid, Text } from '@mantine/core';
import type {
	PurchasedElectricityData,
	RowComponentProps,
	SelectorValue,
} from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconPlugConnected } from '@tabler/icons-react';

const PERow = ({
	item,
	triggerAnimation = () => {},
}: RowComponentProps<PurchasedElectricityData>) => {
	const handleUpdate = (value: SelectorValue) => {
		triggerAnimation();
		console.log(value);
	};
	return (
		<>
			<Grid.Col span={4}>
				<Text size="md" fw={500}>
					{item.facilityId}
				</Text>
			</Grid.Col>
			<Grid.Col span={8}>
				<Selector
					type="ENERGY_UNITS"
					defaultDropdownValue={item.units}
					defaultNumberValue={item.amountOfElectricityConsumption}
					withNumerable
					onDoneEditing={handleUpdate}
					label="Electricity Consumption"
					Icon={IconPlugConnected}
				/>
			</Grid.Col>
		</>
	);
};

export default PERow;
