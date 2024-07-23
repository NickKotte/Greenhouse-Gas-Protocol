import { Menu, ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDots, IconTrash } from '@tabler/icons-react';

const WorkbookRowMenu = ({ deleteAction }: { deleteAction: () => void }) => {
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
			onConfirm: () => deleteAction(),
		});
	return (
		<Menu withArrow position="bottom-start">
			<Menu.Target>
				<ActionIcon variant="subtle" color="gray">
					<IconDots />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Actions</Menu.Label>
				<Menu.Item
					leftSection={<IconTrash />}
					color="red"
					onClick={openDeleteModal}
				>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default WorkbookRowMenu;
