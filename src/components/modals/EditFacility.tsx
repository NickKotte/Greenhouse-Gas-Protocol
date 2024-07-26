import type { Facility } from '@/types';
import { Group, TextInput, NumberInput, Divider } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import { IconRuler } from '@tabler/icons-react';
import EditWrapper from './EditWrapper';
import { useUpdateFacility } from '@/api/workbook/facilities.api';
import { notifications } from '@mantine/notifications';

const EditFacility = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ facility: Facility; isEditing?: boolean }>) => {
	const { mutate: updateFacility } = useUpdateFacility({
		onSuccess: () => {
			context.closeModal(id);
			notifications.show({
				title: 'Facility Updated',
				message: 'Facility has been updated successfully',
			});
		},
		onError: (error) => {
			console.log(error);
			notifications.show({
				title: 'Error',
				message: 'Facility could not be updated',
				color: 'red',
			});
		},
	});
	const [nameField, setNameField] = useState(
		innerProps.facility ? innerProps.facility.name : '',
	);
	const [streetAddressField, setStreetAddressField] = useState(
		innerProps.facility ? innerProps.facility.street : '',
	);
	const [cityField, setCityField] = useState(
		innerProps.facility ? innerProps.facility.city : '',
	);
	const [stateField, setStateField] = useState(
		innerProps.facility ? innerProps.facility.state : '',
	);
	const [zipField, setZipField] = useState(
		innerProps.facility ? innerProps.facility.zip : '',
	);
	const [eGridField, setEGridField] = useState(
		innerProps.facility ? innerProps.facility.egrid_subregion : '',
	);
	const [squareFootageField, setSquareFootageField] = useState(
		innerProps.facility ? innerProps.facility.square_footage : 0,
	);

	const handleDelete = () => {
		if (innerProps.facility?.id) {
			updateFacility({
				operation: 'delete',
				facility: {
					id: innerProps.facility.id,
				},
			});
		}
		return true;
	};

	const handleSave = () => {
		if (innerProps.facility?.id) {
			updateFacility({
				operation: 'update',
				facility: {
					id: innerProps.facility.id,
					name: nameField,
					street: streetAddressField,
					city: cityField,
					state: stateField,
					zip: zipField,
					egrid_subregion: eGridField,
					square_footage: squareFootageField,
				},
			});
		} else {
			updateFacility({
				operation: 'add',
				facility: {
					name: nameField,
					street: streetAddressField,
					city: cityField,
					state: stateField,
					zip: zipField,
					egrid_subregion: eGridField,
					square_footage: squareFootageField,
				},
			});
		}
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
			<TextInput
				label="Name"
				placeholder="Facility Name"
				radius="md"
				value={nameField}
				onChange={(e) => setNameField(e.target.value)}
				required
				mb="sm"
			/>
			<Divider my="sm" />
			<TextInput
				label="Street Address"
				placeholder="1234 Main St"
				radius="md"
				value={streetAddressField ?? ''}
				onChange={(e) => setStreetAddressField(e.target.value)}
				mb="sm"
			/>
			<TextInput
				label="City"
				placeholder="City"
				radius="md"
				value={cityField ?? ''}
				onChange={(e) => setCityField(e.target.value)}
				mb="sm"
			/>
			<Group grow wrap="nowrap">
				<TextInput
					label="State"
					placeholder="State"
					radius="md"
					value={stateField ?? ''}
					onChange={(e) => setStateField(e.target.value)}
					required
					mb="sm"
				/>
				<TextInput
					label="ZIP"
					placeholder="12345"
					radius="md"
					value={zipField ?? ''}
					onChange={(e) => setZipField(e.target.value)}
					required
					mb="sm"
				/>
			</Group>
			<Divider my="sm" />
			<TextInput
				label="eGRID Subregion"
				disabled
				description="This is automatically generated by the system"
				radius="md"
				value={eGridField ?? ''}
				onChange={(e) => setEGridField(e.target.value)}
				mb="sm"
			/>
			<NumberInput
				label="Square Footage"
				placeholder="10000"
				radius="md"
				value={squareFootageField ?? 0}
				onChange={(value) => setSquareFootageField(Number(value))}
				allowNegative={false}
				required
				mb="sm"
				thousandSeparator=","
				decimalScale={2}
				suffix=" sqft"
				step={100}
				leftSection={<IconRuler />}
			/>
		</EditWrapper>
	);
};

export default EditFacility;
