import { Selectable } from '@/components/Editables/Selectable';
import EditableWrapper from './EditableWrapper';
import { type Icon } from '@tabler/icons-react';
import { dropdownOptions } from '@/constants';
import type {
	ComboboxItem,
	ComboboxItemGroup,
	SelectProps,
} from '@mantine/core';
import { Numerable } from './Numerable';

const Selector = ({
	type,
	numberValue,
	dropdownValue,
	onNumberValueChange = () => {},
	onDropdownValueChange = () => {},
	label,
	selectProps,
	withNumerable,
	Icon,
}: {
	type: keyof typeof dropdownOptions;
	dropdownValue: string;
	numberValue?: number;
	onNumberValueChange?: (value: number) => void;
	onDropdownValueChange?: (value: string) => void;
	label: string;
	selectProps?: Omit<SelectProps, 'value'>;
	withNumerable?: boolean;
	Icon: Icon;
}) => {
	const options = dropdownOptions[type];
	type ComboboxItemType = ComboboxItem | ComboboxItemGroup;

	const isComboboxItem = (item: ComboboxItemType): item is ComboboxItem => {
		return 'label' in item && 'value' in item;
	};

	const isComboboxItemGroup = (
		item: ComboboxItemType,
	): item is ComboboxItemGroup => {
		return (
			'items' in item && Array.isArray((item as ComboboxItemGroup).items)
		);
	};

	const findLabelByValue = (
		options: ComboboxItemType[],
		value: string,
	): string | undefined => {
		for (const option of options) {
			if (isComboboxItem(option) && option.value === value) {
				return option.label;
			} else if (isComboboxItemGroup(option)) {
				const foundItem = option.items.find(
					(item) => (item as ComboboxItem).value === value,
				) as ComboboxItem | undefined;
				if (foundItem) {
					return foundItem.label;
				}
			}
		}
		return undefined;
	};

	const formatDisplayValue = () => {
		const dropdownLabel =
			findLabelByValue(options, dropdownValue) || dropdownValue;
		if (withNumerable) {
			return `${numberValue} ${dropdownLabel}`;
		}
		return dropdownLabel;
	};

	return (
		<EditableWrapper
			displayValue={formatDisplayValue()}
			leftIcon={Icon}
			label={label}
		>
			{withNumerable && (
				<Numerable
					value={numberValue ?? 0}
					setValue={onNumberValueChange}
					leftIcon={Icon}
					label={label}
				/>
			)}
			<Selectable
				value={dropdownValue}
				setValue={onDropdownValueChange}
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
