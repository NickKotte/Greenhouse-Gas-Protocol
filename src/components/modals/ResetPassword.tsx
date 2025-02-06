import { Modal, TextInput, Button, Text, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMail, IconAlertCircle } from '@tabler/icons-react';
import { useResetPassword } from '@/api/auth';

interface ResetPasswordModalProps {
	opened: boolean;
	onClose: () => void;
}

export default function ResetPasswordModal({
	opened,
	onClose,
}: ResetPasswordModalProps) {
	const form = useForm({
		initialValues: {
			email: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
		},
	});

	const {
		mutate: resetPassword,
		isPending,
		isSuccess,
		error,
		reset,
	} = useResetPassword({
		onSuccess: () => {
			form.reset();
		},
	});

	const handleClose = () => {
		form.reset();
		reset();
		onClose();
	};

	return (
		<Modal
			opened={opened}
			onClose={handleClose}
			title="Reset Password"
			size="md"
		>
			{isSuccess ? (
				<>
					<Text>
						If an account exists for {form.values.email}, you will
						receive a password reset link shortly.
					</Text>
					<Button
						fullWidth
						mt="xl"
						onClick={handleClose}
						variant="gradient"
					>
						Close
					</Button>
				</>
			) : (
				<form
					onSubmit={form.onSubmit((values) => resetPassword(values))}
				>
					<Text size="sm" mb="lg">
						Enter your email address and we'll send you a link to
						reset your password.
					</Text>
					<TextInput
						required
						placeholder="Email"
						label="Email"
						leftSection={<IconMail size={16} />}
						{...form.getInputProps('email')}
					/>
					{error && (
						<Alert mt="md" color="red" icon={<IconAlertCircle />}>
							{error instanceof Error
								? error.message
								: 'An error occurred'}
						</Alert>
					)}
					<Button
						fullWidth
						mt="xl"
						type="submit"
						loading={isPending}
						variant="gradient"
					>
						Send Reset Link
					</Button>
				</form>
			)}
		</Modal>
	);
}
