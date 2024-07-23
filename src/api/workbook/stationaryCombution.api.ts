import type { StationaryCombustion, MutationOperation, Results } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState, workbook } from '@/stores/app';

import { useStore } from '@nanostores/react';
import { updateResults } from './results.api';

const getStationaryCombustion = async (
	workbookId: string,
): Promise<StationaryCombustion[]> => {
	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('stationary_combustion')
		.select('*, results:results_id(*), facility:facility_id(name)')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	workbook.setItems(data as any);
	return data as any;
};

export const useGetStationaryCombustion = () => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;
	return useQuery<StationaryCombustion[], Error>({
		queryKey: ['stationaryCombustion', workbookId],
		queryFn: () => getStationaryCombustion(workbookId),
		staleTime: 20 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
		throwOnError: false,
	});
};

const updateStationaryCombustion = async ({
	operation,
	stationaryCombustion,
	results,
	appId,
}: {
	operation: MutationOperation;
	stationaryCombustion: Partial<StationaryCombustion>;
	results: Partial<Results>;
	appId: string | undefined;
}): Promise<StationaryCombustion | null> => {
	let req,
		resultsRow: Partial<Results> | null = null;
	switch (operation) {
		case 'add':
			if (!stationaryCombustion.year) throw new Error('Year is required');
			if (!appId) throw new Error('App ID is required');
			if (!stationaryCombustion.facility_id)
				throw new Error('Facility ID is required');
			resultsRow = await updateResults({
				operation: 'add',
				results,
				appId,
			});
			if (!resultsRow?.id)
				throw new Error('Results ID could not be created');

			req = supabase
				.from('stationary_combustion')
				.insert({
					note: stationaryCombustion.note,
					fuel_type: stationaryCombustion.fuel_type,
					fuel_amount: stationaryCombustion.fuel_amount,
					fuel_units: stationaryCombustion.fuel_units,
					results_id: resultsRow.id,
					workbook_id: appId,
					year: stationaryCombustion.year,
					facility_id: stationaryCombustion.facility_id as string,
				})
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'update':
			if (!stationaryCombustion.id) throw new Error('ID is required');
			resultsRow = await updateResults({
				operation: 'update',
				results,
				appId,
			});
			if (!resultsRow?.id) throw new Error('Results ID is required');
			req = supabase
				.from('stationary_combustion')
				.update({
					note: stationaryCombustion.note,
					fuel_type: stationaryCombustion.fuel_type,
					fuel_amount: stationaryCombustion.fuel_amount,
					fuel_units: stationaryCombustion.fuel_units,
				})
				.eq('id', stationaryCombustion.id)
				.select('*, results:results_id(*), facility:facility_id(name)')
				.single();
			break;
		case 'delete':
			if (!stationaryCombustion.id) throw new Error('ID is required');
			req = supabase
				.from('stationary_combustion')
				.delete()
				.eq('id', stationaryCombustion.id)
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

export const useUpdateStationaryCombustion = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: StationaryCombustion) => void;
	onError?: (error: Error) => void;
}) => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;

	return useMutation<
		StationaryCombustion | null,
		Error,
		{
			operation: MutationOperation;
			stationaryCombustion: Partial<StationaryCombustion>;
			results: Partial<Results>;
		}
	>({
		mutationFn: ({ operation, stationaryCombustion, results }) =>
			updateStationaryCombustion({
				operation,
				stationaryCombustion,
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
