import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import type { Egrid } from '@/types';

const getEGridSubregion = async (zipCode: string): Promise<Egrid | null> => {
	if (!zipCode || zipCode.length < 5) return null;

	const { data, error } = await supabase
		.from('egrid')
		.select('*')
		.eq('zip_code', zipCode)
		.single();

	if (error) {
		if (error.code === 'PGRST116') {
			// no rows returned
			return null;
		}
		throw error;
	}

	return data;
};

export const useEGridSubregion = (zipCode: string, enabled = true) => {
	return useQuery<Egrid | null, Error>({
		queryKey: ['egrid', zipCode],
		queryFn: () => getEGridSubregion(zipCode),
		enabled: enabled && zipCode.length === 5,
		staleTime: Infinity, // ZIP to eGRID mapping doesn't change often
		gcTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
	});
};
