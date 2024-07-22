import { Grid, Title, RingProgress, Text, Accordion } from '@mantine/core';
import { YearViewHeader } from './YearViewHeader';
import YearViewBody from './YearViewBody';

const YearOverview = () => {
	return (
		<Accordion.Item value="1">
			<Accordion.Control>
				<YearViewHeader />
			</Accordion.Control>
			<Accordion.Panel>
				<YearViewBody />
			</Accordion.Panel>
		</Accordion.Item>
	);
};

export default YearOverview;
