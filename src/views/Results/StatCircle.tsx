import type { EmissionResults } from '@/types';
import { Group, RingProgress, Text, Tooltip } from '@mantine/core';
import { emissionsColors } from '@/constants';
import { formatTonnesColored } from '@/util';

const StatRing = ({
	emissions,
	size = 180,
}: {
	emissions: EmissionResults;
	size?: number;
}) => {
	if (!emissions) {
		return null;
	}

	const formatValue = (value: number) => {
		const calc = (value / emissions.total) * 100;
		return calc < 1 ? '<1%' : `${calc.toFixed(1)}%`;
	};

	const formatLabel = (key: string, value: number) => (
		<Text fw="bold">
			{formatTonnesColored(value, 8)}{' '}
			<Text span>
				{key} ({formatValue(value)})
			</Text>
		</Text>
	);

	const sections = Object.entries(emissions)
		.filter(([key]) => key !== 'total' && key !== 'ef')
		.map(([key, value]) => {
			const percentage = (value / emissions.total) * 100;
			return {
				value: percentage < 1 ? 1 : percentage, // Ensure minimum 1% for visibility
				color: emissionsColors[key],
				tooltip: formatLabel(key, value),
			};
		});

	// Normalize sections to ensure total is 100%
	const totalValue = sections.reduce(
		(sum, section) => sum + section.value,
		0,
	);
	const normalizedSections = sections.map((section) => ({
		...section,
		value: (section.value / totalValue) * 100,
	}));

	return (
		<Group align="center" gap="sm">
			<Tooltip.Group openDelay={300} closeDelay={100}>
				<RingProgress
					size={size}
					thickness={size / 10}
					sections={normalizedSections}
					label={
						<Text ta="center" fz="md" fw="bold">
							{formatTonnesColored(emissions.total, 8, {
								fz: 'xl',
							})}
							<br />
							Total
						</Text>
					}
				/>
			</Tooltip.Group>
		</Group>
	);
};

export default StatRing;
