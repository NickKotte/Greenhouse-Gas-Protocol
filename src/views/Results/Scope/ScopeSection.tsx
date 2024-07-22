import { Stack, Text } from '@mantine/core';

const ScopeSection = ({ title }: { title: string }) => {
	return (
		<Stack>
			<Text>{title}</Text>
		</Stack>
	);
};

export default ScopeSection;
