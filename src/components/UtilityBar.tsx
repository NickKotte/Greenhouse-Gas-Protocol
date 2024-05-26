import {
	ActionIcon,
	ButtonGroup,
	Menu,
	useMantineColorScheme,
} from '@mantine/core';
import {
	IconLogout,
	IconMoon,
	IconSun,
	IconUser,
	IconSettings,
} from '@tabler/icons-react';
import supabase from '@/supabase/supabaseClient';
import { $currUser } from '@/stores/user';
import { useStore } from '@nanostores/react';

export default function UtilityBar() {
	const currUser = useStore($currUser);
	const { colorScheme, toggleColorScheme } = useMantineColorScheme({
		keepTransitions: true,
	});
	return (
		<ButtonGroup
			style={{
				display: 'flex',
				marginRight: 20,
				marginTop: 15,
				position: 'absolute',
				right: 0,
				gap: 10,
			}}
		>
			<ActionIcon
				variant="gradient"
				size="lg"
				aria-label="Toggle dark mode"
				onClick={() => toggleColorScheme()}
			>
				{colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
			</ActionIcon>
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
						<Menu.Label>Account</Menu.Label>
						<Menu.Item
							leftSection={<IconSettings />}
							aria-label="Settings"
							onClick={() => {
								window.location.href = '/appid/settings';
							}}
						>
							Settings
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
		</ButtonGroup>
	);
}
