import { Box, Button, Group, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons-react';

interface CustomModalProps extends ContextModalProps {
	/**
	 * Function to handle the save action.
	 * Should return true if the save was successful, false otherwise.
	 *
	 * @returns {boolean} - Indicates whether the save was successful.
	 */
	onSave: () => boolean;

	/**
	 * Function to handle the delete action.
	 * Should return true if the delete was successful, false otherwise.
	 *
	 * @returns {boolean} - Indicates whether the delete was successful.
	 */
	onDelete?: () => boolean;

	/**
	 * The content to be displayed inside the modal.
	 */
	children: React.ReactNode;

	/**
	 * Additional properties for the modal.
	 */
	innerProps: { isEditing?: boolean };
}

const EditWrapper = ({
	context,
	onSave = () => false,
	onDelete = () => false,
	innerProps,
	children,
}: CustomModalProps) => {
	const isEditing = innerProps.isEditing;
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Delete this entry',
			radius: 'md',
			children: (
				<Text size="sm" p="lg">
					Are you sure you want to delete this entry? This action is
					destructive and may affect other parts of the workbook.
				</Text>
			),
			labels: { confirm: 'Delete', cancel: "Don't delete it" },
			confirmProps: { color: 'red' },
			onConfirm: () => handleDelete(),
		});

	const handleSave = () => {
		const success = onSave();
		if (success) {
			context.closeAll();
		}
	};

	const handleDelete = () => {
		onDelete();
		context.closeAll();
	};

	return (
		<Box p="md">
			{children}
			<Group justify="flex-end" mt="md">
				{isEditing && (
					<Button
						color="red"
						leftSection={<IconTrash />}
						radius="md"
						onClick={openDeleteModal}
					>
						Delete
					</Button>
				)}
				<Button
					color="blue"
					radius="md"
					leftSection={<IconDeviceFloppy />}
					onClick={handleSave}
				>
					{isEditing ? 'Save' : 'Add'}
				</Button>
			</Group>
		</Box>
	);
};

export default EditWrapper;
