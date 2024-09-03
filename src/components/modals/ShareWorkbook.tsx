import { ContextModalProps, modals } from '@mantine/modals';
import { $currUser } from '@/stores/user';
import { useStore } from '@nanostores/react';
import {
	useAddUserToWorkbook,
	useGetWorkbookUsers,
	useRemoveUserFromWorkbook,
} from '@/api/admin';
import { notifications } from '@mantine/notifications';
import {
	ActionIcon,
	Box,
	Button,
	Divider,
	Group,
	LoadingOverlay,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

const ShareWorkbook = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ workbookId: string }>) => {
	const [email, setEmail] = useState('');
	const user = useStore($currUser);
	const usersOwnedWorkbook = user?.app_metadata?.owned_workbook_id;
	const isAdmin = user?.app_metadata?.roles?.includes('admin');
	const canShareWorkbook = isAdmin || usersOwnedWorkbook === id;

	const { workbookId } = innerProps;
	const queryClient = useQueryClient();
	const { data: workbookUsers, isFetching: isFetchingWorkbookUsers } =
		useGetWorkbookUsers(workbookId);
	const { mutate: removeUserFromWorkbook, isPending: isRemovingUser } =
		useRemoveUserFromWorkbook({
			onSuccess: () => {
				notifications.show({
					title: 'User Removed',
					message: `User has been removed from the workbook`,
					color: 'green',
				});
				queryClient.invalidateQueries({
					queryKey: ['workbook-users', workbookId],
				});
			},
		});
	const { mutate: addUserToWorkbook, isPending: isAddingUser } =
		useAddUserToWorkbook({
			onSuccess: () => {
				notifications.show({
					title: 'Workbook Shared',
					message: `User has access to workbook`,
					color: 'green',
				});
				queryClient.invalidateQueries({
					queryKey: ['workbook-users', workbookId],
				});
				setEmail('');
				context.closeModal(id);
			},
			onError: (error) => {
				notifications.show({
					title: 'Error',
					message: `Error sharing workbook: ${error.message}`,
					color: 'red',
				});
			},
		});

	const openWarning = () => {
		modals.openConfirmModal({
			title: 'Assign Admin',
			radius: 'md',
			withCloseButton: false,
			children: (
				<Text p="lg">
					Are you sure you want to share workbook with{' '}
					<Text c="blue" span>
						{email}
					</Text>
					?
				</Text>
			),
			labels: { confirm: 'Share', cancel: 'Cancel' },
			confirmProps: { color: 'blue' },
			onConfirm: () => {
				addUserToWorkbook({
					userId: user?.id || '',
					email,
					workbookId,
				});
			},
		});
	};
	const usersFiltered = workbookUsers?.filter(
		(u) => u.user_id !== user?.id && u.email !== user?.email,
	);

	return (
		<Box style={{ position: 'relative' }}>
			<LoadingOverlay
				visible={
					(isAddingUser ||
						isRemovingUser ||
						isFetchingWorkbookUsers) &&
					canShareWorkbook
				}
			/>
			<Stack gap="md" p="md">
				<Text fw={500} size="lg">
					Share Workbook
				</Text>
				<Text size="sm" c="dimmed">
					Share a workbook and collaborate with other users.
				</Text>
				<Divider />
				<TextInput
					disabled={!canShareWorkbook}
					error={
						!canShareWorkbook &&
						'Sorry, you do not have permission to share this workbook'
					}
					data-autofocus
					label="Email"
					placeholder="Enter user's email"
					value={email}
					onChange={(event) => setEmail(event.currentTarget.value)}
					withAsterisk
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							openWarning();
						}
					}}
				/>
				<Tooltip
					label="Click to share the workbook with the entered email"
					position="right"
					withArrow
				>
					<Button onClick={openWarning} disabled={!email}>
						Share Workbook
					</Button>
				</Tooltip>
				<Divider />
				<Text size="sm" c="dimmed">
					{usersFiltered?.length
						? `${usersFiltered?.length} user(s) with access to this workbook:`
						: 'No users with access to this workbook'}
				</Text>
				<Stack>
					{usersFiltered?.map((user) => (
						<Group key={user.user_id} gap="xs">
							<Tooltip label="Remove user from workbook">
								<ActionIcon
									variant="subtle"
									color="red"
									onClick={() => {
										modals.openConfirmModal({
											title: 'Remove User',
											children: (
												<Text>
													Are you sure you want to
													remove this user from the
													workbook?
												</Text>
											),
											labels: {
												confirm: 'Remove',
												cancel: 'Cancel',
											},
											confirmProps: { color: 'red' },
											onConfirm: () => {
												removeUserFromWorkbook({
													userId: user.user_id,
													email: user.email,
													workbookId,
												});
											},
										});
									}}
								>
									<IconX />
								</ActionIcon>
							</Tooltip>
							<Text key={user.user_id}>{user.email}</Text>
						</Group>
					))}
				</Stack>
			</Stack>
		</Box>
	);
};

export default ShareWorkbook;
