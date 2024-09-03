import type { EmissionResults } from '@/types';
import { Group, Progress, Text, Tooltip } from '@mantine/core';
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
	const formatValue = (value: number) => {
		const calc = (value / emissions.total) * 100;
		if (calc < 1) {
			return '<1%';
		}
		return `${calc.toFixed(1)}%`;
	};

	const formatLabel = (key: string, value: number) => {
		return (
			<Text fw="bold">
				{formatTonnesColored(value, 8)}{' '}
				<Text span>
					{key} ({formatValue(value)})
				</Text>
			</Text>
		);
	};
	const adjustValue = (value: number) => {
		const calc = (value / emissions.total) * 100;
		if (calc === 0) {
			return 0;
		}
		if (calc < 1) {
			return 10;
		}
		return calc;
	};
	const segments = Object.entries(emissions).map(([key, value]) => {
		if (key === 'total' || key === 'ef') {
			return null;
		}
		return (
			<Tooltip key={key} label={formatLabel(key, value)}>
				<Progress.Section
					value={adjustValue(value)}
					color={emissionsColors[key]}
				>
					<Progress.Label>{formatValue(value)}</Progress.Label>
				</Progress.Section>
			</Tooltip>
		);
	});

	return (
		<Group align="center" gap="sm" flex="1">
			<Progress.Root
				size={size || 30}
				w={400}
				// radius="md"
				classNames={{ label: classes.progressLabel }}
				style={{ flex: 1 }}
			>
				{segments}
			</Progress.Root>
		</Group>
	);
};

export default StatBar;
