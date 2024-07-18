import React from 'react';
import { useGetUserDetails } from '@/api/admin';
import {
	Box,
	Button,
	Center,
	Skeleton,
	Text,
	Title,
	Paper,
	Stack,
	Group,
	Badge,
	Divider,
	ScrollArea,
	Tooltip,
} from '@mantine/core';
import {
	IconUser,
	IconMail,
	IconCalendar,
	IconLock,
	IconBook,
	IconUserCheck,
	IconInfoCircle,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const UserRoleManagement: React.FC<{ userId: string }> = ({ userId }) => {
	const { data, isLoading, error, refetch } = useGetUserDetails(userId);

	if (isLoading)
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
				<Center mt="md">
					<Button onClick={() => refetch()}>Try Again</Button>
				</Center>
			</Box>
		);

	if (!data?.[0]) return <Text>User not found</Text>;

	const formatDate = (date: string | null) => {
		return date ? new Date(date).toLocaleString() : 'N/A';
	};

	const user = data?.[0];
	const workbooks = user.workbooks.filter((wb) => wb);
	const roles = user.roles.filter((role) => role);
	return (
		<ScrollArea h="100%">
			<Box p="md">
				<Title order={2} mb="md">
					Overview
				</Title>
				<Group gap="xs" mb="md">
					{roles.map((role, index) => (
						<Badge key={index} variant="gradient" size="lg">
							{role}
						</Badge>
					))}
				</Group>
				<Paper shadow="xs" p="md" withBorder>
					<Stack gap="xs">
						<Group wrap="nowrap">
							<IconUser size={18} />
							<Text fw={500}>User ID:</Text>
							<Text>{user.user_id}</Text>
						</Group>
						<Group wrap="nowrap">
							<IconMail size={18} />
							<Text fw={500}>Email:</Text>
							<Text>{user.email}</Text>
						</Group>
						<Group>
							<IconCalendar size={18} />
							<Text fw={500}>Created At:</Text>
							<Text>{dayjs(user.user_created_at).fromNow()}</Text>
							<Tooltip label={formatDate(user.user_created_at)}>
								<IconInfoCircle size={18} />
							</Tooltip>
						</Group>
						<Group wrap="nowrap">
							<IconCalendar size={18} />
							<Text fw={500}>Last Sign In:</Text>
							<Text>{dayjs(user.last_sign_in_at).fromNow()}</Text>
							<Tooltip label={formatDate(user.last_sign_in_at)}>
								<IconInfoCircle size={18} />
							</Tooltip>
						</Group>
					</Stack>
					<Divider my="md" />
					<Title order={4} mt="md" mb="xs">
						Workbooks
					</Title>
					<Group gap="xs">
						{workbooks.length > 0 ? (
							workbooks.map((workbook, index) => (
								<Badge key={index} color="green">
									{workbook}
								</Badge>
							))
						) : (
							<Text>No workbooks</Text>
						)}
					</Group>

					<Divider my="md" />

					<Title order={4} mb="xs">
						Additional Information
					</Title>
					<Stack gap="xs">
						<Group wrap="nowrap">
							<IconLock size={18} />
							<Text fw={500}>Email Confirmed:</Text>
							<Text>
								{user.email_confirmed_at ? 'Yes' : 'No'}
							</Text>
						</Group>
						<Group wrap="nowrap">
							<IconBook size={18} />
							<Text fw={500}>Email Change:</Text>
							<Text>{user.email_change || 'N/A'}</Text>
						</Group>
						<Group wrap="nowrap">
							<IconUserCheck size={18} />
							<Text fw={500}>Banned Until:</Text>
							<Text>
								{user.banned_until
									? dayjs(user.banned_until).fromNow()
									: 'Not banned'}
							</Text>
							<Tooltip label={formatDate(user.banned_until)}>
								<IconInfoCircle size={18} />
							</Tooltip>
						</Group>
					</Stack>
				</Paper>
			</Box>
		</ScrollArea>
	);
};

export default UserRoleManagement;
