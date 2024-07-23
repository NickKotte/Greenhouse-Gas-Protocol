import type { Facility, MutationOperation } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState } from '@/stores/app';

import { useStore } from '@nanostores/react';

const getFacilities = async (workbookId: string): Promise<Facility[]> => {
	if (!workbookId) throw new Error('Workbook ID is required');
	const { data, error } = await supabase
		.from('facilities')
		.select('*')
		.eq('workbook_id', workbookId)
		.is('deleted_at', null);
	if (error) throw error;
	return data;
};

export const useGetFacilities = () => {
	const { workbook } = useStore($appState);
	const workbookId = workbook?.workbook_id;
	return useQuery<Facility[], Error>({
		queryKey: ['facilities', workbookId],
		queryFn: () => getFacilities(workbookId),
		staleTime: 5 * 60 * 1000,
		retry: false,
		refetchOnWindowFocus: false,
	});
};

const updateFacility = async ({
	operation,
	facility,
	appId,
}: {
	operation: MutationOperation;
	facility: Partial<Facility>;
	appId: string | undefined;
}): Promise<Facility | null> => {
	let req;
	switch (operation) {
		case 'add':
			if (!facility.name) throw new Error('Name is required');
			if (!appId) throw new Error('App ID is required');
			req = supabase.from('facilities').insert({
				...(facility as Omit<Facility, 'id'>),
				workbook_id: appId,
			});
			break;
		case 'update':
			if (!facility.id) throw new Error('ID is required');
			if (!facility.name) throw new Error('Name is required');
			req = supabase
				.from('facilities')
				.update({
					name: facility.name,
					note: facility.note,
					...facility,
				})
				.eq('id', facility.id);
			break;
		case 'delete':
			if (!facility.id) throw new Error('ID is required');
			req = supabase
				.from('facilities')
				.update({
					deleted_at: new Date().toISOString(),
				})
				.eq('id', facility.id);
			break;
		default:
			throw new Error('Invalid operation');
	}
	const { data, error } = await req;
	if (error) throw error;
	return data;
};

export const useUpdateFacility = ({
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
		Facility | null,
		Error,
		{ operation: MutationOperation; facility: Partial<Facility> }
	>({
		mutationFn: ({ operation, facility }) =>
			updateFacility({
				operation,
				facility,
				appId: workbookId,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['facilities', workbookId],
			});
			onSuccess?.();
		},
		onError,
	});
};
