import { Button, Box } from '@mantine/core';
import supabase from '@/supabase/supabaseClient';
import { DEMO_MODE } from '@/demo/data';
import { endDemoSession } from '@/stores/user';

const Settings = () => {
	return (
		<Box w="100%" h="100%">
			<Button
				onClick={() => {
					if (DEMO_MODE) {
						endDemoSession();
						window.location.href = '/login';
						return;
					}
					supabase.auth.signOut();
				}}
			>
				Logout
			</Button>
		</Box>
	);
};

export default Settings;
