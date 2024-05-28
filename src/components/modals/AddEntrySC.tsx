import type { InventoryYear } from '@/types';
import { Text, Select, Divider, Group, Space } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useState } from 'react';
import '@mantine/dates/styles.css';
import { IconBuildingWarehouse, IconCalendarStats } from '@tabler/icons-react';
import { $appState } from '@/stores/app';
import { useStore } from '@nanostores/react';
import EditWrapper from './EditWrapper';
import FuelSelector from '@/components/FuelSelector';
import FuelAmountInput from '@/components/FuelAmountInput';

const EditInventoryYear = ({
	context,
	innerProps,
	id,
}: ContextModalProps<{ year: InventoryYear; isEditing?: boolean }>) => {
	const { inventoryYears, facilities } = useStore($appState);
	const [facility, setFacility] = useState<string | null>(null);
	const [inventoryYear, setInventoryYear] = useState<string | null>(null);
	const [fuelType, setFuelType] = useState<string | null>(null);
	const [amount, setAmount] = useState<number | null>(null);
	const [units, setUnits] = useState<string | null>(null);
	const [error, setError] = useState('');

	const handleSave = () => {
		console.log(facility, inventoryYear, fuelType, amount, units);
		if (!facility || !inventoryYear || !fuelType || !amount || !units) {
			setError('Please fill out all fields');
			return false;
		}
		//TODO: allow for editing vs creating new one
		// const yearFound = inventoryYears.find(
		// 	(year) => year.year === String(yearField?.getFullYear() ?? ''),
		// );
		// if (yearFound) {
		// 	setError('This year already exists in this workbook');
		// 	return false;
		// }
		// const newEntry: InventoryYear = {

		// };
		// $appState.setKey('inventoryYears', [...inventoryYears, newEntry]);
		return true;
	};
	return (
		<EditWrapper
			context={context}
			innerProps={innerProps}
			onSave={handleSave}
			id={id}
		>
			<Group grow>
				<Select
					value={facility}
					onChange={setFacility}
					label="Facility"
					data={facilities.map((facility) => ({
						value: facility.name,
						label: facility.name,
					}))}
					required
					allowDeselect={false}
					leftSection={<IconBuildingWarehouse />}
				/>
				<Select
					value={inventoryYear}
					onChange={setInventoryYear}
					label="Inventory Year"
					data={inventoryYears.map((year) => ({
						value: year.year,
						label: year.year,
					}))}
					required
					allowDeselect={false}
					leftSection={<IconCalendarStats />}
				/>
			</Group>
			<Divider my="md" />
			<FuelSelector
				editable={false}
				required
				fuelType={fuelType}
				setFuelType={setFuelType}
			/>
			<Space h="md" />
			<FuelAmountInput
				amount={amount}
				units={units}
				editable={false}
				required
				setAmount={setAmount}
				setUnits={setUnits}
			/>
			<Text size="sm" c="red">
				{error}
			</Text>
		</EditWrapper>
	);
};

export default EditInventoryYear;
