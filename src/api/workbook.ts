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
	naics_code?: string,
): Promise<Workbook> => {
	const updateData: Partial<Workbook> = { name };
	if (naics_code) updateData.naics_code = naics_code;
	const { data, error } = await supabase
		.from('workbook')
		.update(updateData)
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
	return useMutation<
		Workbook,
		Error,
		{ name: string; workbookId: string; naics_code?: string }
	>({
		mutationFn: ({ name, workbookId, naics_code }) =>
			updateWorkbookName(name, workbookId, naics_code),
		onSuccess,
		onError,
	});
};
// naics code

const updateWorkbookNaicsCode = async (
	naicsCode: string,
	workbookId: string,
): Promise<Workbook> => {
	const { data, error } = await supabase
		.from('workbook')
		.update({ naics_code: naicsCode })
		.eq('workbook_id', workbookId)
		.select('*')
		.single();
	if (error) throw error;
	return data;
};

export const useUpdateWorkbookNaicsCode = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: Workbook) => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation<Workbook, Error, { naicsCode: string; workbookId: string }>({
		mutationFn: ({ naicsCode, workbookId }) =>
			updateWorkbookNaicsCode(naicsCode, workbookId),
		onSuccess,
		onError,
	});
};

// Inventory Years

// Stationary Combustion

// Mobile Combustion

// Purchased Electricity

// Report
