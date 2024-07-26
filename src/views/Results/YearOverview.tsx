import { Grid, Title, RingProgress, Text } from '@mantine/core';
import type { EmissionResults } from '@/types';

const YearOverview = ({
	emissions,
	year,
}: {
	emissions: EmissionResults;
	year: number;
}) => {
	if (!emissions) return null;
	return (
		<Grid gutter="xl" w="100%">
			<Grid.Col
				span={3}
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
				}}
			>
				<Title order={2}>{year}</Title>
			</Grid.Col>
			<Grid.Col
				span={6}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<RingProgress
					size={170}
					roundCaps
					thickness={16}
					label={
						<Text
							size="xs"
							ta="center"
							px="xs"
							style={{ pointerEvents: 'none' }}
						>
							Hover sections to see tooltips
						</Text>
					}
					sections={[
						{
							value: 40,
							color: 'cyan',
							tooltip: 'Documents – 40 Gb',
						},
						{
							value: 25,
							color: 'orange',
							tooltip: 'Apps – 25 Gb',
						},
						{
							value: 15,
							color: 'grape',
							tooltip: 'Other – 15 Gb',
						},
					]}
				/>
			</Grid.Col>
			<Grid.Col
				span={3}
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<Title order={3}>{emissions.total.toFixed(2)} MT</Title>
			</Grid.Col>
		</Grid>
	);
};

export default YearOverview;
