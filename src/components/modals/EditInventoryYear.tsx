import type { InventoryYear } from '@/types';
import { Box, Button, Group, TextInput, Text } from '@mantine/core';
import { ContextModalProps, modals } from '@mantine/modals';
import { useState } from 'react';
import { YearPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconCalendar, IconDeviceFloppy, IconTrash } from '@tabler/icons-react';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';

const EditInventoryYear = ({
	context,
	innerProps,
}: ContextModalProps<{ year: InventoryYear }>) => {
	const { inventoryYears } = useStore($appState);
	const [error, setError] = useState('');
	const [yearField, setYearField] = useState<Date | null>(
		innerProps.year ? new Date(Number(innerProps.year.year), 0) : null,
	);
	const [descriptionField, setDescriptionField] = useState(
		innerProps.year ? innerProps.year.description : '',
	);
	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Delete this entry',
			radius: 'md',
			children: (
				<Text size="sm" p="lg">
					Are you sure you want to delete this entry? This action is
					destructive and may affect other parts of the workbook.
				</Text>
			),
			labels: { confirm: 'Delete', cancel: "Don't delete it" },
			confirmProps: { color: 'red' },
			onConfirm: () => handleDelete(),
		});

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
		context.closeAll();
	};

	const handleSave = () => {
		//TODO: allow for editing vs creating new one
		const yearFound = inventoryYears.find(
			(year) => year.year === String(yearField?.getFullYear() ?? ''),
		);
		if (yearFound) {
			setError('This year already exists in this workbook');
			return;
		}
		const newEntry: InventoryYear = {
			year: String(yearField?.getFullYear() ?? ''),
			description: descriptionField,
		};
		$appState.setKey('inventoryYears', [...inventoryYears, newEntry]);
		context.closeAll();
	};
	return (
		<Box p="md">
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
			<Group justify="flex-end" mt="md">
				<Button
					color="red"
					leftSection={<IconTrash />}
					radius="md"
					onClick={openDeleteModal}
				>
					Delete
				</Button>
				<Button
					color="blue"
					radius="md"
					leftSection={<IconDeviceFloppy />}
					onClick={handleSave}
				>
					Save
				</Button>
			</Group>
			<Text size="sm" c="red">
				{error}
			</Text>
		</Box>
	);
};

export default EditInventoryYear;
