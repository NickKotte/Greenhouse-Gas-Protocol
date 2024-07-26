import type { FacilityEmissions } from '@/types';
import { Flex, Paper, Space, Stack, Text, Title } from '@mantine/core';
import StatBar from './StatBar';
import Scope from './Scope';

const FacilityBody = ({ facility }: { facility: FacilityEmissions }) => {
	const years = facility.yearly_emissions;

	return years.map((year) => (
		<Stack gap={0} key={year.year} mb="xl">
			<Paper radius="md" p="md" flex="1" miw={400}>
				<Flex key={year.year} align="center">
					<Space w="md" />
					<Title order={2} ta="center">
						{year.year}
					</Title>
					<Space w="md" />
					<Text span c="orange" fw={700} flex="1">
						{year.emissions.total.toFixed(2)} T
					</Text>{' '}
					<StatBar emissions={year.emissions} size={20} />
					<Space w="lg" />
				</Flex>
			</Paper>
			<Paper
				radius={0}
				p="md"
				flex="1"
				miw={400}
				mx="xl"
				style={{ borderRadius: '0 0 8px 8px' }}
			>
				<Flex wrap="wrap" gap="md" mt="md">
					<Space w="xl" />
					<Scope title="Scope 1" emissions={year.scope1} flex="1" />
					<Scope title="Scope 2" emissions={year.scope2} flex="2" />
				</Flex>
			</Paper>
		</Stack>
	));
};

export default FacilityBody;
