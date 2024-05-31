import { Grid, Text } from '@mantine/core';
import type {
	RowComponentProps,
	SelectorValue,
	StationaryCombustionData,
} from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconFlame, IconGasStation } from '@tabler/icons-react';
import calculateEmissionFactor from '@/util';

const SCRow = ({
	item,
	triggerAnimation = () => {},
}: RowComponentProps<StationaryCombustionData>) => {
	const handleUpdate = (value: SelectorValue) => {
		triggerAnimation();
		console.log(value);
		const values = calculateEmissionFactor('Ethanol (100%)', 100, 'mmBtu');
		console.log(values);
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
					defaultDropdownValue={item.fuel}
					onDoneEditing={handleUpdate}
					Icon={IconGasStation}
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<Selector
					label="Amount of Fuel"
					type="SC"
					defaultNumberValue={item.amountOfFuel}
					defaultDropdownValue={item.units}
					onDoneEditing={handleUpdate}
					Icon={IconFlame}
					withNumerable
				/>
			</Grid.Col>
		</>
	);
};

export default SCRow;
