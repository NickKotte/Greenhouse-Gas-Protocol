import { Box, Button, List, ThemeIcon, Title, rem } from '@mantine/core';
import { IconMessageCircle2, IconNotebook } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import SCRow from './SCRow';
import WorkbookTable from '@/components/WorkbookTable';
import type { StationaryCombustionData } from '@/types';

const mockData: StationaryCombustionData[] = [
	{
		facilityId: 'Warehouse 1',
		year: 2022,
		fuel: 'Butane',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 6.477,
		ch4Tonnes: 0.0003,
		n2oTonnes: 0.00006,
		co2eTonnes: 6.501,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 65.013,
	},
	{
		facilityId: 'Warehouse 1',
		year: 2019,
		fuel: 'Mixed (Commercial Sector)',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 9.427,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 9.5,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 95.002,
	},
	{
		facilityId: 'Warehouse 3',
		year: 2019,
		fuel: 'Lignite Coal',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 9.772,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 9.845,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 98.452,
	},
	{
		facilityId: 'Warehouse 4',
		year: 2019,
		fuel: 'Lignite Coal',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 9.772,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 9.845,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 98.452,
	},
	{
		facilityId: 'Warehouse 5',
		year: 2019,
		fuel: 'Lignite Coal',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 9.772,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 9.845,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 98.452,
	},
	{
		facilityId: 'Warehouse 6',
		year: 2019,
		fuel: 'Lignite Coal',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 9.772,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 9.845,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 98.452,
	},
	{
		facilityId: 'Warehouse 7',
		year: 2019,
		fuel: 'Anthracite Coal',
		amountOfFuel: 100,
		units: 'mmBtu',
		co2Tonnes: 10.369,
		ch4Tonnes: 0.0011,
		n2oTonnes: 0.00016,
		co2eTonnes: 10.442,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 104.422,
	},
	{
		facilityId: 'Warehouse 8',
		year: 2019,
		fuel: '',
		amountOfFuel: 0,
		units: '',
		co2Tonnes: 0,
		ch4Tonnes: 0,
		n2oTonnes: 0,
		co2eTonnes: 0,
		biofuelCo2Tonnes: 0,
		efKgCo2e: 0,
	},
];

const StationaryCombustion = () => {
	const groupedByYear = mockData.reduce(
		(acc: { [key: number]: StationaryCombustionData[] }, curr) => {
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
			<WorkbookTable values={values} RowComponent={SCRow} />
		</Box>
	);
};

export default StationaryCombustion;
