import {
	Stack,
	Title,
	Accordion,
	Progress,
	Box,
	Collapse,
	Space,
	Divider,
	Flex,
	Button,
} from '@mantine/core';
import YearOverview from './YearOverview';
import { useGetAllCombustionData } from '@/api/workbook/results.api';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import Facility from './Facility';
import type {
	AggregatedEmissions,
	MobileCombustion,
	PurchasedElectricity,
	StationaryCombustion,
} from '@/types';
import FacilityBody from './FacilityBody';
import ColorLegend from './ColorLegend';
import { IconDownload } from '@tabler/icons-react';
import { toPng } from 'html-to-image';

// eslint-disable-next-line react-refresh/only-export-components
const Results = () => {
	const [stationary, mobile, purchased] = useGetAllCombustionData();
	const [aggregatedEmissions, setAggregatedEmissions] =
		useState<AggregatedEmissions | null>(null);
	const isLoading =
		stationary.isLoading || mobile.isLoading || purchased.isLoading;
	const progress =
		(stationary.isSuccess ? 33 : 0) +
		(mobile.isSuccess ? 33 : 0) +
		(purchased.isSuccess ? 34 : 0);
	const emissions = useMemo(() => {
		if (!stationary.data || !mobile.data || !purchased.data) {
			return null;
		}

		const allData = [...stationary.data, ...mobile.data, ...purchased.data];
		const emissions: AggregatedEmissions = {};

		const initializeEmissionResults = () => ({
			co2: 0,
			co2e: 0,
			ch4: 0,
			bio: 0,
			n2o: 0,
			ef: 0,
			total: 0,
		});

		const calculateTotal = (results: any) =>
			results.co2 +
			results.co2e +
			results.ch4 +
			results.bio +
			results.n2o;

		const addEmissions = (target: any, source: any) => {
			target.co2 += source.co2 || 0;
			target.co2e += source.co2e || 0;
			target.ch4 += source.ch4 || 0;
			target.bio += source.bio || 0;
			target.n2o += source.n2o || 0;
			target.ef += source.ef || 0;
			target.total = calculateTotal(target);
		};

		allData.forEach((item) => {
			if (!item.facility_id || !item.results || !item.year) return;

			if (!emissions[item.facility_id]) {
				emissions[item.facility_id] = {
					facility_name: item.facility?.name || 'error',
					facility_id: item.facility_id,
					results: initializeEmissionResults(),
					total_emissions: 0,
					yearly_emissions: [],
				};
			}

			const facilityEmissions = emissions[item.facility_id];

			addEmissions(facilityEmissions.results, item.results);

			let yearlyEmission = facilityEmissions.yearly_emissions.find(
				(ye) => ye.year === item.year,
			);
			if (!yearlyEmission) {
				yearlyEmission = {
					year: item.year,
					emissions: initializeEmissionResults(),
					scope1: {
						total: 0,
						stationaryResults: initializeEmissionResults(),
						combustionResults: initializeEmissionResults(),
					},
					scope2: {
						total: 0,
						electricityResults: initializeEmissionResults(),
					},
				};
				facilityEmissions.yearly_emissions.push(yearlyEmission);
			}

			addEmissions(yearlyEmission.emissions, item.results);

			if (stationary.data.includes(item as StationaryCombustion)) {
				addEmissions(
					yearlyEmission.scope1.stationaryResults,
					item.results,
				);
			} else if (mobile.data.includes(item as MobileCombustion)) {
				addEmissions(
					yearlyEmission.scope1.combustionResults,
					item.results,
				);
			} else if (purchased.data.includes(item as PurchasedElectricity)) {
				addEmissions(
					yearlyEmission.scope2.electricityResults,
					item.results,
				);
			}
		});

		Object.values(emissions).forEach((facilityEmissions) => {
			facilityEmissions.total_emissions = calculateTotal(
				facilityEmissions.results,
			);

			facilityEmissions.yearly_emissions.forEach((yearlyEmission) => {
				yearlyEmission.emissions.total = calculateTotal(
					yearlyEmission.emissions,
				);

				yearlyEmission.scope1.total =
					calculateTotal(yearlyEmission.scope1.stationaryResults) +
					calculateTotal(yearlyEmission.scope1.combustionResults);

				yearlyEmission.scope2.total = calculateTotal(
					yearlyEmission.scope2.electricityResults,
				);
			});

			facilityEmissions.yearly_emissions.sort((a, b) => a.year - b.year);
		});

		console.log(emissions);
		return emissions;
	}, [stationary.data, mobile.data, purchased.data]);

	useEffect(() => {
		setAggregatedEmissions(emissions);
	}, [emissions]);

	const getTotalEmissionsByYear = useMemo(() => {
		if (!emissions) return null;

		const yearlyTotals: { [year: number]: any } = {};

		Object.values(emissions).forEach((facilityEmission) => {
			facilityEmission.yearly_emissions.forEach((yearlyEmission) => {
				if (!yearlyTotals[yearlyEmission.year]) {
					yearlyTotals[yearlyEmission.year] = {
						co2: 0,
						co2e: 0,
						ch4: 0,
						bio: 0,
						n2o: 0,
						ef: 0,
						total: 0,
					};
				}

				const yearTotal = yearlyTotals[yearlyEmission.year];
				yearTotal.co2 += yearlyEmission.emissions.co2;
				yearTotal.co2e += yearlyEmission.emissions.co2e;
				yearTotal.ch4 += yearlyEmission.emissions.ch4;
				yearTotal.bio += yearlyEmission.emissions.bio;
				yearTotal.n2o += yearlyEmission.emissions.n2o;
				yearTotal.ef += yearlyEmission.emissions.ef;
				yearTotal.total += yearlyEmission.emissions.total;
			});
		});

		// Convert to array and sort by year
		const sortedTotalsByYear = Object.entries(yearlyTotals)
			.map(([year, emissions]) => ({
				year: parseInt(year),
				emissions,
			}))
			.sort((a, b) => b.year - a.year);

		return sortedTotalsByYear;
	}, [emissions]);
	const totalEmissionsByYear = getTotalEmissionsByYear;

	const reportRef = useRef<HTMLDivElement>(null);

	const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

	const [openedAccordionItems, setOpenedAccordionItems] = useState<string[]>(
		[],
	);

	const handleDownload = async () => {
		if (!emissions || !totalEmissionsByYear || !reportRef.current) return;
		const oldOpenedAccordionItems = openedAccordionItems;

		setIsGeneratingPdf(true);
		try {
			// Open all accordion items
			const facilityIds = Object.keys(emissions);
			setOpenedAccordionItems(facilityIds);

			// Add temporary styles to prevent text wrapping
			const style = document.createElement('style');
			style.innerHTML = `
				* {
					white-space: nowrap !important;
					text-overflow: initial !important;
				}
			`;
			document.head.appendChild(style);

			// Wait for accordion animation to complete
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const dataUrl = await toPng(reportRef.current, {
				quality: 1.0,
				pixelRatio: 2,
			});

			// Create download link
			const link = document.createElement('a');
			link.download = 'emissions-report.png';
			link.href = dataUrl;
			link.click();

			// Clean up temporary styles
			document.head.removeChild(style);

			// Close all accordion items
			setOpenedAccordionItems(oldOpenedAccordionItems);
		} catch (error) {
			console.error('Error generating image:', error);
		} finally {
			setIsGeneratingPdf(false);
		}
	};

	return (
		<Box>
			<Collapse in={isLoading} transitionDuration={1000}>
				<Progress
					value={progress}
					transitionDuration={200}
					color="green"
					animated
					autoContrast
				/>
			</Collapse>

			<Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					leftSection={<IconDownload size={16} />}
					onClick={handleDownload}
					disabled={isLoading || !emissions || isGeneratingPdf}
					loading={isGeneratingPdf}
					mb="md"
				>
					Download Report
				</Button>
			</Box>

			<div ref={reportRef}>
				<Stack
					justify="flex-start"
					align="center"
					h="100%"
					w="auto"
					bg="dark.7"
				>
					<Box ta="center" pt="lg">
						<Title order={2}>Report</Title>
						<Title order={4} c="dimmed">
							Your yearly emissions
						</Title>
					</Box>
					<ColorLegend />
					<Flex gap="xl" wrap="wrap" w="100%" justify="center">
						{totalEmissionsByYear &&
							totalEmissionsByYear.map((year) => (
								<YearOverview
									emissions={year.emissions}
									year={year.year}
									key={year.year}
								/>
							))}
					</Flex>
					<Divider my="xl" w="80%" />
					<Box ta="center">
						<Title order={2}>Emission Breakdown</Title>
						<Title order={4} c="dimmed">
							Your emissions by facility
						</Title>
					</Box>
					<ColorLegend />
					<Accordion
						radius="xl"
						w="100%"
						multiple
						value={openedAccordionItems}
						onChange={setOpenedAccordionItems}
					>
						{aggregatedEmissions &&
							Object.entries(aggregatedEmissions).map(
								([facilityId, emissions]) => (
									<Accordion.Item
										value={facilityId}
										key={facilityId}
									>
										<Accordion.Control>
											<Facility
												key={facilityId}
												facility={emissions}
											/>
										</Accordion.Control>
										<Accordion.Panel>
											<FacilityBody
												facility={emissions}
											/>
										</Accordion.Panel>
									</Accordion.Item>
								),
							)}
					</Accordion>
					<Space h="23vh" />
				</Stack>
			</div>
		</Box>
	);
};
const MemoizedResults = React.memo(Results);

export default MemoizedResults;