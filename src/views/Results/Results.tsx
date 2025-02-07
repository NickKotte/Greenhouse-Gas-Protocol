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
	Image,
	Text,
} from '@mantine/core';
import YearOverview from './YearOverview';
import { useGetAllCombustionData } from '@/api/workbook/results.api';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import Facility from './Facility';
import type {
	AggregatedEmissions,
	FacilityEmissions,
	MobileCombustion,
	PurchasedElectricity,
	StationaryCombustion,
} from '@/types';
import FacilityBody from './FacilityBody';
import ColorLegend from './ColorLegend';
import { IconDownload } from '@tabler/icons-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable, { applyPlugin } from 'jspdf-autotable';
import { formatEmissionsPerArea } from '@/util/helpers';
import { useGetFacilities } from '@/api/workbook/facilities.api';
import logo from '../../../public/logo.png';
applyPlugin(jsPDF);

interface EmissionResults {
	co2: number;
	co2e: number;
	ch4: number;
	bio: number;
	n2o: number;
	ef: number;
	total: number;
}

// At the top of the file, add this type declaration
declare module 'jspdf' {
	interface jsPDF {
		lastAutoTable: {
			finalY: number;
		};
	}
}

// Add these helper functions at the top of the file, after the imports
const drawChartIcon = (pdf: jsPDF, x: number, y: number) => {
	pdf.setDrawColor(85, 100, 85);
	pdf.setFillColor(85, 100, 85);
	pdf.rect(x, y, 3, 6, 'F');
	pdf.rect(x + 4, y - 2, 3, 8, 'F');
	pdf.rect(x + 8, y - 4, 3, 10, 'F');
};

const drawBuildingIcon = (pdf: jsPDF, x: number, y: number) => {
	pdf.setDrawColor(85, 100, 85);
	pdf.setFillColor(85, 100, 85);

	// Building base
	pdf.rect(x, y - 10, 12, 10, 'F');

	// Roof (using lines instead of triangle for better control)
	pdf.setLineWidth(0.5);
	pdf.line(x - 1, y - 10, x + 6, y - 15);
	pdf.line(x + 6, y - 15, x + 13, y - 10);

	// Fill roof
	pdf.setFillColor(85, 100, 85);
	pdf.triangle(x - 1, y - 10, x + 6, y - 15, x + 13, y - 10, 'F');

	// Windows
	pdf.setFillColor(255, 255, 255);
	pdf.rect(x + 2, y - 8, 3, 3, 'F');
	pdf.rect(x + 7, y - 8, 3, 3, 'F');

	// Door
	pdf.rect(x + 4, y - 4, 4, 4, 'F');
};

const drawDetailIcon = (pdf: jsPDF, x: number, y: number) => {
	// Clipboard background
	pdf.setDrawColor(85, 100, 85);
	pdf.setFillColor(85, 100, 85);
	pdf.rect(x, y - 10, 12, 14, 'F');

	// Clip at top
	pdf.setFillColor(85, 100, 85);
	pdf.rect(x + 4, y - 12, 4, 3, 'F');

	// Paper lines
	pdf.setFillColor(255, 255, 255);
	pdf.rect(x + 2, y - 7, 8, 1, 'F');
	pdf.rect(x + 2, y - 4, 8, 1, 'F');
	pdf.rect(x + 2, y - 1, 8, 1, 'F');
};

// eslint-disable-next-line react-refresh/only-export-components
const Results = () => {
	const { data: facilities } = useGetFacilities();
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

		const calculateTotal = (results: {
			co2: number;
			ch4: number;
			n2o: number;
			bio: number;
		}) => results.co2 + results.ch4 + results.bio + results.n2o;

		const addEmissions = (
			target: EmissionResults,
			source: {
				co2: number;
				co2e: number;
				ch4: number;
				bio: number;
				n2o: number;
				ef: number;
			},
		) => {
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
			const results = {
				...item.results,
				total:
					item.results.co2 +
					item.results.ch4 +
					item.results.bio +
					item.results.n2o,
			};
			addEmissions(facilityEmissions.results, results);

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

			addEmissions(yearlyEmission.emissions, results);

			if (stationary.data.includes(item as StationaryCombustion)) {
				addEmissions(yearlyEmission.scope1.stationaryResults, results);
			} else if (mobile.data.includes(item as MobileCombustion)) {
				addEmissions(yearlyEmission.scope1.combustionResults, results);
			} else if (purchased.data.includes(item as PurchasedElectricity)) {
				addEmissions(yearlyEmission.scope2.electricityResults, results);
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

		const yearlyTotals: { [year: number]: EmissionResults } = {};

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

	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState(0);

	const [openedAccordionItems, setOpenedAccordionItems] = useState<string[]>(
		[],
	);

	const formatEmissionsForPdf = (value: number): string => {
		if (value > 1000000) {
			return `${(value / 1000000).toFixed(2)} Mt`;
		} else if (value > 1000) {
			return `${(value / 1000).toFixed(2)} kt`;
		} else {
			return `${value.toFixed(2)} t`;
		}
	};

	const computeSquareFootageEmissions = (facility: FacilityEmissions) => {
		const foundFacility = facilities?.find(
			(f) => f.id === facility.facility_id,
		);
		const squareFootage = foundFacility?.square_footage || 0;
		if (squareFootage === 0) return 'N/A';

		const emissions = facility.total_emissions;
		return formatEmissionsPerArea(emissions / squareFootage);
	};

	const handleDownload = async (format: 'png' | 'pdf') => {
		if (!emissions || !totalEmissionsByYear) return;

		if (format === 'png') {
			try {
				if (!emissions || !totalEmissionsByYear || !reportRef.current)
					return;
				const oldOpenedAccordionItems = openedAccordionItems;

				setIsDownloading(true);
				// Open all accordion items
				const facilityIds = Object.keys(emissions);
				setOpenedAccordionItems(facilityIds);

				// Add temporary styles to prevent text wrapping
				const style = document.createElement('style');
				style.innerHTML = `
					.report-container *:not(.what-next-section *) {
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
				const timestamp = new Date().toISOString().split('T')[0];
				link.download = `emissions-report-${timestamp}.png`;
				link.href = dataUrl;
				link.click();

				// Clean up temporary styles
				document.head.removeChild(style);

				// Close all accordion items
				setOpenedAccordionItems(oldOpenedAccordionItems);
			} catch (error) {
				console.error('Error generating image:', error);
			} finally {
				setIsDownloading(false);
			}
		} else {
			try {
				const pdf = new jsPDF();
				const pageHeight = pdf.internal.pageSize.height;
				const pageWidth = pdf.internal.pageSize.width;

				const addHeader = (pageNum: number) => {
					if (pageNum === 1) {
						// First page header with logo
						pdf.addImage(logo, 'PNG', 14, 10, 91, 21);
						pdf.setDrawColor(85, 100, 85);
						pdf.setLineWidth(0.5);
						pdf.line(14, 55, 196, 55);

						// Company name and title
						pdf.setFontSize(24);
						pdf.setTextColor(85, 100, 85);
						pdf.setFont('helvetica', 'bold');
						const companyName = 'CleanENERGY Manufacturing';
						const reportTitle = 'Emissions Report';

						// Center text properly
						const companyNameWidth =
							(pdf.getStringUnitWidth(companyName) * 24) /
							pdf.internal.scaleFactor;
						const reportTitleWidth =
							(pdf.getStringUnitWidth(reportTitle) * 24) /
							pdf.internal.scaleFactor;
						const pageCenter = pageWidth / 2;

						pdf.text(
							companyName,
							pageCenter - companyNameWidth / 2,
							40,
						);
						pdf.text(
							reportTitle,
							pageCenter - reportTitleWidth / 2,
							50,
						);

						// Date
						pdf.setFontSize(10);
						pdf.setTextColor(100, 100, 100);
						const today = new Date().toLocaleDateString();
						pdf.text(`Generated on ${today}`, 196, 20, {
							align: 'right',
						});

						return 100; // Return starting Y position for content
					} else {
						// Subsequent pages header
						pdf.setDrawColor(85, 100, 85);
						pdf.setLineWidth(0.5);
						pdf.line(14, 20, 196, 20);
						return 40;
					}
				};

				const addFooter = () => {
					pdf.setFontSize(8);
					pdf.setTextColor(100, 100, 100);
					pdf.setDrawColor(200, 200, 200);
					pdf.line(14, pageHeight - 20, 196, pageHeight - 20);
					const pageCount = pdf.getNumberOfPages();
					pdf.text(
						`Page ${pdf.getCurrentPageInfo().pageNumber} of ${pageCount}`,
						pageWidth / 2,
						pageHeight - 10,
						{ align: 'center' },
					);
					pdf.text(
						'© 2024 CleanENERGY Manufacturing',
						14,
						pageHeight - 10,
					);
				};

				let currentY = addHeader(1);

				// Yearly Overview section
				pdf.setFontSize(18);
				pdf.setTextColor(85, 100, 85);
				drawChartIcon(pdf, 14, currentY - 4);
				pdf.text('Annual Overview', 30, currentY);
				currentY += 10;

				// Add yearly overview explanation
				pdf.setFontSize(9);
				pdf.setFont('helvetica', 'normal');
				pdf.setTextColor(100, 100, 100);
				const yearlyExplanation = [
					'Below is a breakdown of your emissions by year. Each row shows the actual emissions of different greenhouse',
					'gases and their total CO\u2082 equivalent value.',
				].join(' ');
				pdf.text(yearlyExplanation, 14, currentY);
				currentY += 15;

				// Add yearly overview table
				autoTable(pdf, {
					head: [
						[
							'Year',
							'CO₂',
							'CH₄',
							'N₂O',
							'Biogenic CO₂',
							'Total CO₂e',
						],
					],
					body: totalEmissionsByYear.map((year) => [
						year.year.toString(),
						formatEmissionsForPdf(year.emissions.co2),
						formatEmissionsForPdf(year.emissions.ch4),
						formatEmissionsForPdf(year.emissions.n2o),
						formatEmissionsForPdf(year.emissions.bio),
						formatEmissionsForPdf(year.emissions.co2e),
					]),
					startY: currentY,
					margin: { bottom: 40 },
					styles: {
						cellPadding: 5,
						fontSize: 10,
						lineColor: [220, 220, 220],
						lineWidth: 0.1,
					},
					headStyles: {
						fillColor: [85, 100, 85],
						textColor: [255, 255, 255],
						fontSize: 11,
						fontStyle: 'bold',
					},
					alternateRowStyles: {
						fillColor: [245, 245, 245],
					},
					columnStyles: {
						0: { fontStyle: 'bold' },
					},
					didDrawPage: (data) => {
						if (data.pageNumber > 1) {
							currentY = addHeader(data.pageNumber);
						}
						addFooter();
					},
				});

				// Facility breakdown section
				currentY = pdf.lastAutoTable.finalY + 20;
				pdf.setFontSize(18);
				pdf.setTextColor(85, 100, 85);
				drawBuildingIcon(pdf, 14, currentY + 8);
				pdf.text('Facility Breakdown', 30, currentY);
				currentY += 15;

				// Add facility breakdown explanation
				pdf.setFontSize(9);
				pdf.setTextColor(100, 100, 100);
				const facilityExplanation =
					'Detailed emissions data for each facility, showing both direct emissions (Scope 1) from stationary and mobile sources, and indirect emissions (Scope 2) from purchased electricity.';
				const facilityExplanationLines = pdf.splitTextToSize(
					facilityExplanation,
					180,
				);
				pdf.text(facilityExplanationLines, 14, currentY);

				// Create facility tables
				Object.values(emissions).forEach((facility) => {
					// Check if we need a new page
					if (currentY > pageHeight - 100) {
						pdf.addPage();
						currentY = addHeader(
							pdf.getCurrentPageInfo().pageNumber,
						);
						addFooter();
					}

					currentY += 20; // Add extra space before each facility

					// Facility header with detail icon
					drawDetailIcon(pdf, 14, currentY + 8);
					pdf.setFontSize(14);
					pdf.setFont('helvetica', 'bold');
					pdf.setTextColor(85, 100, 85);
					pdf.text(facility.facility_name, 30, currentY);

					// Add subtext about total emissions
					pdf.setFontSize(10);
					pdf.setFont('helvetica', 'normal');
					pdf.setTextColor(100, 100, 100);
					const totalEmissionsText = `Produced ${formatEmissionsForPdf(facility.total_emissions)} of emissions`;
					pdf.text(totalEmissionsText, 30, currentY + 7);

					// Add emissions per area
					const emissionsPerArea =
						computeSquareFootageEmissions(facility);
					const perAreaText = `Estimated emissions per square foot: ${emissionsPerArea}`;
					pdf.text(perAreaText, 30, currentY + 14);

					// Facility yearly data table
					autoTable(pdf, {
						head: [['Year', 'Scope 1', 'Scope 2', 'Total']],
						body: facility.yearly_emissions.map((year) => [
							year.year.toString(),
							formatEmissionsForPdf(year.scope1.total),
							formatEmissionsForPdf(year.scope2.total),
							formatEmissionsForPdf(year.emissions.total),
						]),
						startY: currentY + 25, // Increased spacing
						margin: { left: 20, bottom: 40 },
						styles: {
							cellPadding: 5,
							fontSize: 10,
							font: 'helvetica',
						},
						headStyles: {
							fillColor: [85, 100, 85],
							textColor: [255, 255, 255],
							fontSize: 11,
							fontStyle: 'bold',
						},
						alternateRowStyles: {
							fillColor: [245, 245, 245],
						},
						didDrawPage: (data) => {
							if (data.pageNumber > 1) {
								currentY = addHeader(data.pageNumber);
							}
							addFooter();
						},
					});

					currentY = pdf.lastAutoTable.finalY + 30; // Increased spacing after table

					// Add detailed scope breakdown for each year
					facility.yearly_emissions.forEach((year) => {
						// Check if we need a new page
						if (currentY > pageHeight - 100) {
							pdf.addPage();
							currentY = addHeader(
								pdf.getCurrentPageInfo().pageNumber,
							);
							addFooter();
						}

						const scopeData = [
							[
								'On-site Combustion',
								formatEmissionsForPdf(
									year.scope1.stationaryResults.total,
								),
							],
							[
								'Mobile Sources',
								formatEmissionsForPdf(
									year.scope1.combustionResults.total,
								),
							],
							[
								'Electricity',
								formatEmissionsForPdf(
									year.scope2.electricityResults.total,
								),
							],
						];

						autoTable(pdf, {
							head: [
								[`${year.year} Detailed Breakdown`, 'Total'],
							],
							body: scopeData,
							startY: currentY,
							margin: { left: 30, bottom: 40 },
							styles: {
								fontSize: 10,
								cellPadding: 5,
								font: 'helvetica',
							},
							headStyles: {
								fillColor: [120, 120, 120],
								textColor: [255, 255, 255],
								fontSize: 10,
								fontStyle: 'bold',
							},
							alternateRowStyles: {
								fillColor: [245, 245, 245],
							},
							didDrawPage: (data) => {
								if (data.pageNumber > 1) {
									currentY = addHeader(data.pageNumber);
								}
								addFooter();
							},
						});

						currentY = pdf.lastAutoTable.finalY + 20; // Increased spacing after detailed breakdown
					});
				});

				// Add footer to the last page
				addFooter();

				const timestamp = new Date().toISOString().split('T')[0];
				pdf.save(`emissions-report-${timestamp}.pdf`);
			} catch (error) {
				console.error('Error generating PDF:', error);
			}
		}
	};

	const containerStyles = {
		'@media (max-width: 1200px)': {
			overflowX: 'auto',
			maxWidth: '100vw',
		},
	};

	useEffect(() => {
		if (!isDownloading) {
			setDownloadProgress(0);
			return;
		}

		const startTime = Date.now();
		const duration = 5000; // 5 seconds

		const updateProgress = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min((elapsed / duration) * 100, 100);

			setDownloadProgress(progress);

			if (progress < 100) {
				requestAnimationFrame(updateProgress);
			}
		};
		console.log('isDownloading', isDownloading);

		requestAnimationFrame(updateProgress);
	}, [isDownloading]);

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

			<Box
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					gap: '1rem',
				}}
			>
				<Button
					leftSection={<IconDownload size={16} />}
					onClick={() => handleDownload('png')}
					disabled={isLoading || !emissions || isDownloading}
					loading={isDownloading}
					mb="md"
				>
					Download PNG
				</Button>
				<Button
					leftSection={<IconDownload size={16} />}
					onClick={() => handleDownload('pdf')}
					disabled={isLoading || !emissions || isDownloading}
					mb="md"
				>
					Download PDF
				</Button>
			</Box>

			{isDownloading && (
				<Box
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						style={{
							padding: '20px',
							borderRadius: '8px',
							textAlign: 'center',
						}}
					>
						<Title order={3} mb="md">
							Generating Report
						</Title>
						<Progress
							size="xl"
							radius="xl"
							animated
							value={downloadProgress}
						/>
					</Box>
				</Box>
			)}

			<Box style={containerStyles}>
				<div ref={reportRef} className="report-container">
					<Stack
						className="report-content"
						justify="flex-start"
						align="center"
						h="100%"
						w="auto"
						bg="dark.7"
					>
						<Box ta="center" pt="lg">
							<Image
								src="/icon.png"
								alt="logo"
								width={100}
								height={100}
								fit="contain"
							/>
							<Title order={1} mt="md">
								CleanENERGY Manufacturing
							</Title>
							<Title order={2} mt="lg">
								Emissions Report
							</Title>
							<Title order={4} c="dimmed">
								Greenhouse Gas Protocol Assessment
							</Title>
						</Box>
						<Divider my="xl" w="80%" />
						<Box ta="center">
							<Title order={3}>Annual Overview</Title>
							{/* <Text
								c="dimmed"
								size="sm"
								maw={600}
								mx="auto"
								mt="xs"
							>
								Below is a breakdown of your yearly emissions.
								Each gas is shown in its original form, with the
								total CO₂ equivalent (CO₂e) calculated using AR5
								global warming potentials.
							</Text> */}
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
							<Title order={3}>Facility Breakdown</Title>
							<Text
								c="dimmed"
								size="sm"
								maw={600}
								mx="auto"
								mt="xs"
							>
								Detailed emissions data for each facility,
								including both actual gas emissions and their
								CO₂ equivalent values.
							</Text>
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
						<Box
							ta="center"
							maw={800}
							mx="auto"
							pb="xl"
							pt="xl"
							className="what-next-section"
						>
							<Title order={3}>What's Next?</Title>
							<Text c="dimmed" size="md" mt="md">
								Congratulations on establishing your baseline
								emissions for your operations! The project team
								is available to help you determine your next
								steps, from establishing internal reduction
								goals to implementing cost savings energy
								efficiency upgrades.
							</Text>
							<Text c="dimmed" size="md" mt="md">
								Please visit our website{' '}
								<Text
									component="a"
									href="http://www.wemakeithere.org/cleanenergy"
									target="_blank"
									c="blue"
								>
									www.wemakeithere.org/cleanenergy
								</Text>{' '}
								or email{' '}
								<Text
									component="a"
									href="mailto:tom@wemakeithere.org"
									c="blue"
								>
									tom@wemakeithere.org
								</Text>{' '}
								for a free consultation.
							</Text>
						</Box>
						<Space h="23vh" />
					</Stack>
				</div>
			</Box>
		</Box>
	);
};
const MemoizedResults = React.memo(Results);

export default MemoizedResults;