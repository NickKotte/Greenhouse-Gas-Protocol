import { Button, Box } from '@mantine/core';
import supabase from '@/supabase/supabaseClient';

const Settings = () => {
	return (
		<Box w="100%" h="100%">
			<Button onClick={() => supabase.auth.signOut()}>Logout</Button>
		</Box>
	);
};

export default Settings;
