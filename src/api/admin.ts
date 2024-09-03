import { useMutation, useQuery } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';

// Assign admin role
const assignAdminRole = async (targetUserId: string) => {
	const { data, error } = await supabase.rpc('assign_admin_role_rpc', {
		target_user_id: targetUserId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useAssignAdminRole = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: assignAdminRole,
		onSuccess,
		onError,
	});
};

// Remove admin role
const removeAdminRole = async (targetUserId: string) => {
	const { data, error } = await supabase.rpc('remove_admin_role_rpc', {
		target_user_id: targetUserId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useRemoveAdminRole = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: removeAdminRole,
		onSuccess,
		onError,
	});
};

// Get all admins
const getAllAdmins = async () => {
	const { data, error } = await supabase.rpc('get_all_admins_rpc');
	if (error) throw new Error(error.message);
	return data;
};

export const useGetAllAdmins = () => {
	return useQuery({
		queryKey: ['admins'],
		queryFn: getAllAdmins,
	});
};

const getAllUsersWithRoles = async () => {
	const { data, error } = await supabase.rpc('get_all_users_with_roles_rpc');
	if (error) throw new Error(error.message);
	return data;
};
export const useGetAllUsersWithRoles = () => {
	return useQuery({
		queryKey: ['users-with-roles'],
		queryFn: getAllUsersWithRoles,
	});
};

const getUserDetails = async (userId: string) => {
	const { data, error } = await supabase.rpc('get_user_details_rpc', {
		input_user_id: userId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useGetUserDetails = (userId: string) => {
	return useQuery({
		queryKey: ['user-details', userId],
		queryFn: () => getUserDetails(userId),
	});
};

const deleteUsers = async (userIds: string[]) => {
	const { data, error } = await supabase.rpc('delete_users_rpc', {
		user_ids: userIds,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useDeleteUsers = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: deleteUsers,
		onSuccess,
		onError,
	});
};

const addUserToWorkbook = async (email: string, workbookId: string) => {
	const { data, error } = await supabase.rpc('invite_user_to_workbook', {
		p_invited_user_email: email,
		p_workbook_id: workbookId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useAddUserToWorkbook = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: ({
			email,
			workbookId,
		}: {
			userId: string;
			email: string;
			workbookId: string;
		}) => addUserToWorkbook(email, workbookId),
		onSuccess,
		onError,
	});
};

const removeUserFromWorkbook = async (email: string, workbookId: string) => {
	const { data, error } = await supabase.rpc('remove_user_from_workbook', {
		p_removed_user_email: email,
		p_workbook_id: workbookId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useRemoveUserFromWorkbook = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: ({
			email,
			workbookId,
		}: {
			userId: string;
			email: string;
			workbookId: string;
		}) => removeUserFromWorkbook(email, workbookId),
		onSuccess,
		onError,
	});
};

const getWorkbookUsers = async (workbookId: string) => {
	const { data, error } = await supabase.rpc('list_workbook_users', {
		p_workbook_id: workbookId,
	});
	if (error) throw new Error(error.message);
	return data;
};

export const useGetWorkbookUsers = (workbookId: string) => {
	return useQuery({
		queryKey: ['workbook-users', workbookId],
		queryFn: () => getWorkbookUsers(workbookId),
	});
};