import type { MobileCombustion, MutationOperation, Results } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState, workbook } from '@/stores/app';

import { useStore } from '@nanostores/react';
import { updateResults } from './results.api';

const getMobileCombustion = async (
	workbookId: string,
): Promise<MobileCombustion[]> => {
	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('mobile_combustion')
		.select('*, results:results_id(*), facility:facility_id(name)')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	workbook.setItems(data as any);
	return data as any;
};

export const useGetMobileCombustion = () => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;
	return useQuery<MobileCombustion[], Error>({
		queryKey: ['mobileCombustion', workbookId],
		queryFn: () => getMobileCombustion(workbookId),
		staleTime: 20 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
		throwOnError: false,
	});
};

const updateMobileCombustion = async ({
	operation,
	mobileCombustion,
	results,
	appId,
}: {
	operation: MutationOperation;
	mobileCombustion: Partial<MobileCombustion>;
	results: Partial<Results>;
	appId: string | undefined;
}): Promise<MobileCombustion | null> => {
	let req,
		resultsRow: Partial<Results> | null = null;
	switch (operation) {
		case 'add':
			if (!mobileCombustion.year) throw new Error('Year is required');
			if (!appId) throw new Error('App ID is required');
			if (!mobileCombustion.facility_id)
				throw new Error('Facility ID is required');
			resultsRow = await updateResults({
				operation: 'add',
				results,
				appId,
			});
			if (!resultsRow?.id)
				throw new Error('Results ID could not be created');

			req = supabase
				.from('mobile_combustion')
				.insert({
					note: mobileCombustion.note,
					fuel_type: mobileCombustion.fuel_type,
					fuel_amount: mobileCombustion.fuel_amount,
					fuel_units: mobileCombustion.fuel_units,
					activity_type: mobileCombustion.activity_type,
					results_id: resultsRow.id,
					workbook_id: appId,
					year: mobileCombustion.year,
					facility_id: mobileCombustion.facility_id as string,
				})
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'update':
			if (!mobileCombustion.id) throw new Error('ID is required');
			resultsRow = await updateResults({
				operation: 'update',
				results,
				appId,
			});
			if (!resultsRow?.id) throw new Error('Results ID is required');
			req = supabase
				.from('mobile_combustion')
				.update({
					note: mobileCombustion.note,
					fuel_type: mobileCombustion.fuel_type,
					fuel_amount: mobileCombustion.fuel_amount,
					fuel_units: mobileCombustion.fuel_units,
					activity_type: mobileCombustion.activity_type,
				})
				.eq('id', mobileCombustion.id)
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'delete':
			if (!mobileCombustion.id) throw new Error('ID is required');
			req = supabase
				.from('mobile_combustion')
				.delete()
				.eq('id', mobileCombustion.id)
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

export const useUpdateMobileCombustion = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: MobileCombustion) => void;
	onError?: (error: Error) => void;
}) => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;

	return useMutation<
		MobileCombustion | null,
		Error,
		{
			operation: MutationOperation;
			mobileCombustion: Partial<MobileCombustion>;
			results: Partial<Results>;
		}
	>({
		mutationFn: ({ operation, mobileCombustion, results }) =>
			updateMobileCombustion({
				operation,
				mobileCombustion,
				results,
				appId: workbookId,
			}),
		onSuccess: (data, variables) => {
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
