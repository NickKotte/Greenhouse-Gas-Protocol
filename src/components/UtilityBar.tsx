import {
	ActionIcon,
	ButtonGroup,
	Flex,
	Menu,
	Select,
	useMantineColorScheme,
	type ComboboxItem,
	Tooltip,
	Center,
} from '@mantine/core';
import {
	IconLogout,
	IconMoon,
	IconSun,
	IconUser,
	IconSettings,
	IconNotebook,
	IconBrandAsana,
} from '@tabler/icons-react';
import supabase from '@/supabase/supabaseClient';
import { $currUser } from '@/stores/user';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import { useGetWorkbooks } from '@/api/workbook/sharedWorkbooks.api';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export default function UtilityBar() {
	const queryClient = useQueryClient();
	const currUser = useStore($currUser);
	const { workbook } = useStore($appState);
	const [value, setValue] = useState<string | null>(null);
	const { data: workbooks } = useGetWorkbooks();
	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	const hasAccessToWorkbook = workbooks?.some(
		(wb) => wb.workbook?.workbook_id === workbook?.workbook_id,
	);
	const handleWorkbookChange = (newWorkbookId: string | null) => {
		const currentPath = window.location.pathname;
		const [, , ...rest] = currentPath.split('/');
		const newPath = `/${newWorkbookId}/${rest.join('/')}`;
		window.location.href = newPath;
		queryClient.invalidateQueries({
			queryKey: ['workbooks'],
		});
	};
	useEffect(() => {
		const currentPath = window.location.pathname;
		const workbookId = currentPath.split('/')[1];
		setValue(workbookId);
	}, [workbooks, window.location.pathname]);
	return (
		<Flex
			gap={10}
			style={{
				marginRight: 20,
				marginTop: 15,
				position: 'absolute',
				right: 0,
			}}
		>
			{workbooks?.length && workbooks?.length > 1 && (
				<Tooltip label="You've been invited to other workbooks">
					<Select
						placeholder="Select a workbook"
						data={workbooks?.map((workbook) => ({
							label: workbook.workbook?.name || '',
							value: workbook.workbook?.workbook_id || '',
						}))}
						value={value}
						onChange={handleWorkbookChange}
						defaultValue={workbook?.workbook_id}
						leftSection={<IconNotebook size={20} />}
					/>
				</Tooltip>
			)}
			{currUser && (
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<ActionIcon
							variant="gradient"
							size="lg"
							aria-label="User"
						>
							<IconUser />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>Settings</Menu.Label>
						<Menu.Item
							aria-label="Dark Mode"
							onClick={() => toggleColorScheme()}
							rightSection={
								colorScheme === 'dark' ? (
									<IconSun />
								) : (
									<IconMoon />
								)
							}
						>
							{colorScheme === 'dark'
								? 'Light Mode'
								: 'Dark Mode'}
						</Menu.Item>
						<Menu.Label>Account</Menu.Label>
						<Menu.Item
							leftSection={<IconBrandAsana />}
							aria-label="Settings"
							onClick={() => {
								window.location.href = `/${currUser?.app_metadata?.owned_workbook_id}/settings`;
							}}
						>
							Collaborate
						</Menu.Item>
						<Menu.Item
							color="red"
							leftSection={<IconLogout />}
							aria-label="Logout"
							onClick={async () => {
								const { error } = await supabase.auth.signOut();
								if (error) {
									console.error(
										'Error logging out:',
										error.message,
									);
								} else {
									window.location.href = '/login'; // Redirect to login page after logout
								}
							}}
						>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}
		</Flex>
	);
}
