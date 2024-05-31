import {
	Select,
	SelectProps,
	ComboboxData,
	type ComboboxItem,
	useMantineColorScheme,
} from '@mantine/core';
import { type Icon } from '@tabler/icons-react';
import { useState } from 'react';

export function Selectable({
	value,
	setValue,
	options,
	leftIcon: Icon,
	...props
}: SelectProps & {
	value: string;
	setValue: (value: string) => void;
	options: ComboboxData;
	leftIcon?: Icon;
}) {
	const [localValue, setLocalValue] = useState<string | null>(value);
	const [searchValue, setSearchValue] = useState<string>();

	const { colorScheme } = useMantineColorScheme();
	const isDark = colorScheme === 'dark';
	const handleChange = (value: string | null, option: ComboboxItem) => {
		setLocalValue(value);
		setValue(option.label);
	};
	return (
		<Select
			value={localValue}
			onChange={handleChange}
			searchable
			searchValue={searchValue}
			onSearchChange={setSearchValue}
			data={options}
			leftSection={Icon ? <Icon /> : null}
			allowDeselect={false}
			nothingFoundMessage="No options found"
			aria-label={String(props.label) || 'Select an option'}
			placeholder="Select an option"
			comboboxProps={{
				withinPortal: false,
				transitionProps: { transition: 'pop', duration: 200 },
			}}
			styles={(theme) => ({
				groupLabel: {
					position: 'sticky',
					top: 0,
					zIndex: 1,
					backgroundColor: isDark
						? theme.colors.gray[9]
						: theme.colors.gray[0],
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
					marginBottom: 10,
					marginTop: 10,
				},
				options: {
					marginBottom: 10,
				},
			})}
			{...props}
		/>
	);
}
