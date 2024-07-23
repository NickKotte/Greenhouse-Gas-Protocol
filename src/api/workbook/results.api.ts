import type { Results, MutationOperation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState } from '@/stores/app';

import { useStore } from '@nanostores/react';

const getResults = async (workbookId: string): Promise<Results[]> => {
	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('results')
		.select('*')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	return data;
};

export const useGetResults = () => {
	const { workbook } = useStore($appState);
	const workbookId = workbook?.workbook_id;
	return useQuery<Results[], Error>({
		queryKey: ['results', workbookId],
		queryFn: () => getResults(workbookId),
		staleTime: 5 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
		throwOnError: false,
	});
};

export const updateResults = async ({
	operation,
	results,
	appId,
}: {
	operation: MutationOperation;
	results: Partial<Results>;
	appId: string | undefined;
}): Promise<Partial<Results> | null> => {
	let req;
	switch (operation) {
		case 'add':
			if (!appId) throw new Error('App ID is required');
			const requiredFields = ['bio', 'ch4', 'co2', 'co2e', 'ef', 'n2o'];
			if (
				!requiredFields.every(
					(field): field is keyof Results =>
						field in results &&
						typeof results[field as keyof Results] === 'number',
				)
			) {
				throw new Error(
					'All required fields must be provided for results',
				);
			}
			req = supabase
				.from('results')
				.insert({
					...results,
					workbook_id: appId,
				} as Results)
				.select('id')
				.single();
			break;
		case 'update':
			if (!results.id) throw new Error('ID is required');
			req = supabase
				.from('results')
				.update({
					...results,
				})
				.eq('id', results.id)
				.select('id')
				.single();
			break;
		case 'delete':
			if (!results.id) throw new Error('ID is required');
			req = supabase.from('results').delete().eq('id', results.id);
			break;
		default:
			throw new Error('Invalid operation');
	}
	const { data, error } = await req;
	if (error) throw error;
	return data || null;
};

export const useUpdateResults = ({
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
		Partial<Results> | null,
		Error,
		{
			operation: MutationOperation;
			results: Partial<Results>;
		}
	>({
		mutationFn: ({ operation, results }) =>
			updateResults({
				operation,
				results,
				appId: workbookId,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['results', workbookId],
			});
			onSuccess?.();
		},
		onError,
	});
};
