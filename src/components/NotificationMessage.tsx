import { Box, Button, Text } from '@mantine/core';

const NotificationMessage = ({
	message,
	action,
}: {
	message: React.ReactNode;
	action?: () => void;
}) => {
	return (
		<Box>
			<Text>{message}</Text>
			{action && (
				<Button variant="subtle" onClick={() => action()}>
					Undo
				</Button>
			)}
		</Box>
	);
};

export default NotificationMessage;
