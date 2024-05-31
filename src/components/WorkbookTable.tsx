import type {
	MobileCombustionData,
	StationaryCombustionData,
	PurchasedElectricityData,
	RowComponentProps,
} from '@/types';
import { Accordion, Center, Paper, Text } from '@mantine/core';
import WorkbookRow from './WorkbookRow';
import classes from '@/css/Workbook.module.css';
import { useState } from 'react';

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
	const [animatedRow, setAnimatedRow] = useState<string | null>(null);
	const triggerAnimation = (id: string) => {
		setAnimatedRow(id);
		setTimeout(() => setAnimatedRow(null), 1000);
	};
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
						<WorkbookRow
							key={index}
							item={item}
							className={
								animatedRow === item.facilityId
									? classes['scale-up-down']
									: ''
							}
						>
							<RowComponent
								item={item}
								triggerAnimation={() =>
									triggerAnimation(item.facilityId)
								}
							/>
						</WorkbookRow>
					))}
				</Paper>
			))}
		</Accordion>
	);
};

export default WorkbookTable;
