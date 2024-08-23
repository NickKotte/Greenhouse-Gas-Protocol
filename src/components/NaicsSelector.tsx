import { useState } from 'react';
import {
	Combobox,
	Input,
	InputBase,
	ScrollArea,
	Text,
	useCombobox,
} from '@mantine/core';
import type { NaicsCode } from '@/types';
import { naicsCodes } from '@/constants';
import { IconCaretRightFilled } from '@tabler/icons-react';

function SelectOption({ label, code }: NaicsCode) {
	return (
		<Text>
			<Text span fz="sm" fw={500}>
				{code}{' '}
			</Text>
			<Text span fz="xs" opacity={0.6}>
				- {label}
			</Text>
		</Text>
	);
}

export default function NaicsSelector({
	value,
	onChange,
}: {
	value?: string | null;
	onChange: (value: string) => void;
}) {
	const [search, setSearch] = useState('');
	const combobox = useCombobox({
		onDropdownClose: () => {
			combobox.resetSelectedOption();
			combobox.focusTarget();
			setSearch('');
		},
		onDropdownOpen: () => {
			combobox.focusSearchInput();
		},
	});

	const selectedOption = naicsCodes.find(
		(item) => item.code === Number(value),
	);

	const options = naicsCodes
		.filter(
			(item) =>
				item.label
					.toLowerCase()
					.includes(search.toLowerCase().trim()) ||
				item.code.toString().includes(search.trim()),
		)
		.map((item) => (
			<Combobox.Option value={item.code.toString()} key={item.code}>
				<SelectOption {...item} />
			</Combobox.Option>
		));

	return (
		<Combobox
			store={combobox}
			withinPortal={false}
			onOptionSubmit={(val) => {
				onChange(val);
				combobox.closeDropdown();
			}}
		>
			<Combobox.Target>
				<InputBase
					component="button"
					type="button"
					pointer
					rightSection={<Combobox.Chevron />}
					onClick={() => combobox.toggleDropdown()}
					rightSectionPointerEvents="none"
					multiline
					radius="lg"
					mt="md"
					leftSection={<IconCaretRightFilled />}
				>
					{selectedOption ? (
						<SelectOption {...selectedOption} />
					) : (
						<Input.Placeholder>
							Enter NAICS code (primary company category)
						</Input.Placeholder>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Search
					value={search}
					onChange={(event) => setSearch(event.currentTarget.value)}
					placeholder="Search NAICS by number or title"
				/>
				<Combobox.Options>
					<ScrollArea.Autosize type="scroll" mah={200}>
						{options.length > 0 ? (
							options
						) : (
							<Combobox.Empty>Nothing found</Combobox.Empty>
						)}
					</ScrollArea.Autosize>
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
