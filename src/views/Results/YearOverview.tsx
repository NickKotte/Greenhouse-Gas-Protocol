import { Grid, Title, RingProgress, Text, Paper, Group } from '@mantine/core';
import type { EmissionResults } from '@/types';
import StatRing from './StatCircle';

const YearOverview = ({
	emissions,
	year,
}: {
	emissions: EmissionResults;
	year: number;
}) => {
	if (!emissions) return null;
	return (
		<Paper px="xl" py="md" radius="md">
			<Group>
				<Title order={2}>{year}</Title>
				<StatRing emissions={emissions} />
			</Group>
		</Paper>
	);
};

export default YearOverview;
