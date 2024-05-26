import {
	Box,
	Button,
	Center,
	Container,
	Paper,
	PasswordInput,
	SegmentedControl,
	TextInput,
	Transition,
	Alert,
	Image,
	Text,
	Group,
	Title,
	useMantineColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconMail,
	IconLock,
	IconAlertCircle,
	IconUserPlus,
	IconLogin,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUser, useRegisterUser } from '@/api/auth';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { $currUser } from '@/stores/user';

export function Authentication() {
	const [activeSegment, setActiveSegment] = useState('login');
	const user = useStore($currUser);
	const { colorScheme } = useMantineColorScheme();
	const navigate = useNavigate();
	const loginForm = useForm({
		initialValues: {
			email: '',
			password: '',
		},
	});
	const registerForm = useForm({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			email: (value) =>
				/^\S+@\S+$/.test(value) ? null : 'Invalid email',
			password: (value) =>
				value.length < 6
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
			transition: { delay: 0.3 },
		},
	};
	const {
		mutate: login,
		isPending: isLoggingIn,
		error: loginError,
		reset: resetLogin,
	} = useLoginUser({
		onSuccess: () => {
			navigate('/appid');
		},
	});
	const {
		mutate: register,
		isPending: isRegistering,
		error: registerError,
		reset: resetRegister,
	} = useRegisterUser({
		onSuccess: () => {
			navigate('/appid');
		},
	});

	const isLoading = isLoggingIn || isRegistering;
	const error = loginError || registerError;
	const onSubmit = (values: {
		email: string;
		password: string;
		confirmPassword?: string;
	}) => {
		if (activeSegment === 'login') {
			login(values);
		} else {
			register(values);
		}
	};

	useEffect(() => {
		if (user) {
			navigate('/appId');
		}
		resetLogin();
		resetRegister();
	}, [activeSegment, navigate, resetLogin, resetRegister, user]);
	const isLogin = activeSegment === 'login';

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
							align="center"
							justify="flex-start"
							wrap="nowrap"
						>
							<Image
								src={'/icon.png'}
								alt="logo"
								style={{ height: 100 }}
							/>
							<Box>
								<Title
									fw={400}
									style={{
										fontSize: '2.5rem',
										lineHeight: 0.7,
										color:
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-1)'
												: 'var(--mantine-color-dark-3)',
									}}
								>
									GREENHOUSE
								</Title>
								<Title
									fw={400}
									style={{
										fontSize: '2.5rem',
										color:
											colorScheme === 'dark'
												? 'var(--mantine-color-dark-1)'
												: 'var(--mantine-color-dark-3)',
									}}
								>
									GAS PROTOCOL
								</Title>
							</Box>
						</Group>
					</motion.div>
					<Text size="md" mt="md" variant="gradient" fw={400}>
						{/* Igniting the Green Factory Revolution with Data-Driven */}
						{/* Decisions "Empowering Greener Manufacturing, One */}
						{/* Facility at a Time" "Measure, Manage, and Mitigate: Your */}
						{/* Path to Cleaner Production"  */}
						"Catalyzing Sustainable Manufacturing Through Smarter
						Energy Insights"
						{/* "Igniting */}
						{/* the Green Factory Revolution with Data-Driven Decisions" */}
						{/* "Transforming Energy Data into Sustainable Manufacturing */}
						{/* Strategies" */}
					</Text>
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
							<Text align="center" pb="lg">
								To get started, please create an account or
								login.
							</Text>
							<SegmentedControl
								fullWidth
								value={activeSegment}
								onChange={(value) => setActiveSegment(value)}
								radius="lg"
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
							<form
								onSubmit={
									isLogin
										? loginForm.onSubmit(onSubmit)
										: registerForm.onSubmit(onSubmit)
								}
							>
								<TextInput
									mt="md"
									placeholder="Email"
									radius="lg"
									required
									leftSection={<IconMail />}
									{...(isLogin
										? loginForm.getInputProps('email')
										: registerForm.getInputProps('email'))}
								/>
								<PasswordInput
									placeholder="Password"
									required
									radius="lg"
									mt="md"
									leftSection={<IconLock />}
									{...(isLogin
										? loginForm.getInputProps('password')
										: registerForm.getInputProps(
												'password',
											))}
								/>
								<Transition
									mounted={activeSegment === 'register'}
									transition="fade"
									duration={400}
									timingFunction="ease"
								>
									{(styles) => (
										<PasswordInput
											placeholder="Your password"
											required
											mt="md"
											radius="lg"
											leftSection={<IconLock />}
											{...registerForm.getInputProps(
												'confirmPassword',
											)}
											style={styles}
										/>
									)}
								</Transition>
								<Text size="sm" mt="md" align="center">
									{activeSegment === 'login'
										? "Don't have an account? "
										: 'Already have an account? '}
									<Text
										span
										variant="gradient"
										fw={700}
										style={{ cursor: 'pointer' }}
										onClick={() =>
											setActiveSegment(
												activeSegment === 'login'
													? 'register'
													: 'login',
											)
										}
									>
										{activeSegment === 'login'
											? 'Create one'
											: 'Login'}
									</Text>
								</Text>
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
						</Paper>
					</motion.div>
				</Container>
			</Center>
		</Box>
	);
}
