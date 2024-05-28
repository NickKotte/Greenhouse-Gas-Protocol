import { Grid, Text } from '@mantine/core';
import type { StationaryCombustionData } from '@/types';
import FuelAmountInput from '../../components/FuelAmountInput';
import FuelSelector from '../../components/FuelSelector';

const SCRow = ({ item }: { item: StationaryCombustionData }) => {
	const handleFuelSelectorUpdate = (fuelType: string) => {
		console.log(fuelType);
	};
	const handleFuelAmountUpdate = (amount: number, units: string) => {
		console.log(amount, units);
	};
	return (
		<>
			<Grid.Col span={4}>
				<Text size="md" fw={500}>
					{item.facilityId}
				</Text>
			</Grid.Col>
			<Grid.Col span={4}>
				<FuelSelector
					fuelType={item.fuel}
					onDoneEditing={handleFuelSelectorUpdate}
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

export default SCRow;
