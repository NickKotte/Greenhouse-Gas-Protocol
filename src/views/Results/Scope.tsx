import type { Scope1Results, Scope2Results } from '@/types';
import { formatTonnesColored } from '@/util';
import {
	Stack,
	Title,
	Text,
	Flex,
	type FlexProps,
	Divider,
} from '@mantine/core';

const isScope1Results = (
	emissions: Scope1Results | Scope2Results,
): emissions is Scope1Results => {
	return 'combustionResults' in emissions;
};

const isScope2Results = (
	emissions: Scope1Results | Scope2Results,
): emissions is Scope2Results => {
	return 'electricityResults' in emissions;
};

const Scope = ({
	title,
	emissions,
	...props
}: {
	title: string;
	emissions: Scope1Results | Scope2Results;
} & FlexProps) => {
	return (
		<Flex gap="md" {...props}>
			<Flex gap="md">
				<Stack flex="1">
					<Title c="blue" order={3}>
						{title}
					</Title>
					{formatTonnesColored(emissions.total)}
				</Stack>
				<Divider orientation="vertical" />
				{isScope1Results(emissions) && emissions.stationaryResults && (
					<Stack justify="space-between">
						<Title order={4}>On-site</Title>
						{formatTonnesColored(emissions.stationaryResults.total)}
					</Stack>
				)}
				{isScope1Results(emissions) && emissions.combustionResults && (
					<Stack justify="space-between">
						<Title order={4}>Mobile</Title>
						{formatTonnesColored(emissions.combustionResults.total)}
					</Stack>
				)}
				{isScope2Results(emissions) && emissions.electricityResults && (
					<Stack justify="space-between">
						<Title order={4}>Electricity</Title>
						{formatTonnesColored(
							emissions.electricityResults.total,
						)}
					</Stack>
				)}
			</Flex>
		</Flex>
	);
};

export default Scope;
