import { Alert, Button, Container, Title, Text } from '@mantine/core';

const GlobalError = ({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) => {
	return (
		<Container>
			<Title order={1} align="center" mt="xl">
				Something went wrong
			</Title>
			<Text align="center">
				{' '}
				Please contact support if the problem persists.
			</Text>
			<Alert
				title="An unexpected error occurred"
				color="red"
				variant="filled"
				mt="md"
			>
				<Text>{error.message}</Text>
			</Alert>
			<Button mt="md" onClick={resetErrorBoundary} fullWidth>
				Try again
			</Button>
		</Container>
	);
};

export default GlobalError;
