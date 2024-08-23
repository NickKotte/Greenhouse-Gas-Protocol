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
