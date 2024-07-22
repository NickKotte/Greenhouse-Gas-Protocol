import { ActionIcon, TextInput } from '@mantine/core';
import EditableWrapper from './EditableWrapper';
import { IconCheck, type Icon } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const EditableText = ({
	value,
	onDoneEditing,
	label,
	Icon,
}: {
	value: string;
	onDoneEditing: (value: string) => void;
	label: string;
	Icon: Icon;
}) => {
	const [localValue, setLocalValue] = useState(value);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);
	return (
		<EditableWrapper
			displayValue={value}
			leftIcon={Icon}
			label={label}
			onDoneEditing={() => onDoneEditing(localValue)}
		>
			<TextInput
				label={label}
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)}
			/>
		</EditableWrapper>
	);
};
