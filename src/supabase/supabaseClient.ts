import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase';
import { DEMO_MODE } from '@/demo/data';

const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL ||
	(DEMO_MODE ? 'https://demo.supabase.co' : undefined);
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ||
	(DEMO_MODE ? 'demo-anon-key' : undefined);

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Missing Supabase environment variables. Set VITE_DEMO_MODE=true for portfolio demo mode, or provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
	);
}

const options = {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
};

export default createClient<Database>(
	supabaseUrl,
	supabaseAnonKey,
	options,
);
