import { emissionsColors } from '@/constants';
import { Box, Flex, Text } from '@mantine/core';

const ColorLegend = () => {
	return (
		<Flex gap="xs" align="center">
			{Object.entries(emissionsColors).map(([key, color]) => (
				<Flex key={key} align="center" gap="xs">
					<Box bg={color} w={10} h={10} />
					<Text>{key}</Text>
				</Flex>
			))}
		</Flex>
	);
};

export default ColorLegend;
