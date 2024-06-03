import { Box, Group, Switch, Text, useMantineTheme } from '@mantine/core';

import { IconFlame, IconChartLine } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import type { ActivityType } from '@/types';
const ActivitySelector = ({
	value,
	onChange,
	noWarning = false,
}: {
	value: ActivityType;
	onChange: (value: ActivityType) => void;
	noWarning?: boolean;
}) => {
	const theme = useMantineTheme();
	const sunIcon = <IconFlame stroke={2.5} color={theme.colors.yellow[4]} />;
	const moonIcon = (
		<IconChartLine stroke={2.5} color={theme.colors.blue[6]} />
	);
	const openConfirmationChange = () => {
		modals.openConfirmModal({
			title: `Switch to ${value === 'fuel' ? 'distance' : 'fuel usage'} calculations`,
			radius: 'md',
			centered: true,
			children: (
				<Text size="sm" p="lg">
					This action will recalculate your emissions because the fuel
					units will be switched.
				</Text>
			),
			labels: {
				confirm: `Switch to ${value === 'fuel' ? 'Distance' : 'Fuel Use'}`,
				cancel: 'Cancel',
			},
			confirmProps: { color: 'green' },
			onConfirm: () => handleChange(),
		});
	};
	const handleChange = () => {
		onChange(value === 'fuel' ? 'distance' : 'fuel');
	};
	return (
		<Box>
			<Text size="sm" c="dimmed">
				Activity Type
			</Text>
			<Group>
				<Switch
					styles={{
						track: {
							cursor: 'pointer',
						},
					}}
					onChange={
						!noWarning ? openConfirmationChange : handleChange
					}
					checked={value === 'fuel'}
					onLabel={sunIcon}
					offLabel={moonIcon}
					color="dark.4"
					size="lg"
				/>
				<Text>{value === 'fuel' ? 'Fuel Use' : 'Distance'}</Text>
			</Group>
		</Box>
	);
};

export default ActivitySelector;
