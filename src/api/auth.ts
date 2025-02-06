import { useMutation } from '@tanstack/react-query';
import supabase from '@/supabase/supabaseClient';
import type { AuthResponse } from '@supabase/supabase-js';

const loginUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const useLoginUser = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: loginUser,
		onSuccess,
		onError,
	});
};

const registerUser = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const { data, error } = await supabase.auth.signUp({ email, password });
	if (error) {
		throw new Error(error.message);
	}
	return data;
};

export const useRegisterUser = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: AuthResponse['data']) => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: registerUser,
		onSuccess,
		onError,
	});
};

const resetPassword = async ({ email }: { email: string }) => {
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`,
	});
	if (error) {
		throw new Error(error.message);
	}
	return true;
};

export const useResetPassword = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: resetPassword,
		onSuccess,
		onError,
	});
};
