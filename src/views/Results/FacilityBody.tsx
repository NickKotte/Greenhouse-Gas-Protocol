import type { FacilityEmissions } from '@/types';
import { Flex, Paper, Space, Stack, Text, Title } from '@mantine/core';
import StatBar from './StatBar';
import Scope from './Scope';
import { useGetInventoryYears } from '@/api/workbook/inventoryYear.api';

const FacilityBody = ({ facility }: { facility: FacilityEmissions }) => {
	const years = facility.yearly_emissions;
	const { data: yearsData } = useGetInventoryYears;

	return years.map((year) => (
		<Paper p="lg" flex="1" miw={400} key={year.year}>
			<Flex align="center" gap="md" justify="space-between">
				<Title order={2} ta="center">
					{year.year}
				</Title>
				<Space w="md" />
				<Flex wrap="wrap" mt="md" flex="1" justify="space-between">
					<Scope title="Scope 1" emissions={year.scope1} />
					<Scope title="Scope 2" emissions={year.scope2} />
				</Flex>
				<Space w="xl" />
				<StatBar emissions={year.emissions} size={18} />
			</Flex>
		</Paper>
	));
};

export default FacilityBody;
