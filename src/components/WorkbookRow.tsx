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
	MobileCombustion,
	PurchasedElectricity,
	StationaryCombustion,
} from '@/types';
import { forwardRef, useEffect, useState } from 'react';

export const Number = ({
	value,
	label,
	units = 't',
}: {
	value?: number;
	label: string;
	units?: string;
}) => {
	const formatNumber = (value?: number) => {
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
				<Text c="orange">
					{formatNumber(value)} {units}
				</Text>
			</Tooltip>
		</>
	);
};

const WorkbookRow = forwardRef<
	HTMLDivElement,
	{
		children: React.ReactNode;
		item: StationaryCombustion | MobileCombustion | PurchasedElectricity;
		className?: string;
		index: number;
	}
>(({ children, item, className, index }, ref) => {
	const [show, setShow] = useState(false);
	const { results } = item;
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, index * 100);
	}, [index]);
	return (
		<Accordion.Item
			key={item.id}
			value={item.id}
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
				<Box flex={8} className={`${classes.row} ${className}`}>
					<Grid grow className={classes.userData}>
						{children}
					</Grid>
					<Accordion.Panel>
						<Divider my="xs" />
						<Grid className={classes.ghgEmissions}>
							<Grid.Col span={2}>
								<Number value={results?.co2} label="CO2" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number value={results?.ch4} label="CH4" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number value={results?.n2o} label="N2O" />
							</Grid.Col>
							<Grid.Col span={2}>
								<Number
									value={results?.ef}
									label={`EF`}
									units="kgCO2e/unit"
								/>
							</Grid.Col>
							<Grid.Col span={2}>
								{'biofuelCo2Tonnes' in item && (
									<Number
										value={results?.bio}
										label="Biofuels"
									/>
								)}
							</Grid.Col>
						</Grid>
					</Accordion.Panel>
				</Box>
				<Accordion.Control w="fit-content" flex={1}>
					<Box>
						<Number value={results?.co2e} label="CO2e" />
					</Box>
				</Accordion.Control>
			</Group>
		</Accordion.Item>
	);
});

export default WorkbookRow;
