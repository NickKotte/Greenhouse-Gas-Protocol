import type { PurchasedElectricity, MutationOperation, Results } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState, workbook } from '@/stores/app';

import { useStore } from '@nanostores/react';
import { updateResults } from './results.api';

export const getPurchasedElectricity = async (
	workbookId: string,
): Promise<PurchasedElectricity[]> => {
	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('purchased_electricity')
		.select('*, results:results_id(*), facility:facility_id(name)')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	workbook.setItems(data as any);
	return data as any;
};

export const useGetPurchasedElectricity = () => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;
	return useQuery<PurchasedElectricity[], Error>({
		queryKey: ['purchasedElectricity', workbookId],
		queryFn: () => getPurchasedElectricity(workbookId),
		staleTime: 20 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
		throwOnError: false,
	});
};

const updatePurchasedElectricity = async ({
	operation,
	purchasedElectricity,
	results,
	appId,
}: {
	operation: MutationOperation;
	purchasedElectricity: Partial<PurchasedElectricity>;
	results: Partial<Results>;
	appId: string | undefined;
}): Promise<PurchasedElectricity | null> => {
	let req,
		resultsRow: Partial<Results> | null = null;
	switch (operation) {
		case 'add':
			if (!purchasedElectricity.year) throw new Error('Year is required');
			if (!appId) throw new Error('App ID is required');
			if (!purchasedElectricity.facility_id)
				throw new Error('Facility ID is required');
			resultsRow = await updateResults({
				operation: 'add',
				results,
				appId,
			});
			if (!resultsRow?.id)
				throw new Error('Results ID could not be created');

			req = supabase
				.from('purchased_electricity')
				.insert({
					note: purchasedElectricity.note,
					electricity_amount: purchasedElectricity.electricity_amount,
					electricity_units: purchasedElectricity.electricity_units,
					results_id: resultsRow.id,
					workbook_id: appId,
					year: purchasedElectricity.year,
					facility_id: purchasedElectricity.facility_id as string,
				})
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'update':
			if (!purchasedElectricity.id) throw new Error('ID is required');
			resultsRow = await updateResults({
				operation: 'update',
				results,
				appId,
			});
			if (!resultsRow?.id) throw new Error('Results ID is required');
			req = supabase
				.from('purchased_electricity')
				.update({
					note: purchasedElectricity.note,
					electricity_amount: purchasedElectricity.electricity_amount,
					electricity_units: purchasedElectricity.electricity_units,
				})
				.eq('id', purchasedElectricity.id)
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'delete':
			if (!purchasedElectricity.id) throw new Error('ID is required');
			req = supabase
				.from('purchased_electricity')
				.delete()
				.eq('id', purchasedElectricity.id)
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		default:
			throw new Error('Invalid operation');
	}
	const { data, error } = await req;
	if (error) throw error;
	return data as any;
};

export const useUpdatePurchasedElectricity = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: PurchasedElectricity) => void;
	onError?: (error: Error) => void;
}) => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;

	return useMutation<
		PurchasedElectricity | null,
		Error,
		{
			operation: MutationOperation;
			purchasedElectricity: Partial<PurchasedElectricity>;
			results: Partial<Results>;
		}
	>({
		mutationFn: ({ operation, purchasedElectricity, results }) =>
			updatePurchasedElectricity({
				operation,
				purchasedElectricity,
				results,
				appId: workbookId,
			}),
		onSuccess: (data, variables) => {
			console.log('data', data);
			if (!data) return;
			switch (variables.operation) {
				case 'add':
					workbook.addItem(data);
					break;
				case 'update':
					workbook.updateItem(data);
					break;
				case 'delete':
					workbook.removeItem(data);
					break;
			}
			onSuccess?.(data);
		},
		onError,
	});
};
