import type { InventoryYear } from '@/types';
import { Box, Text } from '@mantine/core';

const InventoryYearRow = ({ year }: { year: InventoryYear }) => {
	return (
		<Box key={year.year}>
			<Text fz="md" fw={700}>
				{year.year}
			</Text>
			<Text c="dimmed" ml="lg">
				{year.description}
			</Text>
		</Box>
	);
};

export default InventoryYearRow;
