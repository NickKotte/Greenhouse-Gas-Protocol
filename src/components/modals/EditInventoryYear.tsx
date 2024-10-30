import type { InventoryYear } from '@/types';
import { Text, Textarea } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import { YearPickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { IconCalendar, IconNotes } from '@tabler/icons-react';
import EditWrapper from './EditWrapper';
import {
	useGetInventoryYears,
	useUpdateInventoryYear,
} from '@/api/workbook/inventoryYear.api';
import { notifications } from '@mantine/notifications';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const [yearField, setYearField] = useState<Date | null>(
		innerProps.year ? new Date(Number(innerProps.year.year), 0) : null,
	);
	const [descriptionField, setDescriptionField] = useState(
		innerProps.year ? innerProps.year.note : '',
	);
	const { data: inventoryYears } = useGetInventoryYears();
	const { mutate: updateInventoryYear } = useUpdateInventoryYear({
		onSuccess: () => {
			context.closeModal(id);
			notifications.show({
				title: 'Success',
				message: <Text>Updated inventory years list</Text>,
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Error',
				message: <Text>{error.message}</Text>,
				color: 'red',
			});
		},
	});

	const handleDelete = () => {
		if (innerProps.year?.id) {
			updateInventoryYear({
				operation: 'delete',
				inventoryYear: {
					id: innerProps.year.id,
				},
			});
		}
		return true;
	};

	const handleSave = () => {
		const yearFound = inventoryYears?.find(
			(year) => year.year === yearField?.getFullYear(),
		);
		if (yearFound && yearFound.id !== innerProps.year?.id) {
			notifications.show({
				title: 'Oops!',
				message: <Text>This year already exists in the workbook</Text>,
				color: 'red',
			});
			return false;
		}
		if (innerProps.year?.id) {
			updateInventoryYear({
				operation: 'update',
				inventoryYear: {
					id: innerProps.year.id,
					year: yearField?.getFullYear(),
					note: descriptionField,
				},
			});
		} else {
			updateInventoryYear({
				operation: 'add',
				inventoryYear: {
					year: yearField?.getFullYear(),
					note: descriptionField,
				},
			});
		}

		return false;
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
				leftSection={<IconCalendar size={16} />}
				leftSectionPointerEvents="none"
				placeholder="Choose your inventory year"
			/>
			<Textarea
				label="Note"
				placeholder="Note"
				radius="md"
				value={descriptionField ?? ''}
				onChange={(e) => setDescriptionField(e.target.value)}
				my="md"
				leftSection={<IconNotes size={16} style={{ marginTop: 8 }} />}
				leftSectionProps={{
					style: { alignItems: 'flex-start' },
				}}
			/>
		</EditWrapper>
	);
};

export default EditInventoryYear;
