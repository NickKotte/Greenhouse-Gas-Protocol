import {
	Accordion,
	Box,
	Divider,
	Grid,
	Group,
	NumberFormatter,
	Text,
} from '@mantine/core';
import classes from '@/css/Workbook.module.css';
import type {
	MobileCombustionData,
	PurchasedElectricityData,
	StationaryCombustionData,
} from '@/types';

const WorkbookRow = ({
	children,
	item,
	className,
}: {
	children: React.ReactNode;
	item:
		| StationaryCombustionData
		| MobileCombustionData
		| PurchasedElectricityData;
	className?: string;
}) => {
	return (
		<Accordion.Item
			key={item.facilityId}
			value={item.facilityId}
			style={{
				borderBottom: 'none',
			}}
		>
			<Group
				gap="0px"
				my="xs"
				align="stretch"
				className={classes.container}
			>
				<Box flex={1} className={`${classes.row} ${className}`}>
					<Grid grow className={classes.userData}>
						{children}
					</Grid>
					<Accordion.Panel>
						<Divider my="xs" />
						<Grid className={classes.ghgEmissions}>
							<Grid.Col span={2}>
								<Text c="dimmed" size="sm">
									CO2
								</Text>
								<Text c="orange">
									<NumberFormatter
										value={item.co2Tonnes}
										decimalScale={3}
										suffix=" t"
									/>
								</Text>
							</Grid.Col>
							<Grid.Col span={2}>
								<Text c="dimmed" size="sm">
									CH4
								</Text>
								<Text c="orange">
									<NumberFormatter
										value={item.ch4Tonnes}
										decimalScale={3}
										suffix=" t"
									/>
								</Text>
							</Grid.Col>
							<Grid.Col span={2}>
								<Text c="dimmed" size="sm">
									N2O
								</Text>
								<Text c="orange">
									<NumberFormatter
										value={item.n2oTonnes}
										decimalScale={3}
										suffix=" t"
									/>
								</Text>
							</Grid.Col>
							<Grid.Col span={2}>
								<Text c="dimmed" size="sm">
									CO2e
								</Text>
								<Text c="orange">
									<NumberFormatter
										value={item.co2eTonnes}
										decimalScale={3}
										suffix=" t"
									/>
								</Text>
							</Grid.Col>
							<Grid.Col span={2}>
								<Text c="dimmed" size="sm">
									Biofuels
								</Text>
								{'biofuelCo2Tonnes' in item && (
									<Text c="orange">
										<NumberFormatter
											value={item?.biofuelCo2Tonnes}
											decimalScale={3}
											suffix=" t"
										/>
									</Text>
								)}
							</Grid.Col>
						</Grid>
					</Accordion.Panel>
				</Box>
				<Accordion.Control w="fit-content">
					<Box>
						<Text size="sm" c="dimmed">
							{'efKgCo2e' in item ? 'kgCO2e/unit' : 'kgCO2e/kWh'}
						</Text>
						<Text variant="text" c="orange" size="lg">
							<NumberFormatter
								value={
									'efKgCo2e' in item
										? item.efKgCo2e
										: item.efKgCo2ePerKwh
								}
								decimalScale={3}
							/>
						</Text>
					</Box>
				</Accordion.Control>
			</Group>
		</Accordion.Item>
	);
};

export default WorkbookRow;
