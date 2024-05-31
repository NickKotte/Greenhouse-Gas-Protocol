import { Box, Button, List, ThemeIcon, Title, rem } from '@mantine/core';
import { IconMessageCircle2, IconNotebook } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import MCRow from './MCRow';
import WorkbookTable from '@/components/WorkbookTable';
import type { MobileCombustionData } from '@/types';

const mockData: MobileCombustionData[] = [
	{
		year: 2021,
		description: '10 delivery trucks',
		facilityId: 'warehouse 1',
		activityType: 'Fuel Use',
		fuelSource: 'Motor Gasoline',
		vehicleType: 'Gasoline Passenger Cars',
		activityAmount: 100,
		unitOfFuelAmount: 'scf',
		co2Tonnes: 6.568,
		ch4Tonnes: 0.000291,
		n2oTonnes: 0.000061,
		co2eTonnes: 6.592,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 8.812,
	},
	{
		year: 2021,
		description: 'sales cars, 5',
		facilityId: 'warehouse 2',
		activityType: 'Fuel Use',
		fuelSource: 'Ethanol (100%)',
		vehicleType: 'Ethanol Light-duty Vehicles',
		activityAmount: 10,
		unitOfFuelAmount: 'gal (US)',
		co2Tonnes: 0.0,
		ch4Tonnes: 0.000009,
		n2oTonnes: 0.000011,
		co2eTonnes: 0.003,
		biofuelCo2Tonnes: 0.058,
		efKgCo2e: 0.313,
	},
	{
		year: 2032,
		description: '',
		facilityId: 'warehouse 3',
		activityType: 'Distance Activity',
		fuelSource: 'Motor Gasoline',
		vehicleType: 'Gasoline Passenger Cars',
		activityAmount: 2250,
		unitOfFuelAmount: 'mile',
		co2Tonnes: 0.878,
		ch4Tonnes: 0.000039,
		n2oTonnes: 0.000008,
		co2eTonnes: 0.881,
		biofuelCo2Tonnes: 0.0,
		efKgCo2e: 8.812,
	},
];

const MobileCombustion = () => {
	const groupedByYear = mockData.reduce(
		(acc: { [key: number]: MobileCombustionData[] }, curr) => {
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
			<WorkbookTable values={values} RowComponent={MCRow} />
		</Box>
	);
};

export default MobileCombustion;
