import type { Scope1Results, Scope2Results } from '@/types';
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
		<Flex wrap="wrap" gap="md" {...props}>
			<Flex gap="md">
				<Stack flex="1">
					<Title c="blue" order={3}>
						{title}
					</Title>
					<Text>{emissions.total.toFixed(2)} T</Text>
				</Stack>
				<Divider orientation="vertical" />
				{isScope1Results(emissions) && emissions.stationaryResults && (
					<Stack justify="space-between">
						<Title order={4}>On-site</Title>
						<Text>
							{emissions.stationaryResults.total.toFixed(2)} T
						</Text>
					</Stack>
				)}
				{isScope1Results(emissions) && emissions.combustionResults && (
					<Stack justify="space-between">
						<Title order={4}>Mobile</Title>
						<Text>
							{emissions.combustionResults.total.toFixed(2)} T
						</Text>
					</Stack>
				)}
				{isScope2Results(emissions) && emissions.electricityResults && (
					<Stack justify="space-between">
						<Title order={4}>Electricity</Title>
						<Text>
							{emissions.electricityResults.total.toFixed(2)} T
						</Text>
					</Stack>
				)}
			</Flex>
		</Flex>
	);
};

export default Scope;
