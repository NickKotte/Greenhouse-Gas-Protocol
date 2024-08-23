/* eslint-disable react-refresh/only-export-components */
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconUserShield } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useAssignAdminRole } from '@/api/admin';
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
	const { mutate: assignAdminRole, isPending: isAssigningAdminRole } =
		useAssignAdminRole({
			onSuccess: () => {
				notifications.show({
					title: 'Admin role assigned',
					message: `Admin role assigned to ${email}`,
					color: 'green',
				});
				queryClient.invalidateQueries({
					queryKey: ['users-with-roles'],
				});
			},
			onError: (error) => {
				notifications.show({
					title: 'Could not assign admin role',
					message: `Attempting to assign admin role to ${email}. Server: ${error.message}`,
					color: 'red',
				});
			},
		});

	const openAssignAdminModal = () => {
		modals.openConfirmModal({
			title: 'Assign Admin',
			radius: 'md',
			withCloseButton: false,
			children: (
				<Text p="lg">
					Are you sure you want to assign admin role to{' '}
					<Text c="blue" span>
						{email}
					</Text>
					?
				</Text>
			),
			labels: { confirm: 'Assign', cancel: 'Cancel' },
			confirmProps: { color: 'blue' },
			onConfirm: () => assignAdminRole(id),
		});
	};

	return (
		<Button
			variant="light"
			color="blue"
			onClick={openAssignAdminModal}
			leftSection={<IconUserShield size={18} />}
			loading={isAssigningAdminRole}
		>
			Assign Admin
		</Button>
	);
};

export default React.memo(PromoteAdminButton);
