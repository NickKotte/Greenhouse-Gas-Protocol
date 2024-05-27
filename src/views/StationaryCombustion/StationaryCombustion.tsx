import {
	Accordion,
	Box,
	Button,
	Center,
	Container,
	Divider,
	Grid,
	Group,
	List,
	NumberFormatter,
	Paper,
	Text,
	ThemeIcon,
	Title,
	rem,
} from '@mantine/core';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import classes from '@/css/Stationary.module.css';
import {
	IconCircle,
	IconMessageCircle2,
	IconNotebook,
	IconPlus,
} from '@tabler/icons-react';
import FuelSelector from './FuelSelector';
import FuelAmountInput from './FuelAmountInput';
import { modals } from '@mantine/modals';
import AddEntrySC from '../../components/modals/AddEntrySC';

interface StationaryCombustionData {
	facilityId: string;
	year: number;
	fuel: string;
	amountOfFuel: number;
	units: string;
	co2Tonnes: number;
	ch4Tonnes: number;
	n2oTonnes: number;
	co2eTonnes: number;
	biofuelCo2Tonnes: number;
	efKgCo2e: number;
}
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
	const { inventoryYears } = useStore($appState);

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
					modals.open({
						radius: 'md',
						children: (
							<AddEntrySC
								innerProps={{
									facility: {
										name: '',
										streetAddress: '',
										city: '',
										state: '',
										zip: '',
										eGrid: '',
										squareFootage: 0,
									},
								}}
							/>
						),
					})
				}
			>
				Add a new entry
			</Button>
			{!values.length && (
				<Center>
					<Text size="sm" c="dimmed">
						No data to display. Start by hitting the add button.
					</Text>
				</Center>
			)}
			<Accordion multiple>
				{values.map((entry, index) => (
					<Paper p="lg" mb="md" radius="md" key={index}>
						<Text size="xl" mb="md" fw={700}>
							{entry[0].year}
						</Text>
						{entry.map((item) => (
							<Accordion.Item
								key={item.facilityId}
								value={item.facilityId}
								style={{
									borderBottom: 'none',
								}}
							>
								<Group
									key={item.facilityId}
									gap="0px"
									my="xs"
									align="stretch"
									className={classes.container}
								>
									<Box flex={1} className={classes.row}>
										<Grid grow className={classes.userData}>
											<Grid.Col span={4}>
												<Text size="md" fw={500}>
													{item.facilityId}
												</Text>
											</Grid.Col>
											<Grid.Col span={4}>
												<FuelSelector />
											</Grid.Col>
											<Grid.Col span={4}>
												<FuelAmountInput
													amount={item.amountOfFuel}
													units={item.units}
												/>
											</Grid.Col>
										</Grid>
										<Accordion.Panel>
											<Divider my="xs" />
											<Grid
												className={classes.ghgEmissions}
											>
												<Grid.Col span={2}>
													<Text c="dimmed" size="sm">
														CO2
													</Text>
													<Text c="orange">
														<NumberFormatter
															value={
																item.co2Tonnes
															}
															decimalScale={3}
															suffix=" t"
														/>
													</Text>
												</Grid.Col>
												<Grid.Col span={2}>
													<Text c="dimmed" size="sm">
														CH4
													</Text>
													<Text c="orange">
														<NumberFormatter
															value={
																item.ch4Tonnes
															}
															decimalScale={3}
															suffix=" t"
														/>
													</Text>
												</Grid.Col>
												<Grid.Col span={2}>
													<Text c="dimmed" size="sm">
														N2O
													</Text>
													<Text c="orange">
														<NumberFormatter
															value={
																item.n2oTonnes
															}
															decimalScale={3}
															suffix=" t"
														/>
													</Text>
												</Grid.Col>
												<Grid.Col span={2}>
													<Text c="dimmed" size="sm">
														CO2e
													</Text>
													<Text c="orange">
														<NumberFormatter
															value={
																item.co2eTonnes
															}
															decimalScale={3}
															suffix=" t"
														/>
													</Text>
												</Grid.Col>
												<Grid.Col span={2}>
													<Text c="dimmed" size="sm">
														Biofuels
													</Text>
													<Text c="orange">
														<NumberFormatter
															value={
																item.biofuelCo2Tonnes
															}
															decimalScale={3}
															suffix=" t"
														/>
													</Text>
												</Grid.Col>
											</Grid>
										</Accordion.Panel>
									</Box>
									<Accordion.Control w="fit-content">
										<Box>
											<Text size="sm" c="dimmed">
												kgCO2e/unit
											</Text>
											<Text
												variant="text"
												c="orange"
												size="lg"
											>
												<NumberFormatter
													value={item.efKgCo2e}
													decimalScale={3}
												/>
											</Text>
										</Box>
									</Accordion.Control>
								</Group>
							</Accordion.Item>
						))}
					</Paper>
				))}
			</Accordion>
		</Box>
	);
};

export default StationaryCombustion;
