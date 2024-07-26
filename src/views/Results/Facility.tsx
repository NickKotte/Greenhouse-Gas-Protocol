import { Flex, Group, Title, Text } from '@mantine/core';
import StatBar from './StatBar';
import type { FacilityEmissions } from '@/types';
import { IconBuildingFactory2 } from '@tabler/icons-react';

const Facility = ({ facility }: { facility: FacilityEmissions }) => {
	return (
		<Flex gap="sm" justify="space-between" p="md" wrap="wrap">
			<Group flex="1">
				<IconBuildingFactory2 size={32} stroke={2.3} />
				<Title pl="sm" order={2}>
					{facility.facility_name}
				</Title>
				<Title order={3}>
					<Text span>
						produced{' '}
						<Text span c="orange" fw="bold">
							{facility.total_emissions.toFixed(2)} T
						</Text>{' '}
						of emmissions
					</Text>
				</Title>
			</Group>

			<StatBar emissions={facility.results} />
		</Flex>
	);
};

export default Facility;
