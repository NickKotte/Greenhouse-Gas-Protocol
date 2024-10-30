import {
	ActionIcon,
	Box,
	Group,
	NumberFormatter,
	Stack,
	Text,
} from '@mantine/core';
import type { Facility } from '@/types';
import {
	IconPencil,
	IconNotes,
	IconMapPin,
	IconRuler,
	IconBolt,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';

const FacilityRow = ({ facility }: { facility: Facility }) => {
	return (
		<Group key={facility.name} justify="space-between" mb="lg">
			<Box flex={1}>
				<Group justify="space-between">
					<Group gap="xs">
						<Text fz="md" fw={700}>
							{facility.name}
						</Text>
					</Group>
					{facility.egrid_subregion && (
						<Group gap="xs">
							<IconBolt
								size={16}
								stroke={1.5}
								color="var(--mantine-color-teal-filled)"
							/>
							<Text c="dimmed" size="xs">
								<Text c="teal" span size="xs">
									{facility.egrid_subregion}
								</Text>
							</Text>
						</Group>
					)}
				</Group>
				<Stack justify="flex-start" gap={0} pl="md">
					{facility.note && (
						<Group gap="xs" align="flex-start">
							<IconNotes
								size={16}
								stroke={1.5}
								style={{ marginTop: 4 }}
							/>
							<Text c="dimmed" fz="sm">
								{facility.note}
							</Text>
						</Group>
					)}
					<Group gap="xs" align="flex-start">
						<IconMapPin
							size={16}
							stroke={1.5}
							style={{ marginTop: 4 }}
						/>
						<Text c="dimmed" fz="sm">
							{facility.street} {facility.city}, {facility.state}{' '}
							{facility.zip}
						</Text>
					</Group>
					<Group gap="xs" align="flex-start">
						<IconRuler
							size={16}
							stroke={1.5}
							style={{ marginTop: 4 }}
						/>
						<Text c="dimmed" fz="sm">
							<NumberFormatter
								value={facility.square_footage || 0}
								suffix=" sqft"
								thousandSeparator=","
							/>
						</Text>
					</Group>
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
