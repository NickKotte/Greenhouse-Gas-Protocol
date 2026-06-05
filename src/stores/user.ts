import { User } from '@supabase/supabase-js';
import { atom, computed } from 'nanostores';
import { DEMO_MODE, demoUser } from '@/demo/data';
import supabase from '../supabase/supabaseClient';
// import { notifications } from '@mantine/notifications';

const demoSessionStorageKey = 'greenhouse-gas-protocol-demo-session';
const hasStoredDemoSession =
	typeof window !== 'undefined' &&
	window.localStorage.getItem(demoSessionStorageKey) === 'true';

export const $currUser = atom<User | null>(
	DEMO_MODE && hasStoredDemoSession ? demoUser : null,
);
export const $loading = atom<boolean>(!DEMO_MODE);
export const $initialized = computed(
	[$currUser, $loading],
	(currUser, loading) => {
		return currUser && !loading;
	},
);

export const startDemoSession = () => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(demoSessionStorageKey, 'true');
	}
	$currUser.set(demoUser);
	$loading.set(false);
};

export const endDemoSession = () => {
	if (typeof window !== 'undefined') {
		window.localStorage.removeItem(demoSessionStorageKey);
	}
	$currUser.set(null);
	$loading.set(false);
};

if (!DEMO_MODE) {
	supabase.auth.onAuthStateChange((_authChangeEvent, session) => {
		$currUser.set(session?.user || null);
		$loading.set(false);
	});
}
