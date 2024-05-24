import {
	Box,
	Button,
	Center,
	Container,
	Group,
	Paper,
	PasswordInput,
	SegmentedControl,
	TextInput,
	Transition,
	Alert,
	Loader,
	Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconMail,
	IconLock,
	IconAlertCircle,
	IconUserPlus,
	IconLogin,
} from '@tabler/icons-react';
import { useUser } from '../supabase/loader';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser, useRegisterUser } from '@/api/auth';
import { motion } from 'framer-motion';

export function Authentication() {
	const [activeSegment, setActiveSegment] = useState('login');
	const navigate = useNavigate();
	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},

		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
			password: (value) =>
				activeSegment === 'login'
					? null
					: value.length < 6
						? 'Password must be at least 6 characters long'
						: null,
			confirmPassword: (value, values) =>
				activeSegment === 'register' && value !== values.password
					? 'Passwords do not match'
					: null,
		},
	});
	const groupVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0 },
	};

	const paperVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { delay: 0.3 }
		},
	};
	const {
		mutate: login,
		isPending: isLoggingIn,
		error: loginError,
		reset: resetLogin,
	} = useLoginUser({
		onSuccess: () => {
			navigate('/');
		},
	});
	const {
		mutate: register,
		isPending: isRegistering,
		error: registerError,
		reset: resetRegister,
	} = useRegisterUser({
		onSuccess: () => {
			navigate('/');
		},
	});

	const isLoading = isLoggingIn || isRegistering;
	const error = loginError || registerError;
	const onSubmit = (values: {
		email: string;
		password: string;
		confirmPassword?: string;
	}) => {
		console.log(values);
		if (activeSegment === 'login') {
			login(values);
		} else {
			register(values);
		}
	};

	useEffect(() => {
		resetLogin();
		resetRegister();
	}, [activeSegment, resetLogin, resetRegister]);

	// Redirect if logged in
	const { user } = useUser();
	if (user) {
		return <Navigate to="/" />;
	}
	return (
		<Box h="100vh" w="100vw">
			<Center h="100vh" w="100%">
				<Container size={620} miw={440}>
					<motion.div
						initial="hidden"
						animate="visible"
						variants={groupVariants}
					>
						<Group
							bg="primary"
							style={{
								display: 'flex',
								alignItems: 'center',
								padding: 20,
							}}
						>
							<Image src={'/logo.png'} alt="logo" />
						</Group>
					</motion.div>
					<motion.div
						initial="hidden"
						animate="visible"
						variants={paperVariants}
					>
						<Paper
							shadow="xl"
							p={30}
							mt={30}
							radius="lg"
							style={{ transition: 'height 0.3s' }}
						>
							<SegmentedControl
								fullWidth
								value={activeSegment}
								onChange={(value) => setActiveSegment(value)}
								data={[
									{
										label: (
											<Center style={{ gap: 10 }}>
												<IconLogin />
												Login
											</Center>
										),
										value: 'login',
									},
									{
										label: (
											<Center style={{ gap: 10 }}>
												<IconUserPlus size={20} />
												Register
											</Center>
										),
										value: 'register',
									},
								]}
							/>
							<form onSubmit={loginForm.onSubmit(onSubmit)}>
								<TextInput
									mt="md"
									label="Email"
									placeholder="Email"
									required
									leftSection={<IconMail />}
									{...loginForm.getInputProps('email')}
								/>
								<PasswordInput
									label="Password"
									placeholder="Password"
									required
									mt="md"
									leftSection={<IconLock />}
									{...loginForm.getInputProps('password')}
								/>
								<Transition
									mounted={activeSegment === 'register'}
									transition="fade"
									duration={300}
									timingFunction="ease"
								>
									{(styles) => (
										<PasswordInput
											label="Confirm Password"
											placeholder="Your password"
											required
											mt="md"
											leftSection={<IconLock />}
											{...loginForm.getInputProps(
												'confirmPassword',
											)}
											style={styles}
										/>
									)}
								</Transition>

								{isLoading && (
									<Center mt="xl">
										<Loader />
									</Center>
								)}

								{error && (
									<Alert
										mt="md"
										color="red"
										onClose={() => {
											resetLogin();
											resetRegister();
										}}
										withCloseButton
										icon={<IconAlertCircle />}
									>
										{error instanceof Error
											? error.message
											: 'An error occurred'}
									</Alert>
								)}

								<Button
									fullWidth
									mt="xl"
									type="submit"
									loading={isLoading}
									variant="gradient"
									loaderProps={{ type: 'dots' }}
								>
									{activeSegment === 'login'
										? 'Login'
										: 'Register'}
								</Button>
							</form>
						</Paper>
					</motion.div>
				</Container>
			</Center>
		</Box>
	);
}
