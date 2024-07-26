import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconUserShield } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRemoveAdminRole } from '@/api/admin';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const PromoteAdminButton = ({
	id = '',
	email = '',
}: {
	id: string | undefined;
	email: string | undefined;
}) => {
	const queryClient = useQueryClient();

	const { mutate: removeAdminRole, isPending: isRemovingAdminRole } =
		useRemoveAdminRole({
			onSuccess: () => {
				notifications.show({
					title: 'Admin role removed',
					message: `Admin role removed from ${email}`,
					color: 'green',
				});
				queryClient.invalidateQueries({
					queryKey: ['users-with-roles'],
				});
			},
			onError: (error) => {
				notifications.show({
					title: 'Could not remove admin role',
					message: `Attempting to remove admin role from ${email}. Server: ${error.message}`,
					color: 'red',
				});
			},
		});
	const openRemoveAdminModal = () => {
		modals.openConfirmModal({
			title: 'Remove Admin',
			radius: 'md',
			withCloseButton: false,
			children: (
				<Text p="lg">
					Are you sure you want to remove admin role from{' '}
					<Text c="red" span>
						{email}
					</Text>
					<Text size="sm" c="dimmed" mt="sm">
						Note: the user will still have certain UI elements until
						their next login -- but they will not be able to utilize
						them.
					</Text>
				</Text>
			),
			labels: { confirm: 'Remove', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onConfirm: () => removeAdminRole(id),
		});
	};

	return (
		<Button
			variant="light"
			color="red"
			onClick={openRemoveAdminModal}
			leftSection={<IconUserShield size={18} />}
			loading={isRemovingAdminRole}
		>
			Revoke Admin
		</Button>
	);
};

export default React.memo(PromoteAdminButton);
