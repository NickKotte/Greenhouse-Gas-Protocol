import { NumberInputProps, NumberInput } from '@mantine/core';
import { type Icon } from '@tabler/icons-react';
import { useState } from 'react';

export function Numerable({
	value,
	setValue,
	leftIcon: Icon,
	...props
}: NumberInputProps & {
	value: number;
	setValue: (value: number) => void;
	leftIcon?: Icon;
}) {
	const [localValue, setLocalValue] = useState<number>(value);
	const handleChange = (value: number) => {
		setLocalValue(value);
		setValue(value);
	};
	return (
		<NumberInput
			value={localValue}
			onChange={(value) => handleChange(Number(value))}
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
