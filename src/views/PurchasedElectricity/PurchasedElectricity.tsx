import { Box, Button, List, ThemeIcon, Title, rem } from '@mantine/core';
import { IconMessageCircle2, IconNotebook } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import PERow from './PERow';
import WorkbookTable from '@/components/WorkbookTable';
import type { PurchasedElectricityData } from '@/types';

const mockData: PurchasedElectricityData[] = [
	{
		year: 2020,
		facilityId: 'Warehouse 1',
		amountOfElectricityConsumption: 1580.664,
		units: 'kWh',
		calculationApproach: 'Heat/Steam',
		typeOfEmissionFactor: 'Grid Average/Location Based',
		co2Tonnes: 0.35775,
		ch4Tonnes: 6.74181e-6,
		n2oTonnes: 6.74181e-7,
		co2eTonnes: 0.35811493,
		efKgCo2ePerKwh: 66.398125,
	},
	{
		year: 2020,
		facilityId: 'Warehouse 2',
		amountOfElectricityConsumption: 1580.664,
		units: 'kWh',
		calculationApproach: 'Purchased Electricity - Location Based',
		typeOfEmissionFactor: 'Grid Average/Location Based',
		co2Tonnes: 0,
		ch4Tonnes: 0,
		n2oTonnes: 0,
		co2eTonnes: 0,
		efKgCo2ePerKwh: 0,
	},
	{
		year: 2021,
		facilityId: 'Warehouse 3',
		amountOfElectricityConsumption: 1580.664,
		units: 'kWh',
		calculationApproach: 'Purchased Electricity - Market Based',
		typeOfEmissionFactor: 'Grid Average/Location Based',
		co2Tonnes: 0,
		ch4Tonnes: 0,
		n2oTonnes: 0,
		co2eTonnes: 0,
		efKgCo2ePerKwh: 0,
	},
	{
		year: 2022,
		facilityId: 'Warehouse 4',
		amountOfElectricityConsumption: 1580.664,
		units: 'kWh',
		calculationApproach: 'Purchased Electricity - Market Based',
		typeOfEmissionFactor: 'Grid Average/Location Based',
		co2Tonnes: 0,
		ch4Tonnes: 0,
		n2oTonnes: 0,
		co2eTonnes: 0,
		efKgCo2ePerKwh: 0,
	},
	{
		year: 2023,
		facilityId: 'Warehouse 5',
		amountOfElectricityConsumption: 1580.664,
		units: 'kWh',
		calculationApproach: 'Purchased Electricity - Market Based',
		typeOfEmissionFactor: 'Grid Average/Location Based',
		co2Tonnes: 0,
		ch4Tonnes: 0,
		n2oTonnes: 0,
		co2eTonnes: 0,
		efKgCo2ePerKwh: 0,
	},
];

const StationaryCombustion = () => {
	const groupedByYear = mockData.reduce(
		(acc: { [key: number]: PurchasedElectricityData[] }, curr) => {
			const year = curr.year;
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(curr);
			return acc;
		},
		{},
	);
	const values = Object.values(groupedByYear);
	return (
		<Box w="100%" h="100%" mb="xl">
			<Title order={2}>Stationary Combustion</Title>
			<List
				p="md"
				my="md"
				spacing="sm"
				center
				icon={
					<ThemeIcon color="teal" radius="xl" size={24}>
						<IconMessageCircle2
							style={{ width: rem(16), height: rem(16) }}
						/>
					</ThemeIcon>
				}
			>
				<List.Item>
					This section allows you to calculate the greenhouse gas
					emissions from stationary combustion at your facilities.
					Please enter the following data for each fuel type consumed
					at each facility.
				</List.Item>
				<List.Item>
					For each fuel type, you will need to enter the amount of
					fuel consumed in the units of your choice (e.g. mmBtu for
					butane).
				</List.Item>
				<List.Item>
					To the right of each entry is the calculated EF (Emission
					Factor) of the fuel usage.
				</List.Item>
			</List>
			<Button
				ml="md"
				mb="md"
				leftSection={<IconNotebook />}
				onClick={() =>
					modals.openContextModal({
						modal: 'AddEntrySC',
						innerProps: {},
						title: 'Add a new entry',
						radius: 'md',
						size: 'lg',
					})
				}
			>
				Add a new entry
			</Button>
			<WorkbookTable values={values} RowComponent={PERow} />
		</Box>
	);
};

export default StationaryCombustion;
