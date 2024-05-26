import { User } from '@supabase/supabase-js';
import { atom, computed } from 'nanostores';
import supabase from '../supabase/supabaseClient';
import { notifications } from '@mantine/notifications';

export const $currUser = atom<User | null>(null);
export const $loading = atom<boolean>(true);
export const $initialized = computed(
	[$currUser, $loading],
	(currUser, loading) => {
		return currUser && !loading;
	},
);

supabase.auth.onAuthStateChange((authChangeEvent, session) => {
	$currUser.set(session?.user || null);
	$loading.set(false);
	notifications.show({
		title: 'Auth state changed',
		message: `User ${authChangeEvent}`,
		color: 'blue',
	});
});
