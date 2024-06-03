import { Group, Title, Button } from '@mantine/core';
import { IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const WorkbookDivider = ({
	year,
	expandSection,
}: {
	year: number;
	expandSection: (year: number, expanded: boolean) => void;
}) => {
	const [expanded, setExpanded] = useState(false);
	const handleExpand = () => {
		expandSection(year, expanded);
		setExpanded(!expanded);
	};
	return (
		<Group justify="space-between" align="center">
			<Title order={2} fw={700}>
				{year}
			</Title>
			<Button
				onClick={handleExpand}
				variant="transparent"
				c="gray"
				leftSection={expanded ? <IconChevronUp /> : <IconChevronDown />}
			>
				{expanded ? 'Collapse All' : 'Expand All'}
			</Button>
		</Group>
	);
};

export default WorkbookDivider;
