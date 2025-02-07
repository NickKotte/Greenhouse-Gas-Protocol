import type { EmissionResults } from '@/types';
import { Group, Progress, Text, Tooltip, Stack } from '@mantine/core';
import classes from '@/css/Results.module.css';
import { emissionsColors } from '@/constants';
import { formatTonnesColored } from '@/util';

const StatBar = ({
	emissions,
	size,
}: {
	emissions: EmissionResults;
	size?: number;
}) => {
	if (!emissions) {
		return null;
	}

	const formatValue = (value: number, total: number) => {
		const calc = (value / total) * 100;
		if (calc < 1) {
			return '<1%';
		}
		return `${calc.toFixed(1)}%`;
	};

	const formatLabel = (key: string, value: number, total: number) => {
		return (
			<Text>
				{formatTonnesColored(value, 8)} -
				<Text span fw="bold" c={emissionsColors[key] || 'green'}>
					{key}
				</Text>
				-{' '}
				<Text span fs="xs">
					({formatValue(value, total)})
				</Text>
			</Text>
		);
	};

	const adjustValue = (value: number, total: number) => {
		const calc = (value / total) * 100;
		if (calc === 0) {
			return 0;
		}
		if (calc < 1) {
			return 10;
		}
		return calc;
	};

	// Calculate total of actual gases for percentage calculations
	const actualGasesTotal =
		emissions.co2 + emissions.ch4 + emissions.n2o + emissions.bio;

	// Create segments for actual gases
	const actualGasSegments = ['co2', 'ch4', 'n2o', 'bio'].map((key) => {
		const value = emissions[key as keyof EmissionResults];
		return (
			<Tooltip
				key={key}
				label={formatLabel(key, value, actualGasesTotal)}
			>
				<Progress.Section
					value={adjustValue(value, actualGasesTotal)}
					color={emissionsColors[key]}
				>
					<Progress.Label>
						{formatValue(value, actualGasesTotal)}
					</Progress.Label>
				</Progress.Section>
			</Tooltip>
		);
	});

	return (
		<Stack gap="xs" flex="1">
			<Group align="center" gap="sm" flex="1">
				<Progress.Root
					size={size || 30}
					w={400}
					classNames={{ label: classes.progressLabel }}
					style={{ flex: 1 }}
				>
					{actualGasSegments}
				</Progress.Root>
			</Group>
			<Text size="sm" ta="right">
				CO₂e Total: {formatTonnesColored(emissions.co2e, 8)}
			</Text>
		</Stack>
	);
};

export default StatBar;
