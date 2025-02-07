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
		// Calculate percentage against sum of actual gases (excluding co2e)
		const actualGasesTotal =
			emissions.co2 + emissions.ch4 + emissions.n2o + emissions.bio;
		const calc = (value / actualGasesTotal) * 100;
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

	// Only include actual gases, exclude co2e, total, and ef
	const sections = Object.entries(emissions)
		.filter(([key]) => ['co2', 'ch4', 'n2o', 'bio'].includes(key))
		.map(([key, value]) => {
			const percentage =
				(value /
					(emissions.co2 +
						emissions.ch4 +
						emissions.n2o +
						emissions.bio)) *
				100;
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
							{formatTonnesColored(emissions.co2e, 8, {
								fz: 'xl',
							})}
							<br />
							CO₂e Total
						</Text>
					}
				/>
			</Tooltip.Group>
		</Group>
	);
};

export default StatRing;
