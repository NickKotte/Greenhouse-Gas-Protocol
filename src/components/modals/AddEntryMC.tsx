import type {
	ActivityType,
	InventoryYear,
	MobileCombustionData,
} from '@/types';
import { Text, Divider, Group, Space, TextInput } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import {
	IconBuildingWarehouse,
	IconCalendarStats,
	IconFlame,
} from '@tabler/icons-react';
import { $appState, workbook } from '@/stores/app';
import { useStore } from '@nanostores/react';
import EditWrapper from './EditWrapper';
import { Selectable } from '../Editables/Selectable';
import { vehicles, fuel_units, distance_units } from '@/constants';
import { Numerable } from '../Editables/Numerable';
import { calculate } from '@/util';
import ActivitySelector from '@/views/MobileCombustion/ActivitySelector';
import ModalCalculations from '../ModalCalculations';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const { inventoryYears, facilities } = useStore($appState);
	const [facility, setFacility] = useState<string>('');
	const [inventoryYear, setInventoryYear] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [activityType, setActivityType] = useState<ActivityType>('fuel');
	const [fuelType, setFuelType] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const [units, setUnits] = useState<string>('');
	const [calculations, setCalculations] = useState<Record<string, number>>(
		{},
	);
	const [error, setError] = useState('');

	const handleSave = () => {
		console.log(inventoryYear);
		if (
			!facility ||
			!inventoryYear ||
			!fuelType ||
			!amount ||
			!units ||
			!Object.keys(calculations).length
		) {
			setError('Please fill out all fields');
			return false;
		}
		workbook.addItem({
			facilityId: facility,
			year: Number(inventoryYear),
			description,
			activityType,
			fuelSource: fuelType,
			activityAmount: amount,
			units: units,
			co2Tonnes: calculations.CO2,
			ch4Tonnes: calculations.CH4,
			n2oTonnes: calculations.N2O,
			co2eTonnes: calculations.CO2e,
			efKgCo2e: calculations.EF,
			biofuelCo2Tonnes: calculations.BIO,
		} as MobileCombustionData);
		return true;
	};
	useEffect(() => {
		if (fuelType && amount && units) {
			const result = calculate.MobileCombustion(
				activityType,
				fuelType,
				amount,
				units,
			);
			setCalculations({
				CO2: result.CO2,
				CH4: result.CH4,
				N2O: result.N2O,
				CO2e: result.CO2e,
				EF: result.EF,
				BIO: result.BIO,
			});
		}
	}, [fuelType, amount, units, activityType]);
	return (
		<EditWrapper
			context={context}
			innerProps={innerProps}
			onSave={handleSave}
			id={id}
		>
			<Divider my="md" label="Record Details" />
			<Group grow>
				<Selectable
					value={facility}
					setValue={setFacility}
					label="Facility"
					placeholder="Select a Facility"
					options={facilities.map((facility) => ({
						value: facility.name,
						label: facility.name,
					}))}
					required
					allowDeselect={false}
					leftSection={<IconBuildingWarehouse />}
					withinPortal
				/>
				<Selectable
					value={inventoryYear}
					setValue={setInventoryYear}
					label="Inventory Year"
					placeholder="Select Inventory Year"
					options={inventoryYears.map((year) => ({
						value: year.year.toString(),
						label: year.year.toString(),
					}))}
					required
					allowDeselect={false}
					leftSection={<IconCalendarStats />}
					withinPortal
				/>
			</Group>
			<TextInput
				mt="sm"
				label="Description"
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Divider my="md" mt="xl" label="Calculation Inputs" />
			<ActivitySelector
				value={activityType}
				onChange={(value) => {
					console.log(units);
					setActivityType(value as ActivityType);
					setUnits(
						value === 'fuel'
							? fuel_units[0].value
							: distance_units[0].value,
					);
				}}
				noWarning
			/>
			<Text size="sm" c="dimmed" my="sm">
				● Activity type can either be in the form of fuel used or
				distance traveled.
			</Text>
			<Selectable
				label="Fuel Type"
				placeholder="Select Fuel Type"
				value={fuelType}
				required
				setValue={setFuelType}
				options={vehicles}
				withinPortal
			/>
			<Space h="md" />
			<Group grow>
				<Numerable
					label="Amount"
					placeholder="Enter Amount"
					required
					value={amount}
					setValue={setAmount}
					leftIcon={IconFlame}
				/>
				<Selectable
					label={
						activityType === 'fuel'
							? 'Fuel Units'
							: 'Distance Units'
					}
					placeholder={`Select Units for ${activityType}`}
					required
					value={units}
					setValue={setUnits}
					options={
						activityType === 'fuel' ? fuel_units : distance_units
					}
					withinPortal
				/>
			</Group>
			<ModalCalculations calculations={calculations} />
			<Text size="sm" c="red">
				{error}
			</Text>
		</EditWrapper>
	);
};

export default EditInventoryYear;
