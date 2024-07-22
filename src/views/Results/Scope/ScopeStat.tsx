import { Group, Paper, Text, Tooltip } from '@mantine/core';
import {
	IconNotes,
	IconTrendingDown,
	IconTrendingUp,
} from '@tabler/icons-react';
import classes from '@/css/Results.module.css';

const icons = {
	down: IconTrendingDown,
	up: IconTrendingUp,
};

export default function ScopeStat({
	title,
	value,
	diff,
}: {
	title: string;
	value: string;
	diff: number;
}) {
	const DiffIcon = diff > 0 ? icons.up : icons.down;

	return (
		<Paper
			withBorder
			p="sm"
			radius="md"
			w="fit-content"
			h="fit-content"
			style={{ display: 'inline-block' }}
		>
			<Group justify="space-between" pb="xs">
				<Text size="xs" c="dimmed" className={classes.title}>
					{title}
				</Text>
				<IconNotes
					className={classes.icon}
					size="1.0rem"
					stroke={1.5}
				/>
			</Group>

			<Group align="flex-end" gap="xs">
				<Text className={classes.value} fw={700} fz="xl" lh={1}>
					{value}
				</Text>
				<Tooltip
					label="Compared to previous year"
					withArrow
					arrowSize={5}
				>
					<Text
						c={diff > 0 ? 'red' : 'teal'}
						fz="sm"
						fw={500}
						className={classes.diff}
						lh={1}
					>
						<span>{diff}%</span>
						<DiffIcon size="1rem" stroke={1.5} />
					</Text>
				</Tooltip>
			</Group>
		</Paper>
	);
}
