import { useState } from 'react';
import { Selectable } from '@/components/Editables/Selectable';
import EditableWrapper from './EditableWrapper';
import { type Icon } from '@tabler/icons-react';
import { dropdownOptions } from '@/constants';
import type { SelectProps } from '@mantine/core';
import { Numerable } from './Numerable';
import type { SelectorValue } from '@/types';

const Selector = ({
	type,
	defaultNumberValue,
	defaultDropdownValue,
	onDoneEditing,
	label,
	selectProps,
	withNumerable,
	Icon,
}: {
	type: keyof typeof dropdownOptions;
	defaultDropdownValue: string;
	defaultNumberValue?: number;
	onDoneEditing: (value: SelectorValue) => void;
	label: string;
	selectProps?: Omit<SelectProps, 'value'>;
	withNumerable?: boolean;
	Icon: Icon;
}) => {
	const options = dropdownOptions[type];

	// const label = options.find((item) => item.label === value)?.label || '';
	const [selectableValue, setSelectableValue] =
		useState(defaultDropdownValue);
	const [numberInputValue, setNumberInputValue] = useState<number | string>(
		defaultNumberValue ?? 0,
	);
	const formatDisplayValue = () => {
		if (withNumerable) {
			return `${numberInputValue} ${selectableValue}`;
		}
		return selectableValue;
	};
	return (
		<EditableWrapper
			displayValue={formatDisplayValue()}
			onDoneEditing={onDoneEditing}
			leftIcon={Icon}
			label={label}
		>
			{withNumerable && (
				<Numerable
					value={numberInputValue}
					options={options}
					setValue={setNumberInputValue}
					leftIcon={Icon}
					label={label}
				/>
			)}
			<Selectable
				value={selectableValue}
				setValue={setSelectableValue}
				options={options}
				leftIcon={!withNumerable ? Icon : undefined}
				autoFocus={!withNumerable}
				label={!withNumerable ? label : 'Units'}
				{...selectProps}
			/>
		</EditableWrapper>
	);
};

export default Selector;
