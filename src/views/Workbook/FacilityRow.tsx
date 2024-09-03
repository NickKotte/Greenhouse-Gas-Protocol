import {
	ActionIcon,
	Box,
	Group,
	NumberFormatter,
	Stack,
	Text,
} from '@mantine/core';
import type { Facility } from '@/types';
import { IconPencil } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
const FacilityRow = ({ facility }: { facility: Facility }) => {
	return (
		<Group key={facility.name} justify="space-between" mb="lg">
			<Box flex={1}>
				<Group justify="space-between">
					<Text fz="md" fw={700}>
						{facility.name}
					</Text>
					{/* <Text c="dimmed" size="xs">
						eGRID{' '}
						<Text c="teal" span size="md">
							{facility.eGrid}
						</Text>
					</Text> */}
				</Group>
				<Stack justify="flex-start" gap={0} pl="sm">
					<Text c="dimmed" fz="sm">
						{facility.note}
					</Text>
					<Text c="dimmed" fz="sm">
						{facility.street} {facility.city}, {facility.state}{' '}
						{facility.zip}
					</Text>
					<Text c="dimmed" fz="sm">
						<NumberFormatter
							value={facility.square_footage || 0}
							suffix=" sqft"
							thousandSeparator=","
						/>
					</Text>
				</Stack>
			</Box>
			<ActionIcon
				aria-label={`Edit ${facility.name}`}
				variant="subtle"
				c="dimmed"
				size="lg"
				onClick={() => {
					modals.openContextModal({
						modal: 'EditFacility',
						innerProps: { facility, isEditing: true },
						title: 'Edit Facility',
						radius: 'md',
						size: 'lg',
					});
				}}
			>
				<IconPencil size={20} />
			</ActionIcon>
		</Group>
	);
};

export default FacilityRow;
