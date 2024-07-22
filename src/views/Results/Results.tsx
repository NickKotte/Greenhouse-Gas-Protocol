import {
	Text,
	RingProgress,
	Stack,
	Title,
	Group,
	Grid,
	Accordion,
} from '@mantine/core';
import YearOverview from './YearOverview';

const Results = () => {
	return (
		<Stack justify="flex-start" align="center" h="100%">
			<Title order={1}>Results</Title>
			<Accordion w="100%" radius="md">
				<YearOverview />
				<YearOverview />
				<YearOverview />
				<YearOverview />
				<YearOverview />
				<YearOverview />
			</Accordion>
		</Stack>
	);
};

export default Results;
