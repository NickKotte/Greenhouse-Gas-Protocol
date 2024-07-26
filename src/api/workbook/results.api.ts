import type { Results, MutationOperation } from '@/types';
import {
	useMutation,
	useQuery,
	useQueryClient,
	useQueries,
} from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import { $appState } from '@/stores/app';
import { getMobileCombustion } from './mobileCombustion.api';
import { getPurchasedElectricity } from './purchasedElectricity.api';
import { getStationaryCombustion } from './stationaryCombution.api';

import { useStore } from '@nanostores/react';
import { useMemo } from 'react';

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

export const useGetAllCombustionData = () => {
	const { workbook: workbookData } = useStore($appState);
	const workbookId = workbookData?.workbook_id;

	return useQueries({
		queries: [
			{
				queryKey: ['stationaryCombustion', workbookId],
				queryFn: () => getStationaryCombustion(workbookId),
				staleTime: 20 * 60 * 1000,
				retry: false,
				refetchOnWindowFocus: false,
				throwOnError: false,
			},
			{
				queryKey: ['mobileCombustion', workbookId],
				queryFn: () => getMobileCombustion(workbookId),
				staleTime: 20 * 60 * 1000,
				retry: false,
				refetchOnWindowFocus: false,
				throwOnError: false,
			},
			{
				queryKey: ['purchasedElectricity', workbookId],
				queryFn: () => getPurchasedElectricity(workbookId),
				staleTime: 20 * 60 * 1000,
				retry: false,
				refetchOnWindowFocus: false,
				throwOnError: false,
			},
		],
	});
};

interface FacilityEmissions {
	total_co2: number;
	total_co2e: number;
	total_ch4: number;
	total_bio: number;
	total_n2o: number;
	total_ef: number;
	total_emissions: number;
}

interface AggregatedEmissions {
	[facilityId: string]: FacilityEmissions;
}

export const useAggregatedEmissions = () => {
	const [stationaryQuery, mobileQuery, electricityQuery] =
		useGetAllCombustionData();

	const aggregatedEmissions = useMemo(() => {
		if (
			!stationaryQuery.data ||
			!mobileQuery.data ||
			!electricityQuery.data
		) {
			return null;
		}

		const allData = [
			...stationaryQuery.data,
			...mobileQuery.data,
			...electricityQuery.data,
		];

		const emissions: AggregatedEmissions = {};

		allData.forEach((item) => {
			if (!item.facility_id || !item.results) return;

			if (!emissions[item.facility_id]) {
				emissions[item.facility_id] = {
					total_co2: 0,
					total_co2e: 0,
					total_ch4: 0,
					total_bio: 0,
					total_n2o: 0,
					total_ef: 0,
					total_emissions: 0,
				};
			}

			const facilityEmissions = emissions[item.facility_id];

			facilityEmissions.total_co2 += item.results.co2 || 0;
			facilityEmissions.total_co2e += item.results.co2e || 0;
			facilityEmissions.total_ch4 += item.results.ch4 || 0;
			facilityEmissions.total_bio += item.results.bio || 0;
			facilityEmissions.total_n2o += item.results.n2o || 0;
			facilityEmissions.total_ef += item.results.ef || 0;
		});

		// Calculate total emissions
		Object.values(emissions).forEach((facilityEmissions) => {
			facilityEmissions.total_emissions =
				facilityEmissions.total_co2 +
				facilityEmissions.total_co2e +
				facilityEmissions.total_ch4 +
				facilityEmissions.total_bio +
				facilityEmissions.total_n2o;
		});

		return emissions;
	}, [stationaryQuery.data, mobileQuery.data, electricityQuery.data]);

	return {
		aggregatedEmissions,
		isLoading:
			stationaryQuery.isLoading ||
			mobileQuery.isLoading ||
			electricityQuery.isLoading,
		isError:
			stationaryQuery.isError ||
			mobileQuery.isError ||
			electricityQuery.isError,
	};
};