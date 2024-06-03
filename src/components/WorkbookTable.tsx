import type {
	MobileCombustionData,
	StationaryCombustionData,
	PurchasedElectricityData,
	WorkbookType,
} from '@/types';
import {
	Accordion,
	Box,
	Center,
	Divider,
	Group,
	Text,
	Space,
} from '@mantine/core';
import WorkbookRow from './WorkbookRow';
import classes from '@/css/Workbook.module.css';
import { $animatedRow, workbook } from '@/stores/app';
import { useStore } from '@nanostores/react';
import PERow from '@/views/PurchasedElectricity/PERow';
import SCRow from '@/views/StationaryCombustion/SCRow';
import MCRow from '@/views/MobileCombustion/MCRow';
import { useEffect, useState } from 'react';
import { mockData } from '@/constants';
import { useRef } from 'react';
import WorkbookDivider from './WorkbookDivider';

const WorkbookTable = ({ type }: { type: WorkbookType }) => {
	const [openRows, setOpenRows] = useState<string[]>([]);
	const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
	const animatedRow = useStore($animatedRow);
	const values = useStore(workbook.items) as
		| PurchasedElectricityData[][]
		| StationaryCombustionData[][]
		| MobileCombustionData[][];

	const toggleExpandAll = (year: number, expanded: boolean) => {
		const rowsOfYear = values
			.flat()
			.filter((row) => row.year === year)
			.map((row) => row.facilityId);
		setOpenRows(
			expanded
				? [
						...openRows.filter(
							(facilityId) => !rowsOfYear.includes(facilityId),
						),
					]
				: [...openRows, ...rowsOfYear],
		);
	};

	const handleAddOpenRow = (values: string[]) => {
		const filteredValues = values.filter((value) => value !== '');
		setOpenRows(filteredValues);
		rowRefs.current[values[values.length - 1]]?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	};

	useEffect(() => {
		// clear everytime type changes just in case
		workbook.setItems(mockData[type]);
		return () => {
			workbook.setItems([]);
		};
	}, [type]);
	useEffect(() => {
		if (animatedRow && rowRefs.current[animatedRow]) {
			const element = rowRefs.current[animatedRow];

			if (element) {
				const rect = element.getBoundingClientRect();
				const buffer = 100;

				if (
					rect.top < buffer ||
					rect.bottom > window.innerHeight - buffer
				) {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			}
		}
		setOpenRows((prev) => [...prev, animatedRow ?? '']);
	}, [animatedRow]);
	if (!WorkbookRow) {
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
		<Box pb="xl" px="md">
			<Accordion
				multiple
				styles={{
					control: {
						backgroundColor:
							'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-9))',
						borderRadius:
							'0 var(--mantine-radius-md) var(--mantine-radius-md) 0',
					},
				}}
				value={[...openRows, animatedRow ?? '']}
				onChange={handleAddOpenRow}
			>
				{values.map((row, index) => (
					<Box mb="md" key={index}>
						<WorkbookDivider
							year={row[0].year}
							expandSection={toggleExpandAll}
						/>
						<Group wrap="nowrap">
							<Divider orientation="vertical" size="md" my="sm" />
							<Box style={{ flex: 1 }}>
								{row.map((item, rowIndex) => (
									<WorkbookRow
										key={rowIndex}
										index={rowIndex + index}
										ref={(el) =>
											(rowRefs.current[item.facilityId] =
												el)
										}
										item={item}
										className={`${animatedRow === item.facilityId ? classes['scale-up-down'] : ''}`}
									>
										{type === 'PurchasedElectricity' && (
											<PERow
												item={
													item as PurchasedElectricityData
												}
											/>
										)}
										{type === 'StationaryCombustion' && (
											<SCRow
												item={
													item as StationaryCombustionData
												}
											/>
										)}
										{type === 'MobileCombustion' && (
											<MCRow
												item={
													item as MobileCombustionData
												}
											/>
										)}
									</WorkbookRow>
								))}
							</Box>
						</Group>
					</Box>
				))}
			</Accordion>
			<Space h={100} />
		</Box>
	);
};

export default WorkbookTable;
