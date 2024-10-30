import { Flex, Group, Title, Text, Stack } from '@mantine/core';
import StatBar from './StatBar';
import type { FacilityEmissions } from '@/types';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import { formatTonnesColored, formatEmissionsPerArea } from '@/util';

const Facility = ({ facility }: { facility: FacilityEmissions }) => {
	const { data: facilities } = useGetFacilities();
	// Gets the emissions in Mega Tons per Square Foot
	const computeSquareFootageEmissions = () => {
		const foundFacility = facilities?.find(
			(f) => f.id === facility.facility_id,
		);
		const squareFootage = foundFacility?.square_footage || 0;
		if (squareFootage === 0) return 'N/A';

		const emissions = facility.total_emissions;
		return formatEmissionsPerArea(emissions / squareFootage);
	};

	return (
		<Flex gap="sm" justify="space-between" p="md" wrap="wrap">
			<Stack flex="1" gap="xs">
				<Group>
					<IconBuildingFactory2 size={32} stroke={2.3} />
					<Title pl="sm" order={2}>
						{facility.facility_name}
					</Title>
				</Group>
				<Title order={3}>
					<Text span>
						Produced {formatTonnesColored(facility.total_emissions)}{' '}
						of emmissions
					</Text>
				</Title>
				<Text c="dimmed">
					Estimated emissions per square foot:{' '}
					<Text span c="orange" fw="bold">
						{computeSquareFootageEmissions()}
					</Text>
				</Text>
			</Stack>

			<StatBar emissions={facility.results} />
		</Flex>
	);
};

export default Facility;
