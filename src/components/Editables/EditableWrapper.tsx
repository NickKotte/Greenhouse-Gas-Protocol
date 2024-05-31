import { useState } from 'react';
import { ActionIcon, Box, Group, Text, Tooltip } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconPencil, type Icon } from '@tabler/icons-react';

export default function Editable({
	displayValue = '',
	leftIcon: Icon,
	editable = true,
	onDoneEditing = () => {},
	children,
	label,
}: {
	/**
	 * The text shown when not editing
	 */
	displayValue?: string;
	/**
	 * The icon shown to the left of the display value
	 */
	leftIcon?: Icon;
	/**
	 * Whether the input is editable
	 * @default true
	 */
	editable?: boolean;
	/**
	 * Callback function to be called when editable is true and the user is done editing
	 * @param {number} amount - The amount of fuel
	 * @param {string} units - The units of fuel
	 */
	onDoneEditing?: (value: {
		dropdownValue: string;
		numberValue: number;
	}) => void;
	/**
	 * The children to render

	 */
	children?: React.ReactNode;
	/**
	 * The label to show
	 */
	label?: string;
}) {
	const [editing, setEditing] = useState(false);

	const handleDoneEditing = () => {
		setEditing(false);
		onDoneEditing?.(displayValue);
	};

	const ref = useClickOutside(() => {
		if (editing) handleDoneEditing();
	});

	return (
		<>
			{editing || !editable ? (
				<Box pb="md" pr="sm" ref={ref}>
					<Group wrap="nowrap">{children}</Group>
				</Box>
			) : (
				<Box>
					<Text size="sm" c="dimmed">
						{label}
					</Text>
					<Group wrap="nowrap">
						{Icon ? (
							<Icon style={{ color: 'gray' }} size={20} />
						) : null}
						<Tooltip
							label={displayValue}
							withArrow
							position="bottom"
						>
							<Text truncate="end" w={200}>
								{displayValue}
							</Text>
						</Tooltip>
						<ActionIcon
							onClick={() => setEditing(true)}
							variant="subtle"
							size="lg"
							c="gray"
						>
							<IconPencil />
						</ActionIcon>
					</Group>
				</Box>
			)}
		</>
	);
}
