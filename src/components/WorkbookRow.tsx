import {
	Accordion,
	Box,
	Divider,
	Grid,
	Group,
	Text,
	Tooltip,
} from '@mantine/core';
import classes from '@/css/Workbook.module.css';
import type {
	MobileCombustionData,
	PurchasedElectricityData,
	StationaryCombustionData,
} from '@/types';
import { forwardRef, useEffect, useState } from 'react';

export const Number = ({ value, label }: { value: number; label: string }) => {
	const formatNumber = (value: number) => {
		if (value === 0 || !value) {
			return '0';
		} else if (value < 1) {
			return value.toExponential(3);
		}
		return value.toFixed(3);
	};

	return (
		<>
			<Text c="dimmed" size="sm">
				{label}
			</Text>
			<Tooltip label={`${value} tonnes`}>
				<Text c="darkorange">{formatNumber(value)} t</Text>
			</Tooltip>
		</>
	);
};

const WorkbookRow = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		item:
			| StationaryCombustionData
			| MobileCombustionData
			| PurchasedElectricityData;
		className?: string;
		index: number;
	}
>(({ children, item, className, index }, ref) => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, index * 100);
	}, [index]);
	return (
		<Accordion.Item
			key={item.facilityId}
			value={item.facilityId}
			style={{
				borderBottom: 'none',
			}}
			ref={ref}
		>
			<Group
				gap="0px"
				my="xs"
				align="stretch"
				className={`${classes.container} ${show ? classes[`slide-in-from-right`] : ''}`}
				style={{
					opacity: show ? 1 : 0,
				}}
			>
				<Box flex={1} className={`${classes.row} ${className}`}>
					<Grid grow className={classes.userData}>
						{children}
					</Grid>
					<Accordion.Panel>
						<Divider my="xs" />
						<Grid className={classes.ghgEmissions}>
							<Grid.Col span={2}>
								<Number value={item.co2Tonnes} label="CO2" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number value={item.ch4Tonnes} label="CH4" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number value={item.n2oTonnes} label="N2O" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number value={item.co2eTonnes} label="CO2e" />
							</Grid.Col>
							<Grid.Col span={2}>
								{'biofuelCo2Tonnes' in item && (
									<Number
										value={item.biofuelCo2Tonnes}
										label="Biofuels"
									/>
								)}
							</Grid.Col>
						</Grid>
					</Accordion.Panel>
				</Box>
				<Accordion.Control w="fit-content">
					<Box>
						<Number
							value={
								'efKgCo2e' in item
									? item.efKgCo2e
									: item.efKgCo2ePerKwh
							}
							label={
								'efKgCo2e' in item
									? 'kgCO2e/unit'
									: 'kgCO2e/kWh'
							}
						/>
					</Box>
				</Accordion.Control>
			</Group>
		</Accordion.Item>
	);
});

export default WorkbookRow;
