import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { Workbook } from '@/types';
import { $appState } from '@/stores/app';

const fetchWorkbookData = async (appId: string): Promise<Workbook> => {
	if (!appId) throw new Error('No appId found');
	const { data, error } = await supabase
		.from('workbook')
		.select('*')
		.eq('workbook_id', appId)
		.single();
	if (error) throw error;
	if (!data) throw new Error('No data found');
	$appState.setKey('workbook', data);
	return data;
};

export const useWorkbookData = (appId: string) => {
	return useQuery<Workbook, Error>({
		queryKey: ['workbook', appId],
		queryFn: () => fetchWorkbookData(appId),
		staleTime: 5 * 60 * 1000,
	});
};

const updateWorkbookName = async (
	name: string,
	workbookId: string,
): Promise<Workbook> => {
	const { data, error } = await supabase
		.from('workbook')
		.update({ name })
		.eq('workbook_id', workbookId)
		.select('*')
		.single();
	if (error) throw error;
	return data;
};

export const useUpdateWorkbookName = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: Workbook) => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation<Workbook, Error, { name: string; workbookId: string }>({
		mutationFn: ({ name, workbookId }) =>
			updateWorkbookName(name, workbookId),
		onSuccess,
		onError,
	});
};

// Inventory Years

// Stationary Combustion

// Mobile Combustion

// Purchased Electricity

// Report
