import type { Facility } from '@/types';
import {
	Group,
	TextInput,
	NumberInput,
	Divider,
	Textarea,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState, useEffect } from 'react';
import {
	IconRuler,
	IconBuilding,
	IconNotes,
	IconMapPin,
	IconBuildingCommunity,
	IconMap,
	IconMailbox,
	IconBolt,
} from '@tabler/icons-react';
import EditWrapper from './EditWrapper';
import { useUpdateFacility } from '@/api/workbook/facilities.api';
import { notifications } from '@mantine/notifications';
import { useEGridSubregion } from '@/api/workbook/egrid.api';
import { useDebouncedValue } from '@mantine/hooks';

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
	const [debouncedZip] = useDebouncedValue(zipField, 500);
	const [eGridField, setEGridField] = useState(
		innerProps.facility ? innerProps.facility.egrid_subregion : '',
	);
	const [squareFootageField, setSquareFootageField] = useState(
		innerProps.facility ? innerProps.facility.square_footage : 0,
	);
	const [noteField, setNoteField] = useState(
		innerProps.facility ? innerProps.facility.note : '',
	);

	const { data: eGridData, isLoading: isLoadingEGrid } = useEGridSubregion(
		debouncedZip ?? '',
		!innerProps.facility?.egrid_subregion,
	);

	useEffect(() => {
		if (!innerProps.facility?.egrid_subregion) {
			if (eGridData?.subregion_1) {
				setEGridField(eGridData.subregion_1);
			} else if (debouncedZip && debouncedZip.length === 5) {
				setEGridField('');
			}
		}
	}, [eGridData, debouncedZip, innerProps.facility?.egrid_subregion]);

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
					note: noteField,
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
					note: noteField,
				},
			});
		}
		return true;
	};

	const getEGridDescription = (
		isLoading: boolean,
		zip: string,
		hasData: boolean,
	): string => {
		if (isLoading) return 'Looking up eGRID subregion...';
		if (zip && zip.length === 5 && !hasData)
			return 'No eGRID found for this ZIP code';
		return 'Based on ZIP code';
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
				leftSection={<IconBuilding size={16} />}
			/>
			<Textarea
				label="Note"
				placeholder="Note"
				radius="md"
				value={noteField ?? ''}
				onChange={(e) => setNoteField(e.target.value)}
				mb="sm"
				leftSection={<IconNotes size={16} style={{ marginTop: 8 }} />}
				leftSectionProps={{
					style: { alignItems: 'flex-start' },
				}}
			/>
			<Divider my="sm" />
			<TextInput
				label="Street Address"
				placeholder="1234 Main St"
				radius="md"
				value={streetAddressField ?? ''}
				onChange={(e) => setStreetAddressField(e.target.value)}
				mb="sm"
				leftSection={<IconMapPin size={16} />}
			/>
			<TextInput
				label="City"
				placeholder="City"
				radius="md"
				value={cityField ?? ''}
				onChange={(e) => setCityField(e.target.value)}
				mb="sm"
				leftSection={<IconBuildingCommunity size={16} />}
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
					leftSection={<IconMap size={16} />}
				/>
				<TextInput
					label="ZIP"
					placeholder="12345"
					radius="md"
					value={zipField ?? ''}
					onChange={(e) => setZipField(e.target.value)}
					required
					mb="sm"
					leftSection={<IconMailbox size={16} />}
				/>
			</Group>
			<Divider my="sm" />
			<TextInput
				label="eGRID Subregion"
				description={getEGridDescription(
					isLoadingEGrid,
					debouncedZip ?? '',
					!!eGridData,
				)}
				radius="md"
				value={eGridField ?? ''}
				onChange={(e) => setEGridField(e.target.value)}
				disabled={isLoadingEGrid}
				mb="sm"
				leftSection={<IconBolt size={16} />}
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
				leftSection={<IconRuler size={16} />}
			/>
		</EditWrapper>
	);
};

export default EditFacility;
