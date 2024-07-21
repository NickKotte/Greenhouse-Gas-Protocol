import { ContextModalProps, modals } from '@mantine/modals';
import { $currUser } from '@/stores/user';
import { useStore } from '@nanostores/react';
import { useAddUserToWorkbook } from '@/api/admin';
import { notifications } from '@mantine/notifications';
import {
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

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ workbookId: string }>) => {
	const [email, setEmail] = useState('');
	const user = useStore($currUser);
	const { workbookId } = innerProps;
	const { mutate: addUserToWorkbook, isPending } = useAddUserToWorkbook({
		onSuccess: () => {
			notifications.show({
				title: 'Workbook Shared',
				message: `User has access to workbook`,
				color: 'green',
			});
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
			onConfirm: () =>
				addUserToWorkbook({
					userId: user?.id || '',
					email,
					workbookId,
				}),
		});
	};
	return (
		<Box style={{ position: 'relative' }}>
			<LoadingOverlay visible={isPending} />
			<Stack gap="md" p="md">
				<Text fw={500} size="lg">
					Share Workbook
				</Text>
				<Text size="sm" c="dimmed">
					Share a workbook and collaborate with other users.
				</Text>
				<Divider />
				<TextInput
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
			</Stack>
		</Box>
	);
};

export default EditInventoryYear;
