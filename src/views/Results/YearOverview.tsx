import { Title, Paper, Group, Stack, Text } from '@mantine/core';
import type { EmissionResults } from '@/types';
import StatRing from './StatCircle';
import { formatTonnesColored } from '@/util';

const YearOverview = ({
	emissions,
	year,
}: {
	emissions: EmissionResults;
	year: number;
}) => {
	if (!emissions) return null;

	return (
		<Paper px="xl" py="md" radius="md" w={400}>
			<Stack>
				<Group justify="space-between" align="center">
					<Title order={2}>{year}</Title>
					<Text size="sm" c="dimmed">
						Total CO₂e: {formatTonnesColored(emissions.co2e, 8)}
					</Text>
				</Group>
				<StatRing emissions={emissions} />
			</Stack>
		</Paper>
	);
};

export default YearOverview;
