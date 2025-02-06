import {
	Box,
	Button,
	Container,
	Paper,
	PasswordInput,
	Alert,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabase/supabaseClient';

export default function ResetPassword() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validate: {
			password: (value) =>
				value.length < 6
					? 'Password must be at least 6 characters long'
					: null,
			confirmPassword: (value, values) =>
				value !== values.password ? 'Passwords do not match' : null,
		},
	});

	const handleSubmit = async (values: {
		password: string;
		confirmPassword: string;
	}) => {
		try {
			setIsLoading(true);
			setError(null);
			const { error: updateError } = await supabase.auth.updateUser({
				password: values.password,
			});

			if (updateError) throw updateError;

			// Password updated successfully
			navigate('/');
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to update password',
			);
		} finally {
			setIsLoading(false);
		}
	};

	// Check if user is authenticated
	useEffect(() => {
		const checkSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			if (!session) {
				navigate('/auth');
			}
		};
		checkSession();
	}, [navigate]);

	return (
		<Box h="100vh" w="100vw" bg="var(--mantine-color-gray-0)">
			<Container size={420} pt={40}>
				<Title order={2} ta="center" mb={30}>
					Reset Your Password
				</Title>
				<Paper withBorder shadow="md" p={30} radius="md">
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<PasswordInput
							label="New Password"
							placeholder="Enter your new password"
							required
							mt="md"
							leftSection={<IconLock size={16} />}
							{...form.getInputProps('password')}
						/>
						<PasswordInput
							label="Confirm Password"
							placeholder="Confirm your new password"
							required
							mt="md"
							leftSection={<IconLock size={16} />}
							{...form.getInputProps('confirmPassword')}
						/>

						{error && (
							<Alert
								mt="md"
								color="red"
								icon={<IconAlertCircle />}
							>
								{error}
							</Alert>
						)}

						<Button
							fullWidth
							mt="xl"
							type="submit"
							loading={isLoading}
							variant="gradient"
						>
							Reset Password
						</Button>
					</form>
				</Paper>
			</Container>
		</Box>
	);
}
