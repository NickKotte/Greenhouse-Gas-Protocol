import type { InventoryYear } from '@/types';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPencil, IconNotes } from '@tabler/icons-react';

const InventoryYearRow = ({ year }: { year: InventoryYear }) => {
	return (
		<Group mb="lg">
			<Box flex={1}>
				<Text fz="md" fw={700}>
					{year.year}
				</Text>
				{year.note && (
					<Group gap="xs" align="flex-start" ml="sm">
						<IconNotes
							size={16}
							stroke={1.5}
							style={{ marginTop: 4 }}
						/>
						<Text c="dimmed" fz="sm">
							{year.note}
						</Text>
					</Group>
				)}
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
						innerProps: { year, isEditing: true },
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
