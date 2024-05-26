import { Button, Container, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate('/appid');
	};

	return (
		<Container style={{ textAlign: 'center', marginTop: '50px' }}>
			<Title order={1}>404 - Page Not Found</Title>
			<Text size="lg" mt="md">
				The page you are looking for does not exist.
			</Text>
			<Button variant="outline" mt="xl" onClick={handleGoHome}>
				Go to Home
			</Button>
		</Container>
	);
};

export default NotFound;
