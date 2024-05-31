import { NumberInputProps, ComboboxData, NumberInput } from '@mantine/core';
import { type Icon } from '@tabler/icons-react';
import { useState } from 'react';

export function Numerable({
	value,
	setValue,
	leftIcon: Icon,
	...props
}: NumberInputProps & {
	value: number | string;
	setValue: (value: number | string) => void;
	options: ComboboxData;
	leftIcon?: Icon;
}) {
	const [localValue, setLocalValue] = useState<number | string>(value);
	const handleChange = (value: number | string) => {
		setLocalValue(value);
		setValue(value);
	};
	return (
		<NumberInput
			value={localValue}
			onChange={handleChange}
			leftSection={Icon ? <Icon /> : null}
			aria-label={String(props.label) || 'Enter a number'}
			placeholder="Enter a number"
			autoFocus
			label={props.label}
			thousandSeparator=","
			allowNegative={false}
			min={0}
			{...props}
		/>
	);
}
