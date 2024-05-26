import type { InventoryYear } from '@/types';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil } from '@tabler/icons-react';

const InventoryYearRow = ({ year }: { year: InventoryYear }) => {
	return (
		<Group>
			<Box flex={1}>
				<Text fz="md" fw={700}>
					{year.year}
				</Text>
				<Text c="dimmed" ml="lg">
					{year.description}
				</Text>
			</Box>
			<ActionIcon
				aria-label={`Edit ${year.year}`}
				variant="subtle"
				c="dimmed"
				size="lg"
				onClick={() => {
					modals.openContextModal({
						modal: 'EditInventoryYear',
						radius: 'md',
						innerProps: { year },
						title: `Edit ${year.year} Inventory Year`,
						size: 'lg',
					});
				}}
			>
				<IconPencil size={20} />
			</ActionIcon>
		</Group>
	);
};

export default InventoryYearRow;
