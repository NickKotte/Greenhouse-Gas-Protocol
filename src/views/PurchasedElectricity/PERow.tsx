import { Grid, Text } from '@mantine/core';
import type { PurchasedElectricityData, RowComponentProps } from '@/types';
import Selector from '@/components/Editables/Selector';
import { IconPlugConnected } from '@tabler/icons-react';
import { calculate } from '@/util';
import { workbook } from '@/stores/app';

const PERow = ({ item }: RowComponentProps<PurchasedElectricityData>) => {
	const handleUpdate = ({
		amountOfElectricityConsumption = item.amountOfElectricityConsumption,
		units = item.units,
	}: {
		amountOfElectricityConsumption?: number;
		units?: string;
	}) => {
		const updateValues = calculate.PurchasedElectricity(
			amountOfElectricityConsumption,
			units,
		);
		workbook.updateItem({
			facilityId: item.facilityId,
			amountOfElectricityConsumption,
			units,
			co2Tonnes: updateValues.CO2,
			ch4Tonnes: updateValues.CH4,
			n2oTonnes: updateValues.N2O,
			co2eTonnes: updateValues.CO2e,
			efKgCo2ePerKwh: updateValues.EF,
		});
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
					dropdownValue={item.units}
					numberValue={item.amountOfElectricityConsumption}
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
