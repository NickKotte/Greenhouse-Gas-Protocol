import type {
	MobileCombustionData,
	StationaryCombustionData,
	PurchasedElectricityData,
} from '@/types';
import { Accordion, Center, Paper, Text } from '@mantine/core';
import WorkbookRow from './WorkbookRow';

interface RowComponentProps<T> {
	item: T;
}

const WorkbookTable = <
	T extends
		| StationaryCombustionData
		| MobileCombustionData
		| PurchasedElectricityData,
>({
	values,
	RowComponent,
}: {
	values: T[][];
	RowComponent: React.ComponentType<RowComponentProps<T>>;
}) => {
	if (!RowComponent) {
		return null;
	}
	if (values.length === 0) {
		return (
			<Center>
				<Text size="sm" c="dimmed">
					No data to display. Start by hitting the add button.
				</Text>
			</Center>
		);
	}
	return (
		<Accordion multiple>
			{values.map((row, index) => (
				<Paper p="lg" mb="md" radius="md" key={index}>
					<Text size="xl" mb="md" fw={700}>
						{row[0].year}
					</Text>
					{row.map((item, index) => (
						<WorkbookRow key={index} item={item}>
							<RowComponent item={item} />
						</WorkbookRow>
					))}
				</Paper>
			))}
		</Accordion>
	);
};

export default WorkbookTable;
