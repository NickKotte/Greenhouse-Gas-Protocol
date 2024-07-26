import { useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $currUser } from '@/stores/user';

import { useStore } from '@nanostores/react';

const getWorkbooks = async (userId?: string) => {
	if (!userId) throw new Error('User ID is required');
	const { data, error } = await supabase
		.from('user_workbook')
		.select('workbook(*)')
		.eq('user_id', userId);
	if (error) throw error;
	return data;
};

export const useGetWorkbooks = () => {
	const currUser = useStore($currUser);
	const userId = currUser?.id;
	return useQuery({
		queryKey: ['workbooks', userId],
		queryFn: () => getWorkbooks(userId),
		staleTime: 5 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
	});
};
