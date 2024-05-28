import type { InventoryYear } from '@/types';
import { TextInput, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import { YearPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconCalendar } from '@tabler/icons-react';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import EditWrapper from './EditWrapper';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const { inventoryYears } = useStore($appState);
	const [error, setError] = useState('');
	const [yearField, setYearField] = useState<Date | null>(
		innerProps.year ? new Date(Number(innerProps.year.year), 0) : null,
	);
	const [descriptionField, setDescriptionField] = useState(
		innerProps.year ? innerProps.year.description : '',
	);

	const handleDelete = () => {
		//TODO: remove by ID once we have those
		const yearFound = inventoryYears.find(
			(year) => year.year === String(yearField?.getFullYear() ?? ''),
		);
		if (yearFound) {
			$appState.setKey(
				'inventoryYears',
				inventoryYears.filter((year) => year.year !== yearFound.year),
			);
		}
		return true;
	};

	const handleSave = () => {
		//TODO: allow for editing vs creating new one
		const yearFound = inventoryYears.find(
			(year) => year.year === String(yearField?.getFullYear() ?? ''),
		);
		if (yearFound) {
			setError('This year already exists in this workbook');
			return false;
		}
		const newEntry: InventoryYear = {
			year: String(yearField?.getFullYear() ?? ''),
			description: descriptionField,
		};
		$appState.setKey('inventoryYears', [...inventoryYears, newEntry]);
		return true;
	};
	return (
		<EditWrapper
			context={context}
			innerProps={innerProps}
			onSave={handleSave}
			onDelete={handleDelete}
			id={id}
		>
			<YearPickerInput
				value={yearField}
				onChange={setYearField}
				label="Year"
				required
				size="sm"
				radius="md"
				leftSectionPointerEvents="none"
				leftSection={<IconCalendar />}
				placeholder="Choose your inventory year"
			/>
			<TextInput
				label="Description"
				radius="md"
				value={descriptionField}
				onChange={(e) => setDescriptionField(e.target.value)}
				mb="lg"
			/>
			<Text size="sm" c="red">
				{error}
			</Text>
		</EditWrapper>
	);
};

export default EditInventoryYear;
