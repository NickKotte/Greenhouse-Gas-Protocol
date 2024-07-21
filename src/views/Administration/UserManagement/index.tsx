import {
	useAssignAdminRole,
	useDeleteUsers,
	useGetAllUsersWithRoles,
	useRemoveAdminRole,
} from '@/api/admin';
import RichTable from '@/components/RichTable';
import UserDetails from './UserDetails';
import {
	Avatar,
	Box,
	Button,
	Center,
	Collapse,
	Divider,
	Group,
	Skeleton,
	Text,
	Tooltip,
} from '@mantine/core';
import { useMemo, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconRefresh, IconUserX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useStore } from '@nanostores/react';
import { $currUser } from '@/stores/user';
import PromoteAdminButton from './PromoteAdminButton';
import RevokeAdminButton from './RevokeAdminButton';

const stringToColor = (str: string) => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
};

export default function UserManagement() {
	const admin = useStore($currUser);
	const [selection, setSelection] = useState<string[]>([]);
	const {
		data,
		isFetching: isFetchingUsers,
		error,
		refetch,
	} = useGetAllUsersWithRoles();
	const user = data?.find((user) => user.user_id === selection[0]);
	const userIsAdmin = user?.roles?.includes('admin') ?? false;
	const { mutate: deleteUsers, isPending: isDeletingUsers } = useDeleteUsers({
		onSuccess: () => {
			refetch();
			setSelection([]);
			notifications.show({
				title: 'Users deleted',
				message: `Users ${selection.join(', ')} deleted`,
				color: 'green',
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Could not delete users',
				message: error.message,
				color: 'red',
			});
		},
	});
	const { isPending: isAssigningAdminRole } = useAssignAdminRole({});
	const { isPending: isRemovingAdminRole } = useRemoveAdminRole({});
	const isLoading =
		isAssigningAdminRole ||
		isRemovingAdminRole ||
		isDeletingUsers ||
		isFetchingUsers;
	const isSameUser = user?.user_id === admin?.id;
	const users = useMemo(() => {
		if (!data) return [];
		return data.map(({ user_id, roles, ...user }) => ({
			...user,
			id: user_id,
			role: roles.join(', '),
			color: stringToColor(user_id),
		}));
	}, [data]);
	const headers = [
		{ label: 'Email', key: 'email' },
		{ label: 'Role', key: 'role' },
		{ label: 'ID', key: 'id' },
	];

	const openDeleteModal = () => {
		const userEmails = selection
			.map((id) => users?.find((user) => user.id === id))
			.filter((user) => user);
		modals.openConfirmModal({
			title: 'WARNING',
			radius: 'md',
			withCloseButton: false,
			children: (
				<Box>
					<Text p="lg">
						Are you sure you want to delete these users? This action
						is{' '}
						<Text c="red" span>
							destructive
						</Text>{' '}
						and could affect other workbooks.
					</Text>
					{userEmails.map((user) => (
						<Center>
							<Avatar color={user?.color} mr="xs">
								{user?.email?.slice(0, 2)?.toUpperCase()}
							</Avatar>
							<Text>{user?.email}</Text>
						</Center>
					))}
				</Box>
			),
			labels: { confirm: 'Delete', cancel: "Don't delete it" },
			confirmProps: { color: 'red' },
			onConfirm: () => deleteUsers(selection),
		});
	};

	if (isFetchingUsers)
		return (
			<Box h="100%">
				<Skeleton height="40px" mb="10px" radius="md" />
				<Skeleton height="50%" radius="md" />
			</Box>
		);
	if (error)
		return (
			<Box>
				<Center>
					<Text c="red">Error: {error?.message}</Text>
				</Center>
				<Center>
					<Button onClick={() => refetch()}>Try Again</Button>
				</Center>
			</Box>
		);
	return (
		<Box>
			<Group mb="md" justify="flex-end">
				<Collapse
					in={selection.length === 1 && !isSameUser && !userIsAdmin}
				>
					<PromoteAdminButton
						id={user?.user_id}
						email={user?.email}
					/>
				</Collapse>
				<Collapse
					in={selection.length === 1 && !isSameUser && userIsAdmin}
				>
					<RevokeAdminButton id={user?.user_id} email={user?.email} />
				</Collapse>
				{selection.length === 1 && <Divider orientation="vertical" />}
				<Collapse in={selection.length > 0 && !isSameUser}>
					<Tooltip
						label="User is an admin"
						disabled={!userIsAdmin}
						color="gray"
						offset={10}
						position="bottom"
						withArrow
						arrowSize={10}
					>
						<Button
							disabled={
								selection.length === 0 ||
								isLoading ||
								userIsAdmin
							}
							loading={isDeletingUsers}
							variant="light"
							color="red"
							onClick={openDeleteModal}
							leftSection={<IconUserX size={18} />}
						>
							Delete Selected
						</Button>
					</Tooltip>
				</Collapse>
				{selection.length > 0 && <Divider orientation="vertical" />}
				<Button
					variant="filled"
					color="blue"
					onClick={() => refetch()}
					leftSection={<IconRefresh size={18} />}
				>
					Refresh
				</Button>
			</Group>
			<RichTable
				data={users}
				headers={headers}
				DrawerElement={(props) => (
					<UserDetails userId={props.data.id} />
				)}
				selection={selection}
				setSelection={setSelection}
			/>
		</Box>
	);
}
