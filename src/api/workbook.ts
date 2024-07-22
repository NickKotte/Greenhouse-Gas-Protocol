import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import {
	Workbook,
	type InventoryYear,
	type Facility,
	type MutationOperation,
} from '@/types';
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
// getInventoryYears
const getInventoryYears = async (
	workbookId: string,
): Promise<InventoryYear[]> => {
	const { data, error } = await supabase
		.from('inventory_years')
		.select('*')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	return data;
};

export const useGetInventoryYears = (workbookId: string) => {
	return useQuery<InventoryYear[], Error>({
		queryKey: ['inventoryYears', workbookId],
		queryFn: () => getInventoryYears(workbookId),
		staleTime: 5 * 60 * 1000,
	});
};

// updateInventoryYears
const updateInventoryYear = async ({
	operation,
	inventoryYear,
}: {
	operation: MutationOperation;
	inventoryYear: InventoryYear;
}): Promise<InventoryYear | null> => {
	let req;
	switch (operation) {
		case 'add':
			req = supabase.from('inventory_years').insert(inventoryYear);
			break;
		case 'update':
			req = supabase
				.from('inventory_years')
				.update(inventoryYear)
				.eq('id', inventoryYear.id);
			break;
		case 'delete':
			req = supabase
				.from('inventory_years')
				.delete()
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
	onSuccess?: (data: InventoryYear) => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation<
		InventoryYear,
		Error,
		{ operation: MutationOperation; inventoryYear: InventoryYear }
	>({
		mutationFn: ({ operation, inventoryYear }) =>
			updateInventoryYear({ operation, inventoryYear }),
		onSuccess,
		onError,
	});
};

// Facilities
const getFacilities = async (workbookId: string): Promise<Facility[]> => {
	const { data, error } = await supabase
		.from('facilities')
		.select('*')
		.eq('workbook_id', workbookId);
	if (error) throw error;
	return data;
};

export const useGetFacilities = (workbookId: string) => {
	return useQuery<Facility[], Error>({
		queryKey: ['facilities', workbookId],
		queryFn: () => getFacilities(workbookId),
		staleTime: 5 * 60 * 1000,
	});
};

// Stationary Combustion

// Mobile Combustion

// Purchased Electricity

// Report
