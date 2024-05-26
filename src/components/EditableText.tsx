import {
	TextInput,
	type TextInputProps,
	Text,
	type TextProps,
} from '@mantine/core';
import { useState } from 'react';
import classes from '@/css/EditableText.module.css';

interface EditableTextProps extends TextInputProps {
	value: string;
	textProps?: TextProps;
	onDone: (value: string) => void;
}

export function EditableText({
	value,
	onDone,
	textProps,
	...props
}: EditableTextProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [localValue, setLocalValue] = useState(value);

	const handleTextClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		onDone(localValue);
	};

	return isEditing ? (
		<TextInput
			value={localValue}
			onChange={(e) => setLocalValue(e.target.value)}
			onBlur={handleBlur}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleBlur();
				}
			}}
			autoFocus
			{...props}
		/>
	) : (
		<Text
			{...textProps}
			onClick={handleTextClick}
			className={classes.editableText}
		>
			{value}
		</Text>
	);
}
