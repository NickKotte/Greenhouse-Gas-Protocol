import { Grid, Select, Text } from '@mantine/core';
import type { MobileCombustionData } from '@/types';
import FuelAmountInput from '../../components/FuelAmountInput';
import FuelSelector from '../../components/FuelSelector';

const MBRow = ({ item }: { item: MobileCombustionData }) => {
	const handleFuelSelectorUpdate = (fuelType: string) => {
		console.log(fuelType);
	};
	const handleFuelAmountUpdate = (amount: number, units: string) => {
		console.log(amount, units);
	};
	return (
		<>
			<Grid.Col span={2}>
				<Text size="md" fw={500}>
					{item.facilityId}
				</Text>
				<Text c="dimmer">{item.description}</Text>
			</Grid.Col>
			<Grid.Col span={2}>
				<Select
					data={['Fuel Use', 'Distance Activity']}
					placeholder="Select an option"
					label="Activity Type"
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<FuelSelector
					fuelType={item.fuel}
					onDoneEditing={handleFuelSelectorUpdate}
				/>
			</Grid.Col>
			<Grid.Col span={2}>
				<Select
					label="Vehicle Type"
					data={['Car', 'Truck', 'Motorcycle', 'Bicycle', 'Walking']}
					placeholder="Select an option"
				/>
			</Grid.Col>
			<Grid.Col span={4}>
				<FuelAmountInput
					amount={item.amountOfFuel}
					units={item.units}
					onDoneEditing={handleFuelAmountUpdate}
				/>
			</Grid.Col>
		</>
	);
};

export default MBRow;
