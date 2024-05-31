import { Box, Group, Switch, Text, useMantineTheme } from '@mantine/core';

import { IconFlame, IconChartLine } from '@tabler/icons-react';
import { useState } from 'react';
import { modals } from '@mantine/modals';
const ActivitySelector = () => {
	const theme = useMantineTheme();
	const [value, setValue] = useState<'fuel' | 'distance'>('fuel');
	const sunIcon = <IconFlame stroke={2.5} color={theme.colors.yellow[4]} />;
	const moonIcon = (
		<IconChartLine stroke={2.5} color={theme.colors.blue[6]} />
	);
	const openConfirmationChange = () => {
		modals.openConfirmModal({
			title: 'Change Activity Type',
			radius: 'md',
			centered: true,
			children: (
				<Text size="sm" p="lg">
					Are you sure you want to change the activity type? This
					action could change emission calculations.
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
		setValue(value === 'fuel' ? 'distance' : 'fuel');
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
					onChange={openConfirmationChange}
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
