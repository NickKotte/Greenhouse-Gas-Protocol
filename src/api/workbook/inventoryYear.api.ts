import type { InventoryYear, MutationOperation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState } from '@/stores/app';
import {
	DEMO_MODE,
	DEMO_WORKBOOK_ID,
	getDemoInventoryYears,
	updateDemoInventoryYear,
} from '@/demo/data';

import { useStore } from '@nanostores/react';

const getInventoryYears = async (
	workbookId: string,
): Promise<InventoryYear[]> => {
	if (DEMO_MODE) return getDemoInventoryYears();

	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('inventory_years')
		.select('*')
		.eq('workbook_id', workbookId)
		.is('deleted_at', null);
	if (error) throw error;
	return data;
};

export const useGetInventoryYears = () => {
	const { workbook } = useStore($appState);
	const workbookId = DEMO_MODE
		? workbook?.workbook_id || DEMO_WORKBOOK_ID
		: workbook?.workbook_id;
	return useQuery<InventoryYear[], Error>({
		queryKey: ['inventoryYears', workbookId],
		queryFn: () => getInventoryYears(workbookId),
		staleTime: 5 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
		throwOnError: false,
	});
};

const updateInventoryYear = async ({
	operation,
	inventoryYear,
	appId,
}: {
	operation: MutationOperation;
	inventoryYear: Partial<InventoryYear>;
	appId: string | undefined;
}): Promise<InventoryYear | null> => {
	if (DEMO_MODE) {
		return updateDemoInventoryYear({ operation, inventoryYear, appId });
	}

	let req;
	switch (operation) {
		case 'add':
			if (!inventoryYear.year) throw new Error('Year is required');
			if (!appId) throw new Error('App ID is required');
			req = supabase.from('inventory_years').upsert(
				{
					workbook_id: appId,
					year: inventoryYear.year,
					note: inventoryYear.note,
					deleted_at: null,
				},
				{
					onConflict: 'workbook_id,year',
					ignoreDuplicates: false,
				},
			);
			break;
		case 'update':
			if (!inventoryYear.id) throw new Error('ID is required');
			if (!inventoryYear.year) throw new Error('Year is required');
			req = supabase
				.from('inventory_years')
				.update({
					year: inventoryYear.year,
					note: inventoryYear.note,
				})
				.eq('id', inventoryYear.id);
			break;
		case 'delete':
			if (!inventoryYear.id) throw new Error('ID is required');
			req = supabase
				.from('inventory_years')
				.update({
					deleted_at: new Date().toISOString(),
				})
				.eq('id', inventoryYear.id);
			break;
		default:
			throw new Error('Invalid operation');
	}
	const { data, error } = await req;
	if (error) throw error;
	return data;
};

export const useUpdateInventoryYear = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	const { workbook } = useStore($appState);
	const workbookId = workbook?.workbook_id;
	const queryClient = useQueryClient();
	return useMutation<
		InventoryYear | null,
		Error,
		{ operation: MutationOperation; inventoryYear: Partial<InventoryYear> }
	>({
		mutationFn: ({ operation, inventoryYear }) =>
			updateInventoryYear({
				operation,
				inventoryYear,
				appId: workbookId,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['inventoryYears', workbookId],
			});
			onSuccess?.();
		},
		onError,
	});
};
